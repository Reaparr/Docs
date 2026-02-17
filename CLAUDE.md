# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev        # Start dev server on http://localhost:4000
bun run build      # Build for production (SSR)
bun run generate   # Static site generation (used for deployment)
bun run preview    # Preview production build
bun run lint       # Lint with ESLint
bun run lint:fix   # Auto-fix ESLint issues
```

## Architecture

**Nuxt 4 documentation site** for the Reaparr project. Dark-mode only. Deployed as a static site via `nuxt generate`.

### Key modules
- `@nuxt/ui` v4 — UI components (UHeader, UNavigationMenu, UPage, UContentNavigation, etc.)
- `@nuxt/content` v3 — Markdown/YAML content with typed collections defined in `content.config.ts`
- `@vueuse/nuxt` — Composition utilities, auto-imported
- `nuxt-og-image` — OG image generation

### Layouts
- **`default.vue`** — Wraps all pages. Contains `AppHeader`, global `Background`, and `UContentSearch` (Meta+K).
- **`docs.vue`** — Extends default. Adds a left sidebar with `UContentNavigation` built from `queryCollectionNavigation('docs')`. Also populates `useDocsNavigation()` shared state so `AppHeader` can inject the same nav tree into its mobile `#body` slot.

### Routing & content
- `/docs` redirects to `/docs/getting-started` (route rule in nuxt.config.ts)
- Docs pages are at `app/pages/docs/[...slug].vue` and rendered from `content/docs/**/*.md`
- Content directories are prefixed with numbers for ordering (e.g. `3.installation/1.docker.md`)

### Composables (`app/composables/`)
All composables are auto-imported. They are re-exported from `index.ts`.

- **`useNavigation()`** — Returns `headerItems` (computed, route-aware) and `footerLinks`
- **`useDocsNavigation()`** — `useState` holding the docs nav tree. Set by `docs.vue` layout, consumed by `AppHeader` for the mobile panel. Cleared on unmount so it doesn't bleed into non-docs pages.
- **`useBackgroundEffect()`** — Controls the Vanta.js animated wave background. Exposes `isAnimated`, `toggle()`, `setupBackgroundEffect()`, `destroyBackgroundEffect()`. Handles SSR and WebGL detection gracefully.

### Components
All components in `app/components/` are globally auto-imported (`pathPrefix: false`).

- `General/ReaparrLogo.vue` and `General/ReaparrLogoTitle.vue` — SVG logo components used in the header
- `content/` subfolder — Prose overrides for Nuxt Content (`ProseInfo`, `ProseWarning`, `ProseError`, `ProseBanner`, `FaqAccordion`, `AiGeneratedAlert`)
- `AppHeader.vue` — Responsive header: desktop nav hidden below `lg`, external link buttons hidden below `sm`, mobile menu uses `#body` slot with `UNavigationMenu` + conditional `UContentNavigation` for docs sub-links

### Styling
- Tailwind CSS + `@nuxt/ui` imported in `app/assets/css/main.css`
- Font: Public Sans
- Dark mode locked: `colorMode.preference = 'dark'` in nuxt.config.ts, `color-scheme: dark only` meta tag, CSS variables only defined under `.dark`
- Primary color: `red`, neutral: `neutral` (set in `app/app.config.ts`)

### Path aliases
```
@interfaces  →  app/types/interfaces/
@components  →  app/components/
@composables →  app/composables/
```

### ESLint style rules
2-space indent, single quotes, semicolons required, trailing commas (multiline), brace style `1tbs`, arrow parens always. Vue block order: `<template>` → `<script>` → `<style>`.
