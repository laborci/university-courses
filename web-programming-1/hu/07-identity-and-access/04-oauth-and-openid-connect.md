# OAuth 2.0 és OpenID Connect

## Célok

A fejezet végére a hallgató meg tudja különböztetni az azonosítást a jogosultságadástól, el tudja mondani egy OAuth 2.0 alapú belépési folyamat fő lépéseit, és felismeri, mire való az OpenID Connect. Fontos az is, hogy a tokeneket ne „varázs-jelszóként”, hanem meghatározott célú, korlátozott élettartamú igazolásként kezelje.

Az OAuth 2.0 elsődlegesen **delegált hozzáférésről** szól: valaki megengedheti egy alkalmazásnak, hogy korlátozottan hozzáférjen egy másik szolgáltatásban lévő adataihoz anélkül, hogy átadná a jelszavát. Az OpenID Connect (OIDC) erre épülő azonosítási réteg: segítségével az alkalmazás megbízható választ kaphat arra, hogy ki jelentkezett be.

## Két, gyakran összekevert kérdés

Képzeljük el, hogy egy fotónyomtató weboldal szeretné elérni a felhasználó felhőben tárolt fényképeit. Az első kérdés az, hogy **ki a felhasználó?** Ez az azonosítás (authentication). A második: **mit tehet az alkalmazás a felhasználó nevében?** Például csak olvashatja-e az albumokat, vagy új képet is feltölthet? Ez a jogosultságadás (authorization).

A hagyományos, rossz megoldás az lenne, ha a fotónyomtató elkérné a felhasználó felhőtárhelyes jelszavát. Ezzel túl nagy bizalmat kapna: a jelszóval akár teljes hozzáférése lehetne, a felhasználó nem tudná egyetlen alkalmazástól egyszerűen visszavonni a jogot, és egy adatszivárgás mindkét rendszert veszélyeztetné. Az OAuth ezt váltja ki célhoz kötött engedéllyel.

Az OAuth-engedély önmagában még nem bizonyítja minden esetben, hogy az alkalmazás számára ki a személy. Lehet, hogy az alkalmazás csak egy fájl elolvasásához kapott jogot. Ha bejelentkezési élményre, névre vagy megbízható felhasználói azonosítóra van szükség, az OpenID Connect egészíti ki a folyamatot.

## A szereplők

Az OAuth-szabvány szándékosan több szereplőt különít el.

- **Erőforrás-tulajdonos (resource owner):** általában a felhasználó, akinek az adatairól vagy jogairól szó van.
- **Kliens (client):** a hozzáférést kérő alkalmazás; lehet webalkalmazás, mobilapp vagy szerveroldali szolgáltatás.
- **Engedélyező szerver (authorization server):** bejelentkezteti a felhasználót, megmutatja a kért jogosultságokat, majd tokeneket ad ki. Gyakran ezt hívjuk identitásszolgáltatónak is.
- **Erőforrás-szerver (resource server):** az API, amely az adatot őrzi és az access tokent ellenőrzi.

Ugyanaz a nagy szolgáltató üzemeltetheti az engedélyező és az erőforrás-szervert, de gondolatban érdemes szétválasztani őket. Így válik érthetővé, hogy a belépést kezelő rendszer nem feltétlenül azonos a naptár- vagy fájl-API-val.

## Redirect: miért ugrik át a böngésző másik oldalra?

Amikor egy oldalon a „Belépés a szolgáltatói fiókkal” gombra kattintunk, a böngésző átirányít az engedélyező szerverhez. Ez a redirect nem puszta kényelmi megoldás. A jelszót a felhasználó a saját, ismert identitásszolgáltatójának oldalán adja meg, nem a külső alkalmazásnak.

A kliens a kérésben megadja többek között saját azonosítóját, a visszatérési címet (`redirect_uri`) és a kért jogosultságok listáját. Ezt a listát scope-nak nevezzük. Például a `calendar.read` azt jelezheti, hogy az alkalmazás a naptár olvasását kéri. A felhasználó itt hitelesíti magát, majd jóváhagyja vagy elutasítja a consentet, vagyis a hozzájárulást.

A `redirect_uri` különösen érzékeny adat: az engedélyező szervernek előre regisztrált címhez kell hasonlítania. Ha tetszőleges visszatérési cím elfogadható lenne, egy támadó saját oldalára terelhetné a folyamat eredményét.

## Az authorization code folyamat

A modern webes alkalmazások jellemzően az **Authorization Code** folyamatot használják, sokszor PKCE-kiegészítéssel. A leegyszerűsített útja a következő:

1. A kliens átirányítja a böngészőt az engedélyező szerverhez.
2. A felhasználó ott bejelentkezik, majd látja és jóváhagyja a kért scope-okat.
3. Az engedélyező szerver a böngészőt visszairányítja a regisztrált címre, egy rövid életű, egyszer használható **authorization code**-dal.
4. A kliens szerveroldala közvetlen, védett kérésben beváltja ezt a kódot tokenekre.
5. A kliens az **access tokennel** hívja az erőforrás-szerver API-ját.

A code nem maga a hozzáférési engedély. Rövid ideig él, egyszer használható, és a tokenre váltás nem a böngésző címsorában zajlik. Ez csökkenti annak esélyét, hogy a tényleges hozzáférési igazolás naplóba, böngészőtörténetbe vagy rosszindulatú oldalhoz kerüljön. A PKCE („Proof Key for Code Exchange”) egy további ellenőrzést ad: a kódot csak az a kliens válthatja be, amelyik a folyamat elején létrehozott titokhoz kapcsolódó bizonyítékot is bemutatja.

## Tokenek: hasonló nevű, eltérő célú eszközök

Az **access token** az API-nak szól. A kliens ezzel igazolja, hogy meghatározott scope-okkal és általában rövid ideig hozzáférhet egy erőforráshoz. Sok esetben a kérés `Authorization: Bearer <token>` fejlécében szerepel. A „bearer” azt jelenti, hogy aki birtokolja, használhatja is; ezért titokként kell kezelni.

Az **ID token** OpenID Connect esetén jelenik meg. Az alkalmazásnak szóló állításokat hordoz a bejelentkezett személyről, például azonosítót, kibocsátót, célközönséget és lejárati időt. Gyakran JWT formátumú, de nem ettől lesz biztonságos vagy hiteles: az alkalmazásnak ellenőriznie kell az aláírást, a kibocsátót, a számára szóló célközönséget és a lejáratot. Az ID token nem általános belépőkártya az API-khoz.

A **refresh token** hosszabb ideig élhet, és új access token kérésére szolgál, amikor a régi lejár. Épp ezért különösen érzékeny: ha illetéktelenhez kerül, az hosszabban fenntarthat hozzáférést. Nem minden kliens kap refresh tokent, és a szerverek visszavonhatják vagy rotálhatják őket.

## Végigvezetett példa: naptárintegráció

Egy egyetemi időbeosztó alkalmazás a hallgató jóváhagyásával szeretné megjeleníteni a külső naptárában lévő órákat. A hallgató a „Naptár csatlakoztatása” gombra kattint. A böngésző az identitásszolgáltatóhoz jut, ahol a hallgató belép, és azt olvassa: „Az alkalmazás megtekintheti a naptáraid eseményeit.” Ez a consent képernyő legyen konkrét: ne „mindenhez hozzáférést” kérjen, ha olvasás elég.

Jóváhagyás után az alkalmazás egy authorization code-ot kap a saját visszatérési címén. A szervere ezt beváltja access tokenre, majd ezzel meghívja a naptár API-ját. Az API a tokenből vagy a hozzá tartozó szerveroldali adatokból megállapítja, hogy az alkalmazás csak olvasási jogosultságot kapott. Ha a hallgató később a szolgáltatói fiókjában visszavonja az engedélyt, a kliens többé nem kérhet érvényes hozzáférést.

Ha az alkalmazásnak közben azt is tudnia kell, melyik helyi fiókhoz társítsa a külső naptárat, OIDC-t kér. Az ID token ellenőrzött, stabil felhasználói azonosítót adhat ehhez; nem érdemes e-mail-címre vagy megjelenített névre alapozni az összerendelést.

## Biztonságos használat: néhány gyakorlati következmény

Az OAuth- és OIDC-folyamat biztonsága nem kizárólag a szolgáltató feladata. A kliensnek pontosan kell kezelnie az állapotot is. Az indításkor küldött, véletlen `state` érték és a visszatéréskor ellenőrzött azonos érték például segít összekötni a választ a valóban elindított folyamattal. Ennek hiányában egy támadó megpróbálhatja a böngészőt egy másik engedélyezési válasszal összezavarni. A modern alkalmazásoknál a `nonce` érték az ID token bizonyos visszajátszási helyzetei ellen ad további védelmet.

A kliens regisztrációjánál használt `client_secret` nem való egy böngészőbe vagy mobilalkalmazásba: amit a felhasználó eszközére küldünk, azt nem tekinthetjük tartós titoknak. Emiatt a nyilvános kliensek más védelmi eszközöket, például PKCE-t használnak. A tokenek naplózását is kerülni kell: egy hibakeresési napló, képernyőkép vagy URL-megosztás ugyanúgy hozzáférési adatot szivárogtathat ki. A legbiztonságosabb engedélykérés mindig a lehető legszűkebb scope-pal indul, és a felhasználónak érthetően elmondja, miért kell az adott jog.

## Gyakori tévhitek

- **„Az OAuth egy bejelentkezési szabvány.”** Pontatlan. OAuth 2.0-val engedélyt delegálunk; az azonosítási célú kiegészítés az OIDC.
- **„A felhasználó megosztja a jelszavát az alkalmazással.”** Épp ez az, amit a jó OAuth-folyamat elkerül.
- **„A token titkosított, tehát bárhol tárolható.”** A token lehet olvasható vagy nem olvasható formátumú; ettől függetlenül a megszerzése hozzáférést jelenthet.
- **„Egy scope örökre szól.”** A hozzáférésnek lehet lejárata, a token visszavonható, a scope pedig csak a kiadott jogok kerete.
- **„Az ID tokennel API-t hívunk.”** Az ID token közönsége a kliens; API-híváshoz jellemzően access token kell.

## Ellenőrző kérdések

1. Mi a különbség az azonosítás és a jogosultságadás között?
2. Miért jobb az OAuth, mint ha egy alkalmazás elkérné a másik szolgáltatás jelszavát?
3. Miért nem az access token kerül vissza közvetlenül a böngésző címsorában az authorization code folyamatban?
4. Melyik token milyen célra való: access token, ID token, refresh token?
5. Milyen két veszélyt csökkent az előre regisztrált `redirect_uri`?

## Fogalomtár

- **Authorization Code:** rövid életű, egyszer felhasználható kód, amelyet a kliens tokenre vált.
- **Consent:** a felhasználó tájékozott jóváhagyása a kért hozzáférésről.
- **OAuth 2.0:** delegált hozzáférést szabályozó keretrendszer.
- **OpenID Connect (OIDC):** OAuth 2.0-ra épülő azonosítási réteg.
- **Scope:** a kért vagy kiadott hozzáférés hatókörének megnevezése.
- **Token:** korlátozott célú, általában lejáró igazolás.
