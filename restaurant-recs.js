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
      rec('La Petite Embarque / Guinguette de Tours', 'Tours', 'Google 4.1', 'La Petite Embarque Guinguette Tours', 'Draußen · Loire · casual', 'Sommerlicher Loire-Ort statt Restaurantabend mit steifer Erwartung.', 'Ankunftsabend, Loire-Spaziergang, Guinguette-Abend oder nach kurzem Stadt-/Markttag.', 'Für euch gut, weil die Kinder nicht still am weißen Tisch sitzen müssen und ihr trotzdem Urlaubsgefühl habt.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Crêperie Bilien', 'Tours', 'Google 4.9', 'Creperie Bilien Tours', 'Crêpes/Galettes · einfach', 'Crêperie ist mit Kindern fast immer dankbar: salzig, süß, schnell verständlich.', 'Nach Markt/Altstadt oder als unkompliziertes Abendessen, wenn keiner mehr lange wählen will.', 'Für euch deutlich passender als Bistronomie: vegetarische Galettes möglich, Kinder finden sicher etwas.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Le Chalet – Crêperie à Tours', 'Tours', 'Google 4.9', 'Le Chalet Creperie Tours', 'Crêpes/Galettes · casual', 'Sehr gut bewertete Crêperie; niedriger Entscheidungsstress, meist kinderkompatibel.', 'Passt nach einem Loire-/Vouvray-Tag oder wenn die Guinguette wetterbedingt nicht klappt.', 'Für euch gut als bezahlbare, französische, aber nicht feierliche Option.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Le Comptoir de Mamie Bigoude Tours Centre', 'Tours', 'Google 4.4', 'Le Comptoir de Mamie Bigoude Tours Centre', 'Crêperie · Kinderfreundlich', 'Ketten-/Konzept-Crêperie mit spielerischem Ambiente; nicht fein, sondern praktisch.', 'Passt, wenn Kinder eine klare, einfache Essensoption brauchen.', 'Für euch sinnvoll als Notfallanker: Galette, Crêpe, etwas Witz, weniger Restaurantdruck.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Bistrot des Halles', 'Tours', 'Google 4.1', 'Bistrot des Halles Tours', 'Brasserie · Marktnähe', 'Bistro/Brasserie an den Halles: eher normale Küche als großes Gourmetziel.', 'Passt zum Markt-/Altstadtblock oder als Mittagessen ohne Umwege.', 'Für euch gut, wenn Lage und Reibungsarmut wichtiger sind als maximale Bewertung.', 'Rating via RestaurantGuru/Google, Stand 07/2026')
    ],
    moliets: [
      rec('Entre Amis Moliets – Pizza au Feu de Bois', 'Moliets-et-Maâ', 'Google 4.7', 'Entre Amis Moliets Pizza au Feu de Bois', 'Pizza · Take-away möglich', 'Holzofenpizza ist nach Strand/Surf die realistische Familienlösung.', 'Nach Plage Centrale, Surfkurs, Ankunftsabend oder müden Kindern.', 'Für euch sehr passend: bezahlbar, schnell, wenig Diskussion, im Zweifel mitnehmen.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('La Fabrique', 'Moliets-et-Maâ', 'Google 4.6', 'La Fabrique Moliets et Maa', 'Pizza/Burger · casual', 'Pizza und Burger passen zu Ferienabenden, an denen niemand lange still sitzen will.', 'Passt nach Strand, Kletterwald oder wenn ihr keine Lust auf Reservierung habt.', 'Für euch gut, weil Kinderessen und Erwachsenenessen nicht auseinanderfallen.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Zaz’Pizza', 'Moliets-et-Maâ', 'Google 4.5', 'Zaz Pizza Moliets et Maa', 'Pizza · unkompliziert', 'Einfache Pizza-Option für Tage, an denen Kochen oder Restaurant nicht passt.', 'Passt als Take-away nach langem Strandtag oder vor frühem Abend.', 'Für euch wichtig als Stressventil: Essen lösen, ohne den Tag mit Restaurantwahl zu belasten.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('AmaZone Café', 'Moliets-et-Maâ', 'Google 4.7', 'AmaZone Cafe Moliets et Maa', 'Café · Pause', 'Café-/Snackanker im Ferienort, gut für kurze Pausen statt Abendprogramm.', 'Passt vormittags, nach kurzer Radrunde, bei müden Kindern oder als Eltern-Kaffeeanker.', 'Für euch gut, weil es nicht „Restaurant“ sein muss: Kaffee, Snack, kurz weiter.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Le Café de la Plage', 'Moliets-et-Maâ', 'Google 4.1', 'Le Cafe de la Plage Moliets', 'Strandnah · praktisch', 'Lage schlägt Perfektion: direkt im Strandkontext, gut für Getränke/Snack/frühes Essen.', 'Passt nach Plage Centrale, erstem Atlantiktag oder letztem Strandabend.', 'Für euch als einfache Option gut, wenn niemand noch fahren oder suchen will.', 'Rating via RestaurantGuru/Google, Stand 07/2026')
    ],
    basque: [
      rec('Pacific Coast Café', 'Hossegor', 'Google 4.9', 'Pacific Coast Cafe Hossegor', 'Brunch · Surf-Vibe', 'Brunch-/Café-Stopp im Surf-Kontext, nicht feierlich.', 'Passt zum Hossegor-/Capbreton-Bummel, Surfshop-Runde oder Kaffeeausflug.', 'Für euch stark: guter Kaffee, unkomplizierter Brunch, Kinder können snacken.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Volt Café Brûlerie', 'Hossegor', 'Google 4.6', 'Volt Cafe Brulerie Hossegor', 'Kaffee · kurz', 'Kaffee-Fokus, gut für Frühstück oder kurze Pause.', 'Passt, wenn du guten Kaffee willst und die Familie nur eine überschaubare Pause braucht.', 'Für euch sehr passend als Eltern-Kaffeeanker ohne ganzen Restaurantblock.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('BEURRÉ Crêperie, café & cave à vins', 'Hossegor', 'Google 4.7', 'BEURRE Creperie Cafe Hossegor', 'Crêpes · Café', 'Crêpes/Galettes holen Kinder ab und bleiben für Erwachsene trotzdem interessant.', 'Passt nach Hossegor-Bummel oder als süßes/salziges Zwischenziel.', 'Für euch gut, weil es französisch, aber niedrigschwellig ist.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('My Little Cafe', 'Bayonne', 'Google 4.7', 'My little cafe Bayonne France', 'Café · Stadtpause', 'Kleiner Café-Stopp statt langem Bayonne-Mittagessen.', 'Passt nach Markthalle/Altstadt, bevor die Stadtstimmung kippt.', 'Für euch als Pause besser als großer Restauranttermin.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Gribouille Café', 'Bayonne', 'Google 4.5', 'Gribouille Cafe Bayonne', 'Café · Spiele/Reset', 'Café mit spielerischem Kontext; gut, wenn Kinder in der Stadt eine Pause brauchen.', 'Passt bei Regen, Müdigkeit oder wenn Bayonne länger wird als geplant.', 'Für euch sehr passend, weil es die Kinderperspektive ernst nimmt.', 'Rating via RestaurantGuru/Google, Stand 07/2026')
    ],
    provence: [
      rec('Maison Nosh', 'Aix-en-Provence', 'Google 4.6', 'Maison Nosh Aix en Provence', 'Brunch · casual', 'Brunch/Hotdogs/Coffee-Shop statt klassisches französisches Mittagessen.', 'Passt zu Aix vormittags, Markt, Cours Mirabeau oder als unkomplizierter Mittagssnack.', 'Für euch stark: schnell verständlich, kindertauglicher als Bistro-Menüs, nicht zu schwer bei Hitze.', 'Rating via RestaurantGuru/Google + Website, Stand 07/2026'),
      rec('MANA Aix', 'Aix-en-Provence', 'Google 4.7', 'MANA Aix en Provence', 'Café/Brunch · Kaffee', 'Sehr gut bewerteter Café-/Brunchanker in Aix.', 'Passt zu Aix locker, Stadtpause, Markt oder kurzer Eltern-Kaffee-Mission.', 'Für euch ideal: guter Kaffee für dich, einfache Brunch-/Snackauswahl für die Familie.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Crêpes à Gogo', 'Aix-en-Provence', 'Google 4.4', 'Crepes a Gogo Aix en Provence', 'Crêpes · günstig/schnell', 'Schneller Crêpe-/Snackstopp, laut Reviews eher günstiger Bereich.', 'Passt als Belohnung nach Brunnen-/Gassenrunde oder wenn Mittagessen zu groß wäre.', 'Für euch gut, weil es Kinder motiviert und keinen langen Restaurantblock erzeugt.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Little Italy by Fratelli IAQUINTA', 'Aix-en-Provence', 'Google 4.9', 'Little Italy By Fratelli IAQUINTA Aix en Provence', 'Italienisch · Pizza/Pasta', 'Italienisch ist im Familienurlaub oft der zuverlässigste Kompromiss.', 'Passt abends in Aix oder wenn französische Küche alle gerade nicht abholt.', 'Für euch sinnvoll wegen Pizza/Pasta und besserer vegetarischer Chancen.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('La Casa', 'Aix-en-Provence', 'Google 4.0', 'La Casa Aix en Provence restaurant pizzeria', 'Pizza/Burger · sehr casual', 'Keine Gourmetoption, sondern pragmatisch: Pizza, Burger, Kebab-ähnliche einfache Küche.', 'Passt, wenn ihr nach Pool/Aix keine Lust auf Reservierung oder feines Essen habt.', 'Für euch gut als ehrlicher Notnagel: bezahlbar, einfach, Kinder finden wahrscheinlich etwas.', 'Rating via RestaurantGuru/Google, Stand 07/2026')
    ],
    coast: [
      rec('Loulou La Malice', 'La Ciotat', 'Google 4.5', 'Loulou La Malice La Ciotat', 'Casual · familienfreundlich', 'Locker und sommerlich, von Reisequellen als familienfreundlich beschrieben.', 'Passt zum La-Ciotat-Strandtag, Snack oder frühem Abendessen.', 'Für euch besser als Cassis-Hafenstress: einfach, kinderkompatibel, weniger formell.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('La Spiaggia', 'La Ciotat', 'Google 4.1', 'La Spiaggia La Ciotat', 'Pizza/italienisch · Strandnähe', 'Pizza/italienisch ist nach Strand der sicherste Familienmodus.', 'Passt nach La Ciotat, Strand, Promenade oder als Plan B nach Cassis.', 'Für euch gut, weil Pizza/Pasta die Kinder abholt und vegetarisch meist einfacher ist.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Libane', 'La Ciotat', 'Google 4.9', 'Libane La Ciotat', 'Libanesisch · Mezze', 'Mezze/Libanesisch ist teilbar, oft leichter und vegetarisch freundlicher.', 'Passt nach Küstentag, wenn ihr nicht schon wieder Pizza/Bistro wollt.', 'Für euch gut wegen Hummus/Falafel/Mezze: flexibel, nicht schwer, kinderkompatibel testen.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('La Crique', 'La Ciotat', 'Google 4.3', 'La Crique La Ciotat', 'Pizza · Meer-Kontext', 'Pizza-Option in La Ciotat mit ordentlichem Rating.', 'Passt, wenn Strand und Abendessen nah beieinander bleiben sollen.', 'Für euch gut als pragmatischer Küstenanker statt Cassis-Reservierungsstress.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Restaurant Plage Saint Jean', 'La Ciotat', 'Google 4.4', 'Restaurant Plage Saint Jean La Ciotat', 'Strandrestaurant · praktisch', 'Strand-/Meer-Kontext mit normaler Restaurantauswahl.', 'Passt, wenn ihr den Meer-Tag nicht durch Ortswechsel unterbrechen wollt.', 'Für euch sinnvoll, weil Lage und Einfachheit bei Kindern oft wichtiger sind als kulinarische Ambition.', 'Rating via RestaurantGuru/Google, Stand 07/2026')
    ],
    luberon: [
      rec('Crêpes à Gogo', 'Aix-en-Provence', 'Google 4.4', 'Crepes a Gogo Aix en Provence', 'Crêpes · schnell', 'Guter Aix-Plan-B, wenn Luberon zu heiß oder zu weit wirkt.', 'Passt als Belohnung nach kurzer Aix-Runde oder statt Dorfhopping.', 'Für euch besser als ein langes Dorfrestaurant: schnell, günstig, kindertauglich.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Maison Nosh', 'Aix-en-Provence', 'Google 4.6', 'Maison Nosh Aix en Provence', 'Brunch · Aix-Plan-B', 'Sicherer Brunch-/Snackanker in Aix.', 'Passt als Alternative zu Gordes/Roussillon: Aix + Brunch + Pool.', 'Für euch gut, weil weniger Fahrzeit und kindertauglicher als volle Dörfer.', 'Rating via RestaurantGuru/Google + Website, Stand 07/2026'),
      rec('MANA Aix', 'Aix-en-Provence', 'Google 4.7', 'MANA Aix en Provence', 'Café · Kaffee', 'Starker Kaffee-/Brunchanker in Aix.', 'Passt als kurzer Stadtstopp vor oder statt Luberon.', 'Für euch geeignet, wenn Erwachsene Kaffee wollen und Kinder etwas Einfaches brauchen.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Roussillon: vor Ort Café suchen', 'Roussillon', 'Rating live prüfen', 'cafe family Roussillon Luberon', 'In kleinen Dörfern zählen Nähe, Schatten und freie Plätze mehr als eine perfekte Vorabwahl.', 'Passt direkt zum Dorfbesuch, wenn ihr wirklich fahrt.', 'Für euch wichtig: Parkplatznähe, Schatten und einfache Karte schlagen Sternezahl.', 'Kein belastbarer einzelner Google-Wert im Recherchefenster'),
      rec('Gordes: vor Ort Snack/Café suchen', 'Gordes', 'Rating live prüfen', 'cafe family Gordes Luberon', 'Gordes kann voll und teuer sein; besser vor Ort niedrigschwellig entscheiden.', 'Passt, wenn ihr Gordes nur als kurzen Aussicht-/Dorfstopp nutzt.', 'Für euch besser als Reservierungsrestaurant: kurz, flexibel, zurück zum Pool.', 'Kein belastbarer einzelner Google-Wert im Recherchefenster')
    ],
    transit: [
      rec('Brasserie le Monge', 'Beaune', 'Google 4.2', 'Brasserie le Monge Beaune', 'Brasserie · zentral', 'Brasserie nahe Zentrum/Notre-Dame, einfacher als Fine Dining.', 'Passt zu Beaune als pragmatischem Abendessen.', 'Für euch gut, weil Brasserie meist einfacher mit Kindern ist als ein ambitioniertes Menü.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Pizzeria Le Carnot', 'Beaune', 'Rating live prüfen', 'Pizzeria Le Carnot Beaune', 'Pizza/Pasta · Transitfreundlich', 'Pizza ist nach Fahrt die konfliktärmste Wahl.', 'Passt, wenn Beaune Zwischenstopp wird und alle nur essen wollen.', 'Für euch sehr wahrscheinlich besser als Weinbar oder Menürestaurant.', 'Rating vor Ort in Google Maps prüfen'),
      rec('Foodies Dijon', 'Dijon', 'Rating live prüfen', 'Foodies Dijon restaurant', 'Burger/Salat · casual', 'Casual Essen statt langer Burgund-Abend.', 'Passt bei Dijon-Zwischenstopp, wenn es schnell und zentral sein soll.', 'Für euch sinnvoll, wenn Kinder Hunger haben und ihr keine Menüentscheidung wollt.', 'Rating vor Ort in Google Maps prüfen'),
      rec('L’Aromatic', 'Langres', 'Google 4.5', "L'Aromatic Langres", 'Gut bewertet · normaler Abend', 'Gut bewertete Langres-Option für den pragmatischen Schlafblock.', 'Passt, wenn ihr Langres statt Beaune/Dijon nehmt.', 'Für euch gut, wenn ihr nicht mehr suchen wollt: essen, schlafen, weiter.', 'Rating via RestaurantGuru/Google, Stand 07/2026'),
      rec('Le Goût des autres', 'Langres', 'Google 4.4', 'Le Gout des autres Langres', 'Plan B · Langres', 'Weitere gut bewertete Option in Langres.', 'Passt als Plan B, falls L’Aromatic nicht passt.', 'Für euch sinnvoll, wenn ihr keine Experimente auf der Rückfahrt wollt.', 'Rating via RestaurantGuru/Google, Stand 07/2026')
    ]
  };

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
      .restaurant-recs-intro{color:#657286;max-width:760px;margin-bottom:18px}.restaurant-rec-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}.restaurant-card{display:flex;flex-direction:column;gap:10px;min-height:100%;padding:16px;border-radius:18px;background:rgba(255,255,255,.88);border:1px solid rgba(23,32,42,.10);box-shadow:0 8px 24px rgba(23,32,42,.08)}
      .restaurant-card h3{margin:0;font-size:1rem}.restaurant-meta{display:flex;flex-wrap:wrap;gap:6px}.restaurant-rating,.restaurant-city,.restaurant-tag{display:inline-flex;border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900}.restaurant-rating{background:rgba(246,189,96,.26);color:#7f5539}.restaurant-city{background:rgba(23,107,135,.10);color:#176b87}.restaurant-tag{background:rgba(95,141,78,.12);color:#5f8d4e}.restaurant-card p{font-size:.88rem;line-height:1.45;color:#657286;margin:0}.restaurant-card b{color:#17202a}.restaurant-card a{margin-top:auto;display:inline-flex;align-items:center;justify-content:center;min-height:36px;border-radius:999px;background:#17202a;color:white;font-size:.78rem;font-weight:900;padding:0 12px}.restaurant-source{margin:14px 0 0;font-size:.82rem;color:#657286}
      @media(max-width:1100px){.restaurant-rec-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:620px){.restaurant-rec-grid{grid-template-columns:1fr}.restaurant-recs{padding:18px}}
    `;
    document.head.appendChild(style);
  }

  function cardMarkup(item) {
    return `<article class="restaurant-card"><div><h3>${item.name}</h3><div class="restaurant-meta"><span class="restaurant-rating">${item.rating}</span><span class="restaurant-city">${item.city}</span><span class="restaurant-tag">${item.tag}</span></div></div><p><b>Warum:</b> ${item.general}</p><p><b>Passt zu:</b> ${item.fits}</p><p><b>Für euch:</b> ${item.specific}</p><a href="${maps(item.query)}" target="_blank" rel="noopener">Google Maps öffnen ↗</a></article>`;
  }

  function removeAwkwardLogicWords() {
    const replacements = [
      [/Fahrtlogik/g, 'Fahrtplan'],
      [/Hotelkriterien/g, 'Hotel-Auswahl'],
      [/Hotelzone/g, 'Übernachtungszone'],
      [/Essenslogik/g, 'Essensplan'],
      [/Packlogik/g, 'Packplan'],
      [/Picknicklogik/g, 'Picknick-Plan'],
      [/Pool-\/Picknicklogik/g, 'Pool- oder Picknick-Plan'],
      [/Surf-Logik/g, 'Surf-Plan'],
      [/Café-\/Snacklogik/g, 'Café- oder Snackauswahl'],
      [/Brunch-\/Snacklogik/g, 'Brunch- oder Snackauswahl'],
      [/Coffee-Shop-Logik/g, 'Coffee-Shop'],
      [/Pizza-\/Burger-Logik/g, 'Pizza/Burger'],
      [/Mezze-Logik/g, 'Mezze-Auswahl'],
      [/Restaurantlogik/g, 'Restaurantplanung'],
      [/Strandlogik/g, 'Strandplan'],
      [/Brückenblick/g, 'Blick auf die Brücken']
    ];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !/logik|Logik|Hotelkriterien|Hotelzone/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (parent && ['SCRIPT', 'STYLE', 'TEXTAREA'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      let value = node.nodeValue;
      replacements.forEach(([pattern, replacement]) => { value = value.replace(pattern, replacement); });
      value = value.replace(/([A-Za-zÄÖÜäöüß\/\-]+)logik/g, '$1plan');
      value = value.replace(/([A-Za-zÄÖÜäöüß\/\-]+)Logik/g, '$1plan');
      node.nodeValue = value;
    });
  }

  function inject() {
    if ($('#restaurantRecs')) return;
    removeAwkwardLogicWords();
    const key = contextKey();
    const items = clusters[key] || clusters.tours;
    injectStyles();
    const section = document.createElement('section');
    section.className = 'restaurant-recs';
    section.id = 'restaurantRecs';
    section.innerHTML = `<h2>Casual Restaurants & Cafés</h2><p class="restaurant-recs-intro">Fünf eher niedrigschwellige Vorschläge passend zu Ort, Programm und Familienmodus: Café, Crêpes, Pizza, Brunch, Strandbar oder einfache Brasserie. Ratings sind recherchierte Google-Werte aus öffentlich zugänglichen Review-/Restaurantseiten; vor Ort bitte Öffnungszeiten, Reservierung, Karte und aktuelle Bewertung in Google Maps prüfen.</p><div class="restaurant-rec-grid">${items.map(cardMarkup).join('')}</div><p class="restaurant-source">Ratings können sich ändern. Bei nicht verifizierbaren Google-Werten steht bewusst keine erfundene Zahl.</p>`;
    const chat = $('.ask-chatgpt');
    const grid = $('.detail-grid');
    if (chat) chat.insertAdjacentElement('beforebegin', section);
    else if (grid) grid.insertAdjacentElement('afterend', section);
    else $('#detailRoot')?.appendChild(section);
    removeAwkwardLogicWords();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(inject, 0));
  else setTimeout(inject, 0);
})();
