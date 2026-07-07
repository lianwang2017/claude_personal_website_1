/**
 * map.js — "My Journey" flight-path map (about page).
 *
 * ✏️ HOW TO EDIT: everything is driven by the JOURNEY_STOPS array below.
 * Add, remove, or reorder stops and the pins, flight paths, plane animation,
 * and story panel all update automatically.
 *
 *   x / y   — position on the map (SVG canvas is 800 × 520; 0,0 = top-left)
 *   labelDx / labelDy / labelAnchor — fine-tune where the city name sits
 *   future  — true draws the leg TO this stop in blue dashes ("up next")
 */

const JOURNEY_STOPS = [
  {
    city: 'Los Angeles, CA',
    x: 108, y: 283,
    labelDx: -8, labelDy: 30, labelAnchor: 'end',
    years: '2017 – 2022',
    title: 'USC — where it all started',
    story:
      'I grew up in Southern California and landed at USC at 17, wide-eyed and determined to figure out how things work. I fell in love with computer science — not just the logic, but the thrill of building something from nothing. I stayed for a combined BS + MS, and helped run Trojan Consulting Group along the way, advising on market analysis for companies like SpaceX’s Starlink.',
  },
  {
    city: 'Bay Area, CA',
    x: 55, y: 218,
    labelDx: 14, labelDy: -8, labelAnchor: 'start',
    years: '2022 – 2025',
    title: 'Google — the engineer era',
    story:
      'I joined Google as a software engineer on the Connected TV ads team. Writing code quickly turned into leading cross-functional projects across engineering, product, and sales — including a CTV initiative that drove a meaningful revenue increase. My proudest work? Building mentorship and onboarding programs for 80+ new grads, because everyone deserves someone in their corner.',
  },
  {
    city: 'Hartford, CT',
    x: 694, y: 152,
    labelDx: 16, labelDy: 20, labelAnchor: 'start',
    years: 'Summer 2025',
    title: 'The pivot into finance & policy',
    story:
      'The summer before Wharton, I dove headfirst into finance. At the State of Connecticut Treasurer’s Office I analyzed private markets for the state pension fund — and built an AI tool that cut manual review time by hours. At United Generations Capital I got hands-on with private equity, supporting deal evaluation and advising portfolio companies on AI.',
  },
  {
    city: 'Philadelphia, PA',
    x: 662, y: 183,
    labelDx: -12, labelDy: 22, labelAnchor: 'end',
    years: '2025 – present',
    title: 'Wharton MBA',
    story:
      'Now I’m at Wharton pursuing my MBA in Finance and Operations & Marketing. I’m part of the General Management, Marketing, Real Estate, and ETA clubs — because, true to form, I can’t pick just one thing. It’s an incredible community of people just as restless and ambitious as I am.',
  },
  {
    city: 'Cambridge, MA',
    x: 716, y: 128,
    labelDx: 12, labelDy: -10, labelAnchor: 'start',
    years: 'Fall 2026',
    title: 'Next stop: Harvard Kennedy School',
    future: true,
    story:
      'I was recently admitted to the Harvard Kennedy School of Public Policy, starting this fall. It’s my chance to explore the questions I care about most — how technology shapes communities, how capital can flow more equitably, and how we build systems that actually work for people. Boarding soon. ✈️',
  },
];

/* ------------------------------------------------------------------ */

const SVG_NS = 'http://www.w3.org/2000/svg';

document.addEventListener('DOMContentLoaded', () => {
  const svg = document.getElementById('journey-map');
  if (!svg) return;

  const layer = svg.querySelector('#map-layer');
  let activeIndex = 0;

  /* --- flight path arcs between consecutive stops --- */
  const legPaths = [];
  for (let i = 0; i < JOURNEY_STOPS.length - 1; i++) {
    const a = JOURNEY_STOPS[i];
    const b = JOURNEY_STOPS[i + 1];
    const d = arc(a, b);
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('class', 'map-flight' + (b.future ? ' map-flight--future' : ''));
    layer.appendChild(path);
    legPaths.push(path);
  }

  /* --- little plane flying the whole route --- */
  const fullRoute = legPaths.map((p) => p.getAttribute('d')).join(' ');
  const plane = document.createElementNS(SVG_NS, 'text');
  plane.setAttribute('class', 'map-plane');
  plane.textContent = '✈️';
  const motion = document.createElementNS(SVG_NS, 'animateMotion');
  motion.setAttribute('dur', '9s');
  motion.setAttribute('repeatCount', 'indefinite');
  motion.setAttribute('rotate', 'auto');
  motion.setAttribute('path', fullRoute);
  plane.appendChild(motion);
  layer.appendChild(plane);

  /* --- pins --- */
  const pins = JOURNEY_STOPS.map((stop, i) => {
    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('class', 'map-pin');
    g.setAttribute('role', 'button');
    g.setAttribute('tabindex', '0');
    g.setAttribute('aria-label', `${stop.city} — ${stop.title}`);

    const pulse = document.createElementNS(SVG_NS, 'circle');
    pulse.setAttribute('class', 'pin-pulse');
    pulse.setAttribute('cx', stop.x);
    pulse.setAttribute('cy', stop.y);
    pulse.setAttribute('r', 9);

    const dot = document.createElementNS(SVG_NS, 'circle');
    dot.setAttribute('class', 'pin-dot');
    dot.setAttribute('cx', stop.x);
    dot.setAttribute('cy', stop.y);
    dot.setAttribute('r', 7);

    const label = document.createElementNS(SVG_NS, 'text');
    label.setAttribute('x', stop.x + (stop.labelDx || 12));
    label.setAttribute('y', stop.y + (stop.labelDy || -10));
    label.setAttribute('text-anchor', stop.labelAnchor || 'start');
    label.textContent = stop.city;

    g.append(pulse, dot, label);
    g.addEventListener('click', () => select(i));
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i); }
    });
    layer.appendChild(g);
    return g;
  });

  /* --- story panel --- */
  const panel = {
    num: document.querySelector('.journey-story__num'),
    place: document.querySelector('.journey-story__place'),
    years: document.querySelector('.journey-story__years'),
    title: document.querySelector('.journey-story__title'),
    text: document.querySelector('.journey-story__text'),
    prev: document.querySelector('.journey-prev'),
    next: document.querySelector('.journey-next'),
  };

  function select(i) {
    activeIndex = i;
    const stop = JOURNEY_STOPS[i];
    pins.forEach((p, j) => p.classList.toggle('is-active', j === i));
    if (panel.num) panel.num.textContent = String(i + 1).padStart(2, '0');
    if (panel.place) panel.place.textContent = `📍 ${stop.city}`;
    if (panel.years) panel.years.textContent = stop.years;
    if (panel.title) panel.title.textContent = stop.title;
    if (panel.text) panel.text.textContent = stop.story;
  }

  if (panel.prev) panel.prev.addEventListener('click', () =>
    select((activeIndex - 1 + JOURNEY_STOPS.length) % JOURNEY_STOPS.length));
  if (panel.next) panel.next.addEventListener('click', () =>
    select((activeIndex + 1) % JOURNEY_STOPS.length));

  select(0);

  /* --- animate in when the map scrolls into view --- */
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      pins.forEach((p, i) => setTimeout(() => p.classList.add('is-dropped'), 250 + i * 320));
      legPaths.forEach((p, i) => setTimeout(() => p.classList.add('is-visible'), 400 + i * 320));
    },
    { threshold: 0.35 }
  );
  io.observe(svg);
});

/* Quadratic arc between two stops, bowed upward like a flight path */
function arc(a, b) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const lift = Math.min(70, dist * 0.22) + 12;
  return `M ${a.x} ${a.y} Q ${mx} ${my - lift} ${b.x} ${b.y}`;
}
