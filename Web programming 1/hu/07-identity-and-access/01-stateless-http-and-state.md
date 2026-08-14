# Állapotmentes HTTP és az állapot problémája

## Célok

Az anyag végére a hallgató meg tudja különböztetni egyetlen HTTP-kérés adatait egy webes alkalmazás hosszabb ideig fennálló állapotától. Megérti, miért mondjuk, hogy a HTTP állapotmentes protokoll, miért nem jelenti ez azt, hogy a webes alkalmazások „nem emlékeznek”, és milyen következményekkel jár az emlékezés megvalósítása. Képes lesz felismerni, mikor kell állapotot fenntartani, hol tartható az, és milyen biztonsági, adatvédelmi, valamint üzemeltetési kérdéseket vet fel.

**A HTTP-kérés önmagában egyszeri, független üzenet. A folytonos felhasználói élményt az alkalmazás tudatosan felépített állapotkezelése teremti meg.**

Amikor egy böngésző megnyit egy oldalt, elküld egy kérést, a szerver választ ad, és az adott kérés-válasz pár lezárul. A protokoll alapmodellje szerint a szervernek nem kell automatikusan tudnia, hogy ugyanaz a böngésző küldött-e tegnap is kérést, vagy hogy az előző oldalon mit tett a felhasználó. Ez az egyszerűség a web nagy léptékű működésének egyik oka. Ugyanakkor egy bevásárlókosár, egy bejelentkezett fiók vagy egy többoldalas űrlap csak akkor használható, ha a rendszer valamilyen módon mégis megőrzi a korábbi döntéseket.

## Mit jelent az állapotmentesség?

Képzeljünk el egy ügyfélszolgálati pultot, ahol minden mondat után más ügyintéző ül le. Ha az új ügyintéző semmit nem tud az előző beszélgetésről, az ügyfélnek minden alkalommal el kell mondania a nevét, az ügyét és azt is, meddig jutottak. Ez közel áll az állapotmentes HTTP-hez: minden kérésnek önmagában elegendő információt kell hordoznia ahhoz, hogy a szerver válaszolni tudjon rá.

Egy leegyszerűsített kérés például ilyen:

```http
GET /termekek/42 HTTP/1.1
Host: bolt.example
Accept: text/html
```

A kérés azt mondja meg, milyen erőforrást kérünk, milyen kiszolgálótól és milyen tartalomtípust tudunk fogadni. Nem mondja ki automatikusan, hogy ki vagyunk, láttuk-e korábban a terméket, vagy mit tettünk a kosárba. A szerver válasza is egy különálló üzenet:

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8

<!doctype html> ...
```

Az „állapotmentes” nem azt jelenti, hogy a szervernek nincs memóriája, adatbázisa vagy naplója. Azt jelenti, hogy maga a HTTP nem ír elő beépített, kapcsolatból automatikusan következő felhasználói emlékezetet. A webalkalmazás készítőjének kell meghatároznia, hogy milyen adat maradjon meg, meddig, és kihez legyen kapcsolható.

Ez fontos különbség. Egy adatbázisban létezhet a felhasználó rekordja, a szerver pedig tarthat gyorsítótárat vagy naplót; ettől még az új HTTP-kéréshez nem jár „ingyen” az a tudás, hogy a kérés egy adott személytől jött. Ehhez azonosító vagy hitelesítő adat szükséges.

## Miért előnyös ez a modell?

Az állapotmentességnek gyakorlati előnyei vannak. Ha két egymást követő kérés független, egy terheléselosztó könnyen elküldheti őket két különböző szervernek. Ha az egyik gép leáll, a következő kérés másik gépre kerülhet. A gyorsítótárak is eredményesebben működnek: egy nyilvános kép vagy stíluslap válasza általában nem függ attól, ki kérte, ezért sok felhasználó megoszthatja.

Ez a gondolat jól látható egy híroldalon. A `/hirek/valasztasok` oldal tartalma ugyanaz lehet sok ezer olvasónak; a CDN vagy a böngésző gyorsítótára biztonságosan tárolhatja. Ezzel szemben a `/fiokom/szamlak` válasz személyes adatokat tartalmaz, tehát nem szabad közös gyorsítótárból kiszolgálni. Az állapot és a személyre szabottság tehát nemcsak kényelmi, hanem biztonsági határvonal is.

Az egyszerű alapmodell megkönnyíti a hibakeresést is. Egy jó HTTP-kérésből elvileg megállapítható, mit kér az ügyfél; nem kell feltétlenül egy korábbi, rejtett beszélgetés teljes történetét visszafejteni. A valós rendszerekben persze vannak tartós kapcsolatok és kapcsolat-szintű optimalizációk, de az alkalmazási jelentés továbbra is kérésről kérésre értelmezhető.

## Milyen állapotokra van szükség egy webes rendszerben?

Nem minden megjegyzendő adat egyforma. Érdemes legalább négy csoportot elkülöníteni.

**Felhasználói munkamenetállapot** például az, hogy valaki bejelentkezett-e, melyik fiókot használja, vagy egy banki folyamat melyik biztonsági lépésénél tart. Ez általában rövid életű és fokozottan védendő.

**Alkalmazási üzleti állapot** a kosár tartalma, egy megrendelés státusza, egy beadandó piszkozat vagy egy foglalás. Ennek többnyire az adatbázisban a helye, mert fontos, auditálható és sokszor több eszközről is elérhető.

**Felületi állapot** lehet az éppen nyitott fül, egy szűrőbe írt keresőkifejezés, sötét mód választása vagy egy összecsukott menü. Ez legtöbbször nem kritikus; tartható a böngésző memóriájában, az URL-ben vagy helyi tárolóban.

**Kommunikációs és megfigyelési állapot** például a hibajelentésekhez rendelt kérésazonosító vagy a terhelésmérési adat. Ez nem feltétlenül a felhasználó számára látható, de fontos a szolgáltató számára.

Már e felsorolásból következik, hogy nincs egyetlen „jó hely” minden állapot számára. A bejelentkezést igazoló titkot nem jó az URL-be írni, mert az bekerülhet könyvjelzőbe, előzményekbe, naplókba és hivatkozó fejlécekbe. Egy keresési szűrő viszont gyakran kifejezetten hasznos az URL-ben: megosztható, visszatölthető és a vissza gombbal is együttműködik.

## Végigvezetett példa: a bevásárlókosár

Anna megnyitja a `bolt.example/termekek/42` oldalt. Első kérésében nincs semmi, ami Annát azonosítaná. A szerver elküldi a termékoldalt. Anna a „Kosárba” gombra kattint; ekkor a böngésző például `POST /kosar/elemek` kérést küld. Ahhoz, hogy a szerver tudja, melyik kosárhoz adja a terméket, valamilyen kapcsolatot kell teremtenie a kérés és egy kosár között.

Vendégként a rendszer adhat egy véletlen azonosítót. A böngésző ezt jellemzően cookie-ban viszi a későbbi kérésekhez, a szerver pedig saját tárolójában ehhez kapcsolja a kosár tartalmát. Anna következő kérésén a böngésző automatikusan elküldi ezt a cookie-t, a szerver pedig megtalálja a korábbi kosarat. A HTTP ettől még nem lett „állapottartó”: minden egyes kérés külön tartalmazza azt az adatot, amely alapján a szerver visszakeresi az állapotot.

Ha Anna bejelentkezik, a vendégkosarat a fiókjához lehet kapcsolni. Ha telefonon is belép, a kosár ott is megjelenhet, mert az üzleti állapot már nem csupán az adott böngészőhöz kötődik. Ezzel viszont új kérdések jelennek meg: meddig legyen érvényes a kosár? Ki szerkesztheti? Mi történik, ha két eszközön egyszerre módosítják? A látszólag egyszerű „emlékezés” valójában termék- és rendszertervezési döntések sorozata.

## Hol élhet az állapot?

A böngésző memóriaállapota gyors, de oldalfrissítéskor eltűnhet. A `localStorage` tartósabb, de a böngészőben futó JavaScript olvashatja, ezért érzékeny hitelesítő titok tárolására kockázatos. A cookie-t a böngésző automatikusan küldheti a megfelelő domainnek; megfelelő attribútumokkal a JavaScript elől is elrejthető. A szerveroldali tárolás – adatbázis, munkamenet-tár vagy gyorsítótár – nagyobb kontrollt és visszavonhatóságot ad, de infrastruktúrát és skálázási megoldást igényel.

Az URL is állapothordozó lehet. A `?q=web&oldal=2` tiszta, megosztható módja annak, hogy a keresés jelenlegi állapotát leírjuk. Viszont titkot, személyes adatot vagy egyszer használatos belépési információt nem szabad query paraméterben tárolni.

Minden választásnál fel kell tenni a kérdéseket: szükséges-e az adatnak oldalfrissítés után is megmaradnia? Eszközök között is látszódjon? Érzékeny-e? Visszavonható-e? Megosztható-e a link? Ezekből, nem pedig divatos technológiák nevéből indul ki a jó állapotkezelés.

## Gyakori tévhitek

**„A HTTP állapotmentes, tehát nem lehet bejelentkezve maradni.”** Lehet: a bejelentkezéshez kapcsolódó azonosítót minden új kérés továbbítja, vagy a szerver más módon köti az új kérést a munkamenethez.

**„Ha cookie van, a szerver automatikusan ismer engem.”** A cookie csak adat. A szervernek döntenie kell arról, elfogadja-e, érvényes-e, lejárt-e, és milyen jogosultságot kapcsol hozzá.

**„Minden állapotot a böngészőben érdemes tartani, mert gyors.”** A gyorsaság nem pótolja a biztonságot, a több eszköz közötti elérhetőséget, az auditálhatóságot vagy a megbízható mentést.

**„A szerveroldali session mindig biztonságos.”** A session azonosítójának ellopása ugyanúgy veszélyes lehet. A biztonság az azonosító véletlenszerűségén, továbbításán, lejáratán, védelmén és a teljes rendszer működésén múlik.

## Ellenőrző kérdések

1. Mit állít pontosan az, hogy a HTTP állapotmentes?
2. Mi a különbség a felületi állapot és az üzleti állapot között? Mondj mindkettőre példát.
3. Miért előnyös egy állapotmentes kérésmodell terheléselosztáskor?
4. Miért jó hely egy keresési feltétel számára az URL, és miért rossz hely egy belépési titok számára?
5. A bevásárlókosár mely részeit tartanád a böngészőben, és melyeket a szerveren? Indokold.

## Fogalomtár

**Állapot:** egy rendszer olyan adata, amely a korábbi eseményekből következik és befolyásolja a következő működést.  
**Állapotmentesség:** a HTTP azon tulajdonsága, hogy a kérés-válasz feldolgozásához nincs kötelezően előírt, automatikus korábbi beszélgetési kontextus.  
**Munkamenet (session):** egy felhasználói használati időszakhoz kapcsolt, általában rövid életű állapot.  
**Üzleti állapot:** a szolgáltatás tartós, üzletileg jelentős adata, például rendelés vagy foglalás.  
**Kliensoldali tárolás:** a böngészőn belül megőrzött adat, például cookie vagy `localStorage`.  
**Szerveroldali tárolás:** a szolgáltató által kezelt adatbázisban vagy gyorsítótárban tárolt állapot.  
**Terheléselosztó:** olyan komponens, amely a beérkező kéréseket több kiszolgáló között osztja el.
