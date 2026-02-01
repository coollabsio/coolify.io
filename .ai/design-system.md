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
- **Loading:** Self-hosted WOFF2, `font-display: swap`
- **Weights available:** 100, 200, 300, 400 (regular), 500, 600, 700, 800, 900

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

### 8.4 Navigation Link

**Tailwind:**
```html
<a class="text-white text-xs md:text-base hover:bg-coolgray-200 p-2 px-2 rounded flex gap-2">
  <svg class="size-5 text-warning">...</svg>
  Link Text
</a>
```

**Plain CSS:**
```css
.nav-link {
  color: #fff;
  font-size: 0.75rem;            /* text-xs, scales to 1rem at md */
  padding: 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: background 0.15s ease;
}
.nav-link:hover {
  background: #202020;
}
.nav-link svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #FCD34D;
}
@media (min-width: 768px) {
  .nav-link { font-size: 1rem; }
}
/* Mobile: full width, left aligned */
@media (max-width: 767px) {
  .nav-link {
    width: 100%;
    text-align: left;
    margin-bottom: 0.25rem;
  }
}
```

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

**Tailwind:**
```html
<div class="font-mono bg-coolgray-300 px-4 py-2 rounded text-xs md:text-sm text-left">
  <span class="select-none text-neutral-400">$ </span>curl -fsSL ...
</div>
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
}
.code-block .prompt {
  user-select: none;
  color: #a3a3a3;
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

### 8.21 Mobile Menu

**Tailwind:**
```html
<div class="hidden md:flex flex-col md:flex-row absolute md:relative top-full right-0
            bg-coolgray-300 md:bg-transparent w-48 md:w-auto mt-2 md:mt-0
            rounded md:rounded-none p-2 md:p-0 z-50 md:gap-1 text-sm">
  <!-- nav links -->
</div>
```

**Plain CSS:**
```css
.mobile-menu {
  display: none;                  /* hidden by default on mobile */
  position: absolute;
  top: 100%;
  right: 0;
  background: #242424;
  width: 12rem;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
  padding: 0.5rem;
  z-index: 50;
  flex-direction: column;
  font-size: 0.875rem;
}
.mobile-menu.open {
  display: flex;
}
@media (min-width: 768px) {
  .mobile-menu {
    display: flex;
    position: relative;
    background: transparent;
    width: auto;
    margin-top: 0;
    border-radius: 0;
    padding: 0;
    flex-direction: row;
    gap: 0.25rem;
  }
}
```

---

## 9. Icon System

All icons use inline SVGs with consistent sizing.

| Context | Tailwind size class | CSS size | Color |
|---------|-------------------|----------|-------|
| Navigation icons | `size-5` | `20px` | `text-warning` (#FCD34D) |
| Feature icons | `.icon` (custom class) | `24px` (w-6 h-6) | `text-warning` (#FCD34D) |
| Button inline icons | `.icon hidden sm:block` | `24px` | `currentColor` (white) |
| Footer social | `h-6 w-6` | `24px` | `text-gray-400` |
| Small inline | `h-4 w-4` | `16px` | `text-warning` |

**Icon base class:**
```css
.icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
}
```

---

## 10. Global Resets & Base Styles

```css
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
| Responsive hide | `hidden sm:block` (show on sm+) / `md:hidden` (hide on md+) |
| Flex center CTA row | `flex justify-center text-center gap-8 px-4` |
| Responsive stack | `flex flex-col sm:flex-row` |
