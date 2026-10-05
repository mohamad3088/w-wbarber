/* =========================================================
   W&W Barber Shop — interactions
   ========================================================= */
(() => {
  'use strict';

  const WA_NUMBER = '32460968533';
  const TZ = 'Europe/Brussels';
  // Opening hours in minutes since midnight, keyed by JS weekday (0 = Sunday)
  const HOURS = {
    0: [12 * 60, 19 * 60 + 30],
    1: [10 * 60, 19 * 60 + 30],
    2: [10 * 60, 19 * 60],
    3: [10 * 60, 19 * 60 + 30],
    4: [10 * 60, 19 * 60 + 30],
    5: [10 * 60, 19 * 60 + 30],
    6: [10 * 60, 19 * 60 + 30],
  };
  // Services shown in the booking form. Prices are indicative — keep in sync with index.html.
  const SERVICES = [
    { id: 'ritueel', nl: 'Het W&W Ritueel',       en: 'The W&W Ritual',         price: '€35' },
    { id: 'knippen', nl: 'Knippen',               en: 'Haircut',                price: '€20' },
    { id: 'fade',    nl: 'Skin fade',             en: 'Skin fade',              price: '€22' },
    { id: 'krullen', nl: 'Krullen & textuur',     en: 'Curls & texture',        price: '€25' },
    { id: 'combo',   nl: 'Knippen + baard',       en: 'Haircut + beard',        price: '€30' },
    { id: 'baard',   nl: 'Baard trimmen',         en: 'Beard trim',             price: '€12' },
    { id: 'kids',    nl: 'Kinderen (-12 jaar)',   en: 'Kids (under 12)',        price: '€15' },
    { id: 'design',  nl: 'Hair design / lijnen',  en: 'Hair design / lines',    price: 'vanaf €5',  priceEn: 'from €5' },
    { id: 'brows',   nl: 'Wenkbrauwen (draad)',   en: 'Eyebrows (threading)',   price: '€8' },
    { id: 'kleur',   nl: 'Haarkleuring',          en: 'Hair colouring',         price: 'vanaf €30', priceEn: 'from €30' },
  ];

  const EN = {
    'skip': 'Skip to content',
    'nav.exp': 'Experience', 'nav.services': 'Services', 'nav.work': 'Work', 'nav.reviews': 'Reviews', 'nav.visit': 'Visit',
    'cta.book': 'Book now', 'cta.bookNow': 'Book your chair', 'cta.call': 'Call us',
    'hero.eyebrow': 'Barbershop · Diestsestraat 246 · Leuven',
    'hero.t1': 'More than', 'hero.t2': 'a haircut.', 'hero.t3': 'A real experience.',
    'hero.lead': 'Razor-sharp fades, beard work done right and a chair where you can switch off for a while. Welcome to W&amp;W.',
    'hero.rating': '· 192 Google reviews',
    'exp.kicker': '01 — The experience',
    'exp.title': 'Your satisfaction is <em>our priority.</em>',
    'exp.p1': 'At W&amp;W every cut starts with listening. We take the time to understand what you want, give honest advice and finish every detail — from the skin fade to the last line of your beard.',
    'exp.p2': 'Under our iconic hexagon ceiling, with warm wood and a good playlist, a routine visit becomes something you look forward to.',
    'exp.f1t': 'Precision', 'exp.f1': 'Clean fades, sharp lines, seamless blends.',
    'exp.f2t': 'Tailored advice', 'exp.f2': 'We look at your hair type, face shape and style.',
    'exp.f3t': 'Fair prices', 'exp.f3': 'Top quality without costing a fortune.',
    'stat.rating': 'Google rating', 'stat.reviews': 'reviews', 'stat.followers': 'Instagram followers', 'stat.open': 'days a week',
    'svc.kicker': '02 — Services &amp; prices',
    'svc.title': 'The menu. <em>Pick your style.</em>',
    'svc.sigTag': 'Most popular', 'svc.sigTitle': 'The W&amp;W Ritual',
    'svc.sigDesc': 'A haircut of your choice, beard trim with razor line-up, wash and style. All in one session.',
    'svc.sigCta': 'Book the ritual',
    'svc.g1': 'Hair', 'svc.g2': 'Beard', 'svc.g3': 'Extras', 'svc.from': 'from',
    'svc.s1': 'Haircut', 'svc.s1d': 'Scissors &amp; clippers, styling included',
    'svc.s2': 'Skin fade', 'svc.s2d': 'Low, mid or high — down to the skin',
    'svc.s3': 'Curls &amp; texture', 'svc.s3d': 'Cut tailored to curly hair',
    'svc.s4': 'Kids (under 12)', 'svc.s4d': 'Calm, quick and patient',
    'svc.s5': 'Beard trim', 'svc.s5d': 'Shape, length and sharp edges',
    'svc.s6': 'Haircut + beard', 'svc.s6d': 'The classic combination',
    'svc.s7': 'Hair design / lines', 'svc.s7d': 'Patterns and sharp parts',
    'svc.s8': 'Eyebrows (threading)', 'svc.s8d': 'Clean and natural',
    'svc.s9': 'Hair colouring', 'svc.s9d': 'By appointment, with advice first',
    'svc.note': 'Tap a service to book it straight away. Walk-ins welcome when there is room.',
    'work.kicker': '03 — The work', 'work.title': 'Every cut <em>a signature.</em>', 'work.more': 'More on',
    'shop.kicker': '04 — The shop', 'shop.title': 'Light. Wood. <em>Calm.</em>',
    'shop.body': 'A place you remember: the glowing hexagon ceiling, warm wooden slats, comfortable chairs and a team that knows you by name. Clean, modern and always welcoming.',
    'rev.kicker': '05 — Reviews', 'rev.title': 'Leuven <em>loves it.</em>',
    'rev.based': 'Based on 192 Google reviews', 'rev.all': 'All reviews on Google ↗',
    'book.kicker': '06 — Booking', 'book.title': 'Upgrade <em>your look.</em>',
    'book.body': 'Choose your service and a time that suits you. Your request goes straight to the barber via WhatsApp — you will get a quick confirmation.',
    'book.call': 'Prefer to call?', 'book.wa': 'Just send a message?',
    'form.service': 'Service', 'form.date': 'Date', 'form.time': 'Time', 'form.name': 'Name',
    'form.note': 'Note <span class="opt">(optional)</span>',
    'form.submit': 'Send via WhatsApp', 'form.fine': 'No account needed. We will confirm your appointment as soon as possible.',
    'visit.kicker': '07 — Visit us',
    'visit.body': 'A few minutes’ walk from Leuven station. Walk in, or book ahead to be sure of your spot.',
    'visit.hours': 'Opening hours', 'visit.route': 'Get directions',
    'day.0': 'Sunday', 'day.1': 'Monday', 'day.2': 'Tuesday', 'day.3': 'Wednesday', 'day.4': 'Thursday', 'day.5': 'Friday', 'day.6': 'Saturday',
    'foot.tag': 'More than a haircut, a real experience.', 'foot.visit': 'Address', 'foot.contact': 'Contact', 'foot.follow': 'Follow us',
    'foot.top': 'Back to top ↑', 'bar.call': 'Call', 'bar.route': 'Route',
  };

  const UI = {
    nl: {
      open: (c) => `Nu open · sluit om ${c}`,
      closedToday: (o) => `Gesloten · opent om ${o}`,
      closedTomorrow: (o) => `Gesloten · opent morgen om ${o}`,
      today: 'Vandaag',
      noSlots: 'Geen plek meer op deze dag',
      namePh: 'Je voornaam', notePh: 'Bv. foto van de stijl die je wil, of baard mag kort',
      errName: 'Vul je naam in.', errTime: 'Kies een datum en tijdstip.',
      msg: (s, d, t, n, note) => `Hallo W&W! 👋 Ik wil graag een afspraak maken.\n\n✂️ Dienst: ${s}\n📅 Datum: ${d}\n🕐 Tijd: ${t}\n👤 Naam: ${n}${note ? `\n📝 Opmerking: ${note}` : ''}\n\nGraag een bevestiging. Bedankt!`,
    },
    en: {
      open: (c) => `Open now · closes at ${c}`,
      closedToday: (o) => `Closed · opens at ${o}`,
      closedTomorrow: (o) => `Closed · opens tomorrow at ${o}`,
      today: 'Today',
      noSlots: 'No slots left on this day',
      namePh: 'Your first name', notePh: 'E.g. a photo of the style you want, or keep the beard short',
      errName: 'Please enter your name.', errTime: 'Please pick a date and time.',
      msg: (s, d, t, n, note) => `Hi W&W! 👋 I'd like to book an appointment.\n\n✂️ Service: ${s}\n📅 Date: ${d}\n🕐 Time: ${t}\n👤 Name: ${n}${note ? `\n📝 Note: ${note}` : ''}\n\nPlease confirm. Thanks!`,
    },
  };

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = (n) => String(n).padStart(2, '0');
  const fmt = (mins) => `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`;

  let lang = 'nl';
  try { if (localStorage.getItem('ww-lang') === 'en') lang = 'en'; } catch (e) { /* storage unavailable */ }

  /* ---------- Brussels clock ---------- */
  function brusselsNow() {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false, weekday: 'short',
    }).formatToParts(new Date()).reduce((a, p) => (a[p.type] = p.value, a), {});
    const days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      day: days[parts.weekday],
      mins: (parseInt(parts.hour, 10) % 24) * 60 + parseInt(parts.minute, 10),
      iso: `${parts.year}-${parts.month}-${parts.day}`,
    };
  }

  /* ---------- open status + today in hours ---------- */
  function renderStatus() {
    const el = $('#openStatus');
    if (!el) return;
    const now = brusselsNow();
    const [o, c] = HOURS[now.day];
    const t = UI[lang];
    let text;
    if (now.mins >= o && now.mins < c) {
      text = t.open(fmt(c));
      el.classList.add('is-open'); el.classList.remove('is-closed');
    } else {
      text = now.mins < o ? t.closedToday(fmt(o)) : t.closedTomorrow(fmt(HOURS[(now.day + 1) % 7][0]));
      el.classList.add('is-closed'); el.classList.remove('is-open');
    }
    $('.status-text', el).textContent = text;

    $$('#hoursList > div').forEach((row) => {
      const isToday = Number(row.dataset.day) === now.day;
      row.classList.toggle('is-today', isToday);
      if (isToday) $('dt', row).dataset.today = t.today;
    });
  }

  /* ---------- i18n ---------- */
  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach((el) => {
      if (el.dataset.nl === undefined) el.dataset.nl = el.innerHTML;
      const key = el.dataset.i18n;
      el.innerHTML = lang === 'en' && EN[key] ? EN[key] : el.dataset.nl;
    });
    $('#langToggle').textContent = lang === 'en' ? 'NL' : 'EN';
    $('#langToggle').setAttribute('aria-label', lang === 'en' ? 'Schakel naar Nederlands' : 'Switch to English');
    $('#bName').placeholder = UI[lang].namePh;
    $('#bNote').placeholder = UI[lang].notePh;
    renderServiceOptions();
    renderTimes();
    renderStatus();
    renderCounters(true);
  }

  $('#langToggle').addEventListener('click', () => {
    lang = lang === 'en' ? 'nl' : 'en';
    try { localStorage.setItem('ww-lang', lang); } catch (e) { /* ignore */ }
    applyLang();
  });

  /* ---------- nav ---------- */
  const nav = $('#nav');
  let lastY = window.scrollY;
  const actionbar = $('#actionbar');
  let formInView = false;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    nav.classList.toggle('is-hidden', y > 600 && y > lastY && !document.body.classList.contains('menu-open'));
    lastY = y;
    actionbar.classList.toggle('is-visible', y > window.innerHeight * 0.7 && !formInView);
  }
  // the action bar would cover the booking form's submit button
  new IntersectionObserver(([e]) => { formInView = e.isIntersecting; onScroll(); }, { threshold: 0.15 }).observe($('#bookForm'));
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // active section link
  const links = $$('.nav__links a');
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${e.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['ervaring', 'diensten', 'werk', 'reviews', 'bezoek'].forEach((id) => { const s = document.getElementById(id); if (s) sectionObs.observe(s); });

  // mobile menu
  const burger = $('#burger');
  const menu = $('#mobileMenu');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });

  /* ---------- reveal on scroll ---------- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  // stagger siblings that share a parent
  const groups = new Map();
  $$('.reveal').forEach((el) => {
    const p = el.parentElement;
    const i = groups.get(p) || 0;
    groups.set(p, i + 1);
    el.style.setProperty('--rd', `${Math.min(i, 6) * 0.08}s`);
    revealObs.observe(el);
  });
  $$('.hero .reveal-up').forEach((el, i) => el.style.setProperty('--rd', `${0.15 + i * 0.12}s`));
  $$('.hero .reveal').forEach((el, i) => el.style.setProperty('--rd', `${0.55 + i * 0.1}s`));
  requestAnimationFrame(() => document.body.classList.add('is-loaded'));

  /* ---------- hexagon light field ---------- */
  function hexField(host, { r = 64, cols, rows, waveFrom = 'tr' } = {}) {
    const NS = 'http://www.w3.org/2000/svg';
    const h = Math.sqrt(3) * r;
    const w = (cols - 1) * 1.5 * r + 2 * r;
    const H = rows * h + h / 2;
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${w} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.classList.add('hexfield');
    svg.innerHTML = `<defs><filter id="glow-${host.dataset.hex}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('filter', `url(#glow-${host.dataset.hex})`);
    const gap = 0.14;
    for (let c = 0; c < cols; c++) {
      for (let rr = 0; rr < rows; rr++) {
        const cx = r + c * 1.5 * r;
        const cy = h / 2 + rr * h + (c % 2 ? h / 2 : 0);
        const pts = Array.from({ length: 6 }, (_, k) => [cx + r * Math.cos(Math.PI / 3 * k), cy + r * Math.sin(Math.PI / 3 * k)]);
        const cell = document.createElementNS(NS, 'g');
        cell.setAttribute('class', 'cell');
        for (let k = 0; k < 6; k++) {
          const [x1, y1] = pts[k];
          const [x2, y2] = pts[(k + 1) % 6];
          const ln = document.createElementNS(NS, 'line');
          ln.setAttribute('x1', (x1 + (x2 - x1) * gap).toFixed(1));
          ln.setAttribute('y1', (y1 + (y2 - y1) * gap).toFixed(1));
          ln.setAttribute('x2', (x2 - (x2 - x1) * gap).toFixed(1));
          ln.setAttribute('y2', (y2 - (y2 - y1) * gap).toFixed(1));
          cell.appendChild(ln);
        }
        const ox = waveFrom === 'tr' ? cols - c : c;
        const delay = (ox + rr) * 0.09 + Math.random() * 0.5;
        cell.style.setProperty('--d', `${delay.toFixed(2)}s`);
        g.appendChild(cell);
      }
    }
    svg.appendChild(g);
    host.appendChild(svg);
    return () => $$('.cell', svg).forEach((cl) => cl.classList.add('on'));
  }

  const heroHex = $('[data-hex="hero"]');
  if (heroHex) {
    const on = hexField(heroHex, { r: 62, cols: 10, rows: 7, waveFrom: 'tr' });
    setTimeout(on, reduceMotion ? 0 : 500);
  }
  const bookHex = $('[data-hex="booking"]');
  if (bookHex) {
    const on = hexField(bookHex, { r: 70, cols: 14, rows: 7, waveFrom: 'tl' });
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { on(); o.disconnect(); } }, { threshold: 0.2 });
    o.observe(bookHex);
  }

  /* ---------- counters ---------- */
  let countersDone = false;
  function renderCounters(staticOnly) {
    $$('[data-count]').forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.dec || '0', 10);
      const show = (v) => { el.textContent = v.toLocaleString(lang === 'en' ? 'en-GB' : 'nl-BE', { minimumFractionDigits: dec, maximumFractionDigits: dec }); };
      if (staticOnly) { if (countersDone || reduceMotion) show(target); return; }
      if (reduceMotion) { show(target); return; }
      const start = performance.now();
      const dur = 1600;
      const step = (now) => {
        const p = Math.min(1, (now - start) / dur);
        show(target * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }
  const statsEl = $('.stats');
  if (statsEl) {
    const o = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      o.disconnect();
      renderCounters(false);
      countersDone = true;
    }, { threshold: 0.4 });
    o.observe(statsEl);
  }

  /* ---------- parallax panorama ---------- */
  const pano = $('[data-parallax]');
  if (pano && !reduceMotion) {
    const img = $('img', pano);
    let ticking = false;
    const update = () => {
      const rect = pano.getBoundingClientRect();
      const p = (rect.top + rect.height) / (window.innerHeight + rect.height); // 1 → 0 while scrolling past
      img.style.transform = `translate3d(0, ${(-p * 23).toFixed(2)}%, 0)`;
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- reviews carousel ---------- */
  const track = $('.carousel__track');
  $$('.carousel__nav .round').forEach((btn) => btn.addEventListener('click', () => {
    const card = $('.review', track);
    const step = card ? card.getBoundingClientRect().width + 18 : 320;
    track.scrollBy({ left: step * Number(btn.dataset.dir), behavior: reduceMotion ? 'auto' : 'smooth' });
  }));

  /* ---------- lightbox ---------- */
  const lb = $('#lightbox');
  const lbImg = $('img', lb);
  $$('.g-item').forEach((btn) => btn.addEventListener('click', () => {
    lbImg.src = btn.dataset.full;
    lbImg.alt = $('img', btn).alt;
    if (typeof lb.showModal === 'function') lb.showModal(); else window.open(btn.dataset.full, '_blank');
  }));
  $('.lightbox__close', lb).addEventListener('click', () => lb.close());
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });

  /* ---------- booking ---------- */
  const form = $('#bookForm');
  const selService = $('#bService');
  const inDate = $('#bDate');
  const selTime = $('#bTime');
  const errEl = $('#formError');

  function renderServiceOptions() {
    const current = selService.value || 'fade';
    selService.innerHTML = SERVICES.map((s) => {
      const label = `${lang === 'en' ? s.en : s.nl} — ${lang === 'en' ? (s.priceEn || s.price) : s.price}`;
      return `<option value="${s.id}">${label.replace(/&/g, '&amp;')}</option>`;
    }).join('');
    selService.value = current;
  }

  function dayOf(iso) {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).getDay();
  }

  function renderTimes() {
    const iso = inDate.value;
    const prev = selTime.value;
    selTime.innerHTML = '';
    if (!iso) return;
    const [o, c] = HOURS[dayOf(iso)];
    const now = brusselsNow();
    const earliest = iso === now.iso ? now.mins + 30 : 0;
    const slots = [];
    for (let m = o; m <= c - 30; m += 30) if (m >= earliest) slots.push(fmt(m));
    if (!slots.length) {
      selTime.innerHTML = `<option value="" disabled selected>${UI[lang].noSlots}</option>`;
      return;
    }
    selTime.innerHTML = slots.map((s) => `<option value="${s}">${s}</option>`).join('');
    if (slots.includes(prev)) selTime.value = prev;
  }

  function addDays(iso, n) {
    const [y, m, d] = iso.split('-').map(Number);
    const dt = new Date(y, m - 1, d + n);
    return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
  }

  (function initDate() {
    const now = brusselsNow();
    inDate.min = now.iso;
    inDate.max = addDays(now.iso, 60);
    // default: today if there is still a slot, otherwise tomorrow
    const lastSlot = HOURS[now.day][1] - 30;
    inDate.value = now.mins + 30 <= lastSlot ? now.iso : addDays(now.iso, 1);
  })();
  inDate.addEventListener('change', () => {
    if (inDate.value && inDate.value < inDate.min) inDate.value = inDate.min;
    renderTimes();
  });

  // clicking a service in the menu preselects it and jumps to the form
  $$('[data-service]').forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    selService.value = el.dataset.service;
    $('#boeken').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    setTimeout(() => selService.focus({ preventScroll: true }), 700);
  }));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#bName').value.trim();
    const note = $('#bNote').value.trim();
    $$('.field', form).forEach((f) => f.classList.remove('is-invalid'));
    errEl.hidden = true;
    if (!name) {
      $('#bName').closest('.field').classList.add('is-invalid');
      errEl.textContent = UI[lang].errName; errEl.hidden = false; $('#bName').focus();
      return;
    }
    if (!inDate.value || !selTime.value) {
      (inDate.value ? selTime : inDate).closest('.field').classList.add('is-invalid');
      errEl.textContent = UI[lang].errTime; errEl.hidden = false;
      return;
    }
    const svc = SERVICES.find((s) => s.id === selService.value);
    const svcLabel = `${lang === 'en' ? svc.en : svc.nl} (${lang === 'en' ? (svc.priceEn || svc.price) : svc.price})`;
    const [y, m, d] = inDate.value.split('-').map(Number);
    const dateLabel = new Date(y, m - 1, d).toLocaleDateString(lang === 'en' ? 'en-GB' : 'nl-BE', { weekday: 'long', day: 'numeric', month: 'long' });
    const text = UI[lang].msg(svcLabel, dateLabel, selTime.value, name, note);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });

  /* ---------- init ---------- */
  $('#year').textContent = new Date().getFullYear();
  applyLang();
  setInterval(renderStatus, 60 * 1000);
})();
