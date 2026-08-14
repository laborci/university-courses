# OWASP és a biztonság közös felelőssége

## Célok

A téma végére a hallgató értse, hogy a webbiztonság nem egyetlen beállítás, nem egy külön „biztonsági fázis”, és nem kizárólag a fejlesztő feladata. Tudja elhelyezni az OWASP szerepét a webes rendszerek világában, tudjon különbséget tenni sérülékenység, fenyegetés, támadás, kockázat és védekezési intézkedés között. Ismerje az OWASP Top 10 szemléletét annyira, hogy egy webes szolgáltatásról értelmes kérdéseket tudjon feltenni: mit kell védeni, milyen hibák vezethetnek adatvesztéshez vagy jogosulatlan hozzáféréshez, és ki tehet a kockázat csökkentéséért.

A biztonság nem egy termék, amelyet a fejlesztés végén „ráteszünk” egy alkalmazásra. Folyamatos kockázatkezelés: a szervezetnek fel kell mérnie, mi lehet értékes egy támadónak, mi romolhat el, milyen következménnyel járna, és hol érdemes arányos védelmet kialakítani. Ebben a munkában a fejlesztő, az üzemeltető, a vezetés és a felhasználó is részt vesz.

## Mi az OWASP, és miért érdemes foglalkozni vele?

Az OWASP az *Open Worldwide Application Security Project* rövidítése. Nem hatóság, nem tanúsító szervezet és nem egyetlen szoftvertermék gyártója, hanem nyílt közösség, amely a szoftver- és különösen a webalkalmazás-biztonság gyakorlati tudását gyűjti, rendszerezi és szabadon hozzáférhetővé teszi. Útmutatókat, eszközöket, képzési anyagokat és közös nyelvet ad ahhoz, hogy fejlesztők, tesztelők, üzemeltetők és döntéshozók ugyanazokról a problémákról tudjanak beszélni.

Egy webes rendszerben sokféle érték jelenhet meg: felhasználói adatok, jelszavak, egészségügyi vagy pénzügyi információk, üzleti dokumentumok, rendelési adatok, sőt az a lehetőség is, hogy valaki szolgáltatást vegyen igénybe. Egy hiba nem csak akkor súlyos, ha „feltörik a szervert”. Már az is jelentős kár lehet, ha egy illetéktelen személy mások rendeléseit látja, ha az oldal téves összeget számláz, vagy ha a szolgáltatás éppen egy fontos beadási határidőkor elérhetetlenné válik.

Az OWASP azért hasznos, mert nem azt állítja, hogy minden rendszert azonos módon kell védeni. Inkább visszatérő gondolkodási hibákra hívja fel a figyelmet. A kérdés nem pusztán az, hogy „van-e tűzfalunk?”, hanem az is, hogy a rendszer minden egyes kérésnél valóban ellenőrzi-e a jogosultságokat; a beérkező adatokat a várt formában kezeli-e; észlelnénk-e, ha valami szokatlan történik; valamint van-e tervünk a javításra.

## A kockázat nyelve: mit jelentenek az alapfogalmak?

Biztonsági beszélgetésekben gyakran összemosódnak a fogalmak. Ez félreértésekhez vezethet, ezért érdemes őket szétválasztani.

Az **eszköz** vagy védendő érték (*asset*) bármi lehet, aminek elvesztése, módosítása vagy nyilvánosságra kerülése kárt okozna. Egy egyetemi rendszerben ilyen a hallgatói adatbázis, a vizsgaeredmény, a belépési szolgáltatás és a rendszer hírneve is.

A **fenyegetés** olyan körülmény vagy szereplő, amely kárt okozhat. Lehet rosszindulatú támadó, adathalász üzenet, hibásan működő külső szolgáltatás, véletlen emberi hiba vagy akár áramszünet. A fenyegetés még nem jelenti azt, hogy a kár biztosan bekövetkezik.

A **sérülékenység** a rendszer gyengesége: például hiányzó jogosultság-ellenőrzés, túl egyszerű jelszabály, elavult függőség, hibás konfiguráció vagy olyan hibaüzenet, amely túl sok részletet árul el. A sérülékenység lehet technikai, folyamatbeli vagy emberi eredetű.

A **támadás** akkor történik, amikor valaki vagy valami kihasználja a sérülékenységet. Nem kell hozzá mindig különleges szakértelem: sok problémát automatizált próbálgatással, ellopott jelszavakkal vagy nyilvánosan ismert hibák kihasználásával okoznak.

A **kockázat** annak kombinációja, hogy egy kedvezőtlen esemény mennyire valószínű, és milyen hatása lenne. Egy nyilvános bemutatóoldal átmeneti kiesése kellemetlen lehet, de egy egészségügyi időpontfoglaló rendszer adatainak kiszivárgása sokkal súlyosabb. A biztonsági munka ezért nem végtelen lista kipipálása: a legnagyobb és legvalószínűbb károkat kell először csökkenteni.

## Kockázatkezelés: nem a nulla kockázat a cél

A teljesen kockázatmentes rendszer gyakorlatilag nem létezik. Minden védelemnek van költsége: fejlesztési időt, üzemeltetési figyelmet, esetenként kényelmet vagy teljesítményt igényel. A jó döntés nem az, hogy bármit megteszünk a biztonságért, hanem hogy a védelem arányban álljon a védendő értékkel és a várható következményekkel.

Egy egyszerű kockázatkezelési ciklus így írható le:

1. Azonosítjuk, mit védünk és kik használják a rendszert.
2. Feltesszük, mi romolhat el: illetéktelen hozzáférés, adatvesztés, hibás tranzakció, szolgáltatáskiesés vagy félrevezetett felhasználó.
3. Megvizsgáljuk, hol vannak gyenge pontok a tervezésben, a kódban, a konfigurációban és a működési folyamatokban.
4. Prioritást adunk a kockázatoknak valószínűség és hatás alapján.
5. Védelmi intézkedéseket vezetünk be, majd ellenőrizzük, hogy valóban működnek-e.
6. Figyeljük a változásokat: új funkció, új külső szolgáltató vagy új támadási módszer új kockázatot hozhat.

Például egy könyvtári webalkalmazásnak lehet bejelentkezése, kölcsönzési előzménye és e-mail-címe. Ésszerű döntés lehet többfaktoros hitelesítést kérni az adminisztrátoroktól, míg az olvasóknál megfelelő erős jelszó és biztonságos jelszó-visszaállítás elég. Nem azért, mert az olvasók adatai nem fontosak, hanem mert az adminisztrátori fiók megszerzésének nagyobb a lehetséges hatása.

## Az OWASP Top 10 mint szemlélet, nem mint vizsgaszólista

Az OWASP Top 10 a webalkalmazások legfontosabb, visszatérő kockázati kategóriáit foglalja össze. A konkrét kiadások idővel változnak, ezért nem érdemes úgy kezelni, mint örök és változatlan tíz parancsolatot. A lényeg a mintázat: milyen típusú hibák fordulnak elő újra és újra, és milyen kérdésekkel lehet őket már a tervezés során felismerni.

Az egyik központi kategória a **hibás hozzáférés-szabályozás**. Ilyenkor a rendszer ugyan bejelentkezteti a felhasználót, de nem ellenőrzi elég következetesen, hogy az adott művelethez vagy adathoz van-e joga. Nem elég a menüben elrejteni egy adminisztrációs gombot: a szervernek minden kérésnél el kell döntenie, hogy az adott felhasználó megteheti-e azt, amit kér.

Fontos terület a **hibás kriptográfiai védelem**. Ide tartozik, amikor érzékeny adat védtelenül kerül továbbításra vagy tárolásra, a jelszavakat nem megfelelő módon kezelik, vagy a rendszer rosszul használ egy egyébként erős titkosítási megoldást. A HTTPS önmagában nem old meg mindent, de alapvető feltétel: nélküle a kliens és a szerver közötti kommunikáció könnyebben megfigyelhető vagy módosítható.

Az **injekciós hibák** lényege, hogy a rendszer a felhasználótól érkező adatot parancsként vagy utasításként kezeli. A védekezés gondolata egyszerű: az adat maradjon adat. A rendszer ne állítson elő ellenőrizetlen szövegösszefűzéssel adatbázis-lekérdezést, parancsot vagy értelmezhető kódot.

Az **elavult vagy sérülékeny komponensek** problémája azért különösen gyakori, mert a modern webalkalmazások sok külső könyvtárból, keretrendszerből és szolgáltatásból épülnek fel. Egy csomag telepítése nem egyszeri döntés: nyilván kell tartani, mire építünk, figyelni kell a javításokat, és tervezni kell a frissítést.

Az OWASP szemlélete felhívja a figyelmet a **hibás tervezésre** is. Nem minden hiba egy rossz sor kód. Ha egy üzleti folyamat eleve megengedi, hogy bárki jóváhagyjon saját magának nagy értékű tranzakciót, azt egy későbbi bemeneti ellenőrzés nem fogja megoldani. A biztonságot a rendszer céljaival, szerepköreivel és üzleti szabályaival együtt kell megtervezni.

Visszatérő téma az **azonosítás és hitelesítés hibája**, a **biztonsági naplózás és megfigyelés hiánya**, valamint a **helytelen konfiguráció**. Ezek együtt is veszélyesek lehetnek: egy rosszul védett fiókot valaki megpróbálhat átvenni, és ha a rendszer nem korlátozza az ismételt próbálkozásokat, nem naplóz jól, illetve nem jelez az üzemeltetőknek, a probléma sokáig rejtve maradhat.

## Védelem több rétegben

A jó webbiztonság nem egyetlen akadály. Ha az egyik védelem hibázik, egy másik még csökkentheti a kárt. Ezt nevezik gyakran többrétegű védelemnek. Egy bejelentkezési rendszerben például együtt számít a biztonságos kapcsolat, a megfelelő jelszókezelés, a sikertelen próbálkozások kezelése, a munkamenet védelme, a jogosultságok ellenőrzése, a naplózás és a felhasználó tájékoztatása.

Ez nem jelenti, hogy minden rendszert végtelen számú akadállyal kell terhelni. Egyensúlyt kell találni. A túl bonyolult felület arra ösztönözheti a felhasználót, hogy kijátssza a szabályokat, például bizonytalan helyen tárolja a jelszavát. A cél olyan védelem, amely a kockázathoz illeszkedik, és a valós használat során is fenntartható.

## Kié a felelősség?

### A fejlesztő és a tervező felelőssége

A fejlesztő nem pusztán funkciókat valósít meg. Döntései hatással vannak arra, milyen adatot kér az alkalmazás, hogyan ellenőrzi azt, hogyan kezeli a hibákat, és milyen alapértelmezéseket ad. A biztonságos fejlesztéshez hozzátartozik a bemenetek ellenőrzése, a jogosultságok szerveroldali érvényesítése, a titkok kódból való távoltartása, a használt komponensek ismerete és a biztonsági tesztelés.

A tervezőnek már a funkció megfogalmazásakor kérdeznie kell. Ki használhatja? Milyen adat szükséges valóban? Mi történik, ha valaki hibázik vagy rosszindulatúan használja? Hogyan lehet a felhasználót egyértelműen tájékoztatni? A legjobb biztonsági javítás sokszor az, amelyre később nincs szükség, mert a kockázatos funkciót eleve másképp tervezték meg.

### Az üzemeltető felelőssége

Egy gondosan megírt alkalmazás is veszélybe kerülhet rossz környezetben. Az üzemeltetés feladata többek között a frissítések kezelése, a hozzáférések szabályozása, a titkos kulcsok és konfigurációk védelme, a mentések elkészítése és visszaállíthatóságuk ellenőrzése, a naplók figyelése, valamint az incidenskezelési terv fenntartása.

Különösen fontos, hogy az éles rendszer ne legyen véletlenül fejlesztői módban, a fölösleges szolgáltatások ne maradjanak nyitva, és a változások nyomon követhetők legyenek. A biztonság itt nem egyszeri telepítési feladat, hanem mindennapi üzemeltetési fegyelem.

### A szervezet és a vezetés felelőssége

A biztonság pénzbe, időbe és szakértelembe kerül. Ha a szervezet csak új funkciók szállítását értékeli, de a biztonsági javításokra nincs idő vagy felelős, akkor a technikai csapatoknak kevés esélyük van tartósan jó eredményt elérni. A vezetésnek kell kijelölnie az elfogadható kockázati szintet, biztosítania az erőforrásokat, meghatároznia a felelősségi köröket és támogatnia az őszinte hibajelzést.

Ez kulturális kérdés is. Egy csapatnak tudnia kell hibát jelenteni anélkül, hogy azonnal bűnbakot keresnének. Így a problémák gyorsabban felszínre kerülnek, és kisebb eséllyel nőnek komoly incidenst okozó hibává.

### A felhasználó felelőssége

A felhasználó nem biztonsági szakértő, ezért nem lehet rá áthárítani a rendszer hibáit. Ugyanakkor van szerepe: egyedi, erős jelszót használhat, bekapcsolhatja a többfaktoros hitelesítést, figyelhet a gyanús üzenetekre, és jelezheti, ha szokatlan tevékenységet lát. A szolgáltatás feladata, hogy ezt egyszerűvé és érthetővé tegye, ne pedig büntesse a felhasználót a tévedéseiért.

## Elemző példa: egy „csak belső használatú” adminfelület

Képzeljünk el egy kis szervezet belső nyilvántartó rendszerét. Az adminfelület kezdetben csak néhány kollégának készült, ezért a csapat úgy gondolja, nem szükséges komoly védelem. A rendszer idővel interneten keresztül is elérhetővé válik, több adminisztrátor kap hozzáférést, és bekerülnek érzékeny személyes adatok.

Milyen kérdéseket kellene feltenni? Kik az adminisztrátorok, és szükségük van-e azonos szintű jogokra? Megszüntetik-e a hozzáférést, ha valaki kilép a szervezetből? Naplózzák-e, ki exportált adatot? Hogyan történik a jelszó-visszaállítás? Van-e többfaktoros belépés? Mi történik, ha a rendszer hibát jelez: kiszivárogtat-e technikai részleteket? Van-e tesztelt mentés?

Ebben a példában nem egyetlen „nagy hack” a tanulság. A kockázat a kis döntések összeadódásából áll: túl széles jogosultságokból, elmaradt felülvizsgálatból, bizonytalan naplózásból és abból a téves feltételezésből, hogy a belső rendszer automatikusan biztonságos.

## Gyakori tévhitek

**„A HTTPS azt jelenti, hogy az oldal biztonságos.”** A HTTPS elsősorban a kommunikáció védelmében segít. Egy HTTPS-es oldal is kérhet túl sok adatot, tartalmazhat hibás jogosultságkezelést, vagy megtévesztheti a felhasználót.

**„A biztonság a biztonsági szakértő dolga.”** Szakértői tudásra szükség van, de a sérülékenységek nagy része a mindennapi tervezési, fejlesztési és üzemeltetési döntésekben keletkezik vagy előzhető meg.

**„A mi rendszerünk túl kicsi ahhoz, hogy célpont legyen.”** Az automatizált próbálkozások nem válogatnak ismert márkák és kis szolgáltatások között. Ráadásul egy rendszer nemcsak közvetlen célpontként lehet érdekes: felhasználói fiókok, erőforrások vagy más rendszerekhez vezető belépési adatok is értéket képviselhetnek.

**„Ha nincs adatvédelmi incidensünk, akkor minden rendben.”** Lehet, hogy a hiba még nem került felszínre, vagy a rendszer nem tudná megmondani, mi történt. A jó naplózás és rendszeres felülvizsgálat nem a bizalmatlanság jele, hanem a felelős működés része.

## Ellenőrző kérdések

1. Mi a különbség fenyegetés, sérülékenység és kockázat között?
2. Miért nem reális cél a nulla kockázat, és mi a kockázatkezelés célja helyette?
3. Miért szemlélet az OWASP Top 10, nem pedig kizárólag megtanulandó lista?
4. Mondj példát hibás hozzáférés-szabályozásra anélkül, hogy technikai megvalósítást írnál.
5. Miért lehet sérülékeny egy alkalmazás akkor is, ha a saját forráskódja gondosan elkészült?
6. Nevezz meg két üzemeltetési feladatot, amely közvetlenül hozzájárul a webbiztonsághoz.
7. Miért nem igazságos minden felelősséget a felhasználóra hárítani?
8. Milyen kérdéseket tennél fel egy új adminisztrációs funkció tervezésekor?

## Fogalomtár

**OWASP:** Nyílt nemzetközi közösség, amely alkalmazásbiztonsági tudást, útmutatókat és eszközöket tesz közzé.

**Védendő érték (asset):** Olyan adat, rendszer, szolgáltatás vagy képesség, amelynek elvesztése, módosulása vagy nyilvánosságra kerülése kárt okozhat.

**Fenyegetés:** Lehetséges károkozó szereplő vagy esemény.

**Sérülékenység:** A rendszer olyan gyengesége, amelyet fenyegetés kihasználhat.

**Kockázat:** A kedvezőtlen esemény bekövetkezési esélyének és várható hatásának együttese.

**Hozzáférés-szabályozás:** Annak eldöntése és érvényesítése, hogy ki mely erőforráshoz és művelethez jogosult hozzáférni.

**Többrétegű védelem:** Egymást kiegészítő védelmi intézkedések alkalmazása, hogy egyetlen hiba ne okozzon teljes védelmi kudarcot.

**Naplózás:** A rendszerben történt fontos események rögzítése a hibakeresés, ellenőrzés és incidenskezelés érdekében.
