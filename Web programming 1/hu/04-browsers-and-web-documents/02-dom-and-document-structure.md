# DOM és dokumentumszerkezet

A HTML-forrás egy szöveges kiindulópont. A DOM a böngésző által ebből felépített, memóriában élő fa, amelyet a böngésző, a segítő technológiák és a JavaScript is használ. Nem ugyanaz a kettő: a böngésző javíthat hibás jelölést, JavaScript pedig a betöltés után is megváltoztathatja a DOM-ot. Ha a dokumentum szerkezete és jelentése jó, a felület nemcsak könnyebben fejleszthető, hanem több ember számára használható is.

### A weboldal mint dokumentum, nem mint kép

Egy weboldal első pillantásra képként vagy felületként hat: címet, menüt, bekezdéseket, gombokat és képeket látunk. A böngésző azonban nem egy előre elkészített képet kap. Jellemzően egy HTML-szöveget tölt le, majd megpróbálja megérteni, hogy melyik rész milyen elem, mi minek a része, és mi a tartalom jelentése. Ebből az értelmezésből születik a DOM, a Document Object Model.

A „modell” szó itt fontos. A DOM nem fájlformátum és nem egy második HTML-fájl, hanem egy programok számára kezelhető belső modell. A böngésző objektumokként tartja nyilván például a dokumentumot, annak `html`, `head` és `body` elemét, egy címet, egy hivatkozást vagy egy űrlapmezőt. Az objektumok tulajdonságokkal és kapcsolatokkaI rendelkeznek. Egy címsornak lehet szövegtartalma, `id` attribútuma és CSS-osztálya; egy listának pedig több listaelem-gyermeke.

Ez teszi lehetővé, hogy egy böngésző ne csak megjelenítsen, hanem kezelje is a dokumentumot. Ugyanebből a modellből dolgozik a CSS, amikor elemeket választ ki formázáshoz, a JavaScript, amikor egy gomb kattintására megváltoztat egy bekezdést, és a képernyőolvasó, amikor a dokumentum szerkezetét közvetíti a felhasználó felé.

### A fa metaforája

A DOM-ot legkönnyebben családfaként vagy könyvtárstruktúraként lehet elképzelni. A fa gyökere maga a dokumentum. Ebből nő ki a `html` elem, annak gyermekei a `head` és a `body`, a `body` alatt pedig további elemek vannak. Egy `main` elemben lehet `article`, az `article` alatt lehet `h1`, több `p` és egy `ul`; a lista alatt pedig `li` elemek.

Például ez a HTML:

```html
<main>
  <article>
    <h1>Vizsgaidőszaki tudnivalók</h1>
    <p>A jelentkezés hétfőn nyílik meg.</p>
    <a href="/vizsgak">Vizsgaidőpontok</a>
  </article>
</main>
```

nem három egymás utáni sor a böngésző számára, hanem egy rész-egész viszonyokat tartalmazó fa. A `main` a gyökérhez közelebbi szülő, az `article` a gyermeke; az `h1`, a `p` és az `a` egymás testvérei, mert azonos a szülőjük. A szöveg maga is a fa része: a „Vizsgaidőszaki tudnivalók” nem önálló HTML-elem, hanem az `h1` elem szöveges gyermeke.

Ezek a kapcsolatok többek egyszerű elméleti címkénél. A CSS-ben a `article p` szabály például az `article` alatt lévő bekezdéseket célozhatja. JavaScriptben egy fejlesztő megkereshet egy konkrét elemet, majd hozzáadhat egy új gyermeket. A böngésző fejlesztői eszközeinek Elements vagy Inspector nézete éppen ezt a fát mutatja be, általában lenyitható hierarchiaként.

### HTML-forrás és élő DOM: miért nem mindig egyeznek?

Az oldal forrása azt mutatja, amit a szerver küldött. A fejlesztői eszköz DOM-nézete azt, amivel a böngésző aktuálisan dolgozik. A kettő gyakran hasonló, de korántsem biztos, hogy teljesen megegyezik.

Ennek első oka, hogy a böngészők hibatűrők. A web történetében rengeteg hibás vagy hiányos HTML került ki az internetre, ezért a böngésző nem egyszerűen feladja, ha például egy bekezdés lezáró tagje hiányzik vagy egy elem nem megengedett helyre kerül. Értelmezési szabályok alapján igyekszik használható fát építeni. Egy hiányzó `tbody` elemet táblázatban például a böngésző létrehozhat a DOM-ban, noha az eredeti forrásban nem szerepelt. Ugyanez a jóindulat azonban nem garancia arra, hogy az oldal minden böngészőben és segítő technológiával ugyanúgy érthető lesz.

A második ok a JavaScript. A szerver küldhet egy üres konténert és egy programot, amely később tölti be a híreket, a felhasználó nevét vagy a kosár tartalmát. Ebben az esetben a forrásban még csak ez látszik:

```html
<section id="hirek">
  <p>Hírek betöltése…</p>
</section>
```

Néhány pillanattal később a JavaScript kicserélheti ezt három hírcikkre. A DOM tehát időben is változhat. Ezért fordulhat elő, hogy a „forrás megtekintése” funkcióban nem találjuk a képernyőn látható szöveget, a fejlesztői eszközben viszont igen.

Fontos következtetés: ha egy fontos információ kizárólag JavaScript után jelenik meg, gondolni kell arra is, mi történik lassú hálózatnál, szkripthiba esetén, vagy olyan eszközön, ahol a szkript nem fut megfelelően. Nem minden tartalomnak kell feltétlenül az eredeti HTML-ben lennie, de a döntésnek tudatosnak kell lennie.

### Dinamikus változások és események

A DOM élő modell. JavaScript nemcsak olvashatja, hanem módosíthatja is: új elemet vehet fel, meglévőt törölhet, szöveget átírhat, attribútumot vagy CSS-osztályt változtathat. Egy „További találatok” gomb például új listaelemeket adhat a találati listához. Egy űrlap hibás mezője kaphat hibaüzenetet és olyan osztályt, amely látható keretet eredményez.

Egy leegyszerűsített példa:

```html
<p id="allapot">Nincs még kiválasztott időpont.</p>
<button id="foglalas">Időpont kiválasztása</button>
```

```js
document.querySelector('#foglalas').addEventListener('click', () => {
  document.querySelector('#allapot').textContent =
    'Az időpont kiválasztva.';
});
```

Ebben a példában a kattintás egy esemény. A program megkeresi az azonosító alapján a gombot, figyelni kezdi a kattintást, majd a bekezdés szövegét módosítja. A böngésző ezután frissíti a megjelenítést. A felhasználó szempontjából csak annyi történik, hogy megváltozik a felirat; a háttérben a DOM-ban megváltozott egy szöveges csomópont.

A dinamikusság önmagában nem erény. Akkor jó, ha a felhasználó számára gyorsabbá, érthetőbbé vagy kényelmesebbé teszi a felületet. Ha egy egyszerű hivatkozás helyett bonyolult JavaScript-kezelés akadályozza a normál navigációt, a felület törékenyebb lesz. A DOM-módosításoknál ezért mindig azt érdemes kérdezni: mi változott meg a felhasználó számára, és ez a változás mindenki számára érzékelhető-e?

### Szemantika és akadálymentesség

A DOM fa nemcsak a vizuális elrendezés alapja. A képernyőolvasó nem „nézi” meg a pixeleket úgy, ahogyan egy látó ember; a dokumentum szerkezetéből és szemantikájából épít fel egy hozzáférhető reprezentációt. Ennek alapvető forrása az, hogy valódi címsorokat, listákat, gombokat, űrlapcímkéket és fő tartalmi régiókat használunk-e.

Például a kattintható `div` vizuálisan úgy formázható, mint egy gomb, de magától nem viselkedik gombként billentyűzetről, és a segítő technológiák számára sem egyértelmű a célja. A valódi `button` elem ezzel szemben eleve fókuszálható, Enterrel vagy szóközzel kezelhető, és a szerepe ismert. Hasonlóképpen a `h2` nem csupán nagyobb betű: azt jelenti, hogy a dokumentum egy új, második szintű fejezete kezdődik.

JavaScriptes változáskor ezt a szempontot is meg kell őrizni. Ha egy hibajelzés csak piros keretként jelenik meg, azt egy színtévesztő vagy képernyőolvasót használó ember könnyen nem érzékeli. Szöveges, a mezőhöz kapcsolt hibaüzenet szükséges. Ha egy modális ablak nyílik, a fókuszt célszerű oda irányítani, és a bezárás után visszaadni egy értelmes pontra. Ezek nem csupán „extra funkciók”: a DOM és a felhasználói interakció felelős használatának részei.

### A fejlesztői eszköz mint megfigyelőablak

A DOM tanulásához különösen hasznos a böngésző fejlesztői eszköze. Egy elem kijelölésekor megfigyelhető a fahelyzete, attribútumai, örökölt és alkalmazott stílusai, valamint az is, hogy melyik szabály miatt olyan a mérete vagy a színe, amilyen. Egy kattintás után pedig látható, hogy változott-e a DOM.

Egy jó gyakorlati kérdés: „A menü vizuálisan el van rejtve, vagy ténylegesen nincs is a DOM-ban?” Az első esetben képernyőolvasó vagy billentyűzetes navigáció még elérheti; a másodikban nem. A különbség felhasználói és akadálymentességi következményeket hordoz.

## Végigvezetett példa: vizsgainformációs panel

Képzeljünk el egy egyetemi oldalt, ahol egy kurzus vizsgainformációi láthatók. A kiinduló HTML-ben a kurzus neve címsor, a követelmények lista, a vizsgahelyek pedig táblázat formájában jelennek meg. Ez már önmagában értelmes dokumentum: a címek alapján áttekinthető, a lista listaként olvasható, a táblázat fejlécéből megállapítható, mit jelentenek az oszlopok.

Ezután a felhasználó kiválaszt egy vizsgaidőpontot. A JavaScript nem az egész oldalt építi újra, csupán egy `p` elem szövegét frissíti: „Kiválasztott időpont: június 12., 10:00.” Ha a választás hibás, például betelt a hely, egy jól megfogalmazott üzenet jelenik meg. A siker- vagy hibaüzenet legyen a DOM logikus része, egyértelműen elhelyezve és szükség esetén segítő technológiáknak is jelezve.

Ezzel szemben rossz megoldás volna, ha a címsorok helyett színezett `div`-ek, a gombok helyett kattintható képek, a táblázat helyett egymás mellé tolt szövegek lennének. A látvány talán hasonló, de a dokumentum elveszítené a jelentését. A DOM jó szerkezete olyan, mint egy jól szerkesztett jegyzet: akkor is követhető, ha nem kapott még végleges tipográfiát.

## Gyakori félreértések

| Állítás | Pontosítás |
| --- | --- |
| „A DOM ugyanaz, mint a HTML.” | A HTML a forrás, a DOM annak böngésző által felépített és futás közben változó objektummodellje. |
| „A fejlesztői eszközben látott kód biztosan így érkezett a szervertől.” | A böngésző javíthatta, kiegészíthette vagy JavaScript módosíthatta a dokumentumot. |
| „Ha egy `div` úgy néz ki, mint egy gomb, akkor gomb.” | Vizuálisan lehet hasonló, de szemantikája és alapvető billentyűzetes viselkedése nem azonos. |
| „A JavaScriptes frissítés mindig jobb felhasználói élményt ad.” | Csak akkor, ha érthető, gyors és minden érintett felhasználó számára érzékelhető marad. |
| „A DOM-fát csak a frontendfejlesztőnek kell értenie.” | A tartalom, a tesztelhetőség, a kereshetőség és az akadálymentesség szempontjából minden webes szereplőnek releváns. |

## Ellenőrző kérdések

1. Miben különbözik a szervertől letöltött HTML-forrás és a böngésző aktuális DOM-ja?
2. Rajzolja fel faalakban egy `main` elemet, benne egy `h1` címmel és két bekezdéssel.
3. Miért számít, hogy egy interaktív vezérlő valódi `button`-e, nem csak annak kinéző elem?
4. Mondjon példát olyan DOM-változásra, amelyet felhasználói esemény vált ki.
5. Milyen helyzetben vezethet félre, ha csak az oldal forrását nézzük meg?
6. Hogyan segíti a szemantikus dokumentumszerkezet a képernyőolvasót használó embert?

## Fogalomtár

- **DOM (Document Object Model):** a HTML-dokumentum böngészőben létrehozott, programozható objektumfája.
- **Csomópont:** a DOM-fa egy eleme, például dokumentum, HTML-elem, attribútum vagy szöveg.
- **Szülő, gyermek, testvér:** a fa csomópontjai közötti hierarchikus kapcsolatok.
- **HTML-forrás:** a szerver által küldött, szöveges HTML-válasz.
- **Szemantikus HTML:** olyan jelölés, amely az elem tartalmi szerepét is kifejezi.
- **Esemény:** a felhasználó vagy a böngésző által kiváltott történés, például kattintás vagy űrlapküldés.
- **Segítő technológia:** a digitális felület használatát támogató eszköz vagy szoftver, például képernyőolvasó.
