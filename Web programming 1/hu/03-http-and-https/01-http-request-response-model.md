# A HTTP kérés–válasz modell

A web alapvető párbeszéde egyszerű: a kliens kér valamit, a szerver választ ad. A HTTP ennek a párbeszédnek a közös nyelve. Nem csak böngészők használják: ugyanígy kommunikálhat egy mobilalkalmazás, egy parancssori program vagy két szerveroldali szolgáltatás is.

## Egy oldalbetöltés valójában sok párbeszéd

Amikor valaki megnyitja az egyetemi rendszerben a Webprogramozás I tárgy oldalát, a böngésző először egy HTML-dokumentumot kér. A dokumentum azonban hivatkozhat stíluslapokra, képekre, betűkészletekre, JavaScript-fájlokra és API-adatokra. A böngésző ezekért külön-külön is kérést indíthat. A felhasználó egyetlen oldalbetöltést érzékel, a háttérben azonban sok HTTP-párbeszéd zajlik.

Ez fontos: a weboldal nem feltétlenül egy fájl. Egy modern webes felület erőforrások együttese. Lehet benne embernek szánt HTML, de lehet JSON-adat, kép, videórészlet vagy egy bejelentkezés eredménye is.

## Kliens, szerver, erőforrás

A kliens az a program, amelyik szolgáltatást kér. Leggyakrabban böngésző, de egy telefonos alkalmazás vagy másik szerver is lehet kliens. A szerver az a program vagy szolgáltatás, amelyik fogadja a kérést és választ állít elő. A szerver szó jelenthet gépet is, HTTP-szempontból azonban inkább a rajta futó szolgáltatás érdekes.

A szerepek nem örökérvényűek. Egy alkalmazásszerver szerver a böngésző számára, de kliens lehet, amikor adatot kér egy fizetési szolgáltatótól. Ezért mindig az adott kapcsolatban értelmezzük, melyik fél a kliens és melyik a szerver.

Az erőforrás az a címmel azonosítható dolog, amellyel a kliens kapcsolatba lép. Lehet dokumentum, termékkép, felhasználói profil vagy API-végpont által nyújtott adat. Az URL azt mondja meg, mihez fordulunk; a metódus pedig azt, milyen szándékkal.

## Egy kérés felépítése

Egy HTTP-kérés kezdősorból, fejlécekből és – szükség esetén – törzsből áll. Egy egyszerű kérés például:

    GET /kurzusok/webprog1?felev=2026-osz HTTP/1.1
    Host: peldaegyetem.hu
    Accept: text/html
    Accept-Language: hu
    User-Agent: Mozilla/5.0

A kezdősorban a GET a metódus: a kliens le szeretné kérni az erőforrást. A /kurzusok/webprog1 az útvonal, a kérdőjel utáni rész pedig lekérdezési paraméter. A Host fejléc azért fontos, mert egy IP-címen több webhely is működhet. Az Accept azt közli, milyen választípusokat tud feldolgozni a kliens; az Accept-Language nyelvi preferenciát ad meg.

A fejléc név–érték formájú kiegészítő információ. Nem a tartalom maga, hanem annak körülményeit, formátumát, jogosultságát vagy gyorsítótárazását írhatja le. A törzs a tényleges elküldött adat. GET-nél rendszerint nincs törzs; POST-kérésben viszont itt lehet az űrlap vagy JSON-dokumentum.

## Egy válasz felépítése

A szerver válasza hasonló szerkezetű:

    HTTP/1.1 200 OK
    Content-Type: text/html; charset=utf-8
    Content-Language: hu
    Cache-Control: no-cache

    <!doctype html>
    <html lang="hu"><body><h1>Webprogramozás I</h1></body></html>

A 200 OK a státuszkód és rövid leírása. Azt jelenti, hogy a szerver sikeresen teljesítette a HTTP-kérést; nem azt, hogy az oldal minden üzleti szempontból hasznos. A Content-Type jelzi, hogyan értelmezze a kliens a törzset. Itt HTML-ről van szó UTF-8 kódolással.

Ugyanez JSON-nál is működik. Egy GET /api/targyak/webprog1 kérésre a szerver küldhet 200 OK választ Content-Type: application/json fejléccel és ilyen törzzsel: {"kod":"WEBPROG1","nev":"Webprogramozás I","kreditek":3}. Nem látható weboldalról van szó, mégis teljes értékű webes kommunikáció történik.

## Állapotmentesség: miért jó, és mi a nehézsége?

A HTTP alapelve szerint állapotmentes. Egy kérésnek önmagában értelmezhetőnek kell lennie; a szervernek nem kötelező emlékeznie az előző kérésre. Ez nagy terhelésnél előny: a kérések több szerver között oszthatók el, mert bármelyik feldolgozhatja őket, ha minden szükséges információ megérkezik.

Ez nem azt jelenti, hogy a webalkalmazásoknak nincs állapotuk. A bevásárlókosár, a bejelentkezés, a kiválasztott nyelv és az olvasatlan üzenetek mind állapotot jelentenek. A kapcsolatot cookie, szerveroldali munkamenet vagy token teremtheti meg. Ha valaki kosárba tesz valamit, a következő kérésnek is jeleznie kell, melyik kosárhoz tartozik.

## Végigvezetett példa: egy idő-végpont

Egy minimális szerver kiszolgálhatja a /time útvonalat. A böngésző GET /time kérést küld localhost:3000 címre, a szerver kiolvassa az aktuális időt, majd 200 OK választ küld Content-Type: application/json fejléccel és például ezzel a törzzsel: {"time":"2026-08-12T10:15:00.000Z"}.

A szerver nem a böngésző képernyőjére ír, hanem adatot ad vissza. A kliens dönt arról, hogy ezt egyszerű szövegként, óraként vagy egy táblázat részeként mutatja-e meg. Ettől válik kézzelfoghatóvá a kliens–szerver modell.

## Tipikus tévhitek

**A HTTP csak HTML-oldalakra való.** Nem: képek, API-k, videók, fájlok és gép–gép kommunikáció is használhatja.

**A szerver mindig egy gép.** A cím mögött sok gép, proxy és háttérszolgáltatás állhat.

**A 200 azt jelenti, hogy minden rendben van.** Csak azt, hogy HTTP-szinten sikeres válasz született.

**Egy oldalbetöltés egy kérés.** Egy oldal rendszerint sok kérést indít, és háttérben is lehet kérés navigáció nélkül.

## Ellenőrző kérdések

1. Mi a különbség a kliens és a szerver között?
2. Melyik három fő részből állhat egy HTTP-kérés?
3. Mit mond meg a Content-Type fejléc?
4. Miért előnyös az állapotmentesség több szervert használó szolgáltatásnál?
5. Hogyan kapcsolható össze két egymást követő kérés ugyanazzal a felhasználóval?
6. Miért lehet több HTTP-kérés egyetlen oldal betöltésekor?

## Fogalomtár

- **HTTP:** kliens és szerver közötti szabványos alkalmazási protokoll.
- **Kliens:** szolgáltatást kérő program vagy rendszer.
- **Szerver:** a kérést feldolgozó és választ küldő szolgáltatás.
- **Erőforrás:** címmel azonosítható dokumentum, adat vagy szolgáltatás.
- **Metódus:** a kérés szándékát jelző HTTP-ige.
- **Fejléc:** név–érték formájú kiegészítő információ az üzenetben.
- **Törzs:** az üzenet tényleges tartalma.
- **Státuszkód:** a válasz szabványos eredményjelzése.
- **Állapotmentesség:** a kérések önálló kezelhetőségének alapelve.
