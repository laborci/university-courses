# Esettanulmány: híroldal, webáruház és online levelező

Nincs általánosan legjobb webes felépítés. A megfelelő megoldás abból következik, hogy ki a felhasználó, mi a szolgáltatás fő ígérete, milyen adatot kezel, minek kell gyorsnak vagy pontosnak lennie, és mi történik egy részleges hiba esetén. A három esettanulmány ugyanazt a technológiai készletet más hangsúlyokkal használja.

Könnyű azt gondolni, hogy minden webes rendszer ugyanarra a sémára vezethető vissza: van egy böngésző, egy szerver és egy adatbázis. Ez a nézőpont igaz, de kevés a jó döntésekhez. Egy országos híroldal olvasója elsősorban gyorsan szeretne eljutni a cikkhez. Egy webáruház vásárlója biztos akar lenni abban, hogy a termék valóban megrendelhető és a fizetés nem duplázódik meg. Egy online levelező felhasználója pedig azt várja, hogy a privát üzenetei kizárólag neki jelenjenek meg, és az új levél minél hamarabb látható legyen.

Az összehasonlítás során ugyanazokat a kérdéseket tesszük fel mindhárom rendszernek: milyen a tartalom, mennyire friss, mennyi interakciót kíván, fontos-e a SEO, mekkora szerepe van a személyes adatnak, hogyan kezelhető a költség és az üzemeltetés, mennyire hozzáférhető, és mit kell tennie hibák esetén.

### 1. Híroldal: a nyilvános tartalom gyors eljuttatása

Egy híroldal sok látogató számára ugyanazt a cikket kínálja. A címlap, egy választási eredményről szóló tudósítás vagy egy háttérelemzés jellemzően nyilvános. Ez kedvez a gyorsítótárazásnak: ha tízezer ember olvassa el ugyanazt a cikket, nem kell tízezerszer teljesen újra előállítani. A képek, stíluslapok, szkriptek és gyakran maga a cikk HTML-je is kiszolgálható a felhasználóhoz közeli CDN-csomópontból.

A frissesség viszont tartalomtípustól függ. Egy elemző cikk órákig vagy évekig ugyanaz maradhat; egy élő eredménykövető percenként változhat. A híroldal ezért választhat hibrid modellt: a cikk törzse előre elkészített vagy cache-elt, az élő adatokat jelző kisebb rész pedig később frissül. Nem szükséges minden elemhez ugyanazt a renderelési módot használni.

A SEO különösen fontos, mert a cikkek jelentős része keresőből, közösségi megosztásból vagy hírösszesítőből kap látogatót. A cím, a szerző, a dátum, a cikk főszövege, a leíró metaadatok és a megosztáshoz használt előnézet akkor működik jól, ha a nyilvános HTML-ben is érthetően jelen van. Az „előbb töltsünk le egy nagy alkalmazást, majd később rajzoljuk ki a cikket” modell itt rendszerint rossz kiindulás.

A személyre szabás lehet másodlagos: például az oldal megjegyzi a témaköröket vagy ajánl cikkeket. Ez nem akadályozhatja meg az alapcikk olvasását, és kiesésekor az oldal továbbra is hasznos marad. A hibatűrés jó példája, ha az ajánló szolgáltatás hibájánál csak egy semleges blokk látszik, nem pedig üres oldal. Hozzáférhetőségi szempontból a szöveg, a logikus címsorstruktúra, a képek alternatív szövege és az olvasható elrendezés sokkal fontosabb, mint egy látványos, de zavaró animáció.

### 2. Webáruház: az információtól a megbízható tranzakcióig

A webáruház egyszerre tartalomközpontú és tranzakciós szolgáltatás. A termékkép, a leírás, a kategória és a nyilvános értékelés a híroldalhoz hasonlóan jól gyorsítótárazható és keresőben is fontos. Egy termékoldalnak ezért érdemes szemantikusan, gyorsan és jól indexelhetően megjelennie. A vásárlás azonban már nem pusztán megjelenítés.

A kosár, a bejelentkezett fiók, a kedvezmény, a szállítási cím és a fizetés személyes vagy üzletileg kritikus állapot. A készlet különösen jó példa a frissesség kérdésére. Egy termékoldal fél perccel korábbi „raktáron” jelzése tájékoztató jellegű lehet, de a rendelés véglegesítésekor a szervernek újra ellenőriznie kell a valós készletet. A böngésző által küldött ár, kedvezmény vagy végösszeg sem tekinthető hitelesnek; ezeket a szerver állapítja meg a saját adatai alapján.

Az interaktivitás sokat javíthat az élményen. A vásárló kiválaszthat méretet, színt, szűrhet kategóriát, vagy láthatja a kosár összegét. Ezeket a felület gyorsan, kliensoldalon is frissítheti. A kritikus műveletekhez azonban a szerver az igazság forrása. A „Megrendelem” gomb többszöri megnyomása, egy megszakadt hálózati kapcsolat vagy az ismételt kérés nem eredményezhet két fizetést. Ezért a tranzakciós rendszerekben az idempotencia, a visszaigazolás és a hibakezelés nem részletkérdés.

Az üzemeltetés összetettebb, mint híroldalnál. Fizetési szolgáltató, készletkezelés, számlázás, e-mail értesítés és szállítási integráció kapcsolódhat a rendszerhez. Ezek nem mindig elérhetők. Hibatűrő viselkedés lehet például, hogy a termékkatalógus olvasható marad, de a rendszer őszintén jelzi: a fizetés átmenetileg nem érhető el. Rossz megoldás, ha a felület sikeres rendelést ígér, miközben a szerver nem tudta véglegesíteni azt.

Adatvédelmi szempontból a webáruház címeket, elérhetőséget, vásárlási előzményt és esetleg marketinghozzájárulást kezel. A szükséges adatok körét, megőrzési idejét és hozzáféréseit tudatosan kell megtervezni. A bankkártyaadatot a legtöbb áruház nem saját maga dolgozza fel; erre erre szakosodott fizetési szolgáltatót használ. Ez egyszerre csökkentheti a kockázatot és az üzemeltetési terhet.

### 3. Online levelező: személyes állapot és bizalom

Az online levelező működése a másik két példához képest szinte fordított. A bejelentkezett felhasználó postafiókja személyes, ezért a válaszokat nem lehet ugyanúgy közös cache-be tenni, mint egy hírcikket. Minden kérésnél vagy API-hívásnál biztosnak kell lenni abban, ki a felhasználó és mire jogosult. Az azonosítás, a munkamenet, a jogosultságkezelés és a biztonság itt a szolgáltatás magja, nem utólagos kiegészítés.

A frissességi elvárás is magas. Egy új üzenet érkezésekor az olvasatlan számláló és a bejövő lista lehetőleg rövid időn belül frissüljön. Ennek több technikai útja van: a böngésző időnként érdeklődhet az új adatok felől, a szerver nyitva tarthat egy eseménycsatornát, vagy kétirányú, tartós kapcsolatot használhatnak. A hallgatónak nem az adott technológia neve a lényeg, hanem a kompromisszum: a gyakoribb ellenőrzés gyorsabb érzetet adhat, de felesleges kéréseket és energiahasználatot okozhat; a tartós kapcsolat összetettebb üzemeltetést igényelhet.

Az online levelezőben sok interaktív, állapotfüggő felület van: mappák, keresés, címkék, piszkozatok, csatolmányok, kijelölések és értesítések. A kliens oldali program gyakran nagyobb szerepet kap, mert az alkalmazásnak munkafelületként kell működnie. Mégsem helyes mindent a böngészőre bízni. Egy e-mail elküldésének, törlésének vagy címkézésének végleges állapota a szerveren van; kapcsolatkimaradás esetén gondosan kell jelezni, hogy egy módosítás elküldődött-e, csak helyben várakozik, vagy sikertelen.

SEO ennél a szolgáltatásnál lényegében nem cél: a személyes postafiókot nem akarjuk indexeltetni. Ezzel szemben a hozzáférhetőség továbbra is alapvető. Billentyűzetes gyorsbillentyűk, jól címkézett gombok, egyértelmű fókusz, képernyőolvasóval értelmezhető üzenetlista és érthető hibaüzenetek nélkül a gazdag alkalmazás sok felhasználó számára használhatatlan lehet.

Hibatűrésnél különösen fontos az adatvesztés elkerülése. Ha a kapcsolat megszakad egy hosszú levél írása közben, a piszkozat lehetőleg megmaradjon. Ha egy levél elküldése bizonytalan, a rendszer ne bátorítsa vak újraküldésre, mert ebből duplikátum lehet. A felületnek őszintén kell kommunikálnia az állapotot: „Mentve”, „Küldés folyamatban”, „Nem sikerült elküldeni”.

## Összehasonlító elemzés

| Szempont | Híroldal | Webáruház | Online levelező |
| --- | --- | --- | --- |
| Fő érték | Nyilvános információ gyors elérése | Megbízható vásárlás | Személyes kommunikáció kezelése |
| Tartalom | Többnyire közös és nyilvános | Közös katalógus + személyes tranzakció | Erősen személyes |
| Frissesség | Cikkenként változó | Készletnél és kosárnál fontos | Új üzeneteknél és állapotnál fontos |
| SEO | Kiemelten fontos | Fontos a katalógusnál | Nem cél |
| Cache | Erősen használható | Katalógusnál jó, személyes résznél óvatosan | Személyes adatoknál nagyon korlátozott |
| Interaktivitás | Többnyire kiegészítő | Vásárlási folyamatban lényeges | A szolgáltatás központi része |
| Hibatűrés | A cikk maradjon olvasható | Ne legyen hibás vagy duplikált rendelés | Ne vesszen el és ne szivárogjon adat |

Azonos komponensek mellett is eltérőek a prioritások. Mindhárom rendszer használhat CDN-t, API-t, böngészőoldali kódot és adatbázist, de nem ugyanarra. A híroldalnál a tömeges elérés és a gyors indulás, a webáruháznál a tranzakció helyessége, a levelezőnél pedig a személyes állapot biztonsága alakítja a döntéseket.

## Elemző feladat

Válasszon a három szolgáltatás közül egyet, és írjon legfeljebb egyoldalas indoklást az alábbi kérdések mentén.

1. Melyik három adat vagy funkció a legfontosabb a szolgáltatás ígéretéhez?
2. Ezek közül melyik gyorsítótárazható biztonsággal, és melyiknél lenne kockázatos a régi vagy más felhasználóhoz tartozó válasz?
3. Melyik funkció működhet egyszerű HTML-lel, és melyikhez indokolt böngészőoldali program?
4. Mi a rendszer legkellemetlenebb, de reálisan előforduló részleges hibája? Hogyan tájékoztatná erről a felhasználót?
5. Milyen hozzáférhetőségi vagy adatvédelmi követelményt venne fel már a tervezés első változatába?

A jó válasz nem technológianeveket sorol fel, hanem az adott szolgáltatás céljából következtet. Például a webáruház esetén nem elég azt írni, hogy „adatbázis kell”; meg kell nevezni, miért kell a rendeléskor szerveroldali készlet- és ár-ellenőrzés.

## Gyakori tévhitek

| Állítás | Pontosítás |
| --- | --- |
| „A híroldalnak nincs szüksége biztonságra.” | A szerkesztői fiókok, a publikálási folyamat és a látogatói adatok is védelmet igényelnek. |
| „A kosárban látható ár a végleges ár.” | A végleges ellenőrzés a szerveren történik, a jogosultságokkal és az aktuális üzleti szabályokkal együtt. |
| „Egy levelező kliensoldali alkalmazás, tehát az adat a böngészőben van.” | A böngésző a felületet kezeli; a hiteles állapot és a hozzáférés szerveroldali kontrollt igényel. |
| „Ha a szerver hibázik, elég egy általános hibaoldal.” | A helyes visszajelzés függ attól, hogy a művelet sikerült-e, megismételhető-e, és veszhetett-e adat. |

## Ellenőrző kérdések

1. Miért előnyös a CDN egy híroldalnál, és miért kell óvatosan kezelni a személyes oldalakat?
2. Miért nem lehet a böngésző által küldött végösszeget véglegesnek tekinteni egy webáruházban?
3. Melyik példában a legkevésbé releváns a SEO, és miért?
4. Mit jelentene a fokozatos leromlás a híroldal, illetve a levelező esetében?
5. Hogyan változik az üzemeltetési összetettség, ha egy rendszerhez külső fizetési vagy értesítési szolgáltatás kapcsolódik?

## Fogalomtár

- **CDN:** földrajzilag elosztott kiszolgálói hálózat, amely a felhasználóhoz közelről adhat vissza gyakran kért erőforrásokat.
- **Tranzakció:** olyan műveletsor, amelynek eredményét következetesen, például egyszeri rendelésként kell kezelni.
- **Hiteles állapot:** a szerver által nyilvántartott, véglegesnek tekintett adatállapot.
- **Indexelés:** nyilvános webes tartalom feltérképezése és kereshetővé tétele keresőrendszerben.
- **Részleges hiba:** olyan kiesés, amikor a rendszer egyik összetevője hibás, de más részei még működhetnek.
- **Idempotencia:** egy művelet olyan tulajdonsága, hogy az ismételt végrehajtás nem okoz többszörös hatást.
- **Személyes adat:** azonosított vagy azonosítható természetes személyhez kapcsolható információ.
