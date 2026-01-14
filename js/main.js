/**
 * MAIN.JS - Core JavaScript Functionality
 * ========================================
 * Navigation, utilities, and page initialization.
 * Vanilla JavaScript (ES6+) - no dependencies required.
 */


/* ==================
   DOM Ready Initialization
   ================== */

/**
 * Initialize all functionality when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSmoothScroll();
  setActiveNavLink();
});


/* ==================
   Navigation Functions
   ================== */

/**
 * Initialize navigation functionality
 * Sets up mobile menu toggle and responsive behavior
 */
function initNavigation() {
  const toggle = document.querySelector('.navbar__toggle');
  const nav = document.querySelector('.navbar__nav');

  if (!toggle || !nav) return;

  // Toggle mobile menu on button click
  toggle.addEventListener('click', () => {
    nav.classList.toggle('navbar__nav--open');
    toggle.setAttribute(
      'aria-expanded',
      nav.classList.contains('navbar__nav--open')
    );
  });

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.navbar__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        nav.classList.remove('navbar__nav--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && nav.classList.contains('navbar__nav--open')) {
      nav.classList.remove('navbar__nav--open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Handle window resize - close mobile menu on desktop
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 768) {
        nav.classList.remove('navbar__nav--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }, 250);
  });
}


/**
 * Set active navigation link based on current page
 * Highlights the current page in the navigation menu
 */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar__link');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');

    // Check if this link matches the current page
    if (linkPage === currentPage ||
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === '/' && linkPage === 'index.html')) {
      link.classList.add('navbar__link--active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('navbar__link--active');
      link.removeAttribute('aria-current');
    }
  });
}


/* ==================
   Smooth Scrolling
   ================== */

/**
 * Initialize smooth scrolling for anchor links
 * Enables smooth scroll to sections within the page
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      // Skip if href is just "#"
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        // Calculate offset for fixed header
        const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL without jumping
        history.pushState(null, '', targetId);
      }
    });
  });
}


/* ==================
   Utility Functions
   ================== */

/**
 * Debounce function to limit function execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}


/**
 * Throttle function to limit function execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}


/**
 * Check if an element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


/**
 * Animate elements when they scroll into view
 * Usage: Add 'data-animate' attribute to elements you want to animate
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animationClass = entry.target.getAttribute('data-animate');
        entry.target.classList.add(animationClass);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Initialize scroll animations if elements exist
if (document.querySelectorAll('[data-animate]').length > 0) {
  initScrollAnimations();
}


/* ==================
   Form Handling (for future use)
   ================== */

/**
 * Basic form validation helper
 * @param {HTMLFormElement} form - Form element to validate
 * @returns {boolean} True if form is valid
 */
function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('error');

      // Remove error class on input
      field.addEventListener('input', () => {
        field.classList.remove('error');
      }, { once: true });
    }
  });

  return isValid;
}


/* ==================
   Theme Toggle (for future implementation)
   ================== */

/**
 * Toggle between light and dark themes
 * Currently a placeholder for future dark mode implementation
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

/**
 * Load saved theme preference
 */
function loadThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
}


/* ==================
   Performance Utilities
   ================== */

/**
 * Lazy load images for better performance
 * Usage: Use data-src instead of src for images
 */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if images exist
if (document.querySelectorAll('img[data-src]').length > 0) {
  initLazyLoading();
}


/* ==================
   Export for Module Use (optional)
   ================== */

// If using as a module, export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    debounce,
    throttle,
    isInViewport,
    validateForm,
    toggleTheme
  };
}
