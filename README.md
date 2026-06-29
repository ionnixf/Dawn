# Dawn

A browser start page with a terminal-inspired aesthetic — warm dark/light themes, editorial typography, and a clean, customizable widget layout.

Built with React, TypeScript, Tailwind CSS v4, and Zustand.

## Features

- **🌓 Dual theme** — warm dark (`#1a1815`) and light cream (`#faf9f5`) with terracotta accent (`#c15f3c`)
- **🔍 Prompt bar** — terminal-style search with Google / DuckDuckGo / Bing
- **🔗 Quick links** — editable bookmarks with inline edit and delete
- **🕐 Date & time** — live clock in monospace
- **👋 Greeting** — time-of-day greeting with optional personalised name
- **🎨 Accent color** — 8 curated presets or custom picker
- **⚙️ Customisable widgets** — show/hide and drag-to-reorder each widget
- **💾 Persistent** — all settings saved to `localStorage`
- **✨ Aurora background** — subtle animated ambient glow

## Tech

| Tool | Why |
|------|-----|
| [Vite](https://vite.dev/) | Fast dev server and builds |
| [React 19](https://react.dev/) | UI components |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Zustand](https://github.com/pmndrs/zustand) | Lightweight state management |
| [@dnd-kit](https://dndkit.com/) | Drag-to-reorder widgets |
| [Lucide](https://lucide.dev/) | Icons |
| **DM Sans** / **Source Serif 4** / **DM Mono** | Typography |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173/

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── App.tsx                   # Root layout with aurora backdrop
├── main.tsx                  # Entry point, theme initialisation
├── styles/index.css          # Tailwind v4 + design tokens + aurora
├── types/index.ts            # TypeScript interfaces
├── lib/store.ts              # Zustand store + localStorage persistence
└── components/
    ├── Greeting.tsx          # Time-of-day greeting
    ├── DateTime.tsx          # Live date & time
    ├── PromptBar.tsx         # Search prompt bar
    ├── QuickLinks.tsx        # Editable bookmarks
    ├── WidgetGrid.tsx        # DnK container for widgets
    ├── WidgetSettings.tsx    # Settings modal
    ├── AccentPicker.tsx      # Color preset/picker grid
    ├── ThemeToggle.tsx       # Dark/light toggle
    └── StatusBar.tsx         # Bottom status bar
```

## Design

- **Source Serif 4** — editorial greeting heading
- **DM Sans** — UI text
- **DM Mono** — data and technical labels

The colour palette uses a warm terracotta-based scheme with 8 swappable accent colours.
