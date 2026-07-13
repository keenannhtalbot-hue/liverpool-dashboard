// Liverpool FC Deep Dive — app entry
// Single-file module: tabs + renders.
// INIT AT TOP LEVEL — `<script type="module" defer>` fires *after* DOMContentLoaded,
// so an addEventListener('DOMContentLoaded') block would silently never run.

import { PLAYERS, LEGEND_SOURCES } from './data/players.js';
import { HONOURS, HONOUR_TOTALS, HONOUR_SOURCES } from './data/honours.js';
import { STORIES, STORY_SOURCES } from './data/stories.js';
import { RECORDS, RECORD_SOURCES } from './data/records.js';
import { ERAS, ERA_SOURCES } from './data/eras.js';
import { SOURCES } from './data/sources.js';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'legends',  label: 'Legends' },
  { id: 'honours',  label: 'Trophies' },
  { id: 'anfield',  label: 'Anfield' },
  { id: 'records',  label: 'The Numbers' },
  { id: 'stories',  label: 'Stories' },
  { id: 'eras',     label: 'Eras' },
  { id: 'sources',  label: 'Sources' }
];

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'text') node.textContent = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null) continue;
    node.append(c.nodeType ? c : document.createTextNode(c));
  }
  return node;
}

function tagBadge(text, variant = '') {
  return el('span', { class: `tag ${variant}` }, text);
}

function fmt(n) {
  return n == null ? '—' : Number(n).toLocaleString();
}

// ---- TAB ROUTER ----
function renderTabs() {
  const list = $('.tablist');
  if (!list) return;
  list.innerHTML = '';
  for (const t of TABS) {
    const btn = el('button', {
      role: 'tab',
      type: 'button',
      id: `tab-${t.id}`,
      'aria-controls': `page-${t.id}`,
      'aria-selected': 'false',
      tabindex: '-1',
      text: t.label
    });
    btn.addEventListener('click', () => activate(t.id));
    list.append(btn);
  }
  list.addEventListener('keydown', onTabKey);
}

function onTabKey(e) {
  const tabs = $$('[role="tab"]', $('.tablist'));
  const i = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
  if (i < 0) return;
  let next = i;
  if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
  else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
  else if (e.key === 'Home') next = 0;
  else if (e.key === 'End') next = tabs.length - 1;
  else return;
  e.preventDefault();
  activate(TABS[next].id, { focus: true });
}

function activate(id, { focus = false } = {}) {
  $$('.page').forEach(p => { p.hidden = p.dataset.page !== id; });
  $$('[role="tab"]').forEach(t => {
    const on = t.id === `tab-${id}`;
    t.setAttribute('aria-selected', on ? 'true' : 'false');
    t.setAttribute('tabindex', on ? '0' : '-1');
    if (on && focus) t.focus();
  });
  if (location.hash !== `#${id}`) {
    history.replaceState(null, '', `#${id}`);
  }
  // scroll the just-rendered section to its top
  const sec = $(`.page[data-page="${id}"]`);
  if (sec) {
    // tabs sit fixed under topbar; give a small offset
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }
}

// ---- RENDER: LEGENDS ----
function renderLegends() {
  const root = $('#legends-grid');
  if (!root) return;
  root.innerHTML = '';
  // Order: managers first, then players in chronological era
  const order = ['shankly','paisley','liddell','callaghan','hansen','dalglish','souness','rush','barnes','gerrard','xabi','suarez','coutinho','firmino','mane','salah','vandijk','alisson','trent','klopp','slot'];
  const byId = Object.fromEntries(PLAYERS.map(p => [p.id, p]));
  for (const id of order) {
    const p = byId[id];
    if (!p) continue;
    const card = el('article', { class: 'legend' });
    const left = el('div', {}, [
      el('h3', { class: 'name', html: p.name }),
      el('div', { class: 'meta', text: p.meta || `${p.position || ''} · ${p.era}` })
    ]);
    const right = el('div', { class: 'nums' });
    if (p.apps != null) {
      right.append(
        el('div', { html: `<b>${fmt(p.apps)}</b> apps` }),
        p.goals != null ? el('div', { html: `<b>${fmt(p.goals)}</b> goals` }) : null
      );
    } else {
      right.append(el('div', { html: '<b>—</b>Manager' }));
    }
    const tags = el('div', {});
    if (p.tag) {
      const variant = p.tag.includes('Active') ? 'ink' : (p.tag.includes('Record') || p.tag.includes('King') || p.tag.includes('top scorer') ? 'gold' : '');
      tags.append(tagBadge(p.tag, variant));
    }
    left.prepend(tags);
    card.append(left, right);
    card.append(el('p', { class: 'bio', text: p.bio }));
    card.append(el('p', { class: 'bio', html: `<em style="color:var(--text-3);font-size:12px;">${p.legacy}</em>` }));
    root.append(card);
  }
  // Source link — appended to the page container (root.parentElement) so it spans the
  // full width of the page, not a single grid column. Guard against duplicate
  // footnotes if renderLegends() is ever re-called.
  const parent = root.parentElement;
  const old = parent.querySelector('.footnote');
  if (old) old.remove();
  const src = el('p', { class: 'footnote' });
  for (const s of LEGEND_SOURCES) {
    src.append(el('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer', text: s.label }), ' · ');
  }
  parent.appendChild(src);
}

// ---- RENDER: HONOURS ----
function renderHonours() {
  const root = $('#honours-tables');
  if (!root) return;
  root.innerHTML = '';
  for (const h of HONOURS) {
    const block = el('section', { class: 'honour-block' });
    block.append(el('h2', {}, [el('span', { text: h.title }), el('span', { class: 'honour-count', text: h.count })]));
    block.append(el('p', { text: h.blurb }));
    const list = el('div', { class: 'year-list' });
    h.years.forEach((y, i) => {
      const chip = el('span', { class: 'year-chip' + (i === h.years.length - 1 && h.id === 'league' ? ' latest' : ''), text: y });
      list.append(chip);
    });
    block.append(list);
    root.append(block);
  }
  // Total summary
  const summary = el('section', { class: 'card' });
  summary.append(el('h2', { text: 'In total' }));
  summary.append(el('p', { html: `<strong>${HONOUR_TOTALS.major}+ major honours</strong> by end of the 2024-25 season, plus the four Second-Division titles of the founding era.` }));
  summary.append(el('p', { class: 'footnote', text: HONOUR_TOTALS.note }));
  const src = el('p', { class: 'footnote' });
  for (const s of HONOUR_SOURCES) {
    src.append(el('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer', text: s.label }), ' · ');
  }
  summary.append(src);
  root.append(summary);
}

// ---- RENDER: ANFIELD ----
function renderAnfield() {
  const root = $('#anfield-content');
  if (!root) return;
  root.innerHTML = '';

  const stats = el('div', { class: 'quickstats' });
  const qs = [
    { num: '61,276', lab: 'Capacity (post-2024)', sub: 'Anfield Road End expanded' },
    { num: '134', lab: 'Years at this ground', sub: 'since 1892' },
    { num: '1906', lab: 'Spion Kop built', sub: 'named after Boer War battle' },
    { num: '£9,000', lab: 'Purchase price (1892)', sub: 'John Houlding bought the ground' }
  ];
  for (const q of qs) {
    stats.append(el('article', { class: 'qs', html: `<div class="qs-num">${q.num}</div><div class="qs-label">${q.lab}</div><div class="qs-sub">${q.sub}</div>` }));
  }
  root.append(stats);

  // Hero card with full text
  const card = el('section', { class: 'card' });
  card.append(el('h2', { text: 'Anfield — the home ground' }));
  card.append(el('p', { html: `Built in 1884 as Everton FC's home, Anfield has been Liverpool's since <strong>1892</strong> when John Houlding refused to sell his Stanley Park lease to Everton FC — so Everton moved a quarter mile up the road to Goodison Park, and LFC was founded inside twelve weeks.` }));
  card.append(el('p', { html: `The <strong>Spion Kop</strong> (1906) is the most famous single-tier terrace in world football. Named after the Battle of Spion Kop in the Boer War, it held 28,000 standing fans at its peak. It was made all-seater in 1994 under the Taylor Report following Hillsborough.` }));
  card.append(el('p', { html: `The <strong>Main Stand</strong> was rebuilt between 2014 and 2016 at a cost of £110m, becoming the largest cantilever stand in Europe. The <strong>Anfield Road End</strong> was expanded 2022–24 to add ~7,000 seats, taking total capacity from 54,074 to <strong>61,276</strong>.` }));
  card.append(el('p', { html: `At the players' tunnel entrance is a small sign, placed by Bill Shankly in <strong>1972</strong>: <em>"This is Anfield"</em>. Players touch it as they walk out for kick-off. (Shankly commissioned the sign in the 1960s, but the canonical installation date is 1972.)` }));
  root.append(card);

  // Attendance card
  const aCard = el('section', { class: 'card' });
  aCard.append(el('h2', { text: 'The crowd record' }));
  aCard.append(el('p', { html: `On <strong>2 February 1952</strong>, 61,905 fans watched Liverpool beat Wolverhampton Wanderers in the FA Cup 5th round. Standing terraces, packed to the walls. The official LFC attendance record has stood for over 70 years.` }));
  aCard.append(el('p', { html: `<em>Modern official seating capacity post-2024 expansion: 61,276.</em>` }));
  root.append(aCard);

  const sources = el('p', { class: 'footnote' });
  sources.append(el('a', { href: 'https://en.wikipedia.org/wiki/Anfield', target: '_blank', rel: 'noopener noreferrer', text: 'Wikipedia: Anfield' }), ' · ');
  sources.append(el('a', { href: 'https://www.liverpoolfc.com/anfield', target: '_blank', rel: 'noopener noreferrer', text: 'LFC official Anfield page' }));
  root.append(sources);
}

// ---- RENDER: RECORDS ----
function renderRecords() {
  const root = $('#records-content');
  if (!root) return;
  root.innerHTML = '';
  const grid = el('div', { class: 'record-grid' });
  for (const block of RECORDS) {
    const card = el('section', { class: 'record-block' });
    card.append(el('h2', {}, [el('span', { text: block.title }), el('small', { text: block.kind.toUpperCase() })]));
    for (const r of block.rows) {
      const row = el('div', { class: 'record-row' });
      const left = el('div', {}, [
        el('div', { class: 'what', text: r.what }),
        el('span', { class: 'why', html: `${r.who} · ${r.why}` })
      ]);
      const right = el('div', { class: 'val' });
      if (r.url) {
        right.append(el('a', { href: r.url, target: '_blank', rel: 'noopener noreferrer', text: r.val, class: 'val' }));
      } else {
        right.textContent = r.val;
      }
      row.append(left, right);
      card.append(row);
    }
    grid.append(card);
  }
  root.append(grid);
  const src = el('p', { class: 'footnote' });
  for (const s of RECORD_SOURCES) {
    src.append(el('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer', text: s.label }), ' · ');
  }
  root.append(src);
}

// ---- RENDER: STORIES ----
function renderStories() {
  const root = $('#stories-timeline');
  if (!root) return;
  root.innerHTML = '';
  const tl = el('div', { class: 'timeline' });
  for (const s of STORIES) {
    const card = el('article', { class: `story ${s.kind}` });
    card.append(el('div', { class: 'date', text: s.date }));
    const h = el('h3', {}, [el('span', { text: s.title })]);
    if (s.score) h.append(el('span', { class: 'score', text: s.score }));
    card.append(h);
    card.append(el('p', { text: s.summary }));
    card.append(el('p', { class: 'why', html: `<strong>Why it matters:</strong> ${s.why}` }));
    if (s.sources) {
      const meta = el('p', { class: 'footnote', html: '' });
      for (const src of s.sources) {
        meta.append(el('a', { href: src.url, target: '_blank', rel: 'noopener noreferrer', text: src.label }), ' · ');
      }
      card.append(meta);
    }
    tl.append(card);
  }
  root.append(tl);
  const src = el('p', { class: 'footnote' });
  for (const s of STORY_SOURCES) {
    src.append(el('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer', text: s.label }), ' · ');
  }
  root.append(src);
}

// ---- RENDER: ERAS ----
function renderEras() {
  const root = $('#eras-content');
  if (!root) return;
  root.innerHTML = '';
  for (const e of ERAS) {
    const card = el('section', { class: 'era' });
    card.append(el('div', { class: 'era-date', text: `${e.years} · ${e.manager}` }));
    card.append(el('h3', { text: e.name }));
    card.append(el('p', { class: 'era-summary', text: e.summary }));
    const ul = el('ul', {});
    for (const b of e.bullets) ul.append(el('li', { text: b }));
    card.append(ul);
    root.append(card);
  }
  const src = el('p', { class: 'footnote' });
  for (const s of ERA_SOURCES) {
    src.append(el('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer', text: s.label }), ' · ');
  }
  root.append(src);
}

// ---- RENDER: SOURCES ----
function renderSources() {
  const root = $('#sources-content');
  if (!root) return;
  root.innerHTML = '';
  const groups = {
    official:   [],
    league:     [],
    reference:  [],
    historical: [],
    news:       []
  };
  for (const s of SOURCES) {
    if (!groups[s.kind]) groups[s.kind] = [];
    groups[s.kind].push(s);
  }
  const labels = {
    official:   'Official LFC and competition sites',
    league:     'League and competition authorities',
    reference:  'Reference works (Wikipedia)',
    historical: 'Historical archives',
    news:       'Trusted news organisations'
  };
  for (const k of Object.keys(groups)) {
    if (!groups[k].length) continue;
    const block = el('section', { class: 'sources-block' });
    block.append(el('h2', { text: labels[k] }));
    const ul = el('ul', {});
    for (const s of groups[k]) {
      ul.append(el('li', { html: `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.name}</a>` }));
    }
    block.append(ul);
    root.append(block);
  }
  const disc = el('section', { class: 'card' });
  disc.append(el('h2', { text: 'A note on this dashboard' }));
  disc.append(el('p', { html: `Every claim in this dashboard is intended to be cross-verifiable from at least two of the sources above. <strong>All-time player figures</strong> come from Liverpool FC's official site and Wikipedia's LFC player list. <strong>Match data</strong> comes from BBC, UEFA, and LFC's match archive. <strong>Historical claims</strong> (especially about Hillsborough and Heysel) are presented with respect and restraint.` }));
  disc.append(el('p', { html: `<em>Snapshot date: July 2026. Liverpool are in the 2025-26 season under Arne Slot. Figures marked as "active" are correct to the end of the 2024-25 Premier League title season.</em>` }));
  root.append(disc);
}

// ---- BOOT ----
function initApp() {
  renderTabs();
  renderLegends();
  renderHonours();
  renderAnfield();
  renderRecords();
  renderStories();
  renderEras();
  renderSources();

  // Initial tab from hash, default to overview
  const initial = (location.hash || '#overview').slice(1);
  const exists = TABS.find(t => t.id === initial);
  activate(exists ? initial : 'overview');

  window.addEventListener('hashchange', () => {
    const id = (location.hash || '#overview').slice(1);
    const t = TABS.find(x => x.id === id);
    if (t) activate(t.id);
  });

  // Register SW for PWA (production only — manifest is still served, SW just won't have anywhere to register)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
}

initApp();
