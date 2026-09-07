# EspanjalainenRuoka.com

Suomenkielinen espanjalaisen ruoan, juomien ja elämäntyylin sivusto. Sivusto on rakennettu Reactilla ja Vitellä ja julkaistaan GitHub Pagesissa omalla verkkotunnuksella.

## Kehitys

```bash
npm install
npm run dev
```

Tuotantoversion tarkistus:

```bash
npm run lint
npm run build
```

`npm run build` luo tavallisen sovelluspaketin lisäksi jokaiselle artikkelille ja kategorialle oman hakukoneystävällisen HTML-sivun sekä `sitemap.xml`- ja `robots.txt`-tiedostot.

## Uuden artikkelin lisääminen

1. Kopioi sopiva Markdown-tiedosto kansiossa `src/content`.
2. Vaihda vähintään `title`, `slug`, `category`, `date`, `heroImage`, `description` ja `seoDescription`.
3. Lisää ainekset `ingredients`-osioon ja kirjoita sisältö Markdownilla erotinviivan jälkeen.
4. Aja `npm run build` ennen julkaisua.

Käytettävät kategoriat ovat `Ruoka ohjeet`, `Jälkiruoat`, `Viinit & juomat` ja `Elämää Espanjassa`.

## Julkaisu

```bash
npm run deploy
```

Verkkotunnus säilyy `public/CNAME`-tiedoston avulla. Älä poista sitä.

Julkaisu käyttää `scripts/deploy.mjs`-skriptiä ja olemassa olevaa `gh-pages`-haaraa. Skripti rakentaa Git-puun ilman työhakemistoa, jotta vanha `/resepti/Paras-sangria-ohje/` voidaan ohjata pienellä alkukirjaimella kirjoitettuun osoitteeseen myös macOS:n tiedostojärjestelmässä. Ohjaus on välitön HTML/JavaScript-ohjaus, ei palvelimen HTTP 301. Alkuperäinen resepti tarkistetaan ennen julkaisua, ja haaran historia säilytetään. HTTP-siirron yhteensopivuusasetukset koskevat vain julkaisuprosessia.

Julkaisupuun voi tarkistaa lähettämättä muutoksia: `npm run build` ja `node scripts/deploy.mjs --dry-run`. Tarkistus hakee nykyisen julkaisuhaaran GitHubista. Väliaikainen Git-varasto luodaan käyttöjärjestelmän tilapäishakemistoon.
