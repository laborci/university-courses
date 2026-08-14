# Szerveroldali renderelés (SSR)

SSR-nél a böngésző már az első válaszban értelmes HTML-t kap, ezért a tartalom hamarabb megjelenhet és könnyebben feldolgozható. Ez azonban szerveroldali munkát jelent minden kéréskor, különösen akkor, ha a válasz személyre szabott vagy friss adatot tartalmaz. Az interaktivitásért sokszor továbbra is JavaScript felel: ezt a kapcsolódást nevezzük hidratálásnak.

## A szerver nem csak fájlokat küld

Egy egyszerű statikus webhelyen a szerver egy kész HTML-fájlt ad vissza. SSR-nél a HTML gyakran nem előre létezik minden változatában. A kérés beérkezésekor a szerver megnézi az útvonalat, szükség esetén a felhasználó munkamenetét, lekéri az adatokat, majd egy sablon vagy komponensrendszer segítségével elkészíti az adott kéréshez illő dokumentumot.

Tegyük fel, hogy valaki megnyitja egy könyváruházban a `/konyvek/az-ido-terkepe` címet. A szerver azonosítja a könyvet, lekéri címét, szerzőjét, árát és elérhetőségét, majd elkészíti a címet, leírást, képet és vásárlási lehetőséget tartalmazó HTML-t. Ezt küldi vissza. A böngésző azonnal elkezdheti a dokumentum feldolgozását, és a látogató a termék lényeges információit akkor is láthatja, ha a JavaScript később vagy korlátozottan töltődik be.

## Végigvezetett példa: egy személyre szabott könyváruház

A látogató a fenti termékoldalt nyitja meg. A kéréshez a böngésző cookie-t is küldhet, amelyből a szerver felismeri, hogy a látogató bejelentkezett. A szerver kétféle információt kezel: a könyv nyilvános adatait és a felhasználóhoz kötődő állapotot, például hogy a könyv a kívánságlistán van-e.

A szerver először lekérheti a könyv adatait. Ezután ellenőrzi a munkamenetet, majd a kapott értékekből HTML-t készít. A válasz már tartalmazhatja a pontos címet és az oldal leírását is, ami a kereső és a közösségi megosztási előnézet számára hasznos. A böngésző kirajzolja ezt a HTML-t. A vásárlás gomb kezdetben akár egyszerű űrlapként is működhet.

Ha az oldal modern interakciókat is nyújt – például a kívánságlista gomb állapotot vált teljes újratöltés nélkül –, a szerver a HTML mellé JavaScriptet is ad. Amikor ez a kód betöltődik, felismeri a már meglévő DOM-szerkezetet, és eseménykezelőket kapcsol hozzá. Ezt nevezzük hidratálásnak (*hydration*). Nem újra nulláról rajzolja a látható oldalt, hanem „életre kelti” a szerver által elkészített felületet.

## A hidratálás előnye és ára

A hidratálás olyan, mintha egy nyomtatott kiállítási térképet nem dobnánk ki, amikor megérkezik az idegenvezető: a térkép már használható, az idegenvezető pedig interaktívvá teszi. A felhasználó előbb lát tartalmat, később pedig működnek a gombok, szűrők és lenyíló panelek.

Az ár az, hogy a böngészőnek továbbra is le kell töltenie és futtatnia kell az interaktivitáshoz tartozó JavaScriptet. Ha az oldal minden eleme hidratált, az erőforrásigény jelentős lehet. Egy hosszú cikkoldal tíz dekoratív vagy csak ritkán használt komponensét nem feltétlenül kell ugyanazzal a költséggel interaktívvá tenni. Ezért a korszerű rendszerek igyekeznek célzottan, később vagy kisebb egységekben hidratálni.

A fogalomhoz kapcsolódó fontos hiba a hidratálási eltérés. Ez akkor történik, ha a szerver által küldött HTML és a kliensoldali JavaScript által várt állapot különbözik. Például a szerver 10:00-kor generálta az „aktuális idő” feliratot, a kliens pedig 10:01-kor más értéket számol. Ilyenkor a felület villanhat, hibajelzés keletkezhet, vagy a kliens kénytelen lehet újraépíteni egy részt. Ez jól mutatja, hogy az SSR és a kliensoldali kód közötti szerződésnek következetesnek kell lennie.

## Teljesítmény: melyik időpontot nézzük?

SSR sokszor javítja azt az élményt, hogy a látogató hamar lát értelmes tartalmat. A szerver elkészíti a HTML-t, és a böngészőnek nem kell megvárnia, amíg minden kliensoldali alkalmazáskód és adatlekérés lezajlik. Nyilvános termékoldal, dokumentáció vagy cikk esetén ez különösen értékes lehet.

Ugyanakkor a szervernek idő kell az adatok lekérésére és a HTML összeállítására. Ezt nevezzük a szerverválasz kezdetéig eltelt időnek. Ha a szerver lassú adatbázisra vár, túlterhelt vagy sok külső szolgáltatást hív, a böngésző hiába kap majd jó HTML-t: későn kapja meg. Az SSR tehát nem automatikus teljesítménygarancia, hanem egy áthelyezett munkaelosztás.

Az is előfordulhat, hogy a tartalom már látható, de a gomb még nem reagál, mert a hidratáló JavaScript nem futott le. A felhasználó ezt megtévesztőnek élheti meg. A minőségi megoldás nem csak a korai megjelenésre, hanem az interakció tényleges elérhetőségére is figyel.

## Cache: hogyan csökkenthető az ismételt munka?

Egy népszerű, mindenki számára azonos könyvoldalt nem szükséges minden látogatónak teljesen újra legyártani. A szerver, egy reverse proxy vagy CDN képes az elkészült választ gyorsítótárban tartani. A következő kérés így sokkal gyorsabban kaphat választ. A HTTP cache-fejlécek segítségével a rendszer azt is közölheti, meddig tekinthető frissnek a válasz, illetve mikor kell újraellenőrizni.

A gyorsítótárnál mindig ott a frissesség kérdése. Ha egy könyv ára megváltozik, nem szeretnénk órákig régi árat mutatni. Ha a válasz személyes – például tartalmazza a hallgató nevét vagy kosarának tartalmát –, azt nem szabad úgy megosztott cache-be tenni, hogy más felhasználó is megkaphassa. Ez nemcsak hibás élmény, hanem adatvédelmi incidens lehet.

Ezért gyakori a rétegezett gondolkodás: a nyilvános termékleírás erősen cache-elhető, míg a kosár vagy a jogosultság szerinti kedvezmény külön, személyre szabott kérésből érkezik. Nincs egyetlen cache-beállítás, amely minden adatfajtára jó.

## SEO, hozzáférhetőség és fokozatos működés

Mivel SSR-nél a lényeges tartalom az első HTML-ben jelen lehet, a keresőrobotok és megosztó szolgáltatások közvetlenebbül tudják értelmezni az oldalt. A megfelelő `title`, leírás, címsorhierarchia, kanonikus URL és strukturált tartalom azonban továbbra is tudatos tervezést igényel. SSR önmagában nem készít jó SEO-t; csak megbízhatóbb alapot ad hozzá.

Ugyanez igaz az akadálymentességre. A szemantikus HTML már JavaScript nélkül is értelmezhető. Egy űrlap megfelelő címkékkel és gombokkal működhet, majd a kliensoldali kód kényelmi funkciókat adhat hozzá. Ezt a szemléletet fokozatos fejlesztésnek (*progressive enhancement*) nevezzük: az alapfunkció stabilan működik, a fejlettebb képességek pedig javítják az élményt.

## Kompromisszumok és választási helyzetek

SSR jól illik nyilvános tartalomhoz, ahol fontos a gyors első megjelenés, a megosztható oldal és a kereshetőség. Ilyen lehet egy hírportál, termékkatalógus, tudásbázis vagy eseményoldal. Kevésbé kézenfekvő, ha a felület túlnyomórészt bejelentkezés mögötti, erősen személyes és folyamatosan interaktív munkaeszköz. Ott a kérésenkénti HTML-előállítás költsége és a cache korlátozottsága kevésbé kedvező lehet.

A valóságban sok rendszer hibrid. Egy marketingoldal előre elkészített vagy szerveroldali HTML-t használhat, a belső adminisztráció pedig kliensoldali alkalmazás lehet. Egyetlen oldalon is lehet SSR-ben érkező nyilvános tartalom és később betöltődő, személyes widget. A helyes kérdés ezért nem az, hogy „SSR vagy CSR?”, hanem hogy melyik tartalomnak, melyik felhasználónak és melyik időpontban mire van szüksége.

## Gyakori tévhitek

**„SSR-nél nincs JavaScript.”** Az SSR csak azt mondja meg, hol keletkezik az első HTML. Az interaktív felülethez gyakran szükség van kliensoldali JavaScriptre és hidratálásra.

**„SSR mindig gyors.”** A szerveroldali adatlekérés és HTML-generálás lassú lehet. A teljesítményt mérni kell a valós forgalomban.

**„A cache csak gyorsítás.”** Rosszul beállítva régi vagy akár más felhasználóhoz tartozó adatot adhat. A cache helyességi és adatvédelmi kérdés is.

**„A keresőoptimalizálás megoldódik SSR-rel.”** A jól strukturált, releváns és hozzáférhető tartalmat továbbra is meg kell tervezni.

## Ellenőrző kérdések

1. Milyen lépésekből áll egy SSR-válasz előállítása egy termékoldalnál?
2. Mit jelent a hidratálás, és miért van rá szükség?
3. Miért fordulhat elő, hogy SSR-oldalon a tartalom látszik, de a gomb még nem működik?
4. Mely válaszokat lehet biztonságosan megosztott cache-be tenni, és melyeket nem?
5. Milyen helyzetben választanál SSR-t, és milyen helyzetben inkább CSR-t?

## Fogalomtár

- **SSR:** olyan renderelés, ahol a szerver állítja elő a kéréshez tartozó HTML-t.
- **Hidratálás:** a szerver által küldött HTML-hez kliensoldali JavaScript-viselkedés kapcsolása.
- **TTFB:** a kérés indításától a válasz első bájtjáig eltelt idő.
- **Cache:** ideiglenes tároló ismételten szükséges válaszok vagy erőforrások gyors kiszolgálására.
- **Személyre szabás:** a válasz tartalmának egy konkrét felhasználóhoz vagy munkamenethez igazítása.
- **Fokozatos fejlesztés:** olyan tervezési elv, amelyben az alapfunkció elérhető, a fejlettebb kliensoldali képességek pedig ráépülnek.
