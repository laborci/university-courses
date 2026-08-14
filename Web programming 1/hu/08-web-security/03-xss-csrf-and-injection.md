# XSS, CSRF és injekciós támadások

Mindhárom hibacsoport ott jelenik meg, ahol egy rendszer túl sokat feltételez valamiről: az XSS a megjelenítendő tartalomról, a CSRF a kérés szándékáról, az injekció pedig a bemenet jelentéséről. A megoldás közös alapja: különítsük el az adatot a kódtól vagy utasítástól, és a döntéseket a megfelelő, megbízható oldalon ellenőrizzük.

## XSS: amikor a tartalom kóddá válik a böngészőben

A cross-site scripting neve történelmi okból félrevezető lehet: nem feltétlenül két különböző webhelyről van szó. A lényeg az, hogy egy webhely valamilyen nem megbízható szöveget úgy jelenít meg, hogy az a látogató böngészőjében aktív kódként vagy veszélyes jelölésként értelmeződhet. Ilyenkor a támadó a megbízhatónak gondolt webhely környezetében futó tartalom előnyeit próbálhatja kihasználni.

Gondoljunk egy fórumbejegyzésre vagy egy termékértékelésre. A felhasználó által beírt mondat alapvetően adat. Ha a rendszer ezt egyszerű szövegként kezeli, az oldal olvasója a mondatot látja. Ha azonban a rendszer összekeveri a szöveget az oldal szerkezetével vagy futtatható viselkedésével, a helyzet megváltozik. Ezért a legfontosabb szabály: a felhasználói tartalom alapértelmezés szerint adat, nem pedig megbízható HTML vagy program.

Az XSS három gyakran említett formája a tárolt, a visszatükrözött és a DOM-alapú változat. **Tárolt XSS**-nél a veszélyes tartalom tartósan bekerülhet egy adatforrásba, például kommentbe vagy profilmezőbe, és később mások oldalán jelenik meg. **Visszatükrözött XSS**-nél egy kérésből származó adat rögtön visszakerül a válaszba, például egy keresési eredmény oldalon. **DOM-alapú XSS** esetén a böngészőben futó kliensoldali kód alakít át nem megbízható adatot veszélyes módon. A kategóriák hasznosak a hiba helyének megértéséhez, de a védelmi alapelv mindegyiknél ugyanaz: biztonságos adatkezelés és kontextusnak megfelelő kódolás.

## Hogyan védekezünk XSS ellen?

Elsőként használjunk olyan sablonrendszert vagy felületi eszközt, amely alapértelmezésben szövegként jeleníti meg a változó adatokat. Másodszor a kimenetet mindig annak megfelelően kódoljuk, ahová kerül: HTML szövegbe, attribútumba, URL-be vagy JavaScript-adatként más szabályok érvényesek. A biztonságos megoldás nem egyetlen „tiltott karakterek” listája.

Ha valóban szükséges, hogy a felhasználó formázott tartalmat írjon, például egy tudásbázis cikkében, akkor engedélyezett elemeket és attribútumokat tartalmazó, megbízható tisztító eljárásra van szükség. Ez sokkal biztonságosabb megközelítés, mint megpróbálni minden elképzelhető veszélyes mintát kézzel tiltani. A Content Security Policy (CSP) további védelmi réteg: a szerver megadhatja, milyen forrásból tölthető be és futtatható tartalom. A CSP nem helyettesíti a helyes kimenetkezelést, de csökkentheti egy esetleges hiba következményét.

Az `HttpOnly` cookie-attribútum szintén értékes: azt jelzi a böngészőnek, hogy a cookie-t a JavaScript ne olvashassa ki. Ez nem szünteti meg az XSS súlyosságát, mert a böngészőben futó idegen kód így is sok kárt okozhat, de egy fontos adathozzáférési utat korlátozhat.

## CSRF: amikor egy érvényes kérés nem a felhasználó szándékát tükrözi

CSRF esetén a gond nem az, hogy a rendszer nem ismeri fel a felhasználót. Épp ellenkezőleg: a böngésző bizonyos helyzetekben automatikusan csatolhatja a célwebhelyhez tartozó bejelentkezési állapotot egy kéréshez. Egy másik oldal ezt megpróbálhatja úgy kihasználni, hogy a bejelentkezett felhasználó böngészője a céloldal felé állapotmódosító kérést indítson.

Vegyünk egy fiktív profiloldalt, ahol a felhasználó megváltoztathatja értesítési beállításait. Ha a szerver kizárólag abból indul ki, hogy „a cookie jelen van, tehát a kérés biztosan a felhasználó szándéka”, akkor hiányzik egy fontos ellenőrzés. Egy állapotmódosító műveletnél azt is vizsgálni kell, hogy a kérés tényleg a saját alkalmazásunk megbízható felületéről és a felhasználó egyértelmű kezdeményezéséből származik-e.

Itt is fontos a helyes határ: a CORS nem általános CSRF-védelem. A CORS azt korlátozza, hogy idegen originről futó kód elolvashatja-e a választ; bizonyos kérések elküldése ettől még lehetséges lehet. A CSRF ellen külön, célzott védelem kell.

## CSRF elleni rétegek

Az egyik bevett megoldás az **anti-CSRF token**. A szerver egy nehezen kitalálható, a felhasználó munkamenetéhez vagy az adott felülethez kötött értéket ad az űrlaphoz vagy kliensalkalmazáshoz. Állapotmódosításkor a szerver ellenőrzi ennek jelenlétét és érvényességét. Egy külső oldal ezt az értéket általában nem tudja megszerezni és megfelelően visszaküldeni.

A cookie `SameSite` attribútuma szintén fontos. Megfelelő beállítás esetén a böngésző korlátozza, hogy cross-site helyzetben mikor küldje el a cookie-t. Ez hatékony alapréteg lehet, de az alkalmazás működésének ismeretében kell megválasztani: például külső bejelentkezési folyamatoknál vagy más legitim integrációknál hatása lehet a felhasználói útra.

További jelzés lehet az `Origin` vagy bizonyos esetekben a `Referer` fejléc ellenőrzése állapotmódosító kéréseknél. Ezeket körültekintően, több réteg egyikeként érdemes használni. A legfontosabb tervezési elv, hogy a változást okozó műveletek ne legyenek könnyedén kiválthatók egyszerű, védtelen navigációval, és a szerver a kérés szándékához kapcsolódó bizonyítékot is elvárjon.

## Injekció: amikor az adat utasításként értelmeződik

Az injekciós hibák közös mintája, hogy a felhasználótól vagy más külső forrásból érkező adat belekerül egy olyan nyelvbe vagy lekérdezésbe, amelyet egy másik rendszer értelmez. Ez lehet adatbázis-lekérdezés, operációs rendszernek adott parancs, könyvtárkereső kifejezés vagy más értelmezett formátum. A veszély nem egy konkrét karakterben rejlik, hanem abban, hogy a program szövegösszefűzéssel keveri az adatot és az utasítás szerkezetét.

Egy webáruházban a felhasználó megad egy cikkszámot, a szerver pedig ebből adatbázis-lekérdezést készít. A biztonságos tervezés nem egy hosszú, kézzel összeállított lekérdezési szöveget épít a bemenetből. Ehelyett paraméterezett lekérdezést vagy a használt adatkezelő által biztosított biztonságos API-t alkalmaz: az utasítás szerkezete rögzített, a cikkszám pedig elkülönített adatként kerül átadásra. Így az adatbázis-kezelő nem keveri össze a kettőt.

Az input-ellenőrzés ennek fontos kiegészítője. Ha egy mezőben például csak pozitív egész azonosító értelmes, akkor ezt típus, tartomány és üzleti szabályok szerint ellenőrizni kell. Ez javítja az adatminőséget és csökkenti a hibalehetőséget, de önmagában nem helyettesíti a paraméterezést. A bemenet később más kontextusba is kerülhet; a végrehajtás helyén mindig a megfelelő biztonságos illesztést kell használni.

## Végigvezetett példa: támogatási jegy rendszer

Egy támogatási rendszerben az ügyfél hibajegyet nyit, az ügyintéző pedig szűrhet, kereshet és válaszolhat. Három különböző veszélyforrás jelenhet meg.

Először az ügyfél leírása nem megbízható tartalom. Amikor az ügyintéző elolvassa, a rendszernek szövegként kell megjelenítenie, vagy szigorúan tisztított, engedélyezett formázást kell használnia. Ez XSS elleni intézkedés.

Másodszor az ügyintéző állapotmódosító műveletet végezhet, például lezárhat egy jegyet. A szerver az azonosítás mellett CSRF-védelmet is alkalmaz, és a jogosultságot szerveroldalon ellenőrzi. Nem elég, ha a felület csak a megfelelő szerepkörűeknek mutatja a „Lezárás” gombot.

Harmadszor a keresőmező adata adatbázis-művelethez kerülhet. A rendszer paraméterezett lekérdezést használ, korlátozza a keresés értelmes méretét, és nem ad vissza felesleges hibaüzenetet. Ez injekció elleni és megbízhatósági szempont egyszerre.

Ebben az egy példában látható, hogy a védelem nem egymástól független javítások halmaza. A tartalomkezelés, a munkamenet, a jogosultság, az adatbázis-hozzáférés és a naplózás együtt alakítják a rendszer biztonságát.

## Gyakori félreértések

**„Elég kiszűrni néhány veszélyes karaktert.”** Nem elég. Ugyanaz az adat többféle kontextusba kerülhet, és a tiltólisták rendszerint hiányosak. Strukturált, kontextusérzékeny kimenetkezelés és paraméterezés kell.

**„Az XSS csak egy látványhiba.”** Nem. A megbízható origin környezetében futó idegen tartalom félrevezethet, adatokat olvashat vagy műveleteket kezdeményezhet a felhasználó nevében.

**„A bejelentkezés minden kérést biztonságossá tesz.”** A hitelesítés azt válaszolja meg, kihez kapcsolódik a kérés; nem feltétlenül bizonyítja, hogy a felhasználó szándékosan indította azt. Ezért fontos a CSRF-védelem.

**„Az adatbázis csak adatot tárol, így nem lehet veszélyes.”** A lekérdezési nyelvet a rendszer értelmezi. Ha a program összemossa a lekérdezés szerkezetét és a külső adatot, hibás vagy veszélyes viselkedés születhet.

## Ellenőrző kérdések

1. Miért kell a felhasználó által írt szöveget alapértelmezésben adatként kezelni?
2. Mi a lényegi különbség az XSS és a CSRF között?
3. Miért nem teljes CSRF-védelem önmagában a CORS?
4. Mit jelent a paraméterezett lekérdezés alapelve?
5. Hogyan egészítheti ki egymást a kimenetkódolás, a CSP és a `HttpOnly` cookie?

## Fogalomtár

- **XSS:** nem megbízható tartalom veszélyes, aktív értelmezéséből eredő webes hiba.
- **Kimenetkódolás:** adat biztonságos megjelenítése az adott kontextus szabályai szerint.
- **CSP:** böngészőnek adott szabályrendszer az engedélyezett tartalomforrásokról.
- **CSRF:** olyan kérés, amely a felhasználó bejelentkezett állapotát használja, de nem a tudatos szándékát tükrözi.
- **Anti-CSRF token:** a legitim felülethez és munkamenethez kötött ellenőrző érték.
- **SameSite:** cookie-attribútum, amely korlátozhatja a cross-site elküldést.
- **Injekció:** adat és értelmezett utasítás szerkezetének összemosásából eredő hibacsalád.
- **Paraméterezett lekérdezés:** az utasítás szerkezetét és az adatértékeket elkülönítő adatbázis-hozzáférési mód.
