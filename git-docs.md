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

## Föderált Konfiguráció és Fájl-szintű Hivatkozások (A "Lego" rendszer)

Ahelyett, hogy egyetlen gigantikus központi konfigurációs fájlt használnánk, a rendszer teljesen decentralizált: **minden mappának lehet egy saját `config.yml` fájlja**. A menüfa rekurzívan épül fel úgy, hogy a konfigurációk egymásba ágyazzák magukat. 

### Egyszerűsített URI Szintaxis
A hivatkozásokhoz egy letisztult, "csomagkezelő-szerű" szintaxist használunk a hosszú, bőbeszédű JSON objektumok helyett:

**Formátum:** `repo@oktato:branch/eleresi/ut`

- **Helyi (local) fájl hivatkozás:** `./bevezeto.md`
- **Helyi (local) mappa (al-kurzus):** `./masik-mappa` (ilyenkor a rendszer automatikusan a `./masik-mappa/config.yml`-t keresi)
- **Távoli (remote) Markdown fájl:** `university-courses@laborci:main/web-programming-1/README.md`
- **Távoli (remote) Mappa (teljes Space beemelése):** `js-masterclass@mas-oktato:master/chapters` (automatikusan a `config.yml`-t húzza be)

### Konfigurációs Példa (YAML)
Íme egy példa, hogyan néz ki egy letisztult `config.yml` fájl:

```yaml
title: "Webprogramozás 1"
items:
  - title: "Általános Tudnivalók"
    loc: ./README.md
    
  - title: "Követelményrendszer"
    loc: ./kovetelmenyek.md
      
  - title: "1-3. Hét: Web Alapok (Laborci)"
    loc: university-courses@laborci:main/web-programming-1/hu/01-what-is-the-web
      
  - title: "4-6. Hét: Haladó JavaScript"
    loc: js-masterclass@mas-oktato:master/04-advanced-js
```

### A hivatkozások (loc) működése:
A feldolgozó (parser) a `loc` paraméter végződéséből okosan kitalálja, mit kell tennie:
1. **Dokumentum:** Ha a `loc` egy `.md` fájlra végződik (pl. `./README.md`), akkor azt egyszerű tartalomként jeleníti meg.
2. **Almenü / Space:** Ha a `loc` egy mappára mutat (nincs kiterjesztése, pl. `./folder` vagy egy távoli mappa), akkor a rendszer tudja, hogy ez egy almenü. Ekkor letölti az adott mappában lévő `config.yml`-t, és annak a tartalmát (a benne lévő `items` listát) rekurzívan beilleszti a jelenlegi menüfa alá.

## A Site Definíciója (site.yml)
Az eddigiek egy adott *Space* (mappa/kurzus) felépítését írták le. De mi történik, ha valaki csak megnyitja a gyökér URL-t, például a `git-docs.pte.hu`-t?
Erre szolgál a **Site Definíció** (pl. egy globális `site.yml`), amely magát a portált írja le. Ez tartalmazza a globális navigációt és a kiemelt kurzusok katalógusát.

```yaml
name: "PTE MIK Informatikai Kurzusok"
logo: "https://ttk.pte.hu/logo.png"

# A főoldal, amit betöltünk, ha valaki megnyitja a gyökér URL-t
home: 
  loc: pte-mik-docs@admin:main/welcome.md

# A felső globális navigációs sáv (Top Navbar)
navigation:
  - title: "Oktatás (BSc)"
    items:
      - title: "Webprogramozás 1 (Nappali)"
        loc: university-courses@laborci:main/web-programming-1/hu
      - title: "Adatbázisok"
        loc: db-course@kovacs:main/
        
  - title: "Kutatás & Projektek"
    items:
      - title: "Atom-Forge EU Dokumentáció"
        loc: atom-forge-docs@laborci:main/
```

**Hogyan működik?**
A SvelteKit app elindulásakor letölti a globális `site.yml`-t (amit pl. egy központi intézményi repóban tárolunk). Ez felépíti a portál arculatát és a felső navigációs menüt.
Amikor a hallgató rákattint a "Webprogramozás 1" menüpontra, a rendszer átvált a kurzus nézetre, és elkezdi letölteni az előzőekben tárgyalt mappa szintű `config.yml`-t az adott repóból, felépítve az oldalsávot.

## Markdown Frontmatter Képességek (A Lazy-Load probléma)
Annak érdekében, hogy a fájlok önmagukban is hordozzanak metaadatokat, minden Markdown fájl tetején YAML Frontmatter-t használhatunk. 

**Fontos architekturális korlát:** Mivel az alkalmazás 100%-ban kliensoldali és "Lazy Load" módon (csak kattintáskor) tölti be a fájlokat, a keretrendszer nem tudhatja előre, hogy egy adott fájlban milyen Tagek vannak, amíg le nem töltötte. A GitHub Raw API-n ráadásul nem is lehet "mappa tartalmat listázni".

**Hogyan használható mégis a Frontmatter?**

Kétféleképpen:
1. **Generátor szkripttel (A fa építése):** A Frontmatter elsősorban arra jó, hogy a repóban fusson egy generátor szkript (akár helyileg, akár GitHub Action formájában), ami a pusholáskor végigolvassa a fájlok metaadatait (cím, sorrend, tagek), és ezek alapján **automatikusan legenerálja és frissíti a `config.yml` indexet**. A frontend már csak ezt a kész `config.yml`-t olvassa be (amiben a tagek bekerültek a JSON/YAML fába globális kereséshez).
2. **Futásidejű renderelés (Layout):** Amikor egy fájlt letölt a kliens, a benne lévő metaadatokat fel tudja használni a megjelenítés módosítására.

**Példa Frontmatter:**

```yaml
---
title: "A Web Architektúrája"
order: 1 # A generátor szkript ez alapján rakja sorba a config.yml-ben
author: "Dr. Laborci"
layout: "presentation" # SvelteKit UI instrukció: ezt ne cikként, hanem diavetítésként rendereld!
tags: [web, http, kliens-szerver] # A generátor szkript kigyűjti a config.yml-be a keresőhöz
---
# Ide jön maga a tartalom...
```

**Mi az a Layout?**
A `layout` nem a menü felépítését, hanem a **megjelenítést** befolyásolja a betöltés *után*. Ha a SvelteKit beolvas egy letöltött fájlt és látja, hogy `layout: presentation`, akkor nem a hagyományos "olvasó" komponensbe tölti a szöveget, hanem elindít egy interaktív diavetítő (Slider) komponenst. Ugyanígy lehet `layout: quiz` vagy `layout: video`.
