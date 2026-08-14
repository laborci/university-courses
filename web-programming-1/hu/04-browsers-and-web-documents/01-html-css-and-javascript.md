# HTML, CSS és JavaScript szerepe

A HTML azt mondja meg, mi van egy dokumentumban és milyen jelentése van. A CSS azt, hogyan jelenjen meg. A JavaScript azt, hogyan viselkedjen és hogyan reagáljon a felhasználóra vagy a környezet változásaira. A jól felépített webes felületben ez a három felelősség elkülönül, miközben együtt működik.

Amikor egy felhasználó megnyit egy weboldalt, általában egyetlen egységes felületet lát: címet, szöveget, képeket, gombokat, menüket és esetleg mozgó vagy változó elemeket. A böngésző számára azonban ez a felület több, eltérő céllal készített erőforrásból áll össze. A legfontosabb három építőelem a HTML, a CSS és a JavaScript.

Ezeket néha leegyszerűsítve úgy szokták bemutatni, hogy a HTML a csontváz, a CSS a ruházat, a JavaScript pedig az izmok vagy az idegrendszer. A hasonlat nem tökéletes, de segít megjegyezni a szerepeket. A HTML szerkezetet és jelentést ad, a CSS formát és elrendezést, a JavaScript pedig dinamikus viselkedést.

### HTML: a dokumentum szerkezete és jelentése

A HTML (HyperText Markup Language) leíró nyelv. Nem elsősorban arra való, hogy megmondja, milyen színű legyen egy cím vagy hány pixel magas egy gomb. Azt írja le, hogy egy tartalom cím, bekezdés, lista, hivatkozás, táblázat, űrlap vagy idézet-e. A böngésző ebből építi fel a dokumentum szerkezetét.

Egy jó HTML-dokumentum nemcsak a látó felhasználónak segít. A keresőmotorok, képernyőolvasók, fordítóeszközök és más programok is a szemantikus szerkezetből próbálják megérteni a tartalmat. Ha egy szöveg valóban főcím, akkor a megfelelő HTML-címsorelemmel érdemes jelölni, nem pusztán nagyobb betűméretű bekezdésként.

Vegyünk egy egyszerű egyetemi hírt. A dokumentumnak lehet `header` része intézményi azonosítóval, `main` része a tartalommal, azon belül `article` eleme a hírrel, és `footer` része az elérhetőségekkel. Ez az információ akkor is értelmezhető marad, ha még nincs hozzá CSS. A böngésző alapértelmezett megjelenítése nem feltétlenül látványos, de a dokumentum logikája már jelen van.

### CSS: megjelenés és elrendezés

A CSS (Cascading Style Sheets) a dokumentum megjelenését írja le. Meghatározhatja a betűtípusokat, színeket, térközöket, rácsos vagy rugalmas elrendezést, animációkat és a különböző képernyőméretekhez tartozó viselkedést.

A „cascading”, azaz lépcsőzetes szó arra utal, hogy több stílusszabály is vonatkozhat ugyanarra az elemre, és a böngésző szabályok alapján dönti el, melyik érvényes. Számít például, hogy a szabály mennyire pontos, honnan származik és milyen sorrendben szerepel. Ez a CSS egyik ereje és egyben egyik tanulási nehézsége: nem minden formázás különálló utasítás, hanem egymással kölcsönhatásban lévő szabályok eredménye.

A CSS teszi lehetővé, hogy ugyanaz a HTML-szerkezet telefonon és nagy kijelzőn is jól használható legyen. Egy navigációs menü széles képernyőn lehet vízszintes, telefonon pedig függőleges vagy elrejthető. A tartalom szemantikai jelentése ettől nem változik; csak a megjelenítése alkalmazkodik a rendelkezésre álló térhez.

### JavaScript: viselkedés és programozhatóság

A JavaScript a böngészőben futó programozási nyelv. Segítségével a weboldal reagálhat a felhasználó kattintására, szövegbevitelére, görgetésére vagy egy hálózati kérés eredményére. JavaScript tölthet be friss adatokat egy API-ból, ellenőrizhet űrlapokat, módosíthatja a dokumentum egy részét, vagy eltárolhat egy beállítást a böngészőben.

Ez azonban nem jelenti azt, hogy minden weboldalnak JavaScriptre van szüksége. Egy tájékoztató oldal, szabályzat vagy egyszerű cikk HTML-lel és CSS-sel is jól használható lehet. A JavaScript akkor indokolt, ha ténylegesen interaktivitást, frissülő adatot vagy kliensoldali feldolgozást ad. A fölösleges JavaScript lassíthatja a betöltést, növelheti a hibák esélyét, és akadálymentességi problémákat is okozhat.

### Mi történik, ha valamelyik hiányzik?

Ha nincs CSS, a tartalom többnyire továbbra is olvasható, csak egyszerű böngészőalapértelmezésekkel jelenik meg. Ha nincs JavaScript, egy jól megtervezett oldal alapvető információi és navigációja ideális esetben szintén működőképesek maradnak. Ha viszont a HTML szerkezete rossz vagy hiányzik, sem a megjelenés, sem a viselkedés nem tud stabil alapra épülni.

Ezért fontos a fokozatos fejlesztés gondolata: először legyen értelmes, hozzáférhető dokumentum; erre épüljön a megjelenés; majd csak indokolt esetben az interaktív többlet. Így a szolgáltatás ellenállóbb marad lassú hálózaton, régebbi eszközön vagy átmenetileg hibás szkriptbetöltés esetén is.

## Végigvezetett példa: kurzusjelentkezési oldal

Egy kurzusjelentkezési felületen a HTML jelöli a kurzus nevét, a követelményeket, a jelentkezési űrlapot és a gombokat. A CSS gondoskodik arról, hogy a fontos határidő feltűnő, a táblázat olvasható, a felület telefonon is kezelhető legyen. A JavaScript megmutathatja, hány karakter fér még el egy megjegyzésmezőben, vagy figyelmeztethet, ha egy kötelező mező üres.

Az üzleti döntés – például hogy a hallgató valóban teljesítette-e az előfeltételt – nem bízható csak a böngészőben futó JavaScriptre. A szerveroldalon is ellenőrizni kell. Ez jól mutatja, hogy a JavaScript kiváló a felhasználói élmény javítására, de a kritikus szabályok végső érvényesítése szerveroldali feladat.

## Gyakori félreértések

| Állítás | Pontosítás |
| --- | --- |
| „A HTML programozási nyelv.” | A HTML leíró nyelv; szerkezetet és jelentést jelöl. |
| „A CSS csak díszítés.” | A megjelenésen túl a használhatóságot, reszponzivitást és olvashatóságot is meghatározza. |
| „JavaScript nélkül nem modern egy oldal.” | Sok szolgáltatáshoz nem szükséges, vagy csak kisebb kiegészítésként indokolt. |
| „A JavaScriptes űrlapellenőrzés elég biztonságos.” | A kliensoldali kód módosítható vagy megkerülhető; a szervernek is ellenőriznie kell a bemenetet. |

## Ellenőrző kérdések

1. Miért fontosabb a HTML-ben a jelentés, mint a látvány közvetlen leírása?
2. Hogyan segíthet a CSS az akadálymentességben?
3. Miért lehet előnyös, ha egy alapvető információ JavaScript nélkül is elérhető?
4. Milyen feladatot adna a JavaScriptnek egy webáruházban, és mit nem bízna kizárólag rá?

## Fogalomtár

- **HTML:** a webes dokumentum szerkezetét és szemantikáját leíró nyelv.
- **CSS:** a webes dokumentum megjelenését és elrendezését leíró szabályrendszer.
- **JavaScript:** a böngészőben futó programozási nyelv interaktivitáshoz és kliensoldali feldolgozáshoz.
- **Szemantika:** a dokumentum elemeinek jelentése.
- **Reszponzivitás:** a felület alkalmazkodása eltérő képernyőkhöz és eszközökhöz.
- **Fokozatos fejlesztés:** stabil alapokra épülő, fokozatosan bővülő webes megközelítés.
