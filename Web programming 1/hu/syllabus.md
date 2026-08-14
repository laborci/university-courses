# Webprogramozás I – A web működése, szabványai és minősége

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


## 2. alkalom – Egy webes kérés útja

**Cél:** Annak megértése, mi történik egy URL megadásától a tartalom megjelenéséig.

- URL, URI, domainnév, IP-cím és port
- DNS-feloldás
- TCP és TLS szerepe fogalmi szinten
- Proxy, reverse proxy és CDN
- A kérés életútja a böngészőtől a szerverig és vissza
- Késleltetés, sávszélesség és hálózati hibák hatása


## 3. alkalom – HTTP és HTTPS

**Cél:** A web alapvető kommunikációs protokolljának és a biztonságos kommunikáció alapjainak megértése.

- A kérés–válasz modell
- HTTP-metódusok és szemantikájuk
- Státuszkódok: siker, átirányítás, kliens- és szerverhiba
- Fejlécek, törzs és tartalomtípusok
- Cache-elés alapelvei
- HTTPS, tanúsítványok és TLS


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


## 5. alkalom – Webes alkalmazások és renderelési stratégiák

**Cél:** A legfontosabb webes alkalmazásmodellek és azok kompromisszumainak megértése.

- Többoldalas és egyoldalas alkalmazások
- Kliensoldali, szerveroldali és statikus renderelés
- SPA, SSR és SSG fogalmi összehasonlítása
- Interaktivitás, navigáció és kliensoldali állapot
- Előnyök, hátrányok és tipikus felhasználási területek
- Architektúraválasztási szempontok


## 6. alkalom – Webes adatok és API-k

**Cél:** A webes rendszerek közötti adatcsere és kommunikáció alapelveinek megismerése.

- Az API fogalma és szerepe
- JSON, XML és strukturált adatcsere
- REST alapelvei
- GraphQL és RPC helye a webes ökoszisztémában
- Webhook, polling, Server-Sent Events és WebSocket
- API-verziózás, kompatibilitás és dokumentáció


## 7. alkalom – Állapot, identitás és hozzáférés

**Cél:** A webes azonosítás, munkamenetkezelés és jogosultságkezelés alapfogalmainak megértése.

- Az állapotmentes HTTP és az állapot problémája
- Cookie, session és token
- Hitelesítés és jogosultságkezelés különbsége
- OAuth 2.0 és OpenID Connect alapgondolata
- Egyszeri bejelentkezés
- Külső szolgáltatóval történő bejelentkezés folyamata


## 8. alkalom – Webbiztonsági alapok

**Cél:** A webes alkalmazások legfontosabb biztonsági kockázatainak és védelmi alapelveinek megismerése.

- Fenyegetési modell: mit és kit védünk?
- Same-origin policy és CORS
- XSS, CSRF és injekciós támadások
- Jelszavak, többfaktoros hitelesítés és munkamenetbiztonság
- HTTPS és biztonságos kommunikáció
- Az OWASP szemlélete és a biztonság közös felelőssége


## 9. alkalom – A minőségi web

**Cél:** A webes szolgáltatások használhatósági, hozzáférhetőségi, teljesítményi és adatvédelmi szempontjainak megismerése.

- Akadálymentesség és inkluzív tervezés
- Szemantika, billentyűzetes használat és képernyőolvasók
- Reszponzivitás és eszközfüggetlenség
- Teljesítmény felhasználói nézőpontból
- Kereshetőség: SEO és AI-alapú keresők, asszisztensek számára történő optimalizálás (AIO) alapjai
- Adatvédelem, nyomkövetés, cookie-hozzájárulás és digitális etika
- A GDPR webes vonatkozásai: személyes adat, jogalap, átláthatóság, adattakarékosság és érintetti jogok


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
