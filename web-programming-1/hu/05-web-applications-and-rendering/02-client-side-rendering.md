# Kliensoldali renderelés (CSR)

CSR-nél a szerver gyakran nem kész oldalakat, hanem adatot és az alkalmazás indításához szükséges fájlokat ad. A képernyőt a felhasználó eszközén futó JavaScript állítja össze. Ez hatékony lehet összetett, interaktív munkafolyamatokhoz, de a böngészőre és a letöltött kódra helyezett többletterhet tudatosan kell kezelni.

## Mit jelent a renderelés?

Renderelésnek nevezzük azt a folyamatot, amikor egy alkalmazás adataiból megjeleníthető felület lesz. Egy termék például az adatforrásban lehet név, ár, készlet és kép URL formájában. A felhasználó azonban címet, árat, gombot és képet lát. A renderelés teremti meg az összeköttetést a program állapota és a DOM-ban megjelenő felület között.

CSR esetén ez a munka nagyrészt a böngészőben történik. A szerver küldhet egy minimális HTML-t, például egy `div` elemet, amelynek azonosítója `app`, valamint hivatkozásokat egy stíluslapra és egy JavaScript-fájlra. Amikor a JavaScript letöltődött, lefut, létrehozza a komponenseket, majd szükség esetén adatot kér egy API-tól. Az alkalmazás az API-válasz alapján tölti meg a korábban üresnek látszó felületet.

## Az inicializálás története lépésről lépésre

Vegyünk egy egyszerű mozijegy-foglaló alkalmazást. A látogató megnyitja a `moziplusz.hu/filmek` címet. A böngésző lekéri az induló HTML-t. Ez a dokumentum tartalmazhat egy fejlécet és egy üres fő tartalmi területet, de a filmek listája még nincs benne. Ezután letöltődik a CSS és a JavaScript bundle.

A bundle futásakor az alkalmazás először beállítja saját belső állapotát: milyen útvonalon járunk, be van-e jelentkezve a felhasználó, melyik nyelvet használja, van-e korábban tárolt beállítás. Ezután megjeleníthet egy töltési állapotot, majd elküld egy kérést, például `GET /api/filmek?het=aktualis`. A szerver erre JSON-választ küldhet:

```json
[
  { "id": 17, "cim": "Éjszakai vetítés", "hossz": 112 },
  { "id": 24, "cim": "A felfedező", "hossz": 96 }
]
```

A kliensoldali kód ebből előállítja a kártyákat. A felhasználó innentől címeket, időpontokat és foglalás gombokat lát. Ha szűrőt állít, a felület frissülhet teljes dokumentumváltás nélkül. A rendszer vagy új API-kérést indít, vagy a már letöltött adatot rendezi át. A látható eredmény egyszerű, de a háttérben állapotkezelés, hálózati kérés, hibaágak és DOM-frissítés dolgozik.

## A bundle jelentősége

A bundle nem varázsfájl, hanem a fejlesztők által írt JavaScript és annak függőségei böngésző számára elkészített változata. A fejlesztés során sok modul és könyvtár lehet külön fájlban; a kiadási folyamat ezeket gyakran optimalizált erőforrásokká rendezi. A böngészőnek ezt le kell töltenie, értelmeznie, le kell fordítania futtatható formára, majd végre kell hajtania.

Ezért a bundle mérete és összetettsége valós felhasználói kérdés. Egy modern, nagy teljesítményű laptop gyorsan megbirkózhat vele, egy olcsó telefon vagy instabil mobilhálózat viszont nem. A „csak 500 kB” sem feltétlenül kevés: a letöltés mellett számít a JavaScript feldolgozásának ideje és az, hogy mennyi memóriát igényel.

A csökkentés egyik eszköze a kód-szeletelés. A filmkereső nyitóoldalához nem kell feltétlenül letölteni az adminisztráció, a számlázás vagy a ritkán használt statisztikai grafikonok kódját. Ezek csak akkor érkeznek meg, amikor valóban szükség van rájuk. Az optimalizálás célja nem a legkisebb szám elérése, hanem hogy a felhasználó a számára fontos feladatot gyorsan el tudja kezdeni.

## API-k és a felület kapcsolata

CSR-ben a szerver és a kliens közötti határ gyakran jól látható. A szerver API-t nyújt: útvonalakon keresztül adatot ad, műveleteket végez, hitelesít és ellenőrzi a jogosultságot. A kliens a kapott adatot jeleníti meg. Ez lehetővé teszi, hogy ugyanazt az API-t egy webes felület, mobilalkalmazás vagy külső partner is használja.

Ez a szétválasztás azonban nem jelenti azt, hogy a kliens megbízható biztonsági határ. A böngészőben futó kódot a felhasználó megtekintheti és módosíthatja. Ezért a szervernek minden fontos jogosultságot és bemenetet ellenőriznie kell. Hiába rejt el a felület egy „törlés” gombot, ha az API engedély nélkül végrehajtja a törlést.

Az API-kérésnek lehet sikere, hibája vagy késése. Jó CSR-felület nem csak a sikeres választ rajzolja ki: jelzi a betöltést, érthetően kezeli a hálózati hibát, és megkülönbözteti például a „nincs találat” állapotot attól, hogy „nem értük el a szervert”.

## Előnyök

CSR erőssége a gazdag interakció. Egy adatelemző felületen a felhasználó szűrőket állít, táblázatot rendez, több elemet jelöl ki és nézeteket vált. Ha mindegyik művelet teljes dokumentumcserével járna, az élmény sokszor nehézkes lenne. Kliensoldali rendereléssel a változás közvetlenül a releváns részen jelenhet meg.

Az alkalmazás bizonyos adatokat és beállításokat helyben is tarthat. Így például egy űrlap félig kitöltött tartalma megmaradhat rövid hálózati zavar esetén, vagy a felület gyorsabban visszatérhet egy korábbi nézethez. A modern böngészők cache-e és tárolói ebben segíthetnek, de az érzékeny adatok tárolását különösen óvatosan kell megtervezni.

## Korlátok és kompromisszumok

A CSR egyik klasszikus problémája az üres kezdeti oldal. Ha a fontos tartalom csak JavaScript futása és API-válasz után látható, a lassú eszközön a látogató először üres felületet vagy hosszan forgó betöltésjelzőt tapasztal. Ez különösen rossz lehet olyan oldalnál, ahol a látogató gyorsan el akar olvasni egy nyilvános információt.

A kereshetőség is figyelmet követel. A keresőrobotok JavaScript-futtatási képessége nem azonos, a feldolgozás késhet, és a megosztó szolgáltatások sokszor nem várják meg a kliensoldali adatbetöltést. Ha egy eseményoldal címe, leírása és előnézete csak a böngészőben keletkezik, a megosztott link nem biztos, hogy jó képet mutat.

Végül a kliens több állapotért felel. Meg kell oldani a vissza gombot, a frissítést, a mélylinkeket, a hibákat, a jogosultság változását és az akadálymentes fókuszkezelést. A CSR nem „egyszerűbb weboldal”, hanem más helyre teszi az összetettséget.

## Gyakori tévhitek

**„A CSR egyenlő a SPA-val.”** Sok SPA CSR-t használ, de a fogalmak nem teljesen azonosak. A SPA a navigációs és dokumentummodellről, a CSR a felület előállításának helyéről szól.

**„Az API visszaadása már renderelés.”** A JSON adat, nem kész felület. Rendereléskor az adatból lesz a felhasználó számára értelmezhető HTML és interakció.

**„Ha a gomb nem látszik, a művelet védett.”** A jogosultságot a szervernek kell ellenőriznie, nem a felületnek.

**„A több JavaScript modernebb.”** A JavaScript akkor érték, ha a szükséges interakciót szolgálja. Indokolatlan mennyisége lassíthat és sérülékenyebbé tehet egy oldalt.

## Ellenőrző kérdések

1. Milyen erőforrásokat kap meg tipikusan a böngésző egy CSR-alkalmazás indulásakor?
2. Milyen lépések vezetnek egy API JSON-válaszától a látható termékkártyáig?
3. Miért jelent külön terhet a nagy JavaScript-bundle mobil eszközön?
4. Milyen állapotokat kell egy API-hívást használó felületnek kezelnie a sikeres válaszon kívül?
5. Milyen esetben választanál CSR-t egy nyilvános, tartalomközpontú MPA helyett?

## Fogalomtár

- **CSR:** olyan renderelés, ahol a felületet főként a böngészőben futó JavaScript állítja elő.
- **Inicializálás:** az alkalmazás induló állapotának és működésének beállítása.
- **Bundle:** a böngésző számára kiadott JavaScript-csomag.
- **Kód-szeletelés:** a kód több, szükség szerint betöltött részre osztása.
- **API:** programozott felület, amelyen keresztül rendszerek adatot és műveleteket érnek el.
- **Üres állapot:** olyan felület, amely jelzi, hogy nincs megjeleníthető adat; nem azonos a hibával.
