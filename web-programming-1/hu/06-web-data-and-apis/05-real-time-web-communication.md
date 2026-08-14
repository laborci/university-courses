# Valós idejű kommunikáció a weben

## Célok

Az anyag végére a hallgató érti, miért nem azonos a „valós idejű” a késleltetés nélküli működéssel. El tudja magyarázni a polling, long polling, Server-Sent Events (SSE), WebSocket és WebRTC alapgondolatát, és fel tud ismerni olyan helyzeteket, ahol az egyszerűbb megoldás a célszerűbb. Ismeri az egyes technikák irányát, kapcsolati modelljét és fontos kompromisszumait.

A hagyományos HTTP-kérésben a kliens kezdeményez, a szerver válaszol, majd az üzenet véget ér. Ha a szervernek új információt kell „magától” eljuttatnia a felhasználóhoz, tartósabb vagy ismétlődő kommunikációs mintára van szükség. A megfelelő minta az események gyakoriságától, irányától, késleltetési igényétől és az üzemeltetési korlátoktól függ.

## Mit jelent itt a valós idő?

Amikor egy chatüzenet néhány tizedmásodpercen belül megjelenik, vagy egy tőzsdei árfolyam folyamatosan frissül, valós idejűnek nevezzük az élményt. Ez nem fizikai értelemben vett azonnaliság. Az eseménynek át kell haladnia a hálózaton, a szervernek fel kell dolgoznia, a kliensnek pedig meg kell jelenítenie. A cél inkább az, hogy a frissítés elég gyors és kiszámítható legyen az adott feladathoz.

Egy csomag kézbesítési állapota percenként frissítve teljesen elfogadható. Egy többjátékos játékban már tíz-száz milliszekundumok is számítanak. A „valós idejű technológia” választása előtt tehát meg kell kérdezni: milyen gyorsan kell látszania a változásnak? Egyirányú értesítésről van szó, vagy mindkét fél folyamatosan küld adatot? Mennyi egyidejű kapcsolat várható? Mi történik, ha a kapcsolat megszakad?

## Polling: rendszeres rákérdezés

A polling a legegyszerűbb megoldás. A böngésző meghatározott időközönként normál HTTP-kérést küld, például öt másodpercenként: `GET /api/notifications`. A szerver az adott pillanat állapotát vagy az azóta történt eseményeket válaszolja meg.

Ez meglepően sok esetben elegendő. Egy adminisztrációs oldalon, amely csak néhány percenként változó feldolgozási állapotot mutat, az öt- vagy harminc másodperces polling egyszerű, megbízható és könnyen hibakereshető. Használja a megszokott HTTP-infrastruktúrát, jól naplózható, a kliens pedig leállíthatja, amikor a lap nincs előtérben.

Az ára a felesleges kérés. Ha tízezer kliens másodpercenként rákérdez, akkor tízezer kérés érkezik akkor is, ha egyetlen új értesítés sincs. Rövid intervallummal gyorsabbnak érződik a rendszer, de nő a szerver- és hálózati terhelés, valamint az akkumulátorhasználat. Hosszú intervallummal olcsóbb, de az információ később jut el a felhasználóhoz.

## Long polling: a válasz kivárja az eseményt

Long pollingnál a kliens kér egy frissítést, a szerver azonban nem válaszol azonnal, ha nincs új esemény. Nyitva tartja a kérést egy ideig, és csak akkor válaszol, amikor adat érkezik vagy lejár egy időkorlát. A kliens a válasz után rögtön újra elküldi a kérést.

Ezzel csökken az üres válaszok száma, és az új esemény közel azonnal eljuthat a klienshez. Elképzelhető például, hogy az ügyfélszolgálati chat böngészője `GET /events?after=125` kérést küld. Ha új üzenet érkezik, a szerver válaszol; a kliens feldolgozza, majd `after=126` értékkel ismét figyel.

A minta még mindig HTTP-kérések lánca, nem valódi kétirányú tartós csatorna. Figyelni kell az időkorlátokra, a proxyk viselkedésére és a kapcsolatmegszakadásokra. Nagy terhelésnél sok nyitott kérés erőforrást foglalhat, ezért a long polling átmeneti vagy mérsékelt igényű megoldásként különösen ésszerű.

## Server-Sent Events: folyamatos szerveroldali eseményfolyam

Az SSE egy HTTP-alapú, szervertől kliens felé irányuló eseménycsatorna. A böngésző megnyit egy kapcsolatot, például `GET /events`, és a szerver `text/event-stream` tartalomtípussal egymás után küldhet üzeneteket:

```text
event: stockUpdate
id: 1042
data: {"symbol":"ACME","price":153.20}

event: stockUpdate
id: 1043
data: {"symbol":"ACME","price":153.10}

```

Az üres sor választja el az eseményeket. A böngészőben az `EventSource` felület kezeli a kapcsolatot, és általában automatikusan újracsatlakozik hiba után. Az eseményazonosító segíthet abban, hogy újracsatlakozáskor a kliens jelezze, meddig jutott, így a szerver pótolhassa az esetleg kimaradt eseményeket.

Az SSE különösen kényelmes élő hírekhez, állapotjelzésekhez, naplófolyamokhoz vagy egyirányú értesítésekhez. Nem kell új protokollt tanulni: HTTP-n fut, és a szerver küldhet adatot, amíg a kapcsolat él. Korlátja, hogy alapvetően egyirányú. Ha a kliens üzenni akar a szervernek, ahhoz külön szokásos HTTP-kérést kell használnia. Bináris adathoz sem ez a legkézenfekvőbb választás.

## WebSocket: kétirányú, tartós kapcsolat

A WebSocket a kapcsolat elején HTTP-alapú kézfogással indul, majd sikeres protokollváltás után külön, kétirányú üzenetcsatornává alakul. Ettől kezdve kliens és szerver is bármikor küldhet szöveges vagy bináris üzenetet, új HTTP-kérés indítása nélkül.

Chat, közös dokumentumszerkesztés, élő licit, online játék vagy kollaboratív vezérlőpult esetén ez természetes modell. Egy chatnél a kliens elküldi az új üzenetet, a szerver ellenőrzi és tárolja, majd az érintett többi kliensnek azonnal továbbíthatja. A kapcsolat nem jelent automatikusan adatbázis-kapcsolatot: csak kommunikációs csatorna, amely mögött ugyanúgy szükséges hitelesítés, jogosultság, üzleti logika és tartós tárolás.

A WebSocket rugalmasságának üzemeltetési ára van. A tartós kapcsolatok állapotot és szerverkapacitást igényelnek. Több kiszolgáló esetén egy kliens által küldött eseményt el kell juttatni azokhoz a szerverpéldányokhoz is, amelyekre más kliensek csatlakoztak; ehhez gyakran központi üzenetközvetítő vagy pub/sub rendszer kell. Tervezni kell a hitelesítést a kapcsolatnyitáskor, a jogosultság újbóli ellenőrzését, a túl gyors üzenetküldés elleni védelmet, a szívverést, az újracsatlakozást és az üzenetek sorrendjét.

Fontos, hogy egy WebSocket-üzenet kézbesítése nem garantálja önmagában, hogy a felhasználó látta vagy az alkalmazás sikeresen feldolgozta. A megbízhatósági szintet az alkalmazás protokolljának kell kimondania: van-e üzenetazonosító, visszaigazolás, ismételt küldés, sorrendi követelmény és lejárat?

## WebRTC: közvetlen média és adatkapcsolat

A WebRTC elsősorban valós idejű hang-, videó- és adatkapcsolatok böngészőbeli támogatására készült. Tipikus példa a videóhívás, ahol a cél lehet, hogy a médiafolyam közvetlenül a résztvevők között haladjon. A kapcsolat létrehozása azonban összetett: a feleknek meg kell találniuk egymást NAT-ok és tűzfalak mögött, ehhez STUN- és szükség esetén TURN-szerverek segítenek. Az úgynevezett jelzésátvitelhez (*signaling*) maga a WebRTC nem ír elő egyetlen kötelező protokollt; gyakran éppen WebSocket vagy HTTPS szolgál rá.

Ezért WebRTC-t nem választunk egyszerű értesítési listához. Nagy előnye a valós idejű média, de a hibakezelés, hálózati környezet és infrastruktúra jóval összetettebb, mint SSE vagy WebSocket esetén.

## Ugyanaz az eset: csomagkövetés

Egy csomagkövető oldalon a futár pozíciója ritkán változik, a vásárló pedig csak néhány percig nézi az oldalt. Pollinggal a böngésző percenként lekérdezheti az állapotot: egyszerű és arányos megoldás. Ha a kézbesítés utolsó perceiben fontos az azonnali frissítés, SSE-vel a szerver egyirányúan küldheti az új státuszokat. Egy diszpécseri alkalmazásban, ahol a kezelő utasításokat küld a futárnak, a WebSocket kétirányú modellje lehet indokolt.

Mindhárom esetben ugyanaz a biztonsági elv érvényes: a kliens csak a saját rendelésére vonatkozó eseményeket kaphatja meg. Az eseménycsatorna nem mentesít a hozzáférés-ellenőrzés alól, sőt a tartós kapcsolat miatt különösen gondosan kell kezelni a lejárt munkameneteket és a jogosultságváltozást.

## Tervezési kérdések és kompromisszumok

Először az esemény természetét kell leírni. Ha a kliens kérdezi meg az aktuális állapotot, a polling elég lehet. Ha a szerver ritka eseményeket akar közölni sok klienssel, SSE egyszerű választás. Ha mindkét irányban gyors, gyakori üzenetváltás szükséges, WebSocketre lehet szükség. Ha élő hang vagy videó a cél, WebRTC kerül előtérbe.

Másodszor az újracsatlakozásról kell gondoskodni. A mobil hálózat vált, a laptop alvó módba kerül, a proxy bezárhat egy tétlen kapcsolatot. A kliensnek ezért újra kell próbálkoznia, lehetőleg fokozatosan növekvő várakozással, nem ezerszer másodpercenként. Az eseményeket azonosítóval és szükség esetén tartós naplóval kell kezelni, ha nem veszhetnek el.

Harmadszor a skálázást kell nézni. Egy „mindenkinek küldjük” üzenet tömeges élő rendszerben költséges. Témákra, szobákra vagy felhasználókra bontott előfizetések, korlátozott üzenetméret, jogosultságellenőrzés és terhelésvédelem szükséges. A valós idejű funkciókhoz ugyanúgy kell naplózás és mérés, mint bármely más webes szolgáltatáshoz.

## Gyakori tévhitek

**„A polling elavult, ezért tilos.”** Nem. Sok ritkán frissülő üzleti esetben a legegyszerűbb és legmegbízhatóbb megoldás.

**„A WebSocket gyorsabb, tehát minden API legyen az.”** A tartós kétirányú csatorna bonyolultabb és drágább üzemeltetni. A szokásos lekérdezésekhez a HTTP továbbra is kiváló.

**„Az SSE ugyanaz, mint a WebSocket.”** Az SSE alapvetően szerver→kliens, HTTP-alapú eseményfolyam. A WebSocket mindkét irányban küldhet üzeneteket egy tartós csatornán.

**„Ha eseményt küldtem, biztosan célba ért.”** Hálózati megszakadás, újratöltés vagy feldolgozási hiba bármikor előfordulhat. A szükséges kézbesítési garanciát az alkalmazásnak kell kialakítania.

## Ellenőrző kérdések

1. Mi a polling fő előnye és legfontosabb költsége?
2. Hogyan különbözik a long polling a rövid időközű pollingtól?
3. Milyen irányú kommunikációra alkalmas természetesen az SSE?
4. Mi történik a WebSocket kapcsolat elején?
5. Nevezzen meg három tervezési feladatot, amely egy WebSocket-alapú szolgáltatásnál megjelenik.
6. Miért lehet szükség újracsatlakozásra és eseményazonosítóra?
7. Milyen feladatra választaná a WebRTC-t, és miért nem erre használna SSE-t?

## Fogalomtár

- **Valós idejű kommunikáció:** olyan adatcsere, amelynek késleltetése az adott felhasználási cél számára elég kicsi.
- **Polling:** a kliens rendszeresen HTTP-kéréssel ellenőrzi, történt-e változás.
- **Long polling:** a szerver egy HTTP-választ új eseményig vagy időkorlátig nyitva tart.
- **SSE (Server-Sent Events):** HTTP-alapú, szerver→kliens eseményfolyam.
- **WebSocket:** tartós, kétirányú üzenetcsatorna kliens és szerver között.
- **WebRTC:** böngészőbeli, valós idejű média- és adatkapcsolatok technológiakészlete.
- **Újracsatlakozás:** kapcsolatvesztés utáni kapcsolathelyreállítási folyamat.
- **Pub/sub:** közzététel/feliratkozás minta, amelyben az üzenetek témákhoz vagy csatornákhoz kapcsolódnak.
