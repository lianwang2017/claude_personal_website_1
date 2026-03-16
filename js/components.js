/**
 * COMPONENTS.JS - Interactive Component Behaviors
 * ================================================
 * Component-specific interactions and animations.
 * This file handles the interactive elements of UI components.
 */


/* ==================
   Card Interactions
   ================== */

/**
 * Enhanced card hover effects
 * Adds subtle parallax and tilt effects to cards
 */
function initCardEffects() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    // Add subtle tilt effect on mouse move
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 1024) return; // Skip on mobile/tablet

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    // Reset on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Initialize card effects when DOM is ready
document.addEventListener('DOMContentLoaded', initCardEffects);


/* ==================
   Button Interactions
   ================== */

/**
 * Add ripple effect to buttons
 * Creates a Material Design-like ripple on click
 */
function initButtonRipples() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple element
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();

      // Calculate position
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      // Style ripple
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      // Add to button
      this.appendChild(ripple);

      // Remove after animation
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// Add ripple CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Initialize button ripples when DOM is ready
document.addEventListener('DOMContentLoaded', initButtonRipples);


/* ==================
   Tag/Badge Interactions
   ================== */

/**
 * Make tags clickable (for future filtering functionality)
 */
function initTagInteractions() {
  const tags = document.querySelectorAll('.tag');

  tags.forEach(tag => {
    tag.style.cursor = 'pointer';

    tag.addEventListener('click', function() {
      // Placeholder for future filtering functionality
      const tagText = this.textContent.trim();
      console.log(`Tag clicked: ${tagText}`);

      // Visual feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
}

// Initialize tag interactions when DOM is ready
document.addEventListener('DOMContentLoaded', initTagInteractions);


/* ==================
   Image Loading & Error Handling
   ================== */

/**
 * Handle image loading with graceful fallbacks
 * Shows loading state and handles errors
 */
function initImageHandling() {
  const images = document.querySelectorAll('img:not(.carousel__image):not(.about-profile__image)');

  images.forEach(img => {
    // Add loading class
    img.classList.add('loading');

    // Handle successful load
    img.addEventListener('load', function() {
      this.classList.remove('loading');
      this.classList.add('loaded');
    });

    // Handle load error with placeholder
    img.addEventListener('error', function() {
      this.classList.remove('loading');
      this.classList.add('error');

      // Set a placeholder background if image fails to load
      this.style.background = 'linear-gradient(135deg, #FFD9EC, #D9F3FF)';
      this.style.display = 'block';
    });
  });
}

// Add image handling CSS
const imageStyle = document.createElement('style');
imageStyle.textContent = `
  img.loading {
    opacity: 0;
    transition: opacity 0.3s ease-in;
  }
  img.loaded {
    opacity: 1;
  }
  img.error {
    opacity: 0.5;
  }
`;
document.head.appendChild(imageStyle);

// Initialize image handling when DOM is ready
document.addEventListener('DOMContentLoaded', initImageHandling);


/* ==================
   Scroll Progress Indicator
   ================== */

/**
 * Show reading progress on blog posts
 * Creates a progress bar at the top of the page
 */
function initScrollProgress() {
  // Only initialize on blog or article pages
  if (!document.querySelector('.blog-card') && !document.querySelector('article')) {
    return;
  }

  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress');
  document.body.appendChild(progressBar);

  // Update progress on scroll
  const updateProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;

    progressBar.style.width = progress + '%';
  };

  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateProgress);
  });

  // Initial update
  updateProgress();
}

// Add scroll progress CSS
const scrollProgressStyle = document.createElement('style');
scrollProgressStyle.textContent = `
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    z-index: var(--z-fixed);
    transition: width 0.1s ease-out;
    width: 0%;
  }
`;
document.head.appendChild(scrollProgressStyle);

// Initialize scroll progress when DOM is ready
document.addEventListener('DOMContentLoaded', initScrollProgress);


/* ==================
   Tooltip Component
   ================== */

/**
 * Simple tooltip for elements with data-tooltip attribute
 * Usage: <element data-tooltip="Tooltip text">Content</element>
 */
function initTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');

  tooltipElements.forEach(element => {
    let tooltip;

    element.addEventListener('mouseenter', function() {
      const tooltipText = this.getAttribute('data-tooltip');

      tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.textContent = tooltipText;

      document.body.appendChild(tooltip);

      const rect = this.getBoundingClientRect();
      tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';

      setTimeout(() => tooltip.classList.add('tooltip--visible'), 10);
    });

    element.addEventListener('mouseleave', function() {
      if (tooltip) {
        tooltip.classList.remove('tooltip--visible');
        setTimeout(() => tooltip.remove(), 200);
      }
    });
  });
}

// Add tooltip CSS
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
  .tooltip {
    position: absolute;
    background-color: var(--text-primary);
    color: var(--white);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-sm);
    white-space: nowrap;
    z-index: var(--z-tooltip);
    opacity: 0;
    transform: translateY(4px);
    transition: all var(--transition-fast);
    pointer-events: none;
  }
  .tooltip--visible {
    opacity: 1;
    transform: translateY(0);
  }
  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: var(--text-primary);
  }
`;
document.head.appendChild(tooltipStyle);

// Initialize tooltips when DOM is ready
document.addEventListener('DOMContentLoaded', initTooltips);


/* ==================
   Back to Top Button
   ================== */

/**
 * Show "back to top" button when scrolling down
 */
function initBackToTop() {
  // Create button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.classList.add('back-to-top');
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopBtn);

  // Show/hide based on scroll position
  const toggleButton = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('back-to-top--visible');
    } else {
      backToTopBtn.classList.remove('back-to-top--visible');
    }
  };

  window.addEventListener('scroll', toggleButton);

  // Scroll to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Add back to top CSS
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
  .back-to-top {
    position: fixed;
    bottom: var(--spacing-lg);
    right: var(--spacing-lg);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary);
    color: var(--white);
    border: none;
    font-size: var(--font-xl);
    cursor: pointer;
    box-shadow: var(--shadow-lg);
    z-index: var(--z-fixed);
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all var(--transition-base);
  }
  .back-to-top--visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .back-to-top:hover {
    background-color: var(--primary-dark);
    transform: translateY(-4px);
  }
  .back-to-top:active {
    transform: translateY(0);
  }
`;
document.head.appendChild(backToTopStyle);

// Initialize back to top when DOM is ready
document.addEventListener('DOMContentLoaded', initBackToTop);


/* ==================
   Export for Module Use (optional)
   ================== */

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initCardEffects,
    initButtonRipples,
    initTagInteractions,
    initImageHandling,
    initScrollProgress,
    initTooltips,
    initBackToTop
  };
}
