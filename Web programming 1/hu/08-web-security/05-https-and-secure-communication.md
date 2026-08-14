# HTTPS és biztonságos kommunikáció

## Célok

Az anyag végére a hallgató érti, miért nem elegendő, ha egy weboldal „van az interneten”: a böngésző és a szolgáltatás közötti kommunikációt is védeni kell. Képes elmagyarázni a HTTPS és a TLS célját, a tanúsítványok és a hitelesítésszolgáltatók szerepét, a HSTS és a vegyes tartalom jelentőségét. Azt is felismeri, hogy a HTTPS elengedhetetlen alapréteg, de nem igazolja egy szolgáltatás tisztességét, és nem pótolja az alkalmazás más biztonsági intézkedéseit.

**A HTTPS nem egy lakat-ikon, hanem a webes kapcsolat alapvető védelmi tulajdonsága: segít megóvni az adatokat az útközbeni olvasástól és módosítástól, és segít ellenőrizni, hogy a böngésző a várt szolgáltatáshoz kapcsolódik. Önmagában azonban nem tesz biztonságossá egy hibás vagy megtévesztő alkalmazást.**

## Mi a baj a titkosítatlan webbel?

Képzeljük el, hogy Bence egy nyilvános Wi-Fi-hálózaton megnyit egy HTTP-s oldalt, majd kitölt egy belépő űrlapot. Titkosítás nélkül a hálózat több szereplője – például a hozzáférési pont üzemeltetője, egy hibásan védett köztes hálózati eszköz vagy egy rosszindulatú megfigyelő – elvileg olvashatja vagy módosíthatja a forgalmat. Nem csak a jelszó problémás: a látogatott oldalak, űrlapadatok, keresések, munkamenet-cookie-k és a szervertől érkező programkód is érzékeny lehet.

A módosítás veszélye könnyen alábecsülhető. Ha valaki útközben átírhat egy HTTP-választ, nem csupán más szöveget jeleníthet meg, hanem például reklámot, követőkódot vagy rosszindulatú programkódot is beilleszthet. A böngésző által letöltött JavaScript különösen érzékeny: az oldal jogosultságaival fut, hozzáférhet a felülethez és sok esetben a felhasználó által megadott adatokhoz. A bizalmas kezelés és a sértetlenség ezért együtt fontos.

A HTTPS a HTTP protokoll TLS-sel védett használata. A hétköznapi rövidítésben azt mondjuk, hogy „a HTTPS titkosít”, de a cél három részből áll. A **bizalmasság** azt jelenti, hogy a kapcsolat tartalmát illetéktelen fél ne olvashassa egyszerűen. A **sértetlenség** azt jelenti, hogy az átvitt adat észrevétlenül ne módosulhasson. A **szerverazonosítás** pedig azt, hogy a böngészőnek legyen oka elhinni: valóban ahhoz a domainhez tartozó szolgáltatással kommunikál, amelyet a címsorban látunk.

## Mit csinál a TLS?

A TLS (Transport Layer Security) az a protokollcsalád, amely a HTTPS kapcsolat védelmi rétegét adja. A böngésző és a szerver a kapcsolat elején úgynevezett TLS-kézfogást hajt végre. Ennek részletei kriptográfiai szempontból összetettek, de a fogalmi kép hasznos: a felek egyeztetik, milyen korszerű védelmi eljárásokat használnak; a szerver igazolja a domainhez kapcsolódó identitását; majd közösen olyan kapcsolatkulcsokat állítanak elő, amelyekkel a további forgalom titkosítva és integritásvédetten utazik.

Egy jó hasonlat a személyazonosított, lezárt futárszolgálat. Nem a teljes üzenetünket küldjük nyilvánosan a címzettnek, hanem előbb meggyőződünk a címzett kilétéről, majd a további üzeneteket lezárt, a kapcsolat számára létrehozott csatornán küldjük. A valós TLS természetesen nem egyszerű boríték, és a biztonsága az évek során fejlődő szabványokra, böngészőkre és szerverbeállításokra épül. A lényeg itt az, hogy a HTTP alkalmazási szintű üzenetei ezután már védett csatornában haladnak.

Ez nem jelenti azt, hogy minden információ láthatatlan. Hálózati szinten továbbra is lehetnek megfigyelhető metaadatok, például az, hogy valaki mely IP-címhez létesít kapcsolatot, körülbelül mikor és mekkora adatforgalommal. A DNS-feloldás módja is számíthat. A HTTPS ugyanakkor megóvja a tipikus webes kérés és válasz tartalmát: az útvonalat, a fejléc számos részét, az űrlapadatokat, a cookie-kat és a választestet a hálózati út köztes szereplőitől.

## Tanúsítványok: miért hisz a böngésző a szervernek?

Ha pusztán titkosított kapcsolat lenne, egy támadó saját titkosított csatornát is felajánlhatna, miközben magát a bank vagy az egyetem szerverének adja ki. Ezért a böngészőnek a szerver kilétéről is bizonyítékra van szüksége. Ezt szolgálja a digitális tanúsítvány. A tanúsítvány többek között azt állítja, hogy egy nyilvános kulcs egy adott domainnévhez tartozik, például `tanulmanyi.pelda.hu`-hoz.

A böngésző nem minden egyes weboldal üzemeltetőjét ismeri személyesen. Ehelyett megbízható hitelesítésszolgáltatók (Certificate Authority, CA) tanúsítványaira és az ezekhez vezető bizalmi láncra támaszkodik. A böngésző vagy az operációs rendszer előre telepített megbízhatósági tárában gyökértanúsítványok vannak. Egy szerver tanúsítványa gyakran köztes tanúsítványokon keresztül kapcsolódik ilyen gyökérhez. A böngésző ellenőrzi, hogy a lánc érvényes-e, a tanúsítvány a kért domainre szól-e, nem járt-e le, és a kapcsolat technikai paraméterei elfogadhatók-e.

A tanúsítvány-figyelmeztetést nem szabad rutinból átlépni. Előfordulhat ártalmatlan konfigurációs hiba vagy fejlesztői környezet, de nyilvános hálózaton valódi kockázatot is jelezhet. A tanúsítvány megléte viszont nem értékítélet a weboldalról: egy adathalász oldal is beszerezhet érvényes tanúsítványt a saját, megtévesztő domainjére. A lakat tehát azt jelzi, hogy a böngésző és a címsorban szereplő domain közötti kapcsolat védett; nem azt, hogy a szolgáltató megbízható, a tartalom igaz, vagy a vásárlás jó döntés.

## HTTPS a teljes útvonalon

Egy weboldal nem egyetlen fájlból áll. A fő HTML-dokumentum mellett stíluslapok, képek, betűkészletek, JavaScript-fájlok, API-hívások, analitikai szolgáltatások és beágyazott tartalmak tölthetők be. Ha a főoldal HTTPS-es, de egyik fontos erőforrása HTTP-n érkezik, vegyes tartalomról (mixed content) beszélünk. Ez megtöri a védelmi modellt: egy módosítható szkript vagy stíluslap veszélybe sodorhatja az egyébként védett oldalt.

A böngészők a különösen veszélyes aktív vegyes tartalmat – például HTTP-n betöltött JavaScriptet – jellemzően blokkolják. Egyes passzív elemek, például képek történetileg eltérően viselkedhettek, de a fejlesztő helyes célja egyszerű: minden erőforrás, átirányítás és API-végpont HTTPS-t használjon. A fejlesztői eszközök Console és Network nézete jól megmutatja az ilyen problémákat.

Ugyanez vonatkozik a bejelentkezésre. Nem elég, ha az űrlap elküldése HTTPS-re irányul, miközben maga a belépő oldal HTTP-n töltődött be. A betöltött űrlapot vagy a hozzá kapcsolódó kódot a kapcsolat közben módosíthatták. A helyes kiindulópont az, hogy a teljes szolgáltatás HTTPS-es, a HTTP-kérések pedig következetesen HTTPS-re terelődnek.

## HSTS: a biztonságos irány rögzítése

A HTTP-ről HTTPS-re átirányítás hasznos, de az első HTTP-kérés pillanatában még létrejöhet titkosítatlan kapcsolat. A HSTS (HTTP Strict Transport Security) egy válaszfejlécen keresztül közölt szabály, amelyet a böngésző megjegyezhet: ezt a domaint a jövőben kizárólag HTTPS-en érje el. Ha a felhasználó később `http://` címet ír, a böngésző a hálózati kérés elküldése előtt HTTPS-re módosíthatja.

A HSTS nem csodaszer, és gondos bevezetést igényel. Első találkozáskor még nincs feltétlenül megjegyzett szabály, bár a böngészők bizonyos kiemelt domainekhez előre betöltött HSTS-listát is használhatnak. A rosszul konfigurált domain vagy lejárt tanúsítvány mellett a szigorú szabály elérhetetlenné teheti az oldalt, ezért az üzemeltetőnek minden aldomainre, átirányításra és tanúsítvány-életciklusra figyelnie kell. Oktatási szempontból a HSTS fő üzenete: a biztonságos kapcsolatot nem egy alkalmi választásnak, hanem a szolgáltatás alapértelmezett tulajdonságának tekintjük.

## Végigvezetett példa: belépés egy egyetemi szolgáltatásba

Bence a böngészőbe beírja az egyetemi rendszer címét. A DNS a szolgáltatás címéhez segíti, majd a böngésző HTTPS kapcsolatot kezdeményez. A szerver tanúsítványt küld; a böngésző ellenőrzi a domainnevet, az érvényességi időt és a bizalmi láncot. Ha az ellenőrzés rendben van, létrejön a TLS-kapcsolat. Csak ezután töltődik be a belépőoldal HTML-je, a hozzá tartozó CSS, JavaScript és képek.

Bence elküldi a jelszavát és a második faktor kódját. A kérés fejlécei és törzse a TLS által védett csatornában haladnak. A szerver siker esetén `Set-Cookie` fejlécben küld egy biztonságosan beállított munkamenet-cookie-t. A böngésző a későbbi, ugyanahhoz a szolgáltatáshoz tartozó HTTPS-kéréseknél visszaküldi ezt. A rendszer HSTS-fejlécet is küldhet, hogy a böngésző legközelebb se próbálkozzon HTTP-vel.

Tegyük fel, hogy az oldal egyik régi statisztikai szkriptje még `http://` címen szerepel. A böngésző ezt figyelmeztetésként vagy blokkolásként jelezheti. Ha a szkript betöltődhetne, egy útközben módosított válasz akár a belépési felületet is befolyásolhatná. A javítás nem az, hogy a figyelmeztetést elnyomjuk, hanem az, hogy az erőforrást is HTTPS-en, megbízható forrásból szolgáljuk ki vagy eltávolítjuk.

## A HTTPS korlátai

A HTTPS nem védi meg a felhasználót attól, hogy hamis oldalon adja meg az adatait. Ha a cím például `egyetem-belepes-pelda.hu`, a támadó saját domainjére teljesen érvényes tanúsítványt szerezhet. Ezért a pontos domainnév, a jelszókezelő figyelmeztetései és az adathalász levelek kritikus kezelése továbbra is fontos.

Nem oldja meg az alkalmazás logikai hibáit sem. Egy HTTPS-es rendszer lehet rosszul jogosultságkezelt, tárolhat túl sok személyes adatot, tartalmazhat XSS sebezhetőséget, vagy küldhet adatot harmadik félnek a felhasználó számára átláthatatlanul. A HTTPS azt védi, ahogyan az adat a böngésző és a szerver között utazik; nem határozza meg, hogy a szerver helyesen bánik-e vele, amikor megérkezett.

A szerveroldali naplók, adatbázisok, biztonsági mentések és külső integrációk védelme is külön feladat. A webbiztonság réteges: a hálózati kommunikáció, a hitelesítés, a jogosultságok, az alkalmazáskód, az üzemeltetés és az adatkezelési szabályok együtt adják a védelem szintjét.

## Gyakori tévhitek

**„A lakat azt jelenti, hogy az oldal megbízható.”** A lakat a kapcsolat védelméről és a domainhez kötött tanúsítványról árulkodik, nem a szolgáltató szándékáról.

**„HTTPS csak fizetésnél vagy belépésnél kell.”** Minden webes oldal védhet érzékeny böngészési információt, és a titkosítatlan válasz módosítható lehet.

**„A HTTP→HTTPS átirányítás önmagában tökéletes.”** Hasznos, de az első HTTP-kérés előtt még nincs titkosított kapcsolat; ezért fontos a következetes HTTPS és adott esetben a HSTS.

**„A tanúsítvány lejárata csak adminisztratív részlet.”** Lejárt vagy hibás tanúsítvány esetén a böngésző joggal figyelmeztet, mert nem tudja megbízhatóan ellenőrizni a kapcsolatot.

**„Ha HTTPS van, alkalmazásbiztonságra nincs szükség.”** A HTTPS alapréteg; nem pótolja a bemenetellenőrzést, a jogosultság-ellenőrzést vagy az adatvédelmi tervezést.

## Ellenőrző kérdések

1. Melyik három fő tulajdonságot célozza a HTTPS/TLS használata?
2. Miért veszélyes, ha egy HTTPS-es oldal HTTP-n tölt be JavaScriptet?
3. Milyen állítást igazol egy tanúsítvány, és mit nem igazol?
4. Mi a HSTS célja, és miért kell körültekintően bevezetni?
5. Miért lehet egy adathalász oldalnak is érvényes HTTPS-tanúsítványa?
6. Mondj két olyan biztonsági problémát, amelyet a HTTPS nem old meg.

## Fogalomtár

**HTTPS:** HTTP kommunikáció TLS-sel védett formája.

**TLS:** a hálózati kommunikáció bizalmasságát, sértetlenségét és szerverazonosítását támogató protokoll.

**Tanúsítvány:** digitális igazolás, amely egy nyilvános kulcsot domainnévhez kapcsol.

**Hitelesítésszolgáltató (CA):** olyan megbízható szervezet vagy infrastruktúra, amely tanúsítványokat bocsát ki.

**Bizalmi lánc:** a szerver tanúsítványától a böngésző által ismert gyökértanúsítványig vezető ellenőrizhető kapcsolat.

**Vegyes tartalom (mixed content):** amikor egy HTTPS-es oldal egyes erőforrásai HTTP-n töltődnek be.

**HSTS:** böngészőnek adott szabály, amely egy domain későbbi elérését HTTPS-re kényszeríti.

**Sértetlenség:** annak tulajdonsága, hogy az adat észrevétlenül nem módosult az átvitel során.
