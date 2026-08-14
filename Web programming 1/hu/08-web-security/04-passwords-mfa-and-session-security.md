# Jelszavak, MFA és munkamenetbiztonság

## Célok

Az anyag végére a hallgató megérti, hogy a bejelentkezés nem egyetlen képernyő, hanem egymásra épülő bizalmi döntések folyamata. Képes megkülönböztetni a jelszó tárolását a jelszó titkosításától és a hash-eléstől, el tudja mondani, miért fontos az egyedi, hosszú jelszó és a többfaktoros hitelesítés. Felismeri a munkamenet szerepét, a biztonságos cookie-k fő beállításait, valamint azt, hogy egy védelmi megoldás mit csökkent, és milyen kockázatokat nem szüntet meg.

**A jelszó csak a belépés egyik bizonyítéka. A webes fiók védelme akkor erős, ha a szolgáltatás nem tudja visszaolvasni a jelszót, a belépéshez szükség esetén további bizonyítékot kér, és a belépés után létrejött munkamenetet is gondosan védi.**

## A bejelentkezés mögötti kérdés

Amikor Anna beírja az e-mail-címét és a jelszavát egy egyetemi rendszerbe, látszólag két mezőt tölt ki és megnyom egy gombot. A rendszernek azonban több kérdésre kell választ adnia. Valóban Anna küldte-e a kérést? Megfelel-e a megadott titok annak, amit korábban rögzítettek? Kell-e második bizonyíték is? Ha a rendszer elfogadja a belépést, hogyan jegyzi meg a böngésző következő kéréseinél, hogy ugyanarról a személyről van szó?

Az utolsó kérdés különösen lényeges, mert a HTTP alapvetően állapotmentes. Egy `GET /kurzusok` kérés önmagában nem „emlékszik” arra, hogy előtte ki töltötte ki a belépő űrlapot. Ezért a rendszer belépés után általában létrehoz egy munkamenetet, angolul sessiont. A böngésző kap egy azonosítót, és a későbbi kéréseknél ezt elküldi. A szerver ehhez az azonosítóhoz kapcsolja Anna belépett állapotát és – a jogosultságkezeléssel együtt – eldönti, mit kérhet le.

Ebből következik egy fontos gondolat: a bejelentkezési űrlap védelme önmagában nem elég. Ha valaki illetéktelenül megszerzi a már belépett böngésző munkamenet-azonosítóját, a rendszer szemében gyakran úgy viselkedhet, mintha Anna lenne. A jelszó, a második faktor, a munkamenet és a kijelentkezés ezért ugyanannak a védelmi láncnak a részei.

## A jó jelszó: nem emlékezetpróba

A jelszavak legnagyobb gyakorlati problémája az újrahasználat. Ha valaki ugyanazt a rövid jelszót használja egy fórumon, egy régi webáruházban és az egyetemi fiókjában, egyetlen külső adatszivárgás is több szolgáltatásnál veszélyt teremthet. A támadó számára nem kell feltörnie a legerősebb rendszert: elég kipróbálnia egy máshonnan megszerzett e-mail–jelszó párost több ismert oldalon. Ezt a jelenséget credential stuffingnak, hitelesítő adatok tömeges újrapróbálásának nevezik.

Ezért a személyes jó gyakorlat az, hogy minden szolgáltatáshoz egyedi, hosszú jelszó tartozzon. Ennek kézi megjegyzése nem reális elvárás; a jelszókezelő alkalmazások pontosan ezt a terhet veszik le. Erős, véletlenszerű jelszót tudnak létrehozni és biztonságosan előhívni. A hosszúság általában többet ér, mint a látványos, de kiszámítható karaktercsere: a `Jelszo123!` inkább mintát követ, mint valódi véletlent. Egy több szóból álló, csak egy helyen használt jelszómondat vagy egy jelszókezelő által generált hosszú karakterlánc jobb kiindulópont.

A szolgáltató szempontjából a jelszó soha nem lehet olyan adat, amelyet később „visszaküldenek” a felhasználónak. Ha egy oldal e-mailben elküldi a régi jelszót, az annak jele, hogy a jelszó visszafejthető formában volt tárolva – ez súlyos tervezési hiba. Helyette a szolgáltatás a jelszóból egy egyirányú ellenőrző értéket, hash-t képez.

## Hash, só és lassítás

A hash függvény leegyszerűsítve olyan eljárás, amely egy bemenetből rögzített alakú kimenetet képez. A bejelentkezéskor a rendszer nem a régi jelszót keresi elő, hanem a beírt jelszóból újra előállítja az ellenőrző értéket, és azt hasonlítja össze a tárolttal. A cél nem titkos üzenet visszafejtése, hanem annak megállapítása, hogy ugyanazt a titkot adták-e meg.

A jelszóhash-ekhez sót (salt) is használnak: ez egy felhasználónként eltérő, nem titkos kiegészítő adat. A só azt segíti, hogy két azonos jelszó ne ugyanazzal a tárolt értékkel jelenjen meg, és ne lehessen előre elkészített, sok fiókon működő táblázatokkal gyorsítani a találgatást. A szolgáltatás a sót a hash mellett tárolhatja; az értéke nem attól véd, hogy titokban marad.

Jelszóhoz ráadásul nem a gyors általános hash a megfelelő eszköz. A rendszernek szándékosan lassú, jelszótárolásra tervezett eljárást kell választania, például Argon2, bcrypt vagy scrypt családba tartozó megoldást. A lassítás a valódi felhasználónak rendszerint észrevehetetlen, de nagy tömegű jelszópróbálgatást költségesebbé tesz. A részletes paraméterezés fejlesztői feladat; az elv a hallgató számára az, hogy a gyorsaság itt nem erény.

Fontos megkülönböztetés, hogy a hash nem ugyanaz, mint a titkosítás. A titkosított adatot megfelelő kulccsal vissza lehet fejteni; a jelszóhash célja ezzel szemben éppen az, hogy a szolgáltatásnak ne legyen szüksége az eredeti jelszó ismeretére. Ettől még egy szivárgott hash-adatbázis kockázat, mert a gyenge jelszavakat lehet találgatni. Ezért van szükség egyedi, erős jelszavakra és további védelmi rétegekre.

## Második faktor és passkey

A többfaktoros hitelesítés (MFA) azt jelenti, hogy a rendszer nem csak egy bizonyítékot kér. A klasszikus felosztás szerint lehet valami, amit a felhasználó tud (jelszó), amivel rendelkezik (hardveres biztonsági kulcs vagy hitelesítő alkalmazás), illetve amihez testi jellemző kapcsolódik (biometria). Két jelszó nem két faktor; két különböző jelszó ugyanabba a kategóriába tartozik.

A hitelesítő alkalmazás időalapú egyszer használatos kódja gyakori megoldás. Előnye, hogy nem pusztán az e-mail-fiókhoz kötődik. Az SMS-kód több helyzetben jobb a csak jelszavas belépésnél, de nem tekinthető azonos erősségűnek: a telefonszám átvitele, a kézbesítési lánc és az adathalászat mind kockázatot jelenthet. A rendszernek ezért fontos műveleteknél – például jelszó-, e-mail-cím- vagy kifizetési adat módosításakor – ismételt vagy erősebb hitelesítést kérhet.

A passkey, vagyis belépési kulcs a jelszómentes vagy jelszó helyetti belépés egyik korszerű formája. A felhasználó eszköze egy kulcspárt kezel: a titkos rész az eszközön marad, a szolgáltatás a nyilvános részt ismeri. Belépéskor az eszköz egy, az adott szolgáltatáshoz kötött bizonyítékot ad. A felhasználó ezt sokszor az eszközének feloldásával – PIN-nel vagy biometrikus azonosítással – hagyja jóvá. A biometria ilyenkor jellemzően nem utazik el a weboldalhoz: helyben engedélyezi a kulcs használatát. A passkey egyik fontos előnye, hogy eredethez kötött, ezért az adathalász másik domainjén nem ugyanúgy használható, mint a jelszó.

Sem az MFA, sem a passkey nem varázspajzs. A felhasználó megtéveszthető, az eszköz elveszhet, a helyreállítási folyamat lehet gyenge. Ezért a helyreállítási kódokat is biztonságosan kell kezelni, a szolgáltatásnak pedig átlátható értesítéseket és visszavonási lehetőséget kell adnia.

## Munkamenet: a belépés utáni belépőkártya

Sikeres belépés után Anna böngészője általában egy session cookie-t kap, például `session=...` formában. Ez az érték nem lehet beszédes, könnyen kitalálható azonosító. A lényeg nem az, hogy a cookie önmagában „titkos jelszó”, hanem hogy aki birtokolja, a lejártáig vagy visszavonásáig bizonyíthatja vele a belépett állapotát. Emiatt a szervernek hosszú, véletlen, megfelelően védett azonosítókat kell alkalmaznia, és a munkamenetnek korlátozott élettartamot kell adnia.

A cookie néhány attribútuma különösen fontos. A `Secure` jelzés arra kéri a böngészőt, hogy a cookie-t csak HTTPS-kapcsolaton küldje el. A `HttpOnly` azt jelenti, hogy a böngészőoldali JavaScript ne férjen hozzá közvetlenül; ez mérsékelheti egy XSS hiba következményét, de magát az XSS-t nem oldja meg. A `SameSite` szabályozza, hogy a böngésző mikor küldje el a cookie-t más oldalról kezdeményezett kéréshez; ez a CSRF típusú, keresztoldali kérés-hamisítás elleni védelem egyik eleme. A `Path` és `Domain` attribútummal a küldés hatóköre szűkíthető.

A védelem itt nem egyetlen kapcsoló. A `SameSite` beállítás például mérsékelheti, de nem helyettesíti minden esetben az átgondolt kérésvédelmet. A munkamenetet ki kell jelentkezéskor érvényteleníteni, és érdemes új azonosítót kiadni sikeres belépés vagy jogosultságszint-változás után. Így kisebb az esélye, hogy egy korábban rögzített azonosító tovább használható maradjon. A rendszer figyelhet szokatlan belépésekre, és a felhasználónak lehetőséget adhat az aktív eszközök áttekintésére és munkamenetek visszavonására.

## Végigvezetett példa: egy tanulmányi rendszer belépése

Anna megnyitja az egyetemi tanulmányi rendszer HTTPS-es belépőoldalát. Megadja egyedi, jelszókezelőben tárolt jelszavát. A szerver megkeresi Anna felhasználói rekordját, kiolvassa a hozzá tartozó sót és a korábban képzett lassú hash-t, majd a beírt jelszó megfelelő ellenőrző értékét hasonlítja össze ezzel. Nem „visszafejti” a korábbi jelszót.

A jelszó egyezése után a rendszer egy hitelesítő alkalmazásból származó kódot kér. Anna jóváhagyja a belépést. A szerver létrehoz egy rövid élettartamú munkamenetet, naplózza a belépést, és `Secure`, `HttpOnly`, megfelelő `SameSite` attribútumú cookie-t küld vissza. Anna megnyitja a jegyeit; a böngésző a cookie-t automatikusan elküldi a saját rendszer domainjére, a szerver pedig ebből azonosítja a munkamenetet, majd külön ellenőrzi a kérés jogosultságát.

Ha valaki sok hibás jelszót próbál ki ugyanarra a fiókra vagy egy IP-címről sok fiókra, a rendszer korlátozhatja a kérések sebességét (rate limiting), késleltetést alkalmazhat, vagy további ellenőrzést kérhet. Ez nem büntetés, hanem a tömeges próbálgatás költségének növelése. A végleges, vak fiókletiltás ugyanakkor visszaélésre is alkalmas lehet: valaki szándékosan kizárhatná Annát. A jó szabály a kockázat és a használhatóság egyensúlyát keresi.

## Gyakori tévhitek

**„A szolgáltatásnak el kell mentenie a jelszót, különben nem tud ellenőrizni.”** Nem. A szerver a jelszóhash egyezését ellenőrzi, az eredeti titok ismerete nélkül.

**„A hash és a titkosítás ugyanaz.”** Nem. A titkosítás visszafejthető a kulccsal; a jelszóhash ellenőrzésre szolgál, nem visszaállításra.

**„Az SMS-kód minden támadás ellen véd.”** Jobb lehet, mint a csak jelszavas belépés, de adathalászat és telefonszámhoz kapcsolódó kockázatok ellen nem tökéletes.

**„A HttpOnly cookie teljesen megoldja az XSS-t.”** Csak azt korlátozza, hogy JavaScript közvetlenül kiolvassa-e a cookie-t. A hibásan futó idegen kód más kárt továbbra is okozhat.

**„A kijelentkezés csak a képernyő állapotát változtatja.”** Helyesen megvalósítva a szerveren is érvényteleníti a munkamenetet.

## Ellenőrző kérdések

1. Miért veszélyes ugyanazt a jelszót több szolgáltatásban használni?
2. Mi a só szerepe a jelszóhash tárolásakor?
3. Miben különbözik a jelszóhash a titkosítástól?
4. Miért nem jelent két faktoros hitelesítést két külön jelszó megadása?
5. Milyen célt szolgál a `Secure`, a `HttpOnly` és a `SameSite` cookie-attribútum?
6. Miért kell a szervernek a belépés után is védenie a munkamenetet?

## Fogalomtár

**Jelszóhash:** jelszóból egyirányúan képzett ellenőrző érték, amelyet a szerver összehasonlításra használ.

**Só (salt):** felhasználónként eltérő kiegészítő adat a jelszóhash képzéséhez.

**MFA:** több, eltérő jellegű hitelesítési tényező használata.

**Passkey:** eszközön kezelt kulcspárra épülő, szolgáltatáshoz kötött belépési megoldás.

**Munkamenet (session):** a szerver által kezelt, belépett állapotot reprezentáló kapcsolat a kérések között.

**Session cookie:** a böngésző által a későbbi kérésekhez elküldött munkamenet-azonosító.

**Rate limiting:** a kérések gyakoriságának korlátozása a túlterhelés és a tömeges próbálgatás mérséklésére.

**CSRF:** olyan támadási minta, amelyben a böngészőt egy másik oldal próbálja hitelesített kérés küldésére rávenni.
