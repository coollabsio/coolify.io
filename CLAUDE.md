# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the landing page for coolify.io, an open-source self-hostable Heroku/Netlify/Vercel alternative. The site is built with Astro, Svelte, and Tailwind CSS.

## Tech Stack Architecture

- **Framework**: Astro 4.x with Svelte integration for interactive components
- **Styling**: Tailwind CSS with DaisyUI components and custom Coollabs theme
- **Layout**: Single main layout (`Layout.astro`) with navigation and footer
- **Components**: Svelte components for interactive elements (sponsors, pricing, etc.)
- **Build Tool**: Astro's built-in Vite-based build system

## Development Commands

```bash
# Start development server
npm run dev
# or
npm start

# Build for production
npm run build

# Preview production build
npm run preview

# Run Astro CLI commands
npm run astro
```

## Project Structure

```
src/
├── components/          # Svelte interactive components
│   ├── BigSponsors.svelte
│   ├── SmallSponsors.svelte  
│   ├── Contributors.svelte
│   ├── Pricing/Plans.svelte
│   └── Footer.astro
├── layouts/Layout.astro # Main page layout with navigation
└── pages/              # Astro pages (file-based routing)
    ├── index.astro     # Homepage
    ├── pricing.astro
    ├── cloud.astro
    └── [other pages]

public/
├── images/             # Sponsor logos and assets
└── fonts/             # Self-hosted Inter font files
```

## Key Patterns

### Styling
- Uses custom Coollabs color palette defined in `tailwind.config.cjs`
- DaisyUI theme called "coollabs" with dark color scheme
- Custom CSS variables: `coolblack`, `coolgray-*`, `coollabs` purple variants
- Self-hosted Inter font with multiple weights

### Components
- Sponsor components dynamically shuffle and add UTM parameters to links
- Navigation includes mobile hamburger menu with JavaScript toggle
- Components use Svelte's reactivity for animations and state management

### Adding Sponsors

**SmallSponsors Component** (`src/components/SmallSponsors.svelte`):
1. Add new sponsor object to the `sponsors` array at the top
2. Required fields:
   - `name`: Sponsor name
   - `url`: Link to sponsor website (can include `?utm_source=coolify.io` for tracking)
   - `imageUrl`: GitHub avatar URL (`https://github.com/username.png`) or path to image in `/public/images/`
3. Optional fields:
   - `newest: true`: Adds animated rainbow border to highlight new sponsors (remove from previous sponsors when adding new ones)
   - `isPublicImage: true`: For logos stored in `/public/images/`
   - `isSpecial: true`: For special styling (e.g., "Become a sponsor" button)
   - `customStyle`: Custom CSS classes for the image
   - `width`/`height`: Custom dimensions (default: 45px)

**Example:**
```javascript
{
  name: "Company Name",
  url: "https://example.com/",
  imageUrl: "https://github.com/username.png",
  newest: true,
}
```

**BigSponsors Component** (`src/components/BigSponsors.svelte`):
- Similar structure for larger sponsor logos
- Typically displayed more prominently on the homepage

### Commit Standards
- Follow conventional commits format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, perf, test, chore, ci, revert
- Use imperative mood, lowercase, no trailing period
- Reference issues in footer when applicable

## Configuration Files

- `astro.config.mjs`: Astro configuration with Tailwind, Svelte, and sitemap
- `tailwind.config.cjs`: Tailwind with DaisyUI and custom Coollabs theme
- `tsconfig.json`: Basic TypeScript config extending Astro base
- `.cursor/rules/commit.mdc`: Detailed commit message guidelines

## SEO & Meta

The Layout component includes comprehensive meta tags for:
- Twitter Cards and Open Graph
- Progressive Web App manifest
- Multiple favicon sizes
- Canonical URLs and sitemaps

## Analytics

Uses Plausible analytics hosted at `analytics.coollabs.io` with custom event tracking for sponsor clicks and other interactions.