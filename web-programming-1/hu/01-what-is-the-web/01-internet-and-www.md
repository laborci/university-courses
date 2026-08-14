# Internet és World Wide Web viszonya

Az **internet** egymással összekapcsolt számítógép-hálózatok globális infrastruktúrája. A **World Wide Web** ennek az infrastruktúrának egyik, szabványokra épülő szolgáltatása: böngészőkkel elérhető, hivatkozásokkal összekötött erőforrások rendszere.

Röviden: az internet az úthálózat; a web az egyik forgalom, amely ezen az úthálózaton közlekedik.

Képzeljünk el egy hallgatót, aki reggel megnézi az egyetemi levelezését, majd megnyitja a tanulmányi rendszert, végül videóhívásba kapcsolódik. A hétköznapi nyelvben mindháromra azt mondaná, hogy „internetezik”. Informatikai szempontból azonban különböző szolgáltatásokat használ: a levelezés, a webes felület és a videóhívás ugyanazt a globális hálózati infrastruktúrát veszi igénybe, de nem ugyanazokkal a szabályokkal és nem ugyanazzal a céllal működik. E különbség megértése végigkíséri a teljes tárgyat.

### 1. Az internet infrastruktúra

Az internet nem egyetlen központi rendszer, nem egyetlen cég tulajdona, és nem azonos a böngészőben megjelenő oldalakkal. Hálózatok hálózata: egyetemek, cégek, internetszolgáltatók, adatközpontok, otthoni hálózatok és mobileszközök kapcsolódnak össze közös kommunikációs szabályok alapján.

Az internet alapvető feladata az, hogy adatcsomagokat juttasson el egy végponttól egy másikig. Ehhez címzésre, útválasztásra és közös protokollokra van szükség. A felhasználó ebből tipikusan csak annyit lát, hogy a telefonja vagy számítógépe „kapcsolódik az internethez”, de a háttérben számos hálózati szereplő működik együtt.

Az internethez tartozik például:

- a fizikai kapcsolat: optikai kábelek, rézkábelek, mobilhálózatok, Wi-Fi és műholdas kapcsolatok;
- a hálózati eszközök: routerek, switchek és tűzfalak;
- a címzés és útválasztás: IP-címek és útválasztási szabályok;
- a kommunikációs protokollok: például IP, TCP és UDP.

Ezek önmagukban még nem mondják meg, hogy milyen alkalmazást használunk. Ugyanazon az internetkapcsolaton keresztül működhet levelezés, videóhívás, fájlátvitel, online játék és weboldal is.

### 2. A World Wide Web szolgáltatás az interneten

A World Wide Web, röviden web vagy WWW, olyan információs rendszer, amely az internetre épül. A weben dokumentumokat, képeket, videókat, alkalmazásokat és más erőforrásokat érünk el címek – jellemzően URL-ek – segítségével. Az erőforrások közötti kapcsolatot a hivatkozások, vagyis linkek adják.

A web működéséhez három alapvető, nyílt szabvány különösen fontos:

- **URL:** az erőforrás címe, például `https://example.org/tananyag`;
- **HTTP vagy HTTPS:** a böngésző és a szerver közötti kommunikáció szabályrendszere;
- **HTML:** a webes dokumentum szerkezetének leírására szolgáló nyelv.

Amikor a hallgató beír egy címet a böngészőbe, a böngésző az internet infrastruktúráján keresztül megkeresi a megfelelő szervert, HTTP-kérést küld neki, majd a kapott választ megjeleníti. A válasz gyakran HTML-dokumentum, amely további erőforrásokra – stíluslapokra, képekre, betűtípusokra vagy programkódokra – hivatkozik.

### 3. Miért keverjük össze a két fogalmat?

A hétköznapi nyelvben a „felmegyek az internetre” gyakran azt jelenti, hogy megnyitunk egy weboldalt. Ez érthető, mert a web a legtöbb felhasználó számára a leglátványosabb internetszolgáltatás. Informatikai szempontból azonban érdemes pontosan fogalmazni.

Ha például egy weboldal nem töltődik be, abból még nem következik, hogy „nincs internet”. Lehet, hogy az internetkapcsolat működik, de a webkiszolgáló hibás, a domainnév nem oldható fel, vagy a webes alkalmazás túlterhelt. Hasonlóan: egy e-mail elküldése vagy egy online játék használata internetes tevékenység, de nem feltétlenül webhasználat.

### 4. Szolgáltatások az interneten, a weben kívül

Az alábbiak internetes szolgáltatások, de nem a World Wide Web részei:

| Szolgáltatás | Mire használjuk? | Példa protokoll vagy technológia |
| --- | --- | --- |
| E-mail | Levelezés | SMTP, IMAP |
| Fájltovábbítás | Fájlok átvitele | SFTP, SCP |
| Névtárszolgáltatás | Domainnév feloldása IP-címre | DNS |
| Távoli gépelérés | Másik számítógép kezelése | SSH |
| Online játék | Valós idejű kommunikáció | Egyedi alkalmazásprotokollok, UDP |

Ezek használhatják ugyanazt a hálózati infrastruktúrát, de eltérő céljuk, protokolljuk és kliensprogramjuk van. A web tipikus kliensprogramja a böngésző; levelezéshez levelezőprogramot, távoli eléréshez terminált vagy más speciális klienst használunk.

### 5. A böngésző nem maga az internet

A böngésző egy kliensalkalmazás. Elsősorban webes erőforrások letöltésére, értelmezésére és megjelenítésére szolgál. Nem azonos az internettel, ahogyan egy videólejátszó sem azonos magával a videófájllal vagy azzal a hálózattal, amelyen keresztül megérkezett.

Ez a különbség a későbbi témákhoz is fontos:

- a DNS és az IP-címzés az internetes infrastruktúra része;
- a HTTP a web kommunikációs modelljének központi eleme;
- a HTML, CSS és JavaScript a böngésző által feldolgozott webes technológiák;
- a cookie-k, a webes tárolók és a böngészőbiztonsági modell a webes kliens működéséhez kötődnek.

## Példa: egy URL megnyitása

Tegyük fel, hogy a felhasználó megnyitja ezt a címet: `https://www.example.org/katalogus`.

1. A böngészőnek először meg kell tudnia, melyik IP-címhez tartozik a `www.example.org` név. Ez DNS-feloldás.
2. Ezután az internet hálózatain keresztül kapcsolatot létesít a megfelelő szerverrel.
3. A böngésző HTTPS-kérést küld a `/katalogus` erőforrásért.
4. A szerver választ küld, például egy HTML-oldalt és a hozzá tartozó további erőforrásokat.
5. A böngésző feldolgozza és megjeleníti a választ.

Ebben a folyamatban az 1–2. lépés elsősorban az internet infrastruktúrájához, a 3–5. lépés pedig a web működéséhez kapcsolódik.

## Gyakori félreértések

| Állítás | Pontosítás |
| --- | --- |
| „A web és az internet ugyanaz.” | A web az internet egyik szolgáltatása. |
| „Ha a böngésző nem tölt be egy oldalt, nincs internet.” | A hiba lehet a szervernél, a DNS-nél vagy magában a webalkalmazásban is. |
| „A Google az internet.” | A Google egy szolgáltató; keresője és sok más szolgáltatása az internet infrastruktúráját használja. |
| „Minden, ami online van, weboldal.” | E-mail, távoli elérés, online játék vagy fájlátvitel is használhatja az internetet web nélkül. |

## Oktatói kérdések

1. Használható-e az internet web nélkül? Mondjatok példát!
2. Elérhető lehet-e egy weboldal akkor is, ha egy levelezőszerver nem működik?
3. Miért hasznos, ha egy informatikus különválasztja az infrastruktúra és az alkalmazási szolgáltatás fogalmát?
4. A mobilalkalmazások internetet vagy webet használnak? Milyen esetekben mindkettőt?

## Rövid ellenőrző feladat

Párokban soroljátok be az alábbiakat az **internet infrastruktúrája**, a **World Wide Web**, illetve az **egyéb internetszolgáltatás** kategóriák valamelyikébe: DNS, HTML-oldal, e-mail, HTTPS-kérés, IP-cím, SSH, böngésző, router.

## Fogalomtár

- **Internet:** globálisan összekapcsolt számítógép-hálózatok rendszere.
- **World Wide Web (WWW):** hivatkozásokkal összekötött, böngészőből elérhető erőforrások rendszere az interneten.
- **Böngésző:** a webes erőforrások letöltésére és megjelenítésére szolgáló kliensalkalmazás.
- **Szerver:** olyan rendszer, amely hálózaton keresztül szolgáltatást vagy erőforrást nyújt más rendszereknek.
- **Protokoll:** kommunikációs szabályok közösen elfogadott rendszere.
- **URL:** egy webes erőforrás címe.
