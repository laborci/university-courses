# Böngésző renderelési folyamata

A böngésző nem egyszerűen letölt egy oldalt, majd egyszerre kirajzolja. Több egymásra épülő feldolgozási lépésben alakítja át az erőforrásokat megjelenéssé. A gyors web nem attól gyors, hogy kevés fájlja van, hanem attól, hogy a felhasználó számára fontos tartalom hamar, stabilan és reagálóképesen jelenik meg.

### A látható oldal előtti munka

Amikor megnyitunk egy híroldalt, gyakran azt érezzük, hogy „betöltött az oldal”. A valóságban a betöltés több különböző dologból áll. A böngészőnek meg kell kapnia a HTML-választ, fel kell fedeznie belőle a kapcsolódó CSS-fájlokat, betűtípusokat, képeket és JavaScriptet, ezek egy részét le kell töltenie, majd ki kell számolnia, hol és hogyan jelenjenek meg az elemek. Közben a felhasználó már láthat valamit, de egy nagy kép még később érkezhet, egy betűtípus lecserélődhet, vagy egy gomb csak JavaScript lefutása után válik használhatóvá.

Ezért a teljesítményt érdemes felhasználói élményként értelmezni. Mennyi idő után jelenik meg az első érdemi tartalom? Mikor látszik a legnagyobb fontos elem? Elmozdul-e közben a szöveg vagy egy gomb? Milyen hamar reagál az oldal a kattintásra? Ezek a kérdések közelebb állnak a valós használathoz, mint egyetlen, technikai „betöltési idő” érték.

### HTML feldolgozása: DOM építése

A folyamat kiindulópontja általában a HTML. A böngésző nem feltétlenül várja meg az egész dokumentum letöltését: ahogy bájtok érkeznek, elemzi őket. Felismeri a tageket, attribútumokat és szövegeket, majd felépíti belőlük a DOM-fát. A DOM a dokumentum szerkezetének futás közbeni modellje; a böngésző később ebből tudja meg, milyen elemek léteznek és milyen kapcsolatban állnak.

Az elemzés során a böngésző további erőforrások nyomára bukkan. Egy `link rel="stylesheet"` CSS-t jelez, egy `img` képet, egy `script` JavaScriptet, egy `video` videót. A böngésző ezeket párhuzamosan próbálja kérni, ahol a protokoll és az erőforrás típusa ezt lehetővé teszi. A HTML tehát nem csak tartalom: egyfajta erőforrás-térkép is.

Ha a HTML hibás, a böngésző igyekszik értelmes DOM-ot építeni, de a hibajavítás eredménye néha meglepő lehet. A rosszul egymásba ágyazott elemek más helyre kerülhetnek a fában, mint ahová a szerző szánta őket. Ez újabb ok arra, hogy a dokumentumszerkezet legyen rendezett és szemantikus.

### CSS feldolgozása: CSSOM és stílusok

A CSS nem a DOM része. A böngésző a stíluslapokat is elemzi, és belőlük egy saját belső reprezentációt, gyakran CSSOM-nak nevezett modellt alakít ki. Ebben nemcsak az szerepel, hogy például a `p` legyen szürke, hanem a szelektorok, öröklési szabályok, médiafeltételek és az egymással versengő deklarációk prioritása is.

Amikor a böngésző egy DOM-elemhez megállapítja a tényleges stílust, össze kell vetnie minden rá vonatkozó szabályt: a böngésző alapstílusait, a külső stíluslapokat, az adott elem örökölt tulajdonságait és szükség esetén az inline stílust. A „cascading” éppen ezt a döntési rendszert jelenti. Az eredmény például lehet az, hogy egy bekezdés 16 pixeles, sötétszürke, adott betűcsaládú és egy rugalmas elrendezés része.

A CSS azért kritikus erőforrás, mert a böngésző nem szeretne rendezetlen vagy villódzó felületet mutatni. Ha nem ismeri a stílusokat, nem tudja megbízhatóan kiszámolni a végső elrendezést. Ezért a dokumentum elején szükséges stíluslapok gyakran késleltetik az első, stabil megjelenítést. Ebből nem az következik, hogy a CSS rossz vagy kerülendő: az a tanulság, hogy a kezdeti nézethez szükséges stílusok legyenek ésszerű méretűek és időben elérhetők.

### Render tree: ami valóban megjelenik

A DOM és a stílusinformációk találkozásából épül fel a render tree, magyarul megjelenítési fa. Ez azoknak az elemeknek a megjelenítési reprezentációját tartalmazza, amelyek részt vesznek a látható oldal kialakításában, a hozzájuk tartozó kiszámított stílusokkal.

A render tree nem azonos a DOM-mal. A `head` például a DOM része, de nem jelenik meg a képernyőn. Egy `display: none` stílusú elem rendszerint szintén nem kerül a megjelenítési fába, mert a böngésző számára sem helyet, sem képet nem kell készítenie róla. Ezzel szemben egy átlátszó elem (`opacity: 0`) lehet láthatatlan, de helyet továbbra is foglalhat, így a megjelenítési folyamatban szerepe marad.

Ez a különbség gyakorlati következményekkel jár. A `display: none`-nal elrejtett menü a vizuális elrendezésből kikerül, míg egy csupán áttetszővé tett elem továbbra is befolyásolhatja az elrendezést és akár interaktív is maradhat. A megfelelő döntés attól függ, mit szeretnénk: ideiglenesen eltüntetni valamit, animálni, vagy valóban kivonni a felületből.

### Layout: helyek és méretek kiszámítása

Miután a böngésző tudja, mely elemek jelennek meg és milyen stílusuk van, ki kell számítania a geometriai elrendezést. Ez a layout, más néven reflow. Itt dől el például, hogy egy kártya hány pixel széles, egy cím hány sorba törik, egy gomb hol kezdődik, vagy egy rács hány oszlopot használ a jelenlegi ablakméretnél.

Az elrendezés sokszor függő feladat. Egy szülő elem magasságát befolyásolhatja a gyermekek tartalma, a gyermekek szélessége függhet a szülő szélességétől, és a szöveg tördelése megváltoztathatja a szükséges magasságot. Emiatt egyetlen változás is továbbterjedhet. Ha például egy későn betöltődő képnek nem adtunk előre ismert méretet, a kép érkezésekor lefelé tolhatja az alatta levő tartalmat. A felhasználó éppen egy gombra akarna kattintani, amely közben elmozdul: ez tipikus használhatósági hiba.

A reszponzív tervezés erősen kötődik a layouthoz. Nem külön weboldalt készítünk minden készülékre, hanem olyan szabályokat, amelyek a rendelkezésre álló tér alapján újrarendezik a tartalmat. Egy háromoszlopos kártyarács keskeny képernyőn két-, majd egyoszlopossá válhat. A tartalom jelentése közben ugyanaz marad.

### Paint: pixelek előállítása

A paint, azaz kirajzolás során a böngésző a kiszámított dobozok és stílusok alapján festési utasításokat hoz létre. Ide tartozik a szöveg, a háttér, a szegély, az árnyék, a kép és sok más vizuális részlet rajzolása. A paint még nem feltétlenül jelenti azt, hogy minden azonnal a képernyő végső pixelévé vált; inkább annak leírása, mit kell kirajzolni.

Egy egyszerű színváltozás gyakran csak új kirajzolást igényel. Egy elem méretének vagy helyének módosítása azonban új layoutot és utána paintet is kiválthat. Emiatt egy folyamatos animációban kedvezőbb lehet olyan tulajdonságokat használni, amelyeket a böngésző hatékonyabban tud kezelni, például bizonyos esetekben az áttetszőséget vagy az eltolást, mint minden képkockában a szélesség újraszámítását. Ez nem abszolút szabály, de jól mutatja, hogy a látványos felületnek is van számítási költsége.

### Compositing: rétegek összeillesztése

A kompozitálás során a böngésző az elkülönített rétegeket megfelelő sorrendben összerakja a képernyő végső képévé. Bizonyos elemek – például görgethető tartalmak, animált vagy átlátszó rétegek – külön kezelést kaphatnak. Ennek egyik célja, hogy egy változásnál ne kelljen a teljes oldalt újra kirajzolni.

A rétegezés nem varázslat és nem biztosít automatikusan gyors oldalt. Túl sok összetett réteg memóriát és feldolgozást igényelhet. A jó teljesítményhez a tényleges felhasználói problémát kell mérni és megérteni: lehet, hogy nem a rajzolás, hanem egy lassú hálózati kérés vagy hosszú JavaScript-feladat okozza a késlekedést.

### JavaScript és a blokkolás kérdése

A hagyományos, `script` taggel elhelyezett JavaScript különleges helyzetben van. Amikor a HTML-feldolgozó egy ilyen szkripthez ér, a böngészőnek rendszerint le kell töltenie és futtatnia kell azt, mielőtt biztonsággal folytatná a dokumentum elemzését. Erre azért van szükség, mert a szkript elvileg módosíthatja a dokumentumot, akár új HTML-részletet is írhat bele. Ez a viselkedés blokkolhatja a DOM felépítését és a megjelenítést.

Két gyakori attribútum segít tudatosan kezelni ezt. Az `async` jelzi, hogy a szkript letölthető párhuzamosan, és amint megérkezett, futtatható; ez jó lehet egymástól független mérési vagy külső szkripteknél, de a futási sorrend nem garantált. A `defer` szintén párhuzamos letöltést enged, viszont a végrehajtást a HTML feldolgozása utánra halasztja, és megőrzi a dokumentumban szereplő sorrendet. A legtöbb, a DOM-ra építő saját szkriptnél a `defer` könnyebben kiszámítható választás.

Nem az a cél, hogy minden JavaScriptet elrejtsünk vagy későre halasszunk. Egy bejelentkezési felülethez vagy azonnali interakcióhoz szükséges kód fontos lehet. A cél az, hogy az első képernyőn még nem szükséges munkát ne kényszerítsük a felhasználóra a tartalom megjelenése előtt.

### Mit figyeljünk teljesítmény szempontjából?

Egy modern böngésző sok mérőszámot tud mutatni, de az alapelv egyszerű. A fontos tartalom jelenjen meg hamar; az elrendezés ne ugráljon; a felület reagáljon rövid időn belül; és a háttérben futó munka ne akadályozza a felhasználót. A nagy, optimalizálatlan képek, fölösleges betűtípusok, túl sok külső szkript és túl nagy JavaScript-csomag mind árthatnak ezeknek a céloknak.

A teljesítmény nem csak kényelmi kérdés. Lassú mobilhálózaton, régebbi telefonon vagy korlátozott adatkerettel a nehéz oldal kevésbé hozzáférhető. A gyors, stabil oldal a fenntarthatóság szempontjából is kedvezőbb lehet, mert kevesebb adatot és számítást igényel.

## Végigvezetett példa: egy eseményoldal első megjelenése

Tegyük fel, hogy egy hallgató megnyitja egy egyetemi konferencia eseményoldalát. Először megérkezik a HTML, amelyben benne van az esemény címe, időpontja, rövid leírása, egy hivatkozás a CSS-re, egy nagyméretű fejlécfotó és egy JavaScript-fájl. A böngésző a HTML-ből DOM-ot épít, felismeri a stíluslapot és a képet, ezért elindítja a letöltésüket.

Amikor a CSS feldolgozása elkészül, a böngésző a DOM-mal együtt meg tudja alkotni a render tree-t. A layout kiszámolja, hogy asztali nézetben a szöveg és a kép egymás mellett, mobilon egymás alatt legyen. A paint megrajzolja a hátteret, a betűket és a kereteket, a kompozitálás pedig összerakja a végső képet.

Ha a fejlécfotó mérete nincs előre megadva, lehet, hogy a szöveg először feljebb látszik, majd a kép betöltődésekor hirtelen lejjebb ugrik. Ha a dokumentum elején egy nagy, blokkoló JavaScript-fájl található, a cím is később jelenhet meg, noha a hallgató számára ez lenne a legfontosabb információ. Egy jobb változatban a kép rendelkezik ismert méretaránnyal, a nem létfontosságú szkript `defer` attribútumot kap, és a kezdeti nézethez szükséges stílusok gyorsan rendelkezésre állnak.

## Gyakori félreértések

| Állítás | Pontosítás |
| --- | --- |
| „A HTML letöltése után kész az oldal.” | A HTML csak a kezdet; a stílusok, képek, szkriptek és a megjelenítési lépések még hátravannak. |
| „A render tree ugyanaz, mint a DOM.” | A render tree a DOM megjelenő részeit és kiszámított stílusait használja; nem minden DOM-elem szerepel benne. |
| „Minden módosítás egyformán drága.” | Egy színváltozás, egy új elrendezés és egy teljes oldalfrissítés eltérő mennyiségű munkát okozhat. |
| „Az `async` mindig jobb, mint a normál script.” | Az `async` futási sorrendje nem kiszámítható; egymásra épülő kódnál hibát okozhat. |
| „A gyors oldal csak a fejlesztő kényelme.” | A teljesítmény a használhatóságot, hozzáférhetőséget, költséget és sok esetben az üzleti eredményt is befolyásolja. |

## Ellenőrző kérdések

1. Miért épít a böngésző DOM-ot a HTML feldolgozásakor?
2. Mi a CSSOM szerepe, és miért lehet a CSS kritikus erőforrás?
3. Miben különbözik a DOM és a render tree?
4. Mit számít ki a layout lépés, és miért idézhet elő egy nagy kép elrendezés-ugrást?
5. Mit jelent a paint és a compositing a gyakorlatban?
6. Miért blokkolhat egy hagyományos `script` elem, és mikor lehet indokolt a `defer` használata?
7. Nevezzen meg három olyan tényezőt, amely késleltetheti a felhasználó számára fontos első tartalom megjelenését.

## Fogalomtár

- **DOM:** a böngésző által felépített dokumentumobjektum-modell.
- **CSSOM:** a CSS-szabályok böngészőbeli belső modellje.
- **Render tree:** a megjelenő elemek és kiszámított stílusaik fája.
- **Layout (reflow):** az elemek méretének és helyének kiszámítása.
- **Paint:** a vizuális részletek kirajzolásához szükséges utasítások előállítása.
- **Compositing:** külön kezelt rétegek végső képpé összeillesztése.
- **Blokkoló erőforrás:** olyan erőforrás, amely késlelteti a dokumentum feldolgozásának vagy megjelenítésének egy fontos lépését.
- **`async`:** szkriptattribútum párhuzamos letöltéshez, nem garantált futási sorrenddel.
- **`defer`:** szkriptattribútum párhuzamos letöltéshez, a HTML feldolgozása utáni, sorrendtartó végrehajtással.
