/**
 * CAROUSEL.JS - Identity Carousel
 * ================================
 * Rotates through images and text on the homepage hero.
 */

(function () {
  const images = document.querySelectorAll('.carousel__image');
  const texts = document.querySelectorAll('.carousel__text');

  if (!images.length || !texts.length) return;

  let current = 0;
  const total = images.length;
  const INTERVAL = 5000; // 5 seconds per slide

  function next() {
    // Remove active class from current
    images[current].classList.remove('carousel__image--active');
    texts[current].classList.remove('carousel__text--active');

    // Advance index
    current = (current + 1) % total;

    // Add active class to next
    images[current].classList.add('carousel__image--active');
    texts[current].classList.add('carousel__text--active');
  }

  setInterval(next, INTERVAL);
})();
