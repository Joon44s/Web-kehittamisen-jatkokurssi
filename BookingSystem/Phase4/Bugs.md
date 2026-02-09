Booking System Phase 4
Seuraavat virheet tunnistettiin ja korjattiin palvelimen logiikasta (index.js):

1. Boolean-kentän hylkääminen (Validation)
Virhe: resourceAvailable käytti checkFalsy: true, mikä hylkäsi arvon false virheellisenä.

Korjaus: Muutettu tarkistus sallimaan false-arvo, jotta resurssi voidaan merkitä "ei-saatavilla" -tilaan.

2. Puuttuvat aikayksiköt (Validation)
Virhe: Vain 'hour' ja 'day' oli sallittu, vaikka järjestelmän piti tukea myös pitempiä varauksia.

Korjaus: Lisätty 'week' ja 'month' sallittujen yksiköiden listalle.

3. Kuvauksen ja nimen pituusrajoitteet (Validation)
Virhe: Resurssin kuvaus oli rajoitettu liian tiukasti, ja nimen pituutta ei tarkistettu lainkaan (salli esim. <>).

Korjaus: Asetettu resourceName välille 5–30 merkkiä ja laajennettu resourceDescription välille 5–255 merkkiä.

4. Skriptien estäminen ja "Invalid value" (Security)
Virhe: Sovellus salli HTML-muotoisten skriptien (kuten <script>) syöttämisen kuvaukseen ilman virheilmoitusta.

Korjaus: Lisätty koodiin tarkistus, joka hylkää skriptitunnisteet ja palauttaa mallikuvan mukaisen "Invalid value" -virheen.

5. Nimen korruptoituminen (Functionality)
Virhe: resourceName kryptattiin SHA256-hashiksi ennen tallennusta, jolloin alkuperäinen nimi hävisi.

Korjaus: Poistettu kryptaus, jotta nimi tallentuu ja näkyy tietokannassa selkokielisenä.

6. Hintavirhe ja saatavuuden pakottaminen (Functionality)
Virhe: Järjestelmä tuplasi hinnan (*2) ja pakotti saatavuuden aina tilaan false juuri ennen tallennusta.

Korjaus: Poistettu hinnan kerrannainen ja kovakoodattu ylikirjoitus, jotta data säilyy käyttäjän syöttämässä muodossa.