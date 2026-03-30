# Tehtävä J1: React Router, Zod-validointi ja API-integraatio

## 🎯 Tehtävän kuvaus
Tässä tehtävässä aiemmin rakennettuun MuumiRent-sovellukseen lisättiin monisivuisuus (Routing), dynaaminen tilauslomake, edistynyt lomakkeen validointi sekä asynkroninen API-kutsu.

## 🛠️ Toteutetut ominaisuudet

### 1. Reititys (React Router DOM)
Sovellus muutettiin Single Page Application (SPA) -muotoon hyödyntämällä `react-router-dom` -kirjastoa.
- **`App.jsx`**: Keskitetty reitityksen hallinta (`<Router>`, `<Routes>`, `<Route>`).
- **`Layout.jsx`**: Käärekomponentti, joka pitää `Header`- ja `Footer`-komponentit näkyvissä jokaisella sivulla, samalla kun keskiosa (`<Outlet>`) vaihtuu.
- **Navigointi**: `Header.jsx` ja etusivun `Hero.jsx` käyttävät `<Link>` -komponenttia nopeaan siirtymiseen `/order` -sivulle. 

### 2. Tilauslomake (React Hook Form)
`/order` -reitille luotiin täysin uusi `OrderPage.jsx` -komponentti.
- Lomake käyttää useita eri input-tyyppejä: `text`, `email`, `date` ja `select`.
- Tilan hallinnasta ja syötteiden rekisteröinnistä vastaa moderni ja tehokas `useForm` -hook.

### 3. Edistynyt Validointi (Zod)
Kaikki lomakkeen kentät on suojattu tarkalla Zod-skeemalla ennen lähetyksen sallimista:
- **Sähköposti (`email`)**: Tarkistaa oikean muodon.
- **Päivämäärä ja Puku (`bookingDate`, `costume`)**: Pakolliset valinnat (vähintään 1 merkki).
- **Kustomoitu Nimi-validointi (`fullName`)**: `.refine()` -metodilla varmistetaan, että käyttäjä syöttää **vähintään kaksi sanaa** (etunimi ja sukunimi välilyönnillä erotettuna).

### 4. API-integraatio ja Asynkronisuus
Kun lomake läpäisee validoinnin:
- Tila muutetaan lataavaksi (`isSubmitting`), jolloin "Lähetä"-painike disabloituu estäen tuplaklikkaukset.
- Tiedot lähetetään asynkronisella `fetch`-kutsulla (POST) osoitteeseen `https://httpbin.org/post`.
- Palvelimen palauttama vastaus (JSON) otetaan talteen Reactin tilaan (`setServerData`).
- Lomake tyhjennetään automaattisesti `.reset()` -funktiolla.

### 5. Vasteen näyttäminen ja UX
- Onnistuneen lähetyksen jälkeen sivulle ilmestyy vihreä onnistumisviesti.
- Httpbin-palvelimen palauttama alkuperäinen JSON-data tulostetaan siististi muotoiltuna ruudulle `<pre>` -tagin sisällä.
- **UX-parannus:** `OrderPage.jsx` hyödyntää `useEffect` -hookia (`window.scrollTo(0,0)`), jotta sivu rullaa automaattisesti ylös aina kun tilaussivu avataan, vaikka käyttäjä olisi klikannut linkkiä etusivun alareunasta.

## 🚀 Miten testata
1. Käynnistä sovellus Dockerilla (`docker compose up --build`).
2. Klikkaa navigoinnista **"Tilaa Puku"**.
3. Yritä lähettää tyhjä lomake -> Zod näyttää virheet.
4. Syötä `fullName` -kenttään pelkkä etunimi -> Zod vaatii myös sukunimen.
5. Täytä lomake oikein ja lähetä -> Palvelimen JSON-vastaus ilmestyy ruudulle.