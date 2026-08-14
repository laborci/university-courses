# Proxy, reverse proxy és CDN

A közvetítő rendszerek nem fölösleges kitérők a webes kérés útjában. A megfelelő helyen elhelyezve gyorsítanak, védenek, elosztják a terhelést, és egyszerűbbé teszik a szolgáltatás üzemeltetését.

Az első kliens–szerver példákban a böngésző közvetlenül egy alkalmazáskiszolgálóhoz kapcsolódik. Ez jó kiindulópont, de a valóságban egy népszerű vagy érzékeny webes szolgáltatás előtt gyakran több közvetítő rendszer működik. A felhasználó ebből legtöbbször semmit sem érzékel: beír egy domainnevet, és választ kap. A háttérben azonban a kérés ellenőrzésen, gyorsítótáron, terheléselosztón vagy földrajzilag közeli tartalomszerveren is átmehet.

### Proxy: közvetítő a kliens oldalán

A **proxy** a kliens nevében kapcsolódik a távoli szolgáltatáshoz. Egy szervezeti hálózatban például a munkaállomások nem közvetlenül érik el az internetet, hanem egy proxyhoz küldik a kéréseiket. A proxy ezután továbbítja a kérést, és visszaadja a választ.

Ennek lehet biztonsági oka: a szervezet korlátozhat bizonyos veszélyes vagy nem munkához kapcsolódó forgalmat. Lehet naplózási oka: az üzemeltető látni szeretné a hálózat használatát. És lehet teljesítménybeli oka is: a proxy eltárolhat gyakran kért, nyilvános erőforrásokat, így nem kell minden felhasználónak újra letöltenie ugyanazt a fájlt.

A proxy nem feltétlenül rosszindulatú megfigyelő. Sok esetben tudatosan telepített, szervezeti infrastruktúraelem. Ugyanakkor a felhasználó számára fontos kérdés, hogy ki üzemelteti, milyen forgalmat láthat, és hogyan védi az adatokat. HTTPS esetén a proxy a titkosított kapcsolat tartalmát alaphelyzetben nem tudja egyszerűen elolvasni, bár vállalati környezetben léteznek olyan ellenőrzési megoldások, amelyek külön bizalmi infrastruktúrát igényelnek.

### Reverse proxy: közvetítő a szolgáltató oldalán

A **reverse proxy** kívülről nézve maga a webhely belépési pontja. A böngésző hozzá kapcsolódik, ő fogadja a HTTPS-kérést, majd a kérés alapján kiválasztja, melyik belső alkalmazás vagy szerver kapja meg a feladatot. A felhasználó számára általában láthatatlan, hogy a háttérben hány gép vagy szolgáltatás dolgozik.

Képzeljünk el egy egyetemi rendszert, amelyben külön alkalmazás kezeli a bejelentkezést, a kurzusadatokat és a dokumentumletöltést. A reverse proxy fogadhatja mindegyikhez a `tananyag.example.edu` domainre érkező kéréseket, majd az útvonal alapján továbbíthatja őket: a `/login` az azonosítási szolgáltatáshoz, a `/kurzusok` az alkalmazáshoz, a `/dokumentumok` pedig egy fájlkiszolgálóhoz kerülhet. Így a külső világ egységes szolgáltatást lát, miközben belül elkülönülhetnek a feladatok.

A reverse proxy több gyakori feladatot is elláthat:

- kezeli a TLS-tanúsítványokat és a titkosított kapcsolatok felépítését;
- továbbítja a kérést a megfelelő belső szolgáltatáshoz;
- több azonos alkalmazáspéldány között osztja el a forgalmat;
- statikus fájlokat közvetlenül szolgálhat ki;
- gyorsítótárazhat bizonyos válaszokat;
- alkalmazhat alapvető védelmi szabályokat, például kéréskorlátozást.

Ez nem jelenti azt, hogy a reverse proxy „mindent megold”. Ha a mögötte lévő alkalmazás hibás, lassú vagy rosszul megtervezett, azt önmagában nem javítja ki. Viszont jól elkülöníti a webes belépési pont általános feladatait az alkalmazás speciális üzleti logikájától.

### Terheléselosztás

Ha egy szolgáltatásnak egyszerre sok felhasználót kell kiszolgálnia, egyetlen alkalmazáspéldány kevés lehet. A reverse proxy vagy külön terheléselosztó ilyenkor több háttérszerver között oszthatja el a kéréseket. Az egyik felhasználó kérése az első, a következőé a második példányhoz jut; ha egy szerver kiesik, a rendszer ideális esetben nem küld több új kérést hozzá.

Ennek egyik előnye a skálázhatóság: új példányok hozzáadásával nőhet a kiszolgálási kapacitás. Másik előnye a rendelkezésre állás: egyetlen gép hibája nem feltétlenül teszi elérhetetlenné az egész szolgáltatást. A rendszertervezésben azonban fontos felismerni, hogy a megosztott állapot – például egy bejelentkezési munkamenet – bonyolíthatja ezt a modellt.

### CDN: tartalom közelebb a felhasználóhoz

A **CDN** (Content Delivery Network) földrajzilag elosztott kiszolgálók hálózata. Leggyakrabban olyan tartalom gyors eljuttatására használják, amely sok felhasználónak ugyanúgy szükséges: képek, videók, JavaScript-fájlok, stíluslapok, letölthető dokumentumok vagy akár teljes, statikus weboldalak.

Ha egy magyar felhasználó egy amerikai szerveren tárolt webhelyet nyit meg, a hálózati távolság késleltetést okoz. Egy CDN európai csomópontja átveheti a statikus fájlok kiszolgálását, így a böngészőnek nem kell minden képért a távoli eredeti szerverhez fordulnia. Ez gyorsabb megjelenést eredményezhet, és csökkenti az eredeti infrastruktúra terhelését is.

A CDN általában cache-eléssel dolgozik. Ha egy erőforrást egy csomópont már lekért az eredeti szervertől, később helyben is ki tudja szolgálni. A gyorsítótárazásnál itt is kulcskérdés a frissesség. Egy ritkán változó logó hosszú ideig tárolható, míg egy élő eredményjelző vagy személyes profiloldal nem adható minden látogatónak ugyanabból a cache-ből.

### Biztonság és közvetítő rendszerek

A szolgáltató oldali belépési pont jó hely lehet bizonyos támadások enyhítésére. A reverse proxy korlátozhatja, hogy egy IP-cím milyen gyakran küldhet kérést, kiszűrhet nyilvánvalóan hibás formátumú forgalmat, és elrejtheti a belső rendszerek közvetlen címét. Sok CDN védelmet ad a túlterheléses támadások bizonyos formái ellen is, mert nagy kapacitású, elosztott hálózaton tudja elnyelni vagy szűrni a gyanús forgalmat.

Ezek a megoldások nem helyettesítik az alkalmazás biztonságát. Egy hibás jogosultságkezelést vagy rosszul validált bemenetet a CDN nem feltétlenül tud kijavítani. A védelem réteges: hálózati, belépési ponti, alkalmazási és adatvédelmi intézkedések együtt szükségesek.

## Végigvezetett példa: népszerű jegyértékesítés

Egy koncertjegy értékesítésének kezdetekor sok tízezer felhasználó nyitja meg ugyanazt az oldalt.

1. A böngészők a webhely domainjéhez kapcsolódnak.
2. A CDN kiszolgálhatja a közös képeket, stíluslapokat és JavaScript-fájlokat.
3. A reverse proxy fogadja a dinamikus kéréseket.
4. A proxy több alkalmazáspéldány között osztja el a keresési és kosárműveleteket.
5. A rendelést feldolgozó rész továbbra is szigorúbb ellenőrzést igényel, mert a készlet és a fizetés nem kezelhető egyszerűen nyilvános cache-ből.

Egy ilyen felépítés nem szüntet meg minden problémát, de megakadályozhatja, hogy a sok közös statikus erőforrás letöltése önmagában túlterhelje a kritikus rendelési rendszert.

## Gyakori félreértések

| Állítás | Pontosítás |
| --- | --- |
| „A proxy és a reverse proxy ugyanaz.” | Mindkettő közvetít, de a proxy jellemzően a kliens, a reverse proxy a szolgáltató oldalán áll. |
| „A CDN csak videóstreaminghez kell.” | Képek, stíluslapok, JavaScript-fájlok és statikus oldalak gyorsítására is gyakori. |
| „A CDN mindig gyorsabb.” | A gyorsítás függ a cache-találattól, a tartalom jellegétől és a hálózati útvonaltól. |
| „A reverse proxy miatt biztonságos az alkalmazás.” | Segíthet a védelemben, de nem pótolja a biztonságos alkalmazáskódot és jogosultságkezelést. |

## Ellenőrző kérdések

1. Miért lehet célszerű a TLS-kezelést reverse proxyra bízni?
2. Milyen típusú tartalom illik jól CDN-cache-be, és mi nem?
3. Milyen problémát old meg a terheléselosztás?
4. Miért nem helyettesíti a CDN az alkalmazásszintű biztonságot?
5. Miben különbözik a kliensoldali proxy a reverse proxytól?

## Fogalomtár

- **Proxy:** kliensoldali közvetítő, amely a kliens nevében kommunikál.
- **Reverse proxy:** szerveroldali belépési pont, amely a kérés mögöttes szolgáltatáshoz irányítását végzi.
- **Terheléselosztás:** kérések szétosztása több kiszolgáló között.
- **CDN:** földrajzilag elosztott tartalomkézbesítő hálózat.
- **Eredeti szerver:** az erőforrás hiteles forrását tároló infrastruktúra.
- **Cache-találat:** amikor a kért adat már rendelkezésre áll a gyorsítótárban.

===

qwer

***
---
___
