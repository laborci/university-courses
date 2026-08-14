# HTTPS a felhasználó szemszögéből

HTTPS a HTTP biztonságos, TLS-sel védett változata. Amikor a böngésző címsorában lakatot látunk, három alapvető ígéretet kapunk: a böngésző és a szerver közötti adatforgalmat mások nem tudják könnyen elolvasni (**titkosság**), észrevétlenül módosítani (**sértetlenség**), és a böngésző ellenőrizte, hogy a kapcsolat a domainhez kiállított tanúsítvánnyal rendelkező félhez vezet (**hitelesítés**).

A lakat nem minőségi pecsét. Nem azt jelenti, hogy a webáruház tisztességes, hogy a feltöltött fájl veszélytelen, vagy hogy a felhasználó személye biztosan valódi. Csak a kapcsolat biztonsági tulajdonságairól mond valamit. Egy adathalász oldalnak is lehet tökéletesen érvényes HTTPS-tanúsítványa; a hamis domainnév ettől még hamis marad.

## Mi történik a háttérben?

HTTPS-kapcsolat elején a böngésző és a szerver TLS-kézfogást végez. A szerver elküldi tanúsítványát, amely többek között a domainnévhez kötött nyilvános kulcsot tartalmazza. A böngésző ellenőrzi, hogy a tanúsítvány érvényes-e, a kért névre szól-e, és megbízható tanúsítványkiadó láncán keresztül igazolható-e. Ezután közösen olyan ideiglenes titkosítási kulcsot alakítanak ki, amellyel a további HTTP-forgalom védett.

Nem kell a matematika részleteit megjegyezni, de a modell fontos: nem a szerver „elküldi a titkos kulcsát”, és nem a lakat titkosítja a weboldalt. A TLS a szállítási csatornát védi a böngésző és a kiszolgáló között. Ha az alkalmazás maga rosszul kezeli a jelszót vagy túl sok adatot kér, azt a HTTPS nem javítja ki.

## Mit láthat és módosíthat egy támadó HTTP-nél?

Nyílt Wi-Fi-n a titkosítatlan HTTP kérésben látható lehet az URL, a cookie, az űrlapba írt jelszó és a válasz teljes szövege. Egy köztes támadó akár másik bejelentkezési űrlapot vagy reklámot illeszthet be. HTTPS-nél a kapcsolat tartalma titkosított, így ugyanazon a hálózaton ülő másik résztvevő nem tudja egyszerűen kiolvasni vagy átírni.

Ez nem jelent teljes láthatatlanságot: hálózati megfigyelő gyakran látja, melyik IP-címmel kommunikálunk, mennyi adat mozog és mikor. Egyes névfeloldási adatok is látszódhatnak a konfigurációtól függően. A HTTPS célja nem az összes metaadat elrejtése, hanem a webes üzenetek védelme.

## Tanúsítványhibák és helyes reakció

Ha a böngésző figyelmeztet, hogy a kapcsolat nem privát, annak oka lehet lejárt tanúsítvány, hibás rendszeridő, rosszul beállított szerver vagy támadási kísérlet. Ismeretlen, bejelentkezést kérő oldalon ezt nem szabad rutinból „tovább” kattintással megkerülni. Egyetemi vagy munkahelyi rendszer esetén az üzemeltetőnek jelezni kell. Nyilvános Wi-Fi bejelentkező oldala kivételesen okozhat furcsa átirányítást, de jelszót csak akkor adjunk meg, ha a domain és a tanúsítvány rendben van.

## HTTPS és a webes alkalmazás

HTTPS ma nem opcionális kényelmi funkció. A modern böngészők számos képességet – például geolokációt, kamerát vagy egyes tárolási és service worker funkciókat – csak biztonságos környezetben adnak. A `Secure` cookie csak HTTPS-en küldhető. A szerver gyakran HTTP-ről HTTPS-re irányít, és HSTS fejlécet adhat:

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Ez arra kéri a böngészőt, hogy a következő időszakban ne próbálkozzon titkosítatlan HTTP-vel az adott domainnél. Helytelen beállítása komoly elérhetőségi problémát okozhat, ezért csak működő, teljes HTTPS-üzem mellett használható.

## Tévhit és ellenőrző kérdések

- „HTTPS esetén a webhely megbízható.” Nem; a kapcsolat védett, az üzleti tartalom nem feltétlenül.
- „A tanúsítványtól biztonságos a jelszótárolás.” Nem; az adatbázisbeli jelszókezelés külön kérdés.
- „HTTP csak régi weboldalakon fordul elő.” Ma is találkozhatunk vele, de bejelentkezéshez vagy személyes adatokhoz elfogadhatatlan.

1. Melyik három alapvető tulajdonságot adja a TLS?  
2. Mit nem állít a lakat ikon?  
3. Miért kockázatos tanúsítványhibánál belépni?  
4. Miért hasznos a `Secure` cookie-attribútum?

## Fogalomtár

**HTTPS:** HTTP TLS-en keresztül. **TLS:** a kapcsolat titkosságát és sértetlenségét védő protokoll. **Tanúsítvány:** domainhez kötött kriptográfiai igazolás. **Tanúsítványkiadó (CA):** a tanúsítványok hitelességi láncának szereplője. **HSTS:** a HTTPS használatának böngészőoldali kikényszerítését kérő fejléc.
