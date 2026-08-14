# Demonstráció: nyilvános API értelmezése

Egy API használatának első lépése nem a kódírás, hanem a kérdés pontos megfogalmazása és a dokumentáció olvasása. A metódus, az útvonal, a paraméter, a hitelesítés, a státuszkód és a JSON együtt mondja meg, mi történt egy HTTP-kérésben.

## Előkészítés és választott példa

Olyan API-t érdemes választani, amely regisztráció nélkül kipróbálható, stabil dokumentációval rendelkezik, és emberközeli adatot ad. Jó oktatási példa az Open-Meteo időjárási API-ja: a földrajzi szélesség és hosszúság megadásával aktuális időjárási adatot szolgáltat. A demonstrációhoz elegendő a dokumentáció oldala és egy böngésző. Ha az oktató kényelmesebbnek találja, a böngésző címsora helyett használhat API-kipróbáló felületet is; a tanulási cél ugyanaz.

Az órán már az elején fontos kimondani: nem minden nyilvános API működik ugyanígy. Sok API kulcsot, fiókot, fizetési adatot vagy szigorúbb használati feltételeket kér. Éppen ezért a nyílt időjárás-példa csak belépő; utána ugyanazokat a fogalmakat megfigyelhetjük egy olyan dokumentációban is, amely `Authorization` fejlécet ír elő.

## 1. lépés: üzleti kérdésből API-kérés

Indítsunk egy hétköznapi kérdéssel: „Milyen az aktuális idő Budapesten?” Egy ember számára ez elég pontosnak tűnik, egy API számára mégsem. Melyik Budapest? Milyen mértékegységben kérjük a hőmérsékletet? Csak hőmérséklet kell, vagy szél, csapadék és időpont is? Az API-használat lényege, hogy ezeket a homályos részeket a dokumentáció által elfogadott paraméterekké fordítjuk.

Budapest hozzávetőleges koordinátái 47.4979 és 19.0402. Egy lehetséges kérés:

```text
https://api.open-meteo.com/v1/forecast?latitude=47.4979&longitude=19.0402&current=temperature_2m,wind_speed_10m
```

Kérjük meg a hallgatókat, hogy az URL-t még válasz megtekintése nélkül bontsák részekre. A `https` a séma: titkosított HTTP-kapcsolatot várunk. Az `api.open-meteo.com` a gépnév. A `/v1/forecast` az útvonal, amely a szolgáltatás egy erőforrását vagy műveletét jelöli. A kérdőjel után a query string következik; az ampersanddal elválasztott név–érték párok paraméterek. Nem maga az URL „számolja ki” az időjárást: az URL egy szabványos formájú kérésleírás, amelyet a szerver értelmez.

## 2. lépés: a dokumentáció célzott olvasása

A dokumentációban először a végpontot keressük meg. A végpont több mint útvonal: a metódus és az útvonal együtt. A példánkban `GET /v1/forecast`. A `GET` azt fejezi ki, hogy adatot kérünk le, nem módosítjuk a szerver állapotát. Ezzel érdemes összevetni egy későbbi példát, ahol `POST /orders` új megrendelés létrehozását jelentené.

Ezután nézzük a paramétertáblázatot. A jó dokumentáció megadja minden paraméter nevét, típusát, kötelezőségét, alapértelmezését, tartományát és jelentését. A `latitude` és `longitude` számszerű földrajzi koordináta. A `current` a jelenlegi időjárási mezők listája. A név alapján nem szabad találgatni: ha a dokumentáció `wind_speed_10m` mezőt ír, akkor az éppen tíz méteres magasságban értelmezett szélsebességet jelöl, nem általában a „szél” fogalmát.

Kérdezzük meg: mi történik, ha elhagyjuk a `longitude` paramétert? A dokumentáció alapján ez kötelező, ezért a kérés nem értelmezhető teljesen. Mi történik, ha `latitude=alma`? A szerver nem tudja számmá értelmezni. Ezzel már a hibákra készítjük fel a hallgatókat: egy HTTP-kérésben a paraméterek nem szabad szövegek, hanem a szerződés részei.

## 3. lépés: a nyers kérés elképzelése

Amikor a böngésző megnyitja az URL-t, a háttérben közel ilyen kérés jön létre:

```http
GET /v1/forecast?latitude=47.4979&longitude=19.0402&current=temperature_2m,wind_speed_10m HTTP/1.1
Host: api.open-meteo.com
Accept: application/json
User-Agent: Mozilla/5.0 ...
```

A böngésző a fejléc egy részét automatikusan adja hozzá. A `Host` megmondja, melyik kiszolgálót kérjük; az `Accept` jelzi, hogy JSON-választ tudunk feldolgozni; a `User-Agent` a kérő programot azonosítja. A fejléc nem azonos a válasz tartalmával: a fejléc a kéréshez kapcsolódó metaadat, a törzs pedig az adat, ha van. Egy `GET` kérésnek rendszerint nincs törzse; egy `POST` kérésben gyakran éppen ott utazik az elküldött adat.

Itt érdemes a DevTools Network panelt megnyitni. Újratöltés után az oktató kiválasztja az API-kérést, és megmutatja a Request URL-t, Request Methodot, státuszt, Request Headers és Response Headers részt. A felület böngészőnként eltér, a kategóriák gondolata viszont ugyanaz. A cél nem a panelek memorizálása, hanem az, hogy a hallgató felismerje: a dokumentációban olvasott fogalmak a valós hálózati forgalomban is megjelennek.

## 4. lépés: válaszkód és válaszfejlécek

Siker esetén a szerver jellemzően ezt adja:

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Cache-Control: public, max-age=...
```

A `200 OK` nem azt jelenti, hogy „kellemes az idő”, hanem azt, hogy a szerver a kérésnek megfelelően sikeres HTTP-választ adott. Ha a kérés szintaktikailag hibás, `400 Bad Request` érkezhet. Ha az API-kulcs hiányzik vagy hibás, gyakori a `401 Unauthorized` – pontosabban: hitelesítés szükséges vagy sikertelen. Ha a kérő azonosított, de nem jogosult az adott erőforrásra, `403 Forbidden` lehet a válasz. Ismeretlen útvonalra `404 Not Found`, túl sok kérésre `429 Too Many Requests`, belső szerverhibára `500 Internal Server Error` a tipikus jelzés.

Mutassuk meg, hogy a `Content-Type: application/json` fejléc mondja meg, hogyan értelmezendő a törzs. A JSON ember számára olvasható szöveg, de szabályos adatformátum: objektumok kapcsos zárójelek között, tömbök szögletes zárójelek között, a kulcsok idézőjelesek, az értékek lehetnek szövegek, számok, logikai értékek, `null`, objektumok vagy tömbök. A JSON nem JavaScript-kód, és nem is egyenlő „bármilyen adat”-tal.

## 5. lépés: JSON-válasz olvasása

A válasz rövidített alakja lehet például:

```json
{
  "latitude": 47.5,
  "longitude": 19.0,
  "generationtime_ms": 0.08,
  "current_units": {
    "temperature_2m": "°C",
    "wind_speed_10m": "km/h"
  },
  "current": {
    "time": "2026-08-12T10:00",
    "temperature_2m": 26.4,
    "wind_speed_10m": 11.2
  }
}
```

Olvassuk ezt adatmodellként, nem egyetlen szövegtömbként. A legfelső objektumban földrajzi adatok és egy `current` nevű beágyazott objektum van. A `current.temperature_2m` értéke 26,4, de az egységet nem szabad feltételezni: a hozzá tartozó `current_units.temperature_2m` szerint Celsius-fok. A `generationtime_ms` a kiszolgáló által mért előállítási idő; nem azonos a felhasználó által tapasztalt teljes betöltési idővel, amelyben DNS, hálózat és böngésző is szerepel.

Kérjük meg a hallgatókat, hogy fogalmazzanak meg egy mondatot kizárólag a válasz alapján: „A szolgáltató által visszaadott koordinátán, a megadott időpontban a kétméteres hőmérséklet 26,4 °C.” Ez jobb állítás annál, hogy „Budapesten most 26,4 fok van”, mert figyelembe veszi a mérési magasságot, az időpontot és a koordináta-kerekítést. Az adatértelmezés ilyen apró pontosságai a webes rendszerekben is fontosak.

## 6. lépés: hitelesítés bemutatása dokumentációból

Mivel a választott időjárás-API nem feltétlenül kér kulcsot, nyissunk meg röviden egy másik szolgáltatás dokumentációjából egy hitelesített végpontot. Nem kell élő kulcsot használni. A dokumentációban például ezt láthatjuk:

```http
Authorization: Bearer eyJ...
```

Magyarázzuk el, hogy a Bearer token olyan hozzáférési igazolás, amelyet annak bemutatója használhat; ezért titokként kezelendő. Nem kerülhet nyilvános GitHub-repóba, képernyőképbe vagy böngészőoldali, bárki által letölthető forráskódba. Egy API-kulcs is lehet azonosító, de a pontos szerepét mindig a szolgáltató dokumentációja határozza meg. A hitelesítés bizonyítja, ki kérdez; a jogosultság szabályozza, mit tehet.

## 7. lépés: szándékosan hibás kérések

Tanulságosabb egy hibát értelmezni, mint csak a `200 OK`-t nézni. Az oktató változtassa meg a koordinátát érvénytelen szövegre, vagy hagyjon ki egy szükséges paramétert. Ezután a válasz státuszát és törzsét együtt olvassuk. Sok API JSON hibát küld, például:

```json
{
  "error": true,
  "reason": "Invalid latitude parameter"
}
```

A hibaüzenet nem helyettesíti a státuszkódot: a kód gépek és általános HTTP-eszközök számára jelöl kategóriát, a JSON pedig alkalmazásspecifikus részletet ad. Ugyanígy a `404` jelentését sem érdemes automatikusan „nincs ilyen adatként” olvasni; lehet, hogy rossz az útvonal vagy elgépelés történt. A helyes hibakeresési sorrend: dokumentáció, metódus, útvonal, paraméterek, hitelesítés, státuszkód, választest.

## Lezáró beszélgetés

A demonstráció végén térjünk vissza az eredeti kérdéshez. A böngésző egy URL-t nyitott meg, de a háttérben egy szabályosan felépített `GET` kérés ment el. A szerver a dokumentációban rögzített paraméterek szerint értelmezte, válaszkódot, fejléceket és JSON-adatot küldött. Ugyanezt a logikát követi egy mobilalkalmazás, egy szerveroldali program vagy egy parancssori eszköz is. Az API-t nem az teszi „programozói témává”, hogy kódból hívható, hanem az, hogy egy másik rendszer számára szabályos, értelmezhető felületet ad.

## Gyakori tévhitek

- **„Az API URL-je maga az adat.”** Az URL a kérés címe és paraméterezése; az adat a válasz törzsében érkezik.
- **„A 200 azt jelenti, hogy minden üzletileg rendben van.”** Csak a HTTP-kérés sikerét jelzi. Az alkalmazási eredményt a válasz adatai alapján kell értelmezni.
- **„A JSON egy adatbázis.”** A JSON csereformátum; lehet adatbázisból származó adat, de önmagában nem tárolórendszer.
- **„Nyilvános API-hoz nem kell biztonság.”** A nyilvános dokumentáció és az anonim olvasás nem azonos a korlátlan hozzáféréssel. Tokeneket, kvótákat és adatvédelmi szabályokat tiszteletben kell tartani.

## Ellenőrző kérdések

1. Az időjárás-példában mi a metódus, az útvonal és melyek a query paraméterek?
2. Miért a dokumentációból kell megállapítani, kötelező-e egy paraméter?
3. Mit jelent a `Content-Type: application/json` válaszfejléc?
4. Milyen különbség van a `401`, a `403` és a `429` között?
5. A mintaválaszban hol található a hőmérséklet egysége, és miért nem érdemes feltételezni?
6. Miért veszélyes egy `Authorization: Bearer ...` értéket nyilvános repóba tenni?

## Fogalomtár

- **Nyilvános API:** külső fejlesztők számára dokumentáltan elérhető programozási felület; hozzáférése lehet anonim vagy hitelesítéshez kötött.
- **Endpoint (végpont):** egy HTTP-metódus és útvonal által azonosított API-művelet.
- **Query paraméter:** az URL kérdőjel utáni részében megadott név–érték adat.
- **Kérésfejléc:** a HTTP-kérésre vonatkozó metaadat, például elfogadott formátum vagy hitelesítés.
- **Válaszfejléc:** a szerver válaszának metaadata, például formátum, gyorsítótárazás vagy korlát.
- **HTTP-státuszkód:** a kérés feldolgozásának szabványos, számszerű jelzése.
- **JSON:** szabályos, szöveges adatcsere-formátum strukturált adatok számára.
- **Bearer token:** olyan hozzáférési token, amelyet a birtokosa felhasználhat a szolgáltatásnál.
