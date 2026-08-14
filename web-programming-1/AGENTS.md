# Webprogramozás I – Projektirányelvek

## Projekt célja

Ez a repó a **Webprogramozás I** egyetemi tantárgy GitBook-alapú tananyagát tartalmazza magyar és később angol nyelven.

A tárgy minden informatikus hallgatónak szóló, elsősorban **elméleti** bevezetés a web működésébe. A cél nem konkrét webalkalmazások vagy keretrendszerek mély programozási oktatása. A Webprogramozás II-ben várható a nagyobb alkalmazásfejlesztési és programozási fókusz.

## Tantárgyi fókusz

A tananyag fő témái:

- a web mint nyílt, elosztott információs rendszer;
- hálózati és webes kommunikáció: DNS, HTTP, HTTPS, API-k;
- böngészők, HTML/CSS/JavaScript szerepe és renderelés;
- webes alkalmazásarchitektúrák fogalmi szinten;
- identitás, hozzáférés és webbiztonság;
- akadálymentesség, reszponzivitás, teljesítmény, SEO/AIO, adatvédelem;
- megbízhatóság, cache, CDN, terhelés és megfigyelhetőség.

Ne terjeszd a tárgyat részletes infrastruktúra-, DevOps-, CI/CD-, konténerizációs vagy keretrendszeroktatássá. Ezek legfeljebb fogalmi háttérként jelenhetnek meg, ha egy webes alapelv megértéséhez szükségesek.

## Oktatási szemlélet

- A tananyag magyarul legyen világos, olvasmányos és példákra építő.
- A dokumentumok ne csupán vázlatok vagy felsorolások legyenek; magyarázzák el az összefüggéseket.
- Egy önálló tananyagoldal jellemzően tartalmazzon: tanulási célokat, kulcsüzenetet, részletes magyarázatot, végigvezetett példát, gyakori félreértéseket, ellenőrző kérdéseket és fogalomtárat.
- A diákok felé a webes fogalmakat mindig valódi rendszerekhez és használati helyzetekhez kösd.
- Biztonsági témák kizárólag védelmi, fogalmi oktatási céllal készüljenek; ne tartalmazzanak kihasználható támadási útmutatót.

## Könyvstruktúra

A jelenlegi gyökérbeli, régi fájlokat **nem szabad áthelyezni, átnevezni vagy törölni**. A GitBook-változat a `hu/` alatt épül.

```text
hu/
├── README.md
├── syllabus.md
├── course-outline.md
├── assessment.md
├── homework-submission.md
├── student-presentations.md
├── technical-setup.md
├── glossary.md
├── presentation-template.md
├── 01-what-is-the-web/
│   ├── README.md
│   ├── 01-...md
│   ├── demo.md
│   └── homework.md
├── ...
└── 10-reliable-and-high-performance-web/
```

Az `en/` mappa a későbbi angol változat számára van fenntartva. A `hu/` és az `en/` könyvstruktúrája, mappanevei és fájlnevei azonosak, angol/ASCII fájlnevekkel. Csak a tartalom és a megjelenő cím fordítódik.

Az alkalommappákban:

- `README.md` az alkalom rövid nyitóoldala;
- a tananyagfájlok sorszámozottak az oktatási sorrend megőrzéséhez;
- `demo.md` és `homework.md` nem számozott;
- a házi feladat mindig az adott alkalom saját mappájában marad.

## Központi dokumentumok szerepe

- `README.md`: rövid belépőoldal és navigáció a kurzusdokumentumokhoz.
- `syllabus.md`: hivatalos, tömör tematika; ne tartalmazzon demonstrációkat, esettanulmányokat vagy hallgatói prezentációs listát.
- `course-outline.md`: a tíz alkalom teljes navigálható tartalomjegyzéke.
- `assessment.md`: a számonkérés szabályai.
- `homework-submission.md`: általános GitHub-, beadási és adatvédelmi szabályok; a heti feladatleírások nem itt vannak.
- `student-presentations.md`: az ötperces hallgatói előadások szabályai és teljes témalistája.
- `technical-setup.md`: az otthoni feladatok minimális technikai feltételei.
- `glossary.md`: teljes, kurzusszintű fogalomtár; új anyag esetén tartsd naprakészen.

## Otthoni gyakorlati feladatok

A tárgy elméleti, de a hallgatók rövid, egymásra épülő otthoni feladatokon keresztül tapasztalják meg a fogalmakat.

- Minden hallgató publikus GitHub-repóban dolgozik; javasolt név: `webprog1-<neptun-kod>`.
- Minden házi feladat kizárólag a hallgatói repó `homework/01.md`, `homework/02.md`, …, `homework/10.md` fájljaiba kerül.
- A feladatok célja nem komplex termék építése, hanem kis, működő és dokumentált példák készítése.
- A gyakorlati ív: szemantikus HTML, CSS, JavaScript és DOM, böngészőoldali tárolás, nyilvános API, majd minimális Node.js-szerver.
- A Node.js-példa szándékosan kicsi: például `GET /time` és `GET /add?a=2&b=3`. Célja a HTTP és kliens–szerver modell láthatóvá tétele, nem backendfejlesztés oktatása.
- Publikus repóba nem kerülhet jelszó, API-kulcs, token, személyes adat vagy más bizalmas információ.

## Hallgatói prezentációk

- Minden hallgató legfeljebb egy, ötperces prezentációt tart.
- Jelentkezés a hallgató publikus repójában, a `presentation/presentation.md` fájllal történik.
- A fájlban YAML frontmatterben legyen a prezentáció publikus Google Slides-linkje (`slides_url`), továbbá szerepeljen rövid vázlat és forráslista.
- A kiinduló forma a `hu/presentation-template.md`.
- Több jelentkező esetén véletlenszerű sorsolás dönt.
- A slide demonstrációs eszköz, nem handout és nem felolvasandó szöveg. Előnyben: képek, egyszerű ábrák, kevés szavas felsorolások.
- A prezentációt be kell gyakorolni. A slide-okról felolvasott előadás nem kap pontot.

## Szerkesztési szabályok

- Új vagy módosított fájl esetén őrizd meg a könyv megállapodott struktúráját és a belső linkek működését.
- A fájlnevek angolul, kisbetűvel, ASCII karakterekkel és kötőjelekkel készüljenek.
- A magyar fájlok `#` címei és teljes tartalma magyar nyelvűek.
- Ne hagyj átmeneti szöveget, például „kidolgozás alatt”, „később bővül” vagy „TODO”, hacsak a felhasználó ezt kifejezetten nem kéri.
- Mielőtt új ismétlődő fogalmat vezetsz be, ellenőrizd, hogy a központi fogalomtárban megfelelően szerepel-e.
