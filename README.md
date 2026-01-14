# Personal Website

A sleek, modern, and creative personal website with playful elements and a pastel color palette.

## 🎨 Design Philosophy

- **Clean & Smooth**: Minimalist design with smooth transitions and animations
- **Playful & Cute**: Rounded corners, soft colors, and delightful micro-interactions
- **Pastel Palette**: Soft pinks, blues, purples, and mint greens
- **Modern**: Contemporary design patterns with responsive layout

## 📁 Project Structure

```
/
├── index.html          # Homepage with hero section
├── about.html          # About page
├── hobbies.html        # Hobbies showcase
├── blog.html           # Blog post listings
├── projects.html       # Projects showcase
├── css/
│   ├── main.css        # Core styles, CSS variables, typography
│   ├── components.css  # Reusable component styles
│   └── pages.css       # Page-specific styles
├── js/
│   ├── main.js         # Navigation and utility functions
│   └── components.js   # Interactive components
├── images/             # Image assets
├── README.md           # This file
└── STRUCTURE.md        # Detailed code organization guide
```

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd claude_personal_website_1
   ```

2. **Run locally**
   - **Option 1**: Open `index.html` directly in your browser
   - **Option 2**: Use a local server (recommended)
     ```bash
     # Using Python 3
     python3 -m http.server 8000

     # Using Python 2
     python -m SimpleHTTPServer 8000

     # Using Node.js (if you have http-server installed)
     npx http-server
     ```

3. **Access the website**
   - Open your browser to `http://localhost:8000`

## 🎨 Customization Guide

### Changing Colors

All colors are defined as CSS variables in `css/main.css`:

```css
:root {
  --primary: #FFB3D9;      /* Soft pink */
  --secondary: #B5E8FF;    /* Sky blue */
  --accent: #D4B5FF;       /* Lavender */
  --mint: #B5FFD9;         /* Mint green */
  /* ... more variables */
}
```

Simply modify these values to change the entire color scheme!

### Adding New Pages

1. Create a new HTML file (e.g., `contact.html`)
2. Copy the structure from an existing page
3. Update the navigation in all pages to include your new page
4. Add page-specific styles to `css/pages.css`

### Adding Blog Posts

Blog posts are currently static HTML. To add a new post:
1. Create the post content in `blog.html`
2. Follow the existing card structure
3. Style it using the `.blog-card` class

For a dynamic blog, consider integrating with a headless CMS or static site generator in the future.

## 📝 Code Documentation

- All CSS classes are clearly named with BEM-like conventions
- JavaScript functions include JSDoc comments
- HTML structure uses semantic elements
- Inline comments explain complex logic

## 🔧 Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Flexbox, Grid
- **Vanilla JavaScript**: No frameworks for simplicity and performance
- **Responsive**: Mobile-first approach

## 🌟 Features

- ✅ Fully responsive design
- ✅ Smooth page transitions
- ✅ Accessible navigation
- ✅ Modular, maintainable code
- ✅ Well-documented codebase
- ✅ Easy to customize

## 📚 Future Enhancements

Consider adding:
- Blog backend (headless CMS integration)
- Contact form with backend
- Image galleries
- Dark mode toggle
- Animation libraries for enhanced effects
- Build process (Sass, PostCSS, bundling)

## 📄 License

Personal project - customize as needed!

## 🤝 Contributing

This is a personal website, but feel free to use it as a template for your own projects!
