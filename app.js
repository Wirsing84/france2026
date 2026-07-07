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

renderRoute(); renderDestinations(); renderDayFilters(); renderDays(); renderPoiToolbar(); renderPois(); renderFood(); renderKids(); renderPacking(); setupJournal(); setupMenu();
