# gav.

My personal portfolio — [gavmason.me](https://gavmason.me)

## Tech Stack

- **React 19** + **TypeScript 5.9**
- **Vite 7** — build tooling with code splitting
- **Tailwind CSS 4** — utility-first styling
- **Framer Motion** — scroll and layout animations
- **Three.js** — interactive dot globe in the hero

## Features

- Command palette (`⌘K`) with navigation, social links, and easter eggs
- Interactive skills constellation graph with hover/tap support
- Animated terminal section
- Fully responsive — mobile-first breakpoints
- Accessible — semantic HTML, ARIA labels, keyboard navigation, reduced motion support
- SEO — meta tags, Open Graph, JSON-LD structured data, sitemap

## Getting Started

```bash
git clone https://github.com/gavxm/portfolio.git
cd portfolio
cp .env.example .env   # fill in your values
npm install
npm run dev
```

## Scripts

| Command | Description |
| --------- | ------------- |
| `npm run dev` | Start dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

## Deployment

Deployed on **Cloudflare Pages** with automatic builds on push to `main`. CI runs lint, typecheck, and build via GitHub Actions.
