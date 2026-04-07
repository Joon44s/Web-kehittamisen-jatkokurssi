-- Alkuperäinen kurssipohjan users-taulu (pidetään tämä varmuuden vuoksi, jos pohjan testit sitä vaativat)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

INSERT INTO users (name, email)
VALUES
    ('Alice', 'alice@example.com'),
    ('Bob', 'bob@example.com')
ON CONFLICT (email) DO NOTHING;


-- UUSI: MuumiRent-sovelluksen varaustaulu
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    booking_date DATE NOT NULL,
    costume VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lisätään kaksi testivarausta valmiiksi tietokantaan, 
-- jotta näet datan heti "Kaikki Varaukset" -sivulla!
INSERT INTO bookings (full_name, email, booking_date, costume)
VALUES
    ('Muumipeikko Fani', 'peikko@muumilaakso.fi', '2024-06-01', 'Muumipeikko'),
    ('Pikku Myy', 'myy@muumilaakso.fi', '2024-06-15', 'Niiskuneiti');