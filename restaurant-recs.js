(() => {
  const $ = (selector) => document.querySelector(selector);
  const params = new URLSearchParams(location.search);
  const type = params.get('type');
  const id = params.get('id');
  if (!type || !$('#detailRoot')) return;

  const maps = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  const rec = (name, city, rating, query, general, fits, specific, source) => ({ name, city, rating, query, general, fits, specific, source });

  const clusters = {
    tours: [
      rec('La Petite Embarque / Guinguette de Tours', 'Tours', 'Google 4.1', 'La Petite Embarque Guinguette Tours', 'Lockerer Sommer-Ort am Loireufer statt steifes Restaurant.', 'Passt nach Ankunft, Loire-Spaziergang, Guinguette-Abend oder nach einem leichten Stadt-/Markttag.', 'Für euch gut, weil draußen, unkompliziert und direkt im Urlaubsmodus; nicht als Fine-Dining planen.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('La Deuvalière', 'Tours', 'Google 4.6', 'Restaurant La Deuvaliere Tours', 'Sehr gut bewertete Bistronomie im alten Tours, eher schöner Erwachsenenabend.', 'Passt zum ruhigeren Abend in Tours, wenn die Kinder noch mitziehen und ihr reservieren wollt.', 'Für euch nur dann sinnvoll, wenn ihr bewusst einen besseren Abend wollt; mit Kindern früh essen und nicht nach einem vollen Kanu-Tag.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('Les Bartavelles', 'Tours', 'Google 4.8', 'Les Bartavelles Tours', 'Hoch bewertete moderne französische Küche, eher besonderes Essen.', 'Passt zu einem ruhigen Tours-Abend oder als Alternative, wenn Guinguette nicht klappt.', 'Für euch interessant als „einmal schöner essen“-Option; vorher Reservierung, Kinderenergie und vegetarische Machbarkeit prüfen.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('La Petite Cuisine', 'Tours', 'Google 4.8', 'La Petite Cuisine Tours', 'Kleinere, sehr gut bewertete Restaurantoption in Tours.', 'Passt nach Markt/Altstadt, wenn ihr kein großes Programm mehr wollt.', 'Für euch gut, wenn ihr kurze Wege und ein überschaubares Abendessen sucht; Öffnungszeiten prüfen.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('Le Turon', 'Tours', 'Google 4.7', 'Le Turon Tours restaurant', 'Französisches Restaurant mit frischer saisonaler Küche.', 'Passt eher zum Stadtabend als zum Kanu-Tag.', 'Für euch geeignet, wenn ihr ein verlässliches, aber nicht maximal formelles Essen wollt; früh reservieren.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026')
    ],
    moliets: [
      rec('La Cagette', 'Moliets-et-Maâ', 'Google 4.9', 'La Cagette Moliets et Maa', 'Sehr gut bewertete, strandnahe Küche mit frischem, farbigem Insel-/Sommergefühl.', 'Passt nach Strand, Surfkurs oder als richtiges Abendessen in Moliets.', 'Für euch stark, weil nah am Ferienmodus und deutlich interessanter als Standard-Pizza; vegetarische Optionen prüfen.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('L’Océan', 'Moliets-et-Maâ', 'Google 4.4', "Restaurant de l'Ocean Moliets", 'Strandnahe Bistro-/Saisonküche in sehr praktischer Lage.', 'Passt nach Plage Centrale, erstem Atlantiktag oder letztem Strandabend.', 'Für euch gut, wenn kurze Wege wichtiger sind als kulinarische Perfektion; ideal nach müden Strandtagen.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('Le Globe Trotter', 'Moliets-et-Maâ', 'Google 4.7', 'Le Globe Trotter Moliets', 'Gut bewertete Alternative zur typischen Strandküche, eher international/fusion.', 'Passt, wenn ihr nach mehreren Strandessen etwas anderes wollt.', 'Für euch sinnvoll, weil Abwechslung für Erwachsene und trotzdem casual genug für Ferien mit Kindern.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('Le Café de la Plage', 'Moliets-et-Maâ', 'Google 4.1', 'Le Cafe de la Plage Moliets', 'Praktische Café-/Restaurantoption direkt im Strandkontext.', 'Passt für Snack, frühes Abendessen oder Getränk nach Plage Centrale.', 'Für euch gut als Reibungsarm-Option: Lage schlägt hier Perfektion.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('La Cave Aux Moules', 'Moliets-et-Maâ', 'Google 4.3', 'La Cave Aux Moules Moliets', 'Solide lokale Meeres-/Muscheloption im Ferienkontext.', 'Passt nach Strand- oder Surf-Tag, wenn ihr klassisch unkompliziert essen wollt.', 'Für euch eher als Elternoption; für Kinder vorher Karte und vegetarische Alternativen prüfen.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026')
    ],
    basque: [
      rec('Pacific Coast Café', 'Hossegor', 'Google 4.9', 'Pacific Coast Cafe Hossegor', 'Sehr gut bewerteter Brunch-/Café-Stopp im Surf-Kontext.', 'Passt zum Hossegor-/Capbreton-Bummel, Surfshop-Runde oder Kaffeeausflug.', 'Für euch stark wegen Kaffee, Brunch und Surfvibe; nicht als langer Ausflug überfrachten.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('Volt Café Brûlerie', 'Hossegor', 'Google 4.6', 'Volt Cafe Brulerie Hossegor', 'Kaffee-Fokus, gut für Frühstück oder kurze Pause.', 'Passt, wenn du guten Kaffee willst und die Familie kurz snacken kann.', 'Für euch sehr passend als Eltern-Kaffeeanker mit überschaubarer Aufenthaltsdauer.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('BEURRÉ Crêperie, café & cave à vins', 'Hossegor', 'Google 4.7', 'BEURRE Creperie Cafe Hossegor', 'Crêperie/Café ist mit Kindern meist einfacher als ein klassisches Restaurant.', 'Passt nach Hossegor-Bummel oder als süßes/salziges Zwischenziel.', 'Für euch gut, weil Crêpes die Kinder abholen und Kaffee/Wein-Kontext für Erwachsene bleibt.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('My Little Cafe', 'Bayonne', 'Google 4.7', 'My little cafe Bayonne France', 'Gut bewertetes Café für einen weicheren Stadtstopp.', 'Passt zum Bayonne-Tag nach Markthalle/Altstadt.', 'Für euch als Pause besser als langes Mittagessen; kurze Belohnung, dann weiter.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('Gribouille Café', 'Bayonne', 'Google 4.5', 'Gribouille Cafe Bayonne', 'Café mit spielerischem Kontext; in Reviews werden Spiele/Family-Friends erwähnt.', 'Passt, wenn Bayonne wetterbedingt oder mit müden Kindern kippt.', 'Für euch sehr passend als Kinder-Reset in einer Stadt, ohne gleich Restaurantdruck zu erzeugen.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026')
    ],
    provence: [
      rec('MANA Aix', 'Aix-en-Provence', 'Google 4.7', 'MANA Aix en Provence', 'Sehr gut bewertetes Café/Brunch-Restaurant in Aix.', 'Passt zu Aix locker, Markt, Cours Mirabeau, Stadtpause.', 'Für euch ideal: guter Kaffee, Brunch-Logik, nicht zu schwer, gut für kurze Stadtetappen.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('Maison Nosh', 'Aix-en-Provence', 'Google 4.6', 'Maison Nosh Aix en Provence', 'Brunch- und Coffee-Shop seit 2014, nahe Cours Mirabeau/Allées Provençales.', 'Passt zu Aix vormittags oder als unkomplizierter Mittagssnack.', 'Für euch stark, weil Frühstück/Brunch mit Kindern leichter ist als klassisches Mittagessen in Hitze.', 'RestaurantGuru + Website / Google-Rating, Stand Recherche 07/2026'),
      rec('Le Tuyau', 'Aix-en-Provence', 'Google 4.6', 'Le Tuyau Aix en Provence', 'Café/Pâtisserie-Logik mit gutem Rating.', 'Passt zu Eis-/Süßpause, Aix-Bummel, Plan-B bei Hitze.', 'Für euch gut als Belohnungsanker für die Kinder und Kaffee-/Kuchenpause für Erwachsene.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('Le Bouddoir', 'Aix-en-Provence', 'Google 4.3', 'Le Bouddoir Aix en Provence', 'Solide Aix-Restaurantoption, wenn ihr abends bleiben wollt.', 'Passt eher zum Terrassenabend als zur Mittagshitze.', 'Für euch nur mit Reservierung und Kinderenergie; als normaler Stadtabend realistisch.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('Tay-Lai', 'Aix-en-Provence', 'Google 4.3', 'Tay-Lai Aix en Provence', 'Asiatische Option als Abwechslung zu französischer Ferienküche.', 'Passt nach mehreren Markt-/Bistro-Tagen oder wenn Kinder einfache Reis-/Nudelgerichte wollen.', 'Für euch gut als pragmatischer, weniger schwerer Abend in Aix.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026')
    ],
    coast: [
      rec('Le Grand Bleu / Balthazar', 'Cassis', 'Google 4.5', 'Le Grand Bleu Balthazar Cassis', 'Hafennahe, sehr gut bewertete Cassis-Option.', 'Passt nach Calanques-Bootstour oder Hafenrunde.', 'Für euch nur früh/mit Reservierung; Lage ist stark, aber Cassis kann voll sein.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('La Vieille Auberge', 'Cassis', 'Google 4.4', 'La Vieille Auberge Cassis', 'Klassische Cassis-Restaurantoption mit solide gutem Rating.', 'Passt zum Cassis-Tag, wenn ihr nicht nur Snack wollt.', 'Für euch sinnvoll, wenn Boot/Parken geklappt haben und niemand völlig durch ist.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('L’Oustaou', 'La Ciotat', 'Google 4.5', "L'Oustaou La Ciotat", 'Gut bewertete französisch-mediterrane Option in La Ciotat.', 'Passt zum pragmatischen Meer-Tag mit Strand/Promenade.', 'Für euch oft einfacher als Cassis: La Ciotat ist familienpraktischer und weniger ikonisch-angespannt.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('La Spiaggia', 'La Ciotat', 'TheFork 8.9', 'La Spiaggia La Ciotat', 'Familienfreundlich gelistete italienische Option; kein verifiziertes Google-Rating im Recherchefenster.', 'Passt nach Strand, wenn Pizza/Pasta die Kinder abholt.', 'Für euch als Sicherheitsanker gut, weil italienisch oft konfliktarm ist.', 'TheFork Family-Liste, Stand Recherche 07/2026'),
      rec('Libane', 'La Ciotat', 'TheFork 9.4', 'Libane La Ciotat', 'Familienfreundlich gelistete libanesische Option mit leichtem, teilbarem Essen.', 'Passt, wenn ihr nach Strand etwas anderes als Bistro/Seafood wollt.', 'Für euch wegen Mezze/vegetarischer Optionen interessant; aktuelle Karte prüfen.', 'TheFork Family-Liste, Stand Recherche 07/2026')
    ],
    luberon: [
      rec('Maison Nosh', 'Aix-en-Provence', 'Google 4.6', 'Maison Nosh Aix en Provence', 'Sicherer Aix-Plan-B, wenn Luberon zu heiß oder zu weit wirkt.', 'Passt als Alternative zu Gordes/Roussillon: Aix + Brunch + Pool.', 'Für euch gut, weil weniger Fahrzeit und kindertauglicher als volle Dörfer.', 'RestaurantGuru + Website / Google-Rating, Stand Recherche 07/2026'),
      rec('MANA Aix', 'Aix-en-Provence', 'Google 4.7', 'MANA Aix en Provence', 'Starker Kaffee-/Brunchanker in Aix.', 'Passt als kurzer Stadtstopp vor oder statt Luberon.', 'Für euch geeignet, wenn Erwachsene Kaffee wollen und Kinder etwas Einfaches brauchen.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('Le Tuyau', 'Aix-en-Provence', 'Google 4.6', 'Le Tuyau Aix en Provence', 'Guter süßer Stopp als Belohnung.', 'Passt nach einem kurzen Luberon-Block oder zurück in Aix.', 'Für euch guter Motivator: Dorf/Markt nur kurz, danach Kuchen/Kaffee.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('La Dilettante', 'Beaune', 'Google 4.6', 'La Dilettante Beaune', 'Kein Luberon-Ort, aber starke Option falls die Luberon-Seite als Rückreise-/Burgund-Kontext geöffnet wird.', 'Passt zu Transit/Beaune-Abend, nicht zum Aix-Tag.', 'Für euch eher für den Zwischenstopp vormerken.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('Roussillon / Gordes vor Ort suchen', 'Luberon', 'Rating live prüfen', 'family restaurant Roussillon Gordes Luberon', 'Für die konkreten Dörfer besser tagesaktuell in Maps wählen als Ratings zu erfinden.', 'Passt direkt zum Dorfbesuch, wenn ihr wirklich fahrt.', 'Für euch wichtig: Nähe zum Parkplatz und Schatten schlagen Sternezahl.', 'Keine belastbare einzelne Google-Rating-Quelle im Recherchefenster')
    ],
    transit: [
      rec('La Dilettante', 'Beaune', 'Google 4.6', 'La Dilettante Beaune', 'Gut bewertete Beaune-Option für einen schöneren Rückreiseabend.', 'Passt zum Zwischenstopp, wenn ihr noch eine nette Altstadtrunde wollt.', 'Für euch gut, wenn Hotel/Ankunft früh genug sind; sonst zu ambitioniert.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('Brasserie le Monge', 'Beaune', 'Google 4.2', 'Brasserie le Monge Beaune', 'Brasserie nahe Zentrum/Notre-Dame, mit Familienlunch-Erwähnung in Reviews.', 'Passt zu Beaune als pragmatischem Abendessen.', 'Für euch gut, weil Brasserie meist einfacher mit Kindern ist als Fine Dining.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('Dr. Wine', 'Dijon', 'Google 4.5', 'Dr Wine Dijon', 'Gut bewerteter Dijon-Klassiker mit Wein-/Essensfokus.', 'Passt, wenn Zwischenstopp Dijon-Süd/Dijon-Zentrum wird.', 'Für euch eher Elternabend; mit Kindern nur früh und entspannt.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('L’Aromatic', 'Langres', 'Google 4.5', "L'Aromatic Langres", 'Gut bewertete Langres-Option für den pragmatischen Schlafblock.', 'Passt, wenn ihr Langres statt Beaune/Dijon nehmt.', 'Für euch gut, weil nah am Übernachtungskonzept: essen, schlafen, weiter.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026'),
      rec('Le Goût des autres', 'Langres', 'Google 4.4', 'Le Gout des autres Langres', 'Weitere gut bewertete Option in Langres.', 'Passt als Plan B, falls L’Aromatic nicht passt.', 'Für euch sinnvoll, wenn ihr keine Experimente auf der Rückfahrt wollt.', 'RestaurantGuru / Google-Rating, Stand Recherche 07/2026')
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
      .restaurant-card h3{margin:0;font-size:1rem}.restaurant-meta{display:flex;flex-wrap:wrap;gap:6px}.restaurant-rating,.restaurant-city{display:inline-flex;border-radius:999px;padding:4px 8px;font-size:.72rem;font-weight:900}.restaurant-rating{background:rgba(246,189,96,.26);color:#7f5539}.restaurant-city{background:rgba(23,107,135,.10);color:#176b87}.restaurant-card p{font-size:.88rem;line-height:1.45;color:#657286;margin:0}.restaurant-card b{color:#17202a}.restaurant-card a{margin-top:auto;display:inline-flex;align-items:center;justify-content:center;min-height:36px;border-radius:999px;background:#17202a;color:white;font-size:.78rem;font-weight:900;padding:0 12px}.restaurant-source{margin:14px 0 0;font-size:.82rem;color:#657286}
      @media(max-width:1100px){.restaurant-rec-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:620px){.restaurant-rec-grid{grid-template-columns:1fr}.restaurant-recs{padding:18px}}
    `;
    document.head.appendChild(style);
  }

  function cardMarkup(item) {
    return `<article class="restaurant-card"><div><h3>${item.name}</h3><div class="restaurant-meta"><span class="restaurant-rating">${item.rating}</span><span class="restaurant-city">${item.city}</span></div></div><p><b>Warum:</b> ${item.general}</p><p><b>Passt zu:</b> ${item.fits}</p><p><b>Für euch:</b> ${item.specific}</p><a href="${maps(item.query)}" target="_blank" rel="noopener">Google Maps öffnen ↗</a></article>`;
  }

  function inject() {
    if ($('#restaurantRecs')) return;
    const key = contextKey();
    const items = clusters[key] || clusters.tours;
    injectStyles();
    const section = document.createElement('section');
    section.className = 'restaurant-recs';
    section.id = 'restaurantRecs';
    section.innerHTML = `<h2>Passende Restaurants & Cafés</h2><p class="restaurant-recs-intro">Fünf Vorschläge passend zu Ort, Programm und Familienmodus. Ratings sind recherchierte Google-Werte aus öffentlich zugänglichen Review-/Restaurantseiten; vor Ort bitte Öffnungszeiten, Reservierung, Karte und aktuelle Bewertung in Google Maps prüfen.</p><div class="restaurant-rec-grid">${items.map(cardMarkup).join('')}</div><p class="restaurant-source">Ratings können sich ändern. Bei nicht verifizierbaren Google-Werten steht bewusst keine erfundene Zahl.</p>`;
    const chat = $('.ask-chatgpt');
    const grid = $('.detail-grid');
    if (chat) chat.insertAdjacentElement('beforebegin', section);
    else if (grid) grid.insertAdjacentElement('afterend', section);
    else $('#detailRoot')?.appendChild(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(inject, 0));
  else setTimeout(inject, 0);
})();
