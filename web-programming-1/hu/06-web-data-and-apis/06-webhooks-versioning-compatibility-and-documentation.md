# Webhook, API-verziózás, kompatibilitás és dokumentáció

Egy API nem pusztán URL-ek gyűjteménye, hanem szerződés két önállóan változó rendszer között. A jó szerződés pontos, dokumentált, lehetőleg visszafelé kompatibilis, és világossá teszi azt is, hogyan érkezik meg az információ akkor, amikor valami a másik oldalon történik.

## A kérdező modell határa

Az eddigi példákban a kliens kezdeményezte a kapcsolatot: megkérdezte, érkezett-e új rendelés, megváltozott-e egy csomag állapota, vagy elkészült-e egy fizetés. Ezt pollingnak nevezzük. Egy alkalmazás például percenként elküldheti a `GET /orders?status=new` kérést. A modell egyszerű, mert a kliens irányít: akkor kérdez, amikor akar, és a válasz közvetlenül a kéréshez tartozik.

Sok esetben azonban pazarló. Ha tízezer kereskedő percenként kérdezi meg a fizetési szolgáltatót, de egy adott boltban naponta csak öt tranzakció történik, az API túlnyomó többségben azt válaszolja, hogy nincs újdonság. Ráadásul egy perces polling mellett egy esemény legfeljebb egy perc késéssel jut el a rendszerhez. Gyorsabb lekérdezés csökkentheti a késést, de növeli a forgalmat, a költséget és a szolgáltató terhelését.

## Mit old meg a webhook?

A webhook az eseményértesítés fordított irányú mintája. A fogadó fél megad egy saját, HTTPS-en elérhető címet, például `https://bolt.example.hu/hooks/payment`. Ha a fizetési szolgáltatóban megtörténik egy fontos esemény, a szolgáltató HTTP-kérést indít erre a címre. Tipikusan `POST` kérést küld JSON törzzsel. A bolt tehát nem kérdezgeti, hogy „történt már fizetés?”, hanem értesítést kap, amikor megtörtént.

Egy leegyszerűsített üzenet így nézhet ki:

```http
POST /hooks/payment HTTP/1.1
Host: bolt.example.hu
Content-Type: application/json
X-Event-Type: payment.succeeded
X-Signature: t=...,v1=...

{
  "event_id": "evt_8f2",
  "type": "payment.succeeded",
  "created_at": "2026-08-12T09:15:00Z",
  "data": {
    "payment_id": "pay_502",
    "order_id": "order_173",
    "amount": 12990,
    "currency": "HUF"
  }
}
```

Ebben az esetben a fizető rendszer a küldő, a kereskedő rendszere pedig a fogadó. Ez eltér attól a képtől, amelyben a böngésző mindig a kliens, a szerver pedig mindig a válaszoló. A „kliens” és „szerver” szerep egy konkrét HTTP-kapcsolatra vonatkozik: a webhook hívásban maga a szolgáltató a HTTP-kliens.

## A webhook nem garantált, egyszeri postás

Könnyű azt hinni, hogy a webhook egy tökéletes, pontosan egyszer érkező értesítés. A valóság óvatosabb. A cím átmenetileg nem elérhető lehet, a fogadó lassan válaszolhat, hálózati hiba történhet, vagy a küldő nem tudhatja biztosan, megkapta-e a választ. Emiatt a szolgáltatók jellemzően újrapróbálják a sikertelen kézbesítést. Egy esemény többször is megérkezhet, és két különböző esemény sorrendje sem feltétlenül ugyanaz, mint amelyben a szolgáltatónál létrejöttek.

Ezért a fogadó oldalnak idempotensnek kell lennie: ugyanazon `event_id` ismételt feldolgozása ne hozzon létre második rendelést vagy második jóváírást. Gyakorlatban az alkalmazás eltárolja a már kezelt eseményazonosítókat, és ismétléskor sikeres választ ad, de nem végzi el újra az üzleti műveletet. A webhook végpontnak gyorsan kell visszajeleznie egy `2xx` státuszkóddal; a hosszabb feldolgozás gyakran külön háttérfolyamatba kerül.

Biztonsági okból nem szabad pusztán a kérés forrás-IP-címére vagy az URL titkosságára hagyatkozni. A szolgáltató gyakran aláírást küld fejlécben. A fogadó a megosztott titok és a nyers kérés törzse alapján ellenőrzi, hogy valóban a szolgáltató küldte-e az üzenetet, és az időbélyeggel a régi, újrajátszott kérések ellen is védekezhet. A hitelesítés tehát webhooknál is része az API-szerződésnek.

## Változó szerződés: miért kell verziózni?

Képzeljünk el egy időjárás-API-t, amely kezdetben ezt küldi:

```json
{ "city": "Szeged", "temperature": 28 }
```

Egy kliens ezt a `temperature` mezőt használja. Ha a szolgáltató később jó szándékkal átnevezi a mezőt `temperature_celsius`-ra, a kliens egyik napról a másikra üres adatot vagy hibát kaphat. A szolgáltató saját rendszere talán hibátlanul működik, mégis eltörte a külső felhasználók alkalmazásait. Ez a visszafelé kompatibilitás problémája.

Visszafelé kompatibilis módosítás lehet például egy új, opcionális mező hozzáadása: `humidity`. A régi kliens figyelmen kívül hagyhatja, az új pedig már használhatja. Kockázatos változtatás mező törlése vagy átnevezése, adattípus megváltoztatása (`28` helyett `"28 °C"`), egy korábban választható paraméter kötelezővé tétele, illetve egy státuszkód jelentésének átírása. Ugyanilyen fontos a viselkedési kompatibilitás: hiába marad azonos a JSON alakja, ha például a rendezés vagy a lapozás szabálya megváltozik.

Az API-verzió azt jelzi, melyik szerződés szabályai érvényesek. Elterjedt megoldás a verzió az útvonalban: `https://api.example.com/v1/weather`. Más rendszerek fejlécben, például `Accept: application/vnd.example.v2+json` formában kérik a verziót, vagy dátumalapú verziót használnak. Nincs minden helyzetben tökéletes módszer. Az útvonalban szereplő verzió jól látható és könnyen tanítható; a fejlécalapú megoldás kevésbé zsúfolja az URL-t, de kevésbé feltűnő a kézi kipróbálásnál.

## Életciklus és kivezetés

Új főverzió kiadása nem jelenti azt, hogy a régi azonnal eltűnik. Felelős szolgáltató közzéteszi a változási naplót, jelzi a kivezetési dátumot, átállási útmutatót ad, és egy átmeneti időszakban párhuzamosan működteti a régi végpontot. A „deprecated” jelölés azt üzeni, hogy a funkció még használható, de már nem erre kell új fejlesztést építeni. Az elavult API hirtelen leállítása kiszolgáltatottá teszi az integrálókat; a végtelen ideig fenntartott régi változat viszont biztonsági és karbantartási teher. A verziózás ezért műszaki és együttműködési kérdés egyszerre.

Webhookoknál külön figyelni kell az események sémájára. Ha a `payment.succeeded` üzenet szerkezete változik, azt ugyanúgy dokumentálni és verziózni kell, mint egy lekérdezhető végpont válaszát. Jó gyakorlat, ha az esemény típusa és a séma verziója egyértelműen azonosítható, és a fogadó ismeretlen mezőket biztonságosan figyelmen kívül tud hagyni.

## Mitől jó egy API-dokumentáció?

Az API-dokumentáció nem reklámszöveg, hanem használati szerződés. Először el kell mondania, milyen alappontból (base URL) indulnak a kérések, milyen környezetek vannak – például teszt és éles –, és hogyan történik a hitelesítés. Végpontonként látszania kell a HTTP-metódusnak, az útvonalnak, a paraméterek nevének, típusának, kötelezőségnek és jelentésének. A dokumentációnak konkrét kérés- és válaszpéldát kell mutatnia, beleértve a hibaválaszokat is.

Hasznos egyértelműen jelezni a korlátokat is: hány kérés engedélyezett percenként, meddig érvényes egy token, mekkora lehet a válasz, és hogyan működik a lapozás. Webhook esetén szükséges a regisztráció módja, a lehetséges eseménytípusok listája, az aláírás ellenőrzésének leírása, az időkorlátok és az újrapróbálási szabályok. Egy „200 esetén rendben” mondat önmagában nem dokumentáció: a fejlesztőnek tudnia kell, milyen `400`, `401`, `403`, `404`, `409`, `429` vagy `500` helyzetek fordulhatnak elő, és mit tehet ilyenkor.

Az OpenAPI leíró formátum arra szolgál, hogy a gép is olvashassa ezt a szerződést. Eszközök képesek belőle interaktív dokumentációt, klienskód-vázlatot vagy tesztet készíteni. Ez kényelmes, de nem helyettesíti az emberi magyarázatot: az üzleti fogalmak, a hibák oka és a helyes használat szándéka továbbra is világos szöveget kíván.

## Végigvezetett példa: csomagkövetés értesítése

Egy webáruház szeretné automatikusan kiírni, ha a futár átvette a csomagot. A futárszolgálat dokumentációja szerint a webáruház előbb regisztrál egy `shipment.status_changed` eseményre. Megadja a fogadó URL-t és titkot állít be. Később a futárszolgálat `POST` kérést küld a megadott címre; a törzsben szerepel a küldemény azonosítója, a régi és az új állapot, valamint egy egyedi eseményazonosító.

A webáruház rendszere először ellenőrzi az aláírást. Ezután azt nézi meg, feldolgozta-e már az `evt_912` eseményt. Ha igen, `204 No Content` választ küld: az üzenet kézbesítettnek számít, de nem kell még egyszer állapotot váltani. Ha új esemény, eltárolja az azonosítót, frissíti a rendelést, majd szintén sikeres választ ad. Ha a kérés hibás JSON, `400 Bad Request` válasz lehet helyes; ha átmeneti adatbázishiba van, a `500` jelzi a szolgáltatónak, hogy érdemes újrapróbálnia. A szerződésnek mindezt rögzítenie kell.

## Gyakori tévhitek

- **„Webhookot nem kell hitelesíteni, mert titkos az URL.”** Az URL kiszivároghat naplókból, böngészőelőzményből vagy konfigurációból. Az aláírás ellenőrzése szükséges.
- **„Egy webhook pontosan egyszer érkezik.”** A megbízható kézbesítés újrapróbálással járhat; a fogadónak kezelnie kell a duplikációt.
- **„Az API-ban bármit át lehet nevezni, ha kiadunk egy changelogot.”** A külső kliensek futó rendszerek. A törő változáshoz verzió, átmenet és kommunikáció kell.
- **„A dokumentáció csak a fejlesztők kényelmét szolgálja.”** Pontos dokumentáció nélkül a két rendszer eltérően értelmezheti ugyanazt a kérést, ami üzleti hibává válik.

## Ellenőrző kérdések

1. Miben különbözik a polling és a webhook kezdeményezője, forgalma és késleltetése?
2. Miért szükséges az idempotencia egy webhook fogadásakor?
3. Mondj két visszafelé kompatibilis és két törő API-változást!
4. Milyen információt kell egy webhook-dokumentációnak tartalmaznia a biztonságról és hibakezelésről?
5. Miért nem elegendő egy API-dokumentációban csak a sikeres JSON-választ megmutatni?

## Fogalomtár

- **Webhook:** HTTP-alapú értesítés, amelyet egy szolgáltató esemény hatására küld egy előre megadott fogadó címre.
- **Polling:** rendszeres, kliens által indított lekérdezés annak ellenőrzésére, történt-e változás.
- **Idempotens művelet:** ismételt végrehajtása ugyanazt a végeredményt adja, mint az egyszeri.
- **Visszafelé kompatibilitás:** egy új változat együtt tud működni a korábbi szerződéshez készült klienssel.
- **API-verzió:** az API-szerződés egy azonosítható kiadása.
- **Kivezetés (deprecation):** még elérhető, de jövőben megszűnő funkció hivatalos jelölése.
- **Séma:** egy üzenet vagy válasz szerkezetének, mezőinek és adattípusainak leírása.
