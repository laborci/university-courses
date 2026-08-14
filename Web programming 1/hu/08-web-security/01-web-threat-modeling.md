# Fenyegetési modell a weben

A webbiztonság nem egyetlen kapcsoló, amelyet a fejlesztés végén „bekapcsolunk”. Annak végiggondolása, hogy mit védünk, kitől, milyen úton és milyen következményekkel, már a tervezés része. Ezt a gondolkodási keretet nevezzük fenyegetési modellnek.

## Miért kell modellezni a fenyegetéseket?

Képzeljünk el egy egyetemi kurzusportált. A hallgató bejelentkezik, látja a saját eredményeit, feltölt egy beadandót, az oktató pedig értékel és visszajelzést ír. Első pillantásra ez egyszerű alkalmazásnak tűnik. Mégis felmerülnek kérdések: ki láthatja az eredményeket? Mi történik, ha valaki más nevében próbál beadást feltölteni? Meddig marad érvényes a bejelentkezés? Hogyan kezeljük az olyan feltöltött fájlt, amely nem az, aminek mondja magát?

Ezek nem kizárólag programozási részletek. A válaszok meghatározzák, milyen adatokat kérünk el, hogyan építjük fel az oldalakat, hol ellenőrzünk jogosultságot, milyen naplókat vezetünk, és milyen élményt kap a felhasználó hiba esetén. A fenyegetési modell célja a bizonytalanság csökkentése: nem azt állítja, hogy minden lehetséges hibát előre látunk, hanem segít a lényeges kockázatokra fordítani az időt és a figyelmet.

## A négy alapfogalom

Az **érték** vagy védendő eszköz (asset) valami, amelynek elvesztése, megváltozása vagy jogosulatlan nyilvánosságra kerülése kárt okozna. Ilyen lehet egy jelszó, egy munkamenet-azonosító, egy hallgatói eredmény, a szolgáltatás elérhetősége, de akár a szervezet jó hírneve is.

A **fenyegetés** olyan esemény vagy szereplő, amely kárt okozhat. Például egy ellopott laptop, egy tévesen beállított jogosultság, egy rosszindulatú külső fél vagy egy hibás automatizálás. A fenyegetés önmagában még nem jelenti azt, hogy sikerül is kárt okoznia.

A **sérülékenység** a rendszer olyan gyenge pontja, amelyet egy fenyegetés kihasználhat. Példa lehet a túl tág jogosultság, az ellenőrizetlen bemenet, egy lejárt szoftverkomponens vagy az, ha a szerver pusztán a böngésző által elrejtett gombra hagyatkozik jogosultsági döntéskor.

A **kockázat** annak kombinációja, hogy egy kedvezőtlen esemény mennyire valószínű, és mekkora kárt okozna. Nem minden hiba egyformán sürgős. Egy belső tesztoldal elgépelése és több ezer felhasználó személyes adatainak kiszivárgása egészen más következményű esemény. A jó döntéshez mind a valószínűséget, mind a hatást mérlegelni kell.

## Mit jelent a CIA-hármas?

A védendő tulajdonságok közül három különösen gyakori. A **bizalmasság** (confidentiality) azt jelenti, hogy az adatot csak arra jogosult személy vagy rendszer ismerheti meg. Egy eredménylista esetében ez például azt jelenti, hogy egy hallgató nem böngészheti mások jegyeit.

A **sértetlenség** (integrity) azt jelenti, hogy adat vagy folyamat nem módosulhat jogosulatlanul és észrevétlenül. Ha valaki átírhatná saját beadási határidejét vagy pontszámát, a probléma elsősorban a sértetlenséget érintené.

Az **elérhetőség** (availability) azt jelenti, hogy a jogosult felhasználók a szükséges időben hozzáférnek a szolgáltatáshoz és adatokhoz. Vizsgaidőszakban egy összeomló tanulmányi rendszer ennek a tulajdonságnak a sérülését mutatja. A három szempont néha ütközik: a nagyon szigorú hozzáférési korlátozás javíthatja a bizalmasságot, de rossz kialakítás esetén nehezítheti a jogosultak munkáját. A tervezés ezért kompromisszumkeresés is.

## Kik vesznek részt a rendszerben?

A fenyegetési modell készítésekor először rajzoljuk fel egyszerűen a rendszert. Melyek a komponensek? Egy böngésző, egy webkiszolgáló, egy adatbázis, esetleg külső azonosítási szolgáltató, e-mail-küldő szolgáltató vagy analitikai eszköz. Ki a felhasználó? Milyen szerepkörök vannak? Milyen adatmozgatás történik közöttük?

Különösen fontosak a **bizalmi határok**. Határnak tekinthető például a felhasználó böngészője és a saját szerverünk közötti kapcsolat, a saját rendszerünk és egy külső fizetési szolgáltató közötti API-kapcsolat, vagy a nyilvános internet és a belső adminisztrációs felület közötti átmenet. A határ átlépésekor nem szabad automatikusan megbízni az érkező adatban. A böngészőből érkező kérés akkor is külső bemenet, ha a felületet mi készítettük.

## Végigvezetett példa: időpontfoglaló oldal

Tegyük fel, hogy egy orvosi rendelő számára készül időpontfoglaló webhely. A páciens időpontot kér, a rendelő munkatársa látja és kezeli a foglalásokat, az oldal pedig e-mailes visszaigazolást küld.

Először felsoroljuk az értékeket: a páciens neve és kapcsolattartási adata, a foglalás időpontja és oka, a munkatársak hozzáférése, a rendszer rendelkezésre állása, valamint az e-mail-küldési jogosultság. Ezután felrajzoljuk az adat útját: böngészőből a webalkalmazásba, onnan az adatbázisba, végül egy külső levelező szolgáltatóhoz.

Majd kérdéseket teszünk fel. Meg tudja-e valaki nézni vagy átírni egy másik páciens foglalását, ha megismeri annak azonosítóját? Előfordulhat-e, hogy a felhasználó olyan szöveget küld, amelyet később veszélyesen jelenítünk meg? Ki dönt arról, hogy egy munkatárs valóban jogosult-e az összes naptár kezelésére? Mi történik, ha a külső e-mail-szolgáltatás nem érhető el? A válaszokból védelmi követelmények lesznek: a szerver minden foglalásnál ellenőrizze a jogosultságot; a felhasználói adatokat megjelenítés előtt biztonságosan kezeljük; szerepkörök szerint adjunk minimális hozzáférést; a foglalást ne vesszük el attól, hogy az értesítő átmenetileg nem küldhető el.

Figyeljük meg, hogy ebben a folyamatban nincs „mágikus biztonsági termék”. A védelem rendszerbeli döntésekből áll. Ugyanilyen fontos, hogy nem minden fenyegetéshez készítünk azonnal bonyolult megoldást. Egy kis rendelőben valószínűleg indokoltabb az egyszerű, átlátható jogosultsági modell és a rendszeres mentés, mint egy túlterhelt, nehezen üzemeltethető infrastruktúra.

## Egy használható gondolkodási folyamat

Egy rövid fenyegetési modellezéshez öt lépés is elég lehet. Először írjuk le a rendszer célját és hatókörét. Másodszor rajzoljuk fel a komponenseket és adatáramlásokat. Harmadszor nevezzük meg a fontos adatokat és műveleteket. Negyedszer keressük meg a bizalmi határokat, majd tegyük fel a kérdést: mi romolhat el itt? Végül rangsoroljuk a kockázatokat, és írjuk le a választ: megelőzzük, csökkentjük, áthárítjuk vagy tudatosan elfogadjuk.

Segíthet a STRIDE nevű emlékeztető is. Betűi olyan fenyegetéscsoportokra utalnak, mint a más személynek kiadás (spoofing), az adatok jogosulatlan módosítása (tampering), a műveletek letagadhatósága (repudiation), az információszivárgás, a szolgáltatás megtagadása és a jogosultságok kiterjesztése. Ez nem vizsgán bemagolandó varázsszó, hanem lista, amely segít, hogy ne csak egyféle problémára gondoljunk.

## Védelmi alapelvek

A **legkisebb jogosultság elve** szerint egy felhasználó, folyamat vagy szolgáltatás csak annyi jogosultságot kapjon, amennyi a feladatához szükséges. Egy képfeltöltő szolgáltatásnak például nem kell teljes adatbázis-adminisztrátori hozzáférés.

A **mélységi védelem** azt jelenti, hogy nem egyetlen ellenőrzésre építünk. A titkosított kapcsolat, a hitelesítés, szerveroldali jogosultságvizsgálat, naplózás és biztonságos alapértelmezések együtt sokkal erősebbek, mint bármelyik külön.

A **biztonságos alapértelmezés** szerint az ismeretlen vagy hibás helyzetben inkább ne adjunk hozzáférést. A „majd a felület elrejti” nem biztonsági határ. Ugyanígy az **ellenőrzés a megbízhatósági határon** elv azt mondja: a szerver ellenőrizze az adatot és a jogosultságot, mert a kliens felett nincs teljes ellenőrzésünk.

## Gyakori félreértések

**„HTTPS mellett biztonságos az alkalmazás.”** A HTTPS védi az adatátvitelt a kapcsolat útján, de nem oldja meg a rossz jogosultságkezelést, a hibás üzleti logikát vagy a megtévesztett felhasználót.

**„Csak nagy cégeket támadnak.”** Automatizált próbálkozások nem a szervezet méretét mérlegelik. Ráadásul sok biztonsági esemény nem célzott támadás, hanem hiba, rossz konfiguráció vagy elveszett eszköz következménye.

**„A biztonság az üzemeltető feladata.”** A biztonság közös feladat: a tervező, a fejlesztő, az üzemeltető, a tartalomkészítő és a felhasználó döntései is számítanak.

**„Mindent ugyanazzal az erővel kell védeni.”** A jó kockázatkezelés nem ezt jelenti. A magas hatású és valószínű problémákra kell először erős, arányos választ adni.

## Ellenőrző kérdések

1. Mi a különbség fenyegetés, sérülékenység és kockázat között?
2. Nevezzen meg egy webes szolgáltatásnál bizalmasságot, sértetlenséget és elérhetőséget érintő értéket.
3. Miért bizalmi határ a böngésző és a szerver közötti kapcsolat?
4. Mit jelent a legkisebb jogosultság elve egy adminisztrációs felületen?
5. Miért nem elegendő önmagában a HTTPS?

## Fogalomtár

- **Érték (asset):** védendő adat, funkció, erőforrás vagy üzleti érdek.
- **Fenyegetés:** kárt okozni képes esemény, körülmény vagy szereplő.
- **Sérülékenység:** kihasználható gyenge pont egy rendszerben.
- **Kockázat:** a kedvezőtlen esemény valószínűségének és hatásának együttese.
- **Bizalmi határ:** olyan átmenet, ahol az adat vagy kérés megbízhatósága megváltozik.
- **Bizalmasság, sértetlenség, elérhetőség:** a CIA-hármas három alapvető védelmi célja.
- **Legkisebb jogosultság:** csak a szükséges hozzáférések megadása.
- **Mélységi védelem:** egymást kiegészítő védelmi rétegek alkalmazása.
