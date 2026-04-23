# Lopputyö: MuumiRent – React & Docker -refaktorointi

## 🎯 Projektin yleiskatsaus
Tämä projekti on uudistettu (refaktoroitu) versio alkuperäisestä staattisesta "MuumiRent" HTML-sivusta. Sivu on rakennettu kokonaan uudelleen modernina **React-sovelluksena** (Viten avulla), tyylitelty **Tailwind CSS:llä** ja kontitettu **Dockerin** avulla. 

Projektin päätavoitteena oli siirtyä raskaasta, yksittäisestä HTML-tiedostosta modulaariseen ja komponenttipohjaiseen React-arkkitehtuuriin säilyttäen samalla **1:1 visuaalinen vastaavuus** alkuperäisen sivuston kanssa.

## 🛠️ Käytetyt teknologiat
- **Frontend-kehys:** React (Vite-mallipohjalla)
- **Tyylittely:** Tailwind CSS (kustomoitu teema config-tiedostossa)
- **Kontitus (Containerization):** Docker, Docker Compose
- **Resurssit:** Google Fonts (Poppins, Fredoka), FontAwesome-ikonit

## 🧩 Komponenttiarkkitehtuuri (Reactin parhaat käytännöt)
Jotta Reactin parhaita käytäntöjä ja puhdasta semanttista rakennetta noudatettaisiin, alkuperäinen yli 500-rivinen `index.html` jaettiin loogisiin ja uudelleenkäytettäviin komponentteihin `src/components/` -kansiossa:

1. **`Header.jsx`**: Navigointipalkki. Hyödyntää Reactin `useState`-hookia mobiilivalikon avaamisen ja sulkemisen hallinnassa.
2. **`Hero.jsx`**: Sivun yläosan aloitusnäkymä, jossa on taustakuva ja toimintakehotteet (Call-to-Action).
3. **`About.jsx`**: Esittely- ja tekstiosio ("Tervetuloa Muumilaaksoon").
4. **`Catalog.jsx`**: Pukukatalogi. Refaktoroitu hyödyntämään JavaScript-taulukkoa ja `.map()`-metodia, jolloin pukukortit renderöidään dynaamisesti ja koodin toisto on minimoitu.
5. **`Benefits.jsx`**: "Miksi vuokrata meiltä?" -osio. Hyödyntää myös taulukon map-toimintoa renderöidäkseen 8 erilaista etukorttia ikoneineen.
6. **`Situations.jsx`**: Käyttötilanteet (syntymäpäivät, Halloween jne.), renderöity dynaamisesti.
7. **`Stats.jsx`**: Tilastoruudukko (tyytyväiset asiakkaat jne.).
8. **`CallToAction.jsx`**: Sivun alaosan varauskehotus ja alennuskoodi.
9. **`Footer.jsx`**: Kattava alatunniste pikalinkkeineen ja yhteystietoineen.

Koska sivu on jaettu näihin osiin, pääkomponentti **`App.jsx`** toimii ainoastaan siistinä rakenteen kokoajana, mikä tekee koodipohjasta erittäin helposti luettavan ja ylläpidettävän (vastaa tehtävän ⭐ Step 8 -laatutasoa).

## 🎨 Tyylittely ja resurssien sovitus
- **Tailwind Config**: Alkuperäisen HTML-tiedoston `<script>`-tagissa ollut kustomoitu tyylimäärittely (mm. omat värit kuten `primary`, `moomin`, `accent` sekä kustomoidut fontit) siirrettiin onnistuneesti `tailwind.config.js` -tiedostoon.
- **CSS-animaatiot**: Alkuperäiset kustomoidut keyframe-animaatiot (`fade-in-up`, `bounce-gentle`) siirrettiin suoraan `src/index.css` -tiedostoon.
- **JSX-muunnos**: Kaikki tavalliset HTML:n `class`-attribuutit muutettiin Reactin vaatimiin `className`-attribuutteihin. Lisäksi itsensä sulkevat tagit (kuten `<img>` ja `<br>`) suljettiin oikeaoppisesti JSX-sääntöjen mukaisesti. Kuvat siirrettiin Reactin staattiseen `public/images/` -kansioon.

## 🐳 Docker-toteutus
Sovellus pyörii täysin eristetyssä Docker-kontissa, mikä takaa yhdenmukaisen kehitysympäristön.
- **`Dockerfile`**: Käyttää virallista `node:20-alpine` -kuvaa, asentaa riippuvuudet, kopioi lähdekoodin ja avaa portin `5173`.
- **`docker-compose.yml`**: Yhdistää paikallisen portin `5173` konttiin ja hyödyntää volume-mäppäystä, jotta koodin tallennus päivittää selaimen automaattisesti kehityksen aikana (hot-reloading).
- **`.dockerignore`**: Varmistaa, että paikallista `node_modules` -kansiota ja muita tarpeettomia tiedostoja ei kopioida turhaan Docker-kuvaan.

## 🚀 Sovelluksen käynnistäminen
Varmista, että Docker (tai Docker Desktop) on käynnissä. Suorita sitten seuraava komento terminaalissa projektin juurikansiossa:

```bash
docker compose up --build