# Egy webes kérés teljes útja

## Egy hétköznapi művelet, sok szereplővel

Tegyük fel, hogy Anna beírja a böngésző címsorába ezt a címet:

`https://www.pelda.hu/cikkek/web`

Az ember számára ez egyértelmű kérés: szeretné megnyitni a Példa nevű oldal egyik cikklistáját. A hálózat számára azonban a szöveg önmagában még nem elegendő. A böngészőnek ki kell derítenie, milyen szabályok szerint kommunikáljon, melyik gépet érje el, milyen erőforrást kérjen, majd hogyan alakítsa a kapott adatokat látható felületté.

Érdemes úgy képzelni a folyamatot, mint egy könyvtári kérés és kézbesítés láncát. A cím nem maga a könyv: megmondja, melyik intézményhez forduljunk és melyik példányt keressük. A DNS megtalálja a hálózati „címet”, a kapcsolat létrejön, a HTTP a kérés és válasz formanyelve, a böngésző pedig elolvassa a kapott dokumentumot és összeállítja belőle az oldalt. Egy nagy webhely esetében a könyvtáros mögött további rendszerek – gyorsítótárak, terheléselosztók, alkalmazásszerverek és adatbázisok – is dolgozhatnak.

## 1. A cím értelmezése és az első helyi döntések

A böngésző először felbontja az URL részeit. A `https` séma azt jelenti, hogy biztonságos HTTP-kapcsolatot kell használnia. A `www.pelda.hu` a hosztnév, amelyhez hálózati címet kell találni. A `/cikkek/web` az útvonal: a kért erőforrás azonosítója a kiszolgálón belül. Ha a címből nem derül ki külön port, HTTPS esetén szokás szerint a 443-as portot használja.

Mielőtt a böngésző a hálózatra lépne, előfordulhat, hogy már van használható válasza. Ellenőrizheti a böngésző gyorsítótárát: egy nemrég letöltött stíluslap, kép vagy akár dokumentum még érvényes lehet. Ez nem azt jelenti, hogy a böngésző „régi oldalt mutat”; a cache szabályai meghatározhatják, meddig tekinthető frissnek egy válasz, illetve mikor kell a szervertől legalább megerősítést kérni. Egy új navigáció gyakran nem nulláról indul, mégis érdemes a magyarázatban végigvenni a teljes utat.

## 2. Névfeloldás: a domainnévből elérhető hálózati cím

A `www.pelda.hu` ember számára kezelhető név, hálózati kapcsolatot viszont IP-címhez lehet felépíteni. A böngésző ezért DNS-feloldást kér. Ennek eredménye lehet például egy IPv4-cím, mint a `203.0.113.42`, egy IPv6-cím, vagy több cím együtt. A feloldás gyakran gyors, mert az operációs rendszer, a böngésző, a helyi hálózat vagy a DNS-szolgáltató is tárolhat korábbi válaszokat.

Több IP-cím nem rendellenesség. Segítheti a terhelés elosztását és a rendelkezésre állást, illetve CDN-nél földrajzilag vagy hálózatilag közeli belépési ponthoz irányíthatja a látogatót. Fontos következtetés, hogy egy domainnév nem feltétlenül egyetlen fizikai szervert jelent. Ugyanígy egyetlen IP-címen sok domain osztozhat.

## 3. Kapcsolatépítés és a HTTPS bizalmi rétege

Az IP-cím ismeretében a böngésző kapcsolatot kezdeményez. A hagyományos HTTPS-forgalom TCP-re épül: a két végpont egyeztet, hogy mindkettő készen áll az adatcserére. Modern esetben HTTP/3 és QUIC is előfordulhat; a felhasználói lényeg ugyanaz: a böngészőnek megbízható, megfelelően sorrendezett és védett kommunikációs csatornára van szüksége.

HTTPS esetén a kapcsolat nem azonnal HTTP-kéréssel kezdődik. A TLS-kézfogás során a szerver tanúsítványt ad, a böngésző ellenőrzi, hogy az a kért domainre érvényes-e, megbízható hitelesítőtől származik-e, és időben érvényes-e. Ezután egyeztetik a titkosított kommunikáció paramétereit. A titkosítás védi az útközben továbbított adatokat, a tanúsítvány pedig segít abban, hogy a böngésző valóban a várt szolgáltatáshoz kapcsolódjon.

Ha itt hiba történik, a böngésző figyelmeztetést adhat még az oldal betöltése előtt. Ez nem egyszerű „kényelmetlenség”: például nyilvános Wi-Fi-n különösen fontos, hogy egy támadó ne tudja észrevétlenül másik kiszolgálónak kiadni magát.

## 4. A HTTP-kérés elküldése

Amikor a védett kapcsolat használatra kész, a böngésző elküldi a fő dokumentum kérését. A fogalmi alakja például ilyen:

```http
GET /cikkek/web HTTP/2
Host: www.pelda.hu
Accept: text/html
Accept-Language: hu-HU
User-Agent: Mozilla/5.0 ...
Cookie: session=abc123
```

A `GET` azt jelzi, hogy a kliens egy erőforrás lekérését kéri. A `Host` különösen fontos, mert ugyanaz az IP-cím több webhelyet is kiszolgálhat; ebből a szerver tudja, melyik virtuális webhelyhez tartozik a kérés. Az `Accept` a kívánt tartalomtípusokról árulkodik, a `Cookie` pedig – ha van és szabályai engedik – a korábbi látogatásból származó állapotot viheti magával, például a bejelentkezés azonosítóját.

A kérés útjában gyakran nem közvetlenül az alkalmazás áll. CDN adhat vissza már tárolt képet vagy HTML-t, reverse proxy kezelhet titkosítást és útválasztást, terheléselosztó választhat egy háttérszervert. Ezek a rétegek nem „kerülők”: a nagy forgalmú web működésének szokásos részei. A felhasználó szempontjából viszont továbbra is egyetlen URL-hez intézett kérés történik.

## 5. Mit tesz a szerver a kérés mögött?

Egy egyszerű statikus oldalnál a kiszolgáló egy tárolt HTML-fájlt küldhet vissza. Dinamikus webalkalmazásnál a kérés alkalmazáskódhoz érkezik. Az alkalmazás értelmezheti az útvonalat, ellenőrizheti a felhasználó jogosultságát, lekérhet adatot adatbázisból, meghívhat más szolgáltatást, majd HTML-t vagy JSON-t állíthat elő.

Például egy webáruház `/termekek/42` oldala nem feltétlenül egy előre elkészített fájl. A rendszer megnézheti, létezik-e a 42-es termék, elérhető-e a látogató országában, milyen áron jelenjen meg, és milyen ajánlás kapcsolódik hozzá. Az eredmény mégis HTTP-válaszként érkezik vissza.

```http
HTTP/2 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: no-cache
Set-Cookie: session=def456; Secure; HttpOnly

<!doctype html>
<html>...</html>
```

A státuszkód tömören jelzi az eredményt. A `200 OK` sikeres válasz; a `301` vagy `302` átirányítást jelezhet, a `404` azt, hogy nincs ilyen erőforrás, az `500` pedig jellemzően szerveroldali hiba. A fejlécek leírják többek között a törzs formátumát, a cache szabályait és a válaszhoz tartozó egyéb utasításokat. A törzsben itt maga a HTML-dokumentum érkezik.

## 6. Egy HTML-válasz nem az oldal vége, hanem a kezdete

Az első dokumentum beérkezésekor a böngésző olvasni kezdi a HTML-t és felépíti belőle a DOM-ot, a dokumentum belső faalakú modelljét. Közben olyan hivatkozásokat találhat, mint egy stíluslap, JavaScript-fájl, betűtípus vagy kép:

```html
<link rel="stylesheet" href="/styles/site.css">
<script src="/scripts/app.js"></script>
<img src="/kepek/egyetem.jpg" alt="Az egyetem épülete">
```

Mindegyik hivatkozás újabb erőforráskérést indíthat. A modern böngészők ezek közül sokat párhuzamosan töltenek; ezért látható a fejlesztői eszközök Network nézetében gyakran több tucat vagy több száz kérés. Egyes erőforrások mások megjelenítését késleltethetik. A CSS például szükséges ahhoz, hogy az oldal a kívánt kinézettel jelenjen meg, a JavaScript pedig módosíthatja a dokumentumot vagy később további adatokat kérhet az API-tól.

A böngésző a DOM, a CSS-szabályok és az erőforrások alapján számolja ki az elrendezést, majd kirajzolja a képpontokat. Egyetlen látványos weboldal tehát nem egyetlen letöltött fájl, hanem dokumentumok, képek, betűkészletek, stílusok, szkriptek és adatok együttműködése.

## 7. Miért lehet lassú vagy hibás egy oldal?

Ha az oldal lassan jelenik meg, a hiba több helyen is keletkezhet. Lassú lehet a DNS-válasz, magas lehet a hálózati késleltetés, sokáig tarthat a TLS-kapcsolat felépítése, vagy a szerver sokáig dolgozhat a válasz első bájtjáig. Ezután egy nagy kép, túl sok JavaScript vagy blokkoló stíluslap is késleltetheti a használható megjelenést. Nem helyes tehát automatikusan kijelenteni, hogy „lassú az internet”.

Ugyanígy egy hibaoldal is csak egy állomást jelez. A `404` többnyire azt mutatja, hogy a kérés eljutott egy szerverhez, amely nem találta az adott útvonalat. Tanúsítványhiba ezzel szemben a biztonságos kapcsolat létrejötte előtt megállíthatja a folyamatot. A fejlesztői eszközökben a státuszkód, a távoli cím, az idővonal és a válaszfejlécek együtt segítenek eldönteni, hol érdemes tovább keresni.

## Gyakori tévhitek

- **„Az URL egy szerver címe.”** Nem pontosan. Az URL erőforrást azonosít; a domainnév feloldás után akár több, változó hálózati címhez vezethet.
- **„A böngésző egy oldalt tölt le.”** Többnyire egy fő dokumentumot és sok kapcsolódó erőforrást tölt le, gyakran további API-hívásokkal.
- **„A HTTPS csak azt jelenti, hogy van lakat.”** A TLS titkosítást és szerverazonosítást nyújt; a lakat nem garantálja, hogy maga a webhely megbízható üzleti szereplő vagy hibamentes alkalmazás.
- **„A 404 azt jelenti, hogy nincs internet.”** Éppen ellenkezőleg: általában azt jelzi, hogy a szervert elértük, csak a kért erőforrás nem található.

## Ellenőrző kérdések

1. Melyik URL-rész alapján választja ki a böngésző a kommunikáció szabályait, és melyik alapján az erőforrást?
2. Miért van szükség DNS-re, ha a felhasználó már beírta a domainnevet?
3. Milyen két alapvető célt szolgál a TLS egy HTTPS-kapcsolatban?
4. Miért nem biztos, hogy a böngésző közvetlenül az alkalmazásszerverrel kommunikál?
5. Mit jelent a `Content-Type: text/html` fejléc, és mit mond a `200 OK` státuszkód?
6. Mi történik, amikor a böngésző egy `<img>` vagy `<script>` hivatkozást talál a HTML-ben?
7. Sorolj fel három eltérő okot, ami lassú oldalbetöltést okozhat.

## Fogalomtár

- **DNS-feloldás:** a domainnévhez tartozó IP-cím vagy címek megkeresése.
- **Erőforrás:** weben elérhető azonosítható tartalom vagy adat, például HTML, kép, API-válasz vagy stíluslap.
- **HTTP-kérés és HTTP-válasz:** a kliens kérésének, illetve a szerver eredményének szabványos üzenete.
- **TLS:** a HTTPS által használt titkosítási és hitelesítési protokollréteg.
- **Státuszkód:** a HTTP-válasz rövid eredményjelzése, például `200`, `404` vagy `500`.
- **Fejléc:** a HTTP-üzenet metaadatait hordozó név–érték pár, például `Content-Type`.
- **CDN:** földrajzilag elosztott kiszolgálói hálózat, amely közelebbről és gyorsabban adhat tartalmat.
- **DOM:** a HTML-dokumentum böngésző által felépített, programok számára is kezelhető faalakú modellje.
- **Renderelés:** a dokumentum és stílusok képernyőre rajzolásának folyamata.
