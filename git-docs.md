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

## Technológiai Stack
A végleges keretrendszer a következő modern alapokra épül:
- **Keretrendszer:** Static SvelteKit (SSG) az ultragyors működés és a kiváló fejlesztői élmény érdekében.
- **UI Könyvtár:** `atom-forge/ui`, amely biztosítja a prémium, konzisztens megjelenést és a kész, akadálymentes komponenseket.
- **Adatforrás:** Közvetlen kliensoldali hívások a GitHub Raw API felé (szükség esetén Edge gyorsítótárazással).

## Konfigurációs Példa (config.json)

A föderált (több repón átívelő) rendszer kulcsa egy olyan `config.json`, amely képes megkülönböztetni a lokális fájlokat a távoli (external) hivatkozásoktól, sőt, akár teljes külső kurzusokat is képes beágyazni. 

Íme egy példa, hogyan nézhet ki egy tanszéki központi kurzus (pl. `pte-mik/tanev-2026`) konfigurációja:

```json
{
  "name": "Webprogramozás 1 (2026)",
  "defaultLanguage": "hu",
  "languages": ["hu", "en"],
  
  "sidebar": {
    "hu": [
      {
        "title": "Általános Tudnivalók",
        "type": "local",
        "files": [
          { "title": "Bevezető", "path": "hu/README.md" },
          { "title": "Követelmények", "path": "hu/kovetelmenyek.md" }
        ]
      },
      {
        "title": "1-3. Hét: Web Alapok (Laborci)",
        "type": "external-markdown",
        "repo": "laborci/university-courses",
        "branch": "main",
        "files": [
          { "title": "Mi az a Web?", "path": "web-programming-1/hu/01-what-is-the-web/README.md" },
          { "title": "Kliens-Szerver", "path": "web-programming-1/hu/01-what-is-the-web/05-client-server-and-multitier.md" }
        ]
      },
      {
        "title": "4-6. Hét: Haladó JavaScript",
        "type": "external-space",
        "repo": "mas-oktato/js-masterclass",
        "branch": "master",
        "configPath": "config.json",
        "description": "Beágyazza a másik oktató teljes kurzusának struktúráját ide a menübe."
      }
    ]
  }
}
```

### A hivatkozások működése:
1. **`type: "local"`**: A szokásos betöltés. A rendszer a jelenlegi repó `hu/README.md` fájlját tölti be.
2. **`type: "external-markdown"`**: A SvelteKit app felismeri, hogy külső repóról van szó, és a kérést dinamikusan a `https://raw.githubusercontent.com/laborci/university-courses/main/web-programming-1/hu/...` címre irányítja.
3. **`type: "external-space"`**: Ez az igazi varázslat! A kliens letölti a `mas-oktato/js-masterclass` repóból a megadott `config.json`-t, kiparserolja belőle a menüpontokat, és egy fa-struktúrában beilleszti a jelenlegi oldalsávba. A felhasználó észre sem veszi, hogy épp egy teljesen másik repó struktúrájában navigál.
