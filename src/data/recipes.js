export const CATEGORIES = ['Kaikki', 'Ruoka ohjeet', 'Viinit & juomat', 'Elämää Espanjassa']

export const RECIPES = [
  {
    id: 1,
    slug: 'paella-valenciana',
    title: 'Paella Valenciana',
    category: 'Ruoka ohjeet',
    time: '55 min',
    difficulty: 'Keskitaso',
    heroImage: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=1400&h=700&fit=crop',
    description: 'Paella Valenciana on Espanjan tunnetuin ruoka — syntynyt Valencian pelloilla ja rannoilla. Aito paella valmistetaan leveässä, matalassa paella-pannussa avotulella, jotta pohjalle muodostuu rapea socarrat-kuori. Tämä resepti on perinteinen ja autenttinen.',
    seoDescription: 'Opi valmistamaan aito Paella Valenciana kotona. Perinteinen espanjalainen riisiruoka kanalla, vihanneksilla ja sahramilla. Vaiheittainen ohje.',
    ingredients: [
      {
        group: 'Pääraaka-aineet',
        items: [
          '400 g lyhytjyväistä paellariisiä (Bomba tai Calasparra)',
          '1 kokonainen kana (n. 1,2 kg), paloiteltuna',
          '200 g vihreää papua (bajoqueta)',
          '200 g valkoisia papuja (garrofón), keitettyinä',
          '1 iso tomaatti, raastettuna',
        ],
      },
      {
        group: 'Liemi & mausteet',
        items: [
          '1,2 litraa kuumaa kanaliemiä',
          '1 tl sahramia, liotettuna 3 rkl kuumaan veteen',
          '1 tl paprikajauhetta (pimentón dulce)',
          '3 rkl oliiviöljyä',
          'Merisuolaa maun mukaan',
          '1 valkosipulinkynsi',
        ],
      },
      {
        group: 'Tarjoiluun',
        items: [
          '1 sitruuna, lohkoina',
          'Tuoretta persiljaa',
        ],
      },
    ],
    steps: [
      {
        text: 'Kuumenna oliiviöljy paella-pannussa (tai leveässä paistinpannussa) keskilämmöllä. Ruskista kananpalat kauttaaltaan, noin 8–10 minuuttia. Siirrä sivuun.',
        image: null,
      },
      {
        text: 'Lisää pannulle papuja ja kuullota 3 minuuttia. Lisää raastettu tomaatti ja paprikajauhe. Paistele miedolla lämmöllä 5 minuuttia, kunnes tomaatti on karamellisoitunut.',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&h=500&fit=crop',
      },
      {
        text: 'Aseta kananpalat takaisin pannulle. Kaada kuuma kanaliemi ja sahrami-liuos joukkoon. Mausta suolalla. Kiehauta voimakkaasti.',
        image: null,
      },
      {
        text: 'Ripottele riisi tasaisesti pannulle — älä sekoita enää tämän jälkeen. Keitä voimakkaalla lämmöllä 10 minuuttia, sitten hiljennä lämpö ja keitä 8–10 minuuttia lisää kunnes riisi on kypsää ja neste imeytynyt.',
        image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&h=500&fit=crop',
      },
      {
        text: 'Anna pannun seistä liedellä korkealla lämmöllä 1–2 minuuttia muodostamaan socarrat — se kuuluisa rapea pohjakerros. Kuule kun se alkaa ritisemään, se on valmista!',
        image: null,
      },
      {
        text: 'Nosta lämmöltä, peitä foliolla ja anna levätä 5 minuuttia. Tarjoile suoraan pannusta sitruunalohkojen ja tuoreen persiljan kanssa.',
        image: null,
      },
    ],
  },
  {
    id: 2,
    slug: 'gazpacho-andaluz',
    title: 'Gazpacho Andaluz',
    category: 'Ruoka ohjeet',
    time: '15 min + jäähdytys',
    difficulty: 'Helppo',
    heroImage: 'https://images.unsplash.com/photo-1604413191066-4dd20bedf486?w=1400&h=700&fit=crop',
    description: 'Gazpacho on Andalusian aurinkoinen vastaus kuumaan kesään — kylmä, raaka tomaattikeitto joka on samaan aikaan yksinkertaista ja syvästi makuisaa. Parhaimmillaan kesän kypsimmistä tomaateista tehtynä.',
    seoDescription: 'Perinteinen espanjalainen Gazpacho Andaluz resepti. Kylmä tomaattikeitto kesäkurpitsalla, paprikalla ja kurkulla. Nopea 15 minuutin ohje.',
    ingredients: [
      {
        group: 'Keittoon',
        items: [
          '1 kg kypsiä tomaatteja',
          '1 vihreä paprika',
          '1/2 kurkku',
          '1 valkosipulinkynsi',
          '80 ml hyvää oliiviöljyä (extra virgin)',
          '2 rkl sherrietikkaa tai viinietikkaa',
          '1 tl merisuolaa',
          '100 g vanhaa valkoista leipää, liotettuna',
        ],
      },
      {
        group: 'Lisukkeeksi',
        items: [
          'Kuutioitua tomaattia',
          'Kuutioitua kurkkua',
          'Kuutioitua vihreää paprikaa',
          'Oliiviöljyä pirskottamaan',
          'Tuoretta basilikaa',
        ],
      },
    ],
    steps: [
      {
        text: 'Liota pala vanhaa leipää kylmässä vedessä 5 minuuttia. Purista ylimääräinen vesi pois.',
        image: null,
      },
      {
        text: 'Pilko tomaatit, paprika, kurkku ja valkosipuli karkeasti. Laita kaikki ainekset — myös liotettu leipä — tehosekoittimeen tai blenderiin.',
        image: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=800&h=500&fit=crop',
      },
      {
        text: 'Blendaa täysin sileäksi, lisäämällä oliiviöljy hitaasti joukkoon moottorin käydessä. Lisää etikka ja suola. Maista ja säädä makua.',
        image: null,
      },
      {
        text: 'Siivilöi sileäksi halutessasi. Jäähdytä jääkaapissa vähintään 2 tuntia — mieluiten yön yli. Kylmä gazpacho on aina parempaa!',
        image: null,
      },
      {
        text: 'Tarjoile kylmissä kulhoissa tai laseissa. Viimeistele kuutioitujen kasvisten, oliiviöljyn ja tuoreen basilikan kanssa.',
        image: 'https://images.unsplash.com/photo-1604413191066-4dd20bedf486?w=800&h=500&fit=crop',
      },
    ],
  },
  {
    id: 3,
    slug: 'patatas-bravas',
    title: 'Patatas Bravas',
    category: 'Ruoka ohjeet',
    time: '30 min',
    difficulty: 'Helppo',
    heroImage: 'https://images.unsplash.com/photo-1551183053-bf91798d047a?w=1400&h=700&fit=crop',
    description: 'Patatas bravas on Espanjan rakastetuimpia tapaksia — rapeiksi paistettuja perunoita tulisella bravos-kastikkeella. Löytyy lähes jokaiselta tapas-baarin listalta Madridista Barcelonaan.',
    seoDescription: 'Helppo Patatas Bravas resepti kotona. Rapeita espanjalaisia tapas-perunoita tulisella bravos-kastikkeella. Valmis 30 minuutissa.',
    ingredients: [
      {
        group: 'Perunat',
        items: [
          '800 g kiinteitä perunoita',
          'Öljyä uppopaistamiseen',
          'Merisuolaa',
        ],
      },
      {
        group: 'Bravos-kastike',
        items: [
          '200 g tomaattimurskaa',
          '1 tl savupaprikajauhetta (pimentón ahumado)',
          '1/2 tl cayennepippuria',
          '1 rkl oliiviöljyä',
          '1 valkosipulinkynsi, hienonnettuna',
          'Suolaa ja sokeria maun mukaan',
        ],
      },
      {
        group: 'Aioli (valinnainen)',
        items: [
          '100 g majoneesia',
          '1 valkosipulinkynsi, puristettuna',
          '1 tl sitruunamehua',
        ],
      },
    ],
    steps: [
      {
        text: 'Kuori ja leikkaa perunat n. 3 cm paloiksi. Keitä suolalla maustetussa vedessä 8 minuuttia — niiden pitää olla juuri ja juuri kypsiä mutta vielä kiinteitä.',
        image: null,
      },
      {
        text: 'Valuta ja kuivaa perunat hyvin paperipyyhkeellä. Tämä on tärkeää rapeuden kannalta! Anna jäähtyä hetki.',
        image: null,
      },
      {
        text: 'Kuumenna öljy 180°C. Paista perunat erissä 4–5 minuuttia kunnes kauniin kultaisia ja rapeita. Valuta ja mausta suolalla heti.',
        image: 'https://images.unsplash.com/photo-1551183053-bf91798d047a?w=800&h=500&fit=crop',
      },
      {
        text: 'Kastike: Kuullota valkosipuli oliiviöljyssä. Lisää paprikajauhe, cayenne ja tomaattimurska. Keitä 10 minuuttia miedolla lämmöllä. Mausta suolalla ja ripauksella sokeria.',
        image: null,
      },
      {
        text: 'Sekoita aioli-ainekset pienessä kulhossa. Tarjoile perunat kastikkeiden kanssa heti — rapeus on parasta tuoreena!',
        image: null,
      },
    ],
  },
  {
    id: 4,
    slug: 'tortilla-espanola',
    title: 'Tortilla Española',
    category: 'Ruoka ohjeet',
    time: '40 min',
    difficulty: 'Keskitaso',
    heroImage: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=1400&h=700&fit=crop',
    description: 'Espanjalainen tortilla on maan kansallisruoka — paksu munakas perunalla ja sipulilla. Yksinkertaisia aineksia, mutta tekniikassa on salaisuutensa. Syödään tapaksena, lounaana tai iltapalana. Hyvä tortilla on löysä sisältä ja rapea ulkoa.',
    seoDescription: 'Perinteinen espanjalainen Tortilla Española resepti. Paksu munakas perunalla ja sipulilla. Täydellinen tapas tai lounas.',
    ingredients: [
      {
        group: 'Ainekset',
        items: [
          '6 munaa (koko L)',
          '500 g kiinteitä perunoita',
          '1 iso sipuli',
          '150 ml oliiviöljyä',
          '1 tl merisuolaa',
        ],
      },
    ],
    steps: [
      {
        text: 'Kuori perunat ja leikkaa ohuiksi siivuiksi (n. 3mm). Kuori ja hienonna sipuli.',
        image: null,
      },
      {
        text: 'Kuumenna oliiviöljy laakeassa paistinpannussa. Lisää perunat ja sipuli, mausta suolalla. Kypsennä miedolla lämmöllä noin 20 minuuttia sekoitellen, kunnes perunat ovat kypsiä mutta eivät ruskistuneet — tätä kutsutaan "confitoinniksi".',
        image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&h=500&fit=crop',
      },
      {
        text: 'Riko munat kulhoon ja vatkaa. Valuta perunat-sipuli-seos öljystä reikäkauhalla ja sekoita munien joukkoon. Anna tekeytyä 5 minuuttia.',
        image: null,
      },
      {
        text: 'Kaada pannulle hieman öljyä ja kuumenna keskilämmöllä. Kaada munakas-seos pannulle. Kypsennä 4–5 minuuttia kunnes reunat ovat kiinteitä mutta keskusta vielä löysä.',
        image: null,
      },
      {
        text: 'Tässä tulee se kuuluisa käännös! Aseta iso lautanen pannun päälle, käännä reippaasti, liu\'uta tortilla takaisin pannulle toiselta puolelta. Kypsennä vielä 3 minuuttia. Sisällä saa olla hieman löysää — se on oikein!',
        image: null,
      },
    ],
  },
  {
    id: 5,
    slug: 'sangria-klassinen',
    title: 'Klassinen Sangria',
    category: 'Viinit & juomat',
    time: '15 min + jäähdytys',
    difficulty: 'Helppo',
    heroImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1400&h=700&fit=crop',
    description: 'Sangria on Espanjan kesän symboli — viinipohjainen juoma täynnä hedelmiä ja elämäniloa. Paras sangria tehdään päivää etukäteen, jotta maut ehtivät yhdistyä. Käytä kohtuullisen hintaista punaviiniä — kallista ei kannata tuhlata.',
    seoDescription: 'Perinteinen espanjalainen Sangria resepti. Hedelmäinen viinijuoma kesäjuhliin. Helppo ohje joka onnistuu aina.',
    ingredients: [
      {
        group: 'Juomaan',
        items: [
          '1 pullo (750 ml) espanjalaista punaviiniä (esim. Rioja Joven)',
          '100 ml brandya tai konjakin',
          '50 ml appelsiiniliköiriä (Cointreau tai Triple Sec)',
          '300 ml appelsiinimehua (tuoretta)',
          '2 rkl sokeria',
          '1 appelsiini, siivuiksi',
          '1 sitruuna, siivuiksi',
          '1 omena, kuutioituna',
          '10 viinirypälettä, puoliksi',
          'Jäitä tarjoiluun',
          '200 ml kivennäisvettä (lisätään tarjoillessa)',
        ],
      },
    ],
    steps: [
      {
        text: 'Liuota sokeri appelsiinimehuun sekoittamalla.',
        image: null,
      },
      {
        text: 'Leikkaa hedelmät ja laita ne isoon kannuun tai kulhoon. Kaada päälle brandy, appelsiiniliköri ja sokeri-appelsiinimehu.',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=500&fit=crop',
      },
      {
        text: 'Kaada viini joukkoon ja sekoita varovasti. Peitä ja jäähdytä jääkaapissa vähintään 4 tuntia, mieluiten yön yli.',
        image: null,
      },
      {
        text: 'Tarjoillessa lisää runsaasti jäitä ja lorauta kivennäisvettä joukkoon kuohuttamaan. Tarjoile pitkissä laseissa hedelmien kanssa.',
        image: null,
      },
    ],
  },
  {
    id: 6,
    slug: 'rioja-viiniopas',
    title: 'Riojan Viinit — Aloittelijan Opas',
    category: 'Viinit & juomat',
    time: '10 min lukemista',
    difficulty: 'Helppo',
    heroImage: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1400&h=700&fit=crop',
    description: 'Rioja on Espanjan arvostetuimpia viinialueita — tunnettua Tempranillo-rypäleestä valmistettua punaviiniä joka sopii täydellisesti espanjalaiseen ruokaan. Tämä opas kertoo kaiken mitä sinun tarvitsee tietää Riojan viinikultuurista.',
    seoDescription: 'Kattava opas Riojan viineistä suomalaisille. Mitä ovat Crianza, Reserva ja Gran Reserva? Parhaat Rioja-viinit ja ruokaparitukset.',
    ingredients: [
      {
        group: 'Riojan tärkeimmät viiniluokat',
        items: [
          'Joven — nuori, hedelmäinen, ei tammea',
          'Crianza — min. 2 vuotta, joista 1 tammessa',
          'Reserva — min. 3 vuotta, joista 1 tammessa',
          'Gran Reserva — min. 5 vuotta, joista 2 tammessa',
        ],
      },
      {
        group: 'Päärypälelajikkeet',
        items: [
          'Tempranillo — Riojan kuningas, mehevä ja kypsä',
          'Garnacha — hedelmäinen, kevyt',
          'Mazuelo — antaa hapokkuutta ja rakennetta',
          'Graciano — tuoksullinen, intensiivinen',
        ],
      },
    ],
    steps: [
      {
        text: 'Rioja sijaitsee Pohjois-Espanjassa, Rio Ebro -joen laaksossa. Alue jakautuu kolmeen osaan: Rioja Alta (viileämpi, elegantti), Rioja Alavesa (täyteläinen) ja Rioja Oriental (hedelmäinen, lämmin).',
        image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&h=500&fit=crop',
      },
      {
        text: 'Rioja Crianza on erinomainen arki-Rioja — edullinen, tasapainoinen ja helppo juoda. Sopii hyvin pastan, pizzan ja kevyiden liharuokien kanssa. Suosittele ystävillesi aloituspisteenä.',
        image: null,
      },
      {
        text: 'Rioja Reserva on jo juhlaviinitasoa. Tammen ja hedelmäisyyden tasapaino on usein täydellinen. Paras ruokaparitukset: karitsa, paahdettu sika, kypsytetyt juustot.',
        image: null,
      },
      {
        text: 'Gran Reserva on Riojan huippu — vain parhaina vuosina tehty, pitkään kypsynyt viini. Ostettaessa kannattaa juoda vielä 5–10 vuoden päästä tai antaa levätä kellarissa.',
        image: null,
      },
      {
        text: 'Tarjoilulämpötila: punainen Rioja 16–18°C. Avaa pullo 30–60 minuuttia ennen juomista. Gran Reservalle dekantteri on suositeltava.',
        image: null,
      },
    ],
  },
  {
    id: 7,
    slug: 'barcelona-paikallisena',
    title: 'Barcelona Paikallisena — Vinkit Suomalaiselle',
    category: 'Elämää Espanjassa',
    time: '15 min lukemista',
    difficulty: 'Helppo',
    heroImage: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1400&h=700&fit=crop',
    description: 'Barcelona on yksi Euroopan elävimmistä kaupungeista — meri, arkkitehtuuri, ruoka ja kulttuuri yhdistyvät täydellisesti. Tässä oppaassa kerromme miten elät kuin paikallinen, etkä turisti.',
    seoDescription: 'Barcelonan paikallisen vinkit suomalaisille. Missä syödä aamupalaa, parhaat tapas-baarit, markkinat ja paikalliset salaisuudet.',
    ingredients: [
      {
        group: 'Välttämätöntä tietää',
        items: [
          'Ruoka-ajat ovat eri kuin Suomessa',
          'Lounas on päivän tärkein ateria (14–16)',
          'Illallinen syödään vasta klo 21–23',
          'Tapas-kulttuuri = pienet annokset, paljon jakamista',
          'Katalonialaiset puhuvat mieluummin kataloniaa kuin espanjaa',
        ],
      },
    ],
    steps: [
      {
        text: 'Aamupala barcelonalaiseen tapaan: mene lähimmälle "granja" tai "bar" -kahvilaan klo 8–10. Tilaa "pa amb tomàquet" (leipä tomaatilla ja oliiviöljyllä) ja "café amb llet" (café au lait). Vältä turistikahviloita La Ramblalla.',
        image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=500&fit=crop',
      },
      {
        text: 'Paras ruokakauppa on La Boqueria -markkinahalli, mutta paikalliset suosivat rauhallisempaa Mercat de Santa Catarina El Bornissa. Käy aamulla klo 8–10 ennen turistimassoja.',
        image: null,
      },
      {
        text: 'Tapas-illallinen: Barcelonassa sanotaan "ir de tapas" — kierretään baarista baariin ja syödään pieni annos jokaisessa. El Born ja Gràcia ovat parhaat kaupunginosat tähän. Aloita klo 20, lopeta klo 23.',
        image: null,
      },
      {
        text: 'Lähiöt kuten Gràcia, Poblenou ja Sant Pere ovat paljon autenttisempia kuin turistikohteet. Vuokraa asunto näistä jos asut pidempään — elinkustannukset ovat 30–40% edullisemmat kuin Eixamplessa.',
        image: null,
      },
      {
        text: 'Kieli: Yritä muutama sanaa kataloniaa — "gràcies" (kiitos), "bon dia" (hyvää huomenta). Paikalliset arvostavat tätä valtavasti. Google Translate toimii erinomaisesti kataloniaksi.',
        image: null,
      },
    ],
  },
  {
    id: 8,
    slug: 'croquetas-de-jamon',
    title: 'Croquetas de Jamón',
    category: 'Ruoka ohjeet',
    time: '45 min',
    difficulty: 'Vaativa',
    heroImage: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=1400&h=700&fit=crop',
    description: 'Croquetas ovat espanjalaisten tapas-rakkauden ehdoton huippu — samettisen pehmeä béchamel-täyte, rapeassa leivitteessä. Hyvä croqueta on ulkoa rapea ja sisältä lähes juokseva. Vaatii hieman kärsivällisyyttä mutta tulos on korvaamaton.',
    seoDescription: 'Perinteinen Croquetas de Jamón resepti — espanjalaiset kinkku-kroketit. Samettinen béchamel-täyte rapeassa leivitteessä. Vaiheittainen ohje.',
    ingredients: [
      {
        group: 'Béchamel-täyte',
        items: [
          '100 g voita',
          '120 g vehnäjauhoja',
          '600 ml täysmaitoa (lämmintä)',
          '150 g serrano- tai iberico-kinkkua, hienonnettuna',
          '1/2 sipuli, hienonnettuna',
          'Suolaa, mustapippuria ja muskottia',
        ],
      },
      {
        group: 'Leivitys',
        items: [
          '2 munaa, vatkattuna',
          '150 g korppujauhoja (panko on paras)',
          'Öljyä uppopaistamiseen',
        ],
      },
    ],
    steps: [
      {
        text: 'Kuullota sipuli voissa miedolla lämmöllä 5 minuuttia. Lisää hienonnettu kinkku ja paistele hetki. Lisää jauhot ja sekoita voimakkaasti 2 minuuttia — syntyy "roux".',
        image: null,
      },
      {
        text: 'Lisää lämmin maito kauhallinen kerrallaan, sekoittaen jatkuvasti. Kypsennä béchamel-kastiketta miedolla lämmöllä 15–20 minuuttia sekoitellen kunnes se on paksua ja irtoaa reunoista. Mausta suolalla, pippurilla ja muskotilla.',
        image: null,
      },
      {
        text: 'Kaada massa matalaan vuokaan, peitä suoraan pinnalle asetetulla kelmulla (estää nahan muodostumisen). Jäähdytä jääkaapissa vähintään 4 tuntia, mieluiten yön yli.',
        image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=800&h=500&fit=crop',
      },
      {
        text: 'Muotoile jäähtynyt massa pienoksi lieriöiksi (n. 5 cm). Pyöritä ensin jauhoissa, sitten kananmunassa ja lopuksi korppujauhoissa. Jäähdytä vielä 30 min ennen paistoa.',
        image: null,
      },
      {
        text: 'Kuumenna öljy 180°C. Paista kroketit 2–3 minuuttia kunnes kauniin kultaisia. Älä täytä pannua liikaa — öljyn lämpötila laskee. Valuta ja tarjoile heti!',
        image: null,
      },
    ],
  },
]
