# Hallgatói prezentációk

## Cél

Minden alkalomhoz három választható, rövid hallgatói előadástéma kapcsolódik. A prezentáció célja, hogy egy konkrét példán, eseten vagy rövid háttérkutatáson keresztül kapcsolja össze az előadó az óra fogalmait a web valós működésével.

## Keret

- Egy előadás időtartama: **5 perc**.
- Egy hallgató a félévben **egy** prezentációt tarthat.
- A választott téma az adott óra anyagához kapcsolódjon.
- A cél nem a teljes téma lefedése, hanem egy világos kérdés vagy példa bemutatása.
- Javasolt szerkezet: probléma vagy kérdés, rövid magyarázat, konkrét példa, tanulság.
- Az állításokhoz használt forrásokat röviden jelölni kell a diához csatolt előadói jegyzetben vagy a `presentation.md` fájlban.

## Jelentkezés GitHubon

A jelentkezés a hallgató publikus `webprog1-<neptun-kod>` GitHub-repójában történik. A hallgató hozzon létre egy `presentation/` mappát, abban pedig a [presentation.md](presentation-template.md) minta alapján egy `presentation.md` fájlt.

A kitöltött fájlt a hallgató a jelentkezési határidő előtt töltse fel a repójába. A GitHub commit időpontja igazolja a jelentkezést.

A fájl tartalmazza:

- a választott alkalmat és témát;
- az előadó nevét és Neptun-kódját;
- a publikus Google Slides-prezentáció linkjét frontmatterben;
- a prezentáció rövid vázlatát;
- a felhasznált forrásokat.

Egy témára több hallgató is jelentkezhet. Ha több érvényes jelentkezés érkezik ugyanarra a témára, akkor **véletlenszerű sorsolás** dönti el, ki tartja meg az előadást. A nem kiválasztott hallgatónak másik szabad témát kell választania.

## Google Slides-beállítás

A diák Google Slides-ban készüljenek, és a `presentation.md` frontmatterében szereplő link legyen nyilvánosan megnyitható. A megosztási beállítás legalább „A link birtokában megtekintheti” legyen. A prezentációt nem kell szerkeszthetővé tenni mások számára.

## A diák szerepe

A slide **nem handout**, nem jegyzet és nem felolvasandó szöveg. A dia az előadás demonstrációs eszköze: segít a közönségnek figyelni, követni az érvelést és megérteni a példát.

Jó dia jellemzően:

- egyetlen világos gondolatot emel ki;
- képet, egyszerű ábrát, diagramot vagy rövid példát használ;
- csak néhány szót vagy rövid felsorolást tartalmaz;
- jól olvasható, nagy betűméretű;
- támogatja, de nem helyettesíti az előadót.

Kerülendő a teljes bekezdések, zsúfolt felsorolások, apró betűs forráskódok és képernyőképként beillesztett hosszú szövegek használata. A részletes magyarázat az előadó feladata; a hivatkozások és kiegészítő részletek a `presentation.md` fájlba vagy előadói jegyzetbe kerülhetnek.

## Felkészülés és előadásmód

Az előadást meg kell tanulni és be kell gyakorolni. Az előadó ne olvassa fel a diákat, és ne a képernyőn szereplő szöveg legyen a mondanivalója helyett. Aki a slide-okról olvas, **nem kap pontot** a prezentációra.

Az öt perc rövid idő, ezért különösen fontos a próba. A hallgató mérje le az előadást, gyakorolja el hangosan, és legyen képes a diákra csak emlékeztetőként tekinteni. A jó előadás nem attól jó, hogy sok információt zsúfol bele, hanem attól, hogy egyetlen gondolatot érthetően, példával együtt ad át.

## Választható témák

### 1. alkalom – Mi a web?

- Miért vált a web az egyik legfontosabb általános informatikai platformmá?
- A böngészőháborúk és a nyílt webszabványok jelentősége.
- Web 1.0, Web 2.0 és a platformweb: mit jelentenek ezek a fogalmak?

### 2. alkalom – Egy webes kérés útja

- Hogyan működik a DNS, és miért kritikus része az internetnek?
- Mi az a CDN, és miért töltődhet be ugyanaz az oldal más sebességgel két országban?
- Mi történik, ha egy domainnévhez tartozó DNS-bejegyzés hibás vagy nem elérhető?

### 3. alkalom – HTTP és HTTPS

- A leggyakoribb HTTP-státuszkódok és a jó hibaüzenetek szerepe.
- Miért fontos a HTTPS, és mit garantál egy tanúsítvány?
- HTTP/1.1, HTTP/2 és HTTP/3: milyen problémákra adnak választ?

### 4. alkalom – Böngészők és webes dokumentumok

- HTML, CSS és JavaScript: szerkezet, megjelenés és viselkedés egy konkrét oldalon.
- Cookie, localStorage és IndexedDB: mire valóak, és miben különböznek?
- Canvas és WebGL: hogyan jelenhet meg összetett grafika közvetlenül a böngészőben?

### 5. alkalom – Webes alkalmazások és renderelési stratégiák

- SPA vagy többoldalas alkalmazás: mikor melyik a jobb választás?
- Szerveroldali és kliensoldali renderelés összehasonlítása.
- Hogyan teszi lehetővé a service worker az offline használatot és a progresszív webalkalmazásokat?

### 6. alkalom – Webes adatok és API-k

- REST és GraphQL: milyen problémát oldanak meg, és miben különböznek?
- Valós idejű web: polling, Server-Sent Events és WebSocket összehasonlítása.
- Egy nyilvános API dokumentációjának értelmezése: mitől használható egy API?

### 7. alkalom – Állapot, identitás és hozzáférés

- Cookie, session és token: három eltérő megoldás az állapot kezelésére.
- Mi történik a „Belépés Google-fiókkal” gomb megnyomása után?
- Jelszavak, többfaktoros azonosítás és passkey-k: merre fejlődik a belépés?

### 8. alkalom – Webbiztonsági alapok

- XSS: hogyan válhat veszélyessé egy ártalmatlannak tűnő szövegmező?
- CORS és same-origin policy: miért nem fér hozzá tetszőleges oldal minden adathoz?
- Adathalászat és megtévesztő weboldalak: milyen jelek alapján ismerhetők fel?

### 9. alkalom – A minőségi web

- Akadálymentes web: hogyan használ egy képernyőolvasó egy weboldalt?
- SEO és AIO: hogyan teszik a tartalmat megtalálhatóvá keresők és MI-alapú asszisztensek számára?
- GDPR a weben: milyen személyes adatokat kezelhet egy weboldal, és milyen feltételekkel?

### 10. alkalom – Megbízható és nagy teljesítményű web

- Miért omlanak össze a népszerű webes szolgáltatások csúcsforgalom idején?
- Cache és CDN: hogyan csökkentik a terhelést és a betöltési időt?
- Hogyan kommunikáljon egy szolgáltató a felhasználóival üzemzavar esetén?
