# Webes erőforrások betöltése

Egy URL megnyitásakor a böngésző nem „egy weboldalt” tölt le, hanem egy kiinduló HTML-dokumentumból további erőforrások hálózatát fedezi fel és kéri le. Az, hogy melyik erőforrás mikor szükséges, mennyire nagy, honnan érkezik és blokkolja-e a megjelenést, közvetlenül befolyásolja, mikor válik használhatóvá az oldal.

### A HTML mint erőforrástérkép

Amikor a böngésző megkapja egy oldal HTML-válaszát, először a dokumentumot kezdi feldolgozni. Közben építi a DOM-ot, vagyis a tartalom objektummodelljét, és a talált hivatkozások alapján további fájlokat kér. Egy `<link rel="stylesheet" href="/style.css">` stíluslapot jelez; egy `<script src="/app.js">` JavaScriptet; egy `<img src="/kep.webp">` képet. Egy betűtípus gyakran a CSS-ben szereplő `@font-face` szabályból derül ki, egy videó pedig a `video` elem forrásaiból.

Ezért a HTML nem csak tartalom, hanem egyfajta erőforrástérkép is. A böngésző nem tudja már a kapcsolat elején, hogy az oldal hány képet, milyen fontot vagy melyik külső analitikai szolgáltatást használ. Ezeket a dokumentum elemzése közben fedezi fel. A későn felfedezett erőforrások később kezdődnek el letöltődni, ami késleltetheti a megjelenést vagy az interaktivitást.

Egy modern oldal tipikusan HTML-ből, CSS-ből, JavaScriptből, képekből, ikonokból, webfontokból, videókból, adatokat visszaadó API-kérésekből és harmadik féltől érkező szkriptekből áll. Egy 200 kB-os HTML-dokumentum tehát nem jelenti azt, hogy az oldal összesen 200 kB. A hálózati panelen sokszor több tucat vagy akár több száz kérés is látszik. Ezek közt a méret, a prioritás és a függőségek legalább annyira számítanak, mint a darabszám.

### CSS: a látható oldal előfeltétele

A külső CSS-fájlokat általában a dokumentum `head` részében hivatkozzuk. Ennek oka, hogy a böngészőnek a megjelenítés előtt tudnia kell, hogyan nézzenek ki az elemek. Ha a stíluslap csak későn érkezik meg, a felhasználó előbb egy rendezetlen, alapformázott oldalt láthat, majd az elrendezés hirtelen átrendeződik. Ez villódzást és bizonytalanságot okozhat.

A böngésző a CSS szabályaiból építi fel a CSSOM-ot, majd a DOM-mal együtt határozza meg, mely elemek láthatók és milyen stílusban. Ebből jön létre a renderelési fa, amely alapján elindulhat az elrendezés és a rajzolás. Ezért a képernyő első, azonnal látható részéhez szükséges stílusok különösen fontosak. A túl nagy, feleslegesen sok vagy láncban betöltött CSS késleltetheti az első értelmes megjelenést.

Nem következik ebből, hogy minden CSS-t a HTML-be kell írni. A külső stíluslap újrahasznosítható, jól gyorsítótárazható és könnyebben karbantartható. A cél az, hogy a szükséges stílusok időben rendelkezésre álljanak, ne pedig az, hogy minden fájl egyetlen dokumentumba kerüljön.

### JavaScript: lehet blokk, lehet későbbi munka

A JavaScript futása módosíthatja a DOM-ot és a stílusokat, ezért egy hagyományos `<script src="/app.js"></script>` elem megállíthatja a HTML további feldolgozását: a böngésző letölti és lefuttatja a szkriptet, csak utána folytatja a dokumentum beolvasását. Ez régebben biztonságos alapértelmezés volt, de nagy szkriptnél jelentős késést okozhat.

A `defer` attribútum azt jelzi, hogy a külső szkript letölthető a HTML feldolgozásával párhuzamosan, de csak a dokumentum elemzése után fusson le. A dokumentumban szereplő több `defer` szkript sorrendje megmarad. Ez sok saját alkalmazáskódhoz jó választás, mert a DOM ekkor már felépült, a betöltés pedig kevésbé akad meg.

Az `async` szkript szintén párhuzamosan töltődik, viszont azonnal lefut, amikor megérkezik; ezért a több ilyen szkript sorrendje nem kiszámítható. Gyakran használják egymástól független mérőkódokhoz vagy hirdetési címkékhez. A gyorsabb betöltés nem automatikusan jobb: ha az `async` kód olyan elemre vagy másik szkriptre támaszkodik, amely még nincs készen, versenyhelyzetet teremthet.

A JavaScript nem csak letöltési, hanem végrehajtási költség is. A felhasználó eszközének a kódot elemeznie, lefordítania és futtatnia kell. Egy nagy csomag gyors hálózaton is rontja a használhatóságot gyengébb telefonon. Ezért fontos kérdés, valóban szükség van-e minden interaktívnak szánt elemhez saját könyvtárra vagy külső csomagra.

### Képek, betűk és média

A képek gyakran az oldal legtöbb adatát adják. Egy fénykép akkor is több megabájt lehet, ha a képernyőn csak bélyegképként jelenik meg. A megfelelő méretű képváltozat, korszerű formátumok, például WebP vagy AVIF, valamint a jól megválasztott tömörítés ezért nagyobb nyereséget hozhat, mint sok apró kódoptimalizálás. A `srcset` és `sizes` attribútumokkal a böngésző a kijelzőméretnek és felbontásnak megfelelő fájlt választhatja ki.

Kép esetén a szélesség és magasság megadása nem csupán formai részlet. Segít a böngészőnek helyet foglalni a kép számára, mielőtt az megérkezne. Enélkül az oldal elemei betöltés közben elugorhatnak, például egy olvasás alatt álló bekezdés hirtelen lejjebb kerül. Ez a vizuális stabilitás a használhatóság része.

A `loading="lazy"` attribútum arra kéri a böngészőt, hogy a képet csak akkor töltse le, amikor várhatóan közel kerül a látható területhez. Egy hosszú terméklistán vagy galérián ez sok kezdeti adatforgalmat takarít meg. Nem jó jelölt rá a fejlécben lévő, azonnal látható fő kép: azt később kezdené tölteni, épp amikor gyors megjelenítésre van szükség. A lustán betöltés tehát prioritási döntés, nem univerzális kapcsoló.

A webfontok befolyásolják az arculatot és az olvashatóságot, de további hálózati kérések. Amíg a kívánt betűtípus nem érkezik meg, a böngésző ideiglenes betűképet mutathat, vagy bizonyos beállításoknál rövid időre elrejtheti a szöveget. A korlátozott betűkészlet, a jól választott rendszerbetűtípus-tartalék és a `font-display` megfelelő használata csökkenti a zavaró váltást. Egy ritkán használt díszfont nem ér annyit, hogy miatta a lényegi szöveg későn legyen olvasható.

Hang- és videófájlok esetén még inkább fontos a fokozatosság. Egy automatikusan induló, nagy videó nemcsak adatforgalmat fogyaszt, hanem figyelmet is elvonhat és akadálymentességi problémát okozhat. A `poster` előnézeti kép, a felhasználó által indított lejátszás, feliratok és többféle forrásformátum sok esetben jobb döntés, mint a teljes média azonnali letöltése.

### Kritikus renderelési út és felhasználói időérzet

A kritikus renderelési út azoknak a lépéseknek és erőforrásoknak a lánca, amelyek szükségesek ahhoz, hogy a felhasználó először értelmesen lássa az oldalt. Ide tartozik a HTML megérkezése és elemzése, a fontos CSS letöltése és feldolgozása, a DOM és CSSOM összekapcsolása, valamint az első elrendezés és rajzolás. Ha ezen az úton egy lassú szerver, túl nagy stíluslap vagy blokkoló szkript áll, az oldal üresnek vagy késlekedőnek tűnhet, akkor is, ha a háttérben egyébként sok adat mozog.

Az észlelt gyorsaság ezért nem azonos pusztán a teljes betöltési idővel. A felhasználó számára fontos, hogy hamar megjelenjen valami értelmes, az oldal ne ugráljon, és a gombok viszonylag gyorsan reagáljanak. Egy jól megtervezett oldal a fő tartalmat és az első művelethez szükséges kódot részesíti előnyben; az alsóbb képeket, ritka funkciókat és másodlagos widgeteket későbbre hagyja.

### Cache: amikor nem kell ugyanazt újra letölteni

A gyorsítótár, vagy cache a korábban letöltött erőforrások ideiglenes megőrzése. Ha a felhasználó újra felkeresi az oldalt, a böngésző bizonyos fájlokat helyben felhasználhat, vagy csak ellenőrizheti, változtak-e. Ez különösen előnyös közös CSS, JavaScript, logó vagy betűkészlet esetén.

A cache helyes kezelése egyensúly. Ha egy fájlt túl rövid ideig tárolhat a böngésző, feleslegesen ismétlődnek a letöltések. Ha túl sokáig, előfordulhat, hogy a felhasználó régi kódot kap. Erre gyakori megoldás a verziózott vagy tartalom alapján képzett fájlnév, például `app.4f72c1.js`: új tartalomhoz új név tartozik, a régi változat pedig hosszabb ideig is biztonságosan cache-elhető. A HTTP-szintű szabályokról a `Cache-Control` fejléc ad útmutatást a böngészőnek és a köztes cache-eknek.

### Harmadik fél erőforrásai: kényelmesek, de nem ingyenesek

Sok oldal külső forrásból tölt be térképet, videólejátszót, betűtípust, látogatottságmérőt, chatablakot, hirdetési rendszert vagy közösségi média beágyazást. Ezek gyors fejlesztést ígérnek, de új DNS-feloldást, hálózati kapcsolatot, JavaScriptet, adatvédelmi kérdést és hibapontot hoznak magukkal. Ha egy külső szolgáltató lassú vagy kiesik, a saját oldalunk is sérülhet.

Egy egyetemi kurzusoldalon például egy beágyazott videó vagy külső naptár hasznos lehet. Érdemes azonban megkérdezni: nélkülözhetetlen-e az első képernyőn? Be lehet-e tölteni csak a felhasználó kérésére? Milyen adatot kap a harmadik fél már az oldal megnyitásakor? A teljesítmény és a GDPR szempontjai itt találkoznak: egy mérőkód nem csupán néhány plusz kilobájt, hanem adott esetben személyesadat-kezelési döntés is.

## Végigvezetett példa: egy kurzusoldal betöltési prioritásai

Legyen egy kurzusoldalunk főcímmel, rövid leírással, egy jelentkezési gombbal, oktatói fényképpel, alsó galériával és beágyazott térképpel. A HTML először hivatkozza a közös stíluslapot, mert enélkül a fő tartalom rendezetlen lenne. A saját JavaScript `defer` attribútumot kap, mert a jelentkezési gomb viselkedéséhez kell, de nem szükséges, hogy a HTML olvasását megállítsa.

Az oktatói fénykép, ha az első képernyőn látható, normálisan töltődik be, megadott `width` és `height` értékkel. A galéria képei viszont `loading="lazy"` attribútumot kapnak, mert a felhasználó csak görgetés után találkozik velük. A térkép nem töltődik be automatikusan: kezdetben egy cím és egy „Térkép megjelenítése” gomb látható. Így a látogató tudatosan indítja el a külső szolgáltatást, és az oldal első megjelenését nem terheli a térképszolgáltató szkriptje.

```html
<link rel="stylesheet" href="/assets/site.css">
<script src="/assets/course.js" defer></script>

<main>
  <h1>Webprogramozás I.</h1>
  <p>Elméleti alapok a modern web működéséről.</p>
  <a class="button" href="/jelentkezes">Jelentkezés</a>

  <img src="/images/oktato-640.webp" width="640" height="426"
       alt="Az oktató egy előadóteremben" />

  <section aria-labelledby="galeria-cim">
    <h2 id="galeria-cim">Korábbi alkalmak</h2>
    <img src="/images/alkalom-1-480.webp" width="480" height="320"
         loading="lazy" alt="Hallgatók csoportmunkában" />
  </section>
</main>
```

Ebben a példában nem minden erőforrás egyforma. A cím, a leírás, a fő stílus és a jelentkezési lehetőség elsődleges. A galéria hasznos, de másodlagos. A gondos prioritás nem azt jelenti, hogy a szép vagy kényelmi elemek tilosak; azt jelenti, hogy a webhely előbb teljesíti az alapvető feladatát, és utána gazdagodik.

## Gyakori félreértések

| Állítás | Pontosítás |
| --- | --- |
| „Egy oldal mérete csak a HTML mérete.” | A CSS, JavaScript, képek, fontok, média és API-válaszok együtt adják a valós terhelést. |
| „Minden szkriptet `async`-cal kell betölteni.” | Az `async` futási sorrendje nem garantált; sok saját kódhoz a `defer` megfelelőbb. |
| „A lazy loading minden képet gyorsít.” | A legfontosabb, első képernyőn látható képet késleltetheti. |
| „A cache miatt a felhasználó mindig régi oldalt lát.” | Jó cache-szabályokkal és verziózott fájlnevekkel a gyorsaság és a frissesség együtt kezelhető. |
| „A harmadik fél beágyazása csak egy rövid kódrészlet.” | További kéréseket, végrehajtási költséget, adatvédelmi hatást és külső függőséget jelent. |
| „A gyors oldalhoz minden képet el kell hagyni.” | A cél a tudatos méret, formátum és prioritás, nem a tartalom kiüresítése. |

## Ellenőrző kérdések

1. Miért mondható, hogy a HTML a további erőforrások felfedezésének kiindulópontja?
2. Mi a lényeges különbség a hagyományos, a `defer` és az `async` szkriptek között?
3. Miért számít a kép `width` és `height` attribútuma akkor is, ha a CSS később méretezi a képet?
4. Melyik képre használna `loading="lazy"` attribútumot egy hosszú híroldalon, és melyikre nem?
5. Milyen teljesítmény- és adatvédelmi kockázatot jelenthet egy külső analitikai vagy térképszolgáltatás?

## Fogalomtár

- **Erőforrás:** a weboldal összeállításához kért fájl vagy hálózati válasz, például CSS, kép vagy API-adat.
- **DOM:** a HTML-ből felépülő dokumentumobjektum-modell.
- **CSSOM:** a CSS-szabályokból felépülő stílusmodell.
- **Kritikus renderelési út:** a látható első tartalom megjelenéséhez szükséges feldolgozási és betöltési lépések sora.
- **Blokkoló szkript:** olyan JavaScript, amelynek letöltése vagy futása megállítja a HTML további feldolgozását.
- **`defer`:** külső szkript betöltési módja, amely párhuzamos letöltést és a dokumentum elemzése utáni, sorrendtartó futást kér.
- **`async`:** külső szkript betöltési módja, amely a megérkezéskor azonnal, sorrendgarancia nélkül futtatja a kódot.
- **Lazy loading:** nem azonnal szükséges erőforrások késleltetett betöltése.
- **Cache:** korábban letöltött erőforrások ideiglenes tárolása a gyorsabb ismételt használathoz.
- **Harmadik fél erőforrása:** a webhely tulajdonosától eltérő szolgáltató domainjéről érkező fájl vagy szolgáltatás.
