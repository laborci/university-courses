# DNS-feloldás

A DNS az internet elosztott névjegyzéke. A felhasználók beszédes neveket használnak, a hálózati kommunikáció IP-címekre épül; a DNS teremti meg a kapcsolatot a kettő között.

Egy domainnév, például `tananyag.example.edu`, a felhasználó számára értelmes címke. A hálózati eszközök azonban nem tudnak ehhez a névhez közvetlenül csomagot küldeni: IP-címre van szükségük. A Domain Name System, röviden DNS, azt a feladatot látja el, hogy a névhez megtalálja a hozzá tartozó hálózati információt.

Érdemes a DNS-re nem egyetlen hatalmas adatbázisként, hanem sok egymással együttműködő névszerver rendszerként gondolni. Nem lenne célszerű, ha minden internetes név egyetlen központi számítógépen szerepelne: ez lassú lenne, sérülékeny, és egyetlen meghibásodás az egész internetet érintené. A DNS ezért elosztott és hierarchikus.

### A név hierarchiája

A `tananyag.example.edu` név jobbról balra olvasva egy hierarchiát jelöl. Az `edu` felső szintű tartomány. Az `example` egy bejegyzett név ezen belül. A `tananyag` pedig az intézmény által kezelt aldomain. A DNS-ben külön szerverek lehetnek felelősek a hierarchia különböző részeiért. Egy gyökérnévszerver például nem adja meg közvetlenül a tananyag-szerver IP-címét, de meg tudja mondani, ki tud az `edu` tartományról. Az `edu` névszervere továbbirányít a megfelelő `example.edu` névszerverhez, amely végül választ adhat a `tananyag.example.edu` kérdésre.

Ezt a felhasználó jellemzően nem érzékeli, mert a böngésző, az operációs rendszer és az internetszolgáltató általában gyorsítótárat használ. Ha tegnap már megnyitottuk ugyanazt az oldalt, lehet, hogy az IP-cím még rendelkezésre áll helyben, így új DNS-kérdésre sincs szükség. Ez teszi gyorsabbá a böngészést, ugyanakkor a gyorsítótár miatt a változások nem mindenkinél egyszerre jelennek meg.

### Rekurzív és hiteles névszerverek

A böngésző többnyire nem közvetlenül kérdezgeti a DNS-hierarchia minden szereplőjét. Ehelyett egy **rekurzív feloldót** használ. Ez lehet az internetszolgáltató, egy vállalati hálózat vagy egy nyilvános DNS-szolgáltató szervere. A rekurzív feloldó elvégzi a „nyomozást” a kliens helyett: ha nincs meg nála a válasz, sorra megkérdezi a szükséges névszervereket, majd visszaadja az eredményt.

Az adott domainhez tartozó végső, megbízható információt az **autoritív** vagy hiteles névszerver szolgáltatja. Ez az a szerver, amelyet a domain kezelője kijelölt a zóna rekordjainak közzétételére. Ha egy egyetem megváltoztatja a webhelye címét, a saját hiteles névszerverein módosítja a megfelelő rekordot; a változás ezután fokozatosan jut el a gyorsítótárakon keresztül a felhasználókhoz.

### DNS-rekordok

A DNS nem kizárólag weboldalakhoz használható. A névtérben többféle rekordtípus tárolható.

| Rekord | Jelentés | Példa használat |
| --- | --- | --- |
| `A` | Domainnévhez IPv4-címet rendel | `www.example.org` → `203.0.113.10` |
| `AAAA` | Domainnévhez IPv6-címet rendel | modern IPv6-kapcsolat |
| `CNAME` | Egy nevet egy másik névhez köt | `www` → `webhely.example.org` |
| `MX` | Levelezési kiszolgálót jelöl | az `example.org` e-mailjeinek útvonala |
| `TXT` | Szöveges, gyakran ellenőrzési vagy biztonsági adat | SPF, domainigazolás |
| `NS` | A zónáért felelős névszervert nevezi meg | ki kezeli az adott domain rekordjait |

Egy webes szolgáltatás DNS-konfigurációja ezért sokkal több lehet annál, hogy „egy név egy IP-címre mutat”. Egy globális szolgáltatás több `A` vagy `AAAA` rekordot adhat vissza. Ez segíthet a terhelés elosztásában és a hibák átvészelésében. Egy másik név `CNAME`-en keresztül egy CDN által kezelt névre mutathat, így a tartalom földrajzilag közelebbi szerverről érkezhet.

### Gyorsítótár és TTL

A DNS-válaszok jellemzően tartalmaznak egy **TTL** (Time To Live) értéket. Ez másodpercben jelzi, meddig tekinthető a válasz gyorsítótárazhatónak. Ha egy rekord TTL-je 3600 másodperc, akkor a feloldó elvileg egy órán át használhatja a korábban kapott választ anélkül, hogy ismét az autoritív szervert kérdezné.

A hosszú TTL gyorsíthatja a szolgáltatást és csökkentheti a DNS-kiszolgálók terhelését, de rugalmatlanabb. Ha egy hibás cím kerül a rekordba, vagy a szolgáltatás új infrastruktúrára költözik, a korábbi válasz még órákig élhet különböző gyorsítótárakban. Rövid TTL-lel gyorsabban lehet változtatni, viszont több DNS-lekérdezésre és nagyobb infrastruktúra-terhelésre kell számítani. Ez tipikus mérnöki kompromisszum: nincs minden helyzetre ideális érték.

### DNS és webes hibák

Ha egy weboldal nem nyílik meg, a DNS csak az egyik lehetséges hibahely. A domain lehet lejárt, rossz rekordot kaphatott, a névszerver lehet átmenetileg elérhetetlen, vagy a kliens helyi gyorsítótárában lehet régi adat. Más esetben a DNS tökéletesen működik, de a webkiszolgáló hibás vagy túlterhelt.

Ezért egy informatikusnak nem szabad a „nincs internet” és a „nem nyílik meg ez az oldal” állításokat azonosként kezelnie. Ha egy DNS-lekérdezés ad értelmes IP-címet, de a webhely továbbra sem elérhető, a vizsgálat következő lépése már kapcsolat-, TLS- vagy HTTP-szintű lehet.

### Biztonsági szempontok

A DNS eredetileg nem titkosságra és erős hitelesítésre készült. Ezért a hamis vagy manipulált DNS-válaszok komoly kockázatot jelenthetnek: a felhasználó a várt domainnév beírása ellenére rossz IP-címhez kerülhet. A DNSSEC olyan technológiák összessége, amely digitális aláírásokkal próbálja ellenőrizhetővé tenni a DNS-adatok eredetét. A webes kapcsolatnál a TLS-tanúsítvány további védelmi réteget ad: ha a böngésző egy másik szerverhez jutna, annak nem feltétlenül lenne érvényes tanúsítványa a kívánt domainhez.

A DNS-lekérdezés maga is árulkodhat arról, milyen szolgáltatást szeretne a felhasználó elérni. Emiatt a modern rendszerekben megjelentek a DNS-kérések titkosított továbbítására szolgáló megoldások is. A cél itt sem a teljes láthatatlanság, hanem annak csökkentése, hogy illetéktelen szereplők könnyen megfigyelhessék vagy módosíthassák a névfeloldást.

## Végigvezetett példa

Tegyük fel, hogy valaki először nyitja meg a `https://tananyag.example.edu` címet.

1. A böngésző az operációs rendszertől IP-címet kér a domainnévhez.
2. A helyi DNS-gyorsítótárban nincs válasz, ezért a kérdés a beállított rekurzív feloldóhoz kerül.
3. A feloldó szükség esetén a DNS-hierarchia segítségével megtalálja az `example.edu` zónáért felelős névszervert.
4. A hiteles névszerver például egy `A` rekordban visszaadja a webhely IPv4-címét és a TTL-t.
5. A feloldó a választ eltárolhatja, majd elküldi a kliensnek.
6. A böngésző ezután már az IP-címhez kezdeményez HTTPS-kapcsolatot.

Ha egy másik hallgató röviddel ezután ugyanazt az oldalt nyitja meg ugyanazon a hálózaton, az ő lekérdezésére a helyi feloldó már a gyorsítótárból is válaszolhat.

## Gyakori félreértések

| Állítás | Pontosítás |
| --- | --- |
| „A DNS egyetlen központi szerver.” | Elosztott, hierarchikus rendszer sok egymással együttműködő névszerverrel. |
| „Egy domainhez pontosan egy IP-cím tartozik.” | Lehet több IPv4- és IPv6-cím, és ezek idővel változhatnak. |
| „A DNS csak weboldalakhoz kell.” | Levelezéshez, szolgáltatásfelderítéshez és sok más hálózati feladathoz is használható. |
| „Ha a DNS működik, a weboldal biztosan megnyílik.” | A DNS csak a név és hálózati információ kapcsolatát adja meg; a kapcsolat és a webalkalmazás ettől még hibázhat. |

## Ellenőrző kérdések

1. Miért előnyös, hogy a DNS elosztott rendszer?
2. Mi a különbség a rekurzív és az autoritív névszerver között?
3. Mire használható egy `MX` rekord?
4. Milyen kompromisszumot jelent a TTL megválasztása?
5. Hogyan lehet, hogy ugyanaz a domain más IP-címet ad vissza különböző időpontokban vagy helyekről?

## Fogalomtár

- **DNS:** elosztott névszolgáltatás, amely neveket hálózati információkhoz rendel.
- **Névfeloldás:** domainnévhez tartozó DNS-rekord megkeresése.
- **Rekurzív feloldó:** a kliens helyett DNS-kérdéseket végigkövető szerver.
- **Autoritív névszerver:** egy domainzóna hiteles rekordjait tároló szerver.
- **DNS-zóna:** névtér egy kezelt része és annak rekordjai.
- **TTL:** a gyorsítótárazhatóság ideje.
- **DNSSEC:** DNS-adatok hitelességét ellenőrizhetővé tevő technológiák.
