# Interaktivitás, navigáció és kliensoldali állapot

Egy interaktív webalkalmazás nem egyszerűen „oldalak sorozata”, hanem egy folyamatosan változó állapotú rendszer. A jó felületből kiolvasható, hol tart a felhasználó, mi töltődik, mi mentődött el, és miért nem sikerült egy művelet. Az állapotnak mindig ott kell élnie, ahol arra valóban szükség van: sem túl távol, sem túl közel a használójához.

## Mit nevezünk állapotnak?

Az állapot minden olyan információ, amely befolyásolja, mit lát vagy mit tehet a felhasználó egy adott pillanatban. Egy egyszerű keresőoldalon ilyen lehet a keresőkifejezés, az éppen kiválasztott szűrő, a találati lista, a betöltés jelzése és az esetleges hibaüzenet. Ugyanaz a HTML-szerkezet más állapotban teljesen más felületet mutathat.

Vegyünk egy webáruház kosarát. A kosárban lévő termékek száma állapot. Az is állapot, hogy nyitva van-e a kosárpanel. Az is, hogy a felület éppen elküldi-e a rendelést, és az is, hogy a szerver elfogadta-e azt. Ezek nem mind azonos természetű adatok, ezért nem is jó ugyanott kezelni őket.

## UI-állapot: a felület pillanatnyi helyzete

A **UI-állapot** (user interface state) közvetlenül a megjelenéshez tartozik. Például nyitva van-e egy lenyíló menü, melyik fül aktív, fókuszban van-e egy keresőmező, vagy látható-e egy párbeszédablak. Ez általában rövid életű: ha a felhasználó elnavigál, bezárja a fület vagy újratölti az oldalt, sokszor teljesen rendben van, ha eltűnik.

Egy jó ökölszabály: ha az információ csak egyetlen komponens belső működéséhez kell, ott célszerű tárolni. Egy modal ablak `nyitva` állapota ritkán indokol globális, az egész alkalmazásra kiterjedő tárolót. A szükségtelenül globális állapot nehezíti a megértést, mert láthatatlanná teszi, ki és mikor módosíthatja az adatot.

## Szerverállapot: az adat nem a böngésző tulajdona

A **szerverállapot** olyan adat, amelynek hiteles változata a szerveren vagy egy kapcsolódó adatforrásban található. Ilyen a hallgató tantárgyfelvétele, egy közösségi oldal bejegyzései, egy banki egyenleg vagy egy termék tényleges raktárkészlete. A böngésző ezekről csak egy időben korlátozott másolatot tart.

Ennek fontos következménye van: amit a felület előzőleg letöltött, az már lehet elavult. Két felhasználó egyszerre módosíthat ugyanazt az erőforrást; a böngésző hálózata megszakadhat; egy kérés lassabban érkezhet meg, mint egy későbbi kérés. A szerverállapot kezelése ezért nem csak egy `fetch` hívás kérdése. Meg kell jeleníteni a betöltést, kezelni kell a hibát, és dönteni kell arról, mikor tekintjük a korábbi adatot még elfogadhatónak.

Például egy lista betöltésekor három alapvető állapotot különböztetünk meg:

```text
betöltés alatt → sikeres adat → hiba
```

Valódi alkalmazásban lehet negyedik eset is: van korábban megjelenített adat, miközben a háttérben frissítés zajlik. Ez rendszerint kellemesebb élmény, mint a teljes lista eltüntetése minden frissítéskor.

## Tartós állapot: amit később is meg kell őrizni

A **tartós állapot** akkor hasznos, ha az információnak oldalfrissítés vagy új böngészőmunkamenet után is meg kell maradnia. Ilyen lehet a sötét téma választása, egy nem érzékeny felületi beállítás vagy egy félbehagyott űrlap helyben mentett vázlata. Böngészőoldalon erre több eszköz áll rendelkezésre: például cookie, `localStorage`, `sessionStorage` vagy IndexedDB.

Nem minden adat való ezekbe. A `localStorage` egyszerű kulcs–érték tároló, de a böngészőben futó JavaScript hozzáférhet hozzá. Emiatt nem jó hely bizalmas hitelesítő adatoknak. A tartós tárolás nem helyettesíti a szerveroldali jogosultságkezelést, és nem bizonyítja, hogy a felhasználó jogosult valamire.

Az is lényeges, hogy a böngészőben tárolt beállítás egy adott eszközhöz és böngészőprofilhoz kötődik. Ha a felhasználó másik gépen nyitja meg a szolgáltatást, a sötét téma választása csak akkor követi, ha azt a rendszer a felhasználói fiókhoz kapcsolva a szerveren is tárolja.

## Navigáció: dokumentumváltás és kliensoldali útvonalkezelés

A web eredeti navigációs modelljében egy hivatkozásra kattintva a böngésző új dokumentumot kér a szervertől. Az új HTML feldolgozása új oldalbetöltést indít. Ez az úgynevezett teljes dokumentumnavigáció egyszerű, megbízható és továbbra is alapvető mechanizmus.

Sok mai alkalmazás kliensoldali navigációt használ. Ilyenkor az alkalmazás elfogja a belső hivatkozás kattintását, módosítja az URL-t, majd JavaScript segítségével csak a szükséges nézetet és adatokat frissíti. A böngésző címsora továbbra is mutathatja például a `/tantargyak/webprog1` útvonalat, de nem feltétlenül töltődik újra a teljes dokumentum.

Ez gyorsabbnak érződhet, mert a közös keret – fejléc, menü, már letöltött programkód – megmarad. De a kliensoldali navigáció nem felmentés a web alapelvei alól. Minden fontos nézetnek legyen értelmes, megosztható URL-je. Működjön a Vissza és Előre gomb. Oldalfrissítés után is legyen esély a nézet helyreállítására. A hivatkozásokat lehetőleg valódi hivatkozásként kell megvalósítani, nem kattintható `div` elemekként.

## Az URL mint állapot hordozója

Az URL nem csak cím. Hasznos helye lehet a megosztható, visszaállítható állapotnak. Egy terméklista `?q=billentyűzet&sort=price` lekérdezése azt mondja meg, milyen keresést és rendezést lát a felhasználó. Ha elküldi ezt a címet egy társának, a társ jó eséllyel ugyanoda érkezik.

Nem érdemes azonban minden apróságot az URL-be írni. Egy pillanatnyi lenyíló menü nyitottsága vagy egy egérmutató helye nem olyan információ, amelyet bárki meg szeretne osztani. Az URL-be az a felhasználó számára értelmezhető állapot való, amelynek visszaállítása vagy megosztása értékes.

Egy jó tervezési kérdés: „Ha ezt az oldalt könyvjelzőként elmentem, ugyanazt a fontos nézetet kapom vissza?” Ha igen, az állapot egy része valószínűleg jól szerepel az útvonalban vagy a query paraméterekben.

## Cache: hasznos másolat, nem örök igazság

A cache korábban lekért erőforrás vagy adat tárolt példánya. Lehet böngészőcache, HTTP-cache, CDN-cache vagy az alkalmazás saját memóriája. A cél az, hogy ne kérjünk le újra olyan információt, amelynek a meglévő változata még elég jó.

Szerverállapotnál a „még elég jó” üzleti döntés. Egy időjárás-előrejelzés néhány percig lehet elfogadhatóan friss. Egy fizetési tranzakció állapota esetén sokkal óvatosabbnak kell lenni. A cache gyorsít, csökkenti a hálózati terhelést és jobb élményt adhat, de elavult adatot is mutathat.

Gyakori minta a háttérben frissítés: az alkalmazás először megmutatja a cache-ben levő listát, majd új kérést indít. Ha új adat érkezik, frissíti a felületet. Ez kényelmes, de világossá kell tenni, ha a döntéshez feltétlenül aktuális adat kell.

## State management: nem egy könyvtár neve

Az **állapotkezelés** az a tervezési feladat, amely megmondja, hol élnek az adatok, ki módosíthatja őket, mi történik módosításkor, és honnan olvassa őket a felület. Egy állapotkezelő könyvtár segíthet, de önmagában nem old meg rossz adatmodellt vagy rosszul megválasztott felelősségi határokat.

Egy kisebb alkalmazásban elég lehet, hogy az állapot a hozzá tartozó komponensekben él. Több, távoli részt érintő információ – például a bejelentkezett felhasználó vagy a kosár rövid összegzése – közös, alkalmazásszintű helyet kaphat. A szerverről érkező adatokat ugyanakkor érdemes a saját életciklusukkal együtt kezelni: mikor töltődnek, mikor válnak elavulttá, hogyan frissülnek hiba után.

A jó állapotkezelés célja nem az, hogy minden adat globális legyen. A cél az, hogy az adat útja követhető legyen, és a felület következetesen tükrözze a rendszer valós helyzetét.

## Végigvezetett példa: tantárgykereső felület

Tegyük fel, hogy egy tantárgykereső oldalon a hallgató beírja: „web”. A keresőmező aktuális szövege UI-állapot. Ha a keresés könyvjelzőzhető, a `q=web` paraméter az URL-ben is megjelenhet. A találati lista szerverállapot: az alkalmazás egy API-tól kéri, és a válasz később megváltozhat. A felület megjegyezheti a sötét témát `localStorage`-ban; ez tartós kliensoldali állapot.

Kattintáskor a felület először mutathat betöltési jelzést. Ha a válasz megérkezik, megjeleníti a tárgyakat. Ha a hálózat hibázik, nem szabad üres listát úgy mutatni, mintha nem lenne találat: egyértelmű hibaüzenet és újrapróbálási lehetőség kell. Ha a felhasználó gyorsan átírja a keresést „webp”-re, a régebbi „web” válasz később érkezhet meg. A rendszernek meg kell akadályoznia, hogy ez a régi válasz felülírja az újabb keresés eredményét.

## Tipikus hibák

- **Minden adat globális állapotba kerül.** Ettől a rendszer nehezen követhető lesz, és egy kis módosítás sok távoli részt érinthet.
- **A szerverválasz örök igazságként kezelése.** A hálózat és más felhasználók miatt az adat elavulhat.
- **A betöltés és a hiba elrejtése.** Az üres képernyő nem magyarázza el, hogy nincs találat, vagy csak még nincs adat.
- **A URL figyelmen kívül hagyása.** Így a nézet nem megosztható, a Vissza gomb pedig kiszámíthatatlanná válik.
- **Érzékeny adat tartós böngészőtárolóba írása.** Ez biztonsági kockázat, és nem helyettesíti a szerveroldali védelmet.
- **Versenyhelyzetek elhanyagolása.** Több párhuzamos kérés válasza nem feltétlenül a küldés sorrendjében érkezik meg.

## Ellenőrző kérdések

1. Melyik állapottípusba sorolnád a megnyitott menüt, a felhasználó nevét és a sötét téma beállítását?
2. Miért szerverállapot egy termék raktárkészlete akkor is, ha a böngésző már letöltötte?
3. Milyen állapotot érdemes URL-ben tárolni, és mit nem?
4. Milyen előnyt és kockázatot jelent a cache-ből azonnal megjelenített adat?
5. Miért fontos, hogy kliensoldali navigációnál működjön a böngésző Vissza gombja?
6. Hogyan különböztetnéd meg az „üres találat” és a „sikertelen betöltés” felületi állapotát?

## Fogalomtár

- **Állapot (state):** a rendszer olyan aktuális információja, amely befolyásolja a működést vagy a megjelenést.
- **UI-állapot:** a felület rövid életű állapota, például egy nyitott párbeszédablak.
- **Szerverállapot:** a szerver által hitelesen kezelt, a kliens által lekért és esetleg elavuló adat.
- **Tartós állapot:** oldalfrissítés vagy munkamenet után is megőrzendő információ.
- **Kliensoldali navigáció:** nézetváltás teljes dokumentum-újratöltés nélkül, a böngészőben futó alkalmazás segítségével.
- **URL-paraméter:** az URL kérdőjel utáni részében átadott név–érték adat, például `?q=web`.
- **Cache:** korábbi válasz vagy erőforrás tárolt másolata gyorsabb újrafelhasználáshoz.
- **Versenyhelyzet:** olyan helyzet, amikor több párhuzamos művelet eredményének érkezési sorrendje befolyásolhatja a hibamentességet.
