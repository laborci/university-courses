# Szolgáltatásmunkások és offline működés

A service worker a böngészőben futó, háttérjellegű program, amely a weboldal és a hálózat között tud közvetíteni. Segítségével egy webalkalmazás egyes erőforrásokat előre eltárolhat, offline visszaadhat, vagy hálózati hiba esetén értelmesebb választ adhat a felhasználónak.

A klasszikus weboldal erősen függ a hálózattól: ha a böngésző nem ér el szervert, nem tudja letölteni a dokumentumot vagy a hozzá tartozó fájlokat. A mai felhasználók azonban gyakran váltanak hálózatot, utaznak, gyenge térerőn dolgoznak, vagy ideiglenesen elvesztik a kapcsolatot. Emiatt sok szolgáltatásnál fontos kérdés, mi történik akkor, ha a hálózat lassú vagy éppen nem elérhető.

A **service worker** egy olyan JavaScript-program, amely nem egy konkrét oldal megjelenítéséhez kötődik. A böngésző külön életciklusban kezeli, és a hatókörébe tartozó oldalak hálózati kéréseit képes megfigyelni és adott esetben kezelni. Nem hozzáférhetetlen háttérfolyamat: szigorú biztonsági szabályok vonatkoznak rá, és jellemzően csak HTTPS-en keresztül szolgáltatott oldal regisztrálhatja.

### Mit tesz a service worker?

Egy service worker a böngésző és a hálózat közé állhat. Amikor a weboldal például egy stíluslapot vagy adatot kér, a service worker eldöntheti, hogy először a helyi cache-ben keres, a hálózatról kér friss választ, vagy a két megközelítést kombinálja. Ezzel az alkalmazás gyorsabb első élményt és jobb hibatűrést adhat.

A leggyakoribb minta az úgynevezett alkalmazáshéj (app shell). A szolgáltatás alapvető felülete – HTML, CSS, JavaScript, ikonok – előre letöltődik és cache-be kerül. Ha később nincs hálózat, a felhasználó legalább ezt a felületet megnyithatja. A dinamikus adat, például a friss hírek vagy a szerveroldali állapot, természetesen nem minden esetben érhető el offline.

### Cache-stratégiák

Nincs minden helyzetre egyetlen jó cache-megoldás. A **cache-first** stratégia először a helyi tárolót használja; ez gyors, és jól működhet ritkán változó logókhoz vagy verziózott programfájlokhoz. A **network-first** először a hálózatról próbál friss adatot kérni, és csak hiba esetén tér vissza a tárolt változatra; ez hasznos lehet olyan listáknál, ahol a frissesség fontos. A **stale-while-revalidate** gyorsan visszaadja a korábbi értéket, de közben frissítést kér a hálózatról a következő használathoz.

Ezek a döntések felhasználói következményekkel járnak. Egy térkép alaptérképe vagy egy oktatási alkalmazás korábban megnyitott tananyaga offline is hasznos lehet. Egy bankszámlaegyenleg vagy vizsgaeredmény azonban nem jelenhet meg félrevezetően régi adatként anélkül, hogy a rendszer egyértelműen jelezné annak időpontját.

### Progresszív webalkalmazások

A service worker a progresszív webalkalmazások egyik fontos eleme. A PWA nem egyetlen technológia, hanem szemlélet: a webes szolgáltatás használható legyen eltérő eszközökön, fokozatosan bővüljön a rendelkezésre álló képességekkel, és lehetőleg ellenálló legyen rossz hálózati körülmények között is. Egyes böngészők lehetővé teszik az ilyen oldalak „telepítését” is, vagyis saját ikonnal, alkalmazásszerű ablakban indíthatók.

Ettől még egy PWA nem válik automatikusan natív mobilalkalmazássá. A böngésző és az operációs rendszer továbbra is meghatározza, milyen képességek érhetők el. A szolgáltatásnak a böngészők közötti eltéréseket, az engedélyeket és az offline állapotot is megfelelően kezelnie kell.

### Biztonság és életciklus

A service worker nagy felelősség, mert képes kéréseket közvetíteni és válaszokat cache-ből adni. Ezért a böngészők jellemzően csak biztonságos környezetben engedik a használatát. A frissítése sem azonnali: a böngésző letölti az új változatot, de a korábbi worker még kiszolgálhat nyitott lapokat. Ez néha meglepő fejlesztői és felhasználói helyzetet teremt: az oldal egy része már friss, más része még régi cache-t használhat.

Jó felhasználói élményhez az alkalmazásnak jeleznie kell, ha offline üzemmódban van, mikor frissült utoljára az adat, és milyen funkciók nem használhatók kapcsolat nélkül. Az offline működés nem azt jelenti, hogy úgy teszünk, mintha minden rendben lenne; azt jelenti, hogy a korlátozott helyzetben is értelmes és őszinte viselkedést tervezünk.

## Végigvezetett példa: tananyagolvasó alkalmazás

Egy hallgató előző este megnyitotta egy kurzus anyagait. Az alkalmazás a dokumentumokat, a stíluslapokat és a navigációt eltárolta a cache-ben. Másnap vonaton utazva nincs stabil internetkapcsolata, de a korábban megnyitott fejezeteket továbbra is el tudja olvasni.

Amikor azonban új beadási határidőt vagy friss közleményt szeretne megnézni, az alkalmazás jelzi: az adat nem frissíthető kapcsolat nélkül, utoljára tegnap este töltődött le. Ez jobb megoldás, mint üres oldal vagy félrevezetően aktuálisnak tűnő régi adat.

## Gyakori félreértések

| Állítás | Pontosítás |
| --- | --- |
| „A service worker mindig fut a háttérben.” | A böngésző szükség szerint indítja és állítja le; nem hagyományos, folyamatos háttérfolyamat. |
| „Offline módban minden adat elérhető.” | Csak az előre vagy korábban eltárolt erőforrások, és a dinamikus adatok frissessége korlátozott lehet. |
| „A cache csak gyorsítás.” | Hibatűrést és offline használhatóságot is adhat, de frissességi problémákat is okozhat. |
| „A PWA minden eszközön ugyanúgy telepíthető.” | A böngésző és az operációs rendszer támogatása eltérhet. |

## Ellenőrző kérdések

1. Miért csak HTTPS-en működhet általában service worker?
2. Melyik cache-stratégia lehet jó egy ritkán változó logóhoz, és melyik egy friss hírek listájához?
3. Miért fontos jelezni a felhasználónak az adat utolsó frissítésének idejét?
4. Mi a különbség a gyorsabb oldal és az offline is használható oldal között?

## Fogalomtár

- **Service worker:** a böngészőben futó, hálózati kéréseket közvetíteni képes háttérprogram.
- **Cache Storage:** böngészőoldali tároló webes kérések és válaszok számára.
- **Offline-first:** olyan tervezési szemlélet, amely a hálózati hiba esetére is értelmes működést ad.
- **PWA:** progresszív webalkalmazás.
- **App shell:** a webalkalmazás alapvető, gyorsítótárazható felületi váza.
