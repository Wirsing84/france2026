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

function detailButton(type, indexOrId) {
  return `<button class="text-button" type="button" data-detail-type="${type}" data-detail-id="${indexOrId}">Details öffnen →</button>`;
}

function openDetail(type, id) {
  let item;
  let title = '';
  let eyebrow = '';
  let body = '';
  let sidebar = '';

  if (type === 'destination') {
    item = data.destinations.find(entry => entry.id === id);
    if (!item) return;
    title = item.title;
    eyebrow = 'Stationsguide';
    body = `<p class="detail-lead">${item.deep || item.story}</p><h3>Warum das für euch passt</h3><p>${item.familyAngle || item.story}</p><h3>Highlights</h3><ul>${item.highlights.map(x => `<li>${x}</li>`).join('')}</ul><h3>Konkrete Tipps</h3><ul>${(item.tips || []).map(x => `<li>${x}</li>`).join('')}</ul>`;
    sidebar = renderLinks(item.links || []);
  }

  if (type === 'day') {
    item = data.days[Number(id)];
    if (!item) return;
    title = item.title;
    eyebrow = `${item.date} · ${item.place}`;
    body = `<p class="detail-lead">${item.focus || item.mood}</p><h3>Entspannt</h3><p>${item.calm}</p><h3>Aktiv</h3><p>${item.active}</p><h3>Alternative</h3><p>${item.fallback}</p><h3>Meine Einordnung</h3><p>Dieser Tag sollte nicht komplett durchgetaktet werden. Nutzt die drei Optionen als Entscheidungsbaum: Wenn alle Energie haben, nehmt die aktive Variante. Wenn die Kinder müde sind oder es heiß ist, gewinnt die entspannte Variante. Die Alternative ist nicht Plan B zweiter Klasse, sondern bewusst als guter Ausweichmodus gedacht.</p>`;
    sidebar = relatedForDay(item);
  }

  if (type === 'poi') {
    item = data.pois[Number(id)];
    if (!item) return;
    title = item.name;
    eyebrow = `${item.type} · ${item.place}`;
    body = `<p class="detail-lead">${item.text}</p><h3>Warum lohnt sich das?</h3><p>${item.why || item.text}</p><h3>Praktische Tipps</h3><ul>${(item.tips || []).map(x => `<li>${x}</li>`).join('')}</ul><h3>Familienfazit</h3><p>${familyVerdict(item)}</p>`;
    sidebar = `<a class="button primary wide" href="${mapsLink(item.query)}" target="_blank" rel="noopener">In Google Maps öffnen</a>${renderLinks(item.links || [])}`;
  }

  if (type === 'food') {
    item = data.food[Number(id)];
    if (!item) return;
    title = item.title;
    eyebrow = `Essen · ${item.place}`;
    body = `<p class="detail-lead">${item.text}</p><h3>Warum passt das?</h3><p>${item.why || item.text}</p><h3>Tipps</h3><ul>${(item.tips || []).map(x => `<li>${x}</li>`).join('')}</ul><h3>Familienfazit</h3><p>Für euch zählt hier weniger maximale Kulinarik, sondern gute Stimmung, kurze Wege und planbare Kinderenergie. Genau deshalb ist diese Option im Guide.</p>`;
    sidebar = item.query ? `<a class="button primary wide" href="${mapsLink(item.query)}" target="_blank" rel="noopener">In Google Maps suchen</a>` : '';
  }

  const target = $('#deepDetail');
  if (!target) return;
  target.innerHTML = `<div class="detail-title"><p class="section-kicker">${eyebrow}</p><h2>${title}</h2></div><div class="deep-grid"><article>${body}</article><aside>${sidebar}<div class="mini-card"><h3>Vor Ort prüfen</h3><ul><li>Öffnungszeiten</li><li>Parken</li><li>Reservierung</li><li>Hitze / Wetter</li></ul></div></aside></div>`;
  document.querySelector('#details')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderLinks(links) {
  if (!links.length) return '';
  return `<div class="mini-card"><h3>Links</h3>${links.map(link => `<a href="${mapsLink(link.query)}" target="_blank" rel="noopener">${link.label}</a>`).join('')}</div>`;
}

function relatedForDay(day) {
  const pois = data.pois.filter(p => p.place === day.place).slice(0, 4);
  if (!pois.length) return `<div class="mini-card"><h3>Transit-Tag</h3><p>Heute zählt einfache Logistik: Snacks, Wasser, Pausen, Hotel oder Airbnb.</p></div>`;
  return `<div class="mini-card"><h3>Passende Orte</h3>${pois.map(p => `<a href="${mapsLink(p.query)}" target="_blank" rel="noopener">${p.name}</a>`).join('')}</div>`;
}

function familyVerdict(item) {
  if (item.type === 'Strand') return 'Sehr passend, solange ihr Strömung, Sonne und Pausen ernst nehmt. Vormittag oder später Nachmittag ist meist angenehmer als Mittag.';
  if (item.type === 'Aktivität') return 'Sehr guter Baustein für 8 und 10 Jahre, weil daraus ein echtes Erlebnis wird und nicht nur ein Erwachsenenausflug.';
  if (item.type === 'Ausflug') return 'Lohnend, wenn ihr ihn schlank haltet: ein klares Ziel, keine zweite große Station, gute Rückkehrzeit.';
  return 'Guter Baustein, wenn ihr ihn als flexible Option versteht und nicht als Pflichttermin.';
}

function renderRoute() {
  $('#routeTimeline').innerHTML = data.route.map(item => `<article class="route-card" style="--accent:${item.accent}"><span class="date">${item.date}</span><h3>${item.title}</h3><p>${item.text}</p><div class="tag-row">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>${item.id !== 'stop' ? detailButton('destination', item.id) : ''}</article>`).join('');
}
function renderDestinations() {
  $('#destinationGrid').innerHTML = data.destinations.map(item => `<article class="destination-card"><div class="destination-visual ${item.visual}"><div><p class="small-label">${item.subtitle}</p><h3>${item.title}</h3></div></div><div class="destination-body"><p>${item.story}</p><ul>${item.highlights.map(h => `<li>${h}</li>`).join('')}</ul>${detailButton('destination', item.id)}</div></article>`).join('');
}

let activeDayFilter = 'Alle';
function renderDayFilters() {
  const places = ['Alle', ...new Set(data.days.map(day => day.place))];
  $('#dayFilters').innerHTML = places.map(place => `<button class="filter-button ${place === activeDayFilter ? 'active' : ''}" type="button" data-day-filter="${place}">${place}</button>`).join('');
  $$('[data-day-filter]').forEach(button => button.addEventListener('click', () => { activeDayFilter = button.dataset.dayFilter; renderDayFilters(); renderDays(); }));
}
function renderDays() {
  const filtered = activeDayFilter === 'Alle' ? data.days : data.days.filter(day => day.place === activeDayFilter);
  $('#dayGrid').innerHTML = filtered.map(day => { const i = data.days.indexOf(day); return `<article class="day-card"><div class="meta"><span>${day.date}</span><span>${day.place}</span></div><h3>${day.title}</h3><p><strong>${day.mood}</strong></p><div class="day-options"><div><strong>Entspannt:</strong> ${day.calm}</div><div><strong>Aktiv:</strong> ${day.active}</div><div><strong>Alternative:</strong> ${day.fallback}</div></div>${detailButton('day', i)}</article>`; }).join('');
}

let activePoiFilter = 'Alle';
function renderPoiToolbar() {
  const types = ['Alle', ...new Set(data.pois.map(poi => poi.type))];
  $('#poiToolbar').innerHTML = types.map(type => `<button class="filter-button ${type === activePoiFilter ? 'active' : ''}" type="button" data-poi-filter="${type}">${type}</button>`).join('');
  $$('[data-poi-filter]').forEach(button => button.addEventListener('click', () => { activePoiFilter = button.dataset.poiFilter; renderPoiToolbar(); renderPois(); }));
}
function renderPois() {
  const filtered = activePoiFilter === 'Alle' ? data.pois : data.pois.filter(poi => poi.type === activePoiFilter);
  $('#poiGrid').innerHTML = filtered.map(poi => { const i = data.pois.indexOf(poi); return `<article class="poi-card"><span class="poi-type">${poi.type} · ${poi.place}</span><h3>${poi.name}</h3><p>${poi.text}</p><div class="inline-actions">${detailButton('poi', i)}<a href="${mapsLink(poi.query)}" target="_blank" rel="noopener">Maps</a></div></article>`; }).join('');
}
function renderFood() {
  $('#foodGrid').innerHTML = data.food.map((item, i) => `<article class="food-card"><span class="small-label">${item.place}</span><h3>${item.title}</h3><p>${item.text}</p>${detailButton('food', i)}</article>`).join('');
}
function renderKids() { $('#kidsChoices').innerHTML = data.kids.map(item => `<article class="choice-card"><span class="emoji">${item.emoji}</span><strong>${item.title}</strong><p>${item.text}</p></article>`).join(''); }
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

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-detail-type]');
  if (!button) return;
  event.preventDefault();
  openDetail(button.dataset.detailType, button.dataset.detailId);
});

renderRoute(); renderDestinations(); renderDayFilters(); renderDays(); renderPoiToolbar(); renderPois(); renderFood(); renderKids(); renderPacking(); setupJournal(); setupMenu();
