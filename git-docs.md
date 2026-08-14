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
Íme egy példa, hogyan néz ki egy `config.yml` fájl, ami nagyon könnyen olvasható és karbantartható:

```yaml
name: "Webprogramozás 1 (2026)"

sidebar:
  - title: "Általános Tudnivalók"
    items:
      - ./README.md
      - ./kovetelmenyek.md
      
  - title: "1-3. Hét: Web Alapok (Laborci)"
    items:
      # Külső fájlok egyenkénti beemelése
      - university-courses@laborci:main/web-programming-1/hu/01-what-is-the-web/README.md
      - university-courses@laborci:main/web-programming-1/hu/01-what-is-the-web/05-client-server-and-multitier.md
      
  - title: "4-6. Hét: Haladó JavaScript"
    # Egy teljes külső kurzus-mappa (és annak saját config.yml-jének) beemelése
    items:
      - js-masterclass@mas-oktato:master/04-advanced-js
```

## Markdown Frontmatter Képességek
Annak érdekében, hogy a fájlok önmagukban is hordozzanak metaadatokat (és ne mindent a `config.yml`-ben kelljen definiálni), minden Markdown fájl tetején YAML Frontmatter-t használunk. 

**Lehetséges Frontmatter mezők:**

```yaml
---
title: "A Web Architektúrája"
short_title: "Web Architektúra" # Ha a menüben rövidebben akarjuk kiírni
order: 1 # Automatikus rendezéshez, ha a config.yml nem explicit listáz
author: "Dr. Laborci"
date: "2026-08-15"
layout: "video" # SvelteKit UI: cikk, videó-kártya, interaktív kvíz, stb.
hidden: false # Rejtett-e az oldalsávban (pl. segédletek)
tags: [web, http, kliens-szerver] # Globális kereséshez és szűréshez
---
# Ide jön maga a tartalom...
```

Ezek az adatok beolvasásra kerülnek a SvelteKit alkalmazásban, így automatikusan legenerálható az oldal címe, egy "Szerző" blokk, az utolsó frissítés dátuma, vagy a tartalomhoz kapcsolódó vizuális elrendezés (pl. videós template, ha a `layout: video`).
