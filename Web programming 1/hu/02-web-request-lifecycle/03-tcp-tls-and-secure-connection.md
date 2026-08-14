# TCP, TLS és a biztonságos kapcsolat

A böngésző és a szerver közötti webes kommunikációban több réteg működik együtt. A TCP segít megbízható adatfolyamot létrehozni, a TLS védi és hitelesíti a kommunikációt, a HTTP pedig ezen a kapcsolaton írja le a webes kérés–válasz párbeszédet. A HTTPS röviden HTTP TLS-védelemmel.

Amikor egy felhasználó megnyit egy HTTPS-webhelyet, könnyű úgy gondolni, hogy „a böngésző elküld egy oldalkérést, a szerver pedig visszaküldi az oldalt”. A valóságban több különálló probléma megoldása szükséges ehhez. El kell juttatni az adatot a másik félhez, kezelni kell az elveszett vagy felcserélődő csomagokat, meg kell akadályozni az illetéktelen olvasást és módosítást, végül pedig az alkalmazásnak értelmezhető HTTP-üzeneteket kell váltania.

### Mit old meg a TCP?

Az internet alapvetően csomagkapcsolt hálózat. Az adat kisebb csomagokra bontva halad, és a csomagok különböző útvonalakon is eljuthatnak a célhoz. Elméletileg elveszhetnek, késhetnek vagy más sorrendben érkezhetnek meg. Sok webes alkalmazás számára ez így önmagában nem lenne kényelmes: egy HTML-dokumentum hiányos vagy összekevert részei használhatatlanok lennének.

A TCP (Transmission Control Protocol) olyan kapcsolat-orientált szállítási protokoll, amely a két végpont számára megbízható, rendezett adatfolyam érzetét adja. Sorszámokat használ, így a fogadó fél észreveszi, ha egy darab hiányzik vagy rossz sorrendben érkezik. Visszajelzéseket küld, és a küldő szükség esetén újraküldi az adatot. A felsőbb rétegű alkalmazás ezért nem egy bizonytalan csomaghalmazt, hanem folyamatos bájtsorozatot kap.

A TCP a kapcsolat elején kapcsolatfelépítést végez. Ennek célja, hogy a két fél megbizonyosodjon arról, elérik egymást, és egyeztesse a kommunikáció alapvető paramétereit. A kapcsolat később rendezett módon lezárható. Ez a megbízhatóság azonban költséggel jár: a visszajelzések és újraküldések időt, hálózati forgalmat és állapotkezelést igényelnek.

Nem minden internetes alkalmazás használ TCP-t. Egy valós idejű videóhívás vagy online játék bizonyos esetekben jobban viseli, ha egy rövid hangdarab elveszik, mint ha a rendszer késlekedik az újraküldésre várva. A klasszikus webes kommunikáció azonban sokáig jellemzően TCP-re épült, mert a dokumentumok és tranzakciók teljes, rendezett átvitele fontos volt.

### Miért nem elég a TCP?

A TCP segít abban, hogy az adat megérkezzen, de nem garantálja, hogy az adat titkos, sértetlen vagy valóban a várt szervertől származik. Képzeljünk el egy nyilvános Wi-Fi-hálózatot egy kávézóban. Ha a kommunikáció titkosítás nélkül zajlik, egy rosszindulatú köztes szereplő megpróbálhatja megfigyelni, módosítani vagy hamis válasszal helyettesíteni az adatforgalmat.

Itt lép be a TLS (Transport Layer Security). A TLS olyan protokoll, amely védelmet ad az alkalmazási kommunikációnak. A weben ez a HTTP és a TCP között helyezkedik el: a HTTP-üzenetek TLS-en keresztül utaznak, a TLS pedig tipikusan TCP-kapcsolatot használ. A felhasználó ebből általában csak annyit lát, hogy az URL `https://` előtaggal kezdődik.

### A TLS három alapvető célja

A TLS első célja a **titkosság**. A böngésző és a szerver olyan titkosítást használ, amelynek köszönhetően az útvonalon lévő köztes szereplők nem tudják egyszerűen elolvasni a jelszót, a személyes adatot vagy az oldal pontos tartalmát.

A második cél a **sértetlenség**. A két félnek észlelnie kell, ha valaki útközben megváltoztatja az üzenetet. Enélkül elképzelhető lenne, hogy egy közvetítő például átírja a bankszámlaszámot vagy egy letöltött program tartalmát.

A harmadik cél a **hitelesítés**. A böngészőnek okkal kell elhinnie, hogy valóban ahhoz a szerverhez kapcsolódott, amelynek a nevét a címsorban látja. Ehhez használ tanúsítványokat és hitelesítésszolgáltatókat.

### Tanúsítványok és a kapcsolat felépítése

Egy HTTPS-kapcsolat kezdetén a szerver digitális tanúsítványt küld. Ebben többek között szerepel, milyen domainnevekhez használható a tanúsítvány, meddig érvényes, és melyik hitelesítésszolgáltató igazolta. A böngésző ellenőrzi ezeket az adatokat, valamint azt, hogy az aláírások lánca elvezet-e egy általa megbízhatónak tekintett gyökértanúsítványig.

Ha a böngésző súlyos problémát talál – például a tanúsítvány nem a megnyitott domainre szól, lejárt, vagy nem hitelesíthető –, figyelmeztetést jelenít meg. Ez nem puszta kellemetlenség. A böngésző azt jelzi, hogy nem tudja megbízhatóan eldönteni, a felhasználó valóban a kívánt szolgáltatáshoz kapcsolódik-e.

A tanúsítvány ellenőrzése után a böngésző és a szerver közös munkamenetkulcsokat alakít ki. Ezek a kulcsok szimmetrikus titkosításra alkalmasak, amely gyorsan használható a sok adat átvitelére. A kapcsolat elején alkalmazott aszimmetrikus kriptográfia és a későbbi szimmetrikus titkosítás együtt oldja meg, hogy a két fél biztonságosan tudjon közös titkot létrehozni anélkül, hogy azt nyíltan elküldené.

### Mit jelent valójában a lakat ikon?

A böngésző lakat ikonja nagyjából azt jelenti, hogy a kapcsolat technikai szempontból titkosított, és a tanúsítvány-ellenőrzés nem talált hibát. Ez nagyon fontos, de nem jelenti automatikusan, hogy a szolgáltató megbízható, az oldal nem adathalász, vagy a szolgáltatás felelősen kezeli az adatokat.

Egy megtévesztő webhely is szerezhet érvényes tanúsítványt a saját domainjére. Ha valaki a `bank-pelda-belepes.example` címre jut, a kapcsolat lehet tökéletesen HTTPS-védett, miközben maga a domain nem a banké. A felhasználó számára ezért a domainnév, a szolgáltatás kontextusa és a kért adatok is fontos biztonsági jelzések.

### HTTP, HTTPS és HTTP/3

A klasszikus HTTPS általában HTTP-t jelent TLS-en keresztül, a TLS pedig TCP-kapcsolaton fut. A modern webben azonban a HTTP/3 a QUIC protokollra épül, amely UDP-t használ. A lényegi felhasználói biztonsági elv nem változik: a kommunikáció továbbra is titkosított és hitelesített TLS-szerű mechanizmusokkal védett. A mögöttes technológia fejlődése azt célozza, hogy a kapcsolat gyorsabban épüljön fel és a hálózati hibák kevésbé lassítsák a felhasználói élményt.

## Végigvezetett példa: belépés nyilvános Wi-Fi-n

Egy hallgató a könyvtár Wi-Fi-hálózatán megnyitja az egyetemi tanulmányi rendszert.

1. A böngésző DNS-en keresztül megkeresi a rendszer IP-címét.
2. TCP-kapcsolatot épít a szerver felé, vagy modern esetben QUIC-kapcsolatot kezdeményez.
3. A szerver elküldi a tanúsítványát; a böngésző ellenőrzi, hogy az a kívánt domainhez tartozik-e.
4. Létrejönnek a titkosított munkamenethez szükséges kulcsok.
5. A bejelentkezési űrlap elküldésekor a jelszó a TLS által védett csatornán halad.
6. A hálózat üzemeltetője jellemzően nem olvashatja ki egyszerűen a jelszót vagy a konkrét űrlapadatokat.

Ha a felhasználó figyelmen kívül hagy egy súlyos tanúsítványhibát, akkor ez a védelmi lánc sérülhet. Ezért a böngésző figyelmeztetése nem rutinüzenet, hanem valós kockázatra utalhat.

## Gyakori félreértések

| Állítás | Pontosítás |
| --- | --- |
| „A TCP titkosítja a forgalmat.” | A TCP a megbízható adatátvitelt segíti; a titkosságot a TLS adja. |
| „A lakat ikon azt jelenti, hogy az oldal megbízható.” | A lakat a kapcsolat védelméről mond valamit, nem a szolgáltató szándékáról vagy minőségéről. |
| „A HTTPS csak jelszavas oldalakhoz kell.” | Ma általános alapelv, mert minden webes forgalom tartalmazhat érzékeny vagy módosítható információt. |
| „A titkosítás miatt senki sem tud semmit a kapcsolatunkról.” | Egyes hálózati metaadatok – például a kapcsolat ténye vagy a forgalom időzítése – továbbra is láthatók lehetnek. |

## Ellenőrző kérdések

1. Milyen problémát old meg a TCP, és melyiket nem?
2. Mi a TLS három fő biztonsági célja?
3. Mit ellenőriz a böngésző a szerver tanúsítványán?
4. Miért lehet egy adathalász oldal HTTPS-es?
5. Miért használ a TLS a kapcsolat különböző szakaszaiban eltérő kriptográfiai elveket?

## Fogalomtár

- **TCP:** megbízható, kapcsolat-orientált adatátviteli protokoll.
- **TLS:** titkosságot, sértetlenséget és hitelesítést biztosító biztonsági protokoll.
- **HTTPS:** HTTP TLS-védelemmel.
- **Tanúsítvány:** digitális igazolás a szerver domainhez kötött azonosításához.
- **Hitelesítésszolgáltató:** tanúsítványokat kiadó és hitelesítő szervezet.
- **Szimmetrikus titkosítás:** ugyanazon közös kulcsot használó titkosítás.
- **Aszimmetrikus kriptográfia:** nyilvános és titkos kulcspárra épülő eljárások.
