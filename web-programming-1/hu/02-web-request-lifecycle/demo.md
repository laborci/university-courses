# Demonstráció: DNS és egy hálózati kérés nyomai

## Cél és előkészítés

Ez a demonstráció azt mutatja meg, hogy egy weboldal megnyitásának fontos lépései láthatók és mérhetők. Nem parancssori vagy böngésző-fejlesztői eszközöket tanítunk önmagukért. Az eszközök itt nagyítóként szolgálnak: ugyanazokat a fogalmakat – domainnév, DNS, HTTPS, HTTP-kérés, válasz, erőforrás és időzítés – tesszük megfigyelhetővé, amelyekről az előadás szólt.

Válasszon az oktató egy stabil, nyilvános HTTPS-oldalt. Jó választás lehet egy egyszerű egyetemi vagy intézményi oldal, amely nem kér bejelentkezést és nem ad személyre szabott tartalmat. Célszerű előre kipróbálni a kiválasztott oldalt az adott terem hálózatán. A példákban a `www.pelda.hu` név szerepel; a tényleges bemutatón ezt cseréljük a választott oldal domainjére.

Kérjük meg a hallgatókat, hogy először csak figyeljenek, és jegyezzenek fel három kérdést: melyik névhez keresünk címet, melyik kérés tölti le a fő dokumentumot, és hány további kérés indul utána. A végén ezekre a saját megfigyelésükből tudnak válaszolni.

## 1. A kiinduló állítás: a domainnév nem IP-cím

Írjuk fel a táblára vagy vetítsük ki ezt az URL-t:

`https://www.pelda.hu/tananyagok`

Kérdezzük meg: „Melyik részt tudná a hálózat közvetlenül használni egy gép elérésére?” A válasz: a `www.pelda.hu` a felhasználónak kényelmes név, de a hálózati forgalomnak IP-címre van szüksége. A `https` a kommunikáció módjára utal, a `/tananyagok` pedig arra, milyen erőforrást kérünk majd. A DNS feladata itt az, hogy a névből elérhető hálózati cím legyen.

Nyissunk terminált, és a rendszernek megfelelő eszközzel kérdezzük le a nevet. macOS-en és Linuxon a következő példa alkalmas:

```text
nslookup www.pelda.hu
```

Windows alatt ugyanígy használható az `nslookup`, ezért nem kell eltérő fogalmi magyarázatot adnunk. Az eredményben mutassuk meg külön a lekérdezéshez használt DNS-szervert és a választ. Ne a pontos számsorokat kérjük számon: egy CDN vagy terheléselosztás miatt ugyanaz a név más időpontban vagy más hálózatról eltérő címeket adhat.

Ha több cím jelenik meg, tegyük fel a kérdést: „Ez hiba vagy inkább lehetőség?” Magyarázzuk el, hogy több cím javíthatja az elérhetőséget, segíthet a forgalom szétosztásában, és egy nagy szolgáltatás közelebbi kiszolgálót választhat. Ha IPv6-cím is szerepel, emeljük ki, hogy ugyanahhoz a névhez IPv4 és IPv6 elérhetőség is tartozhat. A böngésző és az operációs rendszer választja ki, melyik útvonal működik megfelelően.

### Mit érdemes kimondani közben?

„A DNS nem egy központi telefonkönyv, amely mindig egyetlen szerver címét mondja meg. Elosztott névrendszer, válaszai gyorsítótárazhatók, és a szolgáltató tudatosan adhat több címet.” Ez előkészíti azt a későbbi megfigyelést, hogy a böngészőben látható `Remote Address` nem feltétlenül azonos egy alkalmazást futtató géppel: lehet CDN vagy reverse proxy belépési pontja is.

## 2. A böngésző Network nézetének megnyitása

Nyissuk meg a választott oldalt Chromium-alapú böngészőben vagy Firefoxban. A fejlesztői eszközök Network/Hálózat paneljét érdemes még az újratöltés előtt megnyitni. Kapcsoljuk be a napló megőrzését (*Preserve log*), ha az oldal átirányíthat másik címre. Az *Disable cache* opciót csak akkor kapcsoljuk be, ha a fejlesztői eszközök nyitva vannak, és jelezzük, hogy ez mesterséges helyzet: a valós böngészésben a cache sokszor segít gyorsítani.

Ezután töltsük újra az oldalt. A lista sorai nem „hibák” vagy „háttérzajok”: minden sor egy hálózati kérés. A legelső vagy egyik legelső, `document` típusú sor rendszerint a navigáció fő HTML-dokumentuma. Az oldal összes többi eleme – stíluslap, kép, betűtípus, JavaScript, elemző vagy API-hívás – ebből az első válaszból, illetve az utána futó programokból következik.

Ne a sok sor megijesztése legyen a cél. Szűrjünk rá a `Doc` vagy `document` típusra, majd válasszuk ki a fő kérést. Kérjük meg a hallgatókat, hogy azonosítsák a következőket: teljes URL, kérés metódusa, státuszkódja, erőforrástípusa, mérete és időtartama.

## 3. Egy kérés boncolása

A kiválasztott fő dokumentumnál nyissuk meg a Headers/Fejlécek fület. Először a **General** vagy általános részt olvassuk közösen.

- **Request URL:** ez az a konkrét URL, amelyhez a kérés végül elment. Átirányítás után eltérhet az eredetileg beírt címtől.
- **Request Method:** tipikusan `GET`, mert a böngésző dokumentumot kér le.
- **Status Code:** `200` esetén sikeres válasz. `301`, `302`, `307` vagy `308` egy átirányítási lánc eleme lehet.
- **Remote Address:** az a hálózati cím és port, amelyhez a böngésző ténylegesen kapcsolódott. Ezt kapcsoljuk vissza a DNS-megfigyeléshez, de ne ígérjük, hogy betűre azonos lesz a korábban látott címmel.
- **Referrer Policy:** a böngésző milyen szabályok szerint küldhet hivatkozó információt más kérésekhez.

Ezután mutassunk egy-két kérésfejlécet. A `Host` vagy HTTP/2-nél ennek megfelelő célazonosító azért kell, mert egy IP-címen több webhely osztozhat. Az `Accept` azt fejezi ki, milyen tartalomformátumot tud a kliens fogadni. A `Accept-Language` alapján a szerver akár magyar nyelvű változatot is adhat. A `Cookie` csak akkor jelenik meg, ha az adott oldal korábban állapotot helyezett el a böngészőben és annak küldése megengedett; soha ne vetítsünk ki személyes vagy bejelentkezési adatokat. Inkább inkognitó ablakot használjunk, ha kétséges.

A válaszfejlécekből emeljük ki a `Content-Type` értékét. Például `text/html; charset=utf-8` azt mondja, hogy a válasz törzse HTML, UTF-8 karakterkódolással. A `Cache-Control` megmutathatja, hogyan használható később a válasz gyorsítótárból. A `Location` általában átirányításnál érdekes: elmondja, melyik címre kell a böngészőnek továbbmennie. HTTPS-oldalnál a biztonsági fejlécek is megjelenhetnek, de itt elegendő hangsúlyozni, hogy a fejléc nem a tartalom része: a kommunikációról szóló utasítás és leírás.

## 4. Az idővonal értelmezése

Nyissuk meg a Timing/Időzítés fület. A pontos elnevezés böngészőnként változhat, de az alapjelenségek hasonlóak. Itt válik láthatóvá, hogy a „betöltési idő” nem egyetlen szám.

- **Queueing/Stalled:** a kérés várakozik, például mert a böngésző erőforrást oszt be vagy kapcsolatot keres.
- **DNS lookup:** a névhez cím keresése; cache-ből ez akár kimaradhat vagy nullának látszhat.
- **Initial connection:** a hálózati kapcsolat felépítése.
- **SSL/TLS:** a biztonságos kapcsolat egyeztetése, ha új HTTPS-kapcsolat szükséges.
- **Waiting / TTFB:** a kérés elküldése után az első válaszbájtig eltelt idő. Ebben lehet hálózati út és szerveroldali feldolgozás is.
- **Content download:** a válasz adatainak tényleges letöltése.

Mutassunk rá, hogy egy rövid letöltési szakasz nem bizonyít gyors szervert: lehet, hogy a `Waiting` hosszú. Fordítva, egy nagy kép sokáig tölthető le akkor is, ha a szerver azonnal elkezdi küldeni. Ez az egyik legfontosabb diagnosztikai tanulság: a mérés összetevőit kell értelmezni, nem egyetlen számot idézni.

Ha biztonságosan elvégezhető, töltsük újra az oldalt egyszer cache-sel, majd egyszer kikapcsolt cache-sel. A két eredményben keressük a különbséget: a gyorsítótárazott elem esetleg nem is indít teljes hálózati kérést, vagy `304 Not Modified` válasszal csak ellenőrzés történik. Jelezzük, hogy a `304` nem hiba: azt jelenti, a böngésző meglévő példánya tovább használható.

## 5. A fő dokumentumtól a teljes oldalhoz

Térjünk vissza a kéréslistához, és mutassunk egy `stylesheet` és egy `img` típusú sort. Kérdezzük meg, miért jelent meg ezeknek a címe, amikor csak egy URL-t írtunk be. A válasz: a fő HTML-dokumentum hivatkozik rájuk. Egy `script` típusú kérés esetén pedig a JavaScript még további adatokat is kérhet később egy API-tól.

Hasonlítsuk össze a két válasz `Content-Type` fejlécét. A stíluslapnál `text/css`, a képnél például `image/jpeg`, `image/png` vagy `image/webp` várható. A böngésző nem kizárólag a fájlnév alapján dönt: a szerver által küldött tartalomtípus is része annak, hogyan értelmezze a választ. A képkérés sokkal nagyobb lehet, de ettől nem „rossz”; az a kérdés, hogy a mérete indokolt-e, megfelelően van-e tömörítve, és akadályozza-e a fontos tartalom megjelenését.

## Javasolt lezárás és hallgatói feladat

A végén kérjük meg a hallgatókat, hogy válasszanak egy másik nyilvános oldalt, és 5–10 perc alatt készítsenek rövid megfigyelési jegyzetet. Nem kell kódot írniuk. A jegyzetben szerepeljen a fő `document` kérés URL-je, metódusa, státuszkódja, egy kérés- és egy válaszfejléce, valamint egy kép vagy stíluslap tartalomtípusa. Egy mondatban írják le azt is, miért nem következik egy lassú oldalból automatikusan, hogy a felhasználó internetkapcsolata rossz.

## Gyakori tévhitek és oktatói reakciók

- **„A Remote Address a weboldal szervere.”** Pontosabban a tényleges hálózati partner. Lehet CDN, proxy vagy terheléselosztó is.
- **„Minden kérésnek van DNS-szakasza.”** Nem feltétlenül: a DNS-válasz és hálózati kapcsolat is újrahasznosítható.
- **„A `304` hiba, mert nem `200`.”** Nem: gyorsítótár-újraérvényesítés, amely azt jelzi, hogy a korábbi tartalom változatlan.
- **„A Network lista minden sora egy külön megnyitott weboldal.”** Minden sor kérés, de többségük az egyetlen megnyitott oldal valamely erőforrásához tartozik.

## Ellenőrző kérdések

1. Melyik adatot keresi meg a DNS, és miért nem elegendő ehhez a domainnév?
2. Mit jelöl a Network listában a `document` típusú kérés?
3. Mire használhatjuk a `Remote Address` értékét, és milyen következtetést nem szabad belőle automatikusan levonni?
4. Mi a különbség a `Waiting (TTFB)` és a `Content download` között?
5. Mit jelent a `Content-Type: image/webp` válaszfejléc?
6. Miért tekinthető a `304 Not Modified` teljesen normális válasznak?

## Fogalomtár

- **Network panel:** a böngésző fejlesztői eszközének nézete, amely hálózati kéréseket és válaszokat listáz.
- **Remote Address:** a böngésző tényleges hálózati partnerének IP-címe és portja.
- **TTFB (Time To First Byte):** a kérés elküldése és a válasz első bájtjának megérkezése közötti idő.
- **Kérésfejléc:** a kliens által küldött, a kérés jellemzőit közlő HTTP-metaadat.
- **Válaszfejléc:** a szerver válaszához tartozó metaadat, például a tartalomtípus vagy cache-szabály.
- **Gyorsítótár (cache):** korábban megszerzett adatok ideiglenes tárolása, hogy ne kelljen mindent újra letölteni.
- **Átirányítás:** olyan HTTP-válasz, amely egy másik URL felkeresésére utasítja a klienst.
