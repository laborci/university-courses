# Demonstráció: akadálymentesség és teljesítmény vizsgálata

## Célok

Ez a demonstráció azt mutatja meg, hogy a „jól néz ki nálam” nem azonos a jó minőségű webhellyel. A hallgatók egy nyilvános, oktatásra biztonsággal használható oldal példáján látják, hogyan lehet első benyomást szerezni az akadálymentességről és a betöltési teljesítményről. A vizsgálat nem teljes tanúsítás, nem behatolási teszt és nem végleges ítélet. Rövid, ismételhető audit, amelyből javítási hipotézisek születnek.

Az akadálymentesség és a teljesítmény nem két utólagos ellenőrzőlista. A szemantikus szerkezet, az érthető felirat, a billentyűzettel járható felület, a megfelelő kontraszt és a takarékos erőforrás-használat ugyanannak a minőségi szemléletnek a részei. Automatizált eszközök gyorsan észrevesznek sok hibát, de nem tudják helyettünk megérteni a feladatot vagy a felhasználó helyzetét.

## Előkészület és etikai határ

Az oktató válasszon egy egyszerű, szabadon látogatható oldalt, vagy még jobb: egy erre a célra készített gyakorlóoldalt. Ne használjon bejelentkezést, személyes adatot, fizetési folyamatot, és ne küldjön módosító kéréseket. A böngésző fejlesztői eszközeinek megfigyelő funkciói elegendők. Minden mérés pillanatfelvétel: a hálózat, a gyorsítótár, a földrajzi hely és a böngésző-bővítmények megváltoztathatják az eredményt.

Már az elején tisztázzuk, mit nézünk. Az **akadálymentesség** azt vizsgálja, hogy különböző képességekkel, eszközökkel és helyzetekben használható-e a felület. A **teljesítmény** nem csak a szerver válaszideje: számít, milyen hamar látszik valami értelmes, mikor válik kezelhetővé az oldal, és mennyi adatot kell a felhasználó eszközének letöltenie, feldolgoznia.

## Oktatói forgatókönyv, 1. rész: emberi első benyomás

Nyissuk meg az oldalt normál böngészőablakban. Ne eszköztárral kezdjünk. Kérjük meg a hallgatókat, hogy tíz másodperc alatt válaszoljanak: mi az oldal célja, mi a fő következő lépés, és milyen információt várnának egy linken vagy gombon? Ha a cél nem látható gyorsan, az már használhatósági jelzés.

Ezután szűkítsük az ablakot mobilméretre, majd növeljük meg a böngésző nagyítását. Keressük, levágódik-e szöveg, eltűnik-e menü, egymásra csúszik-e tartalom, vagy a vízszintes görgetés kényszerűvé válik-e. Fontos megfogalmazni: a reszponzív elrendezés nem kizárólag telefonméret. Nagyítást használhat gyengén látó, és az ablakméretet sokféle helyzet alakíthatja.

## Oktatói forgatókönyv, 2. rész: szemantika és elnevezések

Nyissuk meg a fejlesztői eszközök Elements/Inspector nézetét. Keressük meg a fő tartalmat, a navigációt, a fejlécet és a láblécet. Ideális esetben a HTML nem csak sok egymásba ágyazott `div`, hanem a dokumentum jelentését hordozó elemeket is használ: `header`, `nav`, `main`, `article`, `section`, `footer`, valamint valódi címsorokat.

Mutassuk meg a címsorok sorrendjét. A `h1` általában a lap fő témája; az alfejezetek logikusan követik. A vizuálisan nagy szöveg nem lesz címsor attól, hogy a CSS nagy betűméretet ad neki. A képernyőolvasó felhasználó címsorokkal navigálhat, ezért a szerkezeti ugrások vagy az üres, ismétlődő címek valódi akadályok.

Vizsgáljunk meg néhány linket és gombot. A „Kattints ide” önmagában keveset mond, különösen linklistában. A „Jelentkezés a webes akadálymentesség előadásra” már hordozza a célt. Gombnak akkor van értelme, ha az oldalon műveletet indít; navigációhoz link való. Ez nem puszta HTML-stílus: a szerep hatással van billentyűzetes működésre és segítő technológiák által közvetített jelentésre.

Képeknél nézzük meg az alternatív szöveget. Információt hordozó képnek röviden el kell mondania a lényegét; dekoráció esetén a kép kihagyható a felolvasásból. A fájlnév, például `hero-final2.png`, nem alternatív leírás. Egy grafikon `alt` szövege viszont foglalja össze a fő trendet, a részletes táblázat vagy leírás pedig külön is elérhető lehet.

## Oktatói forgatókönyv, 3. rész: csak billentyűzettel

Kattintsunk a címsorba, majd tegyük félre az egeret. A `Tab` billentyűvel lépjünk végig az interaktív elemeken, a `Shift+Tab`-bal visszafelé. Hangosan mondjuk ki, mi történik: látható-e mindig a fókusz, logikus-e a sorrend, elérhető-e a menü, meg lehet-e nyitni és bezárni egy párbeszédablakot? A fókuszjelölés eltüntetése gyakori látványtervezési hiba; a billentyűzetet használó ember ekkor elveszítheti a helyét.

Ha van felugró ablak, nyissuk meg. A fókusznak a párbeszédablakba kell kerülnie, a háttér elemei nem maradhatnak véletlenül bejárhatók, és bezárás után ésszerűen vissza kell térnie az indító gombhoz. Ne várjuk el, hogy egy automatikus ellenőrző ezt teljesen megítélje: ez jó példa arra, miért kell emberi teszt.

Űrlap esetén nézzük, hogy minden beviteli mezőhöz tartozik-e látható és programozott címke. A csak helykitöltő szövegre épülő mező hibás lehet: gépeléskor eltűnik a magyarázat, és a kapcsolat sem mindig egyértelmű a segítő technológiának. Hiba esetén a szöveg legyen konkrét: „Az e-mail-cím formátuma nem megfelelő”, ne csak piros keret vagy „Hiba”.

## Oktatói forgatókönyv, 4. rész: kontraszt és vizuális érthetőség

A fejlesztői eszközök stílus- vagy akadálymentességi nézetében jelöljünk ki egy halvány szürke szöveget, egy elsődleges gombot és egy hibaüzenetet. A böngésző vagy egy ellenőrző eszköz jelezheti a kontrasztarányt. Magyarázzuk el, hogy a jó kontraszt nem csupán színvakság kérdése: erős napfényben, fáradt szemmel vagy rossz kijelzőn is segít.

Nem elegendő kizárólag színnel közölni állapotot. Ha a hibás mező csak pirossá válik, a jelentés elveszhet. Az ikon mellé szöveg, a grafikon mellé címke, a kötelező mezőhöz egyértelmű jelölés kell. Ugyanakkor a túl sok villogás, automatikusan induló mozgás vagy a szöveget elfedő felugró ablak szintén ronthatja az élményt.

## Oktatói forgatókönyv, 5. rész: Lighthouse-szerű ellenőrzés

Nyissunk meg egy böngészőbe épített auditpanelt vagy Lighthouse-szerű eszközt. Futtassunk vizsgálatot lehetőleg új, gyorsítótár nélküli betöltéssel, majd hangsúlyozzuk: a pontszám diagnosztikai jel, nem osztályzat. Az eszköz tipikusan teljesítményre, akadálymentességre, bevált gyakorlatokra és kereshetőségre ad javaslatot.

Olvassunk el együtt három találatot, ne csak a számot. Ha az eszköz hiányzó alternatív szöveget jelez, keressük meg a képet a DOM-ban. Ha kontrasztproblémát jelez, nézzük a konkrét szöveg- és háttérszínt. Ha a címkével nem rendelkező űrlapmezőt említi, próbáljuk ki billentyűzettel is. Ez alakítja át a „javítsuk a pontszámot” reflexet valódi megértéssé.

Az automatika többek között nem tudja eldönteni, hogy egy `alt` szöveg értelmes-e, a címsorok valóban logikus történetet alkotnak-e, vagy a gomb felirata a helyzetben félrevezető-e. A magas pontszám ezért nem bizonyíték teljes akadálymentességre; a nulla hiba pedig nem váltja ki a valódi felhasználókkal végzett tesztelést.

## Oktatói forgatókönyv, 6. rész: hálózat, képek és betöltés

Váltsunk a Network nézetre, kapcsoljuk be a gyorsítótár kikapcsolását, és töltsük újra az oldalt. Az idővonalon nézzük meg a dokumentumot, a stíluslapokat, JavaScript-fájlokat, képeket, betűtípusokat és külső kéréseket. Kérdezzük meg: melyik fájl kell ahhoz, hogy az oldal első értelmes része megjelenjen? Melyik érkezik későn? Mi tölthető be csak akkor, amikor tényleg szükséges?

A vízesésdiagram segít megérteni, hogy sok kicsi késés összeadódhat. Egy nagyméretű hero-kép, blokkoló szkript vagy több külső szolgáltató lassíthatja a látható tartalom megjelenését. A cél nem az, hogy vakon minél kevesebb kérés legyen, hanem hogy a kritikus tartalom előbb, a másodlagos erőforrások pedig ésszerűen érkezzenek.

Jelöljünk ki két képet. Hasonlítsuk össze a megjelenített méretüket a letöltött fájl méretével és felbontásával. Egy telefonon 400 képpont szélességben megjelenő, több ezer képpont széles fénykép fölösleges adat és feldolgozás lehet. Beszéljünk a korszerű formátumokról, méretváltozatokról, tömörítésről és a késleltetett betöltésről. A késleltetés azonban nem mindenre jó: a kezdőképernyő legfontosabb képe késői betöltéssel ronthatja a felhasználói élményt.

Nézzük meg azt is, okoznak-e a képek elrendezési ugrást. Ha a böngésző előre nem tudja a kép helyigényét, a betöltéskor lejjebb tolhatja a már olvasható szöveget. Ez bosszantó, sőt félrekattintáshoz vezethet. A méretek előzetes megadása tehát nem kozmetika.

## Példa: három leletből javítási terv

Egy képzeletbeli rendezvényoldalon a vizsgálat három problémát jelez: a menüben nincs látható fókusz, a főcím alatti halvány szöveg kontrasztja gyenge, és a kezdőképernyőre egy nagy felbontású fotó töltődik be. A javítási terv nem „futtassuk újra az auditot”. Először visszaállítjuk és tervezzük a fókuszjelölést, majd valós billentyűzetes próbával ellenőrizzük. Másodszor olyan színpárt választunk, amely olvasható marad. Harmadszor megfelelő képméretet és formátumot készítünk, közben fenntartjuk a kép helyét az elrendezésben. Végül újramérünk, és emberi szemmel is ellenőrizzük, hogy a javítás nem hozott új gondot.

## Gyakori tévhitek

**„Az automatikus audit végső igazság.”** Hasznos szűrő, de nem érti a tartalmi jelentést és a teljes használati folyamatot.

**„A reszponzív oldal akadálymentes.”** A kis képernyőhöz való igazodás csak egy szempont; fókusz, szemantika, feliratok és kontraszt ettől függetlenek.

**„A gyors oldal csak erős szervert jelent.”** A képek, szkriptek, betűkészletek, kliensoldali feldolgozás és hálózat mind számítanak.

**„A hibát pirossal jelölni elég.”** A szín önmagában nem mindenki számára hozzáférhető, és nem magyarázza el a teendőt.

## Ellenőrző kérdések

1. Miért érdemes az auditot emberi bejárással kezdeni?
2. Milyen különbség van a vizuálisan nagy szöveg és a valódi címsor között?
3. Mit figyelünk `Tab`-bal történő bejáráskor?
4. Miért nem elég egy magas akadálymentességi pontszám?
5. Mit tudhatunk meg a Network vízesésdiagramjából?
6. Miért okozhat gondot egy túl nagy kép akkor is, ha végül szépen jelenik meg?
7. Mondj olyan problémát, amelyet automatika jelezhet, és olyat, amelyhez emberi értelmezés kell.

## Fogalomtár

**Alternatív szöveg (`alt`):** képek jelentését közvetítő szöveg segítő technológiák számára.  
**Fókusz:** a billentyűzet által éppen vezérelt interaktív elem állapota.  
**Kontraszt:** előtér és háttér vizuális elkülönülésének mértéke.  
**Lighthouse-szerű audit:** automatikus, böngészőből futtatható minőségi ellenőrzés.  
**Szemantikus HTML:** a tartalom szerkezetét és szerepét jelentő elemek használata.  
**Víz(esés)diagram:** hálózati kérések időbeli lefutását ábrázoló nézet.  
**Elrendezési ugrás:** a betöltés közbeni váratlan tartalomelmozdulás.
