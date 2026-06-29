<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ionnixf/homepage/main/media/logo-dark.svg">
  <img alt="Dawn" src="https://raw.githubusercontent.com/ionnixf/homepage/main/media/logo-light.svg">
</picture>

**Dawn** — a browser start page with a terminal-inspired aesthetic. Warm dark/light themes, editorial typography, and a clean, customisable widget layout.

Built with React, TypeScript, Tailwind CSS v4, and Zustand.

```bash
npm install && npm run dev
# → http://localhost:5173
```

---

## ✦ Features

| | |
|---|---|
| **🌓 Dual theme** | Warm dark (`#1a1815`) and light cream (`#faf9f5`) with terracotta accent (`#c15f3c`) |
| **🔍 Prompt bar** | Terminal-style search — Google / DuckDuckGo / Bing |
| **🔗 Quick links** | Editable bookmarks with inline edit & delete |
| **🕐 Live clock** | Monospace time, editorial date |
| **👋 Smart greeting** | Time-of-day message with optional name |
| **🎨 Accent colour** | 8 curated presets or custom colour picker |
| **⚙️ Custom widgets** | Show/hide, drag-to-reorder in edit mode |
| **💾 Persistent** | All settings saved to `localStorage` |
| **✨ Aurora** | Subtle animated ambient glow |

---

## ✦ Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **React 19** + TypeScript strict | Type safety, component model |
| Bundler | **Vite 8** | Fast HMR, instant builds |
| Styling | **Tailwind CSS v4** | Utility-first, `@theme` tokens |
| State | **Zustand 5** → `localStorage` | Selector isolation, simple persist |
| DnD | **@dnd-kit** | Lightweight sortable, accessible |
| Icons | **Lucide React** | Clean, consistent stroke |
| Fonts | **DM Sans** · **DM Mono** · **Source Serif 4** | Anthropic brand-aligned |

---

## ✦ Project structure

```
src/
├── App.tsx                   # Root layout + aurora backdrop
├── main.tsx                  # Entry point, theme init
├── styles/index.css          # Tailwind v4 + design tokens + animations
├── types/index.ts            # TypeScript interfaces
├── lib/store.ts              # Zustand store + localStorage
└── components/
    ├── Greeting.tsx          # Editorial serif, time-of-day
    ├── DateTime.tsx          # Live clock, monospace
    ├── PromptBar.tsx         # Search bar, terminal-style
    ├── QuickLinks.tsx        # Editable bookmarks
    ├── AccentPicker.tsx      # 8 presets + custom picker
    ├── WidgetGrid.tsx        # @dnd-kit sortable container
    ├── WidgetSettings.tsx    # Modal with all controls
    ├── ThemeToggle.tsx       # Dark/light switch
    └── StatusBar.tsx         # Bottom bar with edit mode
```

---

## ✦ Design system

| Token | Dark | Light |
|-------|------|-------|
| Canvas | `#1a1815` | `#faf9f5` |
| Panel | `#201d18` | `#f0eee6` |
| Text | `#e8e6e3` | `#1a1917` |
| Accent | `#c15f3c` | `#c15f3c` |

**Typography:** Source Serif 4 (editorial heading), DM Sans (UI), DM Mono (data).

**Motion:** Custom `cubic-bezier(0.16, 1, 0.3, 1)` transitions, staggered entry fades, aurora drift animation.

---

## ✦ Development

```bash
npm run dev        # Dev server at localhost:5173
npm run build      # Production → dist/
npm run preview    # Preview production build
./start.sh         # Script launcher (dev / build / preview)
```

## ✦ Rollback

```bash
git checkout v0.5.0    # Latest stable
git checkout v0.4.0    # Edit mode
git checkout v0.3.0    # Accent colour picker
```
