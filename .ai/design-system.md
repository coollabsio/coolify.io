# Coolify Design System

Framework-agnostic visual specification extracted from [coolify.io](https://coolify.io). Use this document to reproduce the Coolify look in any application with any CSS framework. Dark-only theme; no light mode.

---

## 1. CSS Custom Properties

Drop this `:root` block into any project to get all Coolify tokens as CSS variables.

```css
:root {
  /* Brand */
  --color-brand:            #6B16ED;
  --color-brand-bright:     #7317FF;

  /* Surfaces (darkest to lightest) */
  --color-base:             #101010;
  --color-surface-100:      #181818;
  --color-surface-200:      #202020;
  --color-surface-300:      #242424;
  --color-surface-400:      #282828;
  --color-surface-500:      #323232;

  /* Text */
  --color-text-primary:     #FFFFFF;
  --color-text-secondary:   #a3a3a3;   /* neutral-400 */
  --color-text-tertiary:    #737373;   /* neutral-500 / gray-500 */
  --color-text-accent:      #FCD34D;   /* warning yellow */

  /* Semantic */
  --color-info:             #2563EB;
  --color-success:          #16A34A;
  --color-warning:          #FCD34D;
  --color-error:            #DC2626;

  /* Typography */
  --font-family:            "Inter", sans-serif;
  --font-mono:              ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Border radius */
  --radius-sm:              0.25rem;   /* rounded */
  --radius-md:              0.5rem;    /* rounded-lg */
  --radius-lg:              0.75rem;   /* rounded-xl */
  --radius-full:            9999px;    /* rounded-full */

  /* Shadows */
  --shadow-card-hover:      0 20px 25px -5px rgba(0,0,0,0.3),
                            0 10px 10px -5px rgba(0,0,0,0.1),
                            0 0 0 1px rgba(96,165,250,0.2);

  /* Transitions */
  --ease-default:           cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast:          100ms;
  --duration-normal:        200ms;
  --duration-slow:          300ms;
}
```

---

## 2. Color Tokens

### Brand

| Token | Tailwind | Hex | Usage |
|-------|----------|-----|-------|
| Brand purple | `bg-coollabs` / `border-coollabs` | `#6B16ED` | Borders, hover fills, CTA accents |
| Brand purple bright | `bg-coollabs-100` / `text-coollabs-100` | `#7317FF` | Active tabs, checkmark fills |

### Surfaces / Backgrounds

| Token | Tailwind | Hex | Usage |
|-------|----------|-----|-------|
| Base | `base-100` (DaisyUI) | `#101010` | Page background |
| Surface 100 | `bg-coolgray-100` / `bg-coolblack` | `#181818` | Table headers, toggle containers |
| Surface 200 | `bg-coolgray-200` | `#202020` | Cards, stat boxes |
| Surface 300 | `bg-coolgray-300` | `#242424` | Buttons, code blocks, mobile menu, badges |
| Surface 400 | `bg-coolgray-400` | `#282828` | Button hover, card borders |
| Surface 500 | `bg-coolgray-500` | `#323232` | Dividers, misc |

**Opacity variants used:** `bg-coolgray-200/70` (cards), `bg-coolgray-300/60` (badges), `bg-coollabs/30` (CTA bg), `bg-black/90` (tooltips).

### Text

| Token | Tailwind | CSS | Usage |
|-------|----------|-----|-------|
| Primary | `text-white` | `color: #fff` | Headings, body, buttons |
| Secondary | `text-neutral-400` | `color: #a3a3a3` | Descriptions, subtitles, table values |
| Tertiary | `text-neutral-300` | `color: #d4d4d4` | FAQ answers |
| Accent | `text-warning` | `color: #FCD34D` | Highlights, icons, stat numbers, accent punctuation |
| Muted | `text-gray-400` | `color: #9ca3af` | Footer social icons |
| Muted hover | `text-gray-500` | `color: #6b7280` | Footer social icons hover |

### Semantic

| Token | Tailwind | Hex | Usage |
|-------|----------|-----|-------|
| Info | `text-info` / `bg-info` | `#2563EB` | Informational |
| Success | `text-success` / `bg-success` | `#16A34A` | Success states |
| Warning | `text-warning` / `bg-warning` | `#FCD34D` | Accent, highlights, icons |
| Error | `text-error` / `bg-error` | `#DC2626` | Error states |

---

## 3. Typography

### Font

- **Family:** `"Inter", sans-serif`
- **Loading:** Self-hosted variable-weight WOFF2 with `font-display: swap` and `unicode-range` subsetting
- **Weights available:** 100–900 (variable font, single file per subset)
- **Subsets:** Two files — `inter-latin.woff2` (Basic Latin + common symbols) and `inter-latin-ext.woff2` (Latin Extended)

```css
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("/fonts/inter-latin-ext.woff2") format("woff2");
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7,
    U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F,
    U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F,
    U+A720-A7FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("/fonts/inter-latin.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
    U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122,
    U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

### Scale

| Role | Tailwind | CSS | Notes |
|------|----------|-----|-------|
| Hero heading | `text-3xl md:text-6xl font-bold tracking-tight` | `font-size: 1.875rem / 3.75rem; font-weight: 700; letter-spacing: -0.025em` | Main page title |
| Section heading | `text-4xl font-bold` or `text-2xl font-medium` | `font-size: 2.25rem / 1.5rem; font-weight: 700 / 500` | "Features", "FAQ" |
| Subsection heading | `text-xl font-semibold` | `font-size: 1.25rem; font-weight: 600` | Feature titles, contributor sections |
| Card heading | `text-2xl font-medium` | `font-size: 1.5rem; font-weight: 500` | Pricing card titles |
| Body | `text-base` or `text-sm leading-6` | `font-size: 1rem / 0.875rem; line-height: 1.5rem` | Descriptions, features |
| Small | `text-xs` | `font-size: 0.75rem` | Labels, captions, footer copyright |
| Mono | `font-mono` | `font-family: var(--font-mono)` | Stats, code blocks |

### Text Colors by Role

```css
/* Primary text (headings, buttons, nav) */
color: #fff;

/* Secondary text (descriptions, subtitles) */
color: #a3a3a3;

/* Accent text (highlights, icons, stat values) */
color: #FCD34D;

/* Accent punctuation pattern (period after heading) */
.accent-dot { color: #FCD34D; }
/* e.g. "Self-hosting with superpowers<span class="accent-dot">.</span>" */
```

---

## 4. Spacing & Layout

### Containers

| Element | Tailwind | CSS | Usage |
|---------|----------|-----|-------|
| Main content | `max-w-6xl mx-auto` | `max-width: 72rem; margin: 0 auto` | Primary page container |
| Footer | `max-w-7xl mx-auto` | `max-width: 80rem; margin: 0 auto` | Footer wrapper |
| Narrow content | `max-w-4xl mx-auto` | `max-width: 56rem; margin: 0 auto` | Subtitle text |
| FAQ | `max-w-3xl mx-auto` | `max-width: 48rem; margin: 0 auto` | FAQ section |
| Feature grid | `max-w-2xl lg:max-w-none` | `max-width: 42rem / none` | Feature list |

### Standard Spacing

| Pattern | Tailwind | CSS |
|---------|----------|-----|
| Page top padding | `pt-12 md:pt-24` | `padding-top: 3rem / 6rem` |
| Section gap | `mt-16` | `margin-top: 4rem` |
| Card padding | `p-6` | `padding: 1.5rem` |
| Button padding | `px-4 py-2` | `padding: 0.5rem 1rem` |
| Large button padding | `p-4 px-10` | `padding: 1rem 2.5rem` |
| Inline gap | `gap-2` | `gap: 0.5rem` |
| Card gap | `gap-8` | `gap: 2rem` |
| List item spacing | `space-y-4` | row gap `1rem` per item |
| Section bottom | `pb-10` | `padding-bottom: 2.5rem` |
| Horizontal page padding | `px-4` | `padding-left/right: 1rem` |

### Grid Patterns

```css
/* 2-column cards (pricing) */
display: grid;
grid-template-columns: repeat(1, 1fr);        /* mobile */
grid-template-columns: repeat(2, 1fr);        /* lg: 1024px+ */
gap: 2rem;

/* 3-column features */
display: grid;
grid-template-columns: repeat(1, 1fr);        /* mobile */
grid-template-columns: repeat(3, 1fr);        /* lg: 1024px+ */
gap: 2rem 2rem;

/* 6-column contributors */
display: grid;
grid-template-columns: repeat(2, 1fr);        /* mobile */
grid-template-columns: repeat(3, 1fr);        /* sm: 640px+ */
grid-template-columns: repeat(4, 1fr);        /* md: 768px+ */
grid-template-columns: repeat(6, 1fr);        /* lg: 1024px+ */
gap: 1.5rem;

/* Auto-fit sponsors */
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));   /* desktop */
grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));   /* mobile */
gap: 1.5rem;
```

### Breakpoints

| Name | Tailwind prefix | Min-width |
|------|-----------------|-----------|
| Small | `sm:` | `640px` |
| Medium | `md:` | `768px` |
| Large | `lg:` | `1024px` |
| Extra-large | `xl:` | `1280px` |

---

## 5. Borders & Radii

### Border Radius

| Token | Tailwind | CSS | Usage |
|-------|----------|-----|-------|
| Default | `rounded` | `border-radius: 0.25rem` | Buttons, nav links, badges, toggles |
| Medium | `rounded-lg` | `border-radius: 0.5rem` | Cards |
| Large | `rounded-xl` | `border-radius: 0.75rem` | Stat cards |
| Full | `rounded-full` | `border-radius: 9999px` | Avatars, pill buttons, floating action |

### Border Colors

| Token | Tailwind | Hex | Usage |
|-------|----------|-----|-------|
| Brand | `border-coollabs` | `#6B16ED` | CTA buttons, sponsor card hover |
| Subtle | `border-coolgray-300` | `#242424` | Table dividers, FAQ dividers |
| Card | `border-coolgray-400` | `#282828` | Stat card default |
| Card hover | `border-coolgray-300` | `#242424` | Stat card hover |
| Accent | `border-warning` | `#FCD34D` | Special sponsor CTA |

### Border Styles

| Style | Usage |
|-------|-------|
| `solid` (default) | Most borders |
| `dotted` | Sponsor cards default, decorative underlines (`decoration-dotted`) |
| `dashed` | Special sponsor CTA button |
| `divide-y divide-coolgray-300` | Table rows, FAQ items |
| `border-y border-coolgray-300` | FAQ container top+bottom border |

---

## 6. Shadows & Effects

### Shadows

```css
/* Card hover (sponsor cards) */
box-shadow:
  0 20px 25px -5px rgba(0, 0, 0, 0.3),
  0 10px 10px -5px rgba(0, 0, 0, 0.1),
  0 0 0 1px rgba(96, 165, 250, 0.2);

/* Floating action button */
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);   /* shadow-lg */
```

### Backdrop & Filters

```css
/* Navbar frosted glass */
backdrop-filter: blur(12px);

/* Sponsor cards */
backdrop-filter: blur(10px);

/* Sponsor images - default */
filter: brightness(0.9) contrast(1.1);

/* Sponsor images - hover */
filter: brightness(1) contrast(1.2);
```

### Opacity Patterns

| Pattern | Tailwind | CSS |
|---------|----------|-----|
| Card background | `bg-coolgray-200/70` | `background: rgba(32, 32, 32, 0.7)` |
| Badge background | `bg-coolgray-300/60` | `background: rgba(36, 36, 36, 0.6)` |
| CTA background | `bg-coollabs/30` | `background: rgba(107, 22, 237, 0.3)` |
| Tooltip background | `bg-black/90` | `background: rgba(0, 0, 0, 0.9)` |

---

## 7. Animations & Transitions

### Standard Transitions

```css
/* Default element transition */
transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);     /* duration-100 */
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);     /* duration-200 */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);     /* duration-300 */

/* Color-only transition */
transition: color 0.15s ease, background-color 0.15s ease;  /* transition-colors */

/* Transform-only transition */
transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);   /* transition-transform */

/* Opacity-only transition */
transition: opacity 0.15s ease;                               /* transition-opacity */
```

### Hover Transforms

```css
/* Avatar/icon scale */
transform: scale(1.1);                              /* hover:scale-110 */

/* Sponsor card lift */
transform: translateY(-8px) scale(1.02);

/* Sponsor image zoom */
transform: scale(1.1);

/* Link arrow nudge */
transform: translateX(0.25rem);                      /* hover:translate-x-1 */
```

### Keyframe Animations

```css
/* Slide in from bottom (sponsor cards on mount) */
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* Usage: animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards; */
/* Stagger: animation-delay: calc(index * 50ms); */

/* Rainbow border rotation */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Gradient shift (special sponsor card) */
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}

/* Pulse (special icon) */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.1); }
}

/* Wiggle */
@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50%      { transform: rotate(3deg); }
}
```

### FAQ Chevron

```css
/* Closed state */
.chevron { transition: transform 0.2s ease; }

/* Open state */
.chevron.open { transform: rotate(180deg); }
```

---

## 8. Components

### 8.1 Button — Primary

The default action button used across the site.

**Tailwind:**
```html
<a class="bg-coolgray-300 hover:bg-coolgray-400 text-white px-4 py-2 text-base font-semibold leading-6 rounded">
  Button Text
</a>
```

**Plain CSS:**
```css
.btn-primary {
  background: #242424;
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
}
.btn-primary:hover {
  background: #282828;
}
```

### 8.2 Button — Large (CTA)

Used for primary call-to-action in pricing cards and hero.

**Tailwind:**
```html
<a class="text-base font-medium rounded p-4 px-10 text-white bg-coolgray-300 hover:bg-coolgray-400 flex justify-center items-center gap-2">
  <svg class="w-6 h-6 hidden sm:block">...</svg>
  Start Self-hosting
</a>
```

**Plain CSS:**
```css
.btn-cta {
  background: #242424;
  color: #fff;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
}
.btn-cta:hover {
  background: #282828;
}
.btn-cta svg {
  width: 1.5rem;
  height: 1.5rem;
}
```

### 8.3 Button — Accent (Cloud CTA)

Purple-bordered button for the "To Cloud" action.

**Tailwind:**
```html
<a class="p-2 px-4 rounded text-white border border-coollabs hover:bg-coollabs bg-coollabs/30 font-semibold">
  To Cloud
</a>
```

**Plain CSS:**
```css
.btn-accent {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  color: #fff;
  font-weight: 600;
  border: 1px solid #6B16ED;
  background: rgba(107, 22, 237, 0.3);
  cursor: pointer;
  transition: background 0.15s ease;
}
.btn-accent:hover {
  background: #6B16ED;
}
```

### 8.4 Navbar / Header

Sticky, semi-transparent navbar with frosted-glass backdrop blur. Yellow accent icons next to white link text.

#### Container (`<nav>`)

**Tailwind:**
```html
<nav class="sticky top-0 z-50 bg-[rgba(16,16,16,0.8)] backdrop-blur-[12px] border-b border-[rgba(36,36,36,0.5)]">
  <div class="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
    <!-- logo left, links right -->
  </div>
</nav>
```

**Plain CSS:**
```css
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(16, 16, 16, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(36, 36, 36, 0.5);
}
.navbar-inner {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}
```

#### Logo (left side)

Text-based, no image.

**Tailwind:**
```html
<a class="text-xl font-bold tracking-tight text-white">coolify</a>
```

**Plain CSS:**
```css
.navbar-logo {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #fff;
}
```

#### Desktop nav links + To Cloud (right side, hidden below xl)

Desktop inline links are shown on `xl+` (1280px+) with "To Cloud" CTA as the last item. Each link has a yellow icon to the left of white text.

**Tailwind:**
```html
<div class="hidden xl:flex items-center gap-1">
  <a class="navbar-link relative gap-4">
    <svg class="size-5 text-warning">...</svg>
    Link Text
  </a>
  <!-- "To Cloud" as last item -->
  <a class="p-2 px-4 rounded text-white border border-coollabs hover:bg-coollabs bg-coollabs/30 font-semibold">
    To Cloud
  </a>
</div>
```

#### Mobile hamburger button (visible only below xl)

**Tailwind:**
```html
<button class="xl:hidden text-white p-2 rounded border-0 hover:bg-coolgray-200 transition-colors">
  <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
  </svg>
</button>
```

**Plain CSS:**
```css
/* Desktop nav links container */
.nav-links {
  display: none;
}
@media (min-width: 1280px) {
  .nav-links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
}

/* Hamburger (mobile/tablet only) */
.hamburger {
  display: block;
  padding: 0.5rem;
  border-radius: 0.25rem;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.hamburger:hover {
  background: #202020;
}
.hamburger svg {
  width: 1.5rem;
  height: 1.5rem;
  color: #fff;
}
@media (min-width: 1280px) {
  .hamburger { display: none; }
}
```

#### Mobile dropdown menu

Hidden by default, toggled via JS swapping `hidden` ↔ `flex` classes. Sits inside the `<header>` below the `<nav>`, inheriting the sticky semi-transparent backdrop. Anchor links auto-close the menu on click. Only used below `xl` (1280px).

**Tailwind:**
```html
<div id="mobile-menu" class="hidden flex-col gap-1 px-4 pb-3">
  <a class="navbar-link">
    <svg class="size-5 text-warning">...</svg>
    Link Text
  </a>
  <!-- "To Cloud" CTA at end -->
  <a class="p-2 px-4 rounded text-white w-full text-center border border-coollabs hover:bg-coollabs bg-coollabs/30 font-semibold mt-1">
    To Cloud
  </a>
</div>
```

**`.navbar-link` style:**
```css
.navbar-link {
  color: #fff;
  font-size: 1rem;             /* text-base on desktop */
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: background-color 0.15s ease;
}
.navbar-link:hover {
  background: #202020;
}
.navbar-link svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #FCD34D;
}
@media (max-width: 767px) {
  .navbar-link {
    font-size: 0.875rem;      /* text-sm in mobile dropdown */
    width: 100%;
    text-align: left;
  }
}
```

**Plain CSS (menu container):**
```css
.dropdown-menu {
  display: none;              /* JS toggles to display: flex */
  flex-direction: column;
  gap: 0.25rem;
  padding: 0 1rem 0.75rem;
  /* No own background — inherits sticky header's
     rgba(16,16,16,0.8) + backdrop-blur */
}
.dropdown-menu.flex {         /* toggled by JS */
  display: flex;
}
```

#### Behavior

- Stays fixed at top on scroll (sticky); page content scrolls underneath with blur visible
- Mobile menu toggled by hamburger button click
- Anchor links in mobile menu auto-close the menu after click

### 8.5 Card — Base

Used for pricing cards, contributor cards.

**Tailwind:**
```html
<div class="bg-coolgray-200/70 p-6 rounded-lg flex flex-col justify-between">
  <!-- content -->
</div>
```

**Plain CSS:**
```css
.card {
  background: rgba(32, 32, 32, 0.7);
  padding: 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

### 8.6 Card — Stats

**Tailwind:**
```html
<div class="bg-coolgray-200 rounded-xl p-6 border border-coolgray-400 hover:border-coolgray-300 transition-colors">
  <div class="text-3xl md:text-4xl font-bold text-white">1,234</div>
  <div class="text-neutral-400 mt-2">Label</div>
</div>
```

**Plain CSS:**
```css
.card-stats {
  background: #202020;
  border-radius: 0.75rem;
  padding: 1.5rem;
  border: 1px solid #282828;
  transition: border-color 0.15s ease;
}
.card-stats:hover {
  border-color: #242424;
}
.card-stats .value {
  font-size: 1.875rem;
  font-weight: 700;
  color: #fff;
}
.card-stats .label {
  color: #a3a3a3;
  margin-top: 0.5rem;
}
```

### 8.7 Card — Contributor

**Tailwind (top contributor):**
```html
<a class="bg-coolgray-200/70 rounded p-6 flex flex-col items-center justify-center hover:bg-coolgray-300 transition h-56 text-center">
  <img class="w-20 h-20 rounded-full mb-3" />
  <div class="font-normal mt-1 text-lg">username</div>
  <div class="text-md mt-1 text-neutral-400">42 contributions</div>
</a>
```

**Tailwind (all contributors):**
```html
<a class="bg-coolgray-200/70 rounded p-4 flex flex-col items-center hover:bg-coolgray-300 transition text-center">
  <img class="w-16 h-16 rounded-full mb-2" />
  <div class="font-semibold mt-1 text-sm truncate">username</div>
  <div class="text-xs mt-1 text-neutral-400">12 contributions</div>
</a>
```

**Plain CSS:**
```css
.card-contributor {
  background: rgba(32, 32, 32, 0.7);
  border-radius: 0.25rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: background 0.15s ease;
}
.card-contributor:hover {
  background: #242424;
}
.card-contributor img {
  border-radius: 9999px;
  width: 5rem;        /* top: 5rem, all: 4rem */
  height: 5rem;
  margin-bottom: 0.75rem;
}
```

### 8.8 Feature List Item

Icon + title + description pattern used on the homepage.

**Tailwind:**
```html
<div class="flex flex-col">
  <dt class="flex items-center gap-x-3 text-xl text-white">
    <svg class="w-6 h-6 text-warning">...</svg>
    Feature Title
  </dt>
  <dd class="mt-4 flex flex-auto flex-col text-sm leading-6 text-neutral-400">
    <p class="flex-auto">Description text here.</p>
  </dd>
</div>
```

**Plain CSS:**
```css
.feature-item dt {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  color: #fff;
}
.feature-item dt svg {
  width: 1.5rem;
  height: 1.5rem;
  color: #FCD34D;
  flex-shrink: 0;
}
.feature-item dd {
  margin-top: 1rem;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: #a3a3a3;
}
```

### 8.9 Checklist Item

Purple checkmark circle + text, used in pricing cards.

**Tailwind:**
```html
<li class="flex items-start">
  <svg class="flex-none w-5 h-6 mr-3" viewBox="0 0 20 20" fill="none">
    <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" fill="#7317ff"/>
    <path d="M13.857 8.191a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" fill="white"/>
  </svg>
  Feature text here
</li>
```

**Plain CSS:**
```css
.checklist {
  list-style: none;
  padding: 0;
}
.checklist li {
  display: flex;
  align-items: flex-start;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: #fff;
}
.checklist li + li {
  margin-top: 1rem;
}
.checklist li svg {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.5rem;
  margin-right: 0.75rem;
}
/* Checkmark SVG: circle fill=#7317ff, check path fill=white */
```

### 8.10 Pricing Toggle (Segmented Control)

**Tailwind:**
```html
<fieldset class="inline-flex gap-1 p-1 bg-coolgray-100 rounded whitespace-nowrap">
  <label class="cursor-pointer px-3 py-1 text-xs sm:text-sm font-semibold rounded
                bg-coollabs-100 text-white">  <!-- active state -->
    <input type="radio" class="sr-only" />
    Monthly
  </label>
  <label class="cursor-pointer px-3 py-1 text-xs sm:text-sm font-semibold rounded">
    <input type="radio" class="sr-only" />
    Annually
  </label>
</fieldset>
```

**Plain CSS:**
```css
.segmented-control {
  display: inline-flex;
  gap: 0.25rem;
  padding: 0.25rem;
  background: #181818;
  border-radius: 0.25rem;
  white-space: nowrap;
}
.segmented-control label {
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.25rem;
  color: #a3a3a3;
  transition: background 0.15s ease, color 0.15s ease;
}
.segmented-control input:checked + span,
.segmented-control label.active {
  background: #7317FF;
  color: #fff;
}
@media (min-width: 640px) {
  .segmented-control label { font-size: 0.875rem; }
}
```

### 8.11 FAQ Accordion

**Tailwind:**
```html
<div class="divide-y divide-coolgray-300 border-y border-coolgray-300">
  <div class="py-4">
    <button class="w-full text-left text-sm font-medium flex justify-between items-center">
      <span>Question text?</span>
      <svg class="w-6 h-6 transition-transform duration-200 rotate-180"
           viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 12l-4-4h8l-4 4z" clip-rule="evenodd"/>
      </svg>
    </button>
    <p class="mt-2 text-sm text-neutral-300 text-left">Answer text.</p>
  </div>
</div>
```

**Plain CSS:**
```css
.faq-list {
  border-top: 1px solid #242424;
  border-bottom: 1px solid #242424;
}
.faq-item {
  padding: 1rem 0;
  border-bottom: 1px solid #242424;
}
.faq-item:last-child {
  border-bottom: none;
}
.faq-button {
  width: 100%;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.faq-button svg {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.2s ease;
}
.faq-button[aria-expanded="true"] svg {
  transform: rotate(180deg);
}
.faq-answer {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #d4d4d4;
  text-align: left;
}
```

### 8.12 Table

**Tailwind:**
```html
<table class="w-full table-pin-auto text-left">
  <thead>
    <tr class="bg-coolgray-100">
      <th class="px-6 py-3 font-medium">Feature</th>
      <th class="px-6 py-3 font-medium min-w-[120px] whitespace-nowrap">Self-hosted</th>
      <th class="px-6 py-3 font-medium min-w-[80px] whitespace-nowrap">Cloud</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-coolgray-300">
    <tr>
      <td class="px-6 py-4">Feature name</td>
      <td class="px-6 py-4 text-neutral-400">Value</td>
    </tr>
  </tbody>
</table>
```

**Plain CSS:**
```css
.table {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
.table thead tr {
  background: #181818;
}
.table th {
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  color: #fff;
  white-space: nowrap;
}
.table tbody tr {
  border-bottom: 1px solid #242424;
}
.table td {
  padding: 1rem 1.5rem;
  color: #fff;
}
.table td.secondary {
  color: #a3a3a3;
}
```

### 8.13 Tooltip / Popover

**Tailwind:**
```html
<div class="relative group">
  <span class="underline decoration-dotted decoration-1 underline-offset-4 cursor-help">
    Trigger text
  </span>
  <div class="absolute top-full left-0 mt-0 w-[336px] p-5 rounded-lg bg-black/90
              text-white text-sm text-left opacity-0 invisible
              group-hover:opacity-100 group-hover:visible transition-opacity z-10">
    Tooltip content here.
  </div>
</div>
```

**Plain CSS:**
```css
.tooltip-trigger {
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
  cursor: help;
}
.tooltip-popup {
  position: absolute;
  top: 100%;
  left: 0;
  width: 336px;
  padding: 1.25rem;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  font-size: 0.875rem;
  text-align: left;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease;
  z-index: 10;
  pointer-events: auto;
}
.tooltip-trigger:hover + .tooltip-popup,
.tooltip-popup:hover {
  opacity: 1;
  visibility: visible;
}
```

**Inline tooltip (table footnotes):**
```css
.tooltip-inline {
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  background: #000;
  color: #fff;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
}
```

### 8.14 Badge / Chip

**Tailwind:**
```html
<div class="bg-coolgray-300/60 text-sm px-4 py-2 rounded">
  Contributors: 42
</div>
```

**Plain CSS:**
```css
.badge {
  background: rgba(36, 36, 36, 0.6);
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  color: #fff;
}
```

### 8.15 Code Block

Includes an optional copy-to-clipboard button. On click, the clipboard icon swaps to a checkmark for 2 seconds, then reverts.

**Tailwind:**
```html
<div class="font-mono bg-coolgray-300 px-4 py-2 rounded text-xs md:text-sm text-left w-fit mx-auto space-y-1">
  <div class="select-none text-neutral-400 font-bold pr-2 pb-4">
    # Comment text — <span class="text-warning/90">highlighted portion</span>
  </div>
  <div class="flex items-center justify-between gap-4">
    <div>
      <span class="select-none text-neutral-500 font-extrabold pr-2">></span>curl -fsSL https://example.com/install.sh | sudo bash
    </div>
    <button id="copy-btn" class="text-neutral-400 hover:text-white transition-colors flex-shrink-0" aria-label="Copy command">
      <!-- Clipboard icon (default) -->
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"/>
      </svg>
    </button>
  </div>
</div>
```

**Copy button JS behavior:**
```js
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(commandText);
  // Swap to checkmark icon
  copyBtn.innerHTML = `<svg class="w-5 h-5 text-green-400" ...>✓ checkmark path</svg>`;
  setTimeout(() => {
    // Revert to clipboard icon after 2s
    copyBtn.innerHTML = originalClipboardSVG;
  }, 2000);
});
```

**Plain CSS:**
```css
.code-block {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  background: #242424;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: #fff;
  text-align: left;
  width: fit-content;
  margin: 0 auto;
}
.code-block .prompt {
  user-select: none;
  color: #737373;          /* neutral-500 */
  font-weight: 800;
  padding-right: 0.5rem;
}
.code-block .comment {
  user-select: none;
  color: #a3a3a3;          /* neutral-400 */
  font-weight: 700;
}
.code-block .copy-btn {
  color: #a3a3a3;
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.15s ease;
}
.code-block .copy-btn:hover {
  color: #fff;
}
@media (min-width: 768px) {
  .code-block { font-size: 0.875rem; }
}
```

### 8.16 Links

**Inline accent link:**
```html
<!-- Tailwind -->
<a class="text-warning underline">Link text</a>

<!-- CSS -->
a.link-accent { color: #FCD34D; text-decoration: underline; }
```

**Decorated link (feature title):**
```html
<!-- Tailwind -->
<a class="underline decoration-warning decoration-2 underline-offset-4 hover:text-warning transition-colors">
  Link text
</a>

<!-- CSS -->
a.link-decorated {
  text-decoration: underline;
  text-decoration-color: #FCD34D;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
  transition: color 0.15s ease;
}
a.link-decorated:hover { color: #FCD34D; }
```

**Footer text link:**
```html
<!-- Tailwind -->
<a class="text-sm">Link text</a>

<!-- CSS -->
a.link-footer { font-size: 0.875rem; color: #fff; text-decoration: none; }
```

**Footer social icon link:**
```html
<!-- Tailwind -->
<a class="text-gray-400 hover:text-gray-500"><svg class="h-6 w-6">...</svg></a>

<!-- CSS -->
a.link-social { color: #9ca3af; transition: color 0.15s ease; }
a.link-social:hover { color: #6b7280; }
a.link-social svg { width: 1.5rem; height: 1.5rem; }
```

### 8.17 Floating Action Button

**Tailwind:**
```html
<a class="fixed bottom-4 right-4 bg-coollabs hover:bg-coollabs/80 text-white px-3 py-2 rounded-full shadow-lg transition-all duration-300 text-xs font-medium z-50 flex items-center gap-2">
  Jump to Features
</a>
```

**Plain CSS:**
```css
.fab {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background: #6B16ED;
  color: #fff;
  padding: 0.5rem 0.75rem;
  border-radius: 9999px;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}
.fab:hover {
  background: rgba(107, 22, 237, 0.8);
}
```

### 8.18 Rainbow Border (Highlight Ring)

Animated rotating rainbow border around an element (used for "newest sponsor" highlight).

**Plain CSS (no Tailwind equivalent):**
```css
.rainbow-border {
  position: relative;
}
.rainbow-border::before {
  content: "";
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  background: conic-gradient(
    #ff2400, #e81d1d, #e8b71d, #e3e81d,
    #1de840, #1ddde8, #2b1de8, #dd00f3, #ff2400
  );
  border-radius: 50px;
  z-index: -1;
  animation: rotate 1s linear infinite;
}
.rainbow-border::after {
  content: "";
  position: absolute;
  top: -1px; left: -1px; right: -1px; bottom: -1px;
  background: #000;
  border-radius: 200px;
  z-index: -1;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

### 8.19 Sponsor Card (Big)

Elevated card with dotted border, gradient overlay on hover.

**Plain CSS:**
```css
.sponsor-card {
  position: relative;
  border: 1px dotted transparent;
  border-radius: 0.3rem;
  padding: 1.5rem;
  cursor: pointer;
  overflow: hidden;
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Gradient overlay (hidden by default) */
.sponsor-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(96, 165, 250, 0.1),
    rgba(167, 139, 250, 0.1),
    rgba(244, 114, 182, 0.1)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sponsor-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: #6B16ED;
  border-style: solid;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.3),
    0 10px 10px -5px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(96, 165, 250, 0.2);
}
.sponsor-card:hover::before {
  opacity: 1;
}

.sponsor-card img {
  max-width: 100%;
  max-height: 60px;
  object-fit: contain;
  filter: brightness(0.9) contrast(1.1);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.sponsor-card:hover img {
  transform: scale(1.1);
  filter: brightness(1) contrast(1.2);
}
```

### 8.20 Gradient Text (Sponsors Title)

**Plain CSS:**
```css
.gradient-text {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
@media (max-width: 640px) {
  .gradient-text { font-size: 2rem; }
}
```

---

## 8B. Core Page Blueprints

These pages must be identical across every coolLabs landing site. Adapt only the product name, URLs, and stats — keep all text, structure, and styling the same.

### Shared Content Page Structure

Every content page follows this hierarchy inside the `<main>` container (`max-w-6xl mx-auto`, `text-center pt-12 md:pt-24`):

```
h1  — page title with accent punctuation
h2  — subtitle (neutral-400)
[optional CTA buttons]
[optional body paragraph in max-w-2xl container]
h3  — section title with accent punctuation
h4  — section subtitle
[section content: checklist, body text, stats grid, etc.]
...repeat h3/h4 + content blocks...
```

**Heading classes (reuse exactly):**

| Element | Tailwind | Purpose |
|---------|----------|---------|
| `h1` | `text-3xl font-bold tracking-tight text-white md:text-6xl px-4` | Page title |
| `h2` | `text-base pb-10 pt-2 text-neutral-400 px-4` | Subtitle under h1 |
| `h3` | `text-xl font-bold tracking-tight text-white md:text-3xl pt-16 px-4` | Section title |
| `h4` | `text-base pb-10 pt-2 text-neutral-400 px-4` | Subtitle under h3 |

**Accent punctuation:** every heading ends with a colored character:
- Period: `<span class="text-warning">.</span>`
- Question mark: `<span class="text-warning">?</span>`

**Body text container:**
```html
<div class="pt-4 max-w-2xl mx-auto px-4">
  <div class="text-left text-neutral-400">
    Body text here. Use <br /><br /> between paragraphs.
    <strong class="text-warning">Bold highlight.</strong> for key phrases.
    <a class="text-white hover:underline font-bold underline">link</a> for internal links.
    <a class="text-warning underline font-bold">link</a> for accent links.
  </div>
</div>
```

**Checklist section** (circle-check icon + bold label + description):
```html
<div class="mt-4 max-w-2xl mx-auto px-4">
  <ul role="list" class="mt-8 space-y-8 text-neutral-400 text-left">
    <li class="flex gap-x-3">
      <svg class="mt-0 h-6 w-6 flex-none text-warning" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/>
      </svg>
      <span>
        <strong class="font-semibold text-warning">Item Title.</strong> Description text.
      </span>
    </li>
  </ul>
</div>
```

**Donation buttons row:**
```html
<div class="pt-10 pb-2 flex lg:flex-row flex-col items-center justify-center text-center gap-8 px-4">
  <a href="https://github.com/sponsors/coollabsio" target="_blank"
     class="button flex items-center gap-4 w-64 justify-center">
    <!-- GitHub SVG (w-10 h-10) -->
    <div class="flex flex-col">
      <span>GitHub Sponsors</span>
      <span class="text-xs text-gray-400">Donation</span>
    </div>
  </a>
  <a href="https://opencollective.com/coollabsio/donate?interval=month&amount=10&name=&legalName=&email="
     target="_blank" class="button flex items-center gap-4 w-64 justify-center">
    <!-- Open Collective SVG (w-10 h-10) -->
    <div class="flex flex-col">
      <span>Open Collective</span>
      <span class="text-xs text-gray-400">Donation</span>
    </div>
  </a>
</div>
```

**Stats grid:**
```html
<div class="pt-4 max-w-4xl mx-auto px-4">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <a href="..." target="_blank"
       class="bg-coolgray-200 rounded-xl p-6 border border-coolgray-400 hover:border-coolgray-300 transition-colors">
      <div class="text-3xl md:text-4xl font-bold text-white">$<span id="stat-id">...</span>+</div>
      <div class="text-neutral-400 mt-2">Label</div>
    </a>
  </div>
</div>
```

---

### 8B.1 Sponsorships Page (exact copy for every site)

**Route:** `/sponsorships`
**Title:** `Sponsorship | coolLabs`
**Description:** `Support [Product]'s development. Sponsor us on GitHub or Open Collective to keep the project free and accessible for everyone.`

Replace "Coolify" with the product name when adapting. Everything else stays identical.

#### Full page content & structure:

```html
<!-- SECTION 1: Hero -->
<h1 class="text-3xl font-bold tracking-tight text-white md:text-6xl px-4">
  Sponsor Us<span class="text-warning">.</span>
</h1>
<h2 class="text-base pb-10 pt-2 text-neutral-400 px-4">
  We love doing open-source projects.
  <svg class="w-6 h-6 inline-block" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EC4899"
      d="M2.067 11.319C2.067 2.521 14.251-.74 18 9.445C21.749-.741 33.933 2.52 33.933 11.319C33.933 20.879 18 33 18 33S2.067 20.879 2.067 11.319z"/>
  </svg>
</h2>

<!-- SECTION 2: Description -->
<div class="pt-4 max-w-2xl mx-auto px-4">
  <div class="text-left text-neutral-400">
    We are a self-funded company and depend on your support to sustain the
    project. This allows for a focus on real users (like you) rather than on
    investors or revenue. If you opt for our self-hosted version, you have the
    option to support our work through donations.
  </div>
</div>

<!-- SECTION 3: Donation buttons -->
<div class="pt-10 pb-2 flex lg:flex-row flex-col items-center justify-center text-center gap-8 px-4">
  <a href="https://github.com/sponsors/coollabsio" target="_blank"
     class="button flex items-center gap-4 w-64 justify-center">
    <svg viewBox="0 0 128 128" class="w-10 h-10">
      <g fill="currentColor">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"/>
        <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"/>
      </g>
    </svg>
    <div class="flex flex-col">
      <span>GitHub Sponsors</span>
      <span class="text-xs text-gray-400">Donation</span>
    </div>
  </a>
  <a href="https://opencollective.com/coollabsio/donate?interval=month&amount=10&name=&legalName=&email="
     target="_blank" class="button flex items-center gap-4 w-64 justify-center">
    <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6818 15.7529L18.8116 17.8827C20.1752 16.3052 21 14.249 21 12.0001C21 9.78747 20.2016 7.76133 18.8771 6.19409L16.7444 8.32671C17.5315 9.34177 18 10.6162 18 12.0001C18 13.4203 17.5066 14.7253 16.6818 15.7529Z" fill="currentColor" fill-opacity="0.5"/>
      <path d="M15.6734 16.7445C14.6583 17.5315 13.3839 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C13.4202 6 14.7252 6.49344 15.7528 7.31823L17.8826 5.18843C16.3051 3.82482 14.2489 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.2126 21 16.2387 20.2016 17.806 18.8771L15.6734 16.7445Z" fill="currentColor"/>
    </svg>
    <div class="flex flex-col">
      <span>Open Collective</span>
      <span class="text-xs text-gray-400">Donation</span>
    </div>
  </a>
</div>

<!-- SECTION 4: Sponsor slot upsell -->
<div class="pt-4 max-w-2xl mx-auto px-4">
  <div class="text-left text-neutral-400">
    You can even get free visitors (170k+ unique visitors per month - landing
    page, docs, Github readme...) to your project, by buying a slot: a
    <a class="text-warning underline font-bold"
       href="https://github.com/sponsors/coollabsio/sponsorships?tier_id=61570&preview=false">small</a>
    or a
    <a class="text-warning underline font-bold"
       href="https://github.com/sponsors/coollabsio/sponsorships?tier_id=334953&preview=false">large</a>
    logo + link.
  </div>
</div>

<!-- SECTION 5: Who Is Behind This -->
<h3 class="text-xl font-bold tracking-tight text-white md:text-3xl pt-16 px-4">
  Who Is Behind This<span class="text-warning">?</span>
</h3>
<h4 class="text-base pb-10 pt-2 text-neutral-400 px-4">
  A one-person mission that grew into a team.
</h4>

<div class="pt-4 max-w-2xl mx-auto px-4 pb-8">
  <div class="text-left text-neutral-400">
    Hey, I'm
    <a href="https://twitter.com/heyandras"
       class="underline text-white font-bold inline-flex items-center">
      Andras Bacsai
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="3"
           stroke="currentColor" fill="none" class="w-3 h-3 -mt-1 ml-1">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"/>
      </svg>
    </a>
    <br /><br />
    I'm a software developer based in Hungary who shifted to being an independent
    entrepreneur in July 2022. I quit my job to focus entirely on my dream of devoting
    myself to open-source projects.
    <br /><br />
    Since the middle of 2024, I'm not the only one working on these projects. Thanks
    to the sponsors and paid users, I hired a developer and a few community support
    members who help me with the projects.
    <br /><br />
    If you find my open-source projects helpful or value my work, please think about
    making a
    <a href="https://github.com/sponsors/coollabsio"
       class="text-white hover:underline font-bold underline">donation or sponsoring</a>.
    <br /><br />
    This will guarantee that the projects stay free, accessible, and keep developing,
    enabling me to devote all my time to creating and enhancing them.
    <br /><br />
    It provides me with significant long-term benefits!
    <br /><br />
    Thank you!
  </div>
</div>
```

#### Key design details:
- Inline pink heart SVG (`#EC4899`, `w-6 h-6 inline-block`) in subtitle
- Donation buttons use `.button` class (`bg-coolgray-300 hover:bg-coolgray-400 text-white px-4 py-2 text-base font-semibold leading-6 rounded`)
- Button icons are `w-10 h-10` (larger than nav icons)
- Button sub-label: `text-xs text-gray-400`
- External link icon on "Andras Bacsai": `w-3 h-3 -mt-1 ml-1`, stroke-width 3
- Accent links (`small`/`large` slots): `text-warning underline font-bold`
- "Who Is Behind This" uses `?` accent punctuation, not `.`
- Final section uses `pb-8` bottom padding

---

### 8B.2 Philosophy Page (exact copy for every site)

**Route:** `/philosophy`
**Title:** `Our Philosophy | [Product Name]`
**Description:** `Our approach to open-source software: free, accessible, and community-supported. Learn about our philosophy and how we sustain development.`

#### Full page content & structure:

```html
<!-- SECTION 1: Hero -->
<h1 class="text-3xl font-bold tracking-tight text-white md:text-6xl px-4">
  Our Open Source Philosophy<span class="text-warning">.</span>
</h1>
<h2 class="text-base pb-10 pt-2 text-neutral-400 px-4">
  Software should be free and accessible to everyone.
</h2>

<!-- SECTION 2: Intro -->
<div class="pt-4 max-w-2xl mx-auto px-4">
  <div class="text-left text-neutral-400">
    We believe that great software should be available to everyone, regardless
    of their budget. That's why all of our projects are completely free and
    open source, with no features locked behind paywalls.
    <br /><br />
    This isn't just a business decision - it's a core belief. We've seen too many
    promising open-source projects slowly close their doors, adding "enterprise"
    features and artificial limitations. We chose a different path.
  </div>
</div>

<!-- SECTION 3: What This Means — checklist -->
<h3 class="text-xl font-bold tracking-tight text-white md:text-3xl pt-16 px-4">
  What This Means<span class="text-warning">.</span>
</h3>
<h4 class="text-base pb-10 pt-2 text-neutral-400 px-4">
  Our commitments to the community.
</h4>

<div class="mt-4 max-w-2xl mx-auto px-4">
  <ul role="list" class="mt-8 space-y-8 text-neutral-400 text-left">
    <li class="flex gap-x-3">
      <svg class="mt-0 h-6 w-6 flex-none text-warning" viewBox="0 0 20 20"
           fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clip-rule="evenodd"/>
      </svg>
      <span>
        <strong class="font-semibold text-warning">Free and Open Source.</strong>
        Every project we build is 100% open source. You can view the code, modify
        it, learn from it, and use it however you want.
      </span>
    </li>
    <li class="flex gap-x-3">
      <svg class="mt-0 h-6 w-6 flex-none text-warning" viewBox="0 0 20 20"
           fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clip-rule="evenodd"/>
      </svg>
      <span>
        <strong class="font-semibold text-warning">No Features Behind Paywalls.</strong>
        Every feature we develop goes into the open-source version. There's no
        "enterprise edition" with the good stuff locked away. What you see is what
        you get - everything.
      </span>
    </li>
    <li class="flex gap-x-3">
      <svg class="mt-0 h-6 w-6 flex-none text-warning" viewBox="0 0 20 20"
           fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clip-rule="evenodd"/>
      </svg>
      <span>
        <strong class="font-semibold text-warning">Apache License.</strong>
        We use the Apache 2.0 license, which gives you the freedom to use our software
        for any purpose. However, we kindly ask that you don't commercially redistribute
        our work as your own product. The license allows it, but we'd appreciate
        if you didn't.
      </span>
    </li>
    <li class="flex gap-x-3">
      <svg class="mt-0 h-6 w-6 flex-none text-warning" viewBox="0 0 20 20"
           fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          clip-rule="evenodd"/>
      </svg>
      <span>
        <strong class="font-semibold text-warning">Forever Free.</strong>
        This isn't a temporary strategy or a growth hack. This is how we believe software
        should be made. These principles will never change.
      </span>
    </li>
  </ul>
</div>

<!-- SECTION 4: How We Sustain Development -->
<h3 class="text-xl font-bold tracking-tight text-white md:text-3xl pt-16 px-4">
  How We Sustain Development<span class="text-warning">.</span>
</h3>
<h4 class="text-base pb-10 pt-2 text-neutral-400 px-4">
  Because we still need to pay the bills.
</h4>

<div class="pt-4 max-w-2xl mx-auto px-4">
  <div class="text-left text-neutral-400">
    Making software free doesn't mean development is free. We sustain our work
    through two main channels:
    <br /><br />
    <strong class="text-warning">Community Donations.</strong> If you find our projects
    valuable, you can support us through GitHub Sponsors or Open Collective. Every
    contribution helps us dedicate more time to development and support.
    <br /><br />
    <strong class="text-warning">Hosted Services.</strong> For those who prefer
    not to self-host, we offer managed cloud versions of our software. You get the
    same features, we handle the infrastructure, and the revenue helps fund continued
    development.
    <br /><br />
    This model lets us focus on building great software for real users, not on pleasing
    investors or hitting arbitrary growth metrics.
  </div>
</div>

<!-- SECTION 5: Donation buttons -->
<div class="pt-10 pb-2 flex lg:flex-row flex-col items-center justify-center text-center gap-8 px-4">
  <a href="https://github.com/sponsors/coollabsio" target="_blank"
     class="button flex items-center gap-4 w-64 justify-center">
    <svg viewBox="0 0 128 128" class="w-10 h-10">
      <g fill="currentColor">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"/>
        <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"/>
      </g>
    </svg>
    <div class="flex flex-col">
      <span>GitHub Sponsors</span>
      <span class="text-xs text-gray-400">Support Us</span>
    </div>
  </a>
  <a href="https://opencollective.com/coollabsio" target="_blank"
     class="button flex items-center gap-4 w-64 justify-center">
    <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.6818 15.7529L18.8116 17.8827C20.1752 16.3052 21 14.249 21 12.0001C21 9.78747 20.2016 7.76133 18.8771 6.19409L16.7444 8.32671C17.5315 9.34177 18 10.6162 18 12.0001C18 13.4203 17.5066 14.7253 16.6818 15.7529Z" fill="currentColor" fill-opacity="0.5"/>
      <path d="M15.6734 16.7445C14.6583 17.5315 13.3839 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C13.4202 6 14.7252 6.49344 15.7528 7.31823L17.8826 5.18843C16.3051 3.82482 14.2489 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C14.2126 21 16.2387 20.2016 17.806 18.8771L15.6734 16.7445Z" fill="currentColor"/>
    </svg>
    <div class="flex flex-col">
      <span>Open Collective</span>
      <span class="text-xs text-gray-400">Support Us</span>
    </div>
  </a>
</div>

<!-- SECTION 6: Where We Are Today — stats -->
<h3 class="text-xl font-bold tracking-tight text-white md:text-3xl pt-16 px-4">
  Where We Are Today<span class="text-warning">.</span>
</h3>
<h4 class="text-base pb-10 pt-2 text-neutral-400 px-4">
  Transparency in numbers.
</h4>

<div class="pt-4 max-w-4xl mx-auto px-4">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <a href="https://coolify.io/cloud" target="_blank"
       class="bg-coolgray-200 rounded-xl p-6 border border-coolgray-400 hover:border-coolgray-300 transition-colors">
      <div class="text-3xl md:text-4xl font-bold text-white">$<span id="hosted-mrr">...</span>+</div>
      <div class="text-neutral-400 mt-2">MRR</div>
    </a>
    <a href="https://github.com/sponsors/coollabsio" target="_blank"
       class="bg-coolgray-200 rounded-xl p-6 border border-coolgray-400 hover:border-coolgray-300 transition-colors">
      <div class="text-3xl md:text-4xl font-bold text-white">$<span id="github-sponsors">...</span>+</div>
      <div class="text-neutral-400 mt-2">GitHub Sponsors / month</div>
    </a>
    <a href="https://opencollective.com/coollabsio" target="_blank"
       class="bg-coolgray-200 rounded-xl p-6 border border-coolgray-400 hover:border-coolgray-300 transition-colors">
      <div class="text-3xl md:text-4xl font-bold text-white">$<span id="open-collective">...</span>+</div>
      <div class="text-neutral-400 mt-2">Open Collective / month</div>
    </a>
  </div>
  <div class="grid grid-cols-1 gap-4 mt-4">
    <a href="https://coolify.io/cloud" target="_blank"
       class="bg-coolgray-200 rounded-xl p-6 border border-coolgray-400 hover:border-coolgray-300 transition-colors">
      <div class="text-3xl md:text-4xl font-bold text-white"><span id="cloud-users">...</span>+</div>
      <div class="text-neutral-400 mt-2">Cloud Users</div>
    </a>
  </div>
</div>

<div class="pt-8 max-w-2xl mx-auto px-4">
  <div class="text-left text-neutral-400">
    This revenue allows us to work on these projects full-time, hire help, and
    keep improving the software for everyone.
  </div>
</div>

<!-- SECTION 7: Closing -->
<div class="pt-16 max-w-2xl mx-auto px-4 pb-8">
  <div class="text-left text-neutral-400">
    This philosophy guides everything we do at
    <a href="https://coollabs.io" class="text-white hover:underline font-bold">coolLabs</a>.
    Whether it's Coolify or any other project we build, the principles
    remain the same: free, open, and built for the community.
    <br /><br />
    Thank you to everyone who supports this vision - through donations, by using
    our hosted services, or simply by using and sharing our software. You make this
    possible.
  </div>
</div>
```

#### Live stats script (same for both pages):
```html
<script>
  fetch("https://cdn-new.coollabs.io/business.json")
    .then((res) => res.json())
    .then((data) => {
      const hostedEl = document.getElementById("hosted-mrr");
      if (hostedEl && data.mrr) hostedEl.textContent = data.mrr.toLocaleString();
      const cloudUsersEl = document.getElementById("cloud-users");
      if (cloudUsersEl && data["coolify-cloud-users"])
        cloudUsersEl.textContent = data["coolify-cloud-users"].toLocaleString();
      const githubSponsorsEl = document.getElementById("github-sponsors");
      if (githubSponsorsEl && data["github-sponsors"])
        githubSponsorsEl.textContent = data["github-sponsors"].toLocaleString();
      const openCollectiveEl = document.getElementById("open-collective");
      if (openCollectiveEl && data["open-collective-sponsors"])
        openCollectiveEl.textContent = data["open-collective-sponsors"].toLocaleString();
    })
    .catch(() => {
      // Fallback values — update per product
      const hostedEl = document.getElementById("hosted-mrr");
      if (hostedEl) hostedEl.textContent = "15,400";
      const cloudUsersEl = document.getElementById("cloud-users");
      if (cloudUsersEl) cloudUsersEl.textContent = "2,500+";
      const githubSponsorsEl = document.getElementById("github-sponsors");
      if (githubSponsorsEl) githubSponsorsEl.textContent = "4,500";
      const openCollectiveEl = document.getElementById("open-collective");
      if (openCollectiveEl) openCollectiveEl.textContent = "1,200";
    });
</script>
```

#### Adaptation notes for new products:
- Replace product name in `<title>` and `<meta description>`
- Replace product URLs in stats card `href` values (MRR, Cloud Users links)
- Stats `id` attributes and API JSON keys stay the same — all products share `cdn-new.coollabs.io/business.json`
- Update fallback values in `catch` block per product
- Philosophy page uses "Support Us" as button sub-label; Sponsorships page uses "Donation"
- The "Where We Are Today" stats section can be omitted for products without cloud stats, but always keep donation buttons + closing section
- The sponsorships page "Who Is Behind This" section is personal to Andras — keep identical on all sites
- On the philosophy page, replace "Coolify" with the product name only in the closing section's mention

---

## 9. Icon System

All icons use inline SVGs with `fill="currentColor"` or `stroke="currentColor"` so Tailwind color classes control appearance.

### Sizing

| Context | Tailwind | CSS | Color |
|---------|----------|-----|-------|
| Navigation link icons | `size-5` | `20px` | `text-warning` (#FCD34D) |
| Feature list icons | `.icon` (custom) | `24px` (w-6 h-6) | `text-warning` (#FCD34D) |
| Button inline icons | `.icon hidden sm:block` | `24px` | `currentColor` (white) |
| Footer social icons | `h-6 w-6` | `24px` | `text-gray-400` hover:`text-gray-500` |
| Small inline icons | `h-4 w-4` | `16px` | `text-warning` |
| Checkmark list icons | `h-6 w-6 flex-none` | `24px` | `text-warning` |
| Copy button icon | `w-5 h-5` | `20px` | `text-neutral-400` hover:`text-white` |
| External link arrow | `w-3 h-3` | `12px` | `currentColor` |

**Icon base class:**
```css
.icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
}
```

### Icon Libraries Used

Icons are sourced from multiple libraries, all embedded as inline SVGs (no icon font or sprite sheet).

| Library | viewBox | Style | Used for |
|---------|---------|-------|----------|
| **Phosphor Icons** | `0 0 256 256` | Duotone (fill with opacity layers) | Nav: Philosophy (lightbulb), Contributors (heart-pulse), Docs (book), Merch (storefront), Discord (chat bubble) |
| **Tabler Icons** | `0 0 24 24` | Stroke-based (`stroke-width="2"`) | Nav: Pricing (piggy bank). Features: rocket, server, lock, code, terminal, users, bell, chart, gear, etc. Buttons: cloud, self-host server |
| **Heroicons** | `0 0 24 24` or `0 0 20 20` | Stroke or mini fill | Hamburger menu (3 lines), copy clipboard, circle-checkmark (benefits list), external link arrow |
| **Brand icons** | Various | Fill | GitHub octocat, Discord logo, X/Twitter logo, Twitch, Open Collective |
| **Custom** | `0 0 20 20` | Fill with clip-rule | Nav: Sponsor Us (coins/database) |

### Navbar Icons (complete list)

| Link | Icon | Library | Color Override |
|------|------|---------|---------------|
| Philosophy | Lightbulb/brain | Phosphor duotone | `text-warning` |
| Contributors | Heart with pulse line | Phosphor duotone | `text-red-500` |
| Pricing | Piggy bank | Tabler stroke | `text-warning` |
| Docs | Book | Phosphor duotone | `text-warning` |
| Merch | Storefront/shop | Phosphor duotone | `text-warning` |
| Sponsor Us | Coins/database | Custom fill | `text-warning` |
| Community | Discord mascot | Phosphor duotone | `text-warning` |

### Feature Grid Icons (homepage)

All use `.icon text-warning` (24×24, yellow). Stroke-based Tabler icons:

| Feature | Icon description |
|---------|-----------------|
| Any Language | Diagonal arrows |
| Any Server | Server rack |
| Any Use-Case | Task/checklist |
| Any Service | Dial/knob |
| Push to deploy | Dial/knob |
| Free SSL Certificates | Lock with checkmark |
| No vendor lock-in | Crossed arrows |
| Automatic DB Backups | Document with key |
| Webhooks | Circular flow nodes |
| Powerful API | Angle brackets `</>` |
| Command Line Tool | Terminal slash |
| Real-time Terminal | Terminal/console |
| Collaborative | People/users group |
| Pull Request Deployments | Branch flow arrows |
| Server Automations | Settings gear |
| Monitoring | Chart/graph |
| Notifications | Bell with signal |

### Page Content Icons

| Page | Icon | Library | Tailwind | Purpose |
|------|------|---------|----------|---------|
| self-hosted | Rocket | Tabler | `icon` | "Get Started" button |
| self-hosted | Clipboard | Heroicons | `w-5 h-5` | Copy command button |
| self-hosted | Circle checkmark (×8) | Heroicons | `h-6 w-6 flex-none text-warning` | Benefit list items |
| index | Camera | Phosphor | `w-5 h-5 text-warning` | "Screenshots" link |
| index | Video camera | Phosphor | `w-5 h-5 text-warning` | "Videos" link |
| index | Twitch logo | Brand | `h-4 w-4 text-purple-500` | "Live-streams" link |
| index | Cloud | Tabler | `icon hidden sm:block` | "Cloud" CTA button |
| index | Server | Tabler | `icon hidden sm:block` | "Self-hosted" CTA button |
| sponsorships | Heart | Custom | `w-6 h-6` fill `#EC4899` | Decorative heart |
| sponsorships | GitHub octocat | Brand | `w-10 h-10` | GitHub Sponsors link |
| sponsorships | Open Collective | Brand | `w-10 h-10` | Open Collective link |
| sponsorships | External arrow | Heroicons | `w-3 h-3` | Twitter/X link indicator |
| pricing | Purple checkmark | Custom | `w-5 h-6` fill `#7317ff` | Plan feature list |
| pricing | Chevron down | Custom | `w-6 h-6` | FAQ accordion toggle |
| pricing | Asterisk | Bootstrap Icons | `bi bi-asterisk` | Info marker |

### Footer Social Icons

| Platform | Icon | Color |
|----------|------|-------|
| X (Twitter) | X logo | `text-gray-400` hover:`text-gray-500` |
| GitHub | Octocat | `text-gray-400` hover:`text-gray-500` |
| Discord | Discord mascot (filled, `#5865F2` body + white face) | Custom colors |

### Icon Color Conventions

| Color | Tailwind | Hex | When to use |
|-------|----------|-----|-------------|
| Warning yellow | `text-warning` | `#FCD34D` | Default icon color for features, nav, lists |
| Red | `text-red-500` | `#EF4444` | Contributors heart |
| Purple | `text-purple-500` | `#A855F7` | Twitch branding |
| Indigo | `text-indigo-500` | `#6366F1` | Discord (sometimes combined with `text-warning`) |
| Pink | fill `#EC4899` | `#EC4899` | Heart on sponsorships page |
| Brand purple | fill `#7317ff` | `#7317FF` | Checkmarks in pricing plans |
| Gray | `text-gray-400` | `#9CA3AF` | Footer social icons default |
| Neutral | `text-neutral-400` | `#A3A3A3` | Copy button, muted UI icons |
| White | `text-white` / `currentColor` | `#FFF` | Icons inside buttons |

---

## 10. Global Resets & Base Styles

```css
/* Variable font — two subsets with unicode-range (see §3 Typography for full declarations) */
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("/fonts/inter-latin-ext.woff2") format("woff2");
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7,
    U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F,
    U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F,
    U+A720-A7FF;
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("/fonts/inter-latin.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
    U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122,
    U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

html {
  font-family: "Inter", sans-serif;
  background-color: #101010;
  color: #fff;
}

*, *::before, *::after {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
}
```

---

## 11. Quick Reference: Common Patterns

| Pattern | Tailwind shorthand |
|---------|-------------------|
| Center a section | `max-w-6xl mx-auto px-4 text-center` |
| Card with hover | `bg-coolgray-200/70 p-6 rounded-lg hover:bg-coolgray-300 transition` |
| Section heading | `text-2xl font-medium mb-6` or `text-4xl font-bold` |
| Subtitle | `text-neutral-400 text-center mb-10` |
| Stat number | `text-warning font-bold font-mono` |
| Accent period | `<span class="text-warning">.</span>` |
| Icon + text row | `flex items-center gap-x-3` |
| Responsive hide | `hidden xl:block` (show on xl+) / `xl:hidden` (hide on xl+) |
| Flex center CTA row | `flex justify-center text-center gap-8 px-4` |
| Responsive stack | `flex flex-col sm:flex-row` |
