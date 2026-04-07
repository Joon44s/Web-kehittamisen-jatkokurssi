import express from "express";
import cors from "cors";
import pool from "./db.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Needed in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- ALKUPERÄISET KURSSIPOHJAN REITIT (Jätetään nämä ennalleen) ---

app.get("/api/health", (req, res) => {
  res.json({ message: "API is running successfully 🚀" });
});

app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Insert failed:", error);
    res.status(500).json({ error: "Insert failed" });
  }
});

// --- UUDET MUUMIRENT-REITIT (Tehtävä K1) ---

// 1. GET: Hae kaikki muumipukuvaraukset tietokannasta (Read -operaatio, 2 pisteen vaatimus)
app.get("/api/bookings", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, full_name, email, booking_date, costume, created_at FROM bookings ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Bookings query failed:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// 2. POST: Tallenna uusi muumipukuvaraus tietokantaan (React-lomakkeelta)
app.post("/api/bookings", async (req, res) => {
  try {
    // Otetaan vastaan React-lomakkeen lähettämät tiedot (JSON)
    const { fullName, email, bookingDate, costume } = req.body;

    // Tallennetaan ne äsken luotuun bookings-tauluun
    const result = await pool.query(
      "INSERT INTO bookings (full_name, email, booking_date, costume) VALUES ($1, $2, $3, $4) RETURNING *",
      [fullName, email, bookingDate, costume]
    );

    // Palautetaan tallennettu rivi takaisin frontendille
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Booking insert failed:", error);
    res.status(500).json({ error: "Failed to save booking" });
  }
});

// --- PALVELIMEN KÄYNNISTYS ---

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});