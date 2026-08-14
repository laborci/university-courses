# Az API fogalma és szerepe

Az API (Application Programming Interface, alkalmazásprogramozási felület) olyan szabályrendszer, amely leírja, hogyan kérhet szolgáltatást vagy adatot egy program egy másik programtól. A weben ez a megállapodás többnyire HTTP-kérésekből és strukturált válaszokból áll.

## Miért nem közvetlenül beszélget mindenki mindenkivel?

Képzeljünk el egy egyetemi tanulmányi rendszert. A hallgató böngészőben megnézi a felvett tárgyait, egy mobilalkalmazás értesítést küld a változásról, az oktató egy másik felületen rögzíti az eredményt, és egy külső azonosító szolgáltatás ellenőrzi a belépést. Ezeknek az összetevőknek ugyanazokhoz az üzleti adatokhoz kell hozzáférniük, de nem szabad, hogy bármelyikük tetszőlegesen módosíthassa az adatbázist.

Az API itt recepcióként működik. Nem a látogató megy be az irattárba, hanem megfogalmazza a kérését a recepción: „kérem a saját tantárgyaimat”. A recepció ellenőrzi, ki kérdezi, jogosult-e rá, hogyan kell értelmezni a kérést, majd szabályos formában választ ad. Ugyanez az elkülönítés teszi lehetővé, hogy a böngészős felület később lecserélhető legyen mobilalkalmazásra anélkül, hogy az adatkezelés minden részletét újra kellene írni.

Az API tehát határvonal. A szolgáltató oldalának belső megvalósítása – milyen adatbázist használ, milyen nyelven készült, hány szerveren fut – lehet változó. A fogyasztó számára az a fontos, hogy a nyilvános szerződés stabil maradjon: hova kell kérést küldeni, milyen adat kell hozzá, milyen válasz vagy hiba várható.

## API-k nem csak a weben vannak

Az API kifejezés tágabb, mint a „webes API”. Egy operációs rendszer API-ján keresztül kér egy program fájlt vagy hálózati kapcsolatot. Egy programozási könyvtár API-ja mondja meg, milyen függvények hívhatók. Egy fizetési szolgáltató webes API-ja viszont a hálózaton át, tipikusan HTTP segítségével érhető el. A tárgyban elsősorban ez utóbbival foglalkozunk.

Webes környezetben az API-fogyasztó lehet böngészőben futó JavaScript, mobilalkalmazás, egy másik szerver, parancssori eszköz vagy automatikus folyamat. A szolgáltató lehet saját fejlesztésű háttérrendszer vagy külső platform, például térképszolgáltatás, időjárási adatforrás vagy fizetési rendszer. Az ember rendszerint felhasználói felületet lát; a program viszont API-t használ.

## Egy kérés végigvezetve

Tegyük fel, hogy egy könyvtári oldal meg akarja jeleníteni a keresett könyvek listáját. A böngészőben futó felület elküldheti ezt a kérést:

```http
GET /api/books?author=Karinthy HTTP/1.1
Host: library.example.edu
Accept: application/json
Authorization: Bearer <hozzáférési-token>
```

Ebben a `GET` azt jelzi, hogy adatot kérünk. Az útvonal kijelöli a könyvekhez tartozó szolgáltatást, az `author` paraméter szűkíti a keresést, az `Accept` pedig azt közli, hogy JSON formátumú választ várunk. Az azonosítást a hozzáférési token szolgálja; valódi rendszerekben ezt soha nem szabad képernyőképen, nyilvános repóban vagy üzenetben megosztani.

Siker esetén például ez érkezhet vissza:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"items":[{"id":42,"title":"Tanár úr kérem","author":"Karinthy Frigyes"}],"count":1}
```

A válasz nem HTML-oldal: adat. A böngészős felület ebből döntheti el, hogyan jelenítse meg a címet, a szerzőt és az eredmények számát. Ugyanezt a választ egy mobilalkalmazás teljesen más kinézettel használhatja fel.

Ha a token hiányzik vagy lejárt, a szerver például `401 Unauthorized` állapotkódot adhat. Ha a kérésben hibás paraméter van, `400 Bad Request` lehet a válasz. Az API szerződésének része, hogy ezek a helyzetek is kiszámíthatóak legyenek, ne csak a „boldog út”.

## Mi tartozik az API szerződéséhez?

Egy használható API dokumentációja legalább a következőket rögzíti:

- végpontok és az elérési utak;
- támogatott HTTP-metódusok;
- a kérés paraméterei, fejlécei és törzse;
- a válasz formátuma és mezői;
- a sikeres és hibás állapotkódok;
- hitelesítés és jogosultság követelményei;
- korlátok, például lekérdezési sebesség vagy lapozás;
- verziózási és változtatási szabályok.

A „végpont” szó gyakran egy konkrét URL-re utal, de önmagában kevés. A `GET /books` és a `POST /books` ugyanazon az úton két eltérő műveletet jelenthet. Ezért a metódus, az útvonal, a bemenet és a válasz együtt alkotja a műveletet.

## Miért fontos a jó határfelület?

A rosszul tervezett API túlságosan sok belső részletet szivárogtat ki, következetlen elnevezéseket használ, vagy nem egyértelmű, mi történik hiba esetén. Ilyenkor a kliensek kényszermegoldásokra épülnek, és minden változtatás kockázatos. A jó API ezzel szemben a fogyasztó feladatára szerveződik, világos adatmodelleket ad, és lehetővé teszi az evolúciót.

Fontos, hogy az API nem automatikusan nyilvános. Léteznek nyilvános API-k, partnereknek szóló API-k és kizárólag egy szervezet belső rendszerei által használt API-k. A hozzáférés módja ettől függetlenül lehet erősen védett. Az, hogy egy kérés egy böngésző Network paneljében látszik, nem jelenti azt, hogy azt bárki jogosultan használhatja.

## Gyakori tévhitek

**„Az API egy adatbázis.”** Nem. Az API szabályozott felület, amely akár több adatforrásból állíthat össze választ, és üzleti szabályokat is alkalmazhat.

**„Az API mindig JSON.”** A JSON ma gyakori, de API használhat XML-t, bináris formátumot, fájlt vagy akár HTML-t is. A formátum a szerződés része.

**„Ha van egy URL, akkor bármit lehet róla olvasni.”** Nem. A szerver hitelesítést, jogosultságot, sebességkorlátot és egyéb ellenőrzéseket alkalmazhat.

**„Az API csak külső szolgáltatáshoz kell.”** A saját alkalmazás kliens- és szerverrésze közötti kapcsolat is API.

## Ellenőrző kérdések

1. Milyen problémát old meg az API a felhasználói felület és az adatok közé helyezve?
2. Nevezz meg két API-fogyasztót, amelyek ugyanazt a szolgáltatást eltérő felületen használhatják.
3. Mely részekből áll egy webes API-művelet, és miért nem elég csak az URL-t megadni?
4. Miért fontos hibaválaszt is dokumentálni?
5. Mi a különbség a nyilvános API és a hitelesítés nélkül használható API között?

## Fogalomtár

**API:** programok közötti együttműködési felület és szabályrendszer.  
**API-fogyasztó (client):** az API-t hívó program.  
**API-szolgáltató (server):** a kérést feldolgozó és választ adó rendszer.  
**Végpont (endpoint):** az API egy elérhető művelete; gyakran útvonal és HTTP-metódus együttese.  
**Szerződés (contract):** a kérés, válasz, hibák és szabályok dokumentált megállapodása.  
**Token:** jellemzően időben korlátozott, hitelesítéshez vagy hozzáféréshez használt adat.
