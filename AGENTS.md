# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Project Overview

This is the landing page for coolify.io, an open-source self-hostable Heroku/Netlify/Vercel alternative. The site is built with Astro, Svelte, and Tailwind CSS.

## Tech Stack Architecture

- **Framework**: Astro 4.x with Svelte integration for interactive components
- **Styling**: Tailwind CSS v4 with the Coolify graphite tokens
- **Layout**: Single main layout (`Layout.astro`) with navigation and footer
- **Components**: Svelte components for interactive elements (sponsors, pricing, etc.)
- **Build Tool**: Astro's built-in Vite-based build system
- **Package Manager**: Bun (use `bun` instead of `npm` everywhere)

## Development Commands

```bash
# Start development server
bun run dev
# or
bun start

# Build for production
bun run build

# Preview production build
bun run preview

# Install dependencies
bun install

# Run Astro CLI commands
bun run astro
```

## Project Structure

```
src/
├── components/          # Svelte interactive components
│   ├── Sponsors.svelte
│   ├── Icon.astro / Icon.svelte  # Reicon wrappers
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
└── fonts/             # Self-hosted Geist font files
```

## Key Patterns

### Styling
- Visual language matches the Coolify app "graphite" design (`DESIGN.md` in coollabsio/coolify)
- Tokens live in `src/styles/global.css` (Tailwind v4 `@theme`): `app`, `panel`, `surface`, `raised`, `fg`, `fg-dim`, `fg-faint`, `hairline`, `coollabs` purple, `warning` yellow
- Shared classes: `.btn` + `.btn-primary` / `.btn-neutral` (2px bottom edge), `.card` (subtle fill + hairline ring), `.eyebrow`
- Self-hosted Geist Sans / Geist Mono variable fonts in `public/fonts/`
- Icons: Reicon outline glyphs (same family as the app's `<x-reicon>`) from the `reicon` package. Always deep-import one icon and render it with the wrapper:
  `import Icon from "../components/Icon.astro"; import Rocket from "reicon/icons/Rocket";` then `<Icon icon={Rocket} class="size-4" />` (Svelte: `Icon.svelte`, same API). Brand logos (GitHub, Discord, X) stay inline SVGs.

### Components
- Sponsors component shuffles each tier and adds ref/UTM parameters to huge and big links
- Navigation includes mobile hamburger menu with JavaScript toggle
- Components use Svelte's reactivity for animations and state management

### Sponsors

Sponsors are not stored in this repo. `src/data/sponsors.js` loads
`https://cdn.coollabs.io/sponsors.json` (maintained in `coollabsio/coollabs-cdn`).
`src/components/Sponsors.svelte` renders all three tiers on the homepage:

- `huge`: large cards with logo, name and description (`hugeImageStyle`, `hugeCardStyle` optional)
- `big`: logo grid; `pinned` sponsors come first, `imageStyle` and `additionalContent` optional
- `small`: static avatar + name pills; `newest` adds a yellow ring, `isPublicImage` uses `object-contain`

Keep the section static: no carousels or entrance animations.

### Commit Standards
- Follow conventional commits format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, perf, test, chore, ci, revert
- Use imperative mood, lowercase, no trailing period
- Reference issues in footer when applicable

## Configuration Files

- `astro.config.mjs`: Astro configuration with Tailwind, Svelte, and sitemap
- `src/styles/global.css`: Tailwind v4 theme tokens and shared component classes
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