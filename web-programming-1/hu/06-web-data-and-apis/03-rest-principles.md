# REST alapelvei

A REST nem keretrendszer és nem JSON-szinonima. Olyan korlátozások együttese, amely a web meglévő fogalmaira – erőforrásokra, egységes felületre, címekre és HTTP-üzenetekre – épít, hogy a rendszerek érthetően és egymástól lazábban függve működhessenek.

## Erőforrások: miről beszél az API?

A REST gondolkodás kiindulópontja az erőforrás. Erőforrás lehet könyv, hallgató, megrendelés, egy tárgy jelentkezése vagy egy keresési eredmény. Nem az adatbázistábla a lényeg, hanem az alkalmazás által értelmezhető fogalom. Egy könyvhez tartozhat például stabil azonosító és elérhetőség:

```text
/books
/books/42
/students/7/enrolments
```

Az URL főnévszerűen nevezi meg az erőforrást vagy gyűjteményt. A `GET /books/42` azt jelenti: kérem a 42-es könyv aktuális reprezentációját. A `DELETE /books/42` ugyanazt az erőforrást célozza, de más HTTP-metódus miatt más szándékot fejez ki. Ez átláthatóbb, mint a `GET /deleteBook?id=42`, amely módosító műveletet rejt egy lekérdezésnek szánt metódusban.

Az URL nem mindig tükrözi a teljes belső adatszerkezetet. A jó URL stabil és a fogyasztó számára jelentéssel bír; nem árulja el szükségtelenül, mely adatbázistábla vagy mikroszolgáltatás szolgálja ki. A kisbetűs, következetes, többnyire többes számú elnevezések olvashatók, de a valódi követelmény a következetesség.

## Egységes felület: metódus és jelentés

A REST a HTTP szabványos metódusaira támaszkodik. A `GET` lekérdezésre való, nem változtathat állapotot. A `POST` gyakran új elem létrehozása egy gyűjteményben vagy olyan művelet indítása, amely nem illeszkedik egyszerű erőforrásfrissítéshez. A `PUT` egy konkrét erőforrás teljes, azonosítható állapotának létrehozását vagy cseréjét jelenti. A `PATCH` részleges módosításra alkalmas. A `DELETE` törlési szándékot jelez. A `HEAD` a `GET`-hez hasonló fejléceket kér választest nélkül, az `OPTIONS` pedig a kommunikációs lehetőségekről adhat tájékoztatást.

A biztonságos (safe) metódus nem módosítja a szerver üzleti állapotát: ilyen a `GET`, `HEAD`, általában `OPTIONS`. Az idempotens metódus ismétlése azonos végső állapothoz vezet: egy azonos `PUT` vagy `DELETE` ismételt elküldése elvileg nem hoz létre újabb változást. A `POST` rendszerint nem idempotens: két azonos rendelés-létrehozás két rendelést eredményezhet. Ezek nem díszítő címkék: befolyásolják a gyorsítótárazást, újrapróbálást és a hibakezelést.

## Reprezentáció: amit ténylegesen átküldünk

Az erőforrás és annak reprezentációja nem azonos. A könyv erőforrás; a JSON-válasz az erőforrás egy adott, pillanatnyi nézete. Más jogosultságú felhasználó eltérő mezőket kaphat, vagy ugyanaz az erőforrás XML-ben is kérhető. A `Content-Type: application/json` fejléc közli, milyen formátumot küld a szerver, az `Accept` azt, mit fogadna el a kliens.

```http
GET /books/42 HTTP/1.1
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

{"id":42,"title":"Tanár úr kérem","available":true}
```

A reprezentációhoz gyakran tartozik metaadat: lapozott gyűjteménynél darabszám, következő oldal, szűrési információ. Ezek nem feltétlenül az „eredeti objektum” mezői, mégis szükségesek ahhoz, hogy a kliens helyesen használja a szolgáltatást.

## Állapotmentesség (statelessness)

A REST egyik korlátozása szerint minden kérésnek önmagában elég információt kell tartalmaznia a feldolgozáshoz. A szerver ne abból találja ki a kérés értelmét, hogy emlékszik egy korábbi, kapcsolatban elküldött üzenetre. Ez nem azt jelenti, hogy a rendszernek nincs állapota: van adatbázis, van bejelentkezett felhasználóhoz kötődő állapot, lehet munkamenet is. A lényeg az, hogy a kérés feldolgozásához szükséges kontextus – például hitelesítő adat és paraméterek – rendelkezésre álljon.

Ez javítja a skálázhatóságot: bármelyik megfelelően konfigurált szerverpéldány kezelheti a következő kérést. Ugyanakkor a tokenek, cookie-k és szerveroldali sessionök miatt a valós rendszerek ritkán „tisztán REST-esek”. A fogalom célja nem vallási tisztaság, hanem a rejtett függőségek csökkentése.

## Státuszkódok mint közös nyelv

Az HTTP-válasz első sora röviden jelzi az eredményt. A `200 OK` sikeres lekérdezés vagy módosítás, `201 Created` új erőforrás létrejötte, gyakran `Location` fejléccel. A `204 No Content` siker, de nincs visszaküldendő törzs. `400 Bad Request` esetén a kérés alakja hibás; `401 Unauthorized` inkább azt jelenti, hogy hitelesítés szükséges vagy sikertelen; `403 Forbidden` esetén a kliens azonosított lehet, de nincs joga; `404 Not Found` esetén az erőforrás nem található; `409 Conflict` ütközést jelölhet; `422 Unprocessable Content` szintaktikailag feldolgozható, de üzletileg érvénytelen adatot.

Az `500 Internal Server Error` váratlan szerverhiba. Nem szabad minden problémára `200 OK`-t küldeni egy `{"error":"..."}` törzzsel, mert az HTTP szabványos jelzéseit így a kliensek, proxyk és megfigyelő eszközök nem tudják helyesen használni. A státuszkód önmagában rövid; a választest adhat részletes, de nem érzékeny hibaüzenetet.

## Végigvezetett példa: könyv létrehozása

Új könyvet a kliens a gyűjteményre küldött `POST` kéréssel hozhat létre:

```http
POST /books HTTP/1.1
Content-Type: application/json
Accept: application/json

{"title":"Tanár úr kérem","author":"Karinthy Frigyes"}
```

A szerver ellenőrzi a bejelentkezést, a jogosultságot és a mezőket, majd létrehozza a `42` azonosítójú erőforrást. Jó válasz lehet:

```http
HTTP/1.1 201 Created
Location: /books/42
Content-Type: application/json

{"id":42,"title":"Tanár úr kérem","author":"Karinthy Frigyes"}
```

Ezután `GET /books/42` lekéri, `PATCH /books/42` például csak az elérhetőségét változtatja, `DELETE /books/42` pedig törlési kérést küld. Ha ugyanazt a `DELETE`-et még egyszer elküldik, az eredmény továbbra is az, hogy a könyv nincs jelen; a konkrét válaszkód lehet `404`, de az idempotencia a végső állapotra vonatkozik.

## HATEOAS: navigáció linkeken keresztül

A REST eredeti, szigorúbb felfogásának része a HATEOAS (Hypermedia As The Engine Of Application State): a szerver a válaszban linkekkel vagy műveleti hivatkozásokkal közli, mi a következő lehetséges lépés. Például:

```json
{
  "id":42,
  "title":"Tanár úr kérem",
  "_links": {
    "self":{"href":"/books/42"},
    "borrow":{"href":"/books/42/loans","method":"POST"}
  }
}
```

Így a kliens kevésbé kényszerül előre beégetett útvonalakra. A gyakorlatban sok „REST API”-nak nevezett szolgáltatás nem valósítja meg teljesen a HATEOAS-t; ettől még lehet jól használható HTTP-alapú API, csak terminológiailag nem teljesíti a REST minden korlátozását.

## Tipikus téves használatok

**Művelet az URL-ben:** `POST /createBook` vagy `GET /deleteBook?id=42` a HTTP metódusait kerülgeti. Kivételes műveletek léteznek – például rendelés visszavonása –, de ezeket is érdemes erőforrásként vagy világosan modellezett állapotátmenetként kezelni.

**Mindenre `POST`:** elvesznek a `GET` gyorsítótárazási és a `PUT`/`DELETE` idempotenciajelzései.

**Minden válasz `200`:** a hiba nem látható szabványosan a köztes és kliensoldali eszközök számára.

**Adatbázis belső modelljének kiöntése:** egy API reprezentációja ne legyen automatikusan minden oszlop és belső kapcsolat. Ez biztonsági és kompatibilitási problémát okozhat.

**„REST = CRUD”:** a CRUD sok helyzetben jó közelítés, de a REST szélesebb architektúrális elv, és nem minden üzleti folyamat modellezhető pusztán négy adatbázis-műveletként.

## Ellenőrző kérdések

1. Mi az erőforrás, és miben különbözik a reprezentációjától?
2. Miért hibás általában a `GET /deleteBook?id=42`?
3. Melyik metódusok idempotensek tipikusan, és ez milyen gyakorlati előnyt ad?
4. Mikor indokolt `201 Created`, és milyen fejléc kapcsolódhat hozzá?
5. Mit jelent a statelessség, és mit nem jelent?
6. Mi a HATEOAS célja?

## Fogalomtár

**REST:** a web egységes felületére építő architektúrális korlátozások együttese.  
**Erőforrás:** az API által azonosítható, értelmezhető fogalom vagy entitás.  
**Reprezentáció:** az erőforrás átküldött formája, például JSON-dokumentum.  
**Idempotencia:** ismételt kérés azonos végső állapotot eredményez.  
**Stateless:** egy kérés tartalmazza a feldolgozásához szükséges kontextust.  
**HATEOAS:** hipermédiás hivatkozásokkal vezetett lehetséges következő műveletek.
