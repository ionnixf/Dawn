import { create } from 'zustand'
import { getTheme } from './themes'
import type {
  AppState,
  QuickLink,
  WidgetConfig,
  WidgetId,
  ThemeId,
  LayoutId,
  Density,
} from '../types'

const DEFAULT_WIDGETS: WidgetConfig[] = [
  { id: 'greeting', visible: true },
  { id: 'dateTime', visible: true },
  { id: 'promptBar', visible: true },
  { id: 'quickLinks', visible: true },
]

const DEFAULT_LINKS: QuickLink[] = [
  { id: '1', label: 'GitHub', url: 'https://github.com' },
  { id: '2', label: 'YouTube', url: 'https://youtube.com' },
  { id: '3', label: 'Reddit', url: 'https://reddit.com' },
  { id: '4', label: 'Gmail', url: 'https://mail.google.com' },
]

interface PersistedState {
  // legacy dark/light mode
  theme?: 'dark' | 'light'
  themeId?: ThemeId
  layoutId?: LayoutId
  density?: Density
  bgType?: 'default' | 'photo'
  widgetOrder: WidgetId[]
  widgetVisibility: Record<WidgetId, boolean>
  quickLinks: QuickLink[]
  greetingName: string
  searchEngine: 'google' | 'duckduckgo' | 'bing'
  showBranding: boolean
  accentColor?: string
}

function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem('claude-home-config')
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedState
      // Data migration: cloud-code -> claude-code
      if (parsed.themeId === 'cloud-code' as any) {
        parsed.themeId = 'claude-code'
      }
      // Data migration: focus layout -> centered layout
      if (parsed.layoutId === 'focus' as any) {
        parsed.layoutId = 'centered'
      }
      return parsed
    }
  } catch { /* ignore */ }
  return {
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    themeId: 'claude-code',
    layoutId: 'centered',
    density: 'comfortable',
    bgType: 'default',
    widgetOrder: DEFAULT_WIDGETS.map((w) => w.id),
    widgetVisibility: Object.fromEntries(
      DEFAULT_WIDGETS.map((w) => [w.id, w.visible]),
    ) as Record<WidgetId, boolean>,
    quickLinks: DEFAULT_LINKS,
    greetingName: '',
    searchEngine: 'google',
    showBranding: true,
    accentColor: '#c15f3c',
  }
}

function saveState(state: PersistedState) {
  try {
    localStorage.setItem('claude-home-config', JSON.stringify(state))
  } catch { /* ignore */ }
}

const persisted = loadState()

/**
 * Sync every appearance axis to <html> as data-attributes / classes.
 * CSS reads them; JS never re-implements styling.
 */
function applyAppearance(theme: 'dark' | 'light', themeId: ThemeId, layoutId: LayoutId, density: Density, bgType: 'default' | 'photo') {
  const el = document.documentElement
  // mode — set BOTH the legacy .dark/.light class (for any leftover dark: utilities
  // and the @custom-variant) AND the new data-mode attribute.
  el.classList.toggle('dark', theme === 'dark')
  el.classList.toggle('light', theme === 'light')
  el.dataset.mode = theme
  el.dataset.theme = themeId
  el.dataset.layout = layoutId
  el.dataset.density = density
  el.dataset.bg = bgType
  el.dataset.backdrop = getTheme(themeId).backdrop
}

export const useStore = create<AppState>((set, get) => ({
  // ── State ──
  theme: persisted.theme ?? 'dark',
  themeId: persisted.themeId ?? 'claude-code',
  layoutId: persisted.layoutId ?? 'centered',
  density: persisted.density ?? 'comfortable',
  bgType: persisted.bgType ?? 'default',
  widgets: persisted.widgetOrder.map((id) => ({
    id,
    visible: persisted.widgetVisibility[id] ?? true,
  })),
  quickLinks: persisted.quickLinks,
  greetingName: persisted.greetingName,
  searchEngine: persisted.searchEngine,
  showBranding: persisted.showBranding,
  accentColor: persisted.accentColor || '#c15f3c',
  editing: false,

  // ── Mode (dark/light) ──
  setTheme: (theme) => {
    set({ theme })
    const s = get()
    applyAppearance(theme, s.themeId, s.layoutId, s.density, s.bgType)
    persist(get())
  },

  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark'
    get().setTheme(next)
  },

  // ── Theme (palette/aesthetic) ──
  // Switching theme resets the accent to that theme's default — accent is
  // part of the theme's identity. The user can re-override afterwards.
  setThemeId: (themeId) => {
    const defaultAccent = getTheme(themeId).defaultAccent
    set({ themeId, accentColor: defaultAccent })
    // clear any previous inline override so the theme's value takes effect
    document.documentElement.style.removeProperty('--cl-accent')
    const s = get()
    applyAppearance(s.theme, themeId, s.layoutId, s.density, s.bgType)
    persist(get())
  },

  // ── Layout ──
  setLayoutId: (layoutId) => {
    set({ layoutId })
    const s = get()
    applyAppearance(s.theme, s.themeId, layoutId, s.density, s.bgType)
    persist(get())
  },

  // ── Density ──
  setDensity: (density) => {
    set({ density })
    const s = get()
    applyAppearance(s.theme, s.themeId, s.layoutId, density, s.bgType)
    persist(get())
  },

  // ── BgType (default/photo) ──
  setBgType: (bgType) => {
    set({ bgType })
    const s = get()
    applyAppearance(s.theme, s.themeId, s.layoutId, s.density, bgType)
    persist(get())
  },

  // ── Widgets ──
  toggleWidget: (id) => {
    set((s) => ({
      widgets: s.widgets.map((w) =>
        w.id === id ? { ...w, visible: !w.visible } : w
      ),
    }))
    persist(get())
  },

  reorderWidgets: (ids) => {
    set((s) => ({
      widgets: ids.map((id) => s.widgets.find((w) => w.id === id)!).filter(Boolean),
    }))
    persist(get())
  },

  // ── Quick Links ──
  addQuickLink: (link) => {
    set((s) => ({ quickLinks: [...s.quickLinks, link] }))
    persist(get())
  },

  updateQuickLink: (id, data) => {
    set((s) => ({
      quickLinks: s.quickLinks.map((l) =>
        l.id === id ? { ...l, ...data } : l
      ),
    }))
    persist(get())
  },

  removeQuickLink: (id) => {
    set((s) => ({ quickLinks: s.quickLinks.filter((l) => l.id !== id) }))
    persist(get())
  },

  // ── Settings ──
  setGreetingName: (name) => {
    set({ greetingName: name })
    persist(get())
  },

  setSearchEngine: (engine) => {
    set({ searchEngine: engine })
    persist(get())
  },

  setShowBranding: (show) => {
    set({ showBranding: show })
    persist(get())
  },

  setAccentColor: (color) => {
    set({ accentColor: color })
    document.documentElement.style.setProperty('--cl-accent', color)
    persist(get())
  },

  setEditing: (editing) => {
    set({ editing })
  },
}))

/**
 * Apply the loaded appearance ONCE on module init so the very first paint
 * already has the right data-attributes (avoids a flash of default theme).
 */
applyAppearance(
  persisted.theme ?? 'dark',
  persisted.themeId ?? 'claude-code',
  persisted.layoutId ?? 'centered',
  persisted.density ?? 'comfortable',
  persisted.bgType ?? 'default',
)
// Re-apply the saved accent override (if any) so it survives reload.
// Compare against the active theme's default — only inline-override the
// CSS var when the user actually picked something different.
{
  const themeDefault = getTheme(persisted.themeId ?? 'claude-code').defaultAccent
  if (persisted.accentColor && persisted.accentColor !== themeDefault) {
    document.documentElement.style.setProperty('--cl-accent', persisted.accentColor)
  }
}

function persist(state: AppState) {
  saveState({
    theme: state.theme,
    themeId: state.themeId,
    layoutId: state.layoutId,
    density: state.density,
    bgType: state.bgType,
    widgetOrder: state.widgets.map((w) => w.id),
    widgetVisibility: Object.fromEntries(
      state.widgets.map((w) => [w.id, w.visible]),
    ) as Record<WidgetId, boolean>,
    quickLinks: state.quickLinks,
    greetingName: state.greetingName,
    searchEngine: state.searchEngine,
    showBranding: state.showBranding,
    accentColor: state.accentColor,
  })
}
