# HTTP-státuszkódok

A státuszkód a szerver rövid, szabványos válasza arra, mi történt a kéréssel. Nem puszta hibakeresési részlet: a böngésző, keresőrobot, API-kliens és gyorsítótár is ebből dönthet a következő lépésről.

## A válasz első sora

Egy válasz például így kezdődik: HTTP/1.1 404 Not Found. A programok elsősorban a háromjegyű számot értelmezik. A 404 azt közli, hogy a szerver a kért erőforrást nem találta a megadott címen. Nem azt, hogy nincs internet vagy biztosan hibás a teljes webhely.

| Család | Jelentés |
| --- | --- |
| 1xx | feldolgozás közbeni tájékoztatás |
| 2xx | sikeres kérés |
| 3xx | további lépés, rendszerint átirányítás |
| 4xx | a kérés e formában nem teljesíthető |
| 5xx | szerveroldali vagy háttérszolgáltatási probléma |

A 4xx és 5xx nem hibás emberről szól. A 4xx lehet rossz URL, hiányzó belépés vagy túl gyors kérdezés; az 5xx lehet átmeneti túlterhelés. A jó szolgáltatás a gépnek pontos kódot, az embernek érthető magyarázatot ad.

## 1xx – feldolgozás közben

Az 1xx válaszok ritkábban láthatók böngészőben. A 100 Continue arra szolgálhat, hogy nagy kérés törzsének elküldése előtt a kliens meggyőződjön: a szerver hajlandó fogadni azt. A 101 Switching Protocols protokollváltást jelezhet, például WebSocket-kapcsolatra váltáskor. A 103 Early Hints a végleges válasz előtt utalhat előre betölthető erőforrásokra. Ez mutatja, hogy a HTTP nem mindig egyetlen kérésből és végső válaszból áll.

## 2xx – siker, de melyik fajta?

A 200 OK a leggyakoribb sikeres válasz. GET /time kérésre a szerver küldhet 200 OK választ Content-Type: application/json fejléccel és {"time":"2026-08-12T10:15:00.000Z"} törzzsel.

A 201 Created azt jelzi, hogy új erőforrás jött létre. Új jelentkezésnél jó válasz lehet 201 Created és Location: /api/jelentkezesek/815. A 202 Accepted azt jelenti, hogy a szerver elfogadta a kérést, de a hosszú feldolgozás még nem készült el – például videókonvertálás vagy vírusellenőrzés zajlik. A 204 No Content szerint a kérés sikerült, de szándékosan nincs választest; gyakori sikeres DELETE után.

Tévhit, hogy minden sikerhez 200 kell. A pontos kód segít: 201 után tudjuk, hogy új objektum született, 202 után státuszt kérdezhetünk, 204 után pedig nem próbálunk nem létező JSON-t feldolgozni.

## 3xx – átirányítások és gyorsítótár

A 301 Moved Permanently tartós költözést jelez, a Location fejlécben az új címmel. A 302 Found történetileg általános átirányítási kód; sok esetben világosabb a 303 See Other, amely POST után arra utasíthatja a böngészőt, hogy az eredményoldalt GET-tel kérje le. Így frissítéskor nem küldi el ismét az űrlapot.

A 307 Temporary Redirect ideiglenes átirányítás, amely megőrzi az eredeti metódust. A 308 Permanent Redirect ugyanez tartós esetben. Ez POST-nál különösen lényeges. A 304 Not Modified cache-ellenőrzéshez tartozik: a kliensnek van eltárolt példánya, és a szerver azt mondja, hogy az még friss. Nem általános üzleti nem változott válasz.

## 4xx – a kérés problémája

A 400 Bad Request formailag hibás vagy értelmezhetetlen kérésre való, például sérült JSON-ra vagy hiányzó kötelező paraméterre. A hibatörzs legyen konkrét, például {"error":"validation_error","field":"email","message":"Érvényes e-mail-cím szükséges."}.

A 401 Unauthorized félrevezető nevű: tipikusan hiányzó vagy hibás hitelesítést jelent. A 403 Forbidden esetén a szerver tudja, ki kérdez, de nem engedi a műveletet. Egy hallgató lehet bejelentkezve, mégsem láthat adminisztrátori adatokat.

A 404 Not Found hiányzó erőforrás. A 405 Method Not Allowed szerint az útvonal létezik, de az adott metódus nem használható rajta; az Allow fejléc mutathatja a megengedetteket. A 406 Not Acceptable akkor jöhet, ha a kliens által kért válaszformátum nem elérhető. A 408 Request Timeout szerint a szerver nem vár tovább a hiányosan beérkező kérésre.

A 409 Conflict szerverállapottal való ütközést jelez, például már foglalt e-mail-címmel történő regisztrációt. A 410 Gone azt mondja, hogy a korábban létező erőforrást végleg eltávolították. A 413 Content Too Large tipikus túl nagy feltöltött fájlnál. A 415 Unsupported Media Type például akkor jó, ha az API JSON-t vár, de a kliens más típusú törzset küld. A 422 Unprocessable Content formailag jó, de tartalmilag elutasított kérésre használható, például lejárt jelentkezési határidő esetén. A 429 Too Many Requests sebességkorlátozást jelez; a Retry-After fejléc közölheti, mikor lehet újrapróbálni.

## 5xx – a szolgáltatás nem tudott helyesen válaszolni

A 500 Internal Server Error váratlan belső hibát jelent. A felhasználónak ne jelenjen meg teljes hibanyom vagy titkos adat; rövid üzenet és hibaazonosító elég. A 501 Not Implemented szerint a szerver nem támogatja a szükséges funkciót; ez nem azonos a 405-tel.

A 502 Bad Gateway gyakran proxy vagy átjáró válasza, amikor a háttérszolgáltatástól hibás választ kap. A 503 Service Unavailable átmeneti túlterhelést vagy karbantartást jelent. A 504 Gateway Timeout azt, hogy egy köztes komponens túl sokáig várt háttérszolgáltatásra. A pontos kód segíti az üzemeltetőt és azt is, hogy a kliens várjon-e és próbálkozzon-e újra.

## Végigvezetett példa: házi feltöltése

Egy hallgató feltölt egy beadandót. Bejelentkezés nélkül 401 jöhet. Bejelentkezve, de tiltott fájltípussal 415; túl nagy fájllal 413; lejárt határidővel 422. Sikeres új beadáskor 201 Created és a beadás URL-je megfelelő. Ha a vírusellenőrzés háttérfolyamat, 202 Accepted őszinte válasz. Ha a tárhely karbantartás alatt áll, 503 jobb, mint egy megtévesztő 200-as válasz.

## Tipikus tévhitek

**A 404 mindig szerverhiba.** Nem; lehet hibás vagy elavult hivatkozás is.

**A 401 azt jelenti, hogy nincs jogosultságom.** Pontosabban: nincs megfelelő hitelesítésed. A megismert, de tiltott művelet 403.

**Elég 200-as választ adni sikertelen eredményjelzővel.** Ez félrevezeti a HTTP-szintű klienseket. A helyes hibakód és részletes törzs együtt jobb.

**Az 500 minden hibára megfelelő.** Túlterheléshez 503, átjáró időtúllépéséhez 504 pontosabb.

## Ellenőrző kérdések

1. Mikor választanál 201-et a 200 helyett?
2. Miért más a 202, mint a 200?
3. Milyen helyzetben értelmes a 304?
4. Magyarázd el a 401 és 403 közötti különbséget.
5. Melyik kód való túl nagy feltöltött fájlra?
6. Miben különbözik az 502, 503 és 504?
7. Miért félrevezető egy hibás kérésre 200-at válaszolni?

## Fogalomtár

- **Státuszkód:** háromjegyű HTTP-eredményjelzés.
- **Átirányítás:** további kérésre, gyakran másik URL-re irányító válasz.
- **Location fejléc:** új vagy átirányított erőforrás címét adja meg.
- **Hitelesítés:** annak igazolása, ki a kérő.
- **Jogosultságkezelés:** annak eldöntése, mit tehet a megismert kérő.
- **Validáció:** beküldött adatok formai és tartalmi ellenőrzése.
- **Átjáró:** másik háttérszolgáltatás felé közvetítő komponens.
- **Időtúllépés:** a kommunikációra adott idő lejárta.
- **Gyorsítótár-validálás:** korábbi válasz frissességének ellenőrzése.
