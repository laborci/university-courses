# Böngésző-képességek: grafika, média, fájlok, helyadatok és értesítések

A modern böngésző sokféle eszközhöz és szolgáltatáshoz ad ellenőrzött hozzáférést. A weboldal rajzolhat grafikát, lejátszhat médiát, olvashat a felhasználó által kiválasztott fájlból, kérhet helyadatot vagy értesítést küldhet – de mindezt a böngésző biztonsági modellje és a felhasználó engedélye korlátozza.

Egy mai böngészőben megnyitott webalkalmazás sokszor olyan képességeket kínál, amelyeket korábban csak telepített programoktól vártunk. Szerkeszthetünk képet, videókonferenciázhatunk, térképen helyzetet kereshetünk, fájlt tölthetünk fel vagy értesítést kaphatunk. Ezeket a funkciókat nem egyetlen „webes varázslat” biztosítja, hanem különálló, szabványos böngésző-API-k.

A legfontosabb alapelv az, hogy a weboldal nem kap korlátlan hozzáférést a számítógéphez. Nem olvashatja el tetszőlegesen a merevlemez tartalmát, nem követheti automatikusan a felhasználó helyzetét, és nem küldhet korlátlanul értesítéseket. A böngésző közvetítőként működik: az oldal kérhet bizonyos képességet, de a felhasználó és a böngésző biztonsági szabályai döntenek a hozzáférésről.

### 2D canvas

A `canvas` olyan HTML-elem, amely egy programozható rajzfelületet ad a böngészőben. JavaScript segítségével vonalak, alakzatok, képek, szövegek és diagramok rajzolhatók rá. Használható adatvizualizációhoz, egyszerű játékokhoz, képszerkesztéshez vagy aláírás rögzítéséhez.

A canvas eltér a hagyományos HTML-elemekből felépülő felülettől. Egy bekezdés vagy gomb szemantikusan jelen van a dokumentumban; a canvasra rajzolt szöveg viszont sokszor csak képpontok halmaza. Ezért fontos akadálymentességi kérdés, hogy a canvasos tartalomnak legyen szöveges alternatívája, illetve a funkció ne csak egérrel legyen elérhető.

### WebGL és összetett grafika

A WebGL grafikus hardver gyorsítását használó böngésző-API. Háromdimenziós modellek, térképek, tudományos vizualizációk és összetett játékok készítésére alkalmas. A felhasználó számára egy WebGL-es térkép vagy termékmegjelenítő természetesnek tűnhet, a háttérben azonban a böngésző a grafikus processzort is igénybe veheti.

A nagy teljesítmény lehetősége nem jelenti azt, hogy minden felülethez WebGL kell. Egy egyszerű diagram vagy tartalmi oldal esetén a bonyolult grafikus megoldás lassíthatja a betöltést, több energiát fogyaszthat, és kevésbé lehet hozzáférhető. A technológia választását mindig a felhasználói célhoz kell igazítani.

### Média és kommunikáció

A HTML beépített audio- és videoelemeket ad a média lejátszására. A modern böngészők ezen túl kamerához és mikrofonhoz is tudnak hozzáférni megfelelő engedéllyel. Egy videókonferencia-alkalmazás például rögzíti a kamera képét, kódolja, hálózaton továbbítja, majd a másik oldalon lejátsza. A böngésző világosan jelzi, ha egy oldal éppen használja a kamerát vagy mikrofont.

Az automatikusan induló hang vagy videó a felhasználói élmény szempontjából problémás lehet. A böngészők ezért gyakran korlátozzák az automatikus, hangos lejátszást. Ez jó példa arra, hogy a böngésző nem pusztán végrehajtja az oldal kívánságát, hanem a felhasználó érdekeit is védi.

### Fájlkezelési API-k

Egy weboldal lehetővé teheti, hogy a felhasználó kiválasszon és feltöltsön fájlt, például beadandót, fényképet vagy táblázatot. A lényeg a felhasználó kezdeményezése: a böngésző nem engedi, hogy egy oldal csendben végigolvassa a számítógép fájljait. A kiválasztott fájl tartalma kliensoldalon is feldolgozható, például egy kép előnézete megjeleníthető feltöltés előtt.

Itt biztonsági és adatvédelmi felelősség is felmerül. A szolgáltatásnak világosan közölnie kell, milyen fájlt kér, miért kéri, meddig tárolja és ki fér hozzá. A fájlnevek, metaadatok vagy a képbe ágyazott helyadatok is lehetnek személyes vagy érzékeny információk.

### Helyadatok

A Geolocation API segítségével a weboldal kérheti a felhasználó hozzávetőleges vagy pontos helyzetét. A böngésző az eszköz képességei alapján használhat GPS-t, Wi-Fi-hálózatokat, mobilcellákat vagy IP-alapú becslést. Egy térképes útvonaltervezőnél vagy helyi eseménykeresőnél ez valódi kényelmi előny.

A helyadat különösen érzékeny személyes adat lehet. Egy jó szolgáltatás nem kér helyhozzáférést „biztos, ami biztos” alapon, hanem akkor, amikor a funkcióhoz valóban szükség van rá, és érthetően elmagyarázza a célt. A felhasználó az engedélyt később vissza is vonhatja a böngésző beállításaiban.

### Értesítések

A webes értesítések lehetővé teszik, hogy egy alkalmazás akkor is jelezzen valamit, amikor a felhasználó éppen nem nézi az adott lapot. Hasznos lehet például naptári emlékeztetőnél, üzenetnél vagy szolgáltatási állapotváltozásnál. Ugyanakkor a túl sok vagy indokolatlan értesítés gyorsan zavaróvá válik.

Ezért az engedélykérés időzítése fontos tervezési kérdés. Nem jó gyakorlat az oldal betöltésekor rögtön engedélyt kérni, mielőtt a felhasználó értené, miért lenne rá szükség. Előbb meg kell mutatni az értéket, majd a funkció használatakor kell lehetőséget adni az értesítések bekapcsolására.

## Végigvezetett példa: egy egyetemi terepgyakorlat alkalmazása

Képzeljünk el egy böngészőben futó terepgyakorlati alkalmazást. A hallgató egy térképen látja a feladat helyszínét. A helyadat engedélyezése után az alkalmazás meg tudja mutatni, milyen messze van a kijelölt ponttól. A hallgató fényképet választ ki a készülékéről, az oldal előnézetet készít, majd feltölti azt. A rendszer értesítést küldhet, ha az oktató visszajelzést adott.

Ebben a példában minden képességnek világos célja van. A rendszernek azonban alternatívát is kell adnia: a helyadat kézzel megadható, a fénykép feltöltése opcionális lehet, az értesítés pedig kikapcsolható. A technikai lehetőség nem írhatja felül a felhasználó választását.

## Gyakori félreértések

| Állítás | Pontosítás |
| --- | --- |
| „Egy weboldal bármikor leolvashatja a GPS-helyzetemet.” | A böngésző általában kifejezett felhasználói engedélyhez köti a hozzáférést. |
| „A canvas automatikusan akadálymentes.” | A rajzolt tartalomhoz gyakran külön szöveges és billentyűzetes alternatívát kell tervezni. |
| „A fájlfeltöltés csak technikai részlet.” | Adatvédelmi, biztonsági és tárolási következményei is vannak. |
| „Az értesítések mindig növelik az elköteleződést.” | A túl gyakori értesítés zavaró, és a felhasználó letilthatja az egészet. |

## Ellenőrző kérdések

1. Miért fontos, hogy a böngésző engedélyt kérjen a helyadat használatához?
2. Milyen különbség van a canvas és a szemantikus HTML tartalma között?
3. Miért nem olvashatja el egy oldal tetszőlegesen a számítógép fájljait?
4. Mikor indokolt értesítést kérni egy felhasználótól?

## Fogalomtár

- **Böngésző-API:** szabványos programozási felület a böngésző képességeihez.
- **Canvas:** programozható kétdimenziós rajzfelület.
- **WebGL:** grafikus hardver gyorsítását használó webes grafikai technológia.
- **Geolocation:** helyadat lekérésére szolgáló böngésző-képesség.
- **Engedély:** a felhasználó által adott, visszavonható hozzáférési jóváhagyás.
