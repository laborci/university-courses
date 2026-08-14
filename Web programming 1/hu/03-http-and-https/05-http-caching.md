# HTTP cache-elés

A cache olyan ideiglenes, újrahasznosítható másolat, amelyet azért tartunk meg, hogy ugyanazt az adatot ne kelljen minden alkalommal újra lekérni vagy kiszámolni. A weben ez nem puszta gyorsítás: csökkenti a szerver terhelését, az adatforgalmat, a költséget és a felhasználó várakozását. Ugyanakkor a cache mindig egy kompromisszum a frissesség és a hatékonyság között.

Képzeljünk el egy egyetemi oldalhoz tartozó `logo.svg` fájlt. Ritkán változik, mégis minden oldal betöltésekor szükség van rá. Ésszerű, hogy a böngésző egy ideig a korábban letöltött példányt használja. Egy vizsgajegy-listánál viszont más a helyzet: elavult másolat megjelenítése félrevezető lehet. A cache-szabályok éppen azt közlik, meddig és milyen feltételekkel elfogadható a korábbi válasz.

## Hol lehet cache?

A böngésző saját gyorsítótára a legközelebbi. Létezhet szervezeti proxy, internetszolgáltatói vagy vállalati cache, CDN-peremkiszolgáló és magán a szerveren alkalmazásszintű cache is. HTTP szempontból fontos, hogy a válasz fejlécei a köztes szereplőknek is irányt mutathatnak. Egy személyes fiókoldal válasza nem kerülhet közös, publikus cache-be; egy nyilvános kép igen.

## Cache-Control: a fő utasítás

```http
Cache-Control: public, max-age=86400
```

Ez azt jelenti, hogy a válasz egy napig frissnek tekinthető, és megosztott cache is tárolhatja. A `max-age` másodpercben értendő. Statikus, verziózott fájlokra akár nagyon hosszú érték is helyes:

```http
Cache-Control: public, max-age=31536000, immutable
```

Az `immutable` azt sugallja, hogy a friss időszakban a fájl biztosan nem változik. Ez csak akkor igaz, ha változáskor új URL-t használunk, például `app.4f8c2.js`-t, nem írjuk felül csendben az `app.js` tartalmát.

Érzékeny válasz esetén:

```http
Cache-Control: no-store
```

Ez kéri, hogy ne tároljanak másolatot. A `no-cache` neve megtévesztő: nem azt jelenti, hogy tilos tárolni, hanem azt, hogy használat előtt újra kell érvényesíteni a szerverrel. A `private` a böngészőnek még engedhet tárolást, megosztott cache-nek nem. A `public` megosztott cache számára is megengedi.

## Friss vagy újraellenőrzött?

Ha a `max-age` idő még nem telt le, a cache „friss” választ adhat a szerver megkérdezése nélkül. Ha lejárt, nem kell feltétlenül teljes fájlt letölteni. A szerver adhat **ETag** azonosítót:

```http
ETag: "v7-8a9c"
```

A következő kérésben a kliens megkérdezi:

```http
If-None-Match: "v7-8a9c"
```

Ha a tartalom változatlan, a válasz `304 Not Modified`, törzs nélkül. A kliens megtartja saját példányát. Hasonló, de kevésbé pontos mechanizmus a `Last-Modified` és az `If-Modified-Since`. Az ETag tartalmi vagy verzióazonosító, a dátum pedig időbélyeg; mindkettő a feltételes kérés alapja.

## Miért látok mégis régi oldalt?

Lehet, hogy a böngésző szabályosan a megengedett cache-választ használja. Lehet, hogy CDN-ben maradt régi példány, vagy egy szolgáltatóoldali alkalmazás cache-elt adatot ad. Fejlesztéskor a „hard refresh” legfeljebb a helyi böngésző-cache viselkedését változtatja, nem oldja meg a rossz szerverfejlécet vagy CDN-konfigurációt. A Network nézetben érdemes megnézni a válasz `Cache-Control`, `Age`, `ETag` fejléceit és azt, érkezett-e egyáltalán hálózati kérés.

## Tervezési példa

Egy hírportál képei és verziózott JavaScript fájljai hosszú ideig cache-elhetők. A címlap HTML-je rövid ideig lehet friss, mert gyakran változik. Egy bejelentkezett hallgató személyes órarendje `private, no-cache` lehet: tárolható a saját böngészőben, de minden használat előtt ellenőriztetjük. Banki tranzakciós válasznál indokolt lehet a `no-store`.

## Tévhit és ellenőrző kérdések

Nem igaz, hogy „a cache mindig rossz, mert régi adatot ad”; nélküle a web jelentősen lassabb és drágább lenne. Az sem igaz, hogy a cache csak böngészőfunkció. A kérdés a megfelelő frissességi szabály.

1. Mi a különbség `no-cache` és `no-store` között?  
2. Miért jó a fájlnévbe épített verzióazonosító?  
3. Mit nyerünk a `304 Not Modified` válasszal?  
4. Miért veszélyes személyes választ `public` cache-be engedni?

## Fogalomtár

**Cache:** újrahasznosítható válaszmásolat. **Frissesség:** meddig használható kérdezés nélkül. **Újraérvényesítés:** a korábbi másolat ellenőrzése a szervernél. **ETag:** a válasz verzióját/tartalmát jelző azonosító. **CDN:** földrajzilag elosztott tartalomkiszolgáló hálózat.
