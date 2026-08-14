# Hitelesítés és jogosultságkezelés

## Célok

Az anyag végére a hallgató világosan elkülöníti a hitelesítést (Authentication, AuthN) a jogosultságkezeléstől (Authorization, AuthZ). Megérti, hogy egy rendszernek nem elég megállapítania, ki a kérés küldője: minden védett műveletnél azt is vizsgálnia kell, mit tehet az illető. Képes lesz alapvető hozzáférési modelleket, többlépcsős hitelesítést, külső azonosítós belépést és tipikus engedélyezési hibákat értelmezni.

**Az AuthN arra válaszol, hogy „ki vagy?”, az AuthZ pedig arra, hogy „ezt megteheted-e?”. A sikeres belépés soha nem jelent korlátlan hozzáférést.**

Egy könyvtárba való belépésnél az olvasójegy megmutatása a hitelesítéshez hasonlít: a könyvtár megállapítja, hogy valóban az a személy vagy, akinek mondod magad. Az, hogy kölcsönözhetsz-e ritka kéziratot, beléphetsz-e a raktárba vagy szerkeszthetsz-e katalógusadatot, már jogosultsági kérdés. A két lépés a weben is külön problémakör, és összekeverésük sok súlyos adatvédelmi hibához vezet.

## Hitelesítés: milyen bizonyíték alapján hiszünk a személyazonosságban?

Az AuthN célja nem filozófiai értelemben vett személyazonosság megállapítása, hanem annak eldöntése, hogy a rendszer elegendő bizonyítékot kapott-e egy digitális azonosító használatához. Ez a bizonyíték hagyományosan három csoportba sorolható.

Valami, **amit tudunk**: jelszó, PIN, helyreállítási kód. Valami, **amink van**: telefonos hitelesítő alkalmazás, hardveres biztonsági kulcs, intelligens kártya. Valami, **amik vagyunk**: ujjlenyomat vagy arcfelismerés. A többfaktoros hitelesítés (MFA) legalább két különböző típusú tényezőt kombinál. Az a helyzet, amikor valaki jelszót és ugyanabba az e-mail-fiókba érkező kódot ad meg, nem feltétlenül két független tényező: a támadási felületet kell vizsgálni, nem csupán a képernyők számát.

A jelszó nem a felhasználó személye; csak egy titok, amelyet elvileg csak ő ismer. A szolgáltatásnak nem szabad visszafejthető formában eltárolnia. A helyes elv a lassú, sózott jelszó-hash használata. Ez azért fontos, mert egy adatbázis-szivárgás esetén a támadó ne kapjon azonnal használható jelszólistát. A felhasználó oldalán egyedi, hosszú jelszó és jelszókezelő használata jelent lényeges védelmet.

Bizonyos helyzetekben a rendszer a már meglévő belépés mellett újabb bizonyítékot kér. Ez a step-up authentication: egy tanulmányi rendszerben a jegyek megtekintése alacsonyabb kockázatú lehet, mint a bankszámlaszám megváltoztatása vagy egy teljes személyesadat-export letöltése. A jó rendszer a kockázathoz igazítja a súrlódást.

## Jogosultságkezelés: mire terjed ki a hozzáférés?

Az AuthZ egy hitelesített – vagy ritkán névtelen – kérésről dönti el, elvégezhető-e a kívánt művelet az adott erőforráson. A kérdés általában legalább három részből áll: ki kér valamit, mit akar tenni, és melyik konkrét adaton. A „tanár” szerepkör például nem jelentheti azt, hogy bármelyik tantárgy bármelyik hallgatójának bármelyik adatát módosíthatja.

Az egyik gyakori modell az RBAC (Role-Based Access Control), szerepköralapú hozzáférés. A hallgató, oktató, tanszéki adminisztrátor szerephez jogosultságok tartoznak. Előnye az érthetőség és az egyszerű üzemeltetés. Hátránya, hogy sok kivétel és sok szervezeti kombináció esetén a szerepkörök elszaporodhatnak.

Az ABAC (Attribute-Based Access Control) attribútumok alapján dönt. Ilyen attribútum lehet a kérő szervezete, a tantárgyhoz rendelt oktatói viszonya, az erőforrás tulajdonosa, az időpont vagy az adat érzékenysége. Egy szabály lehet például: „az oktató akkor módosíthat jegyet, ha az adott kurzus kijelölt oktatója, a félév aktív, és a hallgató felvette a kurzust.” Ez pontosabb, de összetettebb szabályokat, áttekinthető döntési naplót és alapos tesztelést kíván.

Létezik tulajdonosi alapú gondolkodás is. Egy dokumentum tulajdonosa megoszthatja azt másokkal; a hozzáférési lista (ACL) konkrét személyeket vagy csoportokat sorol fel. Ez intuitív lehet fájlmegosztásnál, de sok dokumentum, öröklés és csoporttagság esetén nehezen követhetővé válhat.

## A teljes döntési lánc

Tegyük fel, hogy Dóra megnyitná a `/kurzusok/webprog1/hallgatok/123/jegy` címet. Először a rendszer hitelesíti: a session vagy token alapján megállapítja, hogy Dóra azonosítója `oktato-77`. Ez még csak AuthN. Ezután a jogosultsági réteg megkérdezi: Dóra oktatója-e a Webprogramozás I kurzusnak? Jogosult-e jegyet rögzíteni? A `123` azonosító valóban azon kurzus hallgatója? A művelet a megfelelő időszakban történik? Csak ha minden releváns feltétel teljesül, engedélyezhető a változtatás.

Itt különösen fontos, hogy az ellenőrzés a szerveren történjen. A böngészőben elrejtett „Szerkesztés” gomb nem biztonsági intézkedés. Egy támadó manuálisan elküldheti ugyanazt a kérést, vagy átírhatja az URL-ben az azonosítót. Ha a szerver csak azt vizsgálja, hogy a felhasználó bejelentkezett-e, de nem azt, hogy hozzáférhet-e a megadott objektumhoz, úgynevezett IDOR/BOLA jellegű hibát követ el: azonosító megváltoztatásával más ember erőforrása válhat elérhetővé.

## Végigvezetett példa: kurzuskezelő rendszer

Egy kurzuskezelő rendszerben három személy van: Nóra hallgató, Tamás oktató és Eszter tanulmányi adminisztrátor. Nóra belép a jelszavával és egy hitelesítő alkalmazás által generált kóddal. A rendszer hitelesíti, majd létrehoz egy munkamenetet. Nóra ezután megtekintheti saját beadandóit. A rendszer azonban minden lekérésnél ellenőrzi, hogy a kért beadandó tulajdonosa Nóra-e, vagy a feladatot ténylegesen megosztották vele.

Tamás ugyancsak belép, de más szerepkört kap. Ő a saját kurzusaihoz tartozó beadandókat értékelheti, viszont nem kérheti le Nóra más tárgyainak munkáit. Eszter egyes tanulmányi adatokat javíthat, de nem feltétlenül olvashatja a beadandók szövegét. A szerepköröket nem „felhasználói címkének”, hanem konkrét műveletekhez kötött szabályoknak kell tekinteni.

Ha Tamás egy hallgató beadandójának címét megosztja egy kollégával, a rendszernek azt is kezelnie kell, meddig él a megosztás, lehet-e továbbadni, és a megosztott személy olvashat vagy szerkeszthet is. A hozzáférési szabályok időbeli érvényessége gyakran éppoly fontos, mint maga a szabály.

## Külső belépés: OAuth 2.0 és OpenID Connect alapgondolata

A „Belépés Google-lel” gomb mögött nem az történik, hogy a külső szolgáltatás átadja a felhasználó jelszavát az oldalnak. A cél éppen az, hogy ne kelljen ezt megtennie. Az OAuth 2.0 elsősorban delegált hozzáférési keret: a felhasználó meghatározott hozzáférést engedélyezhet egy alkalmazásnak egy másik szolgáltatás erőforrásához. Az OpenID Connect erre építve az identitásról is ad szabványos információt, így a kliens megállapíthatja, ki jelentkezett be.

Egy helyes folyamatban a felhasználó a megbízható azonosítószolgáltató oldalán hitelesít. A szolgáltató visszairányítja az alkalmazáshoz egy ellenőrizhető eredménnyel. Az alkalmazás ellenőrzi többek között a kiállítót, a célközönséget, a lejáratot és a kéréshez kötést. Nem elég annyit látni, hogy egy válaszban szerepel egy e-mail-cím; a teljes protokoll és az ellenőrzések jelentik a bizalmi láncot.

Az ilyen belépés kényelmes lehet, de adatvédelmi és függőségi kérdéseket is felvet. A felhasználónak érthetően tudnia kell, melyik szolgáltatásnak milyen adatát adják át, az alkalmazásnak pedig a lehető legkevesebb szükséges hozzáférést kell kérnie.

## Legkisebb jogosultság és életciklus

A legkisebb jogosultság elve szerint egy személynek, szolgáltatásnak vagy programnak csak annyi hozzáférést adjunk, amennyi az aktuális feladatához szükséges. Ez csökkenti egy hiba, ellopott fiók vagy rosszindulatú művelet következményeit. A „mindenki admin, mert így egyszerűbb” rövid távú kényelme hosszú távon komoly kockázat.

A jogosultság nem egyszeri beállítás. Új belépő érkezik, oktató kurzust vált, hallgató abszolvál, külsős szerződése lejár. A hozzáférések felülvizsgálata és időben történő megszüntetése alapvető. A naplózás segít utólag megérteni, ki, mikor, milyen adatot ért el vagy módosított; ugyanakkor a napló maga is érzékeny adat lehet, ezért azt is védeni kell.

## Gyakori tévhitek

**„Ha bejelentkezett, akkor hozzáférhet.”** A belépés csak az AuthN eredménye. Minden védett művelethez AuthZ-döntés kell.

**„A szerepkör elegendő mindenhez.”** Egy szerepkör sokszor túl durva. A konkrét erőforrás, tulajdonosi viszony, idő és szervezeti kapcsolat is számíthat.

**„A felület elrejtett gombja megvédi az API-t.”** A kliens kezelőfelülete nem megbízható határ. A szervernek kell érvényesítenie a szabályokat.

**„Az egyszeri bejelentkezés megszünteti a jogosultságkezelést.”** Az SSO egyszerűsítheti a hitelesítést, de minden célrendszernek saját hozzáférési döntései maradnak.

## Ellenőrző kérdések

1. Fogalmazd meg saját példával az AuthN és AuthZ különbségét.
2. Miért nem elég azt ellenőrizni, hogy a kérőnek „oktató” szerepe van?
3. Hogyan vezethet adatvédelmi hibához, ha a szerver csak a böngészőben látható gombokat korlátozza?
4. Mit jelent a legkisebb jogosultság elve egy kurzuskezelő rendszerben?
5. Milyen problémát old meg az OpenID Connect, és miben különbözik az OAuth 2.0 fő céljától?

## Fogalomtár

**Hitelesítés (AuthN):** annak megállapítása, hogy ki a kérés küldője.  
**Jogosultságkezelés (AuthZ):** döntés arról, hogy a kérő végrehajthatja-e a kívánt műveletet.  
**MFA:** több, eltérő jellegű hitelesítési tényező használata.  
**RBAC:** szerepköralapú hozzáférés-vezérlés.  
**ABAC:** attribútumok alapján hozott hozzáférési döntés.  
**ACL:** hozzáférési lista, amely konkrét alanyok jogait sorolja fel.  
**IDOR/BOLA:** olyan jogosultsági hiba, amikor egy azonosító módosításával illetéktelen erőforrás érhető el.  
**OAuth 2.0:** delegált hozzáférést támogató engedélyezési keret.  
**OpenID Connect:** OAuth 2.0-ra épülő identitási réteg, amely hitelesítési információt is közvetít.
