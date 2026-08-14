# Webprogramozás I – Otthoni gyakorlati tematika és házi feladatok

## Cél és keret

A tantárgy előadásai elméleti jellegűek. Az otthoni feladatok célja nem az önálló, összetett webalkalmazás-fejlesztés, hanem az előadáson tárgyalt fogalmak közvetlen megtapasztalása. A hallgatók kis, egymásra épülő feladatokon keresztül találkoznak a HTML, CSS, JavaScript, böngészőoldali tárolás, webes API-k és egy minimális Node.js-szerver működésével.

Minden hallgató egy publikus GitHub-repóban dolgozik. A repó javasolt neve: `webprog1-<neptun-kód>`. Minden feladat külön mappába kerüljön, például `homework/01`, `homework/02`, `homework/03`.

Minden feladatmappa tartalmazzon:

- a megoldás fájljait;
- egy rövid `README.md` fájlt;
- a `README.md`-ben a feladat rövid leírását, a futtatás módját, valamint 3–5 mondatot arról, melyik elméleti fogalomhoz kapcsolódik a megoldás;
- ahol értelmezhető, egy vagy több képernyőképet.

Publikus repóba nem kerülhet jelszó, API-kulcs, személyes adat, egyetemi azonosító vagy más bizalmas adat.

## 1. alkalom – GitHub-repó és szemantikus HTML

**Otthon elsajátítandó gyakorlat:** A GitHub-repó alapvető használata, egy egyszerű HTML-dokumentum szerkezete, szemantikus elemek használata.

**Házi feladat:** Hozz létre egy egyszerű, egyoldalas szakmai bemutatkozó oldalt. Használj legalább címsort, bekezdést, listát, hivatkozást, képet, valamint szemantikus `header`, `main`, `section` és `footer` elemeket.

**Leadandó:** `homework/01.md` mappa, `index.html`, `README.md` és képernyőkép.

**Kapcsolódó fogalmak:** HTML, dokumentumszerkezet, szemantika, URL, böngésző.

## 2. alkalom – CSS és reszponzív megjelenés

**Otthon elsajátítandó gyakorlat:** Stíluslap csatolása, alapvető CSS-szabályok, elrendezés és reszponzivitás.

**Házi feladat:** Az előző feladat oldalát egészítsd ki saját CSS-stílussal. Legyen olvasható tipográfia, rendezett elrendezés, jól látható navigáció vagy hivatkozás, és telefonképernyőn is használható megjelenés.

**Leadandó:** `homework/02.md` mappa az átdolgozott HTML-lel és `style.css` fájllal.

**Kapcsolódó fogalmak:** HTML és CSS külön feladata, böngészőoldali renderelés, reszponzivitás.

## 3. alkalom – HTTP-kérés megfigyelése

**Otthon elsajátítandó gyakorlat:** A böngésző fejlesztői eszközeinek alapvető használata, HTTP-kérés és -válasz értelmezése.

**Házi feladat:** Nyiss meg egy nyilvános weboldalt, és a böngésző Network paneljében válassz ki egy dokumentumkérést. A `README.md`-ben röviden mutasd be az URL-t, a kéréstípust, a státuszkódot, legalább két fejlécet és a válasz tartalomtípusát. Mellékelj képernyőképet.

**Leadandó:** `homework/03.md` és legalább egy képernyőkép.

**Kapcsolódó fogalmak:** HTTP, HTTPS, kérés, válasz, fejléc, státuszkód, tartalomtípus.

## 4. alkalom – JavaScript és DOM

**Otthon elsajátítandó gyakorlat:** JavaScript-fájl csatolása, eseménykezelés, DOM-módosítás.

**Házi feladat:** Készíts egy egyszerű interaktív elemet a korábbi oldalhoz. Választható példák: világos/sötét téma kapcsoló, karakter- vagy kattintásszámláló, megjeleníthető/elrejthető tartalom, vagy egyszerű űrlap-visszajelzés.

**Leadandó:** `homework/04.md` mappa HTML-, CSS- és JavaScript-fájllal.

**Kapcsolódó fogalmak:** JavaScript, DOM, esemény, kliensoldali viselkedés.

## 5. alkalom – Böngészőoldali állapot és tárolás

**Otthon elsajátítandó gyakorlat:** Egyszerű adatok megőrzése `localStorage` használatával.

**Házi feladat:** Egészítsd ki a korábbi interaktív oldalt egy olyan funkcióval, amely egy felhasználói beállítást vagy rövid listát elment és újratöltés után is visszaállít. Például: kiválasztott téma, kedvenc kurzusok, teendőlista vagy korábban megadott név.

**Leadandó:** `homework/05.md` mappa, valamint a `README.md`-ben rövid magyarázat arról, mi marad meg az oldal újratöltése után.

**Kapcsolódó fogalmak:** állapot, böngészőoldali tárolás, `localStorage`, cookie-k és sessionök közötti különbség.

## 6. alkalom – Nyilvános webes API használata

**Otthon elsajátítandó gyakorlat:** Aszinkron adatlekérés, JSON-válasz értelmezése és megjelenítése.

**Házi feladat:** Válassz egy ingyenesen, hitelesítés nélkül elérhető nyilvános API-t. JavaScript segítségével kérj le belőle adatot, és jeleníts meg legalább három információt egy weboldalon. Legyen látható betöltési vagy hibaállapot is.

**Leadandó:** `homework/06.md` mappa és a használt API dokumentációjára mutató hivatkozás a `README.md`-ben.

**Kapcsolódó fogalmak:** API, HTTP GET, JSON, kérés–válasz modell, aszinkron működés.

## 7. alkalom – Minimális Node.js-szerver

**Otthon elsajátítandó gyakorlat:** Szerveroldali alkalmazás elindítása, útvonal és HTTP-válasz létrehozása.

**Házi feladat:** Készíts egy minimális Node.js-alkalmazást a beépített `http` modul vagy egy oktatói mintaprojekt alapján. Valósítsd meg a `GET /time` végpontot, amely az aktuális időt adja vissza szöveges vagy JSON-formátumban.

**Leadandó:** `homework/07.md` mappa a szerver forrásával, `package.json` fájllal, futtatási útmutatóval és egy működő kérésről készült képernyőképpel.

**Kapcsolódó fogalmak:** kliens–szerver modell, útvonal, HTTP GET, válasz, státuszkód, szerveroldali alkalmazás.

## 8. alkalom – Paraméterek, validáció és JSON-válasz

**Otthon elsajátítandó gyakorlat:** Lekérdezési paraméterek feldolgozása, egyszerű bemenetellenőrzés, hibaválasz.

**Házi feladat:** Bővítsd a Node.js-szervert `GET /add?a=2&b=3` végponttal. A végpont két számot olvasson ki a lekérdezési paraméterekből, adja vissza az összegüket JSON-formátumban, és hibás vagy hiányzó paramétereknél küldjön értelmes hibaüzenetet és megfelelő HTTP-státuszkódot.

**Leadandó:** `homework/08.md` mappa, legalább egy sikeres és egy hibás kérés képernyőképével.

**Kapcsolódó fogalmak:** URL, query paraméter, validáció, JSON, HTTP 200, HTTP 400, hibaüzenet.

## 9. alkalom – Biztonság és adatvédelem saját példán

**Otthon elsajátítandó gyakorlat:** A saját webes kód kritikus szemléletű átvizsgálása.

**Házi feladat:** Készíts rövid biztonsági és adatvédelmi ellenőrzést a saját repódhoz. A `README.md`-ben válaszolj: milyen adatot kezel a projekt; kerül-e személyes adat a böngésző tárolójába; hogyan kezeli a hibás bemenetet; milyen veszélyt jelentene, ha a felhasználó szövegét ellenőrzés nélkül jelenítené meg; és miért nem szabad titkos adatot a publikus repóba tenni.

**Leadandó:** `homework/09.md`.

**Kapcsolódó fogalmak:** bemenetellenőrzés, XSS, személyes adat, publikus repó, biztonságos alapértelmezések.

## 10. alkalom – Minőségi web és projektzárás

**Otthon elsajátítandó gyakorlat:** Akadálymentességi, teljesítményi, kereshetőségi és dokumentációs szempontok alkalmazása.

**Házi feladat:** Válassz ki egy korábbi, böngészőben futó feladatot, és javíts rajta legalább három minőségi szempont szerint. Kötelezően szerepeljen egy akadálymentességi javítás, egy teljesítményi vagy használhatósági javítás, valamint egy kereshetőségi vagy adatvédelmi javítás. A `README.md`-ben röviden írd le a kiinduló problémát, a módosítást és annak várható hatását.

**Leadandó:** `homework/10.md` mappa a javított változattal, képernyőképpel és rövid összefoglalóval.

**Kapcsolódó fogalmak:** szemantikus HTML, akadálymentesség, reszponzivitás, teljesítmény, SEO/AIO, GDPR, dokumentáció.

## Javasolt repóstruktúra

```text
webprog1-NEPTUN/
├── homework/01.md
├── homework/02.md
├── homework/03.md
├── homework/04.md
├── homework/05.md
├── homework/06.md
├── homework/07.md
├── homework/08.md
├── homework/09.md
├── homework/10.md
└── README.md
```

## Fontos elv

A házi feladatok nem kész webes termék létrehozását várják el. A jó megoldás legyen kicsi, működő, érthetően dokumentált, és mutassa meg, hogy a hallgató összekapcsolta az elméleti fogalmat egy konkrét tapasztalattal.
