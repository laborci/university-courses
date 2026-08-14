# Demonstráció: DOM, erőforrások és böngészőtárolók

A böngésző fejlesztői eszközei nem „feltörőeszközök”, hanem átláthatóságot adó megfigyelőeszközök. Megmutatják, miből épül fel egy oldal, mit tölt le, milyen adatot tárol helyben, és hogyan alakítja át a JavaScript a dokumentumot. Ettől a web működése kevésbé tűnik varázslatnak: kérhető, megtekinthető és értelmezhető részekből áll.

## Előkészítés

Az oktató válasszon egy jogszerűen megnyitható, egyszerű nyilvános oldalt vagy egy előre elkészített oktatási mintalapot. Jó választás lehet egy egyetemi híroldal vagy egy olyan demóoldal, amelyen cím, bekezdések, kép, külső stíluslap, JavaScript és egy egyszerű beállítás (például világos–sötét téma) is található. Bejelentkezést igénylő rendszert, személyes adatokat vagy érzékeny adminisztrációs felületet ne használjunk.

Chrome-ban és Edge-ben a fejlesztői eszközök jellemzően az `F12` vagy a `Ctrl+Shift+I` billentyűvel nyithatók meg; macOS-en ennek megfelelő gyorsbillentyű használható. Firefoxban hasonlóan elérhetők. A fülek neve és elrendezése kissé eltérhet, de a lényeg ugyanaz: az **Elements/Inspector**, **Network** és **Application/Storage** területre lesz szükség.

## Részletes oktatói forgatókönyv

### 1. Nyitókérdés: mit látunk és miből következtetünk rá?

Az oktató először csak a kész weboldalt mutatja meg. Érdemes megkérdezni: „Mi alapján tudjuk, hogy ez a cím valóban cím? Honnan tudjuk, miért kék a gomb? És amikor a gombra kattintunk, honnan tudjuk, mi változott meg?” A hallgatók általában a látványból indulnak ki. A demonstráció célja, hogy ezt a látható réteget visszakössük a HTML-hez, CSS-hez és JavaScripthez.

Ezután nyissuk meg a fejlesztői eszközöket, és emeljük ki: amit látunk, az a saját böngészőnkben letöltött és feldolgozott oldal. Egy nyilvános oldal elemeinek megtekintése normál használati környezetben történik. Ettől még nem válik megengedetté a szolgáltatás szerveroldali védelmének megkerülése vagy mások adatainak megismerése.

### 2. Elements vagy Inspector: a dokumentum élő szerkezete

Nyissuk meg az **Elements** (Firefoxban gyakran **Inspector**) panelt. A bal oldalon általában faformában jelenik meg a HTML. Keressünk meg egy jól látható főcímet. Használjuk az elemkiválasztó ikont, majd kattintsunk a címen: a böngésző kiemeli, mely HTML-elemhez tartozik a képernyőn látható rész.

Itt érdemes megállni a DOM fogalmánál. A **DOM** (Document Object Model) a böngésző memóriájában élő, faalakú modell a dokumentumról. A `html` elem gyökérként tartalmazza a `head` és `body` részt; a `body` alatt lehet fejléc, fő tartalom, bekezdés, kép és gomb. A DOM nem egyszerűen az eredetileg letöltött HTML-fájl szövege. A böngésző kijavíthat bizonyos hiányosságokat, bővítheti a szerkezetet, és JavaScript futása közben a DOM tovább változhat.

Mutassunk egy egyszerű példát. Egy gomb felirata lehet eredetileg „Részletek”, kattintás után pedig JavaScript átírhatja „Bezárás”-ra és megjeleníthet további szöveget. Az Elements panelben a hallgatók az aktuális, élő állapotot látják. Ha szükséges, hasonlítsuk össze a böngésző „Oldal forrásának megtekintése” funkciójával: ott nagyobb eséllyel az eredetileg érkezett HTML látszik, nem a később módosított DOM.

### 3. HTML: a jelentés megfigyelése

Az Elements nézetben keressünk szemantikus elemeket: `header`, `nav`, `main`, `article`, `h1`, `h2`, `button`, `form`, `label` vagy `footer`. Kérdezzük meg, mi lenne a különbség, ha egy főcím `h1`, illetve ha csak egy tetszőleges `div` lenne. A képernyőn akár azonosnak tűnhetnek, de a jelentésük eltér. A böngésző, kereső és képernyőolvasó számára a szemantikus elem többet közöl.

Egy űrlapon különösen jól látható a szerkezet szerepe. Jelöljünk ki egy feliratot és a hozzá tartozó mezőt. Ha a `label` megfelelően kötődik az `input` elemhez, a feliratra kattintva a mező fókuszt kaphat. Ez nem csupán kényelmi részlet: kisebb érintőkijelzőn, billentyűzetes használatkor és segítő technológiáknál is sokat számíthat.

### 4. CSS: honnan jön a látvány?

Amikor egy elem ki van választva, a jobb oldali **Styles** vagy **Computed** terület többnyire megmutatja a rá érvényes CSS-szabályokat. Válasszunk ki egy gombot, majd keressük meg a háttérszínt, a betűméretet, a belső térközt (`padding`), a külső térközt (`margin`) és az elrendezési tulajdonságokat.

Magyarázzuk el, hogy a böngésző több szabályból állítja össze a végső megjelenést. Lehet alapértelmezett böngészőstílus, külső stíluslapból érkező szabály, a szerző által közvetlenül megadott stílus és örökölt tulajdonság. A **Computed** nézet ezért hasznos: itt a ténylegesen érvényes végső értékek látszanak, még akkor is, ha több szabály „versenyzett” értük.

Egy ártalmatlan, rövid kísérletként jelöljünk ki egy `color` vagy `margin` deklarációt, és kapcsoljuk ki a jelölőnégyzetével. A változás csak a helyi böngészőben, csak átmenetileg történik; oldalfrissítéskor elvész. Ez jó alkalom arra, hogy kimondjuk: a fejlesztői eszköz a megfigyelés mellett kísérletezésre való, de nem módosítja a webhely szerverén tárolt forráskódot.

### 5. JavaScript: látható nyomok és a DOM módosulása

Keressünk olyan elemet, amely interakcióra változik: lenyíló menüt, téma-váltót, keresőmezőt vagy „további tartalom” gombot. A művelet előtt jegyezzük meg az Elements panelen a releváns részletet, majd kattintsunk a vezérlőre. Megjelenhet új DOM-elem, megváltozhat egy CSS-osztály, vagy egy attribútum értéke. Például a `class="menu"` `class="menu nyitott"` alakra módosulhat. A CSS erre reagálva láthatóvá teszi a menüt.

Ebből következik a munkamegosztás: a HTML adja az elemeket és jelentésüket, a CSS szabályai mondják meg, hogyan nézzen ki a `nyitott` állapot, a JavaScript pedig felhasználói esemény hatására módosíthatja az állapotot. Fontos pontosítás, hogy a JavaScript nem csak DOM-módosításra használható: hálózati adatot is kérhet, helyi tárolót érhet el, időzítőt kezelhet. A demonstrációban azonban a DOM-változás a legkönnyebben megfigyelhető.

### 6. Network: mi töltődik le, és milyen sorrendben?

Nyissuk meg a **Network** panelt, majd frissítsük az oldalt úgy, hogy a panel már nyitva legyen. A lista minden sora egy hálózati kérést jelölhet. Keressük meg az első dokumentumkérést; ez gyakran a HTML-t adja. Ezután jelenhetnek meg CSS-fájlok, JavaScript-fájlok, képek, betűtípusok, esetleg további API-kérések.

A panel oszlopaiban figyeljük meg a kérés nevét vagy URL-jét, a státuszkódot, az erőforrás típusát, az átvitt méretet és az időtartamot. Egy `200` rendszerint sikeres választ jelent. A `304 Not Modified` azt jelezheti, hogy a böngésző a tárolt változatot használhatja, mert a szerver szerint nem változott az erőforrás. Egy `404` arra utal, hogy a kért erőforrás nem található. A státuszkód mindig egy konkrét kéréshez tartozik; egy oldalon lehet egyszerre sikeres fődokumentum és hibásan betöltődő kép.

Kattintsunk egy CSS-fájlra, majd egy képre, és hasonlítsuk össze a válaszfejléceket. A `Content-Type: text/css` azt jelzi, hogy a válasz CSS, a kép esetén például `image/webp` vagy `image/png` látható. Ezzel közvetlenül visszakapcsolható a korábbi HTTP-tananyag: a fejléc metaadatot mond a válaszról, a törzs pedig maga a stíluslap vagy kép bináris tartalma.

Kérjünk meg egy hallgatót, hogy a Network listából mondja meg: melyik erőforrás felel egy nagy hero-képért, melyik egy külső betűtípusért, és honnan sejthető, hogy JavaScript fut az oldalon. Ekkor ne pusztán a fájlkiterjesztésre hagyatkozzunk: a Type és Content-Type oszlopok megbízhatóbb támpontok.

### 7. Application vagy Storage: mit őriz a böngésző?

Chromium-alapú böngészőkben az **Application**, Firefoxban a **Storage** panel ad áttekintést a webhelyhez kötött helyi adatokról. Kezdjük a cookie-kkal. A cookie kisméretű adat, amelyet a böngésző meghatározott szabályok mellett egy webhelyhez kapcsol. Gyakran munkamenet azonosítására, bejelentkezés fenntartására vagy beállítások megjegyzésére használják. A cookie-nál látható lehet a név, érték, lejárat, domain, útvonal és biztonsági attribútumok, például `Secure`, `HttpOnly` és `SameSite`.

Fontos: attól, hogy egy cookie látható a saját böngészőben, még nem szabad érzékeny értéket képernyőképen vagy prezentációban megosztani. Demonstrációhoz használjunk kijelentkezett, nyilvános oldalt vagy saját mintarendszert. A cél annak megértése, hogy a cookie azonosítási és állapotkezelési mechanizmus része, nem az, hogy valódi munkamenetadatokat vizsgáljunk.

Ezután nézzük meg a **localStorage** és **sessionStorage** területeket. A `localStorage` kulcs–érték párokban, jellemzően hosszabb ideig tárol adatot ugyanahhoz az eredethez kötve. Egy téma-beállítás, például `theme = dark`, tipikus példa lehet. A `sessionStorage` szintén böngészőoldali kulcs–érték tároló, de általában egy adott böngészőfülhöz kötődő, rövidebb életű állapothoz használható. Egy „űrlap piszkozata” vagy egy folyamat ideiglenes lépése lehet szemléltető eset.

Hangsúlyozzuk, hogy a böngészőoldali tároló nem biztonságos titkos széf. A felhasználó megvizsgálhatja és módosíthatja a saját kliensében tárolt adatokat, ezért jogosultságot, árat, vizsgajegyet vagy más üzletileg kritikus döntést nem szabad kizárólag itt tárolt értékre építeni. A szervernek kell érvényesítenie a fontos szabályokat.

### 8. Lezárás: egy oldal rétegei egy mondatban

A végén térjünk vissza az első kérdéshez. A képernyőn látható oldal egy HTML által strukturált dokumentum, CSS által formázott felület és esetenként JavaScript által módosított viselkedés. A Network nézet megmutatta az ehhez letöltött erőforrásokat; a Storage nézet pedig azt, hogy a böngésző milyen helyi állapotot őrizhet hozzá. A hallgatóknak nem kell még önállóan komplex hibát keresniük, de tudniuk kell, hol kezdjenek el nézni, ha egy oldal másképp működik, lassú vagy váratlanul „emlékszik” valamire.

## Javasolt rövid órai feladat

Párokban nyissanak meg egy oktató által kijelölt nyilvános oldalt, és töltsenek ki egy megfigyelési táblázatot. Keressenek egy `h1` elemet, egy külső CSS-erőforrást, egy JavaScript-fájlt, egy képet és egy tárolt kulcs–érték párt vagy cookie-t. Minden elemhez írjanak egy mondatot arról, milyen szerepet tölt be. Ha az oldal nem használ látható helyi tárolót, ezt is helyes megállapításként rögzíthetik.

## Gyakori tévhitek

| Állítás | Pontosítás |
| --- | --- |
| „Az Elements panel pontosan a szerver HTML-fájlját mutatja.” | Többnyire az aktuális, böngészőben élő DOM-ot mutatja, amelyet JavaScript és a böngésző is módosíthatott. |
| „Ha DevToolsban átírom a szöveget, az oldal szerverén is megváltozik.” | A módosítás helyi és átmeneti; frissítéskor általában eltűnik. |
| „A Network panel csak hibakeresőknek való.” | A hálózati kérés életútját, erőforrásait, válaszait és teljesítményét is szemlélteti. |
| „A localStorage-ban tárolt érték megbízható üzleti adat.” | A kliensoldali adat a felhasználó által megtekinthető és módosítható; kritikus döntést a szerver ellenőrizzen. |
| „Minden cookie követésre szolgál.” | Cookie használható munkamenethez vagy működési beállításhoz is; a cél és a szabályozás külön vizsgálandó. |

## Ellenőrző kérdések

1. Mi a különbség az eredeti HTML-forrás és az Elements panelben látható DOM között?
2. Melyik nézetben keresné meg, hogy egy oldal milyen JavaScript-fájlt töltött le?
3. Mire utalhat egy Network panelben látható `304` státuszkód?
4. Milyen szerepe lehet a `Content-Type` fejlécnek egy CSS-fájl vagy kép esetén?
5. Miben különbözik a cookie, a `localStorage` és a `sessionStorage` tipikus használata?
6. Miért nem szabad kizárólag böngészőben tárolt érték alapján jogosultságot adni?

## Fogalomtár

- **Fejlesztői eszközök / DevTools:** a böngésző beépített eszközei weboldalak szerkezetének, hálózatának és működésének vizsgálatához.
- **DOM:** a böngészőben élő, faalakú dokumentummodell, amelyen a programkód műveleteket végezhet.
- **Elements / Inspector:** a DOM és a rá érvényes stílusok megtekintésére szolgáló panel.
- **Network:** a böngésző által indított hálózati kérések és válaszok megfigyelésére szolgáló panel.
- **Application / Storage:** a webhelyhez kapcsolódó böngészőoldali tárolók áttekintésére szolgáló panel.
- **Cookie:** webhelyhez kötött, kis méretű adat, amelyet a böngésző meghatározott feltételekkel küldhet a szervernek.
- **localStorage:** eredethez kötött, böngészőoldali kulcs–érték tároló, amely általában a munkamenetnél tovább megmarad.
- **sessionStorage:** böngészőoldali kulcs–érték tároló, amely jellemzően egy adott fül munkamenetéhez kötődik.
- **Erőforrás:** a weboldal működéséhez vagy megjelenéséhez letöltött állomány, például HTML, CSS, JavaScript, kép vagy betűtípus.
