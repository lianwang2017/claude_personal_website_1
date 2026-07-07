/**
 * main.js — nav toggle, active link, scroll reveal, hero word rotator
 * Vanilla JS, no dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initRotator();
});

/* Mobile nav toggle + current-page marker */
function initNav() {
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Mark the current page in the nav
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach((a) => {
    const target = a.getAttribute('href');
    if (target === here) a.setAttribute('aria-current', 'page');
  });
}

/* Reveal-on-scroll for any element with .reveal */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  els.forEach((el) => io.observe(el));
}

/* Rotating word in the hero — reads phrases from data-phrases (JSON array) */
function initRotator() {
  const el = document.querySelector('.rotator');
  if (!el) return;

  let phrases;
  try {
    phrases = JSON.parse(el.dataset.phrases);
  } catch {
    return;
  }
  if (!Array.isArray(phrases) || phrases.length < 2) return;

  let i = 0;
  setInterval(() => {
    el.classList.add('is-swapping');
    setTimeout(() => {
      i = (i + 1) % phrases.length;
      el.textContent = phrases[i];
      el.classList.remove('is-swapping');
    }, 300);
  }, 2600);
}
