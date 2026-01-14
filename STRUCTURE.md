# Code Structure & Organization Guide

This document explains the architecture and organization of the website codebase.

## 🏗️ Architecture Overview

The website follows a **modular, component-based architecture** using vanilla HTML, CSS, and JavaScript. This approach ensures:

- **Maintainability**: Easy to find and update specific features
- **Scalability**: Simple to add new pages and components
- **Readability**: Clear separation of concerns
- **Performance**: No framework overhead

## 📂 Directory Structure

### HTML Pages (`*.html`)

Each page follows a consistent structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta tags, title, CSS imports -->
</head>
<body>
  <!-- Navigation component -->
  <nav class="navbar">...</nav>

  <!-- Page-specific content -->
  <main>...</main>

  <!-- Footer component -->
  <footer>...</footer>

  <!-- JavaScript imports -->
  <script src="js/main.js"></script>
</body>
</html>
```

**Pages:**
- `index.html` - Homepage with hero section
- `about.html` - Personal introduction and background
- `hobbies.html` - Hobbies and interests showcase
- `blog.html` - Blog post listings
- `projects.html` - Portfolio/projects showcase

### CSS Organization (`/css`)

CSS is split into three layers for optimal organization:

#### `main.css` - Foundation Layer
**Purpose**: Core styles that apply globally

**Contents:**
- CSS Custom Properties (variables)
- Reset/normalize styles
- Typography system
- Base element styles
- Utility classes

**Variables include:**
- Colors (primary, secondary, accent, neutrals)
- Spacing scale (margins, padding)
- Typography (font sizes, weights, families)
- Breakpoints for responsive design
- Animation timings

#### `components.css` - Component Layer
**Purpose**: Reusable UI components

**Components:**
- `.navbar` - Navigation bar
- `.hero` - Hero sections
- `.card` - Content cards (blog, projects)
- `.button` - Button styles
- `.section` - Section containers
- `.footer` - Footer component

**Naming Convention:**
- Component: `.component-name`
- Modifier: `.component-name--modifier`
- Element: `.component-name__element`

#### `pages.css` - Page Layer
**Purpose**: Page-specific styles

**Organization:**
```css
/* ==================
   Homepage Styles
   ================== */
.home-hero { ... }

/* ==================
   About Page Styles
   ================== */
.about-content { ... }

/* etc. */
```

### JavaScript Organization (`/js`)

#### `main.js` - Core Functionality
**Purpose**: Navigation, utilities, and page initialization

**Functions:**
- `initNavigation()` - Sets up mobile menu and active states
- `smoothScroll()` - Smooth scrolling to anchors
- `handleMobileMenu()` - Mobile navigation toggle
- Utility functions

#### `components.js` - Interactive Components
**Purpose**: Component-specific interactions

**Functions:**
- Card hover effects
- Animation triggers
- Form handling (when added)
- Dynamic content loading (future)

## 🎨 CSS Architecture Principles

### 1. CSS Custom Properties (Variables)

All design tokens are centralized:

```css
:root {
  /* Colors */
  --primary: #FFB3D9;

  /* Spacing (8px base scale) */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;

  /* Typography */
  --font-body: 'Inter', sans-serif;
}
```

**Benefits:**
- Change the entire theme by modifying variables
- Consistent spacing and sizing
- Easy to maintain

### 2. Mobile-First Responsive Design

Media queries build up from mobile:

```css
/* Mobile styles (default) */
.component { ... }

/* Tablet and up */
@media (min-width: 768px) { ... }

/* Desktop and up */
@media (min-width: 1024px) { ... }
```

### 3. Component Isolation

Each component is self-contained with its own namespace to avoid conflicts.

## 🔧 JavaScript Architecture

### Event-Driven Design

The JavaScript follows an event-driven pattern:

1. **Initialization** - Set up on DOM ready
2. **Event Listeners** - Attach to user interactions
3. **Handlers** - Process events and update UI
4. **Utilities** - Helper functions for common tasks

### Code Organization Pattern

```javascript
/**
 * Function description
 * @param {type} paramName - Parameter description
 * @returns {type} Return value description
 */
function functionName(paramName) {
  // Implementation
}
```

## 🎯 Design System

### Color System

**Primary Colors:**
- Used for main CTAs and brand elements
- Pastel tones for softness

**Secondary Colors:**
- Supporting elements
- Backgrounds and accents

**Neutral Colors:**
- Text, borders, backgrounds
- Ensures readability

### Typography Scale

Based on a modular scale for visual hierarchy:
- Headings: Large, bold, attention-grabbing
- Body: Readable, comfortable line-height
- Small text: Captions, labels

### Spacing Scale

8px base unit for consistent spacing:
- 0.5rem (4px) - Extra small
- 1rem (8px) - Small
- 2rem (16px) - Medium
- 3rem (24px) - Large
- 4rem (32px) - Extra large

## 🔄 Adding New Features

### Adding a New Page

1. **Create HTML file**
   ```bash
   touch new-page.html
   ```

2. **Copy structure from existing page**

3. **Add navigation link** in all HTML files:
   ```html
   <a href="new-page.html">New Page</a>
   ```

4. **Add page-specific styles** to `css/pages.css`:
   ```css
   /* ==================
      New Page Styles
      ================== */
   ```

### Adding a New Component

1. **Define styles** in `css/components.css`:
   ```css
   .new-component {
     /* Styles */
   }
   ```

2. **Add HTML structure** to relevant pages

3. **Add interactivity** in `js/components.js` if needed

### Modifying Colors/Theme

1. Open `css/main.css`
2. Locate `:root` variables
3. Modify color values
4. Changes propagate throughout the site

## 📋 Code Quality Standards

### HTML
- Use semantic HTML5 elements
- Include alt text for images
- Maintain proper heading hierarchy
- Add ARIA labels for accessibility

### CSS
- Follow BEM-like naming conventions
- Use CSS variables for reusable values
- Comment complex selectors
- Keep specificity low

### JavaScript
- Use JSDoc comments for functions
- Prefer const/let over var
- Use descriptive variable names
- Handle errors gracefully

## 🧪 Testing Checklist

When making changes:

- [ ] Test in Chrome, Firefox, Safari
- [ ] Test on mobile devices/responsive modes
- [ ] Verify navigation works on all pages
- [ ] Check console for errors
- [ ] Validate HTML (W3C validator)
- [ ] Test with keyboard navigation
- [ ] Verify color contrast for accessibility

## 📚 Learning Resources

- **HTML**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML)
- **CSS**: [CSS Tricks](https://css-tricks.com/)
- **JavaScript**: [JavaScript.info](https://javascript.info/)
- **Accessibility**: [WebAIM](https://webaim.org/)

## 🎓 Next Steps

To enhance this website:

1. **Add build process**: Use Sass/PostCSS for advanced CSS
2. **Implement CMS**: Connect to Contentful, Sanity, or similar
3. **Add analytics**: Track visitor behavior
4. **Optimize images**: Use WebP format, lazy loading
5. **Add PWA features**: Offline support, app-like experience
6. **Implement testing**: Jest for JavaScript, Pa11y for accessibility

---

This structure is designed to grow with your needs while maintaining clarity and simplicity!
