const data = window.FRANCE2026;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function mapsLink(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function safeGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch (e) {}
}

function detailUrl(type, indexOrId) {
  return `detail.html?type=${encodeURIComponent(type)}&id=${encodeURIComponent(indexOrId)}`;
}

function detailLink(type, indexOrId) {
  return `<a class="text-button" href="${detailUrl(type, indexOrId)}">Details öffnen →</a>`;
}

function renderRoute() {
  $('#routeTimeline').innerHTML = data.route.map(item => `<article class="route-card" style="--accent:${item.accent}"><span class="date">${item.date}</span><h3>${item.title}</h3><p>${item.text}</p><div class="tag-row">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>${item.id !== 'stop' ? detailLink('destination', item.id) : ''}</article>`).join('');
}
function renderDestinations() {
  $('#destinationGrid').innerHTML = data.destinations.map(item => `<article class="destination-card"><div class="destination-visual ${item.visual}"><div><p class="small-label">${item.subtitle}</p><h3>${item.title}</h3></div></div><div class="destination-body"><p>${item.story}</p><ul>${item.highlights.map(h => `<li>${h}</li>`).join('')}</ul>${detailLink('destination', item.id)}</div></article>`).join('');
}

let activeDayFilter = 'Alle';
function renderDayFilters() {
  const places = ['Alle', ...new Set(data.days.map(day => day.place))];
  $('#dayFilters').innerHTML = places.map(place => `<button class="filter-button ${place === activeDayFilter ? 'active' : ''}" type="button" data-day-filter="${place}">${place}</button>`).join('');
  $$('[data-day-filter]').forEach(button => button.addEventListener('click', () => { activeDayFilter = button.dataset.dayFilter; renderDayFilters(); renderDays(); }));
}
function renderDays() {
  const filtered = activeDayFilter === 'Alle' ? data.days : data.days.filter(day => day.place === activeDayFilter);
  $('#dayGrid').innerHTML = filtered.map(day => { const i = data.days.indexOf(day); return `<article class="day-card"><div class="meta"><span>${day.date}</span><span>${day.place}</span></div><h3>${day.title}</h3><p><strong>${day.mood}</strong></p><div class="day-options"><div><strong>Entspannt:</strong> ${day.calm}</div><div><strong>Aktiv:</strong> ${day.active}</div><div><strong>Alternative:</strong> ${day.fallback}</div></div>${detailLink('day', i)}</article>`; }).join('');
}

let activePoiFilter = 'Alle';
function renderPoiToolbar() {
  const types = ['Alle', ...new Set(data.pois.map(poi => poi.type))];
  $('#poiToolbar').innerHTML = types.map(type => `<button class="filter-button ${type === activePoiFilter ? 'active' : ''}" type="button" data-poi-filter="${type}">${type}</button>`).join('');
  $$('[data-poi-filter]').forEach(button => button.addEventListener('click', () => { activePoiFilter = button.dataset.poiFilter; renderPoiToolbar(); renderPois(); }));
}
function renderPois() {
  const filtered = activePoiFilter === 'Alle' ? data.pois : data.pois.filter(poi => poi.type === activePoiFilter);
  $('#poiGrid').innerHTML = filtered.map(poi => { const i = data.pois.indexOf(poi); return `<article class="poi-card"><span class="poi-type">${poi.type} · ${poi.place}</span><h3>${poi.name}</h3><p>${poi.text}</p><div class="inline-actions">${detailLink('poi', i)}<a href="${mapsLink(poi.query)}" target="_blank" rel="noopener">Maps</a></div></article>`; }).join('');
}
function renderFood() {
  $('#foodGrid').innerHTML = data.food.map((item, i) => `<article class="food-card"><span class="small-label">${item.place}</span><h3>${item.title}</h3><p>${item.text}</p>${detailLink('food', i)}</article>`).join('');
}

const kidCards = [
  {
    emoji: '🌊', title: 'Wellen-Check & Bodyboard', tag: 'Moliets · Strand',
    choose: 'wenn ihr richtig Lust auf Meer, Sand und Action habt.',
    avoid: 'wenn jemand müde ist, die Flagge schlecht steht oder die Sonne gerade knallt.',
    mission: 'Findet die Wellenampel: Wie stark sind Wellen, Wind und Strömung heute?',
    parents: 'UV-Shirts, Wasser, klare Strandgrenze und vorher erklären, wo man rein darf.',
    links: [{ label: 'Erster Atlantiktag', href: detailUrl('day', 4) }, { label: 'Plage Centrale', href: mapsLink('Plage Centrale Moliets et Maa') }]
  },
  {
    emoji: '🏄', title: 'Surfkurs oder Surf-Schnuppern', tag: 'Moliets · Mutprobe',
    choose: 'wenn ihr etwas Neues lernen wollt und euch Fallen-ins-Wasser nicht stört.',
    avoid: 'wenn der Tag sowieso schon voll ist. Surf macht müde.',
    mission: 'Nach dem Kurs kann jeder eine Sache zeigen: Paddeln, Aufstehen oder Wellenlesen.',
    parents: 'Früh in der Woche klären, damit ein zweiter Termin möglich bleibt.',
    links: [{ label: 'Surf & Pinien', href: detailUrl('day', 5) }, { label: 'Surf Schools suchen', href: mapsLink('surf school Moliets et Maa kids') }]
  },
  {
    emoji: '🚣', title: 'Kanu auf der Loire', tag: 'Tours · Abenteuer',
    choose: 'wenn ihr Bewegung wollt, aber keine laute Action braucht.',
    avoid: 'wenn es sehr heiß ist oder alle schon genervt von Logistik sind.',
    mission: 'Zählt drei Dinge, die man nur vom Wasser aus sieht: Vögel, Brücken, Sandbänke.',
    parents: 'Wasserschuhe, Wechselkleidung, Sonnencreme und genug Wasser einplanen.',
    links: [{ label: 'Kanu-Tag', href: detailUrl('day', 2) }, { label: 'Kanu Vouvray', href: mapsLink('canoe Vouvray Tours Loire') }]
  },
  {
    emoji: '🌲', title: 'Kletterwald-Challenge', tag: 'Moliets · Energie raus',
    choose: 'wenn ihr klettern, balancieren und euch etwas trauen wollt.',
    avoid: 'wenn Arme und Beine vom Strandtag schon leer sind.',
    mission: 'Jeder wählt eine faire Challenge: mutig, aber nicht übertrieben.',
    parents: 'Vorher Alter/Größe, Slots, Schatten und Handschuhe prüfen.',
    links: [{ label: 'Adrenaline Parc Tag', href: detailUrl('day', 7) }, { label: 'Adrenaline Parc', href: mapsLink('Adrenaline Parc Moliets') }]
  },
  {
    emoji: '🦎', title: 'Naturforscher-Tag', tag: 'Lac de Léon · Courant d’Huchet',
    choose: 'wenn ihr Wasser wollt, aber nicht schon wieder nur Strand.',
    avoid: 'wenn alle eigentlich Wellen und Eis erwarten.',
    mission: 'Sucht fünf Naturzeichen: Spur, Feder, Libelle, Schattenplatz, besonderer Baum.',
    parents: 'Mückenschutz, Picknick, Reserve-Regeln und Bootsmöglichkeiten vorher prüfen.',
    links: [{ label: 'Courant d’Huchet', href: detailUrl('day', 6) }, { label: 'Lac de Léon', href: mapsLink('Lac de Leon Landes') }]
  },
  {
    emoji: '🍦', title: 'Stadt-Detektive mit Eis-Finale', tag: 'Aix · Bayonne · Tours',
    choose: 'wenn ihr bummeln könnt, aber eine klare Belohnung wollt.',
    avoid: 'wenn es mittags heiß ist oder niemand Lust auf Gassen hat.',
    mission: 'Findet: einen Brunnen, eine besondere Tür, etwas Süßes, einen Platz im Schatten.',
    parents: 'Stadtzeit kurz halten. Erst Markt/Gassen, dann Eis, dann raus.',
    links: [{ label: 'Aix locker', href: detailUrl('day', 11) }, { label: 'Bayonne Ausflug', href: detailUrl('day', 8) }]
  },
  {
    emoji: '🎲', title: 'Airbnb-Reset', tag: 'Müde · heiß · Regen',
    choose: 'wenn keiner mehr Programm braucht und genau das der beste Plan ist.',
    avoid: 'wenn nur Langeweile da ist und eigentlich Bewegung helfen würde.',
    mission: 'Wählt ein Turnier: Karten, Würfel, Lesen, Pool-Challenge oder Ferien-Tagebuch.',
    parents: 'Nicht als Scheitern werten. Leerlauf rettet oft den nächsten Tag.',
    links: [{ label: 'Pool & Provence', href: detailUrl('day', 14) }, { label: 'Packlisten prüfen', href: '#packlisten' }]
  },
  {
    emoji: '⭐', title: 'Favoritentag', tag: 'Wiederholen statt mehr',
    choose: 'am letzten Tag einer Station: das Beste nochmal machen.',
    avoid: 'wenn jemand noch unbedingt etwas Neues sehen will.',
    mission: 'Jeder sagt eine Sache, die nochmal passieren soll. Dann wird abgestimmt.',
    parents: 'Gerade am Ende nicht überladen. Wiederholung fühlt sich für Kinder oft besser an.',
    links: [{ label: 'Letzter Atlantiktag', href: detailUrl('day', 9) }, { label: 'Letzter Provence-Tag', href: detailUrl('day', 16) }]
  }
];

function renderKids() {
  $('#kidsChoices').innerHTML = kidCards.map(card => `<article class="choice-card kid-card"><div class="kid-card-head"><span class="emoji">${card.emoji}</span><div><strong>${card.title}</strong><span>${card.tag}</span></div></div><div class="kid-rules"><p><b>Wählt das, wenn:</b> ${card.choose}</p><p><b>Lieber nicht, wenn:</b> ${card.avoid}</p></div><div class="kid-mission"><b>Auftrag für euch:</b> ${card.mission}</div><p class="kid-parent"><b>Elterncheck:</b> ${card.parents}</p><div class="kid-links">${card.links.map(link => `<a href="${link.href}" ${link.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${link.label}</a>`).join('')}</div></article>`).join('');
}

function renderPacking() {
  $('#packingGrid').innerHTML = data.packing.map((group, groupIndex) => `<article class="pack-card"><h3>${group.title}</h3><div>${group.items.map((item, itemIndex) => { const id = `pack-${groupIndex}-${itemIndex}`; const checked = safeGet(id) === 'true' ? 'checked' : ''; return `<label class="check-item"><input type="checkbox" data-pack-id="${id}" ${checked}><span>${item}</span></label>`; }).join('')}</div></article>`).join('');
  $$('[data-pack-id]').forEach(input => input.addEventListener('change', () => safeSet(input.dataset.packId, input.checked)));
}
function setupJournal() {
  const select = $('#journalDay'); const textarea = $('#journalText'); const hint = $('#journalHint');
  select.innerHTML = data.days.map((day, index) => `<option value="${index}">${day.date} · ${day.title}</option>`).join('');
  function load() { textarea.value = safeGet(`journal-${select.value}`) || ''; hint.textContent = ''; }
  select.addEventListener('change', load);
  $('#journalForm').addEventListener('submit', event => { event.preventDefault(); safeSet(`journal-${select.value}`, textarea.value.trim()); hint.textContent = 'Gespeichert auf diesem Gerät.'; });
  load();
}
function setupMenu() {
  const button = $('[data-menu-button]'); const links = $('[data-nav-links]');
  if (!button || !links) return;
  button.addEventListener('click', () => { const isOpen = links.classList.toggle('open'); button.setAttribute('aria-expanded', String(isOpen)); });
}

renderRoute(); renderDestinations(); renderDayFilters(); renderDays(); renderPoiToolbar(); renderPois(); renderFood(); renderKids(); renderPacking(); setupJournal(); setupMenu();
