# Same-origin policy és CORS

A same-origin policy (SOP) azért létezik, hogy egy megnyitott webhely JavaScriptje ne olvashassa el szabadon egy másik, már bejelentkezett webhely érzékeny válaszait. A CORS egy ellenőrzött, szerver által kimondott kivétel: a szerver döntheti el, mely más originről érkező böngészős kód olvashatja a válaszát.

## Mit jelent az origin?

Az origin három részből áll: **séma** (protokoll), **host** és **port**. A `https://tananyag.example.hu:443` és a `https://tananyag.example.hu` ugyanazt az origint jelenti, mert a 443 a HTTPS alapértelmezett portja. A `http://tananyag.example.hu` már más origin: eltér a séma. A `https://api.example.hu` is más origin, mert eltér a host. Ugyanez igaz a `https://tananyag.example.hu:8443` címre is, mert más a port.

Ez a meghatározás szándékosan szigorú. Az ember számára az `example.hu` és az `api.example.hu` ugyanannak a szervezetnek tűnhet, a böngésző viszont nem találgat tulajdonosi kapcsolatokat. Csak a pontos origin alapján hoz alapértelmezett döntést. A szervezet később, CORS-szal adhat engedélyt.

## Mi lenne SOP nélkül?

Képzeljük el, hogy valaki be van jelentkezve a bankja oldalára, majd egy másik, rosszindulatú vagy kompromittált oldalt is megnyit ugyanabban a böngészőben. Ha ez az oldal korlátozás nélkül elolvashatná a bank válaszait, a bejelentkezési állapothoz kötött személyes információk veszélybe kerülnének. A böngésző által elküldött cookie-k egy része ugyan kapcsolódhat a bankhoz, de a SOP megakadályozza, hogy az idegen oldal JavaScriptje egyszerűen hozzáférjen a válasz tartalmához.

Fontos a pontos megfogalmazás: a SOP nem azt jelenti, hogy semmi sem érhet el más origint. Egy oldal például betölthet képet, stíluslapot vagy beágyazott oldalt más helyről; a böngészőnek ehhez történelmi és működési okokból szüksége van. A korlátozás különösen azt védi, hogy a futó programkód milyen adatokat **olvashat** ki más originről. Egy külső kép megjelenítése és egy bejelentkezett API-válasz feldolgozása teljesen más kockázat.

## Azonos originű együttműködés

Egy `https://portal.pelda.hu` alatt futó oldal ugyanerről az originről hívott `https://portal.pelda.hu/api/targyak` végpontot alaphelyzetben gond nélkül elolvashatja. A böngésző azt feltételezi, hogy ugyanannak a webes bizalmi térnek a részei. Ha azonban a felület külön domainen fut, például `https://app.pelda.hu`, az API pedig `https://api.pelda.hu`, a két cím az origin szabálya szerint különálló. Itt jön képbe a CORS.

## CORS: a szerver által adott engedély

A Cross-Origin Resource Sharing, röviden CORS, HTTP-fejléceken alapuló megállapodás. A böngésző egy cross-origin kérésnél megjelöli, honnan indult a kérés, tipikusan az `Origin` kérésfejlécben. A kiszolgáló a válaszában például ezt küldheti:

```http
Access-Control-Allow-Origin: https://app.pelda.hu
```

Ezzel nem „megnyitja az internetet”, hanem pontosan azt mondja a böngészőnek: az `https://app.pelda.hu` originről futó kód elolvashatja ezt a választ. Ha a válaszból hiányzik a megfelelő engedély, a kérés egyes esetekben még eljuthat a szerverhez, de a böngésző nem adja oda a választ a JavaScript-kódnak. A fejlesztő ezért a konzolban CORS-hibát láthat; ez elsősorban a böngésző által érvényesített védelem jele.

Mivel a CORS böngészőszabály, nem általános hozzáférés-védelem. Egy szerver–szerver kapcsolat vagy egy parancssori HTTP-kliens nem kényszerül ugyanerre a böngészős ellenőrzésre. Ezért a valódi adathozzáférést mindig hitelesítéssel és szerveroldali jogosultságkezeléssel kell védeni. A CORS ezt kiegészíti, nem helyettesíti.

## Egyszerű és előzetesen ellenőrzött kérések

Bizonyos alacsonyabb kockázatú, szabványos formájú kéréseket a böngésző közvetlenül küld el. Ezeket gyakran „egyszerű” (simple) CORS-kéréseknek nevezik. A válasz olvashatóságáról ekkor a válasz `Access-Control-Allow-Origin` fejléce dönt.

Más helyzetekben a böngésző a tényleges kérés előtt egy rövid ellenőrző kérést küld. Ezt nevezzük **preflightnak**. Ennek metódusa `OPTIONS`, és olyan információt közölhet, mint hogy a későbbi kérés `PATCH` metódust használna, vagy például `Authorization` fejlécet küldene. A szervernek erre világosan vissza kell jeleznie, hogy az adott origin, metódus és fejléc megengedett-e.

Egy leegyszerűsített példa:

```http
OPTIONS /api/foglalas/42 HTTP/1.1
Origin: https://app.pelda.hu
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: authorization, content-type
```

A szerver akkor engedélyezheti a folytatást, ha a válaszban felsorolja a megfelelő értékeket:

```http
Access-Control-Allow-Origin: https://app.pelda.hu
Access-Control-Allow-Methods: GET, PATCH
Access-Control-Allow-Headers: Authorization, Content-Type
```

A preflight nem üzleti művelet: a böngészőnek adott engedélykérés. A kiszolgáló akár rövid ideig gyorsítótárazhatóvá is teheti az engedélyezés eredményét az `Access-Control-Max-Age` fejléc segítségével. Ettől függetlenül a tényleges kérésnél a szervernek továbbra is végre kell hajtania minden hitelesítési és jogosultsági ellenőrzést.

## Hitelesített cross-origin kérések

Az egyik legtöbb körültekintést igénylő eset, amikor a böngésző a másik originhez kötődő bejelentkezési adatokat, például cookie-kat is küldheti. Ilyenkor a kliensoldali kérésnek külön kérnie kell a hitelesített módot, a szervernek pedig a válaszban jeleznie kell:

```http
Access-Control-Allow-Credentials: true
```

Ebben a helyzetben nem használható a minden origint jelölő `*` az `Access-Control-Allow-Origin` értékeként; konkrét, megbízható origint kell megadni. Ez azért fontos, mert a túl tág engedély könnyen összekapcsolhatja a felhasználó bejelentkezett állapotát egy olyan oldal kódjával, amelynek erre semmi szüksége nem lenne.

A cookie-k saját szabályai is számítanak. A `SameSite`, `Secure` és `HttpOnly` attribútumok befolyásolják, hogy mikor küldhető cookie, kizárólag titkosított kapcsolaton használható-e, illetve elérheti-e a böngészőben futó JavaScript. A CORS nem írja felül ezeket a szabályokat. A biztonságos rendszer a cookie-beállításokat, a CORS-t és a szerveroldali jogosultságkezelést együtt tervezi meg.

## Végigvezetett példa: különálló felület és API

Legyen egy egyetemi alkalmazás, amelynek felülete a `https://orarend.egyetem.hu` originről fut, API-ja pedig a `https://api.egyetem.hu` címen érhető el. A felület szeretné lekérni a bejelentkezett hallgató órarendjét.

Mivel a host eltér, a böngésző cross-origin kérésként kezeli az esetet. Az API üzemeltetője tudatosan eldönti, hogy csak a hivatalos felületet engedi. A válaszban ezért pontosan ezt az origint adja meg, és csak azokat a metódusokat és fejléceket, amelyekre valóban szükség van. Ha a kérés felhasználói azonosításhoz kötődik, a megoldás kiválasztja a biztonságos hitelesítési mechanizmust, és a szerver minden válasznál ellenőrzi: valóban ez a felhasználó kérte-e a saját órarendjét.

Tegyük fel, hogy később létrejön egy tesztfelület is. Nem jó gyakorlat az, hogy kényelmi okból minden originnek engedélyt adunk. Inkább a teszt originje kap külön, környezethez kötött konfigurációt. Ha egy nem várt webhelyről jön kérés, a CORS-válasz nem engedi, hogy a böngészős kód hozzáférjen az API-válaszhoz. Az API ennek ellenére nem hagyhat fel a saját azonosításával: egy más típusú kliens nem tartozik a CORS szabályai alá.

## Tervezési tanácsok

Induljunk a legszűkebb szükséges engedélyből. Adjuk meg konkrétan az engedélyezett origin(eke)t, a használható metódusokat és fejléceket. Nyilvános, hitelesítés nélküli adatot adó API-nál más beállítás lehet helyes, mint egy személyes adatokat kezelő alkalmazásnál. A két esetet ne keverjük össze.

Az `Origin` fejléc értékét ne kezeljük automatikusan teljes körű azonosításként; a CORS egy böngészőnek szóló szabály, nem bejelentkezési bizonyíték. A konfigurációt környezetenként érdemes átnézni, és tesztelni kell a hibautakat is: például a hibaüzenetek szükség esetén is a várt CORS-fejlécekkel érkeznek-e, anélkül hogy érzékeny részleteket szivárogtatnának.

## Gyakori félreértések

**„A CORS hibája azt jelenti, hogy az API nem működik.”** Nem feltétlenül. Az API válaszolhatott, csak a böngésző a megadott originről futó JavaScriptnek nem engedi az olvasást.

**„A CORS megvédi az API-t az illetéktelen kérésektől.”** Nem helyettesíti a hitelesítést és jogosultságkezelést. A szervernek önmagában is meg kell tudnia mondani, ki és mit kérhet le vagy módosíthat.

**„Az aldomain ugyanaz az origin.”** Nem. Az originben a teljes hostnév szerepel; az `app.example.hu` és az `api.example.hu` külön origin.

**„A `*` mindig kényelmes és ártalmatlan.”** Nyilvános adatoknál lehet indokolt, de hitelesített, személyes adatokat érintő válaszoknál helytelen és nem is kombinálható a hitelesített CORS-kéréssel.

## Ellenőrző kérdések

1. Mely három összetevő határozza meg egy URL originjét?
2. Mi a same-origin policy fő célja?
3. Ki dönti el CORS esetén, hogy egy origin elolvashat-e egy választ?
4. Miért küld a böngésző bizonyos kérések előtt preflightot?
5. Miért nem helyettesíti a CORS a szerveroldali jogosultságkezelést?

## Fogalomtár

- **Origin:** séma, host és port együttese.
- **Same-origin policy (SOP):** a böngésző alapvető szabálya a különböző originű adatok elkülönítésére.
- **CORS:** HTTP-fejlécekkel adott, kontrollált engedély cross-origin böngészős olvasásra.
- **Preflight:** a tényleges kérés előtti `OPTIONS` alapú engedélykérés.
- **Hitelesített kérés:** olyan kérés, amelyhez a böngésző a céloriginhez kötött azonosítási adatokat is bevonhatja.
- **Access-Control-Allow-Origin:** válaszfejléc, amely az engedélyezett origint jelöli.
