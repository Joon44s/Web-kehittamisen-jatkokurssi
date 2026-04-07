# Tehtävä K1: React-sivujen integrointi Full Stack -projektiin

## 🎯 Tehtävän kuvaus
Tässä kurssin päätöstehtävässä aiemmin luodut React-sivut (Tehtävät I1 ja J1) integroitiin valmiiseen Full Stack -pohjaan. Frontend kytkettiin omaan Backendiin (Node.js/Express) ja data tallennettiin lokaaliin tietokantaan (PostgreSQL). 

Lisäksi toteutettiin ⭐ **Korkeamman tason vaatimus (2 pistettä)** luomalla täysin uusi alasivu (`/bookings`), joka hakee ja näyttää tietokantaan tallennetut varaukset (Read-operaatio).

## 🛠️ Toteutetut muutokset ja työnkulku

### 1. Frontendin siirto ja päivitys
- Tehtävän I (staattinen sivu) ja J (reititetty lomake) koodit siirrettiin `frontend/src` -kansioon.
- Tailwind CSS:n vaatimat tiedostot (`tailwind.config.js`, `postcss.config.js` ja `index.css`) konfiguroitiin uuteen pohjaan.
- `originalPage/` -kansio siirrettiin asianmukaisesti `frontend/` -kansion juureen.
- Tilauslomakkeen `fetch`-kutsu päivitettiin osoittamaan lokaaliin backendiin (`http://localhost:3000/api/bookings`).

### 2. Tietokannan päivitys (`db/`)
- `init.sql` -tiedostoon lisättiin uusi taulu: `bookings`.
- Tauluun määriteltiin Zod-lomaketta vastaavat sarakkeet (`full_name`, `email`, `booking_date`, `costume`).
- Tietokantaan syötettiin pari testivarausta (Seed data).

### 3. Backendin päivitys (`backend/server.js`)
Backendiin luotiin kaksi uutta API-reittiä:
- **`POST /api/bookings`**: Ottaa vastaan Reactin lähettämän JSON-datan, validoi sen ja tallentaa `bookings`-tauluun.
- **`GET /api/bookings`**: Hakee kaikki tallennetut varaukset tietokannasta ja palauttaa ne frontendille aikajärjestyksessä.

### 4. Uusi alasivu (Read-operaatio)
- Luotiin komponentti `BookingsList.jsx`, joka hakee `useEffect`-hookin avulla datan backendistä ja renderöi sen tyyliteltynä listana.
- Sivu lisättiin React Routeriin (`/bookings`) ja navigointiin ("Kaikki Varaukset").

## 🚀 Lopputulos
Sovellus toimii nyt yhtenäisenä, Dockerisoituna Full Stack -järjestelmänä. Tieto kulkee saumattomasti selaimesta tietokantaan ja takaisin.