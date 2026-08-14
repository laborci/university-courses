# Esettanulmány: Belépés Google-fiókkal

A Google-fiókkal történő belépés nem egyetlen gomb és nem egy „Google által kezelt felhasználó”. Egy több szereplős, átirányításokra és ellenőrizhető állításokra épülő folyamat, amelyben a Google igazolja az identitást, a saját alkalmazás pedig továbbra is felelős a helyi fiókért, a munkamenetért, a jogosultságokért és az adatkezelésért.

## A helyzet

Tegyük fel, hogy a `tananyag.example.hu` egyetemi segédanyagokat, rövid kvízeket és eseményjelentkezést kínál. A fejlesztőcsapat azt szeretné, hogy a látogatók gyorsan beléphessenek, ezért a saját jelszavas regisztráció mellett megjelenik a „Folytatás Google-fiókkal” gomb. A termékvezető szerint ez egyszerű: „A Google már tudja, ki a felhasználó, csak kérjük el a nevét és e-mail-címét.” A biztonsági felelős viszont kérdéseket tesz fel. Honnan tudjuk, hogy a visszaérkező válasz valóban a Google-től származik? Mi történik, ha egy másik Google-fiókkal belépett ember ugyanazt az e-mail-címet használja? Kapjon-e szervezői jogot bárki, akinek az e-mail-címében szerepel az egyetem neve? Milyen adatokat lát a Google, és meddig tároljuk a kapott adatokat?

Az eset lényege, hogy a gomb megnyomása után nem „kész” a hitelesítés. A jól működő megoldás mindegyik kérdésre tudatos választ ad.

## Mit lát a felhasználó?

Eszter megnyitja a tananyagoldalt. A szolgáltatás még nem tudja, ki ő, ezért nyilvános kezdőoldalt mutat. Eszter a Google-belépés gombra kattint. A böngészője a Google belépési oldalára kerül, ahol esetleg kiválaszthat egy már ismert fiókot, vagy beírhatja az e-mail-címét és jelszavát. Ha a fiókján többfaktoros hitelesítés van, azt is itt végzi el.

Egy fontos megfigyelés: Eszter a jelszavát nem a `tananyag.example.hu` felületén írja be. A böngésző címsorában a Google domainje látható, a jelszó a Google infrastruktúrájához kerül. Ez csökkenti annak kockázatát, hogy a tananyagoldal saját hibája jelszószivárgáshoz vezet, de nem szünteti meg a phishing veszélyét. Ha egy hamis oldal a Google-éhoz hasonló képernyőt mutat, a felhasználó akkor is bajba kerülhet. A domain, a böngésző biztonsági jelzései és a jelszókezelő figyelmeztetései ezért gyakorlati védelmi eszközök.

Sikeres Google-hitelesítés után Eszter esetleg egy hozzájárulási képernyőt lát. A képernyő ideális esetben közérthetően mutatja, hogy a tananyagoldal mely adatokhoz kér hozzáférést. Egy egyszerű belépéshez elegendő lehet a stabil felhasználói azonosító, a név, az e-mail-cím és annak jelzése, hogy az e-mail-cím ellenőrzött-e. Ha a szolgáltatás a Google Naptár írását vagy Gmail-üzenetek olvasását is kérné, az már lényegesen nagyobb beavatkozás volna, és külön üzleti indoklást igényelne.

## Mi történik a háttérben?

A „Folytatás” gomb megnyomásakor a tananyagoldal indítja el az OpenID Connectre épülő OAuth 2.0 folyamatot. Az oldal egy belépési kísérlethez véletlen `state` értéket hoz létre, és azt rövid időre saját munkamenetben eltárolja. Gyakran egy másik véletlen érték, a `nonce` is készül; ennek célja, hogy a később kapott identitási állítás a mostani belépési kísérlethez legyen köthető. Ezután a böngészőt a Google engedélyezési végpontjára irányítja.

Az átirányítás nem tetszőleges webcímre történhet vissza. A Google fejlesztői beállításaiban a tananyagoldal korábban rögzítette például ezt a címet: `https://tananyag.example.hu/auth/google/callback`. A Google csak ilyen előre engedélyezett címre küldheti vissza a folyamat eredményét. Ha a szolgáltató minden `redirect_uri` értéket elfogadna, egy rosszindulatú fél a saját oldalára terelhetné a válaszokat.

Miután Eszter a Google-nél hitelesítette magát és jóváhagyta a kért alapadatok átadását, a böngésző visszatér a tananyagoldal callback címére. A visszatérő URL-ben jellemzően nem a Google-jelszó, és nem is a teljes profil található, hanem egy rövid életű, egyszer használható engedélyezési kód. A tananyagoldal szervere ezt a kódot saját, hitelesített kapcsolaton váltja tokenekre. Ez az authorization code flow előnye: az érzékenyebb tokenek nem szükségszerűen járják be a böngésző címsorát és előzményeit.

## Milyen állításokat kap az alkalmazás?

Az alkalmazás egy ID tokent kaphat, amelyben például ilyen állítások vannak:

```json
{
  "iss": "https://accounts.google.com",
  "sub": "1038457392019384756",
  "aud": "a-tananyagoldal-kliensazonositoja",
  "exp": 1786522200,
  "email": "eszter@egyetem.example",
  "email_verified": true,
  "name": "Kiss Eszter"
}
```

Ez nem pontos Google-válasz, hanem szemléltető példa. A `sub` a szolgáltató által kiadott, adott klienshez és felhasználóhoz kötött stabil alanyazonosító. Ez jobb kulcs lehet a helyi fiók összekapcsolásához, mint önmagában az e-mail-cím. Az e-mail-cím megváltozhat, újra kiosztható, vagy bizonyos esetekben nem ellenőrzött. Az alkalmazásnak ezért célszerű azt rögzítenie, hogy „ez a helyi felhasználó ennél a kibocsátónál ezzel a `sub` értékkel azonos”, és az e-mailt külön, változható kapcsolattartási adatként kezelnie.

Az ID token tartalmát nem elég egyszerűen kiolvasni. A tananyagoldalnak ellenőriznie kell a digitális aláírást, hogy a token valóban a Google által kiadott kulccsal készült-e. Ellenőriznie kell a kibocsátót (`iss`), hogy valóban a várt szolgáltató adta-e ki; a célközönséget (`aud`), hogy a token tényleg a tananyagoldalnak szól-e; a lejáratot (`exp`), hogy nem régi belépési bizonyítékot próbálnak-e újra felhasználni; valamint a nonce-t, ha azt a folyamat indításakor használta. Egy rosszul megírt alkalmazásnál elég lehet „bármilyen Google-szerű JSON” – ez biztonsági hiba, mert a bizalomnak ellenőrzöttnek, nem feltételezettnek kell lennie.

## A helyi fiók és a munkamenet létrehozása

Ha az ellenőrzések sikeresek, a tananyagoldal megnézi, van-e már helyi felhasználó a Google `sub` azonosítóhoz rendelve. Ha van, Eszter a meglévő fiókjába kerül. Ha nincs, a szolgáltatás a saját szabályai szerint létrehozhat új helyi fiókot vagy kérhet további adatot, például az adatkezelési tájékoztató elfogadását. A fiók ettől még a tananyagoldal fiókja: a Google nem kezeli helyette a kurzusjelentkezéseket, a helyi becenevet, a kvízeredményeket vagy a jogosultsági csoportokat.

Ezután a tananyagoldal saját munkamenetet hoz létre. Tipikus esetben egy biztonságosan beállított, rövid vagy kezelhető életű cookie-val kapcsolja a böngésző következő kéréseit Eszter szerveroldali munkamenetéhez. Ez fontos különbség: az ID token nem szükségképpen az a „belépőkártya”, amelyet minden egyes tananyagoldal-kéréshez újra elküldünk. A rendszer saját munkamenete adja a folyamatos belépési élményt, és a kijelentkezés, időkorlát vagy jelszóváltoztatás után ezt is tudni kell érvényteleníteni.

## A jogosultság nem e-mail-szöveg alapján dől el

A csapat egyik tagja felveti: „Minden `@egyetem.example` című felhasználó legyen szervező.” Ez első látásra kényelmes, de rossz biztonsági modell. Egy domain alapján kiosztott magas jogosultság túl tág lehet: más szervezeti egység dolgozója, volt hallgató vagy tesztfiók is beleeshet. Ráadásul az e-mail-cím értelmezése szolgáltatónként eltérhet.

Biztonságosabb, ha a tananyagoldal a Google-belépést csak hitelesített identitásként fogadja el, a szervezői szerepet pedig külön, helyi listából vagy az intézmény erre szolgáló, megbízható jogosultsági rendszeréből állapítja meg. Ha intézményi csoporttagságot is felhasználnak, annak forrását, frissességét és visszavonását is tervezni kell. Az „aki belépett, az mit tehet?” kérdésre mindig a helyi szabályok válaszolnak.

## Adatvédelem: kinek mi látszik?

Eszter szemszögéből a belépés során adat mozdul el. A Google megtudhatja, hogy Eszter a tananyagoldalhoz kíván belépni. A tananyagoldal megkapja a jóváhagyott alapadatokat és azt, hogy a Google hitelesítette a felhasználót. Ha a tananyagoldal beágyazott Google-szkripteket, analitikai eszközöket vagy hirdetési technológiákat is használ, további adatáramlás is történhet; ezek nem automatikusan azonosak a belépési folyamattal, de a felhasználó számára együtt jelennek meg.

A szolgáltatásnak adatminimalizálást kell alkalmaznia: csak azt kérje és tárolja, amire valóban szüksége van. A név lehet szükséges a megszólításhoz, a hitelesített e-mail a kapcsolattartáshoz, de a profilkép vagy más személyes adat nem alapkövetelmény. Az adatkezelési tájékoztatónak érthetően ki kell térnie arra, hogy mely adat mely szolgáltatótól érkezik, milyen célból kezelik, meddig őrzik, és hogyan kérhető a fiók törlése vagy az összekapcsolás megszüntetése.

Az is fontos, hogy a felhasználó a Google-fiókjában később visszavonhatja egy alkalmazás hozzáférését. Ettől a tananyagoldal saját helyi munkamenete nem feltétlenül szűnik meg azonnal, és a korábban jogszerűen tárolt adatok sem tűnnek el automatikusan. A jó szolgáltatás egyértelművé teszi ezeket a különbségeket és saját törlési/kijelentkezési funkciót is ad.

## Hibás és gyanús helyzetek elemzése

**1. A state nem egyezik.** Eszter visszatér a callback címre, de a kapott state eltér a folyamat elején eltárolttól. A rendszernek nem szabad „megpróbálnia befejezni” a belépést: törölnie kell a félbehagyott állapotot, naplóznia kell a gyanús eseményt, és új indítást kell kérnie.

**2. A token lejárt.** A belépés közben Eszter hosszú időre félbehagyta a folyamatot. A lejárt token elutasítása nem felhasználóellenes szigor, hanem annak elismerése, hogy egy régi állítás már nem biztosan érvényes.

**3. Már létezik fiók azonos e-mail-címmel.** Lehet, hogy a felhasználó korábban saját jelszóval regisztrált. Nem biztonságos automatikusan, kizárólag az e-mail-cím alapján összekötni a két fiókot. A szolgáltatás kérhet belépést a meglévő módszerrel, vagy más bizonyítékot a fiókok összekapcsolásához.

**4. A felhasználó elutasítja a hozzájárulást.** Ez nem rendszerhiba. A szolgáltatásnak udvariasan el kell mondania, milyen korlátozással jár ez, és ha lehet, alternatív belépést kell kínálnia. Nem helyes büntető vagy félrevezető felülettel engedélyre kényszeríteni a felhasználót.

## Kérdéssor az órai elemzéshez

1. Rajzold fel a négy fő szereplőt: Eszter, a böngésző, a tananyagoldal és a Google. Ki kinek küld átirányítást vagy kérést?
2. Melyik oldalon adja meg Eszter a Google-jelszavát, és miért lényeges a domain ellenőrzése?
3. Miért jobb a helyi fiók összekapcsolására a `sub` érték, mint csak az e-mail-cím?
4. Milyen célra szolgál a state, és mi a helyes reakció eltérés esetén?
5. Sorolj fel legalább négy tokenellenőrzést, amelyet a tananyagoldalnak el kell végeznie!
6. Miért kell a Google-hitelesítés után is saját munkameneti cookie a tananyagoldalnak?
7. Miért kockázatos minden egyetemi domainnel rendelkező felhasználót automatikusan szervezővé tenni?
8. Mely minimális adatokat kérnéd egy eseményregisztrációs oldal Google-belépéséhez? Mit nem kérnél, és miért?
9. Mi a különbség a Google-fiókban visszavont hozzáférés és a tananyagoldali fiók törlése között?
10. Hogyan alakítanád a felületet úgy, hogy a Google-fiókot nem használó látogató se legyen indokolatlanul kizárva?

## Gyakori tévhitek

- **„A Google jóváhagyta, tehát az alkalmazásnak nincs több teendője.”** A fogadó alkalmazásnak ellenőriznie kell a választ, helyi fiókot és jogosultságot kell kezelnie.
- **„A hozzájárulási képernyő puszta formalitás.”** A felhasználó itt látja és befolyásolja az adatátadást; ez fontos adatvédelmi és bizalmi pont.
- **„A token tartalma elég bizonyíték.”** A tartalom csak akkor megbízható, ha az aláírás, a kibocsátó, a célközönség és az időbeli érvényesség is rendben van.
- **„A kijelentkezés mindenhol egyszerre töröl mindent.”** A helyi munkamenet, a külső IdP-munkamenet és az alkalmazási adatok külön életciklusúak.
- **„A Google-belépés maga GDPR-megfelelés.”** A szolgáltatásnak továbbra is saját adatkezelési célokat, megőrzést, tájékoztatást és felhasználói jogokat kell kezelnie.

## Fogalomtár

- **Authorization code flow:** olyan OAuth/OIDC folyamat, amelyben a böngésző rövid életű kódot visz vissza, a tokeneket pedig a kliens szervere szerzi meg.
- **Callback:** a külső belépés utáni előre meghatározott visszatérési végpont.
- **ID token:** aláírt állítás a felhasználó hitelesítéséről és az alkalmazás számára készült belépésről.
- **`sub` (subject):** az identitásszolgáltató stabil, szolgáltatón belüli felhasználói azonosítója.
- **`iss` (issuer):** a token kibocsátóját jelölő állítás.
- **`aud` (audience):** azt jelöli, melyik kliensalkalmazás számára készült a token.
- **`exp` (expiration):** a token lejárati időpontja.
- **Nonce:** egyszer használatos véletlen érték, amely a token és az adott belépési kísérlet összekapcsolását segíti.
- **Adatminimalizálás:** csak a célhoz szükséges személyes adatok kérése és kezelése.
