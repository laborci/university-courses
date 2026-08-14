# Statikus webhelygenerálás (SSG)

A „statikus” nem azt jelenti, hogy a webhely elavult, mozdulatlan vagy érdektelen. Azt jelenti, hogy a szervernek nem kell minden látogató kérésére újra összeállítania az oldal alapváltozatát: a HTML, a stíluslapok, a képek és más erőforrások már előre elkészültek. Ez egyszerre lehet gyorsabb, olcsóbb és megbízhatóbb, de csak akkor, ha az oldal tartalma nem igényel minden kérésnél személyre szabott döntést.

## A statikus oldal mögötti ötlet

Képzeljünk el egy tanszéki honlapot. Van rajta bemutatkozás, oktatói profil, tantárgyleírás, hírek és letölthető dokumentumok. Ha valaki megnyitja a „Webprogramozás I” oldalt, a tartalom nagy valószínűséggel ugyanaz lesz minden látogató számára. Nem kell az oldal megjelenése előtt ellenőrizni, hogy ki a látogató, és nem kell adatbázisból újra összerakni a szöveget. Ilyenkor ésszerű, hogy a kiszolgáló egyszerűen átadjon egy már kész HTML-fájlt.

Ez a hagyományos statikus webhely gondolata. Egy mappában például ott lehet az `index.html`, egy `targyak/webprog1/index.html`, néhány CSS- és JavaScript-fájl, valamint a képek. A webszerver feladata többnyire annyi, hogy az URL alapján megkeresse és visszaküldje a megfelelő fájlt.

A mai statikus webhelygenerálás ennél kényelmesebb munkafolyamatot ad. A szerzők nem feltétlenül írnak minden oldalt kézzel HTML-ben. Írhatnak Markdown-formátumban, használhatnak sablonokat, komponenseket és adatszerkezeteket. A generátor a publikálás előtt ezeket feldolgozza, majd elkészíti a böngésző számára szükséges statikus fájlokat. Ezért a módszer neve static site generation, röviden SSG.

## A build idő és a kérés ideje

Az SSG megértésének kulcsa az időpontok szétválasztása. A **build idő** az a pillanat, amikor a fejlesztő vagy a tartalomkezelő közzétételre előállítja a webhelyet. Ilyenkor lefut a generátor, beolvassa a forrásanyagokat, kitölti a sablonokat, optimalizálhat képeket, létrehozhat keresési indexet, és elkészíti a kiadható fájlokat.

A **kérés ideje** ezzel szemben az, amikor egy látogató megnyitja az oldalt. Egy statikusan generált oldalnál ilyenkor a rendszernek tipikusan már csak ki kell szolgálnia a kész eredményt. Nem fut le újra a sablon, és nem kell az adott kéréshez adatbázis-lekérdezést végezni.

Például egy bejegyzés forrása lehet ilyen:

```md
---
title: HTTP alapok
date: 2026-09-14
---

Az HTTP a web kérés–válasz protokollja.
```

A build során ebből készülhet egy teljes oldal navigációval, fejléc- és lábléctartalommal, metaleírással és hivatkozott stíluslapokkal. A látogató már ezt a kész oldalt kapja.

Ez nem azt jelenti, hogy a webhelyen semmi sem változhat futás közben. Egy statikusan kiadott oldal is használhat JavaScriptet: megnyithat egy menüt, megjegyezhet egy beállítást a `localStorage`-ban, vagy lekérhet egy külső API-t. Az SSG elsősorban arról dönt, hogyan áll elő az oldal kezdeti tartalma.

## Miért jó ez tartalmi webhelyeknél?

Sok oldal esetén a tartalom ritkán változik a látogatások számához képest. Ilyen egy dokumentációs oldal, kurzusanyag, blog, konferenciaoldal, portfólió, termékbemutató vagy intézményi tájékoztató. Ezeknél a látogatók ugyanazokat a cikkeket, leírásokat és képeket fogyasztják. Az SSG pontosan ezt a helyzetet használja ki.

Az előre elkészített fájlok könnyen gyorsítótárazhatók. Ha egy oldal fájlja egy évig változatlan nevű, a böngésző vagy egy köztes gyorsítótár később akár új letöltés nélkül is felhasználhatja. Ha egy CSS- vagy JavaScript-fájl tartalma változik, a build eszköz gyakran új, tartalomhoz kötött nevet ad neki, például `app.7f32a.css`. Így a régi fájl biztonságosan maradhat a cache-ben, az új oldal pedig már az új névre hivatkozik.

Egy másik előny a kiszámíthatóság. Ha nincs minden oldalmegnyitás mögött összetett alkalmazáskód és adatbázis, kevesebb olyan mozgó alkatrész van, amely egy egyszerű olvasási kérésnél hibázhat. Természetesen maga a build még elromolhat, és a tárhely vagy a hálózat is lehet hibás, de az oldalkiszolgálás útja rövidebb.

## CDN: a kész fájlok közelebb kerülnek a látogatóhoz

A CDN, vagyis tartalomelosztó hálózat sok földrajzilag elosztott kiszolgálóból áll. A statikus fájlok ideálisak CDN-en való terjesztésre, mert sok látogató számára azonosak. Egy budapesti hallgató kérését egy közeli kiszolgáló válaszolhatja meg, miközben egy tengerentúli látogató egy másik, hozzá közelebb lévő példánytól kapja meg ugyanazt az oldalt.

Ez nem varázslat és nem csak sebességkérdés. A kisebb fizikai távolság általában rövidebb késleltetést jelent, a sok kiszolgáló pedig csökkentheti annak esélyét, hogy egyetlen gép legyen szűk keresztmetszet. Egy népszerű cikk vagy pályázati felhívás így sok párhuzamos olvasót képes kiszolgálni anélkül, hogy minden kérés egy központi alkalmazásszerverhez futna be.

Egy egyszerű publikálási folyamat így néz ki:

1. A szerző módosítja a cikket vagy a sablont.
2. A build folyamat létrehozza az új HTML-, CSS-, JavaScript- és médiafájlokat.
3. A kiadás feltölti vagy érvényesíti ezeket a tárhelyen és a CDN-en.
4. A következő látogató már az új verziót kapja, a cache-szabályoknak megfelelően.

Fontos, hogy a CDN nem kizárólag statikus webhelyekhez használható; dinamikus alkalmazások is tehetnek rá képeket, stíluslapokat és más statikus erőforrásokat. SSG esetén azonban a teljes oldal nagy része is terjeszthető így.

## Frissítés: mikor változik meg az oldal?

A statikus generálás ára, hogy a forrásban elvégzett módosítás még nem azonnal jelenik meg a látogató előtt. Előbb új buildnek kell készülnie, majd azt ki kell adni. Egy kurzusoldal órarendjének javítása vagy egy blogbejegyzés közzététele tehát a kiadási folyamathoz kötődik.

Ez sok esetben teljesen elfogadható. Ha egy napi hírösszefoglaló tíz perc késéssel jelenik meg, az gyakran nem gond. Ha viszont egy repülőjegy ára, raktárkészlet, tőzsdei árfolyam vagy személyre szabott tanulmányi eredmény jelenik meg, az előre generált változat hamar elavulhat.

Erre több stratégia létezik. A webhely készülhet újra minden tartalomváltozásnál. Egy tartalomkezelő rendszer ilyenkor értesítést küld a buildnek. Egyes rendszerek csak a megváltozott oldalakat állítják elő újra, mások időszakosan frissítenek. Előfordul az is, hogy az oldal váza statikus, de egy kisebb, aktuális adatot a böngésző később API-ból tölt be.

Az utóbbi megoldásnál fontos kérdés: mit lát a felhasználó, amíg az adat nem érkezett meg? Ha a készletinformáció vagy a bejelentkezett felhasználó neve csak később jelenik meg, azt a felületnek tisztességesen kell jeleznie. A „statikus plusz dinamikus részlet” erős minta, de nem szünteti meg az állapot- és hibakezelés feladatát.

## Kompromisszumok és határok

Tévhit, hogy az SSG mindig a leggyorsabb megoldás. Egy óriási, több százezer oldalból álló katalógus teljes újragenerálása hosszú lehet. Egy nagyon nagy kép- vagy keresési index előállítása is költséges. A build idő tehát maga is erőforrás és tervezési szempont.

Az sem igaz, hogy statikus webhelyhez nem kell szerveroldali gondolkodás. A kapcsolatfelvételi űrlap, a fizetés, a belépés, a jogosultságok és a bizalmas adatok kezelése mögött továbbra is lesz szerveroldali szolgáltatás. A kérdés az, hogy a teljes oldal minden eleme ettől függjön-e.

Jó döntés lehet az SSG, ha a fő tartalom nyilvános, sok olvasó számára azonos, és a frissítés percnyi vagy órányi késése elfogadható. Kevésbé jó választás olyan alkalmazásnál, ahol minden képernyő a bejelentkezett személy adataiból, azonnali üzleti folyamatokból vagy gyorsan változó közös állapotból épül fel.

## Végigvezetett példa: egy konferenciaoldal

Egy konferencia programja, előadói listája és helyszínleírása jó SSG-jelölt. A szervezők a tartalmat fájlokban vagy egy szerkesztőfelületen kezelik. Buildkor minden előadónak és programblokknak elkészül a saját oldala, valamint a napokra bontott programlista. A fájlok CDN-re kerülnek, így a meghirdetés napján sok látogató gyorsan meg tudja nyitni őket.

Az élő férőhelyszám már más kérdés. Ha ezt mindenki számára pontosan, azonnal kell mutatni, azt érdemes külön API-ból kérni. A jelentkezési űrlap elküldése is szerveroldali feldolgozást igényel. A konferenciaoldal tehát lehet nagyrészt statikus, miközben néhány célzott, dinamikus funkció egészíti ki.

## Gyakori tévhitek

- **„A statikus oldal csak HTML lehet.”** A kiadás eredménye lehet HTML, CSS, JavaScript, kép, betűtípus, adatfájl és sok más erőforrás. A generátor forrásanyaga pedig lehet Markdown, sablon vagy komponensrendszer.
- **„A statikus oldal nem lehet interaktív.”** Lehet. Az interakció a böngészőben futó JavaScriptből vagy külső szolgáltatásokból jöhet.
- **„CDN mellett nincs szükség cache-szabályokra.”** A CDN is cache-el, de a böngésző, a CDN és az eredeti tárhely együttműködését tudatosan kell beállítani.
- **„A build mindig ingyenes.”** A build gépidőt, függőségeket, hibakezelést és kiadási fegyelmet igényel; nagy oldalaknál ez jelentős költség lehet.

## Ellenőrző kérdések

1. Mi történik build időben, és mi történik egy látogató kérésének idején?
2. Miért előnyös egy CDN számára, ha a legtöbb látogató ugyanazt a fájlt kéri?
3. Mondj három olyan webhelytípust, amely jó jelölt SSG-re, és indokold röviden.
4. Milyen probléma adódhat, ha egy gyorsan változó készletinformációt csak a napi build frissít?
5. Hogyan egészíthet ki egy statikus oldalt egy kis dinamikus funkció?
6. Miért nem jelenti a „statikus” szó azt, hogy nincs JavaScript az oldalon?

## Fogalomtár

- **SSG (Static Site Generation):** weboldalak előállítása a kiadás előtt, kész fájlok formájában.
- **Build:** a forrásanyag feldolgozása és a kiadható webhelyfájlok létrehozása.
- **Build idő:** az előállítás időszaka, nem a látogató kérésének pillanata.
- **CDN:** földrajzilag elosztott hálózat, amely a tartalmat a látogatóhoz közeli kiszolgálóról adhatja át.
- **Cache:** korábban letöltött vagy előállított eredmény ideiglenes tárolása későbbi gyors felhasználásra.
- **Tartalmi webhely:** főként olvasásra szánt, nyilvános információt közlő oldal, például blog vagy dokumentáció.
- **Kiadás (deploy):** az elkészült verzió elérhetővé tétele a látogatók számára.
