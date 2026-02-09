# Raportti löydetyistä ja korjatuista virheistä (Phase 3)

Tässä dokumentissa on listattu ne kuusi (6) virhettä, jotka korjattiin sovelluksen toiminnallisuuden palauttamiseksi.

### 1. Virheellinen ID-viite (Client-side / form.js)
* **Virhe:** Resurssin nimeä yritettiin hakea väärällä ID-nimellä: `$("resourceNamee")`.
* **Korjaus:** Korjattu ID muotoon `$("resourceName")`.

### 2. Puuttuvat muuttujamäärittelyt (Client-side / resource.js)
* **Virhe:** Painikkeita `updateButton` ja `deleteButton` käsiteltiin ilman muuttujamäärittelyä (`let`).
* **Korjaus:** Lisätty tarvittavat `let`-määrittelyt tiedoston alkuun.

### 3. Puuttuva toimintoarvo painikkeesta (Client-side / resource.js)
* **Virhe:** Reserver-roolin Create-painikkeelta puuttui `value="create"`, jolloin backend ei saanut tietoa toiminnosta.
* **Korjaus:** Lisätty puuttuva `value`-attribuutti.

### 4. Portin oletusarvon puute (Server-side / index.js)
* **Virhe:** Palvelin yritti lukea porttia vain ympäristömuuttujasta ilman oletusarvoa, mikä esti käynnistymisen ilman .env-tiedostoa.
* **Korjaus:** Lisätty oletusportti: `const PORT = process.env.PORT || 3000;`.

### 5. Kuvauksen tyhjentäminen (Server-side / index.js)
* **Virhe:** Käyttäjän syöttämä kuvaus ylikirjoitettiin tyhjäksi merkkijonoksi (`const description = "";`) ennen käsittelyä.
* **Korjaus:** Muutettu lukemaan kuvaus pyynnön rungosta (`req.body`).

### 6. Tuplavastaus 404-reitissä (Server-side / index.js)
* **Virhe:** API:n 404-reitti yritti lähettää kaksi vastausta peräkkäin, mikä aiheutti palvelimen kaatumisen.
* **Korjaus:** Poistettu ylimääräinen vastausrivi.