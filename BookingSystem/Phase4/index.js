require("dotenv").config();
const crypto = require('crypto');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const { Pool } = require('pg');
const { body, validationResult } = require('express-validator');

// Timestamp apufunktio lokeja varten
function timestamp() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').replace('Z', '');
}

// --- Middleware ---
app.use(express.json());

// Tarjoillaan staattiset tiedostot public-kansiosta
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// --- Reitit (HTML) ---
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

// --- Postgres yhteys ---
const pool = new Pool({});

// --- Validointisäännöt (Vastaavat esimerkkikuvaa) ---
const resourceValidators = [
  body('action')
    .exists({ checkFalsy: true }).withMessage('action is required')
    .trim()
    .isIn(['create'])
    .withMessage("action must be 'create'"),

  body('resourceName')
    .exists({ checkFalsy: true }).withMessage('resourceName is required')
    .isString().withMessage('resourceName must be a string')
    .trim()
    .isLength({ min: 5, max: 30 }).withMessage('resourceName must be 5-30 characters'),

  body('resourceDescription')
    .exists({ checkFalsy: true }).withMessage('resourceDescription is required')
    .isString().withMessage('resourceDescription must be a string')
    .trim()
    .isLength({ min: 5, max: 255 }).withMessage('resourceDescription must be 5-255 characters')
    .custom(value => {
      // Esimerkkikuvassa <script> aiheutti "Invalid value" virheen
      if (value.includes('<script>')) {
        throw new Error('Invalid value');
      }
      return true;
    }),

  body('resourceAvailable')
    .exists({ checkFalsy: null }).withMessage('resourceAvailable is required')
    .isBoolean().withMessage('resourceAvailable must be boolean')
    .toBoolean(),

  body('resourcePrice')
    .exists({ checkFalsy: true }).withMessage('resourcePrice is required')
    .isFloat({ min: 0 }).withMessage('resourcePrice must be a non-negative number')
    .toFloat(),

  body('resourcePriceUnit')
    .exists({ checkFalsy: true }).withMessage('resourcePriceUnit is required')
    .isString().withMessage('resourcePriceUnit must be a string')
    .trim()
    .isIn(['hour', 'day', 'week', 'month'])
    .withMessage("resourcePriceUnit must be 'hour', 'day', 'week', or 'month'"),
];

// --- POST /api/resources ---
app.post('/api/resources', resourceValidators, async (req, res) => {
  
  // 1. Tarkistetaan validointivirheet
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array().map(e => ({ field: e.path, msg: e.msg })),
    });
  }

  // 2. Puretaan data rungosta
  let {
    action,
    resourceName,
    resourceDescription,
    resourceAvailable,
    resourcePrice,
    resourcePriceUnit
  } = req.body;

  // 3. Logitus konsoliin (kuten mallissa)
  console.log("The client's POST request ", `[${timestamp()}]`);
  console.log('------------------------------');
  console.log('Action ➡️ ', action);
  console.log('Name ➡️ ', resourceName);
  console.log('Description ➡️ ', resourceDescription);
  console.log('Availability ➡️ ', resourceAvailable);
  console.log('Price ➡️ ', resourcePrice);
  console.log('Price unit ➡️ ', resourcePriceUnit);
  console.log('------------------------------');

  try {
    // 4. Tallennus tietokantaan (KORJATTU: Ei hashia, ei hinnan tuplausta)
    const insertSql = `
      INSERT INTO resources (name, description, available, price, price_unit)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, description, available, price, price_unit, created_at
    `;
    const params = [
      resourceName, 
      resourceDescription,
      resourceAvailable,
      resourcePrice, 
      resourcePriceUnit
    ];

    const { rows } = await pool.query(insertSql, params);
    const created = rows[0];

    // 5. Palautetaan onnistuminen
    return res.status(201).json({ ok: true, data: created });

  } catch (err) {
    console.error('DB insert failed:', err);
    return res.status(500).json({ ok: false, error: 'Database error' });
  }
});

// Fallback 404
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});