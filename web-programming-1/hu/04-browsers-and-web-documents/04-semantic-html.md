# Szemantikus HTML

A HTML elsődleges feladata nem az, hogy a képernyőn dobozokat rajzoljon, hanem hogy elmondja, mit jelentenek azok a dobozok. Ha a dokumentum szerkezete jelentést hordoz, akkor a tartalom többféle eszközön, többféle felhasználó számára és a CSS esetleges hiányában is értelmezhető marad.

### Mit jelent az, hogy szemantikus?

A „szemantikus” szó jelentésközvetítést jelent. Egy HTML-elem szemantikus, ha a neve vagy a szabványban meghatározott szerepe elárul valamit arról, milyen tartalmat foglal magába. A `p` bekezdést jelöl, a `button` egy végrehajtható művelet vezérlője, a `nav` navigációs hivatkozások csoportja. Ezzel szemben a `div` és a `span` általános, semleges tárolóelemek: önmagukban nem mondják meg, hogy bennük cím, menü, cikk vagy figyelmeztetés található-e.

A semleges elemeknek van helyük. Hasznosak lehetnek egy elrendezési csoporthoz, CSS-horgonyként vagy JavaScript által kezelt kisebb részhez. A probléma ott kezdődik, amikor egy teljes oldalt kizárólag `div`-ekből építenek, majd az elemek neve helyett csak osztálynevekből próbáljuk kitalálni a jelentésüket: `div class="top"`, `div class="menu"`, `div class="content"`. Ez a látványt esetleg jól kiszolgálja, de a böngésző, a képernyőolvasó és a kereső nem kap ugyanilyen világos információt.

Képzeljünk el két híroldalt. Mindkettőn ugyanaz a cím, szöveg és kép látható. Az egyik kódjában a hír egy `article`, a cím `h1`, a dátum `time`, a kapcsolódó hivatkozások pedig `nav` elemben vannak. A másik oldalon minden egyforma `div`. Látó egérhasználóként talán semmi különbséget nem veszünk észre. Egy képernyőolvasóval dolgozó ember azonban az első oldalon címsorok és régiók szerint gyorsan navigálhat; a másodikban sokkal több szöveget kell sorban végighallgatnia. A szerkezet tehát felhasználói funkció, nem csak fejlesztői ízlés kérdése.

### A dokumentum fő régiói

A modern HTML számos úgynevezett szakaszoló és régiójelölő elemet ad. Ezekkel az oldal térképe írható le.

A `header` egy bevezető tartomány. Gyakran ide kerül a webhely neve vagy logója, egy oldal címe, keresőmező, esetleg a fő navigáció. Nem kizárólag a dokumentum tetején fordulhat elő: egy `article` saját `header` része tartalmazhatja például a cikk címét, szerzőjét és publikálási dátumát is. A `header` tehát nem egyszerűen „felső sáv”, hanem egy tartalmi egység bevezetése.

A `nav` olyan hivatkozások nagyobb csoportja, amely elsődlegesen navigációra szolgál. A főmenü tipikus példa, de lehet `nav` a cikken belüli tartalomjegyzék vagy az oldal alján elhelyezett fontos oldalak listája is. Nem minden egyes hivatkozást kell `nav`-ba tenni. Egy bekezdésben szereplő forráshivatkozás vagy egy cikkhez kapcsolt egyetlen link nem feltétlenül navigációs régió. Az a kérdés, hogy a linkek együtt a felhasználó tájékozódását szolgáló, elkülöníthető egységet alkotnak-e.

A `main` a dokumentum egyedi, központi tartalma. Egy oldalon általában pontosan egy van belőle. Nem ide kerül a minden oldalon ismétlődő fejléc, menü vagy lábléc, hanem az, amiért a felhasználó az adott URL-t megnyitotta: egy cikk, egy termék részletei, egy űrlap vagy egy kurzus leírása. Ez különösen hasznos a „Ugrás a fő tartalomra” hivatkozások számára: billentyűzettel vagy képernyőolvasóval használva nem kell minden oldalnyitáskor újra végigmenni a hosszú menün.

Az `article` önállóan is értelmezhető, önmagában terjeszthető tartalmi egység. Ilyen egy hírcikk, fórumhozzászólás, blogbejegyzés, termékértékelés vagy komment. Jó gondolati próba: ha ezt a részt kimásolnánk egy RSS-olvasóba, e-mailbe vagy más oldalra, továbbra is lenne saját értelme? Ha igen, valószínűleg `article`.

A `section` a dokumentum tematikus része. Akkor indokolt, ha a résznek van saját tárgya, többnyire saját címe is. Egy cikkben például lehet külön `section` a „Követelmények”, „Határidők” és „Gyakori kérdések” számára. Nem helyettesíti automatikusan a `div`-et: pusztán azért, mert CSS-sel csoportosítani szeretnénk két elemet, nem kell `section`-t használni. Ha nincs tartalmi oka a határvonalnak, a semleges tároló őszintébb választás.

Az `aside` kapcsolódó, de nem a fő gondolatmenethez tartozó tartalmat jelöl. Ilyen lehet egy definíciós doboz, kapcsolódó cikkek listája, szerzői bemutatkozás, reklám vagy egy hosszabb szöveg kiegészítő megjegyzése. Az `aside` tartalmának elhagyása mellett a fő anyagnak továbbra is koherensnek kell maradnia.

A `footer` egy oldal, szakasz vagy cikk lezáró információit tartalmazza. Egy webhelyszintű `footer`-ben gyakori a szerzői jogi információ, kapcsolat, adatkezelési tájékoztató és másodlagos navigáció. Egy `article` saját láblécében helyet kaphatnak a címkék, szerzői adatok vagy megosztási hivatkozások. A `footer` sem kizárólag a képernyő legalján értelmezhető: a kérdés itt is a szerep, nem a pixelpozíció.

### Címhierarchia: a dokumentum vázlata

A címsorok (`h1`–`h6`) nem betűméret-választók, hanem a tartalom hierarchiáját jelölik. A `h1` a dokumentum főcíme; jellemzően ez fejezi ki a megnyitott oldal legfontosabb témáját. A `h2` a fő részek címe, a `h3` az azon belüli alcím, és így tovább. Egy jól felépített oldal címei olyanok, mint egy jól megírt jegyzet tartalomjegyzéke: már csak a címlistát elolvasva is látszik a gondolatmenet.

Például egy „Webprogramozás I. követelmények” oldalon a `h1` maga az oldal címe. A „Teljesítés feltételei” és „Ajánlott irodalom” lehet `h2`. A „Házi feladatok” a teljesítés feltételein belül `h3`. Hibás gyakorlat lenne a látvány kedvéért kihagyni szinteket (`h1` után rögtön `h4`), vagy minden címet `h2`-nek jelölni, majd CSS-sel különböző méretűre állítani.

A címsorok nemcsak SEO-szempontból fontosak. Sok képernyőolvasó lehetővé teszi, hogy a felhasználó kizárólag címsorokra ugrálva bejárja az oldalt. Egy hosszú egyetemi szabályzatnál ez olyan, mintha az olvasó egy kattintással a tartalomjegyzékben mozoghatna. Ha a „címek” valójában félkövér bekezdések, ez a navigációs lehetőség eltűnik.

### Szemantika, képernyőolvasók és SEO

A képernyőolvasó a dokumentum programozott szerkezetét közvetíti beszéddel vagy Braille-kijelzőn. A felhasználó listázhatja a hivatkozásokat, az űrlapmezőket, a gombokat és a címsorokat, vagy gyorsbillentyűkkel ugorhat a fő tartalomra. A natív HTML-elemek eleve hordoznak ilyen információt: a `button` gombként, az `a` hivatkozásként, a `nav` navigációs régióként jelenik meg az akadálymentességi fában. Ha mindent `div`-vel imitálunk, ezt a jelentést külön, gyakran hiányosan kellene visszaépíteni ARIA-attribútumokkal és billentyűzetes viselkedéssel.

Az ARIA hasznos kiegészítő eszköztár, de nem az első választás. Egy valódi gomb helyett például a `<div role="button">Mentés</div>` megoldás csak akkor közelíti a `button` működését, ha külön gondoskodunk fókuszról, Enter és Space billentyűről, letiltott állapotról és sok más részletről. A `<button>Mentés</button>` ezeket a böngésző támogatásával alapból biztosítja. Jó gyakorlati szabály: először válasszunk megfelelő HTML-elemet; ARIA-val csak akkor egészítsük ki, ha a natív szemantika valóban nem elég.

A keresőmotorok is a szerkezetből próbálnak következtetni arra, mi az oldal tárgya és mely részei fontosak. A pontos cím, a logikus címsorok, a cikk tartalmának elkülönítése, valamint a leíró hivatkozásszöveg segítheti az értelmezést. Ez nem garantál jó találati helyezést: a SEO sok más tényezőtől is függ, például a tartalom minőségétől, a technikai elérhetőségtől és a webhely hitelességétől. A szemantikus HTML azonban olyan alap, amelyre a kereshetőség és az akadálymentesség egyaránt építhet.

## Végigvezetett példa: egy kurzushír felépítése

Tegyük fel, hogy a tanszéki honlapon megjelenik egy hír: megnyílt a jelentkezés egy szakmai workshopra. A következő szerkezet nem egy látványterv, hanem a tartalom jelentését rögzíti:

```html
<header>
  <a href="/">Informatikai Tanszék</a>
  <nav aria-label="Fő navigáció">
    <a href="/kurzusok">Kurzusok</a>
    <a href="/hirek">Hírek</a>
  </nav>
</header>

<main>
  <article>
    <header>
      <h1>Jelentkezés a webes akadálymentességi workshopra</h1>
      <p>Megjelent: <time datetime="2026-09-15">2026. szeptember 15.</time></p>
    </header>

    <section>
      <h2>Kinek szól a workshop?</h2>
      <p>A program minden informatikus hallgató számára nyitott.</p>
    </section>

    <section>
      <h2>Jelentkezés</h2>
      <p>A helyek száma korlátozott, ezért érdemes időben jelentkezni.</p>
    </section>

    <aside>
      <h2>Kapcsolódó anyag</h2>
      <p><a href="/akadalymentesseg">Akadálymentességi alapfogalmak</a></p>
    </aside>

    <footer>
      <p>Szerző: Webes munkacsoport</p>
    </footer>
  </article>
</main>

<footer>
  <a href="/adatkezeles">Adatkezelési tájékoztató</a>
</footer>
```

Az oldalnak van webhelyszintű fejléce, azon belül navigáció. A `main` jelzi az egyedi tartalom kezdetét. Maga a hír önálló egység, ezért `article`. A cikken belüli két téma `section`, mert saját címmel rendelkező tartalmi részek. A kapcsolódó anyag hasznos, de kihagyható anélkül, hogy a hír értelme sérülne, ezért `aside`. Végül külön `footer` zárja a cikket és az egész oldalt.

Érdemes észrevenni, hogy ugyanazon az oldalon két `header` és két `footer` is szerepelhet. Ez nem hiba: más-más tartalmi egységhez tartoznak. Az `aria-label` pedig azért jelenik meg a `nav`-on, hogy ha az oldalon később több navigációs régió lenne, a képernyőolvasó egyértelműen meg tudja nevezni ezt a főmenüként.

## Gyakori félreértések

| Állítás | Pontosítás |
| --- | --- |
| „A `div` rossz elem.” | Nem rossz, hanem általános. Akkor használjuk, amikor nincs pontosabb szemantikus elem. |
| „A `section` minden doboz helyett használható.” | Csak valódi, tematikusan elkülönülő szakaszhoz indokolt, többnyire címmel. |
| „A `header` csak az oldal legtetején lehet.” | Egy `article` vagy `section` saját bevezetője is lehet `header`. |
| „A címsor méretét a `h1`–`h6` választja meg.” | A szint jelentést jelöl; a méretet CSS-sel kell alakítani. |
| „Az ARIA szemantikusabbá tesz minden `div`-et.” | Sokszor jobb és megbízhatóbb a megfelelő natív HTML-elem használata. |
| „A szemantikus HTML önmagában garantálja a jó SEO-t.” | Segít az értelmezésben, de nem helyettesíti a minőségi tartalmat és a technikai alapokat. |

## Ellenőrző kérdések

1. Milyen szempont alapján dönthető el, hogy egy tartalom `article` vagy inkább `section`?
2. Miért nem célszerű csak a betűméret miatt `h3`-at választani egy fő fejezet címéhez?
3. Melyik három elemet használná egy oldal fő navigációjának, egyedi tartalmának és globális láblécének jelölésére?
4. Miért előnyösebb általában a `button`, mint egy `div role="button"`?
5. Hogyan segít a szemantikus szerkezet egy képernyőolvasót használó hallgatónak egy hosszú kurzusoldalon?

## Fogalomtár

- **Szemantikus HTML:** olyan jelölés, amely az elem megjelenése mellett vagy helyett annak jelentését és szerepét írja le.
- **Régió (landmark):** a dokumentum jól azonosítható funkcionális területe, például navigáció vagy fő tartalom.
- **`main`:** az oldal egyedi, központi tartalma.
- **`article`:** önállóan is értelmezhető tartalmi egység, például cikk vagy hozzászólás.
- **`section`:** tematikusan összetartozó, jellemzően címmel rendelkező dokumentumrész.
- **`aside`:** a fő tartalomhoz kapcsolódó, de attól elkülönülő kiegészítő anyag.
- **Címhierarchia:** a `h1`–`h6` elemekkel jelölt logikai fejezetszerkezet.
- **Képernyőolvasó:** olyan segítő technológia, amely a digitális felület szerkezetét beszéddel vagy Braille-kijelzőn közvetíti.
- **ARIA:** akadálymentességi szerepek és tulajdonságok rendszere, amely szükség esetén kiegészíti a HTML szemantikáját.
