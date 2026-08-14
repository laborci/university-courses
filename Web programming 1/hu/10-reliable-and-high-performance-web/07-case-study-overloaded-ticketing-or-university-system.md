# Esettanulmány: túlterhelt jegyértékesítő vagy egyetemi rendszer

## Célok

Az esettanulmány célja, hogy a hallgató egyetlen, könnyen elképzelhető helyzetben lássa együtt a webes rendszer több rétegét: a böngészőt, a hálózati kéréseket, a kiszolgálókat, az adatbázist, a felhasználói felületet, a biztonsági korlátokat és az üzemeltetői döntéseket. A hallgató tudjon különbséget tenni tünet és ok között, meg tudja fogalmazni, milyen információ hiányzik még a jó diagnózishoz, és többféle, egymással összehangolható beavatkozást tudjon javasolni.

Túlterheléskor nem feltétlenül „kevés a szerver”. A hiba oka lehet rosszul időzített folyamat, egyetlen szűk keresztmetszet, ismétlődő kliensoldali kérés, hibás gyorsítótár, tisztázatlan üzleti szabály vagy félrevezető felhasználói visszajelzés is. A jó válasz nem egyetlen technológia, hanem az okhoz illő, a méltányosságot és a biztonságot is figyelembe vevő intézkedés.

## A helyzet

Képzeljünk el egy egyetemi kurzusfelvételi rendszert. Hétfőn 8:00-kor nyílik meg a népszerű kurzusok felvétele. Körülbelül 8 000 hallgató jogosult belépni, és sokan pontosan a nyitás pillanatában próbálnak helyet szerezni. Néhány kurzuson 40 férőhely van, miközben több száz érdeklődő vár. A rendszer nemcsak megjeleníti a kurzuslistát: ellenőrzi az előfeltételeket, ütközéseket, létszámot és hallgatói jogosultságot, majd módosítja a jelentkezési adatot.

8:00 előtt a rendszer látszólag nyugodt. 8:00:02-kor azonban a megnyitott böngészőlapok egyszerre kezdenek adatot kérni. Egyes hallgatók többször frissítenek, mások több eszközről jelentkeznek be. Akik hibát látnak, újra megnyomják a gombot, mert nem tudják, a kérésük eljutott-e a rendszerhez. Néhány perc alatt a válaszidő másodpercekről percekre nő; időnként hibaoldal jelenik meg. A hallgatók közösségi felületeken megosztják, hogy „mindenki frissítsen folyamatosan”, ami tovább fokozza a forgalmat.

Ez nem kitaláltan különleges helyzet. Ugyanez a dinamika jelentkezhet koncertjegyek, sportesemények, pályázatok, vizsgahelyek vagy limitált termékek értékesítésekor. A rendszer szempontjából a konkrét tartalom eltér, de a minta azonos: előre ismert, koncentrált kereslet találkozik korlátozott készlettel és erős felhasználói bizonytalansággal.

## Résztvevők és érdekeik

Az eset megértéséhez nem elég a szerverekről beszélni. A rendszernek több érintettje van.

**Hallgató vagy vásárló:** gyors, egyértelmű és méltányos folyamatot vár. Nem csak a siker fontos: azt is tudnia kell, hogy a rendszer mit fogadott el, és van-e még teendője. A bizonytalanság újrapróbálkozást szül.

**Oktatásszervező vagy rendezvényszervező:** azt szeretné, hogy a férőhelyek szabályosan, visszakövethetően teljenek be. Számára egy rossz sorrend, duplikált foglalás vagy vitathatatlanul igazságtalan eredmény komoly probléma.

**Ügyfélszolgálat/tanulmányi adminisztráció:** a hiba idején a kérdések és panaszok első fogadója. Akkor tud segíteni, ha az állapotok érthetők és ellenőrizhetők.

**Fejlesztői és üzemeltetői csapat:** stabil, megfigyelhető rendszert próbál fenntartani. Számukra a tünetek – növekvő válaszidő, hibaarány, telített kapcsolat – adatok, amelyek mögött meg kell találni a konkrét okot.

**Biztonsági és adatvédelmi felelős:** arra figyel, hogy a terhelés alatt se sérüljenek hozzáférési szabályok vagy szivárogjanak személyes adatok. Az, hogy „most nagy a nyomás”, nem igazolja a védelem lekapcsolását.

## Idővonal

### 7:45–7:59 – a csendes előzmény

A hallgatók már belépnek a rendszerbe és megnyitják a kurzusoldalakat. Ez önmagában hasznos jelzés lehetne: a szolgáltatás látja, hogy közeledik a csúcs. A rendszer azonban minden oldalbetöltéskor ugyanazokat a viszonylag ritkán változó kurzusleírásokat és képeket is újra előállítja. Ezeket a nyilvános részeket lehetne hatékonyabban kiszolgálni, de jelenleg ugyanazt az infrastruktúrát terhelik, mint a később kritikus jelentkezési műveletek.

### 8:00–8:01 – hirtelen kérésáradat

A megnyitott oldalak automatikusan frissítenek; a felhasználók is frissítenek. A kurzuslista lekérése, a hallgató jogosultságainak ellenőrzése és a felvételi gomb állapotának megjelenítése mind külön kérésekkel történik. Egyetlen felhasználói képernyő több tucat hálózati kérést indíthat. A forgalom megsokszorozódik, nem pusztán a felhasználók száma miatt, hanem a kérési minta miatt is.

### 8:01–8:03 – a szűk keresztmetszet kialakulása

A webkiszolgálók még nem feltétlenül omlanak össze. A jelentkezés véglegesítésekor viszont sok kérés ugyanazokat a kurzuslétszám-adatokat akarja ellenőrizni és módosítani. Az adatbázisnak garantálnia kell, hogy ne adjon el több férőhelyet a valósnál. Ez helyes követelmény, de a sok egyidejű módosítás várakozást, zárolást vagy sorban állást okozhat. A „még egy szerver” nem feltétlenül oldja meg: ha minden szerver ugyanarra az adatbázis-műveletre vár, a közös szűk keresztmetszet marad.

### 8:03–8:07 – az önrontó kör

A válaszidő nő. A felhasználó öt másodperc után nem tudja, hogy a kattintás hatott-e, ezért megismétli. A böngésző esetleg időtúllépés miatt újraküld valamit; egy rosszul kialakított kliensoldali logika pedig rövid időn belül ismételten lekérdezi az állapotot. A több kérés még tovább lassít, ez pedig újabb kattintásokat vált ki. A technikai terhelés mellé kommunikációs terhelés is társul: „nem működik” üzenetek, telefonok, viták jelennek meg.

### 8:07–8:15 – hibák és méltányossági kérdések

Néhány kérés hibával tér vissza, mások késve fejeződnek be. Elképzelhető, hogy egy hallgató képernyőjén hibaüzenet látszik, miközben a kérés a háttérben már sikeres volt. Ha az eredmény nem ellenőrizhető egyértelműen, a felhasználó újra próbálkozik, sőt vitathatja a sorrendet. Ekkor már nem csak rendelkezésre állási gondról beszélünk. Az intézménynek azt is tudnia kell igazolni, milyen esemény mikor történt, mi lett elfogadva, és mely helyzetek igényelnek korrekciót.

### 8:15 után – helyreállás és tanulás

A forgalom lassan csökkenhet, de a munka nem ér véget, amikor az oldal újra betöltődik. Ellenőrizni kell az adatok helyességét, a duplikációkat, a félbemaradt műveleteket és a felhasználóknak adott tájékoztatást. Ezután következik az esemény nyugodt elemzése: mi történt ténylegesen, milyen jelzések voltak előtte, és mi változtatná meg a következő csúcs kimenetelét?

## Tünet, ok és következmény

A „lassú a rendszer” tünet, nem magyarázat. Lehet a háttérben túl sok statikus tartalom lekérése, túl sok adatbázis-kapcsolat, egy lassú külső identitásszolgáltató, rosszul méretezett alkalmazás, vagy az, hogy minden kérés ugyanazon a zárolt adaton dolgozik. A diagnózis első szabálya: ne a leglátványosabb hibából következtessünk automatikusan az okra.

Például a magas CPU-használat lehet ok, de lehet következmény is. Ha az alkalmazás folyamatosan sikertelen adatbázis-kéréseket próbál újra, a CPU dolgozik, de a gyökérok az újrapróbálási viselkedés és a túlterhelt adatbázis együttese. Ugyanígy a sok 500-as hiba jelezhet alkalmazáshibát, de azt is, hogy egy külső szolgáltatás késik, és a rendszer nem kezeli jól az időtúllépést.

## Diagnosztikai kérdések

Egy incidens elemzésénél a következő kérdések segítenek. Nem mindegyikre kell azonnal választ adni; éppen az a cél, hogy lássuk, milyen adat hiányzik.

1. Melyik útvonal vagy művelet lassult le leginkább: a lista megjelenítése, a belépés vagy a végleges foglalás?
2. A forgalom hány különböző felhasználótól és hány összes kéréstől származott? Volt-e egy felhasználóra jutó szokatlanul sok kérés?
3. Melyik komponensnél nőtt meg először a várakozás: a böngésző és a hálózat, a webalkalmazás, az adatbázis vagy egy külső szolgáltatás között?
4. A hibásnak látszó kérések közül melyek hajtódtak végre mégis? Hogyan lehet ezt a felhasználó számára egyértelművé tenni?
5. Volt-e olyan nyilvános, lassan változó tartalom, amely fölöslegesen ugyanazokat az erőforrásokat terhelte, mint a kritikus tranzakció?
6. Megmaradt-e a férőhelyek és a jogosultságok helyessége a terhelés alatt? Ha igen, milyen mechanizmus védte meg? Ha nem, milyen korrekció szükséges?
7. Mit láttak a felhasználók, amikor várniuk kellett? A felület csökkentette vagy növelte az ismételt kattintás esélyét?
8. Milyen előre jelző adatok álltak rendelkezésre 8:00 előtt, és ki figyelte őket?

## Lehetséges beavatkozások

Az alábbiak nem azonnali üzemi utasítások, hanem tervezési irányok. Egy valódi rendszerben a pontos megoldás a rendelkezésre álló adatoktól, a szabályoktól és a kockázatoktól függ.

**A kereslet időbeli elosztása.** Ha a méltányosság és szabályzat engedi, a kurzusfelvétel történhet kijelölt idősávokban, sorsolással, várólistával vagy előzetes preferenciarendszerrel. Ez üzleti/oktatásszervezési döntés, amely gyakran többet javít, mint egy technikai gyorsítás. A rendszertervezés része annak felismerése, ha a probléma nem kizárólag technikai.

**Várószoba és egyértelmű sor.** Egy virtuális váróterem kontrollálhatja, hány felhasználó jut egyszerre a kritikus folyamatba. A jó felület nem ígér hamis pontosságot, de világosan elmondja: a felhasználó sorban van-e, megőrződik-e a helye, és mit ne tegyen. Ez csökkentheti a kétségbeesett frissítést.

**A kritikus és nem kritikus munka szétválasztása.** A kurzus képe, leírása és kategóriája sok esetben statikus vagy ritkán változó, ezért külön gyorsítható. A férőhelyet módosító jelentkezés viszont kritikus tranzakció. Ha a kettőt nem ugyanaz a szűk erőforrás szolgálja ki, a látványos oldalbetöltések kevésbé veszélyeztetik a foglalás helyességét.

**Kérésmennyiség fegyelmezése.** A kliensoldal tervezésével csökkenthető a fölösleges automatikus frissítés; a szerveroldali sebességkorlátozás pedig egyenletesebbé teheti a használatot és védhet a hibás vagy rosszindulatú forgalomtól. A korlátokat azonban úgy kell kialakítani, hogy ne büntessék aránytalanul a lassabb hálózatú vagy akadálymentesítő technológiát használó felhasználókat.

**Állapot egyértelmű visszajelzése.** Egy foglalási gomb elküldése után az oldal jelezze, hogy a feldolgozás folyamatban van, és ha az eredmény késik, a felhasználó hol ellenőrizheti később. A „próbáld újra” nem mindig jó tanács: duplikált vagy versengő műveletekhez vezethet. A rendszernek tervezetten kell kezelnie azt is, ha ugyanaz a kérés véletlenül többször érkezik meg.

**Megfigyelhetőség és előkészítés.** A csúcs előtt terhelési helyzetet lehet modellezni, a fontos mutatókat pedig – válaszidő, hibaarány, várakozási sor hossza, adatbázis-terhelés – követni. A mérés célja nem az, hogy minden számot gyűjtsünk, hanem hogy korán észrevegyük: melyik felhasználói művelet romlik, és hol kezdődik a torlódás.

**Biztonság és méltányosság megőrzése.** A terhelés alatt sem érdemes kikapcsolni a jogosultság-ellenőrzést vagy a naplózást csak azért, hogy gyorsabbnak tűnjön a rendszer. Inkább előre kell eldönteni, mely kevésbé fontos funkciók korlátozhatók ideiglenesen, miközben a kritikus állapotváltozás helyes és auditálható marad.

## Egy lehetséges elemző vita

Tegyük fel, hogy valaki azt javasolja: „Növeljük meg tízszeresére a szerverek számát.” Mit old ez meg? Ha a gond a nyilvános oldalak kiszolgálása, sokat segíthet. Ha azonban a végleges felvételnél egy közös, sorban álló adatbázis-művelet a korlát, akkor a több alkalmazásszerver akár még több egyidejű kérést küld ugyanoda. A helyes kérdés: melyik rész a korlát, és hogyan biztosítható közben, hogy ugyanazt a férőhelyet csak egyszer adjuk ki?

Egy másik javaslat lehet: „Engedjünk mindenkit be egyszerre, majd majd gyors lesz.” Ez figyelmen kívül hagyja, hogy a felhasználó számára a kiszámítható várakozás gyakran jobb, mint a látszólag nyitott, de kaotikus rendszer. Egy tisztességes sor, világos üzenetekkel, nem pusztán technikai korlátozás: a bizalom része.

## Tévhit vagy pontosabb állítás?

**„A hiba oka biztosan az, hogy kevés a szerver.”** A kapacitás lehet kevés, de a közös adatbázis, külső szolgáltatás vagy fölösleges kérési minta is lehet szűk keresztmetszet.

**„A frissítés segít helyet szerezni.”** Egyes rendszerekben épp ez ront a helyzeten. A túl sok ismételt kérés mindenki számára lassulást okozhat.

**„Ha hibaüzenet jelent meg, a művelet biztosan nem történt meg.”** Nem feltétlenül. A válasz elveszhet vagy késhet, miközben a szerver már feldolgozta a kérést. Ezért fontos az eredmény későbbi ellenőrizhetősége.

**„Túlterheléskor a biztonsági ellenőrzéseket átmenetileg ki lehet kapcsolni.”** Ez az egyik legveszélyesebb reakció. Pont a zavaros helyzetekben nő meg a hibák és visszaélések esélye.

## Ellenőrző kérdések

1. Miért különösen nehéz egy limitált férőhelyű műveletet sok egyidejű kérés mellett helyesen kezelni?
2. Hogyan hozhat létre a felhasználói bizonytalanság önrontó terhelési kört?
3. Nevezz meg két olyan részt, amelyet egy kurzusoldalon valószínűleg másképp lehet kezelni, mint a végleges jelentkezést!
4. Miért nem elég annyit mondani egy incidens után, hogy „lassú volt az adatbázis”?
5. Milyen információt kell kapnia a felhasználónak, hogy ne küldje el többször ugyanazt a kérést?
6. Milyen nem technikai beavatkozás csökkentheti egy előre ismert forgalmi csúcsot?

## Fogalomtár

**Szűk keresztmetszet:** a rendszer azon része, amelynek korlátozott kapacitása az egész folyamat teljesítményét visszafogja.

**Tranzakció:** olyan összetartozó műveletsor, amelynek eredménye következetes; például egy férőhely lefoglalása nem történhet meg csak félig.

**Zárolás:** az adatbázis vagy rendszer által alkalmazott mechanizmus, amely megakadályozza, hogy egymással ütköző módosítások egyszerre rontsák el ugyanazt az adatot.

**Időtúllépés (timeout):** amikor egy kliens vagy szolgáltatás meghatározott időn belül nem kap választ, ezért a műveletet sikertelennek tekinti.

**Újrapróbálkozás (retry):** egy sikertelennek vagy bizonytalannak látszó kérés ismételt elküldése.

**Virtuális várószoba:** a bejutást és a kritikus funkcióhoz érkező forgalmat szabályozó sorbaállítási megoldás.

**Megfigyelhetőség:** a rendszer belső állapotára vonatkozó következtetés naplók, metrikák, nyomkövetések és riasztások segítségével.

**Méltányosság:** a folyamat olyan kialakítása, amelynek szabályai átláthatók, következetesen alkalmazhatók, és nem adnak indokolatlan előnyt egyes felhasználóknak.
