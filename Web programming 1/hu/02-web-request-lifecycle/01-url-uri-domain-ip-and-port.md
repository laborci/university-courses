# URL, URI, domainnév, IP-cím és port

Egy URL nem pusztán „egy link”. Olyan cím, amely több különböző szinten ad útmutatást: milyen kommunikációs szabályt használjunk, melyik szolgáltatót keressük, milyen hálózati végpontot érjünk el, és a szolgáltatás melyik erőforrását kérjük.

Amikor egy hallgató a böngésző címsorába beírja, hogy `https://tananyag.example.edu/kurzusok/webprog1`, nagyon sok minden történik még azelőtt, hogy egyetlen betű megjelenne az oldalon. A böngészőnek először értelmeznie kell a címet. Meg kell értenie, hogy a kapcsolat milyen szabályai szerint induljon, melyik gépet vagy szolgáltatást kell megkeresnie, és pontosan melyik erőforrást kéri tőle. Ezeket az információkat az URL különböző részei hordozzák.

Az **URI** (Uniform Resource Identifier) erőforrások azonosítására szolgáló általános fogalom. Az erőforrás lehet dokumentum, kép, videó, felhasználói profil, API-végpont vagy akár egy absztrakt fogalom is. Az **URL** (Uniform Resource Locator) az URI egy gyakori típusa: nemcsak azonosítja az erőforrást, hanem azt is megmondja, hogyan és hol érhető el. A weben a mindennapi használatban a kettőt gyakran felcseréljük, de hasznos tudni, hogy az URL az elérésre is utal.

Vizsgáljuk meg ezt a címet:

```text
https://www.example.org:443/katalogus/konyvek?tema=web&oldal=2#ajanlatok
```

Az `https` a **séma** vagy protokolljelölő. Azt mondja a böngészőnek, hogy a HTTP protokoll biztonságos, TLS-sel védett változatát használja. A `www.example.org` a **hostnév**. Ez az a név, amelyet a DNS segítségével IP-címre kell fordítani. A `:443` a **port**; HTTPS esetén a 443 alapértelmezett, ezért a felhasználó általában nem is látja. A `/katalogus/konyvek` az **útvonal**, amely az erőforrás logikai helyét jelöli. A kérdőjel utáni `tema=web&oldal=2` a **lekérdezési paraméterek** része: további adatokat ad a szervernek. A `#ajanlatok` az úgynevezett fragmentum; ezt tipikusan már a böngésző kezeli, amikor egy dokumentum adott részére ugrik.

### Domainnév: emberi név a hálózaton

Az emberek neveket tudnak jól megjegyezni. A `www.example.org` beszédes, könnyen kimondható és a szervezethez köthető. A hálózati eszközök ezzel szemben IP-címek alapján kommunikálnak. A domainnév ezért olyan, mint egy névjegyben szereplő név, az IP-cím pedig a tényleges elérhetőséghez szükséges technikai cím.

Egy domainnév nem azonos egyetlen weboldallal. A `example.edu` név alatt lehet főoldal, levelezés, tananyagkezelő, több aldomain és számos API is. Ugyanígy egyetlen webes szolgáltatás több domainnéven vagy több IP-címen is elérhető lehet. Ennek oka lehet terheléselosztás, földrajzi kiszolgálás, biztonsági elválasztás vagy egyszerűen történeti örökség.

A domainnevek hierarchikusak. A `tananyag.example.edu` névben az `edu` felső szintű tartomány, az `example` egy bejegyzett név ezen belül, a `tananyag` pedig aldomain. A pontok nem mappákat jelentenek, hanem a névfeloldási rendszerben kialakított névteret. A `/kurzusok` ezzel szemben már az adott webes szolgáltatás által értelmezett útvonal.

### IP-cím: hálózati elérhetőség

Az **IP-cím** hálózati végpont azonosítója. IPv4 esetén például `203.0.113.10`, IPv6 esetén egy hosszabb, hexadecimális alakú cím lehet. A böngésző DNS-feloldás után az IP-cím használatával tud hálózati kapcsolatot kezdeményezni.

Fontos, hogy az IP-cím önmagában nem mondja meg, melyik weboldalt szeretnénk elérni. Ugyanazon az IP-címen több domain is működhet. HTTPS-kapcsolatnál a böngésző a kapcsolat felépítésekor is jelzi, melyik domainhez szeretne kapcsolódni, a HTTP-kérésben pedig a `Host` fejléc is azonosítja a kívánt szolgáltatást. Ez teszi lehetővé, hogy egyetlen hálózati cím mögött sok különböző webhely legyen.

### Port: szolgáltatás kiválasztása

Egy számítógépen sok hálózati program futhat egyszerre. Az IP-cím a gépet vagy hálózati interfészt közelíti meg, a **port** azt jelöli, melyik szolgáltatáshoz akarunk kapcsolódni. A böngésző HTTPS-nél hagyományosan a 443-as, HTTP-nél a 80-as portot használja. Emiatt a címben ezek többnyire rejtve maradnak.

Ha a szolgáltatás nem az alapértelmezett porton fut, a portot ki kell írni: `http://localhost:3000/`. A helyi fejlesztésnél ez gyakori. Ilyenkor a `localhost` a saját gépre utal, a `3000` pedig például egy helyben futó Node.js-alkalmazás portja. Ez jó példa arra, hogy a webes szolgáltatás nem feltétlenül „valahol az interneten” található; ugyanazok az elvek a saját gépen is működnek.

### Útvonal, paraméter és fragmentum

Az útvonalat nem szabad automatikusan a szerver fájlrendszerében lévő könyvtárnak tekinteni. A `/termekek/42` útvonal lehet tényleges fájl helye, de gyakrabban csak jelzés az alkalmazásnak: „a 42-es azonosítójú terméket szeretném”. A szerver vagy alkalmazás dönti el, hogyan értelmezi.

A lekérdezési paraméterek további információt adnak át. Egy keresőnél a `?q=webprogramozás` jelzi a keresett kifejezést, egy listánál az `?oldal=2` a második oldalt kérheti. Ezek nem feltétlenül bizalmasak: az URL részeként bekerülhetnek böngészési előzményekbe, naplókba és megosztott linkekbe. Jelszót, személyes azonosítót vagy más érzékeny adatot ezért nem helyes lekérdezési paraméterben küldeni.

A fragmentum, például `#elerhetoseg`, jellemzően nem jut el a szerverhez. A böngésző használja arra, hogy a már letöltött dokumentum megfelelő részére ugorjon. Emiatt ugyanazon HTML-oldal több különböző fragmentummal is hivatkozható anélkül, hogy a szervernek külön oldalt kellene készítenie.

## Végigvezetett példa

Tegyük fel, hogy a felhasználó megnyitja ezt a címet:

```text
https://tananyag.example.edu:443/kurzus?id=17#feladatok
```

1. A böngésző felismeri a `https` sémát, ezért titkosított kapcsolatot fog építeni.
2. A `tananyag.example.edu` névhez DNS-en keresztül IP-címet keres.
3. Az így kapott IP-cím 443-as portjához kapcsolódik.
4. HTTP-kérést küld a `/kurzus?id=17` erőforrásért.
5. A szerver azonosítja a kért kurzust, és HTML-választ küld.
6. A böngésző megjeleníti az oldalt, majd a `#feladatok` alapján annak megfelelő részéhez görget.

Egyetlen címben tehát együtt jelenik meg az alkalmazási, a névfeloldási, a hálózati és a böngészőoldali értelmezés.

## Gyakori félreértések

| Állítás | Pontosítás |
| --- | --- |
| „A domainnév maga a szerver.” | A domainnév név; DNS-en keresztül egy vagy több hálózati címhez vezethet. |
| „Az útvonal mindig fájl a szerveren.” | Modern webalkalmazásokban gyakran csak alkalmazás által értelmezett logikai útvonal. |
| „A `#` utáni rész titkos, mert nem látszik a szervernek.” | Nem titkos: a felhasználó és a böngésző továbbra is látja, csak jellemzően nem küldődik el a HTTP-kérésben. |
| „A port csak fejlesztéskor fontos.” | Minden hálózati kapcsolat portot használ, csak az alapértelmezett portok többnyire rejtve maradnak. |

## Ellenőrző kérdések

1. Melyik részben jelöljük, hogy HTTPS-t használunk?
2. Mi a DNS szerepe a domainnév és az IP-cím kapcsolatában?
3. Miért lehet több weboldal ugyanazon az IP-címen?
4. Miért nem helyes jelszót lekérdezési paraméterben átadni?
5. Mi a különbség a `/fejezetek` és a `#feladatok` rész között?

## Fogalomtár

- **URI:** erőforrás általános azonosítója.
- **URL:** olyan URI, amely az erőforrás elérésének helyét és módját is megadja.
- **Séma:** a kommunikáció módját jelölő URL-rész, például `https`.
- **Hostnév:** a cél szolgáltatás neve az URL-ben.
- **Domainnév:** hierarchikus, emberbarát hálózati név.
- **IP-cím:** hálózati végpont számszerű címe.
- **Port:** egy gépen belüli hálózati szolgáltatás azonosítója.
- **Lekérdezési paraméter:** az URL-ben átadott kiegészítő adat.
- **Fragmentum:** dokumentumon belüli helyre mutató URL-rész.
