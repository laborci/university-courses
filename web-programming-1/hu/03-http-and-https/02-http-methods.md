# HTTP-metódusok és jelentésük

Az URL azt mondja meg, mihez fordul a kliens; a HTTP-metódus pedig azt, milyen szándékkal. A metódus nem díszlet. Ebből következtethet a böngésző, a proxy, a gyorsítótár és a fejlesztő arra, hogy a kérés lekérdezés, létrehozás, módosítás vagy más művelet.

## Miért nem elég az URL?

A /api/hallgatok/42 útvonal a 42-es hallgató erőforrására utal. A GET /api/hallgatok/42 lekéri az adatot, a DELETE /api/hallgatok/42 törlési szándékot fejez ki. Ugyanaz a cím, más a művelet.

Ez jobb, mint egy GET-tel hívott /hallgato-torles?id=42 cím. GET-kérést keresőrobot, előnézetkészítő vagy véletlen kattintás is elküldhet. Ha ez törlést indít, a rendszer veszélyes. A metódusok szemantikája ezért közös szerződés.

## Biztonságos és idempotens

A biztonságos, angolul safe, itt nem titkosítást jelent. Azt jelenti, hogy a kérés rendeltetése lekérdezés, nem változtatja meg az alkalmazás üzleti állapotát. A GET lekérhet terméket, de nem indíthat fizetést és nem törölhet rekordot. Naplózás történhet, de nem ez a kérés célja.

Az idempotens metódus ismételt, azonos végrehajtása a kívánt végállapot szempontjából nem okoz többletváltozást. Ugyanazt a teljes profilt tízszer PUT-tal elküldve ugyanaz a profil marad. Ugyanazt az erőforrást többször DELETE-tel törölve a végén nincs ott. A második kérés válaszolhat 404-gyel; a célállapot még ugyanaz.

| Metódus | Biztonságos? | Idempotens? | Tipikus cél |
| --- | --- | --- | --- |
| GET | igen | igen | lekérés |
| HEAD | igen | igen | metaadat lekérése |
| POST | nem | nem feltétlenül | létrehozás vagy művelet |
| PUT | nem | igen | teljes csere |
| PATCH | nem | nem feltétlenül | részleges módosítás |
| DELETE | nem | igen | törlés |
| OPTIONS | igen | igen | támogatott lehetőségek |
| TRACE | igen | igen | diagnosztikai visszhang |
| CONNECT | nem | nem | proxyalagút |

## GET – lekérdezés

A GET erőforrás lekérésére szolgál. Példa: GET /api/targyak?felev=2026-osz&oktato=Kovacs. Paraméterei gyakran az URL-ben szerepelnek, ezért a cím megosztható, könyvjelzőzhető és bizonyos esetekben gyorsítótárazható. Jelszó vagy token nem való query paraméterbe, mert URL-ek előzményekben és naplókban is feltűnhetnek. A GET nem használható valódi törlésre, szavazásra vagy rendelésre.

## HEAD – lekérés tartalom nélkül

A HEAD jelentése majdnem GET, de a válasz törzse hiányzik. Egy HEAD /letoltesek/telepito.zip kérésből a kliens megtudhatja a Content-Length, Content-Type vagy Last-Modified értékét anélkül, hogy a nagy fájlt letöltené. Hasznos linkellenőrzésre és gyorsítótár-validálásra.

## POST – adat beküldése vagy művelet indítása

A POST feldolgozásra küld adatot, új erőforrást hozhat létre vagy műveletet kezdeményezhet. Példa: POST /api/jelentkezesek, törzsben {"kurzus":"WEBPROG1","hallgatoAzonosito":"AB12CD"}. Új jelentkezés esetén a szerver 201 Created választ és Location: /api/jelentkezesek/815 fejlécet küldhet.

A POST nem automatikusan biztonságosabb a GET-nél: HTTPS, jogosultságellenőrzés és bemenetvalidáció itt is kell. A kétszer elküldött POST két rendelést vagy jelentkezést hozhat létre, ezért hálózati újrapróbálásnál óvatosan kell használni.

## PUT – teljes reprezentáció cseréje

A PUT üzenete: ezen az ismert címen legyen ez az erőforrás teljes állapota. Példa: PUT /api/profil/42, törzsben {"nev":"Kiss Anna","email":"anna@example.test","ertesitesek":true}. A szerver felülírhatja a teljes profilt, vagy egyes rendszerekben létre is hozhatja. Az ismétlés általában idempotens. A dokumentációnak meg kell mondania, mi történik a kimaradó mezőkkel.

## PATCH – részleges módosítás

A PATCH csak a változó részt küldi. PATCH /api/profil/42 törzse lehet {"ertesitesek":false}. Így nem kell a nevet és e-mail-címet újraküldeni. Formátuma API-nként eltérhet. Nem minden PATCH idempotens: egy add hozzá 1 pontot jellegű kérés ismétlése többször növelheti az értéket.

## DELETE – törlési szándék

A DELETE egy erőforrás eltávolítását kéri: DELETE /api/jelentkezesek/815. A szerver fizikailag törölhet, de soft delete-et is használhat, amikor az adat auditcélból megmarad. A kliens szempontjából a lényeg, hogy az erőforrás többé nem elérhető. Idempotens, de nem biztonságos, ezért közönséges link soha ne indítsa.

## OPTIONS – milyen műveletek lehetségesek?

Az OPTIONS a célhoz kapcsolódó kommunikációs lehetőségekre kérdez rá. Böngészőkben gyakran CORS előzetes ellenőrzésként jelenik meg: OPTIONS /api/profil/42, Origin: https://hallgato.peldaegyetem.hu, Access-Control-Request-Method: PATCH. A válasz megmondhatja, engedélyezett-e a másik eredetről érkező PATCH. Az Allow fejléc felsorolhatja a támogatott metódusokat.

## TRACE – diagnosztikai visszhang

A TRACE a szerver által kapott kérés visszhangját kéri. Régebben út közbeni proxyk vizsgálatára szolgált. Mivel fejlécekben érzékeny adat lehet, a modern szerverek gyakran letiltják. Ismerni érdemes, tipikus alkalmazás-végpontként nem használjuk.

## CONNECT – alagút proxyn át

A CONNECT egy köztes proxyhoz szól, és alagutat kér a célhoz: CONNECT api.pelda.hu:443. Sikeres válasz után a proxy továbbítja az adatfolyamot, amelyen a kliens és a cél TLS-kapcsolatot építhet. Nem szokásos üzleti API-művelet.

## A minimális szerver példája

A GET /time természetes, mert az idő lekérése nem változtat üzleti állapotot. A GET /add?a=2&b=3 is elfogadható oktatási példa. Ha a számítás történetét elmentenénk, számláznánk vagy egyenleget módosítanánk, már POST vagy más megfelelő állapotmódosító végpont kell.

## Ellenőrző kérdések

1. Mit fejez ki a metódus, amit az URL nem?
2. Mit jelent itt a biztonságos, és mit nem?
3. Miért veszélyes a GET-tel megvalósított törlés?
4. Miben tér el a PUT és a PATCH?
5. Miért nem biztosan idempotens a POST?
6. Mire használható a HEAD?
7. Miért indíthat a böngésző OPTIONS-kérést?
8. Kihez szól tipikusan a CONNECT?

## Fogalomtár

- **Biztonságos metódus:** lekérdezési szándékú, üzleti állapotot nem módosító metódus.
- **Idempotencia:** azonos kérés ismétlése ugyanahhoz a célállapothoz vezet.
- **Reprezentáció:** az erőforrás egy adott formában, például JSON-ban közölt állapota.
- **Teljes csere:** erőforrás teljes reprezentációjának felülírása.
- **Részleges módosítás:** csak kijelölt mezők frissítése.
- **CORS preflight:** böngésző által küldött előzetes OPTIONS-ellenőrzés.
- **Proxyalagút:** köztes proxy által létrehozott továbbított kapcsolat.
