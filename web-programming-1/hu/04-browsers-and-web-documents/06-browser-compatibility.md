# Böngészők közötti kompatibilitás

A web nem egyetlen program futtatási környezete. Egy weboldal különböző böngészőkben, operációs rendszereken, kijelzőméreteken, hálózati körülmények között és segítő technológiákkal találkozik. A kompatibilis webhely nem mindenhol pixelenként azonos, hanem a lényeges tartalma, funkciója és használhatósága a támogatott környezetekben megbízhatóan elérhető.

### Mit nevezünk kompatibilitásnak?

Egy egyetemi tantárgyfelvételi oldal akkor kompatibilis, ha a hallgató a támogatott böngészőjében meg tudja keresni a tárgyat, el tudja olvasni a követelményeket, ki tudja tölteni az űrlapot, és érthető visszajelzést kap. Nem feltétlenül akkor kompatibilis, ha a gomb árnyéka, egy betű rajzolása vagy egy animáció pontosan ugyanannyi képpontból áll minden eszközön.

A kompatibilitásnak több rétege van. A **tartalmi kompatibilitás** azt jelenti, hogy az információ elérhető és érthető. A **funkcionális kompatibilitás** szerint a fontos műveletek elvégezhetők. A **vizuális kompatibilitás** azt vizsgálja, hogy az elrendezés nem esik-e szét, a szöveg olvasható-e, a vezérlők használhatók-e. Az **akadálymentességi kompatibilitás** pedig arra is figyel, hogy a felület képernyőolvasóval, billentyűzettel vagy nagyított nézetben is használható maradjon.

Az utolsó két szempontból látható, miért félrevezető a „mindenhol ugyanúgy” cél. Egy telefon kijelzője keskeny, egy nagy monitor széles; egy felhasználó nagyítást használhat, más pedig sötét rendszertémát. A jó felület alkalmazkodik ezekhez. A cél az azonos eredmény és a kiszámítható élmény, nem a merev képi azonosság.

### Miért léteznek különbségek a böngészők között?

A böngésző sokkal több, mint egy dokumentummegjelenítő program. Értelmezi a HTML-t, alkalmazza a CSS-szabályokat, futtatja a JavaScriptet, kezeli a hálózati kapcsolatokat, tárol adatot és biztonsági korlátokat érvényesít. E feladatok egy részét a böngésző **rendering engine-je**, vagyis megjelenítőmotorja végzi. A motor a HTML-ből és CSS-ből létrehozza a kirajzolható felületet: megállapítja az elemek méretét és helyét, betölti a betűkészleteket, majd kirajzolja a képpontokat.

A legismertebb motorok a Chromium-alapú böngészőkben használt **Blink** (például Chrome, Edge, Opera és sok más böngésző), a Firefox **Gecko** motorja és az Apple Safari **WebKit** motorja. Az iPhone-on és iPaden a böngészők mögött rendszerint a WebKit működik akkor is, ha az alkalmazás neve más. Ezért nem helyes azt gondolni, hogy „Chrome-ban már jó, tehát mindenhol jó”: a Chrome és az Edge sok közös viselkedést mutathat, de ettől még a Firefox és Safari külön ellenőrzést igényel.

A különbségek oka lehet, hogy egy szabvány új funkciója még nem mindenhol készült el; valamelyik böngészőben hibás a megvalósítás; eltér a rendszer betűkészlete; vagy egy biztonsági és adatvédelmi döntés korlátozza a működést. A harmadik féltől származó cookie-k kezelése, az automatikus videólejátszás vagy a vágólaphoz való hozzáférés például nemcsak technikai kérdés, hanem adatvédelmi és felhasználóvédelmi döntésekhez is kötődik.

### A webszabványok mint közös nyelv

A kompatibilitás alapja, hogy a webes technológiákat nyílt szabványok írják le. A HTML, CSS, JavaScript, HTTP vagy a hozzáférhetőségi ajánlások nem egyetlen böngészőgyártó magántulajdonú formátumai. A szabványosítási folyamatokban több szereplő vesz részt: a WHATWG elsősorban a HTML élő szabványát gondozza, a W3C több webes ajánlás és hozzáférhetőségi irányelv fontos fóruma, az IETF pedig többek között az internetes protokollok, így a HTTP szabványosításában ismert.

A szabvány nem varázsige. Nem garantálja, hogy egy új képesség másnap minden böngészőben azonosan elérhető. Azt biztosítja, hogy a gyártók ugyanazt a viselkedést célozzák, a fejlesztők pedig dokumentált alapra építhetnek. Ha valaki szabványos HTML-elemeket, érvényes CSS-t és dokumentált webes API-kat használ, sokkal jobb eséllyel kap hosszú távon hordozható felületet, mint ha egyetlen böngésző saját, nem szabványos megoldására támaszkodik.

Jó példa erre egy űrlap. A szabványos `button`, `label` és `input` elemek a böngésző alapvető működéséből sok hasznos tulajdonságot örökölnek: fókuszálhatók, billentyűzettel kezelhetők, egyes helyzetekben képernyőolvasó számára is érthető szerepük van. Egy kizárólag `div` elemekből összerakott „gomb” esetén ezt a viselkedést külön kellene utánozni, gyakran hibásan.

### A feature detection: képességet vizsgáljunk, ne böngészőnevet

A webfejlesztés egyik régi hibája a böngészőfelismerés, vagyis annak megkísérlése, hogy a program egy szöveges azonosító alapján eldöntse: „ez Chrome”, „ez Safari”, ezért ilyen vagy olyan kódot futtat. Ez a módszer törékeny. A böngészők sokszor kompatibilitási okból más termékek nevét is tartalmazzák az azonosítójukban; a böngésző verziója változhat; és a név önmagában nem mondja meg, hogy egy adott funkció valóban működik-e.

A jobb kérdés nem az, hogy „milyen böngésző ez?”, hanem hogy „elérhető-e itt az a képesség, amelyre szükségem van?”. Ezt nevezzük **feature detectionnek**, képességvizsgálatnak. Például egy alkalmazás a `localStorage` használata előtt ellenőrizheti, hogy a tároló valóban hozzáférhető-e. Egy modern CSS-tulajdonság esetén a CSS `@supports` szabályával készíthetünk feltételes stílust.

```css
.kartyak { display: block; }

@supports (display: grid) {
  .kartyak {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 1rem;
  }
}
```

Ebben a példában az alapállapot egyszerű, egymás alá rendezett kártyákat ad. A rácsos elrendezést csak akkor használjuk, ha a böngésző ismeri. A lényeges tartalom mindkét esetben elérhető; a modernebb böngésző csak kényelmesebb elrendezést kap.

### Progressive enhancement: stabil alaptól a többletig

A **progressive enhancement**, magyarul fokozatos fejlesztés azt az elvet követi, hogy először a legszélesebben használható alapélményt készítjük el, majd erre építjük a fejlettebb megjelenést és interakciót. Ez nem azt jelenti, hogy minden oldalt régi böngészőkhöz kell tervezni. Azt jelenti, hogy a nélkülözhetetlen funkcióknak nem szabad feleslegesen egy törékeny technológiai rétegre épülniük.

Egy konzultációfoglaló oldalon például a HTML-form és a szerveroldali elküldés adhatja az alapot. A CSS javítja az áttekinthetőséget. A JavaScript kényelmi funkcióként azonnal jelezheti, ha egy dátum már foglalt, vagy naptárnézetet kínálhat. Ha a JavaScript betöltése hibázik, a felhasználó továbbra is elküldheti az űrlapot; a szerver ellenőrzi a választást és visszajelez. Ezzel szemben ha az űrlap csak JavaScriptből jön létre, egy hiba vagy szigorú vállalati környezet teljesen elvághatja a szolgáltatást.

A fokozatos fejlesztés összekapcsolja a kompatibilitást a teljesítménnyel és akadálymentességgel is. Lassú hálózaton előbb megjelenhet az értelmes HTML-tartalom, a JavaScript pedig később tölthető be. A szemantikus alapot a segítő technológiák is jobban értik.

### Polyfill: hiányzó képesség pótlása, tudatosan

A **polyfill** olyan kód vagy könyvtár, amely egy újabb szabványos böngészőképességet próbál régebbi környezetben megvalósítani. Ha egy alkalmazás egy beépített JavaScript-metódusra támaszkodik, amely egy támogatott régebbi böngészőből hiányzik, egy polyfill létrehozhatja vagy közelítheti ezt a viselkedést.

Például egy kis alkalmazás csak akkor tölthet be pótlást, ha a keresett funkció nem létezik:

```js
if (!('IntersectionObserver' in window)) {
  // Itt szükség esetén betölthető egy alternatív megoldás vagy polyfill.
}
```

A polyfill nem univerzális gyógyszer. Egyes képességek — különösen a böngésző mély biztonsági, grafikai vagy hálózati szolgáltatásai — nem másolhatók teljesen JavaScriptből. Emellett a pótlás növeli a letöltendő kód méretét, a karbantartási költséget és néha a hibák esélyét. Előbb azt kell eldönteni, valóban szükséges-e az új képesség, és milyen alapélmény adható nélküle. A polyfill akkor jó választás, ha egy ésszerűen körülhatárolt támogatási célhoz kis többletköltséggel biztosít lényeges funkciót.

### Tesztelés: célzottan, nem végtelen kombinációban

Elméletben végtelen sok kombináció létezik: böngészőverziók, operációs rendszerek, kijelzők, nyelvek, hálózati állapotok és segítő technológiák. Senki nem tesztelhet mindent. A szakmai feladat ezért egy **támogatási politika** megfogalmazása. Például egy egyetemi rendszer kimondhatja, hogy a jelenlegi és előző főverziók asztali Chrome, Firefox, Edge és Safari böngészőiben, valamint a gyakori mobilrendszereken ellenőrzik a fő feladatokat.

A tesztelésnél nem csak a nyitóoldalt kell megnézni. Érdemes végigvenni a kritikus felhasználói utakat: bejelentkezés, keresés, űrlapkitöltés, hibajelzés, fizetés vagy kijelentkezés. Ellenőrizni kell a keskeny nézetet, a billentyűzetes navigációt, a hibás vagy lassú hálózatot, és azt is, mi történik letiltott vagy hibás JavaScript mellett. Automatizált tesztek és böngésző-emuláció segíthetnek, de nem helyettesítik teljesen a valódi böngészőn és valódi eszközön végzett ellenőrzést.

Egy gyakori gyakorlati módszer a hibák fokozatos szűkítése. Először megállapítjuk, hogy csak egy motorban jelentkezik-e a probléma. Ezután egy kisebb önálló példára redukáljuk a jelenséget. Így kiderülhet, hogy saját CSS-szabály, hiányzó szabványtámogatás vagy tényleges böngészőhiba áll-e a háttérben. A rövid, reprodukálható példa a fejlesztői kommunikáció egyik legerősebb eszköze.

## Végigvezetett példa: kártyás híroldal

Képzeljünk el egy híroldalt, amely három hasábban mutatja a cikkeket nagy képernyőn. A tartalom HTML-ben cikkekként, egymás után jelenik meg. Ez az alap már lineárisan olvasható telefonon és képernyőolvasóval is. A CSS modern rácselrendezéssel három hasábra rendezheti őket, ha elérhető a Grid. Kisebb képernyőn egyetlen hasábra vált.

Az oldal JavaScriptje automatikusan további cikkeket tölthet, amikor a felhasználó a lista végéhez ér. Ha ehhez modern megfigyelő API-t használ, feature detectionnel ellenőrizheti a támogatást. Ha a funkció hiányzik vagy a hálózat hibázik, egy jól látható „További cikkek” hivatkozás vagy gomb továbbra is megadja az utat. A lényeges olvasási feladat nem függ egyetlen modern kényelmi funkciótól.

## Gyakori tévhitek

| Állítás | Pontosítás |
| --- | --- |
| „Minden böngésző ugyanazt a motort használja.” | Több fontos motor létezik; az azonos márkanév vagy Chromium-alap sem jelent teljes azonosságot minden szinten. |
| „Kompatibilis csak akkor lehet, ha minden pixel azonos.” | A funkció, olvashatóság és használhatóság fontosabb, mint a merev képi egyezés. |
| „Elég felismerni a böngésző nevét.” | Inkább a szükséges képesség jelenlétét kell vizsgálni. |
| „A polyfill minden régi böngészős problémát megold.” | Nem minden képesség pótolható teljesen, és a pótlásnak teljesítmény- és karbantartási ára van. |
| „A fejlesztő gépén működik, tehát kész.” | A támogatott környezetekben és kritikus felhasználói utakon is tesztelni kell. |

## Ellenőrző kérdések

1. Miben különbözik a funkcionális és a vizuális kompatibilitás?
2. Miért bizonytalan a böngészőnév alapján végzett kódválasztás?
3. Hogyan működik a fenti `@supports` példában a fokozatos fejlesztés?
4. Mikor lehet indokolt polyfill használata, és milyen költségekkel járhat?
5. Milyen három kritikus felhasználói utat tesztelne egy egyetemi ügyintézési oldalon?

## Fogalomtár

- **Böngészőkompatibilitás:** annak biztosítása, hogy egy webhely a kijelölt környezetekben használhatóan és megbízhatóan működjön.
- **Rendering engine / megjelenítőmotor:** a böngésző része, amely értelmezi és kirajzolja a webes dokumentumot.
- **Blink:** a Chromium-alapú böngészőkben használt megjelenítőmotor.
- **Gecko:** a Firefox megjelenítőmotorja.
- **WebKit:** a Safari és számos iOS-es böngésző mögötti megjelenítőmotor.
- **Webszabvány:** nyíltan dokumentált, közösen kialakított technikai megállapodás a web működéséről.
- **Feature detection:** annak vizsgálata, hogy a szükséges képesség elérhető-e az aktuális környezetben.
- **Progressive enhancement:** olyan fejlesztési elv, amely stabil alapfunkcióra építi a fejlettebb megjelenést és interakciót.
- **Polyfill:** hiányzó, többnyire újabb böngészőképességet pótló programkód.
- **Támogatási politika:** dokumentált döntés arról, mely böngészőket és környezeteket kell a rendszernek kiszolgálnia.
