# Git-Docs: Decentralized Educational Platform Concept

## A Vízió (The Vision)
A Git-Docs egy teljesen decentralizált, "Docs-as-Code" (kódként kezelt dokumentáció) alapú oktatási keretrendszer. Célja, hogy egyetlen letisztult webes felületen (Single Page Application) fogja össze az egyetemi oktatók, kutatók és diákok tananyagait, miközben az adatok (a Markdown fájlok) fizikailag az egyes oktatók saját, független GitHub repozitóriumaiban maradnak.

Gyakorlatilag ez egy "Wikipedia az egyetemi kurzusoknak", ahol minden tanár a saját repójának az ura, de a modulok szabadon hivatkozhatók, újrahasznosíthatók és megoszthatók.

## Architektúra (Architecture)
A rendszer egy 100%-ban kliensoldali JavaScript alkalmazás (szerver nélkül).
1. **Üres Héj (Shell):** A központi domain (pl. `git-docs.hu`) csak egy statikus HTML/JS/CSS csomagot szolgál ki.
2. **Dinamikus Útválasztás (Routing):** Amikor a felhasználó megnyitja a `git-docs.hu/laborci/courses/webprogramozas-1` címet, a frontend azonnal tudja, hogy a GitHubról a `laborci/courses` repó `webprogramozas-1` mappáját kell betöltenie.
3. **Valós idejű Renderelés:** A JavaScript lekéri a nyers (raw) Markdown fájlokat a GitHubról, és a böngészőben, futásidőben alakítja őket gyönyörű, formázott weboldallá (pl. `marked.js` segítségével).

## Fő Funkciók és Megoldások

### 1. Föderált Konfiguráció és Cross-Repo Linkelés (A "Lego" rendszer)
Minden kurzus vagy "Node" (csomópont) rendelkezik egy saját `config.json` fájllal a GitHubon, ami leírja az oldalsáv szerkezetét. 
Ennek a rendszernek a legnagyobb ereje, hogy a menüpontok hivatkozhatnak külső repókra is. 
Egy központi tanszéki kurzus (pl. "Informatika Alapjai") összeállítható úgy, hogy:
- Az 1. hetet (Web alapok) a `laborci/courses` repóból húzza be.
- A 2. hetet (Adatbázisok) a `kovacs/db-course` repóból.
A rendszer képes teljes al-kurzusokat egybeágyazni más forrásokból, így elkerülhető a tananyagok duplikációja.

### 2. Skálázódás és Rate Limiting
A GitHub API és a `raw.githubusercontent.com` IP-alapú korlátozásokkal rendelkezik (kb. 5000 kérés/óra/IP). Ez normál használatnál elegendő, de egy zsúfolt egyetemi előadóban, közös NAT-olt IP cím mögött problémát okozhat.
**Megoldás:** Egy rendkívül pehelysúlyú Proxy réteg bevezetése (pl. Cloudflare Workers). 
A frontend a `api.git-docs.hu/...` címet hívja, a Cloudflare pedig lekéri a fájlt a GitHubról, és 5 percre a gyorsítótárba (Cache) teszi. Ezzel a GitHub felé menő terhelés szinte nullára csökken, a diákok pedig azonnal, várakozás nélkül kapják meg a tananyagot.

### 3. Hitelesítés és Zárt Tananyagok (Identity & Access)
A publikus tananyagokhoz semmilyen szerveroldali logika nem kell.
Ha egy oktató zárt vizsgasorokat vagy kutatási anyagokat szeretne megosztani:
- A platformba beépítésre kerül egy **Login with GitHub** gomb.
- A sikeres belépés után az `app.js` megkapja a diák OAuth tokenjét.
- Ezt a tokent csatolja a GitHub felé menő kérésekhez (Fetch Headers).
- Eredmény: A rendszer képes privát repókat is megjeleníteni, de a jogosultságkezelést továbbra is 100%-ban a GitHub végzi. Csak az látja az anyagot a Git-Docs-ban, akit a tanár a GitHubon is hozzáadott a repóhoz.

## Előnyök Összegzése
- **Nincs vendor lock-in:** Nem függünk fizetős SaaS platformoktól (mint a GitBook). A tananyag örökre a miénk marad, nyers Markdown formában.
- **Költséghatékony:** Ingyenesen üzemeltethető (GitHub Pages + Cloudflare).
- **Edukációs fókusz:** Maga az eszköz is a webprogramozás és a modern felhő-architektúrák kiváló esettanulmánya.
