# Többoldalas és egyoldalas alkalmazások

Az MPA és a SPA nem két egymást kizáró korszak, hanem két eltérő válasz arra, hogyan juttassuk el az alkalmazás állapotát és felületét a felhasználóhoz. A jó választás a feladatból következik: egy cikkolvasó oldal és egy online szerkesztő nem ugyanazt a navigációs élményt, adatforgalmat vagy kezdeti betöltést igényli.

## Két ismerős élmény mögötti különbség

Amikor egy hírportálon megnyitunk egy másik cikket, gyakran teljesen új dokumentum érkezik a böngészőbe. Az oldal címe, fő tartalma, menüje és a kapcsolódó stílusok egy új HTTP-válasz részei. Ez a klasszikus többoldalas működés. A böngésző a korábbi dokumentumot lecseréli, felépíti az új DOM-fát, majd kirajzolja az oldalt. A címsorban természetesen új URL jelenik meg, és a vissza gomb is a böngésző megszokott történetét követi.

Ezzel szemben egy levelezőprogram vagy térképes felület sokszor úgy vált nézetet, hogy a teljes dokumentum nem töltődik újra. Az alkalmazás induláskor letölt egy HTML-vázat és jellemzően jelentősebb JavaScript-kódot. Később a JavaScript módosítja a képernyő egyes részeit, adatot kér le a háttérszolgáltatástól, és a History API segítségével az URL-t is tudja kezelni. Ez az egyoldalas alkalmazás alapgondolata: egy dokumentumon belül több „oldalélményt” hoz létre.

Fontos, hogy a felhasználó szempontjából az „oldal” nem azonos a HTML-dokumentummal. Egy SPA-ban lehet külön útvonala egy üzenetnek, egy beállításnak és egy keresésnek, még akkor is, ha a böngésző csak az induláskor kapott teljes HTML-dokumentumot. Fordítva, egy MPA is tud rendkívül gyors és folyamatos élményt adni, ha jól használja a böngésző gyorsítótárát és csak a szükséges erőforrásokat tölti le.

## Mi történik navigációkor?

MPA esetén a felhasználó például a `https://pelda.hu/termekek/42` linkre kattint. A böngésző HTTP-kérést indít erre az URL-re. A szerver tipikusan egy teljes HTML-választ küld, amelyben linkek vannak CSS-fájlokra, JavaScriptre, képekre és betűtípusokra. A böngésző ezek közül sokat párhuzamosan kér le. Nem minden kerül át újra a hálózaton: a korábban letöltött stíluslap vagy logó lehet a böngésző cache-ében. A dokumentumváltás tehát nem feltétlenül jelent minden bájt ismételt letöltését, de a böngészőnek új dokumentumot kell feldolgoznia.

SPA esetén ugyanazon kattintásnál az alkalmazás saját útvonalkezelője elfoghatja a navigációt. Nem a böngésző kér új dokumentumot, hanem a kliensoldali kód eldönti, melyik nézetet kell megjeleníteni. Ezután kérhet például egy `GET /api/products/42` választ JSON formátumban, és az abból kapott adatokkal frissíti a már létező felületet. A váltás ettől gyakran nagyon közvetlennek érződik. Ugyanakkor az alkalmazásnak több feladatot kell pontosan kezelnie: betöltési állapotot, hibaüzenetet, jogosultságot, a vissza gomb működését, dokumentumcímet és a fókusz megfelelő áthelyezését is.

## Végigvezetett példa: egy egyetemi tárgyfelvételi felület

Képzeljünk el egy rendszert, amelyben a hallgató tárgyakat keres, megnyitja egy tárgy adatlapját, és felveszi azt. MPA-változatban a keresési találatra kattintás teljes oldalbetöltést indít: a szerver visszaadja a tárgy adatlapját. A felvétel gomb egy `POST` kérést küld, majd a szerver átirányít a frissített órarendre. Ez könnyen követhető modell: minden fontos állapothoz önálló URL és szerver által elkészített oldal tartozik. Ha a felhasználó új lapon nyitja meg a tárgyat, vagy elküldi a linket egy társának, a rendszernek természetes módon működnie kell.

SPA-változatban a tárgylista, az adatlap és az órarend ugyanazon alkalmazás különböző nézetei. A keresési eredmények frissülhetnek gépelés közben, a tárgyfelvétel után pedig a képernyő egyetlen területe változik meg. Ez kényelmes olyan munkafolyamatban, ahol a felhasználó sok, egymáshoz kapcsolódó műveletet végez. Cserébe az alkalmazásnak gondoskodnia kell arról, hogy egy közvetlenül megnyitott `/targyak/WEBPROG1` útvonal is működjön, a frissítés után se vesszen el az állapot, és a képernyőolvasó számára is jelezze a nézetváltást.

Az első változat lehet jobb, ha ritka, egyszerű tranzakciókról és sok nyilvános információról van szó. A második indokolt lehet, ha a munka közben gyors, ismételt módosítások és összetett kliensoldali állapot jelenik meg. Nem a címke, hanem a használati helyzet dönt.

## Erőforrások és teljesítmény

Az MPA tipikus előnye, hogy az első megjelenítéshez gyakran kevesebb JavaScript szükséges. A szerver elküldi az értelmes HTML-t, ezért az olvasnivaló hamar megjelenhet. Minden navigációkor van új dokumentumkérés és feldolgozás, de a megosztott CSS, kép vagy betűtípus rendszerint cache-ből érkezik. A modern böngészők és HTTP-verziók mellett ez a minta sok esetben gyorsabb, mint amilyennek a „minden oldal újratöltődik” megfogalmazás alapján tűnik.

Egy SPA esetén az induló JavaScript-csomag, a *bundle* lehet nagy. Amíg a kód le nem töltődik és futni nem kezd, az alkalmazás nem biztos, hogy érdemben használható. A későbbi nézetváltások azonban gyorsak lehetnek, mert a keretrendszer és több közös komponens már a memóriában van. A jó SPA ezért feloszthatja a kódot: nem tölti le előre a ritkán használt adminisztrációs nézet minden erőforrását. Ezt hívjuk kód-szeletelésnek (*code splitting*).

Nem szabad a betöltési időt kizárólag másodpercekben látni. Más kérdés, hogy mikor látszik először tartalom, mikor reagál a gomb, mennyi mobil adatforgalom fogy, és milyen gyors a következő művelet. Egy nagy kezdőcsomag gyors hálózaton elfogadhatónak tűnhet, régebbi telefonon viszont hosszú ideig üres vagy akadozó felületet eredményezhet.

## SEO és megoszthatóság

A keresőoptimalizálás (SEO) lényege nem a kereső „becsapása”, hanem hogy a kereső és a felhasználó egyaránt megtalálja és értse a tartalmat. A hagyományos MPA-ban a nyilvános oldal tartalma gyakran közvetlenül a HTML-ben van, így a keresőrobot számára egyszerűbben feldolgozható. Minden cikkhez természetes URL, cím, leírás és belső link tartozhat.

Egy SPA is lehet kereshető, de több figyelmet igényel. Ha az induló HTML csak egy üres alkalmazáskonténer, a tényleges tartalom pedig később JavaScriptből érkezik, egyes robotok vagy megosztási előnézetet készítő szolgáltatások nem feltétlenül látják ugyanazt. A nyilvános, kereshető tartalomnál ezért sok rendszer szerveroldali vagy előre elkészített HTML-lel egészíti ki a kliensoldali működést. Ez már átvezet a következő órák CSR-, SSR- és statikus generálási modelljeihez.

## Akadálymentesség és megbízható navigáció

Teljes dokumentumváltáskor a böngészőnek sok beépített viselkedése van: a dokumentum címe megváltozik, a képernyőolvasó érzékeli az új oldalt, a fókusz és a címsor a megszokott módon működik. SPA-ban ezeket a fejlesztőnek tudatosan pótolnia kell. Nézetváltáskor értelmes oldal címet kell beállítani, a fókuszt a fő tartalom vagy egy címsor felé kell vezetni, és a dinamikus változásokat szükség esetén jelezni kell.

Ez nem érv a SPA ellen, hanem emlékeztető: a „lágy” navigáció nem automatikusan jobb navigáció. A siker kritériuma az, hogy egérrel, billentyűzettel, érintéssel, képernyőolvasóval és lassú hálózaton is érthető maradjon, mi történt.

## Gyakori tévhitek

**„A SPA mindig gyorsabb.”** A nézetváltás lehet gyorsabb, de az első betöltés, a JavaScript feldolgozása és a mobil eszköz terhelése kedvezőtlenebb lehet. Mérni kell, nem feltételezni.

**„Az MPA elavult.”** Számos tartalomközpontú és üzleti rendszer tudatosan többoldalas. A minta a web alapvető működésére épít, és ma is teljesen korszerű.

**„SPA-val nincs valódi URL.”** Van: az útvonalakat a kliensoldali router és a History API kezeli. Viszont gondoskodni kell a közvetlen megnyitásról és a szerveroldali útvonalkezelésről.

**„A SEO csak marketing.”** A megfelelő struktúra, címek, linkek és elérhető HTML az információ megtalálhatóságát és használhatóságát is javítja.

## Ellenőrző kérdések

1. Mi a lényegi különbség az MPA és a SPA navigációja között?
2. Miért nem jelenti egy MPA-nál a dokumentumváltás szükségszerűen minden erőforrás újbóli letöltését?
3. Milyen többletfeladatokat kap egy SPA a böngésző beépített navigációs viselkedése helyett?
4. Miért lehet egy nyilvános cikkarchívum számára előnyös a teljes HTML-t adó megoldás?
5. Nevezz meg egy olyan alkalmazást, ahol a SPA indokolt lehet, és érvelj mellette!

## Fogalomtár

- **MPA:** olyan webes alkalmazás, ahol a navigáció jellemzően új HTML-dokumentum lekérésével jár.
- **SPA:** olyan alkalmazás, amely egy betöltött dokumentumon belül, JavaScript segítségével vált nézeteket.
- **Router:** az URL és a megjelenítendő nézet kapcsolatát kezelő komponens vagy logika.
- **History API:** böngészőfunkciók, amelyekkel a webalkalmazás az előzményeket és az URL-t teljes újratöltés nélkül kezelheti.
- **Bundle:** a böngésző számára elkészített, jellemzően összecsomagolt JavaScript-erőforrás.
- **SEO:** a tartalom keresők és felhasználók számára való megtalálhatóságának javítása.
