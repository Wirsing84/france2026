(() => {
  const $ = (selector) => document.querySelector(selector);
  const params = new URLSearchParams(location.search);
  const type = params.get('type');
  const id = params.get('id');
  if (!type || !$('#detailRoot')) return;

  const maps = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const rec = (name, city, rating, query, tag, general, fits, specific, source) => ({ name, city, rating, query, tag, general, fits, specific, source });

  const clusters = {
    tours: [
      rec('La Petite Embarque / Guinguette de Tours', 'Tours', 'Google 4.1', 'La Petite Embarque Guinguette Tours', 'Draußen · Loire · casual', 'Sommerlicher Loire-Ort statt Restaurantabend mit steifer Erwartung.', 'Ankunftsabend, Loire-Spaziergang, Guinguette-Abend oder nach kurzem Stadt-/Markttag.', 'Für euch gut, weil die Kinder nicht still am weißen Tisch sitzen müssen und ihr trotzdem Urlaubsgefühl habt.', 'Rating via RestaurantGuru/Google; saisonalen Betrieb vor Ort prüfen.'),
      rec('Crêperie Bilien', 'Tours', 'Google 4.9', 'Creperie Bilien Tours', 'Crêpes/Galettes · einfach', 'Crêperie ist mit Kindern fast immer dankbar: salzig, süß, schnell verständlich.', 'Nach Markt/Altstadt oder als unkompliziertes Abendessen, wenn keiner mehr lange wählen will.', 'Für euch deutlich passender als Bistronomie: vegetarische Galettes möglich, Kinder finden sicher etwas.', 'Rating/Status via RestaurantGuru und Petit Futé, Stand 07/2026.'),
      rec('Le Chalet – Crêperie à Tours', 'Tours', 'Google 4.9', 'Le Chalet Creperie Tours', 'Crêpes/Galettes · casual', 'Sehr gut bewertete Crêperie; niedriger Entscheidungsstress, meist kinderkompatibel.', 'Passt nach einem Loire-/Vouvray-Tag oder wenn die Guinguette wetterbedingt nicht klappt.', 'Für euch gut als bezahlbare, französische, aber nicht feierliche Option.', 'Rating/Status via RestaurantGuru, Stand 07/2026.'),
      rec('Le Comptoir de Mamie Bigoude Tours Centre', 'Tours', 'Google 4.4', 'Le Comptoir de Mamie Bigoude Tours Centre', 'Crêperie · Kinderfreundlich', 'Konzept-Crêperie mit spielerischem Ambiente; nicht fein, sondern praktisch.', 'Passt, wenn Kinder eine klare, einfache Essensoption brauchen.', 'Für euch sinnvoll als Notfallanker: Galette, Crêpe, etwas Witz, weniger Restaurantdruck.', 'Status über Tripadvisor/RestaurantGuru auffindbar; vor Besuch Maps prüfen.'),
      rec('La Crêpe au Carré', 'Tours', 'Google 4.5', 'La Crepe Au Carre Tours', 'Crêpes · zentral', 'Zentrale Crêpe-/Galette-Option mit vielen Bewertungen und normalem Preisniveau.', 'Passt nach Altstadt, Markt oder als schneller Mittag statt langem Restaurant.', 'Für euch gut, weil es einfach, vorhersehbar und mit Kindern leichter ist als ein Bistro-Menü.', 'Rating/Status via RestaurantGuru, Stand 07/2026.')
    ],
    moliets: [
      rec('Pizza Entre Amis Moliets', 'Moliets-et-Maâ', 'Tripadvisor 5.0 · Google prüfen', 'Pizza Entre Amis Moliets', 'Pizza · Take-away', 'Pizza nach Strand/Surf ist die realistische Familienlösung.', 'Nach Plage Centrale, Surfkurs, Ankunftsabend oder müden Kindern.', 'Für euch sehr passend: bezahlbar, schnell, wenig Diskussion, im Zweifel mitnehmen.', 'Aktuelle Tripadvisor-Liste 2026; Google-Rating vor Besuch prüfen.'),
      rec('La Fabrique', 'Moliets-et-Maâ', 'Google 4.6', 'La Fabrique Moliets et Maa', 'Pizza/Burger · casual', 'Pizza und Burger passen zu Ferienabenden, an denen niemand lange still sitzen will.', 'Passt nach Strand, Kletterwald oder wenn ihr keine Lust auf Reservierung habt.', 'Für euch gut, weil Kinderessen und Erwachsenenessen nicht auseinanderfallen.', 'Rating/Status via RestaurantGuru und Tripadvisor 2026.'),
      rec('AmaZone Café', 'Moliets-et-Maâ', 'Google 4.7', 'AmaZone Cafe Moliets et Maa', 'Café · Pause', 'Café-/Snackanker im Ferienort, gut für kurze Pausen statt Abendprogramm.', 'Passt vormittags, nach kurzer Radrunde, bei müden Kindern oder als Eltern-Kaffeeanker.', 'Für euch gut, weil es nicht „Restaurant“ sein muss: Kaffee, Snack, kurz weiter.', 'Eigene Website + Tripadvisor/RestaurantGuru 2026.'),
      rec('Le Café de la Plage', 'Moliets-et-Maâ', 'Google 4.1', 'Le Cafe de la Plage Moliets', 'Strandnah · praktisch', 'Lage schlägt Perfektion: direkt im Strandkontext, gut für Getränke/Snack/frühes Essen.', 'Passt nach Plage Centrale, erstem Atlantiktag oder letztem Strandabend.', 'Für euch als einfache Option gut, wenn niemand noch fahren oder suchen will.', 'Offizielle Landes-Tourismusliste: geöffnet bis 31.08.2026; Rating via RestaurantGuru/Google.'),
      rec('Billy’s Pizzas Burger', 'Moliets-et-Maâ', 'Tripadvisor 4.5 · Google prüfen', 'Billys Pizzas Burger Moliets et Maa', 'Pizza/Burger · unkompliziert', 'Einfacher Pizza-/Burger-Kandidat für Tage, an denen Kochen oder Restaurant nicht passt.', 'Passt als schnelles Abendessen nach langem Strandtag oder Kletterwald.', 'Für euch als Sicherheitsanker sinnvoll: keine lange Karte, keine große Erwartung, Kinder finden wahrscheinlich etwas.', 'Aktuelle Tripadvisor-Liste 2026; Google-Status vor Besuch prüfen.')
    ],
    basque: [
      rec('Pacific Coast Café', 'Hossegor', 'Google 4.9', 'Pacific Coast Cafe Hossegor', 'Brunch · Surf-Vibe', 'Brunch-/Café-Stopp im Surf-Kontext, nicht feierlich.', 'Passt zum Hossegor-/Capbreton-Bummel, Surfshop-Runde oder Kaffeeausflug.', 'Für euch stark: guter Kaffee, unkomplizierter Brunch, Kinder können snacken.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('Volt Café Brûlerie', 'Hossegor', 'Google 4.6', 'Volt Cafe Brulerie Hossegor', 'Kaffee · kurz', 'Kaffee-Fokus, gut für Frühstück oder kurze Pause.', 'Passt, wenn du guten Kaffee willst und die Familie nur eine überschaubare Pause braucht.', 'Für euch sehr passend als Eltern-Kaffeeanker ohne ganzen Restaurantblock.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('BEURRÉ Crêperie, café & cave à vins', 'Hossegor', 'Google 4.7', 'BEURRE Creperie Cafe Hossegor', 'Crêpes · Café', 'Crêpes/Galettes holen Kinder ab und bleiben für Erwachsene trotzdem interessant.', 'Passt nach Hossegor-Bummel oder als süßes/salziges Zwischenziel.', 'Für euch gut, weil es französisch, aber niedrigschwellig ist.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('My Little Cafe', 'Bayonne', 'Google 4.7', 'My little cafe Bayonne France', 'Café · Stadtpause', 'Kleiner Café-Stopp statt langem Bayonne-Mittagessen.', 'Passt nach Markthalle/Altstadt, bevor die Stadtstimmung kippt.', 'Für euch als Pause besser als großer Restauranttermin.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('Gribouille Café', 'Bayonne', 'Google 4.5', 'Gribouille Cafe Bayonne', 'Café · Spiele/Reset', 'Café mit spielerischem Kontext; gut, wenn Kinder in der Stadt eine Pause brauchen.', 'Passt bei Regen, Müdigkeit oder wenn Bayonne länger wird als geplant.', 'Für euch sehr passend, weil es die Kinderperspektive ernst nimmt.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.')
    ],
    provence: [
      rec('Maison Nosh', 'Aix-en-Provence', 'Google 4.6', 'Maison Nosh Aix en Provence', 'Brunch · casual', 'Brunch/Hotdogs/Coffee-Shop statt klassisches französisches Mittagessen.', 'Passt zu Aix vormittags, Markt, Cours Mirabeau oder als unkomplizierter Mittagssnack.', 'Für euch stark: schnell verständlich, kindertauglicher als Bistro-Menüs, nicht zu schwer bei Hitze.', 'Rating/Status via RestaurantGuru + Website, Stand 07/2026.'),
      rec('MANA Aix', 'Aix-en-Provence', 'Google 4.7', 'MANA Aix en Provence', 'Café/Brunch · Kaffee', 'Sehr gut bewerteter Café-/Brunchanker in Aix.', 'Passt zu Aix locker, Stadtpause, Markt oder kurzer Eltern-Kaffee-Mission.', 'Für euch ideal: guter Kaffee für dich, einfache Brunch-/Snackauswahl für die Familie.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('Crêpes à Gogo', 'Aix-en-Provence', 'Google 4.4', 'Crepes a Gogo Aix en Provence', 'Crêpes · günstig/schnell', 'Schneller Crêpe-/Snackstopp, laut Reviews eher günstiger Bereich.', 'Passt als Belohnung nach Brunnen-/Gassenrunde oder wenn Mittagessen zu groß wäre.', 'Für euch gut, weil es Kinder motiviert und keinen langen Restaurantblock erzeugt.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('Little Italy by Fratelli IAQUINTA', 'Aix-en-Provence', 'Google 4.9', 'Little Italy By Fratelli IAQUINTA Aix en Provence', 'Italienisch · Pizza/Pasta', 'Italienisch ist im Familienurlaub oft der zuverlässigste Kompromiss.', 'Passt abends in Aix oder wenn französische Küche alle gerade nicht abholt.', 'Für euch sinnvoll wegen Pizza/Pasta und besserer vegetarischer Chancen.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('La Casa', 'Aix-en-Provence', 'Google 4.0', 'La Casa Aix en Provence restaurant pizzeria', 'Pizza/Burger · sehr casual', 'Keine Gourmetoption, sondern pragmatisch: Pizza, Burger, Kebab-ähnliche einfache Küche.', 'Passt, wenn ihr nach Pool/Aix keine Lust auf Reservierung oder feines Essen habt.', 'Für euch gut als ehrlicher Notnagel: bezahlbar, einfach, Kinder finden wahrscheinlich etwas.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.')
    ],
    coast: [
      rec('Loulou La Malice', 'La Ciotat', 'Google 4.5', 'Loulou La Malice La Ciotat', 'Casual · familienfreundlich', 'Locker und sommerlich, von Reisequellen als familienfreundlich beschrieben.', 'Passt zum La-Ciotat-Strandtag, Snack oder frühem Abendessen.', 'Für euch besser als Cassis-Hafenstress: einfach, kinderkompatibel, weniger formell.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('La Spiaggia', 'La Ciotat', 'Google 4.1', 'La Spiaggia La Ciotat', 'Pizza/italienisch · Strandnähe', 'Pizza/italienisch ist nach Strand der sicherste Familienmodus.', 'Passt nach La Ciotat, Strand, Promenade oder als Plan B nach Cassis.', 'Für euch gut, weil Pizza/Pasta die Kinder abholt und vegetarisch meist einfacher ist.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('Libane', 'La Ciotat', 'Google 4.9', 'Libane La Ciotat', 'Libanesisch · Mezze', 'Mezze/Libanesisch ist teilbar, oft leichter und vegetarisch freundlicher.', 'Passt nach Küstentag, wenn ihr nicht schon wieder Pizza/Bistro wollt.', 'Für euch gut wegen Hummus/Falafel/Mezze: flexibel, nicht schwer, kinderkompatibel testen.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('La Crique', 'La Ciotat', 'Google 4.3', 'La Crique La Ciotat', 'Pizza · Meer-Kontext', 'Pizza-Option in La Ciotat mit ordentlichem Rating.', 'Passt, wenn Strand und Abendessen nah beieinander bleiben sollen.', 'Für euch gut als pragmatischer Küstenanker statt Cassis-Reservierungsstress.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('Restaurant Plage Saint Jean', 'La Ciotat', 'Google 4.4', 'Restaurant Plage Saint Jean La Ciotat', 'Strandrestaurant · praktisch', 'Strand-/Meer-Kontext mit normaler Restaurantauswahl.', 'Passt, wenn ihr den Meer-Tag nicht durch Ortswechsel unterbrechen wollt.', 'Für euch sinnvoll, weil Lage und Einfachheit bei Kindern oft wichtiger sind als kulinarische Ambition.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.')
    ],
    luberon: [
      rec('Crêpes à Gogo', 'Aix-en-Provence', 'Google 4.4', 'Crepes a Gogo Aix en Provence', 'Crêpes · schnell', 'Guter Aix-Plan-B, wenn Luberon zu heiß oder zu weit wirkt.', 'Passt als Belohnung nach kurzer Aix-Runde oder statt Dorfhopping.', 'Für euch besser als ein langes Dorfrestaurant: schnell, günstig, kindertauglich.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('Maison Nosh', 'Aix-en-Provence', 'Google 4.6', 'Maison Nosh Aix en Provence', 'Brunch · Aix-Plan-B', 'Sicherer Brunch-/Snackanker in Aix.', 'Passt als Alternative zu Gordes/Roussillon: Aix + Brunch + Pool.', 'Für euch gut, weil weniger Fahrzeit und kindertauglicher als volle Dörfer.', 'Rating/Status via RestaurantGuru + Website, Stand 07/2026.'),
      rec('MANA Aix', 'Aix-en-Provence', 'Google 4.7', 'MANA Aix en Provence', 'Café · Kaffee', 'Starker Kaffee-/Brunchanker in Aix.', 'Passt als kurzer Stadtstopp vor oder statt Luberon.', 'Für euch geeignet, wenn Erwachsene Kaffee wollen und Kinder etwas Einfaches brauchen.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('Roussillon: vor Ort Café suchen', 'Roussillon', 'Google live prüfen', 'cafe family Roussillon Luberon', 'In kleinen Dörfern zählen Nähe, Schatten und freie Plätze mehr als eine perfekte Vorabwahl.', 'Passt direkt zum Dorfbesuch, wenn ihr wirklich fahrt.', 'Für euch wichtig: Nähe zum Parkplatz, Schatten und schnelle Bedienung schlagen Sternezahl.', 'Bewusst keine einzelne Zahl, weil der konkrete Tagesort offen ist.'),
      rec('Gordes: vor Ort Snack/Glacier suchen', 'Gordes', 'Google live prüfen', 'glacier cafe family Gordes', 'Für Gordes lieber tagesaktuell nach offenem Café/Eis suchen statt eine riskante Vorabempfehlung zu setzen.', 'Passt als kurzer Belohnungsstopp, nicht als langes Mittagessen.', 'Für euch besser als ein teures Dorfrestaurant: Eis, Getränk, Schatten, weiter.', 'Bewusst keine einzelne Zahl, weil Verfügbarkeit stark saison-/tagesabhängig ist.')
    ],
    transit: [
      rec('Brasserie le Monge', 'Beaune', 'Google 4.2', 'Brasserie le Monge Beaune', 'Brasserie · zentral', 'Brasserie nahe Zentrum/Notre-Dame, mit Familienlunch-Erwähnung in Reviews.', 'Passt zu Beaune als pragmatischem Abendessen.', 'Für euch gut, weil Brasserie meist einfacher mit Kindern ist als Fine Dining.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('L’Aromatic', 'Langres', 'Google 4.5', 'L Aromatic Langres', 'Langres · Abendessen', 'Gut bewertete Langres-Option für den pragmatischen Schlafblock.', 'Passt, wenn ihr Langres statt Beaune/Dijon nehmt.', 'Für euch gut, weil nah am Übernachtungskonzept: essen, schlafen, weiter.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('Le Goût des autres', 'Langres', 'Google 4.4', 'Le Gout des autres Langres', 'Langres · Plan B', 'Weitere gut bewertete Option in Langres.', 'Passt als Plan B, falls L’Aromatic nicht passt.', 'Für euch sinnvoll, wenn ihr keine Experimente auf der Rückfahrt wollt.', 'Rating/Status via RestaurantGuru/Google, Stand 07/2026.'),
      rec('Les Fils à Maman Dijon', 'Dijon', 'Google live prüfen', 'Les Fils a Maman Dijon', 'Casual · kindertauglicher', 'Spielerisches Casual-Konzept, meistens besser mit Kindern als Weinbar/Fine Dining.', 'Passt, wenn der Zwischenstopp Dijon wird und ihr noch normal essen wollt.', 'Für euch passender als ein ambitioniertes Burgund-Restaurant nach langer Fahrt.', 'Google-Status vor Besuch prüfen; bewusst kein festes Rating ohne belastbare Quelle.'),
      rec('Dijon: Pizzeria nahe Hotel suchen', 'Dijon', 'Google live prüfen', 'pizzeria family near Dijon Sud hotel', 'Für Transit zählt Nähe zum Hotel mehr als die perfekte Adresse.', 'Passt, wenn ihr spät ankommt oder Kinder müde sind.', 'Für euch pragmatisch: Pizza/Pasta, kurze Wege, früh schlafen.', 'Bewusst als Live-Suche, weil Hotelstandort noch offen ist.')
    ]
  };

  const knownClosed = ['Zaz’Pizza', 'Zaz\'Pizza', 'Bistrot des Halles'];

  function contextKey() {
    const pageText = document.body.textContent.toLowerCase();
    if (type === 'day') {
      const day = Number(id);
      if ([0, 1, 2].includes(day)) return 'tours';
      if ([3, 4, 5, 6, 7, 9].includes(day)) return 'moliets';
      if (day === 8) return 'basque';
      if ([10, 11, 12, 14, 16].includes(day)) return 'provence';
      if (day === 13) return 'coast';
      if (day === 15) return 'luberon';
      if ([17, 18].includes(day)) return 'transit';
    }
    if (type === 'destination') {
      if (id === 'tours') return 'tours';
      if (id === 'moliets') return 'moliets';
      if (id === 'tholonet') return 'provence';
    }
    if (pageText.includes('bayonne') || pageText.includes('hossegor') || pageText.includes('capbreton') || pageText.includes('biarritz')) return 'basque';
    if (pageText.includes('cassis') || pageText.includes('ciotat') || pageText.includes('calanques') || pageText.includes('côte bleue')) return 'coast';
    if (pageText.includes('luberon') || pageText.includes('gordes') || pageText.includes('roussillon')) return 'luberon';
    if (pageText.includes('beaune') || pageText.includes('dijon') || pageText.includes('langres') || pageText.includes('zwischenstopp')) return 'transit';
    if (pageText.includes('moliets') || pageText.includes('plage') || pageText.includes('surf') || pageText.includes('courant')) return 'moliets';
    if (pageText.includes('aix') || pageText.includes('tholonet') || pageText.includes('sainte-victoire')) return 'provence';
    return 'tours';
  }

  function injectStyles() {
    if ($('#restaurantRecStyles')) return;
    const style = document.createElement('style');
    style.id = 'restaurantRecStyles';
    style.textContent = `
      .restaurant-recs{margin:34px 0 4px;padding:24px;border-radius:24px;border:1px solid rgba(23,32,42,.12);background:rgba(255,255,255,.72)}
      .restaurant-recs h2{font-size:clamp(1.6rem,3vw,2.4rem);margin:0 0 8px;font-family:"Playfair Display",Georgia,serif;letter-spacing:-.04em;line-height:1.04}
      .restaurant-recs-intro{color:#657286;max-width:820px;margin-bottom:18px}.restaurant-rec-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}.restaurant-card{display:flex;flex-direction:column;gap:10px;min-height:100%;padding:16px;border-radius:18px;background:rgba(255,255,255,.88);border:1px solid rgba(23,32,42,.10);box-shadow:0 8px 24px rgba(23,32,42,.08)}
      .restaurant-card h3{margin:0;font-size:1rem}.restaurant-tag{font-size:.74rem;font-weight:900;color:#7f5539}.restaurant-meta{display:flex;flex-wrap:wrap;gap:6px}.restaurant-rating,.restaurant-city{display:inline-flex;border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900}.restaurant-rating{background:rgba(246,189,96,.26);color:#7f5539}.restaurant-city{background:rgba(23,107,135,.10);color:#176b87}.restaurant-card p{font-size:.88rem;line-height:1.45;color:#657286;margin:0}.restaurant-card b{color:#17202a}.restaurant-card a{margin-top:auto;display:inline-flex;align-items:center;justify-content:center;min-height:36px;border-radius:999px;background:#17202a;color:white;font-size:.78rem;font-weight:900;padding:0 12px}.restaurant-source{margin:14px 0 0;font-size:.82rem;color:#657286}.restaurant-source strong{color:#17202a}
      @media(max-width:1100px){.restaurant-rec-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:620px){.restaurant-rec-grid{grid-template-columns:1fr}.restaurant-recs{padding:18px}}
    `;
    document.head.appendChild(style);
  }

  function cardMarkup(item) {
    return `<article class="restaurant-card"><div><h3>${item.name}</h3><div class="restaurant-tag">${item.tag}</div><div class="restaurant-meta"><span class="restaurant-rating">${item.rating}</span><span class="restaurant-city">${item.city}</span></div></div><p><b>Warum:</b> ${item.general}</p><p><b>Passt zu:</b> ${item.fits}</p><p><b>Für euch:</b> ${item.specific}</p><p class="restaurant-source"><b>Status:</b> ${item.source}</p><a href="${maps(item.query)}" target="_blank" rel="noopener">Google Maps öffnen ↗</a></article>`;
  }

  function cleanupVisibleText() {
    const rootEl = $('#detailRoot');
    if (!rootEl) return;
    const replacements = [
      ['Fahrtlogik', 'Fahrtplan'], ['Essenslogik', 'Essen'], ['Packlogik', 'Packen'], ['Strandlogik', 'Strandplan'],
      ['See-/Picknicklogik', 'See und Picknick'], ['Loire-à-Vélo-Logik', 'Loire-à-Vélo-Angebot'],
      ['Pizza-/Burger-Logik', 'Pizza/Burger'], ['Café-/Snacklogik', 'Café-/Snackpause'], ['Mezze-Logik', 'Mezze-Auswahl'], ['Brunch-Logik', 'Brunch']
    ];
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      let text = node.nodeValue;
      replacements.forEach(([from, to]) => { text = text.split(from).join(to); });
      text = text.replace(/\b([A-Za-zÀ-ÿÄÖÜäöüß-]+)logik\b/g, '$1plan');
      text = text.replace(/\bLogik\b/g, 'Plan');
      node.nodeValue = text;
    });
  }

  function inject() {
    if ($('#restaurantRecs')) return;
    const key = contextKey();
    const items = (clusters[key] || clusters.tours).filter(item => !knownClosed.some(closed => item.name.includes(closed)));
    injectStyles();
    const section = document.createElement('section');
    section.className = 'restaurant-recs';
    section.id = 'restaurantRecs';
    section.innerHTML = `<h2>Casual Restaurants & Cafés</h2><p class="restaurant-recs-intro">Fünf Vorschläge passend zu Ort, Programm und Familienmodus. Fokus: bezahlbar, unkompliziert, kindertauglich, kurze Wege. Geschlossene oder widersprüchlich gelistete Restaurants wurden entfernt; trotzdem vor dem Losgehen immer Google Maps öffnen und Status, Öffnungszeiten, Reservierung und Karte prüfen.</p><div class="restaurant-rec-grid">${items.map(cardMarkup).join('')}</div><p class="restaurant-source"><strong>Hinweis:</strong> Google-Ratings ändern sich und Google-Maps-Status ist die letzte Instanz. Bei unsicherem Google-Wert steht bewusst „Google prüfen“ statt einer erfundenen Zahl.</p>`;
    const chat = $('.ask-chatgpt');
    const grid = $('.detail-grid');
    if (chat) chat.insertAdjacentElement('beforebegin', section);
    else if (grid) grid.insertAdjacentElement('afterend', section);
    else $('#detailRoot')?.appendChild(section);
    cleanupVisibleText();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(inject, 0));
  else setTimeout(inject, 0);
})();
