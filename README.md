# Claude Home

A browser home page inspired by the Claude Code terminal aesthetic — warm dark/light themes, editorial typography, and a clean, customizable widget layout.

Built with React, TypeScript, Tailwind CSS v4, and Zustand.

## Features

- **🌓 Dual theme** — warm dark (`#1a1815`) and light cream (`#faf9f5`) with terracotta accent (`#c15f3c`)
- **🔍 Prompt bar** — terminal-style search with Google / DuckDuckGo / Bing
- **🔗 Quick links** — editable bookmarks with inline edit and delete
- **🕐 Date & time** — live clock in editorial serif
- **👋 Greeting** — time-of-day greeting with optional personalised name
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
| **DM Sans** / **Source Serif 4** / **DM Mono** | Typography (Claude brand-aligned) |

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
    ├── ThemeToggle.tsx       # Dark/light toggle
    └── StatusBar.tsx         # Bottom status bar
```

## Design

Typography follows the Claude / Anthropic brand direction:

- **Source Serif 4** — editorial headings (matching Anthropic Serif)
- **DM Sans** — UI text (matching Anthropic Sans)
- **DM Mono** — technical labels (matching Anthropic Mono)

The colour palette is the warm terracotta-based Claude Code scheme.

## Rollback checkpoints

```bash
git checkout checkpoint-v2   # Latest stable state
git checkout checkpoint-v1   # Before font/proportion changes
```
