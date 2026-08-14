# Demonstráció: egy weboldal fő összetevőinek feltárása

## Előkészítés

- Nyiss meg egy egyszerű, nyilvánosan elérhető, lehetőleg reklámmentes weboldalt.
- Használj böngészőt fejlesztői eszközökkel; a legtöbb böngészőben az `F12`, illetve macOS-en a fejlesztői menü nyitja meg.
- A demonstráció célja a megfigyelés, nem a kódolás. Kerüld a bonyolult webalkalmazásokat és a túl sok külső kérést.

## Forgatókönyv

### 1. A látható oldal és a mögöttes dokumentum

Nyisd meg az **Elements** vagy **Inspector** panelt.

Mutasd meg, hogy:

- a böngésző a weboldal szerkezetét fa formájában mutatja;
- a címsor, bekezdés, hivatkozás és kép külön elemek;
- az oldal forrása nem azonos a képernyőképpel: a böngésző értelmezi a leíró dokumentumot.

**Oktatói kérdés:** Ha átírjuk a vizsgálóban egy cím szövegét, megváltozik-e a valódi weboldal minden felhasználónál?

**Várt válasz:** Nem. Csak a saját böngészőben, átmenetileg változik meg a megjelenítés.

### 2. HTML, CSS és JavaScript szerepe

Válassz ki egy látható elemet a vizsgálóban, és mutass rá a hozzá tartozó stílusszabályokra.

- **HTML:** az elem szerkezete és jelentése;
- **CSS:** szín, betűméret, elrendezés és megjelenés;
- **JavaScript:** interaktív viselkedés, például gombnyomásra történő változás vagy adatbetöltés.

Nem szükséges kódot magyarázni. A cél az, hogy a hallgatók megértsék: a három technológia eltérő feladatot lát el.

### 3. Erőforrások és hálózati kérések

Nyisd meg a **Network** panelt, majd töltsd újra az oldalt.

Mutasd meg a kéréslistában:

- az első HTML-dokumentum kérését;
- egy vagy több CSS- és JavaScript-fájlt;
- képeket vagy betűtípusokat;
- a státuszkódot;
- az erőforrás típusát és méretét;
- a betöltési időt.

**Kulcsmondat:** A felhasználó egy oldalt lát, de a böngésző gyakran több tucat különálló erőforrást tölt le.

### 4. A kérés és a válasz rövid vizsgálata

Válassz ki egy dokumentumkérést a Network panelben.

Mutasd meg:

- a kérés URL-jét;
- a HTTP-metódust;
- a státuszkódot;
- néhány választípust jelző fejlécet;
- a válasz előnézetét vagy tartalmát.

Kapcsold ezt vissza a kliens–szerver modellhez: a böngésző kér, a szerver válaszol, a böngésző pedig feldolgozza a választ.

### 5. Zárókérdés

Kérdezd meg: „Ha az oldal kinézete már megjelent, de egy kép vagy betűtípus később töltődik be, az melyik webes összetevő problémája lehet?”

Vezesd rá a hallgatókat, hogy a válasz többféle lehet: hálózat, szerver, erőforrás mérete, cache-elés vagy maga az oldal szerkezete.

## Gyakori hibák a demonstráció során

- Ne használj olyan oldalt, amely bejelentkezést vagy személyes adatokat igényel.
- Ne próbálj a hallgatók előtt egy egész modern webalkalmazás minden kérését értelmezni.
- Ne keverd össze a DOM-ot a szerveren tárolt eredeti dokumentummal.
- Ne állítsd, hogy minden oldal pontosan ugyanannyi vagy ugyanolyan típusú erőforrásból épül fel.

## Rövid hallgatói feladat

Egy kiválasztott nyilvános weboldalon keressenek a fejlesztői eszközökben:

1. egy HTML-dokumentumot;
2. egy stíluslapot;
3. egy képet vagy betűtípust;
4. egy sikeres HTTP-választ jelző státuszkódot.

Ezután egy mondatban írják le, melyik erőforrás mire szolgál.
