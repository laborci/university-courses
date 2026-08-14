# Cookie, session és token

## Célok

A hallgató értse, hogy a cookie, a session és a token nem egymás szinonimái, hanem egymással gyakran együtt használt építőelemek. Tudja megmagyarázni, miként kapcsolható egy böngészőből érkező kérés egy korábbi munkamenethez; lássa a szerveroldali session és az önmagában értelmezhető token eltérő kompromisszumait; és ismerje a legfontosabb tárolási, továbbítási és védelmi elveket.

**A cookie elsősorban böngészős adatküldési mechanizmus, a session egy munkamenethez kötött állapot, a token pedig egy hordozható igazolás vagy azonosító. Egyik sem biztonságos önmagában: a jelentésük és védelmük a rendszer tervezésén múlik.**

## Cookie: nem „sütiüzenet”, hanem HTTP-adat

A cookie egy kis név–érték adat, amelyet a szerver válaszban kérhet a böngészőtől eltárolni. Később a böngésző a szabályoknak megfelelő kéréseknél automatikusan visszaküldi. A szerver például ezt válaszolhatja bejelentkezés után:

```http
Set-Cookie: session_id=F8vK...; Path=/; HttpOnly; Secure; SameSite=Lax
```

A böngésző ezután a megfelelő címre indított kérésnél hozzáteszi:

```http
Cookie: session_id=F8vK...
```

Ez nem maga a bejelentkezés, és nem bizonyíték arra, hogy az érték jogos tulajdonosa küldte. A cookie olyan, mint egy ruhatári biléta: aki megszerzi, megpróbálhatja felhasználni. A szerver feladata eldönteni, hogy az azonosító létezik-e, érvényes-e, lejárt-e, vissza lett-e vonva, és milyen munkamenethez tartozik.

A cookie-hoz attribútumok is tartozhatnak. A `Secure` azt korlátozza, hogy csak HTTPS-kapcsolaton továbbítható. A `HttpOnly` azt jelenti, hogy a böngészőben futó JavaScript nem olvashatja ki; ez mérsékli egy sikeres XSS támadás következményét, de nem teszi lehetetlenné az összes visszaélést. A `SameSite` szabályozza, milyen helyzetekben küldje el a böngésző a cookie-t más webhelyről indult kéréskor, ezért a CSRF elleni védelem része lehet. A `Path`, `Domain`, lejárati idő és a hosthoz kötés szintén azt határozzák meg, hol és meddig érvényes az adat.

Fontos különválasztani az alkalmazás működéséhez szükséges cookie-kat a követési vagy marketing célú cookie-któl. Az előbbiek nélkül egy bejelentkezett felület vagy kosár nem feltétlenül működik, az utóbbiak adatvédelmi jogalapot és átlátható tájékoztatást igényelhetnek. A technikai név ugyanaz, de a cél, az adatkezelés és a kockázat eltér.

## Session: a szerver emlékezete

A session, magyarul munkamenet, annak a megoldása, amikor az érdemi állapot a szerveren marad. A cookie-ban ilyenkor általában csak egy nehezen kitalálható, véletlen session-azonosító utazik. A szerver a saját tárolójában ezt például egy felhasználói azonosítóhoz, lejárathoz, kiválasztott szervezethez vagy a többfaktoros ellenőrzés állapotához rendeli.

Ennek nagy előnye a kontroll. Kijelentkezéskor vagy gyanús eseménynél a szerver törölheti a sessiont, és a korábban kiadott azonosító azonnal használhatatlanná válik. Nem kell minden kéréshez a teljes jogosultsági információt elküldeni. Az érzékeny adatok sem kerülnek a klienshez; a kliens csak egy hivatkozást hordoz rájuk.

Ára is van. Ha sok szerver szolgál ki kéréseket, mindegyiknek hozzá kell férnie a sessiontárhoz, vagy a felhasználót következetesen ugyanahhoz a szerverhez kell irányítani. Az utóbbi, úgynevezett tapadós munkamenet megkönnyítheti a kezdeti megoldást, de rontja a hibatűrést és a rugalmas skálázást. A gyakorlatban gyakori a közösen elért munkamenet-tár vagy adatbázis.

A session lejárata is tudatos döntés. A túl rövid lejárat kényelmetlen, a túl hosszú lejárat növeli az elveszett eszköz vagy ellopott cookie kockázatát. Magas kockázatú műveletnél – például jelszóváltoztatás vagy utalás – egy meglévő session mellett is kérhető újabb hitelesítés.

## Token: hordozható igazolás

A token egy olyan érték, amelyet az ügyfél elküldhet, hogy igazoljon valamit: például azt, hogy korábban sikeresen hitelesítették, vagy hogy adott erőforráshoz adott ideig hozzáférhet. Gyakran az `Authorization` fejlécben jelenik meg:

```http
Authorization: Bearer eyJhbGciOi...
```

A „Bearer” szó azt jelzi, hogy aki birtokolja a tokent, az használhatja. Emiatt tokennél a birtoklás védelme központi kérdés: ne kerüljön naplóba, képernyőképbe, chatbe, URL-be vagy illetéktelen böngészőkód kezébe.

Sok token egy átlátszatlan, véletlen karaktersorozat. Ilyenkor a szervernek vagy egy külön hitelesítési szolgáltatásnak tárolnia kell, milyen jogok tartoznak hozzá. Más tokenek önmagukban hordoznak állításokat. A JWT (JSON Web Token) elterjedt formátum: részei base64url-kódolással olvashatónak tűnhetnek, de ez **nem titkosítás**. Egy JWT jellemzően fejlécet, adatrészt (payload) és kriptográfiai aláírást tartalmaz. Az aláírás azt segít ellenőrizni, hogy a token tartalmát kibocsátás óta nem módosították; nem jelenti azt, hogy a tartalom titkos.

Egy JWT-ben lehet kiállító (`iss`), célközönség (`aud`), lejárat (`exp`) és jogosultsággal kapcsolatos állítás. A fogadó rendszernek ellenőriznie kell az aláírást, a lejáratot és azokat az állításokat is, amelyek az adott szolgáltatás számára lényegesek. Nem elég csak „dekódolni” a tokent: azt bárki megteheti. A megbízhatóságot az ellenőrzés adja.

## Session cookie és JWT: nem vallásháború

A session cookie mintája gyakran böngészőalapú, hagyományos webalkalmazásokhoz kényelmes: a böngésző automatikusan küldi az azonosítót, a szerver pedig központilag felügyeli az állapotot. A JWT-vel gyakran API-k és több, egymástól független szolgáltatás között szeretnének hordozható igazolást átadni. Egyik választás sem „modernebb” önmagában.

A szerveroldali session előnye az egyszerű visszavonás és a kis kliensoldali adat. Hátránya a központi tároló és a megosztott állapot igénye. Egy rövid életű, aláírt JWT csökkentheti a minden kéréshez szükséges központi visszakeresést, viszont kibocsátás után nehezebb azonnal érvényteleníteni, és a jogosultságok megváltozása csak lejáratkor vagy külön visszavonási mechanizmussal jut érvényre.

Gyakori hibrid megoldás, hogy rövid életű hozzáférési tokenhez hosszabb életű, szigorúan védett megújítási mechanizmus tartozik. Ez azonban több alkatrészt és több hibalehetőséget jelent. Tanulság: a tokenformátum kiválasztása előtt a rendszer céljait kell felmérni – böngésző vagy gép-gép kapcsolat, azonnali kijelentkeztetés igénye, több szolgáltatás, eszközök, kockázati szint.

## Tárolás és védelem: a legfontosabb kérdések

Nincs olyan kliensoldali tároló, amely minden helyzetben ideális. Ha a token JavaScript által olvasható `localStorage`-ban van, egy XSS sebezhetőséget kihasználó támadó elküldheti magának. Ha viszont az azonosító `HttpOnly` cookie-ban van, a böngésző bizonyos helyzetekben automatikusan hozzákapcsolja a kéréshez; ezért a keresztoldali kérések elleni védelmet, például `SameSite` beállítást és szükség esetén CSRF-védelmet meg kell tervezni.

Az érzékeny azonosítót mindig HTTPS-en kell továbbítani. Ne kerüljön URL-be, mert az előzményekben, proxy- és szervernaplókban, valamint hivatkozóként megjelenhet. Legyen rövid élettartama, legyen lehetőség visszavonására és munkamenet-rotációra. Bejelentkezés után érdemes új session-azonosítót kiadni, hogy egy korábban megszerzett azonosító ne rögzíthessen egy munkamenetet. Kijelentkezéskor a kliensoldali adat törlése nem feltétlenül elég: a szervernek is érvénytelenítenie kell, amit lehet.

## Végigvezetett példa: egyetemi portál

Balázs megnyitja az egyetemi portált. Beírja az azonosítóját és jelszavát HTTPS-en. Sikeres ellenőrzés után a szerver létrehoz egy sessiont: benne Balázs belső azonosítója, a belépés ideje és lejárata. Válaszban küld egy `HttpOnly`, `Secure`, megfelelő `SameSite` beállítású `session_id` cookie-t. Balázs a következő kéréskor automatikusan elküldi ezt, a portál pedig a sessiontárból kiolvassa, ki kérdezi le a jegyeit.

Amikor Balázs „Letöltés PDF-ben” műveletet indít, a szerver nemcsak azt ellenőrzi, hogy a session érvényes-e, hanem azt is, hogy a kért adat valóban Balázshoz tartozik-e. Ha egy közös számítógépen kijelentkezik, a szerver törli a sessiont. Ha a cookie később még elküldésre kerül, már nem talál hozzá érvényes munkamenetet.

## Gyakori tévhitek

**„A JWT titkosított.”** Az általános JWT aláírt, nem automatikusan titkosított. A payloadot ne kezeljük titokként.

**„A cookie önmagában rossz.”** A cookie szabványos szállítási mechanizmus. A beállításai és a mögötte lévő működés döntik el a kockázatot.

**„A localStorage biztonságosabb, mert nem küldődik el automatikusan.”** Más kockázatot jelent: JavaScript hozzáférhet. Nincs univerzális, kompromisszummentes tárolási választás.

**„A kijelentkezés csak a cookie törlése.”** A kritikus rendszerekben a szerveroldali érvénytelenítés és a munkamenet lejárata is fontos.

## Ellenőrző kérdések

1. Mi a különbség a cookie és a session között?
2. Mire való a `HttpOnly`, a `Secure` és a `SameSite` attribútum?
3. Miért nem szabad egy JWT payloadját bizalmas adatként kezelni?
4. Milyen előnye és hátránya van a szerveroldali sessionnek a JWT-hez képest?
5. Miért kockázatos hitelesítő tokent URL-paraméterben átadni?

## Fogalomtár

**Cookie:** böngésző által tárolt és szabályok szerint visszaküldött HTTP-adat.  
**Session:** a szerver által fenntartott munkamenet-állapot.  
**Session-azonosító:** olyan véletlen érték, amely egy szerveroldali munkamenetre hivatkozik.  
**Token:** hordozható érték, amely azonosítást, hitelesítést vagy hozzáférési jogot közvetíthet.  
**Bearer token:** birtoklás alapján használható token.  
**JWT:** strukturált, jellemzően aláírt JSON Web Token; nem egyenlő a titkosítással.  
**XSS:** olyan sérülékenység, amelynél támadó kód futtatható egy webhely kontextusában.  
**CSRF:** olyan támadás, amely a bejelentkezett böngészőt nem kívánt kérés küldésére próbálja rávenni.
