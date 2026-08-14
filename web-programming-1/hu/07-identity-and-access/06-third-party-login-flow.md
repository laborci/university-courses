# Külső szolgáltatóval történő bejelentkezés folyamata

A külső bejelentkezés nem azt jelenti, hogy egy webhely megkapja a felhasználó jelszavát. A felhasználó az identitásszolgáltatónál igazolja magát, az pedig korlátozott, ellenőrizhető állítást ad arról, ki lépett be és mire adott engedélyt. Egy biztonságos rendszernek ezt az állítást ellenőriznie kell, majd a saját munkamenetét kell létrehoznia.

## Miért van szükség külső bejelentkezésre?

Képzeljünk el egy új egyetemi rendezvényregisztrációs oldalt. Két lehetősége van. Az első szerint saját felhasználónév–jelszó rendszert épít: jelszót kér, biztonságosan tárolja annak lenyomatát, kezeli az elfelejtett jelszót, az e-mailes megerősítést, a többfaktoros belépést, a gyanús próbálkozásokat és a fiók-helyreállítást. A második lehetőség szerint megengedi, hogy a felhasználó egy már meglévő egyetemi vagy Google-fiókjával jelentkezzen be.

Az utóbbi kényelmesebb lehet, de nem csupán kényelmi funkció. A saját jelszókezelés jelentős felelősség. Egy rosszul tervezett rendszerben kiszivároghatnak jelszavak, hibás lehet a helyreállítás, vagy a felhasználó ugyanazt a jelszót használhatja több helyen. Külső identitásszolgáltató használatakor a rendezvényoldal nem lesz „biztonságos automatikusan”, de nem kell neki közvetlenül kezelnie a felhasználó elsődleges jelszavát.

Az identitásszolgáltató, angolul identity provider vagy röviden IdP, olyan szolgáltatás, amely képes igazolni egy felhasználó identitását. Ilyen lehet a Google, a Microsoft, egy vállalati címtár vagy az egyetem központi beléptető rendszere. A saját webhelyet, amely a belépést kéri, gyakran relying partynek vagy kliensalkalmazásnak nevezzük. A szóhasználat szerepfüggő: ugyanaz a szolgáltató egy másik kapcsolatban maga is kérhet külső identitást.

## Három fogalom, amelyet nem szabad összemosni

Az **azonosítás** vagy identifikáció azt jelenti, hogy valaki megmondja, kinek állítja magát: például megadja az e-mail-címét. A **hitelesítés** (authentication) annak ellenőrzése, hogy valóban ő-e az illető. Jelszó, biztonsági kulcs, telefonos jóváhagyás vagy már létező Google-munkamenet mind lehet hitelesítési tényező. A **jogosultságkezelés** (authorization) pedig azt mondja meg, mit tehet a már hitelesített felhasználó. Attól, hogy valaki be tud lépni a rendezvényoldalra, még nem szerkesztheti a programot vagy nem láthatja a szervezői adatokat.

Külső belépésnél az identitásszolgáltató elsősorban a hitelesítésben segít. A saját oldalnak továbbra is el kell döntenie, mit enged az adott felhasználónak. Ha egy hallgató igazoltan `anna@example.edu`, abból következhet, hogy regisztrálhat az eseményre; abból nem következik, hogy rendszergazda. Ezt a különbséget sok veszélyes egyszerűsítés elfedi: „Google-belépés van, tehát a jogosultságok is rendben vannak.” Nem, a helyi jogosultsági modell továbbra is a saját alkalmazás felelőssége.

## OAuth 2.0 és OpenID Connect: két kapcsolódó, de eltérő szerep

Az OAuth 2.0 eredetileg egy engedélyezési keretrendszer. Arra ad mintát, hogyan férhet hozzá egy alkalmazás korlátozottan egy másik szolgáltatásban levő erőforráshoz anélkül, hogy elkérné a felhasználó jelszavát. Klasszikus példa: egy fotónyomtató alkalmazás engedélyt kér, hogy elolvashassa a felhasználó kiválasztott képeit egy felhőszolgáltatásból.

Az OpenID Connect, röviden OIDC, erre épülő identitási réteg. Ennek segítségével az alkalmazás megbízható állítást kaphat arról, ki a felhasználó. A gyakorlatban a két elnevezés sokszor együtt jelenik meg, ezért a hétköznapi beszédben „OAuth-belépésnek” mondják a Google-belépést. Oktatási szempontból hasznosabb a pontos kép: OAuth 2.0 az engedélydelegálás eszköze, OIDC a bejelentkezési információ szabványosítására is szolgál.

Az OIDC-ben fontos adat az **ID token**. Ez általában aláírt, tömörített formájú állításcsomag a felhasználóról és a belépés körülményeiről. Nem titkos levélként kell elképzelni: a tartalma gyakran olvasható, ezért érzékeny adatot nem szabad vakon beletenni. Az értékét az adja, hogy a szolgáltató digitálisan aláírta, az alkalmazás pedig ellenőrizni tudja az aláírást, a kibocsátót, a célközönséget és a lejáratot.

## A fő szereplők

Egy tipikus folyamatban négy szereplőt látunk. A **felhasználó** dönt arról, hogy belép és milyen engedélyt ad. A **böngésző** szállítja a felhasználót az oldalak között, tárolhat rövid életű állapotot és küldhet cookie-t. A **kliensalkalmazás** a mi rendezvényoldalunk, amely azonosítani szeretné a látogatót. Az **engedélyezési szerver** az identitásszolgáltató azon része, amely beléptet, hozzájárulást kér és kódot ad vissza. Egyes leírások külön említik a felhasználói információt adó userinfo-végpontot is.

Minden szereplőnek más az érdeke és más információ látható számára. A rendezvényoldal például tudja, hogy a felhasználó melyik eseményre regisztrál; a Google tudhatja, hogy a felhasználó nála bejelentkezett; a böngésző pedig az átirányítások címét látja. Ezért a tervezésben mindig kérdés: ki milyen adatot kap meg, meddig, és miért van rá szüksége.

## Végigvezetett példa: belépés egy egyetemi eseményoldalra

Anna megnyitja a `rendezveny.example.edu` oldalt, és a „Belépés egyetemi fiókkal” gombra kattint. Az oldal még nem tudja, ki Anna. Létrehoz egy egyszer használható, véletlen **state** értéket, amelyet a saját rövid idejű munkamenetéhez köt, majd a böngészőt átirányítja az egyetem identitásszolgáltatójához. Az átirányítás egyértelműen megmondja, melyik alkalmazás kér belépést, hová térhet vissza a folyamat végén, és milyen alapadatot kér.

Az identitásszolgáltató oldalán Anna esetleg már be van jelentkezve. Ilyenkor nem biztos, hogy újra jelszót kell írnia; lehet, hogy a böngészőben lévő korábbi munkamenet igazolja őt. Ha nincs bejelentkezve, az egyetem saját módszere szerint kéri a hitelesítést: jelszó, többfaktoros jóváhagyás vagy biztonsági kulcs is lehet a folyamat része. Fontos, hogy Anna a saját egyeteme hitelesítő oldalán adja meg ezeket, nem a rendezvényoldalon.

Ezután az IdP megmutathat egy hozzájárulási képernyőt. Itt Anna azt látja, hogy a rendezvényoldal a nevét, e-mail-címét és egy stabil azonosítóját kéri. Jó kialakításnál az alkalmazás a lehető legkevesebb adatot kéri. Egy egyszerű eseményregisztrációhoz aligha indokolt a postaláda teljes olvasási joga vagy a felhőben tárolt fájlok elérése. A hozzájárulási képernyő nem adminisztratív akadály: ez ad lehetőséget a felhasználónak az adatáramlás megértésére és elutasítására.

Sikeres hitelesítés után az IdP nem jelszót küld a rendezvényoldalnak. A böngészőt egy előre regisztrált visszatérési címre, az úgynevezett **redirect URI**-ra irányítja. Az URL-ben rövid életű **authorization code**, vagyis engedélyezési kód és a korábban küldött state szerepelhet. Például:

```text
https://rendezveny.example.edu/auth/callback?code=Qm7...&state=K9x...
```

Az alkalmazás összehasonlítja a visszakapott state-et azzal, amelyet induláskor eltárolt. Ha nem egyezik, megszakítja a folyamatot. Ez az egyik védelem az ellen, hogy egy támadó egy másik belépési folyamat válaszát erőltesse rá a felhasználóra. Ezután az alkalmazás szerveroldala biztonságos csatornán elküldi a kódot az IdP token-végpontjának. A kód rövid életű, egyszer használható, és a helyes alkalmazáshoz, illetve visszatérési címhez van kötve.

Az IdP válaszul visszaadhat egy ID tokent és – ha az alkalmazás valóban adat-hozzáférést is kért – hozzáférési tokent. A rendezvényoldal nem fogadja el őket bemondásra. Ellenőrzi többek között, ki írta alá a tokent (`iss`, kibocsátó), neki szól-e (`aud`, közönség), még érvényes-e (`exp`, lejárat), és illeszkedik-e a folyamatba. Az igazolt stabil külső azonosító alapján megtalálja vagy létrehozza Anna helyi fiókját. Végül saját munkameneti cookie-t ad a böngészőnek. A későbbi oldalkérésekhez már ez a saját cookie kapcsolja Annát a rendezvényoldalhoz; nem kell minden kattintáskor újra a külső szolgáltatóhoz fordulni.

## Miért nem jó mindent a böngészőre bízni?

Modern webes alkalmazásokban a böngésző közvetlenül is részt vehet a protokollban. Ez lehetséges, de több biztonsági korlátot és pontos folyamatot igényel. Különösen veszélyes, ha hosszú életű vagy nagy jogosultságú tokeneket könnyen kiolvasható böngészőtárolóba tesznek, mert egy sikeres XSS-támadás hozzáférhet ezekhez. A technikai megoldás részlete függ az alkalmazás típusától, de az elv egyszerű: a titkokat és tokeneket úgy kell kezelni, mintha belépőkártyák lennének, nem pedig egyszerű felhasználói beállítások.

Az átirányítási címek is kritikusak. Ha egy alkalmazás túl lazán engedi megadni a `redirect_uri` értékét, a kód vagy token rossz helyre kerülhet. Ezért a szolgáltatók előre felvett, pontos címeket kérnek. A `https://rendezveny.example.edu/auth/callback` és a `https://rendezveny.example.edu/akarmi` nem ugyanaz. A redirect URI tehát nem kényelmi paraméter, hanem bizalmi határ.

## Adatvédelem és felhasználói választás

Külső belépésnél több szervezet is része lehet a felhasználói útvonalnak. Az identitásszolgáltató látja, hogy a felhasználó egy adott alkalmazás bejelentkezési folyamatát indította el; az alkalmazás pedig megkap bizonyos profiladatokat. A GDPR szempontjából az alkalmazásnak világossá kell tennie, milyen adatokat kér, milyen célra, meddig tárolja őket, és milyen jogalapon kezeli. A „kényelmes belépés” nem felmentés az adatminimalizálás alól.

Érdemes alternatívát is adni. Előfordulhat, hogy valakinek nincs Google-fiókja, nem akarja azt használni, vagy akadálymentesebb más belépési forma. Egyetemi rendszerben lehet helyi intézményi belépés; nyilvános szolgáltatásban lehet saját, gondosan kialakított fiók vagy más elfogadható szolgáltató. A külső login nem válhat olyan kapuvá, amely szükségtelenül kizár felhasználókat.

## Gyakori tévhitek

- **„A Google-belépésnél a webhely megkapja a Google-jelszavamat.”** Nem ez a szabványos folyamat: a jelszót az IdP saját oldalán adja meg a felhasználó.
- **„Az OAuth maga a bejelentkezés szabványa.”** Az OAuth 2.0 elsődlegesen jogosultságdelegálás; az identitásra az OpenID Connect ad közös réteget.
- **„Ha valaki hitelesített, automatikusan adminisztrátor is lehet.”** A hitelesítés azt mondja meg, ki ő; a jogosultságokat a helyi alkalmazásnak kell kiosztania.
- **„Egy e-mail-cím örök és egyedi azonosító.”** E-mail-cím változhat, újra kiosztható, vagy nem minden szolgáltatónál ellenőrzött. A szolgáltató stabil alanya (`sub`) alkalmasabb kapcsolásra.
- **„A token titkosított jelszó.”** A token korlátozott és gyakran lejáró jogosultsági igazolás; kezelése ettől még ugyanolyan óvatosságot igényel.

## Ellenőrző kérdések

1. Mi a különbség az azonosítás, hitelesítés és jogosultságkezelés között?
2. Miért nem jelszót küld vissza az identitásszolgáltató az alkalmazásnak?
3. Milyen szerepe van a state értéknek az átirányításos folyamatban?
4. Miért kell pontosan előre regisztrálni a redirect URI-t?
5. Mondj három ellenőrzést, amelyet az alkalmazásnak ID token elfogadása előtt el kell végeznie!
6. Miért nem következik egy hitelesített e-mail-címből automatikusan egy magasabb helyi jogosultság?

## Fogalomtár

- **Identitásszolgáltató (IdP):** olyan szolgáltatás, amely hitelesíti a felhasználót és szabványos állítást adhat az identitásáról.
- **Kliensalkalmazás / relying party:** az a webhely vagy alkalmazás, amely külső szolgáltatótól kér belépési információt.
- **OAuth 2.0:** engedélydelegálási keretrendszer korlátozott hozzáférés átadására.
- **OpenID Connect (OIDC):** OAuth 2.0-ra épülő identitási réteg, amely bejelentkezési állítások cseréjét szabványosítja.
- **Redirect URI:** az alkalmazás előre bejegyzett visszatérési címe a külső hitelesítés után.
- **Authorization code:** rövid életű, egyszer használható kód, amelyet az alkalmazás tokenre vált.
- **ID token:** az identitásszolgáltató által aláírt állításcsomag a hitelesített felhasználóról és a belépésről.
- **State:** a belépési kísérlethez kötött véletlen érték, amely az átirányításos támadások elleni ellenőrzést segíti.
- **Scope:** annak leírása, milyen adathoz vagy művelethez kér hozzáférést az alkalmazás.
