# JSON, XML és strukturált adatcsere

Az adatcsere-formátum nem egyszerű csomagolás. Meghatározza, hogyan választjuk el az adatot a megjelenítésétől, hogyan tudja a fogadó program egyértelműen értelmezni a mezőket, és hogyan maradhatnak együttműködők különböző technológiák mellett.

## A strukturálatlan szöveg problémája

Ha egy szerver ezt válaszolja: `A kölcsönző neve: Kovács Anna, a határidő: 2026. szeptember 12.`, ember számára érthető, de egy programnak bizonytalan. Mi történik, ha a névben vessző van? Hogyan ismeri fel a dátumot más nyelvi környezetben? Hová kerül egy új mező? A strukturált adat ezzel szemben külön névvel és értékkel jelöli az információkat.

```json
{
  "borrower": { "name": "Kovács Anna" },
  "dueDate": "2026-09-12"
}
```

Itt nem a szöveg sorrendjéből kell következtetni: a fogadó tudja, hogy a `dueDate` mező dátum. A felület magyarul, angolul vagy akadálymentes formában is megjelenítheti, miközben a közös adatváltozatlan marad.

## JSON: a web hétköznapi adatnyelve

A JSON a JavaScript Object Notation rövidítése. Történetileg a JavaScript objektumjelöléséhez kötődik, de nyelvfüggetlen adatcsere-formátum: szinte minden korszerű nyelv tudja feldolgozni. A JSON szöveg, de szigorú nyelvtana van. Nem „JavaScript-kód”, ezért például megjegyzések és függvényhívások nem tehetők bele.

Két alapvető összetett szerkezete van. Az objektum kapcsos zárójelek között név–érték párok halmaza; a tömb szögletes zárójelek között rendezett értékek sorozata. Az érték lehet szöveg, szám, logikai érték (`true` vagy `false`), `null`, objektum vagy tömb.

```json
{
  "id": 42,
  "title": "Tanár úr kérem",
  "available": true,
  "tags": ["regény", "magyar"],
  "publisher": null
}
```

A kulcsokat és a szöveges értékeket is kettős idézőjel veszi körül. Az egyes idézőjel, a záró vessző, illetve a `True` és `False` Python-szerű írásmód itt hibás. A JSON ezekben a részletekben szigorú, mert a gépi értelmezésnek egyértelműnek kell lennie.

A JSON egyik korlátja, hogy nincs külön dátum- vagy decimális típusa: a `"2026-09-12"` szöveg, értelmezését a szerződés mondja ki. Ugyanígy a `1` és `1.0` számmá válhat, de nagy egész számok pontossága nyelvtől függően problémás lehet. A gyakorlati következtetés az, hogy az API dokumentációjának nemcsak a mező nevét, hanem jelentését és típusát is rögzítenie kell.

## XML: címkézett, faalakú adat

Az XML (eXtensible Markup Language) szintén strukturált szöveg, de címkéket és beágyazott elemeket használ. Egy hasonló könyvadat így nézhet ki:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<book id="42">
  <title>Tanár úr kérem</title>
  <available>true</available>
  <tags>
    <tag>regény</tag>
    <tag>magyar</tag>
  </tags>
</book>
```

Az XML különösen jól fejez ki dokumentumszerű, hierarchikus adatot. Támogat névtereket, attribútumokat, sémákat és olyan érett eszköztárat, amely sok vállalati, dokumentumkezelési és ipari rendszerben ma is fontos. A nagyobb terjedelem és a bonyolultabb feldolgozás miatt az új, egyszerű webes API-k többsége inkább JSON-t választ, de ebből nem következik, hogy az XML „elavult” vagy hibás.

Az XML esetében figyelni kell a külső entitásokkal kapcsolatos támadásokra (XXE), ha feldolgozó nem biztonságosan van beállítva. Ez is azt mutatja, hogy formátumválasztás mellett a biztonságos feldolgozás is tervezési kérdés.

## Végigvezetett példa: órarend-adatból felület

Egy órarend API-ja a következőt adhatja vissza:

```json
{
  "semester": "2026/27/1",
  "courses": [
    {"code":"WEBPROG1","name":"Webprogramozás I","room":"A-101","startsAt":"2026-09-14T10:00:00+02:00"}
  ]
}
```

A kliens először ellenőrzi, hogy a válasz `Content-Type` fejléce valóban `application/json`. Ezután feldolgozza a szöveget adatszerkezetté, végül az egyes mezőkből létrehozhat felületi elemeket. A `startsAt` ISO 8601 jellegű időbélyeg: nem azt mondja, hogyan írjuk ki a felhasználónak, hanem szabványos, gépileg feldolgozható jelentést hordoz. A magyar felületből így lehet „2026. szeptember 14., 10:00”, angolból más alak, anélkül hogy az API-t módosítanánk.

Ha a szerver egy új `lecturer` mezőt ad hozzá, a régebbi kliens ideális esetben figyelmen kívül hagyja; ha viszont eltűnik vagy átnevezi a `name` mezőt, a kliens könnyen eltörik. Ezért a kompatibilis változtatás és a verziózás az adatcsere fontos része.

## Séma, érvényesség és jelentés

A jól formázott JSON még nem feltétlenül helyes üzletileg. Ez például nyelvtanilag érvényes:

```json
{"room": 101, "startsAt": "majd valamikor"}
```

De lehet, hogy az API szerint a terem szöveg és az időpont kötelezően ISO-formátumú. A séma olyan leírás, amely kijelöli a várt mezőket, típusokat, tartományokat és szerkezetet. JSON esetén erre használható JSON Schema; XML-hez többek között XSD. A séma nem helyettesíti az üzleti szabályokat, de korán megtalál sok félreértést.

## Formátumválasztás

JSON előnye a tömörség, webes természetesség és egyszerű eszköztámogatás. XML erőssége a gazdag dokumentumszerkezet, névterek és régóta kiforrott validálás. CSV alkalmas lehet sík táblázatok exportjára, de nem jó beágyazott szerkezetre és a vesszőket tartalmazó szövegek is körültekintést igényelnek. Bináris formátumok kisebbek vagy gyorsabbak lehetnek, de kevésbé olvashatók hibakereséskor.

Nem csak a méret dönt. Számít az érintett rendszerek öröksége, a hibakereshetőség, a sémaigény, az adat összetettsége és az, hogy a formátum feldolgozása biztonságos legyen.

## Gyakori tévhitek

**„A JSON objektum.”** JSON szöveg; egy program csak feldolgozás után kap belőle saját nyelvének objektumát.

**„A JSON mindig könnyen olvasható.”** Kis példák igen, de egy nagy vagy rosszul modellezett válasz nehezen követhető. A strukturáltság nem azonos az áttekinthetőséggel.

**„A `null` ugyanaz, mint a hiányzó mező.”** Nem feltétlenül. A `null` sok szerződésben azt jelenti: a mező ismert, de jelenleg nincs értéke; a hiányzó mező jelenthet ismeretlen, nem alkalmazható vagy régi kliensnek szánt választ.

## Ellenőrző kérdések

1. Miért megbízhatóbb a strukturált adat egy emberi mondatnál programok közötti kommunikációban?
2. Sorold fel a JSON értéktípusait.
3. Milyen JSON-szintaktikai hibákat találsz ebben: `{name: 'Anna',}`?
4. Milyen adatoknál lehet indokolt XML-t választani?
5. Mit véd egy séma, és mit nem tud helyettünk eldönteni?

## Fogalomtár

**Strukturált adat:** előre értelmezhető mezőkből és kapcsolatokból álló adat.  
**JSON:** könnyű, szöveges, nyelvfüggetlen adatcsere-formátum.  
**XML:** címkéken alapuló, hierarchikus jelölőnyelv adatcseréhez és dokumentumokhoz.  
**Séma:** az adatszerkezet és érvényességi feltételek formális leírása.  
**Serializálás:** programbeli adat átalakítása átvihető formátumra.  
**Deszerializálás:** kapott formátum feldolgozása programbeli adattá.
