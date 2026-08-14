# Webprogramozás I – A web működése, szabványai és minősége

## Tantárgyi tematika

**Oktatási forma:** 10 × 90 perc elméleti előadás demonstrációkkal  
**Programozási feladat:** nincs

## Célkitűzés

A tantárgy célja, hogy a hallgatók megértsék a web mint nyílt, elosztott információs rendszer működését. A kurzus áttekinti a web kommunikációs modelljét, a böngészők működését, a webes adatok és API-k szerepét, valamint a biztonság, akadálymentesség, teljesítmény és adatvédelem alapelveit. A hangsúly tartós fogalmakon és összefüggéseken van, nem konkrét programozási nyelveken, keretrendszereken vagy üzemeltetési eszközökön.

## 1. alkalom – Mi a web?

**Cél:** A web helyének megértése az interneten belül, valamint a webes ökoszisztéma alapvető szereplőinek és szabványainak megismerése.

- Internet és World Wide Web viszonya
- Miért fontos a webprogramozást tanulni? A web mint általános informatikai platform, kommunikációs közeg és felhasználói felület
- A web fejlődése: dokumentumwebtől alkalmazásszerű webig
- A web fő szereplői: böngésző, szerver, keresőmotor, tartalomszolgáltató
- Kliens–szerver modell és többrétegű rendszerek alapjai
- Nyílt szabványok és interoperabilitás
- W3C, WHATWG és IETF szerepe

**Demonstráció:** Egy weboldal fő összetevőinek feltárása a böngésző fejlesztői eszközeivel.

**Hallgatói előadástémák (5 perc, választható):**

- Miért vált a web az egyik legfontosabb általános informatikai platformmá?
- A böngészőháborúk és a nyílt webszabványok jelentősége
- Web 1.0, Web 2.0 és a platformweb: mit jelentenek ezek a fogalmak?

## 2. alkalom – Egy webes kérés útja

**Cél:** Annak megértése, mi történik egy URL megadásától a tartalom megjelenéséig.

- URL, URI, domainnév, IP-cím és port
- DNS-feloldás
- TCP és TLS szerepe fogalmi szinten
- Proxy, reverse proxy és CDN
- A kérés életútja a böngészőtől a szerverig és vissza
- Késleltetés, sávszélesség és hálózati hibák hatása

**Demonstráció:** DNS-feloldás és webes kérések hálózati nyomainak megfigyelése.

**Hallgatói előadástémák (5 perc, választható):**

- Hogyan működik a DNS, és miért kritikus része az internetnek?
- Mi az a CDN, és miért töltődhet be ugyanaz az oldal más sebességgel két országban?
- Mi történik, ha egy domainnévhez tartozó DNS-bejegyzés hibás vagy nem elérhető?

## 3. alkalom – HTTP és HTTPS

**Cél:** A web alapvető kommunikációs protokolljának és a biztonságos kommunikáció alapjainak megértése.

- A kérés–válasz modell
- HTTP-metódusok és szemantikájuk
- Státuszkódok: siker, átirányítás, kliens- és szerverhiba
- Fejlécek, törzs és tartalomtípusok
- Cache-elés alapelvei
- HTTPS, tanúsítványok és TLS

**Demonstráció:** HTTP-kérések és -válaszok értelmezése a böngészőben.

**Hallgatói előadástémák (5 perc, választható):**

- A leggyakoribb HTTP-státuszkódok és a jó hibaüzenetek szerepe
- Miért fontos a HTTPS, és mit garantál egy tanúsítvány?
- HTTP/1.1, HTTP/2 és HTTP/3: milyen problémákra adnak választ?

## 4. alkalom – Böngészők mint dokumentum-megjelenítők és futtatókörnyezetek

**Cél:** A böngészőben megjelenő webes tartalom, a három alapvető webes technológia és a böngésző által nyújtott képességek áttekintése.

- HTML, CSS és JavaScript szerepe: szerkezet, megjelenés és viselkedés
- Dokumentumszerkezet és DOM
- Renderelési folyamat
- Szemantikus HTML jelentősége
- Erőforrások betöltése: képek, betűtípusok, szkriptek és stíluslapok
- Böngészőoldali adattárolás: cookie, localStorage, sessionStorage, IndexedDB és Cache Storage
- Böngésző-képességek: 2D canvas, WebGL, média- és fájlkezelési API-k, helyadatok és értesítések
- Szolgáltatásmunkások (service worker) és offline működés alapgondolata
- Böngészők közötti kompatibilitás

**Demonstráció:** DOM-fa, betöltött erőforrások és böngészőoldali tárolók vizsgálata.

**Hallgatói előadástémák (5 perc, választható):**

- HTML, CSS és JavaScript: szerkezet, megjelenés és viselkedés egy konkrét oldalon
- Cookie, localStorage és IndexedDB: mire valóak, és miben különböznek?
- Canvas és WebGL: hogyan jelenhet meg összetett grafika közvetlenül a böngészőben?

## 5. alkalom – Webes alkalmazások és renderelési stratégiák

**Cél:** A legfontosabb webes alkalmazásmodellek és azok kompromisszumainak megértése.

- Többoldalas és egyoldalas alkalmazások
- Kliensoldali, szerveroldali és statikus renderelés
- SPA, SSR és SSG fogalmi összehasonlítása
- Interaktivitás, navigáció és kliensoldali állapot
- Előnyök, hátrányok és tipikus felhasználási területek
- Architektúraválasztási szempontok

**Eset:** Híroldal, webáruház és online levelező rendszer összehasonlítása.

**Hallgatói előadástémák (5 perc, választható):**

- SPA vagy többoldalas alkalmazás: mikor melyik a jobb választás?
- Szerveroldali és kliensoldali renderelés összehasonlítása
- Hogyan teszi lehetővé a service worker az offline használatot és a progresszív webalkalmazásokat?

## 6. alkalom – Webes adatok és API-k

**Cél:** A webes rendszerek közötti adatcsere és kommunikáció alapelveinek megismerése.

- Az API fogalma és szerepe
- JSON, XML és strukturált adatcsere
- REST alapelvei
- GraphQL és RPC helye a webes ökoszisztémában
- Webhook, polling, Server-Sent Events és WebSocket
- API-verziózás, kompatibilitás és dokumentáció

**Demonstráció:** Nyilvános API kérésének és válaszának értelmezése.

**Hallgatói előadástémák (5 perc, választható):**

- REST és GraphQL: milyen problémát oldanak meg, és miben különböznek?
- Valós idejű web: polling, Server-Sent Events és WebSocket összehasonlítása
- Egy nyilvános API dokumentációjának értelmezése: mitől használható egy API?

## 7. alkalom – Állapot, identitás és hozzáférés

**Cél:** A webes azonosítás, munkamenetkezelés és jogosultságkezelés alapfogalmainak megértése.

- Az állapotmentes HTTP és az állapot problémája
- Cookie, session és token
- Hitelesítés és jogosultságkezelés különbsége
- OAuth 2.0 és OpenID Connect alapgondolata
- Egyszeri bejelentkezés
- Külső szolgáltatóval történő bejelentkezés folyamata

**Eset:** A „Belépés Google-fiókkal” folyamatának elemzése.

**Hallgatói előadástémák (5 perc, választható):**

- Cookie, session és token: három eltérő megoldás az állapot kezelésére
- Mi történik a „Belépés Google-fiókkal” gomb megnyomása után?
- Jelszavak, többfaktoros azonosítás és passkey-k: merre fejlődik a belépés?

## 8. alkalom – Webbiztonsági alapok

**Cél:** A webes alkalmazások legfontosabb biztonsági kockázatainak és védelmi alapelveinek megismerése.

- Fenyegetési modell: mit és kit védünk?
- Same-origin policy és CORS
- XSS, CSRF és injekciós támadások
- Jelszavak, többfaktoros hitelesítés és munkamenetbiztonság
- HTTPS és biztonságos kommunikáció
- Az OWASP szemlélete és a biztonság közös felelőssége

**Eset:** Hibásan kialakított webes bejelentkezés és adatbeküldés kockázatai.

**Hallgatói előadástémák (5 perc, választható):**

- XSS: hogyan válhat veszélyessé egy ártalmatlannak tűnő szövegmező?
- CORS és same-origin policy: miért nem fér hozzá tetszőleges oldal minden adathoz?
- Adathalászat és megtévesztő weboldalak: milyen jelek alapján ismerhetők fel?

## 9. alkalom – A minőségi web

**Cél:** A webes szolgáltatások használhatósági, hozzáférhetőségi, teljesítményi és adatvédelmi szempontjainak megismerése.

- Akadálymentesség és inkluzív tervezés
- Szemantika, billentyűzetes használat és képernyőolvasók
- Reszponzivitás és eszközfüggetlenség
- Teljesítmény felhasználói nézőpontból
- Kereshetőség: SEO és AI-alapú keresők, asszisztensek számára történő optimalizálás (AIO) alapjai
- Adatvédelem, nyomkövetés, cookie-hozzájárulás és digitális etika
- A GDPR webes vonatkozásai: személyes adat, jogalap, átláthatóság, adattakarékosság és érintetti jogok

**Demonstráció:** Akadálymentességi és teljesítményproblémák felismerése egy nyilvános oldalon.

**Hallgatói előadástémák (5 perc, választható):**

- Akadálymentes web: hogyan használ egy képernyőolvasó egy weboldalt?
- SEO és AIO: hogyan teszik a tartalmat megtalálhatóvá keresők és MI-alapú asszisztensek számára?
- GDPR a weben: milyen személyes adatokat kezelhet egy weboldal, és milyen feltételekkel?

## 10. alkalom – Megbízható és nagy teljesítményű web

**Cél:** A webes szolgáltatások rendelkezésre állásának, teljesítményének és hibakezelésének alapvető megértése.

- Mit jelent a webes szolgáltatás minősége?
- Rendelkezésre állás, hibák és hibakezelés
- Teljesítmény: válaszidő, betöltési idő és erőforrásigény
- Cache-elés szerepe a weben
- CDN-ek és a földrajzi távolság hatása
- Terhelés, csúcsforgalom és fokozatos leállás
- Hibajelzések és felhasználói kommunikáció
- Megfigyelhetőség alapjai: naplók, metrikák és riasztások fogalmi szinten
- A teljesítmény, biztonság és költség közötti kompromisszumok

**Eset:** Mi történik, amikor egy népszerű jegyértékesítő vagy egyetemi rendszer a nyitás pillanatában túlterhelődik?

**Hallgatói előadástémák (5 perc, választható):**

- Miért omlanak össze a népszerű webes szolgáltatások csúcsforgalom idején?
- Cache és CDN: hogyan csökkentik a terhelést és a betöltési időt?
- Hogyan kommunikáljon egy szolgáltató a felhasználóival üzemzavar esetén?
