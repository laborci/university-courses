# Architektúraválasztási szempontok

A jó webes architektúra az adott szolgáltatás igényeire adott arányos válasz. Egy egyszerű, statikus tájékoztató oldalnál a minimális technikai összetettség gyakran előny, míg egy személyes, valós időben változó alkalmazásnak más felépítésre lehet szüksége. A választás mindig kompromisszum: ami gyorsabbá teszi az első betöltést, nem biztos, hogy a személyre szabást is egyszerűvé teszi; ami rugalmasabb, annak nagyobb lehet a fejlesztési és üzemeltetési ára.

Az architektúra szó ebben a témában azt jelenti, hogyan osztjuk fel egy webes szolgáltatás feladatait, hol állítjuk elő a felhasználó által látott oldalt, hol tároljuk az adatokat, és hogyan kommunikálnak egymással az összetevők. A hallgató nap mint nap találkozik architektúrák következményeivel: egy híroldal pillanatok alatt megnyílik, egy webáruház mégis személyre szabott ajánlatot ad, egy levelező pedig látszólag azonnal frissíti az olvasatlan üzenetek számát. A felületek hasonlóak lehetnek, a mögöttük álló igények azonban jelentősen eltérnek.

Három, gyakran emlegetett megközelítés segít a beszélgetés elindításában. A statikus oldal előre elkészített fájlokból áll; a kiszolgáló lényegében kész HTML-, CSS-, JavaScript- és képfájlokat ad vissza. A szerveroldali renderelésnél a szerver a kéréskor állítja elő a HTML-t, például az adatbázisból kapott tartalommal. A kliensoldali alkalmazásnál a böngésző nagyobb JavaScript-programot tölt le, az pedig API-kon keresztül kér adatot és építi fel a felület jelentős részét. A valós rendszerek gyakran hibrid megoldások: az első oldal szerverről vagy előre generálva érkezik, később a böngésző interaktív részeket vesz át.

Nem helyes automatikusan azt mondani, hogy a „modernebb” vagy több JavaScriptet használó megoldás jobb. A kérdés inkább az, milyen tartalmat és milyen felhasználói helyzetet szolgálunk ki.

### A tartalom jellege és frissessége

Elsőként azt kell tisztázni, mit közöl a szolgáltatás, és milyen gyorsan változik. Egy tanszéki elérhetőségeket, szabályzatokat és felvételi tájékoztatót közlő oldal tartalmát ritkán módosítják. Itt az előre elkészített, statikus oldalak előnyei erősek: kevés mozgó alkatrész, jó teljesítmény, egyszerű gyorsítótárazás és kevés üzemeltetési kockázat. Ha délután átírnak egy határidőt, természetesen újra kell építeni vagy közzé kell tenni az oldalt, de ez a legtöbb esetben nem probléma.

Ezzel szemben egy készletinformációt mutató webáruházban az adat gyorsan változhat. A „már csak 2 darab” állítás hibás lehet, ha a terméket időközben más is megvásárolta. Itt érdemes különválasztani azt, ami nyugodtan lehet gyorsítótárazott – például a termék leírása és képei –, attól, aminek frissnek kell lennie, például a kosár tartalmától vagy a rendelés leadásakor ellenőrzött készlettől. A frissesség nem bináris tulajdonság. Másodperces eltérés még elfogadható lehet egy nézettségi számlálónál, de nem egy banki egyenlegnél.

### Interaktivitás és állapot

Az interaktivitás alatt nem csupán látványos animációt értünk. Ide tartozik az űrlap kitöltése, a keresés szűkítése, a kosár kezelése, a térképen való mozgás és az értesítés is. A kérdés az, hogy az élmény megköveteli-e az azonnali böngészőoldali reakciót, vagy megfelelő, ha a felhasználó egy művelet után új oldalt kap.

Egy konferencia programjának szűrése kényelmesebb lehet, ha a kiválasztott előadó vagy téma rögtön módosítja a listát. Ez indokolhat némi kliensoldali logikát. Ugyanakkor a jelentkezés tényleges mentése, a jogosultság vizsgálata és a férőhely ellenőrzése a szerver feladata: a böngészőben futó kód a felhasználó gépén van, ezért nem tekinthető megbízható döntéshozónak.

Az állapot az, amit a rendszernek két kérés között meg kell jegyeznie. A bejelentkezett felhasználó személye, a kosár tartalma, egy félig kitöltött űrlap vagy az olvasatlan üzenetek listája mind állapot. Minél több állapotot kezel egy rendszer, annál több kérdés merül fel: hol tároljuk, hogyan szinkronizáljuk több eszköz között, mi történik kapcsolatkimaradáskor, és ki férhet hozzá? Ez nem érv a funkció ellen, hanem figyelmeztetés arra, hogy az interaktivitásnak ára van.

### SEO és megtalálhatóság

A keresőoptimalizálás, röviden SEO, nem trükkök gyűjteménye, hanem annak elősegítése, hogy a keresők és más gépi fogyasztók megértsék a tartalmat. Egy nyilvános cikket, termékoldalt vagy képzési leírást általában érdemes jól indexelhető HTML-ben szolgáltatni. A szemantikus címsorok, értelmes hivatkozások, metaadatok, strukturált adatok, gyors betöltés és stabil URL-ek mind fontosak.

Ha egy oldal kezdetben csak egy üres gyökérelemet és sok JavaScriptet küld, a keresők gyakran ma már képesek később lefuttatni a programot. Ez azonban nem jó ok arra, hogy a nyilvános tartalmat szükségtelenül nehezen hozzáférhetővé tegyük. A renderelés erőforrást igényel, hibázhat, és nem minden robot vagy megosztó szolgáltatás viselkedik ugyanúgy. A SEO szempont ezért sok nyilvános tartalomnál a statikus vagy szerveroldalon előállított első HTML felé terelhet.

### Személyre szabás és adatvédelem

A személyre szabás lehet ártalmatlan kényelmi funkció, például az oldal megjegyzi a sötét módot vagy az előnyben részesített nyelvet. Lehet azonban érzékenyebb is: ajánlórendszer, korábbi vásárlások, földrajzi hely vagy tanulmányi előzmény alapján más tartalom jelenik meg. Minél személyesebb az adat, annál fontosabb a világos cél, az adatminimalizálás és a hozzáférések kontrollja.

Architekturális következmény, hogy a személyes oldalt rendszerint kéréskor, a bejelentkezett felhasználóhoz kötve kell előállítani, vagy a böngészőnek hitelesített API-kéréssel kell adatot kérnie. Nem tehetünk minden felhasználónak külön, nyilvánosan gyorsítótárazható HTML-változatot. A megosztott cache véletlenül sem szolgálhat ki egyik felhasználónak a másik személyes oldalából. A GDPR szempontjából is lényeges, hogy értsük: a technikai naplók, cookie-k, azonosítók és elemzési adatok is lehetnek személyes adatok. Az adatvédelmi követelmények nem külön dokumentációs feladatok; befolyásolják, milyen adatot gyűjtünk és meddig őrzünk meg.

### Költség és üzemeltethetőség

Egy rendszer ára nemcsak a szerver számlája. Ide tartozik a fejlesztési idő, a hibakeresés, a megfigyelés, a biztonsági frissítések, a tartalom közzététele, a mentések és az incidenskezelés is. Egy egyszerű statikus oldal közzététele olcsó és jól terhelhető lehet. Egy adatbázist, belépést, fizetést és háttérfeladatokat kezelő rendszer több üzemeltetési tudást igényel.

Az „építsünk mikroszolgáltatásokat, mert így skálázható” gyakori, de félrevezető kiindulás. A sok külön szolgáltatás több hálózati hibalehetőséget, naplót, jogosultságot, telepítést és koordinációt jelent. Kis csapat vagy kevés funkció esetén egy átlátható, egyben kezelt alkalmazás gyakran jobb döntés. A későbbi bővítés lehetősége fontos, de nem azonos azzal, hogy a kezdetektől minden elképzelhető problémát megoldunk.

### Hozzáférhetőség és hibatűrés

A hozzáférhetőség nem kizárólag a képernyőolvasó használóiról szól. Lassú hálózaton, régi készüléken, ideiglenesen hibás szkripttel vagy billentyűzettel navigálva is használhatónak kell maradnia a szolgáltatásnak. Az architektúrát ezért érdemes úgy alakítani, hogy a fő tartalom és alapműveletek ne függjenek indokolatlanul sok kliensoldali programtól. A fokozatos fejlesztés itt gyakorlati hibatűrés is.

A hibatűrés azt vizsgálja, mi történik, ha valamelyik összetevő lassú vagy kiesik. Ha az ajánlórendszer nem elérhető, a webáruház ideális esetben még elad terméket, csak nem mutat személyes ajánlást. Ha a képszolgáltatás problémás, a cikk szövege tovább olvasható. A jó rendszer nem feltétlenül hibátlan, hanem érthetően és biztonságosan romlik le: hibát jelez, megőrzi a lényeges adatot, és nem tesz valótlan ígéretet.

## Végigvezetett példa: egy egyetemi rendezvényoldal

Képzeljünk el egy nyilvános oldalt, amely egy kari szakmai nap programját, előadóit és helyszínét mutatja. A program többnyire naponta vagy hetente változik, a szervezők pedig azt szeretnék, hogy a keresők és a közösségi megosztások is jól lássák. Az alapoldalak számára jó döntés lehet az előre generált HTML és a tartalom gyors CDN-es kiszolgálása. Így gyors, olcsó, jól indexelhető és kevésbé sérülékeny oldalt kapunk.

A jelentkezési űrlap viszont más. Itt személyes adat, férőhely és visszaigazolás van, tehát szerveroldali feldolgozás kell. Az űrlap mezőit a böngésző azonnal jelezheti, ha hiányosak, de a szervernek is ellenőriznie kell őket. A jelentkezési oldal nem kerülhet megosztott cache-be, a szervezői felülethez pedig jogosultságkezelés szükséges. Ha az előadók fényképei késnek, az oldal továbbra is mutassa a neveket és a programot. Ez a hibrid felépítés nem „félmegoldás”, hanem az eltérő részekhez igazított választás.

## Gyakori tévhitek

| Állítás | Pontosítás |
| --- | --- |
| „Az egyoldalas alkalmazás mindig gyorsabb.” | Az interakció lehet gyors, de az első betöltés és a keresőbeli feldolgozás akár rosszabb is lehet. |
| „A statikus oldal csak egyszerű, elavult honlap lehet.” | Sok tartalomközpontú, nagy forgalmú oldal használ előre előállított tartalmat. |
| „A személyre szabás csak felületi kérdés.” | Azonosítási, adatvédelmi, gyorsítótárazási és biztonsági következményei vannak. |
| „A hibatűrés azt jelenti, hogy soha nincs hiba.” | A cél a részleges működőképesség és az érthető, biztonságos hibakezelés. |
| „A több komponens automatikusan jobban skálázható.” | A komponensek közti kommunikáció és üzemeltetés is jelentős összetettséget hoz. |

## Ellenőrző kérdések

1. Milyen tartalomnál indokolható az előre generált oldal, és miért?
2. Miért kezelhető másképp egy termék leírása, mint az adott pillanatban elérhető készlete?
3. Hogyan befolyásolja a SEO a nyilvános cikkoldal renderelési módját?
4. Milyen kockázatot okozhat, ha személyes tartalom megosztott gyorsítótárba kerül?
5. Mondjon példát olyan kiegészítő funkcióra, amely kieshet anélkül, hogy a szolgáltatás fő feladata megszűnne.

## Fogalomtár

- **Architektúra:** a rendszer összetevőinek, felelősségeinek és kapcsolataiknak magas szintű felépítése.
- **Statikus generálás:** a tartalom előre elkészített fájlként történő előállítása és kiszolgálása.
- **Szerveroldali renderelés:** HTML előállítása a szerveren, jellemzően a kéréskor.
- **Kliensoldali renderelés:** a böngészőben futó program által összeállított felület.
- **SEO:** a nyilvános webes tartalom megtalálhatóságát és gépi értelmezhetőségét segítő gyakorlatok összessége.
- **Személyre szabás:** a felület vagy tartalom igazítása egy felhasználóhoz, beállításhoz vagy előzményhez.
- **Hibatűrés:** a rendszer képessége arra, hogy részleges hiba esetén is értelmesen működjön.
- **Fokozatos fejlesztés:** olyan tervezési elv, amelyben a lényeges tartalom és funkció egyszerű alapon is elérhető, a többlet pedig erre épül.
