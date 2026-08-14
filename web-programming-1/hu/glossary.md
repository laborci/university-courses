# Fogalomtár

## A web és a hálózat alapjai

- **Internet:** globálisan összekapcsolt számítógép-hálózatok rendszere.
- **World Wide Web:** böngészőből elérhető, hivatkozásokkal összekötött erőforrások rendszere az interneten.
- **Kliens:** szolgáltatást vagy erőforrást kérő program, például böngésző.
- **Szerver:** hálózaton keresztül szolgáltatást vagy erőforrást nyújtó rendszer.
- **Kliens–szerver modell:** a kliens kér, a szerver feldolgoz és válaszol.
- **Protokoll:** kommunikációs szabályok közösen elfogadott rendszere.
- **URI:** erőforrás általános azonosítója.
- **URL:** olyan URI, amely az elérés helyét és módját is megadja.
- **Domainnév:** emberbarát, hierarchikus hálózati név.
- **DNS:** elosztott névszolgáltatás, amely domainneveket hálózati információkhoz rendel.
- **IP-cím:** hálózati végpont számszerű címe.
- **Port:** egy gépen belüli hálózati szolgáltatás azonosítója.
- **DNS-rekord:** a DNS-ben tárolt információegység, például IP-cím vagy levelezési útvonal.
- **TTL:** a DNS-válasz gyorsítótárazhatóságának ideje.
- **TCP:** megbízható, kapcsolat-orientált adatátviteli protokoll.
- **TLS:** titkosságot, sértetlenséget és hitelesítést biztosító biztonsági protokoll.
- **Proxy:** kliensoldali közvetítő rendszer.
- **Reverse proxy:** szerveroldali belépési pont, amely a kéréseket háttérszolgáltatásokhoz irányítja.
- **CDN:** földrajzilag elosztott tartalomkézbesítő hálózat.

## HTTP és webes kommunikáció

- **HTTP:** a webes kliens–szerver kommunikáció alapvető protokollja.
- **HTTPS:** HTTP TLS-védelemmel.
- **Kérés:** a kliens által küldött szolgáltatási vagy adatigény.
- **Válasz:** a szerver feldolgozott eredménye a kliens kérére.
- **HTTP-metódus:** a kérés szándékát jelző művelet, például `GET` vagy `POST`.
- **GET:** erőforrás lekérésére szolgáló HTTP-metódus.
- **POST:** adat vagy művelet elküldésére szolgáló HTTP-metódus.
- **PUT:** erőforrás teljes cseréjét vagy létrehozását jelző metódus.
- **PATCH:** erőforrás részleges módosítását jelző metódus.
- **DELETE:** erőforrás törlését jelző metódus.
- **HEAD:** a GET-hez hasonló, de választest nélküli lekérdezés.
- **OPTIONS:** az elérhető kommunikációs lehetőségekre kérdez rá.
- **Státuszkód:** a kérés feldolgozásának szabványos számszerű jelzése.
- **Fejléc:** a HTTP-üzenet metaadatait hordozó név–érték pár.
- **Törzs:** a HTTP-üzenet tényleges tartalma.
- **Content-Type:** a küldött vagy várt adat formátumát jelző fejléc.
- **Accept:** a kliens által elfogadható válaszformátumokat jelző kérésfejléc.
- **Authorization:** hitelesítési adatot hordozó kérésfejléc.
- **Location:** átirányítás vagy új erőforrás címét közlő válaszfejléc.
- **Cache-Control:** a gyorsítótárazás szabályait közlő fejléc.
- **Cache:** korábbi válasz vagy erőforrás ideiglenes tárolása gyorsabb újrafelhasználás céljára.
- **ETag:** egy válaszváltozat azonosítója, amely támogatja a frissesség ellenőrzését.
- **Idempotencia:** ugyanazon művelet ismétlése ugyanahhoz a célállapothoz vezet.

## Böngészők és dokumentumok

- **Böngésző:** webes erőforrások lekérésére, értelmezésére és megjelenítésére szolgáló kliensalkalmazás.
- **HTML:** a webes dokumentum szerkezetét és szemantikáját leíró nyelv.
- **CSS:** a webes dokumentum megjelenését és elrendezését leíró szabályrendszer.
- **JavaScript:** a böngészőben futó programozási nyelv interaktivitáshoz és kliensoldali feldolgozáshoz.
- **Szemantika:** a dokumentum elemeinek jelentése és logikai szerepe.
- **DOM:** a böngésző által felépített, programozható dokumentumobjektum-fa.
- **CSSOM:** a CSS-szabályok böngészőbeli belső modellje.
- **Render tree:** a megjelenő elemek és kiszámított stílusaik fája.
- **Layout:** az elemek méretének és helyének kiszámítása.
- **Paint:** a vizuális részletek kirajzolásához szükséges utasítások előállítása.
- **Compositing:** külön kezelt vizuális rétegek végső képpé összeillesztése.
- **Renderelés:** a dokumentum és stílusok képernyőre rajzolásának folyamata.
- **Erőforrás:** weben elérhető, címmel azonosítható dokumentum, adat vagy állomány.
- **Lazy loading:** nem azonnal szükséges erőforrások késleltetett betöltése.
- **Canvas:** programozható kétdimenziós rajzfelület.
- **WebGL:** grafikus hardver gyorsítását használó webes grafikai technológia.
- **Geolocation:** helyadat lekérésére szolgáló böngésző-képesség.
- **Service worker:** hálózati kéréseket közvetíteni képes böngészőoldali háttérprogram.
- **PWA:** progresszív webalkalmazás, amely fokozatosan, az elérhető képességekhez igazodva működik.
- **Interoperabilitás:** különböző rendszerek együttműködési képessége közös szabványok alapján.
- **Feature detection:** annak vizsgálata, hogy a szükséges képesség elérhető-e az aktuális böngészőben.
- **Progressive enhancement:** stabil alapfunkcióra épülő fejlettebb megjelenés és interakció.

## Alkalmazásarchitektúrák és API-k

- **MPA:** többoldalas alkalmazás, ahol navigációkor jellemzően új HTML-dokumentum érkezik.
- **SPA:** egyoldalas alkalmazás, ahol a felület nagy része böngészőoldali navigációval változik.
- **CSR:** kliensoldali renderelés; a felületet főként a böngészőben futó JavaScript állítja elő.
- **SSR:** szerveroldali renderelés; a szerver a kéréskor HTML-t állít elő.
- **SSG:** statikus webhelygenerálás; az oldalak jellemzően kiadás előtt készülnek el.
- **Hidratálás:** a szerver által küldött HTML-hez kliensoldali viselkedés kapcsolása.
- **Kliensoldali állapot:** a böngészőben a felület működéséhez tárolt adat.
- **localStorage:** eredethez kötött, böngészőoldali kulcs–érték tároló.
- **API:** programozott felület, amelyen rendszerek adatot vagy műveletet érnek el.
- **API-szerződés:** az API műveleteit, adatformátumait és viselkedését rögzítő megállapodás.
- **Végpont:** egy HTTP-metódus és útvonal által azonosított API-művelet.
- **JSON:** szabályos, szöveges adatcsere-formátum strukturált adatok számára.
- **XML:** címkékre épülő strukturált adatleíró formátum.
- **REST:** erőforrásközpontú, HTTP szemantikájára építő API-szemlélet.
- **GraphQL:** sémavezérelt lekérdezési nyelv és API-megközelítés.
- **RPC:** távoli eljáráshívás; műveletközpontú API-szemlélet.
- **Webhook:** esemény által kiváltott, a szolgáltató által indított HTTP-értesítés.
- **Polling:** rendszeres, kliens által indított lekérdezés változások ellenőrzésére.
- **Long polling:** a szerver a választ új eseményig vagy időkorlátig nyitva tartja.
- **SSE:** szerver által a kliens felé továbbított egyirányú eseményfolyam.
- **WebSocket:** tartós, kétirányú kommunikációs csatorna kliens és szerver között.

## Identitás és biztonság

- **Hitelesítés (AuthN):** annak igazolása, ki a kérő.
- **Jogosultságkezelés (AuthZ):** annak eldöntése, mit tehet a hitelesített kérő.
- **Cookie:** webhelyhez kötött, kis méretű adat, amelyet a böngésző meghatározott feltételekkel küldhet a szervernek.
- **Session:** szerveroldalon nyilvántartott munkamenetállapot.
- **Token:** a kérőhöz vagy hozzáféréshez kapcsolódó, hordozható azonosító vagy állítás.
- **JWT:** aláírt, strukturált tokenformátum állítások továbbítására.
- **OAuth 2.0:** korlátozott hozzáférés delegálását szabályozó keretrendszer.
- **OpenID Connect:** OAuth 2.0-ra épülő identitási réteg.
- **SSO:** egyszeri bejelentkezés; egy központi hitelesítés több szolgáltatásban használható.
- **MFA:** többtényezős hitelesítés.
- **Passkey:** eszközhöz és kriptográfiai kulcshoz kötött, jelszó nélküli bejelentkezési megoldás.
- **Same-origin policy:** böngészőbiztonsági szabály, amely elkülöníti a különböző originű erőforrásokat.
- **Origin:** séma, host és port együttese.
- **CORS:** HTTP-fejlécekkel adott, kontrollált engedély cross-origin böngészős olvasásra.
- **XSS:** nem megbízható tartalom végrehajtható kódként való megjelenéséből eredő kockázat.
- **CSRF:** olyan kérés, amely a felhasználó bejelentkezett állapotát használja, de nem a tudatos szándékát tükrözi.
- **Injekció:** adat és értelmezett utasítás szerkezetének összemosásából eredő hibacsalád.
- **CSP:** a böngészőnek adott szabályrendszer az engedélyezett tartalomforrásokról.
- **OWASP:** közösség és tudásbázis a webalkalmazások biztonsági kockázatairól és védelméről.

## Minőség, hozzáférhetőség és üzemeltetés

- **Akadálymentesség:** annak biztosítása, hogy a digitális szolgáltatás eltérő képességű felhasználók számára is használható legyen.
- **ARIA:** akadálymentességi szerepek és tulajdonságok rendszere, amely indokolt esetben kiegészíti a HTML szemantikáját.
- **Képernyőolvasó:** segítő technológia, amely a felület szerkezetét beszéddel vagy Braille-kijelzőn közvetíti.
- **Reszponzivitás:** a felület alkalmazkodása eltérő képernyőkhöz és eszközökhöz.
- **SEO:** a keresők számára érthető és feltérképezhető tartalom kialakításának gyakorlata.
- **AIO:** az MI-alapú keresők és asszisztensek számára is jól értelmezhető tartalom kialakításának gyakorlata.
- **Feltérképezés:** weboldalak automatikus felfedezése és lekérése.
- **Indexelés:** feldolgozott tartalom felvétele kereshető rendszerbe.
- **LCP:** a legnagyobb látható tartalmi elem megjelenésének idejét közelítő mutató.
- **INP:** a felhasználói interakció utáni látható visszajelzés késését közelítő mutató.
- **CLS:** a váratlan vizuális elrendezés-ugrásokat összegző mutató.
- **Adatminimalizálás:** csak a célhoz szükséges személyes adatok kérése és kezelése.
- **Hozzájárulás:** tájékozott, önkéntes jóváhagyás egy adatkezeléshez vagy böngészőképességhez.
- **Rendelkezésre állás:** annak aránya, hogy a szolgáltatás rendeltetésszerűen használható.
- **SLI:** szolgáltatási szintet mérő mutató.
- **SLO:** az SLI-re kitűzött célérték.
- **SLA:** szerződésben rögzített szolgáltatási vállalás.
- **Megfigyelhetőség:** a rendszer belső állapotára következtetés logok, metrikák és nyomkövetések alapján.
- **Log:** részletes, eseményszintű naplóbejegyzés.
- **Metrika:** összesített, időben követhető mérőszám.
- **Trace:** egy kérés több összetevőn átvezető útjának nyomkövetése.
- **Rate limit:** kérési gyakoriság tudatos korlátozása egy kliens vagy azonosító számára.
- **Graceful degradation:** kevésbé fontos funkciók kontrollált korlátozása a lényeges működés megőrzésére.
