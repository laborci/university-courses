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

## Föderált Konfiguráció és Egységes Schema (A "Lego" rendszer)

Nincs külön "mappa" definíció és "site" definíció. **Minden csomópont (Node) egy és ugyanaz.** A teljes rendszer egyetlen, végtelenül egyszerű YAML sémára épül. 

### Egyszerűsített URI Szintaxis
A hivatkozásokhoz egy letisztult, csomagkezelő-szerű szintaxist használunk:
**Formátum:** `repo@oktato:branch/eleresi/ut` (vagy egyszerűen `./relativ-utvonal`)

### Konfigurációs Példa (config.yml)
Minden szinten (legyen az a főoldal vagy egy almappa) így néz ki a konfiguráció:

```yaml
title: "PTE MIK Informatikai Kurzusok"
items:
  - title: "Üdvözlünk"
    icon: "home"
    loc: ./welcome.md
    
  - title: "Webprogramozás 1"
    icon: "code"
    site: university-courses@laborci:main/web-programming-1/hu
      
  - title: "Adatbázisok"
    icon: "database"
    site: db-course@kovacs:main/
```

### Hivatkozások: `loc` vs. `site`
A rendszer lelke az, hogyan hivatkozunk tartalmakra. Kétféle paramétert használhatunk a menüpontoknál:

1. **`loc` (Location - Helybeni tartalom):** 
   - Ha egy fájlra mutat (pl. `./README.md`), akkor a dokumentum betöltődik a tartalom területre.
   - Ha egy mappára mutat, akkor az a mappa almenüként nyílik le a **jelenlegi** oldalsávban.
2. **`site` (Környezetváltás):**
   - Ha a hivatkozás `site: ...`, az azt jelenti, hogy egy teljesen új, önálló al-oldalra (pl. egy kurzusra) lépünk.
   - **Működés:** Ekkor a bal oldali navigáció (Sidebar) teljesen "lecserélődik" az új site saját menüjére. 
   - **Breadcrumbs:** A felső sávban (Breadcrumbs / Morzsamenü) viszont megmaradnak az előző site-ok (pl. *PTE MIK > Webprogramozás 1*). Így a kurzus egy önálló, tiszta site lesz a hallgató számára, de bármikor egy kattintással visszaugorhat a fő portálra.

## Markdown Frontmatter Képességek és a "Pointer" Fájlok
Annak érdekében, hogy a fájlok önmagukban is hordozzanak metaadatokat, minden Markdown fájl tetején YAML Frontmatter-t használhatunk. 

**Fontos architekturális korlát:** Mivel az alkalmazás 100%-ban kliensoldali és "Lazy Load" módon (csak kattintáskor) tölti be a fájlokat, a keretrendszer nem tudhatja előre, hogy egy adott fájlban milyen Tagek vannak, amíg le nem töltötte. A GitHub Raw API-n ráadásul nem is lehet "mappa tartalmat listázni".

**Hogyan használható mégis a Frontmatter? (A Generátor koncepció)**
A szerzőknek valójában **soha nem kell kézzel írniuk a `config.yml`-t**. A repóban fut egy generátor szkript (pl. GitHub Action), ami:
1. Beolvassa a fájlokat és a mappákat.
2. **Sorrendezés (Order helyett):** A fájlnevek alapján automatikusan sorba rendezi a menüt (pl. `01-bevezeto.md`, `02-halado.md`). Maga a fájlnév úgysem jelenik meg sehol a felhasználónak, így az `order` paraméterre nincs is szükség!
3. Kinyeri a Frontmatterből a címeket, ikonokat és tageket.
4. Ezekből a metaadatokból összeállítja és elmenti a `config.yml`-t, amit majd a SvelteKit olvas be.

### A "Pointer" Markdown fájlok (Linkelés tartalom nélkül)
Ha egy külső kurzust (site) vagy fájlt (loc) akarunk beemelni a menünkbe, nem kell a `config.yml`-t piszkálnunk. Egyszerűen létrehozunk egy üres Markdown fájlt (pl. `03-adatbazis-alapok.md`), amiben **nincs tartalom, csak Frontmatter**:

```yaml
---
title: "Adatbázis Alapok (Kovács)"
icon: "database"
site: db-course@kovacs:main/
---
```
Amikor a generátor szkript ezen végigfut, látja, hogy ez nem egy valódi dokumentum, hanem egy "mutató" (Pointer). Így a generált `config.yml`-be egy `site` vagy `loc` hivatkozásként fog bekerülni, a SvelteKit pedig már a külső repó felé fogja irányítani a felhasználót.

**Példa normál fájl Frontmatterre:**

```yaml
---
title: "A Web Architektúrája"
icon: "globe"
hidden: false # Rejtett-e az oldalsávban
tags: [web, http, kliens-szerver] # A keresőhöz
---
# Ide jön maga a tartalom...
```

### Interaktív elemek (Quizek, Videók)
A dokumentumok megjelenítését (Layout) nem a Frontmatterből vezéreljük. A Markdown önmagában tartalmazza a logikát kódblokkok (Codeblocks) formájában. 

A SvelteKit parser egyedi Markdown blokkokat ismer fel, például egy kvízt így írhatunk meg magában a Markdown fájlban:
```markdown
```quiz
question: "Mi a HTTP?"
options:
  - "Protokoll"
  - "Szerver"
answer: 0
```
Ezt a SvelteKit automatikusan egy interaktív, kattintható Kvíz komponenssé alakítja a szöveg közepén! Ugyanígy beágyazhatunk YouTube videókat vagy interaktív ábrákat is, megőrizve a Markdown hordozhatóságát.
