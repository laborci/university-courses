# Demonstráció: HTTP-kérés megfigyelése a böngészőben

## Cél

A demonstráció célja nem egy fejlesztői eszköz minden gombjának megtanulása. A hallgató a saját szemével lássa, hogy az URL beírása több kérésből áll, és minden kérésnek van metódusa, státusza, fejlécei, illetve gyakran törzse. A végére össze kell tudnia kötni az órán tárgyalt fogalmakat egy tényleges weboldallal.

## Előkészítés

Az oktató válasszon egyszerű, nyilvánosan elérhető oldalt, amely HTTPS-t használ és nem igényel bejelentkezést. Jó választás egy tanszéki hír vagy dokumentációs oldal. Kerülendő a személyes, banki vagy egészségügyi adatot mutató oldal. A Chrome, Edge és Firefox fejlesztői eszközei eltérhetnek, de mindegyikben van Network/Hálózat panel.

Kérjük meg a hallgatókat, hogy nyissák meg a fejlesztői eszközöket (általában F12), majd válasszák a Network panelt. Jelöljék be a napló megőrzését, ha van ilyen opció, és frissítsék az oldalt. Magyarázzuk el: most nem „feltörünk” semmit; a saját böngészőnknek küldött és kapott üzeneteket nézzük meg.

## Forgatókönyv, lépésről lépésre

1. **Kérési lista.** Frissítés után sok sor látható. Az első dokumentumkérés mellett gyakran stíluslapok, képek, betűtípusok és JavaScript-fájlok jelennek meg. Kérdés a csoporthoz: vajon melyik lehetett az a válasz, amelyik maga a HTML-oldal?

2. **Dokumentumkérés kiválasztása.** A Type oszlopban keressünk `document` elemet. Nézzük meg a Request URL-t, a Request Methodot (`GET`), a Status Code-ot (általában `200`) és a Remote Address-t. Hangsúly: a `200` nem azt jelenti, hogy „a weboldal jó”, csak azt, hogy a szerver sikeres HTTP-választ adott.

3. **Fejlécek olvasása.** A Headers nézetben különítsük el a request és response headers részt. Keressük meg a `Accept` és `User-Agent` kérésfejlécet, majd a `Content-Type`, `Cache-Control` és esetleg `Set-Cookie` válaszfejlécet. Kérdezzük meg: melyik fejléc a kliens kívánsága, és melyik a szerver állítása a küldött tartalomról?

4. **Választest.** A Response vagy Preview fülön mutassuk meg a HTML forrását. Keressünk benne egy címsort, amely a képernyőn is látható. Így kapcsolódik össze a válasz törzse a renderelt oldallal. Egy kép kérését is nyissuk meg: itt a Content-Type valószínűleg `image/...`, a Response viszont nem emberileg olvasható szöveg.

5. **Cache megfigyelése.** Frissítsünk újra, majd vessük össze a két betöltést. A Size vagy Status oszlop jelezheti, hogy egy erőforrás memory/disk cache-ből jött. Nézzük meg ugyanannál a fájlnál a `Cache-Control` értékét. Ne ígérjük, hogy minden böngészőn pontosan ugyanaz fog történni: a cache állapota és a szerver beállítása eltér.

6. **Átirányítás.** Nyissunk meg tudatosan egy `http://` címet, amely HTTPS-re terel, vagy egy ismert átirányító URL-t. Keressük a `301`, `302`, `307` vagy `308` választ és a `Location` fejlécet. Magyarázat: a böngésző az átirányítást követően új, külön HTTP-kérést indít.

7. **API-példa.** Nyissunk meg egy nyilvános JSON-végpontot új lapon. A Network panelben mutassuk meg, hogy az is HTTP-válasz, csak `Content-Type: application/json` tartalmazhat. Hasonlítsuk össze a JSON-t a HTML-lel: ugyanaz az átviteli mechanizmus, más a tartalom és a feldolgozás célja.

## Beszélgetést indító kérdések

- Miért tölt be egy látszólag egyszerű oldal húsz vagy száz erőforrást?
- Mi változna, ha a válasz `Content-Type` értéke hibás lenne?
- A cookie megjelenése bizonyítja-e, hogy az oldal biztonságos?
- Miért érdemes a cache-ből érkező választ külön kezelni a szerverhiba megítélésekor?

## Gyakori elakadások

Ha üres a lista, a Network panel megnyitása után frissítsünk. Ha túl sok sor zavaró, használjuk a `Doc`, `Fetch/XHR` vagy `Img` szűrőt. Ha egy fejléc nem látszik, az oldal vagy böngésző más néven, eltérő helyen mutathatja; ne egy konkrét fejléc megtalálását értékeljük, hanem a kérés–válasz szerkezet felismerését. Bejelentkezett oldal képernyőképét ne osszuk meg nyilvánosan, mert a fejlécek és URL-ek is tartalmazhatnak érzékeny adatot.

## Rövid utófeladat

Válasszanak a hallgatók egy nyilvános oldalt, készítsenek képernyőképet egy `document` típusú kérésről, és a saját jegyzetükben nevezzék meg: URL, metódus, státuszkód, egy kérésfejléc, egy válaszfejléc és a válasz Content-Type-ja. Egy-egy mondatban írják le, mire szolgál a két kiválasztott fejléc.

## Fogalomtár

**Network panel:** böngészőeszköz a hálózati kérések megfigyelésére. **Request headers:** a kliens által küldött fejlécek. **Response headers:** a szerver által küldött fejlécek. **Response body:** a válasz tartalma. **Redirect:** új URL-re irányító HTTP-válasz.
