import type { ThemeId, LayoutId, Backdrop } from '../types'

/**
 * Theme metadata. The actual token VALUES live in index.css under
 * `[data-theme="<id>"]` blocks — this file only holds data the UI needs
 * (label, swatch preview colours, which backdrop the theme ships).
 */
export interface ThemeMeta {
  id: ThemeId
  name: string
  /** backdrop strategy — JS syncs this to `data-backdrop` on <html> */
  backdrop: Backdrop
  /** default accent the theme ships with (also the "reset to default" target) */
  defaultAccent: string
  /** swatch colours for the picker preview */
  swatch: {
    /** light-mode canvas */
    lightCanvas: string
    /** light-mode panel */
    lightPanel: string
    /** dark-mode canvas */
    darkCanvas: string
    /** dark-mode panel */
    darkPanel: string
    /** accent */
    accent: string
  }
}

export const THEMES: ThemeMeta[] = [
  {
    id: 'cloud-code',
    name: 'Cloud Code',
    backdrop: 'aurora',
    defaultAccent: '#c15f3c',
    swatch: {
      lightCanvas: '#faf9f5',
      lightPanel: '#f0eee6',
      darkCanvas: '#1a1815',
      darkPanel: '#201d18',
      accent: '#c15f3c',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    backdrop: 'topo',
    defaultAccent: '#7da67d',
    swatch: {
      lightCanvas: '#eef0e8',
      lightPanel: '#e3e6da',
      darkCanvas: '#12150f',
      darkPanel: '#1a1f15',
      accent: '#7da67d',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    backdrop: 'starfield',
    defaultAccent: '#7c8cff',
    swatch: {
      lightCanvas: '#e8ecf4',
      lightPanel: '#dce2ee',
      darkCanvas: '#0d1117',
      darkPanel: '#161b26',
      accent: '#7c8cff',
    },
  },
  {
    id: 'glass',
    name: 'Glass',
    backdrop: 'gradient',
    defaultAccent: '#a888ff',
    swatch: {
      lightCanvas: '#fdf6f0',
      lightPanel: '#ffffff',
      darkCanvas: '#1c1a2e',
      darkPanel: '#2a2742',
      accent: '#a888ff',
    },
  },
]

export interface LayoutMeta {
  id: LayoutId
  name: string
  description: string
}

export const LAYOUTS: LayoutMeta[] = [
  {
    id: 'centered',
    name: 'Centered',
    description: 'Single focused column — the classic Dawn look',
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    description: 'Widgets aligned on the left, canvas clear',
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Wide canvas with hero on top and a links grid',
  },
  {
    id: 'focus',
    name: 'Focus',
    description: 'Just the search bar, nothing else',
  },
]

export const THEME_MAP: Record<ThemeId, ThemeMeta> = Object.fromEntries(
  THEMES.map((t) => [t.id, t]),
) as Record<ThemeId, ThemeMeta>

export function getTheme(id: ThemeId): ThemeMeta {
  return THEME_MAP[id]
}
