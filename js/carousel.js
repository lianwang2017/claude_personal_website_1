/**
 * carousel.js — polaroid photo carousel on the homepage hero.
 * Cycles through the illustrated "Janes" with handwritten captions.
 * Pauses while hovered; dots allow manual navigation.
 */

(function () {
  const frame = document.querySelector('.polaroid__frame');
  if (!frame) return;

  const images = frame.querySelectorAll('img');
  const caption = document.querySelector('.polaroid__caption');
  const dotsWrap = document.querySelector('.polaroid__dots');
  if (!images.length) return;

  const INTERVAL = 3600;
  let current = 0;
  let paused = false;

  // Build one dot per image
  const dots = [...images].map((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Show photo ${i + 1}`);
    dot.addEventListener('click', () => show(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function show(i) {
    images[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    current = i;
    images[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    if (caption) caption.textContent = images[current].dataset.caption || '';
  }

  show(0);

  setInterval(() => {
    if (!paused) show((current + 1) % images.length);
  }, INTERVAL);

  const stack = document.querySelector('.polaroid-stack');
  if (stack) {
    stack.addEventListener('mouseenter', () => (paused = true));
    stack.addEventListener('mouseleave', () => (paused = false));
  }
})();
