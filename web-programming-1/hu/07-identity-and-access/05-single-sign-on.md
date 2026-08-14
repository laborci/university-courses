# Egyszeri bejelentkezés (SSO)

## Célok

A fejezet célja, hogy a hallgató megértse az egyszeri bejelentkezés (Single Sign-On, SSO) lényegét, különbséget tudjon tenni az SSO, a jelszókezelő és az egyszerű „ugyanazt a jelszót használom” között, valamint felismerje a központi azonosítás előnyeit és kockázatait. A végén egy intézményi példán keresztül végig tudja követni, miért juthat el a felhasználó több külön szolgáltatásba újabb jelszókérés nélkül.

Az SSO nem azt jelenti, hogy minden rendszerben ugyanaz a jelszó. Azt jelenti, hogy a felhasználó egy megbízható központi azonosítónál igazolja magát, és a többi alkalmazás ezt az eredményt szabványos, korlátozott információként elfogadja. A kényelmet központosított bizalom váltja meg: ezért az identitásszolgáltató védelme kiemelten fontos.

## A hétköznapi probléma

Egy egyetemi hallgató gyakran több digitális rendszert használ: tanulmányi rendszert, e-learning felületet, egyetemi e-mailt, könyvtári keresőt, VPN-t, kollaborációs eszközt és belső portált. Ha mindegyik külön felhasználónévvel, külön jelszóval és külön fiókkezeléssel működik, a felhasználó rossz élményt kap, a támogatás pedig jelszó-visszaállításokkal foglalkozik. Ráadásul a túl sok jelszó újrahasználathoz, gyenge jelszavakhoz és adathalászati kockázathoz vezet.

Az SSO erre a problémára szervezeti szintű válasz. A szolgáltatások nem mind maguk tárolják és ellenőrzik a hallgató jelszavát. Ehelyett ugyanahhoz a központi identitásszolgáltatóhoz fordulnak. A hallgató ott jelentkezik be, lehetőleg többfaktoros hitelesítéssel, majd a később megnyitott kapcsolódó alkalmazások felismerik, hogy a központi belépés már megtörtént.

## Mi történik a háttérben?

Az SSO-ban három fogalom különösen fontos. Az **identitásszolgáltató** (Identity Provider, IdP) kezeli a bejelentkezést és igazolást állít ki a felhasználóról. A **szolgáltató alkalmazás** (Service Provider, SP vagy relying party) az az oldal, amelyet a felhasználó ténylegesen használna, például az e-learning rendszer. A **szövetség** vagy bizalmi kapcsolat azt jelenti, hogy a szolgáltató alkalmazás előre elfogadja az identitásszolgáltató megfelelően ellenőrizhető állításait.

Amikor a hallgató megnyitja az e-learninget, az alkalmazás még nem tudja, ki ő. Átirányítja a böngészőt az egyetemi identitásszolgáltatóhoz. Ha ott nincs aktív központi munkamenet, a hallgató belép és elvégzi a második faktort is. Ha már délelőtt bejelentkezett az e-mailjébe ugyanazon az IdP-n keresztül, az IdP saját munkamenete még élhet; ilyenkor jelszóbekérés nélkül is kiadhatja az e-learning rendszernek szóló igazolást. A böngésző ezután visszatér az e-learninghez, amely ellenőrzi az igazolást, saját helyi munkamenetet hoz létre, és megnyitja a kurzusokat.

Ezért az SSO nem szó szerint egyetlen, örökre érvényes bejelentkezés. Inkább egy központi bejelentkezési munkamenet, amelyből több alkalmazás külön, ellenőrizhető belépést vezethet le. Minden szolgáltatásnak lehet saját rövidebb munkamenete, saját szerepköre és saját további szabálya.

## Milyen szabványok valósítják meg?

Az SSO nem egyetlen protokoll neve, hanem cél. Modern webes környezetben gyakori az OpenID Connect, amely OAuth 2.0-ra épül; az alkalmazás OIDC-állítások alapján azonosítja a felhasználót. Nagyobb, régebbi vagy intézményi rendszerekben a SAML (Security Assertion Markup Language) is elterjedt. A két megoldás technikailag eltér: az OIDC jellemzően JSON/JWT és OAuth-szerű üzenetek világában mozog, a SAML XML-alapú állításokat használ. A közös gondolat azonban az, hogy a szolgáltató alkalmazás ne jelszót kapjon, hanem egy megbízható féltől származó, ellenőrizhető bizonyítékot.

Az alkalmazásnak nem vakon kell elfogadnia ezt a bizonyítékot. Ellenőrzi például, ki bocsátotta ki, valóban neki szól-e, nem járt-e le, és nem használták-e már fel tiltott módon. A digitális aláírás vagy más kriptográfiai védelem azt segíti, hogy egy támadó ne gyárthasson saját „hallgató vagyok” üzenetet.

## Végigvezetett intézményi példa

Tegyük fel, hogy az Egyetemnek van központi azonosítója: `hallgato@egyetem.hu`. A hallgató reggel megnyitja az egyetemi levelezést. A levelező átirányítja az Egyetem IdP-jéhez, ahol a hallgató beírja a jelszavát és jóváhagyja a telefonján kapott többfaktoros kérést. Az IdP biztonságos munkamenetet hoz létre a saját domainjén.

Ezután a hallgató megnyitja a tanulmányi rendszert. Az alkalmazás szintén az IdP-hez irányítja. Az IdP érzékeli az aktív munkamenetet, ezért nem kér újból jelszót; létrehoz egy rövid életű, a tanulmányi rendszernek címzett bejelentkezési választ. A tanulmányi rendszer ellenőrzi ezt, és a központi azonosító alapján megkeresi vagy létrehozza a helyi felhasználói rekordot. Csak ezután nézi meg a saját jogosultsági adatait: a hallgató például mely tárgyakra van felvéve.

Fontos részlet, hogy az SSO megmondhatja, ki a felhasználó, de nem kell minden alkalmazásbeli jogosultságot központilag eldöntenie. Az e-learningben a kurzusok, a könyvtárban a kölcsönzési állapot, a HR-rendszerben pedig a munkaviszony lehet helyi üzleti adat. Így az azonosítás egységes, a szolgáltatási logika mégis ott marad, ahol értelme van.

Ha a hallgató délután a könyvtári rendszerbe lép, ugyanez ismétlődik. A rendszer nem ismeri a jelszavát, de elfogadja az IdP igazolását. Ha a hallgató státusza megszűnik, a központi fiók letiltása sok kapcsolódó szolgáltatást védhet egyszerre. A teljes letiltás sebessége azonban függ a helyi munkamenetek és tokenek lejáratától, ezért kiléptetési és visszavonási stratégia is kell.

## Előnyök

Felhasználói oldalon az SSO kevesebb jelszókérést, kevesebb fiókproblémát és gyorsabb átjárást ad. Biztonsági oldalon az intézmény egységesen vezethet be többfaktoros hitelesítést, jelszópolitikát, kockázatalapú belépésfigyelést és naplózást. Az alkalmazásfejlesztőknek nem kell minden rendszerben saját jelszótárolást építeniük – ez különösen jelentős, mert a jelszavak helyes tárolása és védelme önmagában nehéz feladat.

Üzemeltetési előny, hogy a belépő vagy kilépő hallgató, dolgozó kezelése központi folyamatba kerülhet. Az SSO azt is támogatja, hogy külső, de megbízható partnereknek korlátozott hozzáférést adjunk. Ettől még minden alkalmazásnak a legkisebb szükséges jogosultság elvét kell követnie.

## Kockázatok és korlátok

Az SSO egyik ereje a legnagyobb kockázata is: a központi IdP kritikus pont. Ha leáll, sok szolgáltatásban problémát okozhat. Ha egy támadó átvesz egy központi fiókot, több alkalmazáshoz is eljuthat. Ezért az IdP-nek különösen erős védelmet, magas rendelkezésre állást, jó naplózást és gondos incidenskezelést kell kapnia.

Az adathalászat is veszélyes. Mivel a felhasználó megszokja, hogy átirányítás után belép, meg kell tanulnia ellenőrizni a címet és a környezetet. Egy hamis „egyetemi belépés” oldal ugyanúgy jelszót gyűjthet. A többfaktoros hitelesítés csökkenti, de nem minden esetben szünteti meg ezt a veszélyt; az ellenállóbb módszerek, például hardveres biztonsági kulcsok, sokat segíthetnek.

Adatvédelmi kérdés is felmerül. Ha az IdP minden belépést lát, következtethet arra, mely szolgáltatásokat használja egy személy. Az intézménynek világosan kell meghatároznia, milyen adatokat ad át egy alkalmazásnak, meddig naplózza az eseményeket, és mi a jogalap. Egy könyvtári alkalmazásnak például nem feltétlenül van szüksége a hallgató minden személyes adatára; lehet, hogy egy stabil azonosító és jogosultsági szerep elég.

## Kilépés és munkamenetek

Kijelentkezéskor több réteg létezhet. A felhasználó kiléphet csak a tanulmányi rendszer saját munkamenetéből, miközben az IdP-nél még belépve marad. Ha utána visszatér, az SSO ismét gyorsan beengedheti. A teljes, központi kijelentkezés több alkalmazást is érinthet, de nehezebb megbízhatóan végigvinni, különösen sok, egymástól független szolgáltatás esetén.

Ezért fontos az időkorlát: érzékeny rendszereknél a munkamenet rövidebb lehet, és bizonyos műveletekhez újra kell kérni a jelszót vagy a második faktort. Egy jegy megtekintése és egy személyes adat módosítása nem feltétlenül azonos kockázatú művelet.

## Gyakori tévhitek

- **„SSO-val minden alkalmazás megkapja a jelszavamat.”** Nem; jó kialakításban az alkalmazások nem látják a központi jelszót.
- **„Az SSO és a jelszókezelő ugyanaz.”** A jelszókezelő több külön fiók jelszavát kezeli, az SSO pedig közös identitásszolgáltatóval teremthet belépési kapcsolatot.
- **„Ha az IdP beléptetett, mindenhol rendszergazda vagyok.”** Az azonosítás és az alkalmazásbeli jogosultság külön kérdés.
- **„Az SSO csak kényelmi funkció.”** Központi MFA, egységes letiltás és kevesebb jelszótároló is biztonsági előny.
- **„Központi belépés után sosem kell újra azonosítani magam.”** Érzékeny műveletekhez vagy lejárt munkamenet után újrahitelesítés kellhet.

## Ellenőrző kérdések

1. Mitől különbözik az SSO attól, hogy több rendszerben ugyanazt a jelszót használjuk?
2. Kik az IdP és a szolgáltató alkalmazás szereplői egy egyetemi e-learning belépésben?
3. Miért kell az alkalmazásnak ellenőriznie a kapott SSO-igazolást?
4. Nevezz meg két előnyt és két kockázatot a központi azonosítás mellett.
5. Miért lehet indokolt, hogy egy érzékeny műveletnél az SSO ellenére is újra hitelesítsünk?

## Fogalomtár

- **Identity Provider (IdP):** a központi szolgáltatás, amely a felhasználó azonosítását végzi és igazolást ad ki.
- **SSO (Single Sign-On):** több alkalmazás használata központi belépési munkamenet segítségével.
- **Service Provider / relying party:** az az alkalmazás, amely elfogadja az IdP igazolását.
- **SAML:** intézményi környezetekben gyakori, XML-alapú szövetségi azonosítási szabvány.
- **Többfaktoros hitelesítés (MFA):** egynél több, eltérő típusú bizonyíték használata belépéskor.
- **Újrahitelesítés:** érzékeny művelet előtt friss azonosítás kérése.
