export type WidgetId = 'promptBar' | 'quickLinks' | 'dateTime' | 'greeting'

export type ThemeId = 'cloud-code' | 'forest' | 'midnight' | 'glass'
export type LayoutId = 'centered' | 'sidebar' | 'dashboard' | 'focus'
export type Density = 'comfortable' | 'compact'
export type Mode = 'dark' | 'light'
export type Backdrop = 'aurora' | 'starfield' | 'topo' | 'gradient'

export interface WidgetConfig {
  id: WidgetId
  visible: boolean
}

export interface QuickLink {
  id: string
  label: string
  url: string
}

export interface AppState {
  // theme: the existing dark/light field — kept as the "mode" for backward compat.
  theme: Mode
  themeId: ThemeId
  layoutId: LayoutId
  density: Density
  bgType: 'default' | 'photo'
  widgets: WidgetConfig[]
  quickLinks: QuickLink[]
  greetingName: string
  searchEngine: 'google' | 'duckduckgo' | 'bing'
  showBranding: boolean
  accentColor: string
  editing: boolean
  setTheme: (theme: Mode) => void
  toggleTheme: () => void
  setThemeId: (id: ThemeId) => void
  setLayoutId: (id: LayoutId) => void
  setDensity: (d: Density) => void
  setBgType: (bgType: 'default' | 'photo') => void
  toggleWidget: (id: WidgetId) => void
  reorderWidgets: (ids: WidgetId[]) => void
  addQuickLink: (link: QuickLink) => void
  updateQuickLink: (id: string, data: Partial<Pick<QuickLink, 'label' | 'url'>>) => void
  removeQuickLink: (id: string) => void
  setGreetingName: (name: string) => void
  setSearchEngine: (engine: AppState['searchEngine']) => void
  setShowBranding: (show: boolean) => void
  setAccentColor: (color: string) => void
  setEditing: (editing: boolean) => void
}
