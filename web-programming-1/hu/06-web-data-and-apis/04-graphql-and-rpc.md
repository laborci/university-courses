# GraphQL és RPC a webes ökoszisztémában

## Célok

Az anyag végére a hallgató meg tudja különböztetni az erőforrásközpontú REST, a lekérdezésközpontú GraphQL és a műveletközpontú RPC szemléletet. Érti, mire szolgál egy GraphQL-séma, hogyan kapcsolódnak hozzá a lekérdezések és módosítások, és miért nem jelent egyetlen megoldás sem automatikus előnyt minden rendszerben. Fogalmi szinten el tudja helyezni a SOAP-ot és a gRPC-t is.

Az API nem pusztán egy URL-gyűjtemény: szerződés a rendszerek között. A REST, a GraphQL és az RPC eltérő módon írja le ezt a szerződést. A jó választás a feladat, a fogyasztók, a hálózati környezet és az üzemeltetési követelmények függvénye, nem divatkérdés.

## Három eltérő kérdésfeltevés

Egy webáruház mobilalkalmazásának példáján könnyű érzékelni a különbséget. A termékoldalon meg kell jeleníteni a termék nevét, árát, első képét, raktárkészletét és három véleményt. REST esetén a kliens többnyire erőforrásokat kér: `GET /products/42`, majd esetleg `GET /products/42/reviews?limit=3`. A szerver előre eldönti, milyen alakú válasz tartozik egy végponthoz.

GraphQL esetén a kliens inkább ezt mondja: „a 42-es termékből most pontosan ezeket a mezőket kérem”. Nem egy új HTTP-fajta, hanem API-lekérdezési nyelv és kiszolgálói futtatókörnyezet. Gyakran egyetlen HTTP-végpont, például `/graphql` mögött található, de ettől még a mögötte lévő üzleti logika, adatbázis vagy más szolgáltatások ugyanúgy léteznek.

Az RPC (Remote Procedure Call, távoli eljáráshívás) más nyelven beszél. Itt a kliens egy műveletet kér: `calculateShipping`, `sendInvoice` vagy `approveOrder`. Ez közelebb áll ahhoz, ahogyan egy programon belül függvényt hívnánk meg. A név és a bemenet hangsúlyosabb, mint az, hogy az eredmény milyen erőforrásból származik.

## GraphQL: séma mint közös nyelv

A GraphQL-rendszer középpontja a séma. Ez géppel olvasható leírás arról, milyen típusú adatok, mezők és műveletek érhetők el. Egy leegyszerűsített sémarészlet így nézhet ki:

```graphql
type Product {
  id: ID!
  name: String!
  price: Int!
  inStock: Boolean!
  reviews(limit: Int = 10): [Review!]!
}

type Query {
  product(id: ID!): Product
}
```

A felkiáltójel azt jelzi, hogy az érték nem lehet `null`. A séma nem adatbázistábla-leírás: inkább azt ígéri meg, milyen nézetet kaphat az API fogyasztója. Egy `Product` mezői származhatnak relációs adatbázisból, keresőindexből vagy akár egy külső készletkezelő szolgáltatásból is.

A kliens lekérdezése lehet például:

```graphql
query ProductCard {
  product(id: "42") {
    name
    price
    inStock
    reviews(limit: 3) {
      rating
      text
    }
  }
}
```

A válasz szerkezete követi a kérését:

```json
{
  "data": {
    "product": {
      "name": "Városi hátizsák",
      "price": 24990,
      "inStock": true,
      "reviews": [{"rating": 5, "text": "Kényelmes."}]
    }
  }
}
```

Ennek legfontosabb következménye, hogy a kliens elkerülheti a felesleges adatokat (*over-fetching*) és a sok egymás utáni kérésből fakadó hiányt (*under-fetching*). Egy termékkártyának nem kell megkapnia az egész termékleírást és minden értékelést. Ugyanakkor a szervernek meg kell oldania, hogy a rugalmas kérés ne váljon drága, ellenőrizhetetlen adatbázis-műveletté.

## Lekérdezés, módosítás, előfizetés

A GraphQL a csak olvasó műveleteket általában `query`, az állapotot megváltoztatókat `mutation` néven különíti el. Például egy kosárba helyezéshez:

```graphql
mutation AddToCart($productId: ID!, $quantity: Int!) {
  addToCart(productId: $productId, quantity: $quantity) {
    cartId
    totalItems
  }
}
```

A változókat külön adjuk át; ez áttekinthetőbb és biztonságosabb, mint értékeket szövegként „összeragasztani” a lekérdezésben. A GraphQL-ben léteznek előfizetések (*subscription*) is: a kliens értesítést kaphat egy eseményről, például új chatüzenetről. Az előfizetés nem maga a hálózati protokoll; a megvalósítás használhat WebSocketet vagy más alkalmas csatornát.

A kiszolgálóban úgynevezett resolverek állítják elő a mezők értékeit. Ha egy `product.reviews` mezőhöz minden terméknél külön adatbázis-lekérdezés indul, egy listaoldalon kialakulhat az N+1 probléma: egy kérés a termékekhez, majd N kérés az értékelésekhez. A GraphQL tehát nem „ingyen gyors”; jó adatbetöltési stratégia, jogosultságkezelés, mélység- és összetettségi korlátok kellenek hozzá.

## REST és GraphQL: nem ellenségek

A REST gyakran jól illik világosan elkülönülő, jól cache-elhető erőforrásokhoz. Egy nyilvános képkatalógusnál a `GET /images/42` egyszerű, jól érthető, HTTP-cache-ekkel természetesen együttműködő szerződés. A REST-végpontok HTTP-metódusai és státuszkódjai közvetlenül hordoznak jelentést.

A GraphQL előnyös lehet, ha több, egymástól eltérő kliens – például web, mobil és belső adminfelület – ugyanazokat az üzleti adatokat eltérő részletességben igényli. Egyetlen gondosan tervezett séma közös belépési pont lehet a mögöttes szolgáltatásokhoz. Hátrány, hogy a hálózati megfigyelés, a cache-elés és a jogosultságok ellenőrzése összetettebbé válhat. A legtöbb lekérdezés `POST`-ként is érkezhet, ezért a hagyományos HTTP-cache nem ugyanúgy használható, mint egy tipikus `GET` válasznál.

A séma akkor válik igazán értékessé, ha tudatosan fejlődik. Új mező általában biztonságosan hozzáadható, mert a régi kliens nem kéri le. Egy meglévő mező jelentésének megváltoztatása vagy eltávolítása viszont kompatibilitási gondot okozhat. Ezért a kiszolgálók sokszor elavultnak jelölnek egy mezőt, dokumentálják az utódját, és a használati adatok alapján később vezetik ki. Ez az API-tervezésben ugyanazt az alapelvet fejezi ki, mint más szerződéseknél: a már létező fogyasztókat is tiszteletben kell tartani.

Valós rendszerekben a keverés hétköznapi: fájlok feltöltése és hitelesítés lehet REST, míg az összetett képernyőadatok GraphQL-en keresztül érkeznek. A választás nem vallás, hanem szerződéstervezési döntés.

## RPC, SOAP és gRPC

Az RPC az üzleti művelet nyelvét használja. Egy banki rendszerben a `transferMoney` nem pusztán egy erőforrás „frissítése”: külön szabályai, ellenőrzései, hibái és naplózása van. Ilyenkor az eljárásnév gyakran világosabb, mint egy erőltetett erőforrás-URL.

A SOAP korábbi, de sok nagyvállalati környezetben tovább élő XML-alapú üzenetküldési szabvány. Erős formális leírást, például WSDL-t és kiterjedt szabványkészletet kínál tranzakciókra, biztonságra, üzenetkezelésre. Cserébe nehézkesebb és bőbeszédűbb, mint a mai JSON-alapú webes API-k. Nem „rossz REST”: más korszak és más vállalati igények kompromisszuma.

A gRPC modern RPC-keretrendszer. Általában Protocol Buffer nevű, sémavezérelt bináris üzenetformátumot használ, és HTTP/2 felett működik. Különösen jól használható belső szolgáltatások közti kommunikációra: a séma alapján több programozási nyelvhez generálható kliens és szerver. Böngészőből azonban nem mindig hívható olyan közvetlenül, mint egy JSON/HTTP API; ezért gyakran gateway vagy gRPC-Web réteg szükséges. A gRPC gyorsasága önmagában nem ok a bevezetésére, ha a rendszer egyszerű, nyilvános böngészős API-t igényel.

## Példa: ugyanaz a művelet három stílusban

Képzeljünk el egy rendelés lemondását. REST-ben előfordulhat `DELETE /orders/731`, ha a lemondás valóban az erőforrás eltávolítását jelenti. Ha a rendelést jogi és könyvelési okokból meg kell őrizni, tisztább lehet `POST /orders/731/cancellation`, amely létrehoz egy lemondási folyamatot. GraphQL-ben egy `cancelOrder(id: "731")` mutation fejezheti ki ugyanezt. RPC-ben `cancelOrder(731)` az eljáráshívás.

Nincs univerzális szintaktikai győztes. A döntésnél kérdezzük meg: mi a domain valós fogalma? Ki fogyasztja az API-t? Fontos-e a szabványos HTTP-cache? Egyetlen képernyőhöz sok kapcsolódó adat kell? Milyen eszközökkel tudja az üzemeltetés naplózni, mérni és védeni a forgalmat?

## Gyakori tévhitek

**„A GraphQL kiváltja a REST-et.”** Nem feltétlenül. Más problémákra ad kényelmes nyelvet, és gyakran REST-es vagy RPC-s szolgáltatások fölé épül.

**„GraphQL-lel a kliens bármit lekérdezhet.”** Csak azt kérheti, amit a séma enged, és amit a szerver jogosultsági szabályai engednek. A rugalmas mezőválasztás nem jelenti az adatvédelmi korlátok feladását.

**„Az RPC nem webes.”** RPC-szerű API-k teljesen megszokottak a weben. A kérdés nem az, hogy „webes-e”, hanem hogy a művelet- vagy erőforrásközpontú szerződés illik-e jobban.

**„A gRPC mindig gyorsabb, tehát jobb.”** A bináris formátum és HTTP/2 sok helyzetben előny, de a hibakeresés, a böngészős integráció és az üzemeltetés költsége is része a döntésnek.

## Ellenőrző kérdések

1. Miben különbözik egy GraphQL-séma az adatbázis sémájától?
2. Mit jelent az over-fetching és az under-fetching?
3. Mi a `query` és a `mutation` szerepe?
4. Mondjon példát olyan üzleti műveletre, amelyhez természetes az RPC-s szemlélet.
5. Mi az N+1 probléma, és miért veszélyes egy nagyobb listaoldalon?
6. Nevezzen meg két szempontot, amely alapján REST és GraphQL között döntene.
7. Milyen környezetben lehet különösen indokolt a gRPC használata?

## Fogalomtár

- **API-szerződés:** a kliens és szerver közötti, elérhető műveleteket és adatformátumokat rögzítő megállapodás.
- **GraphQL-séma:** típusok és műveletek formális leírása GraphQL-rendszerben.
- **Resolver:** a GraphQL-mező értékét előállító szerveroldali logika.
- **Query / mutation / subscription:** olvasás, állapotmódosítás és eseménykövetés GraphQL-ben.
- **Over-fetching / under-fetching:** fölösleges adatok átvitele, illetve a szükséges adatokhoz túl sok kérés.
- **RPC:** távoli eljáráshívás; műveletközpontú API-szemlélet.
- **SOAP:** XML-alapú, erősen szabványosított szolgáltatási protokollcsalád.
- **gRPC:** sémavezérelt, gyakran Protocol Buffert és HTTP/2-t használó RPC-keretrendszer.
