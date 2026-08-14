# Fejlécek, törzs és tartalomtípusok

Amikor egy böngésző weboldalt kér, nem egyszerűen azt mondja a szervernek, hogy „kérem ezt az oldalt”. Egy pontosan felépített HTTP-üzenetet küld. Az üzenet elején rövid, gépnek szóló utasítások állnak; ezek a **fejlécek** (headers). Utánuk – ha van – következik az elküldött tartalom, az **üzenettörzs** (body). Ez a felosztás sok hétköznapi jelenséget megmagyaráz: miért jelenik meg letöltési párbeszédablak, honnan tudja a szerver, hogy a felhasználó be van jelentkezve, vagy miért engedélyezett egyik weboldalról egy API-hívás, egy másikról pedig nem.

## Egy nyers kérés olvasása

Egy egyszerű böngészős kérés szövegesen közel így néz ki:

```http
GET /tantargyak/webprog HTTP/1.1
Host: example.edu
Accept: text/html,application/xhtml+xml
Accept-Language: hu-HU,hu;q=0.9
User-Agent: Mozilla/5.0 (...)
Cookie: session=abc123

```

Az első sor a kérés kezdősora: metódus, útvonal és HTTP-verzió. A következő sorok fejlécek. Egy fejléc `Név: érték` pár: nem az oldal tartalma, hanem az üzenet értelmezéséhez szükséges körülmény. Az üres sor jelzi a fejlécek végét. Ennél a `GET` kérésnél nincs törzs; nem minden HTTP-üzenet tartalmaz egyet.

A válasz is ugyanígy tagolt:

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: max-age=600
Content-Length: 248

<!doctype html><html><body><h1>Webprogramozás</h1></body></html>
```

Az első sor itt státuszsor. A válasz fejlécei után lévő HTML a törzs. Fontos különbség: a `Content-Type` nem „HTML-t csinál” a szövegből, hanem közli a fogadó féllel, hogyan kezelje azt. Ha ugyanazt a bájtsorozatot a szerver `text/plain`-ként küldi, a böngésző szövegként jelenítheti meg, nem dokumentumként.

## Tartalomtípus: mit küldtünk, mit kérünk?

A **MIME-típus** vagy médiatípus két részből áll, például `text/html`, `application/json`, `image/png`. A válaszban a `Content-Type` a ténylegesen küldött törzset írja le. Karakteres tartalomnál a kódolás is számít: `text/html; charset=utf-8`. UTF-8 nélkül az ékezetes betűk hibásan jelenhetnek meg.

A kérésben az `Accept` nem ugyanaz: a kliens preferenciáját fejezi ki. Például egy program kérheti ezt:

```http
Accept: application/json
```

Ezzel azt üzeni: „JSON-választ tudok értelmezni.” A szerver ettől még dönthet másképp, vagy `406 Not Acceptable` választ adhat. Egy űrlap elküldésekor tipikus a törzs formáját jelző fejléc:

```http
POST /api/jelentkezes HTTP/1.1
Content-Type: application/json
Content-Length: 38

{"nev":"Kiss Anna","evfolyam":2}
```

A `Content-Type` itt a küldött törzsre vonatkozik, nem arra, amit a kliens válaszként vár. Ez gyakori keveredés. Űrlapoknál előfordul `application/x-www-form-urlencoded`, fájlfeltöltésnél pedig `multipart/form-data`; API-knál ma jellemzően JSON-t használunk.

## Fejlécek, amelyek valódi döntéseket befolyásolnak

A `User-Agent` a kliens azonosító jellegű leírása. Régebben a szerverek ebből próbálták megállapítani, melyik böngészőnek milyen oldalt adjanak. Ez sérülékeny megközelítés: az érték könnyen hamisítható, és a böngésző neve nem azonos a képességeivel. Korszerű megoldás a reszponzív tervezés és a képességalapú ellenőrzés.

A `Cookie` a böngésző által visszaküldött, korábban a szervertől kapott kis adat. A szerver például a válaszban ezt küldi:

```http
Set-Cookie: session=abc123; Secure; HttpOnly; SameSite=Lax
```

Később a böngésző ugyanazon szabályok szerint elküldi: `Cookie: session=abc123`. Így köthető össze a stateless HTTP-kérések sora egy bejelentkezett munkamenetté. A cookie nem biztonságos „személyazonosító igazolvány”: érzékeny adatot nem szabad beleírni. A `Secure` csak HTTPS-en engedi küldeni, a `HttpOnly` pedig JavaScript elől rejti el; mindkettő fontos védelmi réteg.

Az `Authorization` szintén hitelesítő adatot hordozhat, de más célra és mechanizmussal. API-k esetén gyakori:

```http
Authorization: Bearer eyJ...
```

Ettől a kérés még nem automatikusan biztonságos. HTTPS nélkül a token lehallgatható, naplóba kerülhet, vagy túl tág jogosultságot adhat. A böngészős felhasználói munkamenethez cookie, gépek közti API-hívásokhoz gyakran Authorization fejléc illik, de nincs univerzális szabály.

A `Location` tipikusan átirányításkor jelenik meg:

```http
HTTP/1.1 302 Found
Location: https://example.edu/bejelentkezes
```

A böngésző ezután új kérést indít. A 301 és 308 inkább tartós, a 302 és 307 ideiglenes átirányításra való; metódusmegőrzésük eltérhet. A fejlesztőnek fontos, hogy a `Location` értékét megbízhatóan állítsa elő: felhasználói bemenetből ellenőrzés nélkül átirányítást építeni adathalászathoz vezethet.

## CORS: nem szerverhiba, böngészővédelmi szabály

A böngésző same-origin szabálya alapból megakadályozza, hogy a `https://hallgato.example` JavaScriptje korlátlanul kiolvassa a `https://api.example.edu` válaszát. Az origin séma, hosztnév és port együttese. A **CORS** (Cross-Origin Resource Sharing) egy válaszfejléc-alapú, tudatos feloldás:

```http
Access-Control-Allow-Origin: https://hallgato.example
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type, Authorization
```

Bizonyos kérések előtt a böngésző `OPTIONS` előkérdést küld. Ez nem azért történik, mert „az API rossz”, hanem mert a böngésző ellenőrzi, engedi-e a szerver a másik originről érkező, például Authorization fejlécet használó kérést. A `Access-Control-Allow-Origin: *` nyilvános, hitelesítés nélküli adatoknál lehet helyénvaló; hitelesített cookie-s forgalomhoz veszélyes vagy eleve nem elegendő.

## Gyakori tévhitek

- „A fejléc láthatatlan, tehát nem számít.” A hálózati működés és a biztonsági politika nagy része itt dől el.
- „A Content-Type csak tájékoztató.” A böngésző, proxy és biztonsági védelem is támaszkodhat rá.
- „A Cookie maga a bejelentkezés.” Többnyire csak egy munkamenet-azonosító; a jelentését a szerver adja.
- „A CORS megvédi az API-t minden támadótól.” Csak böngészőben érvényesül; egy közvetlen programozott kérésre nem korlát.

## Ellenőrző kérdések

1. Hol ér véget egy HTTP-üzenet fejlécrésze?
2. Miben különbözik az `Accept` és a `Content-Type`?
3. Miért nem célszerű a `User-Agent` alapján üzleti döntést hozni?
4. Milyen két cookie-attribútum segít csökkenteni a tokenlopás kockázatát?
5. Mit engedélyez a CORS, és mit nem?

## Fogalomtár

**Fejléc:** név–érték információ egy HTTP-üzenet értelmezéséhez.  
**Törzs:** az üzenet tényleges elküldött tartalma.  
**MIME-típus:** a tartalom formátumát jelző azonosító.  
**Cookie:** böngésző által szabályok szerint tárolt és visszaküldött kis adat.  
**CORS:** a böngészőben működő, origin-ek közti hozzáférést szabályozó mechanizmus.
