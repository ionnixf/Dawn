import { useEffect, useRef } from 'react'
import { useStore } from '../lib/store'
import { THEMES, LAYOUTS } from '../lib/themes'
import { X } from 'lucide-react'
import AccentPicker from './AccentPicker'
import type { WidgetId } from '../types'

const WIDGET_LABELS: Record<WidgetId, string> = {
  greeting: 'Greeting',
  dateTime: 'Date & Time',
  promptBar: 'Search Bar',
  quickLinks: 'Quick Links',
}

const WIDGET_DESCRIPTIONS: Record<WidgetId, string> = {
  greeting: 'Time-of-day greeting with your name',
  dateTime: 'Current date and live clock',
  promptBar: 'Terminal-style search prompt',
  quickLinks: 'Editable bookmark grid',
}

function CenteredLayoutPreview({ active }: { active: boolean }) {
  return (
    <svg className="w-full h-8 opacity-75 shrink-0" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="47" height="31" rx="4" stroke="currentColor" strokeOpacity={active ? "0.8" : "0.3"} />
      <rect x="16" y="6" width="16" height="3" rx="0.5" fill="currentColor" fillOpacity={active ? "0.9" : "0.4"} />
      <rect x="10" y="13" width="28" height="6" rx="1" fill="currentColor" fillOpacity={active ? "0.9" : "0.4"} />
      <rect x="14" y="23" width="20" height="3" rx="0.5" fill="currentColor" fillOpacity={active ? "0.9" : "0.4"} />
    </svg>
  )
}

function SidebarLayoutPreview({ active }: { active: boolean }) {
  return (
    <svg className="w-full h-8 opacity-75 shrink-0" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="47" height="31" rx="4" stroke="currentColor" strokeOpacity={active ? "0.8" : "0.3"} />
      <rect x="4" y="5" width="12" height="4" rx="0.5" fill="currentColor" fillOpacity={active ? "0.9" : "0.4"} />
      <rect x="4" y="12" width="12" height="8" rx="1" fill="currentColor" fillOpacity={active ? "0.9" : "0.4"} />
      <rect x="4" y="23" width="12" height="4" rx="0.5" fill="currentColor" fillOpacity={active ? "0.9" : "0.4"} />
    </svg>
  )
}

function DashboardLayoutPreview({ active }: { active: boolean }) {
  return (
    <svg className="w-full h-8 opacity-75 shrink-0" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="47" height="31" rx="4" stroke="currentColor" strokeOpacity={active ? "0.8" : "0.3"} />
      <rect x="6" y="5" width="36" height="4" rx="0.5" fill="currentColor" fillOpacity={active ? "0.9" : "0.4"} />
      <rect x="6" y="12" width="16" height="6" rx="1" fill="currentColor" fillOpacity={active ? "0.9" : "0.4"} />
      <rect x="26" y="12" width="16" height="6" rx="1" fill="currentColor" fillOpacity={active ? "0.9" : "0.4"} />
      <rect x="6" y="21" width="16" height="6" rx="1" fill="currentColor" fillOpacity={active ? "0.9" : "0.4"} />
      <rect x="26" y="21" width="16" height="6" rx="1" fill="currentColor" fillOpacity={active ? "0.9" : "0.4"} />
    </svg>
  )
}

function FocusLayoutPreview({ active }: { active: boolean }) {
  return (
    <svg className="w-full h-8 opacity-75 shrink-0" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="47" height="31" rx="4" stroke="currentColor" strokeOpacity={active ? "0.8" : "0.3"} />
      <rect x="8" y="13" width="32" height="6" rx="1" fill="currentColor" fillOpacity={active ? "0.9" : "0.4"} />
    </svg>
  )
}

const LAYOUT_PREVIEWS: Record<string, (props: { active: boolean }) => React.JSX.Element> = {
  centered: CenteredLayoutPreview,
  sidebar: SidebarLayoutPreview,
  dashboard: DashboardLayoutPreview,
  focus: FocusLayoutPreview,
}

function Toggle({ checked, onChange, id }: { checked: boolean; onChange: () => void; id: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={onChange}
      className={`relative inline-flex items-center h-5 w-9 shrink-0 rounded-full border transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent/40 cursor-pointer tactile ${
        checked
          ? 'bg-accent border-accent shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]'
          : 'bg-input border-line hover:border-line-strong hover:bg-panel shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]'
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-md ring-0
          transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          checked ? 'translate-x-[18px]' : 'translate-x-[2px]'
        }`}
      />
    </button>
  )
}

export default function WidgetSettings({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const widgets = useStore((s) => s.widgets)
  const toggleWidget = useStore((s) => s.toggleWidget)
  const greetingName = useStore((s) => s.greetingName)
  const setGreetingName = useStore((s) => s.setGreetingName)
  const searchEngine = useStore((s) => s.searchEngine)
  const setSearchEngine = useStore((s) => s.setSearchEngine)
  const showBranding = useStore((s) => s.showBranding)
  const setShowBranding = useStore((s) => s.setShowBranding)
  const themeId = useStore((s) => s.themeId)
  const setThemeId = useStore((s) => s.setThemeId)
  const layoutId = useStore((s) => s.layoutId)
  const setLayoutId = useStore((s) => s.setLayoutId)
  const density = useStore((s) => s.density)
  const setDensity = useStore((s) => s.setDensity)
  const bgType = useStore((s) => s.bgType)
  const setBgType = useStore((s) => s.setBgType)
  const mode = useStore((s) => s.theme)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Close on backdrop click
  useEffect(() => {
    if (!isOpen) return
    const el = overlayRef.current
    if (!el) return
    function handler(e: MouseEvent) {
      if (e.target === el) onClose()
    }
    el.addEventListener('mousedown', handler)
    return () => el?.removeEventListener('mousedown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 flex items-start justify-center
        pt-6 sm:items-center sm:pt-0
        bg-canvas/60 backdrop-blur-md"
    >
      {/* Outer Bezel (Double-Bezel) */}
      <div className="p-1 rounded-[1.25rem] bg-canvas/10 border border-white/10 dark:border-black/30 shadow-2xl shadow-black/20 w-full max-w-3xl mx-4 max-h-[90dvh] flex flex-col">
        {/* Inner Core */}
        <div
          className="bg-panel border border-line rounded-[calc(1.25rem-4px)] w-full
            flex flex-col flex-grow overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
        >
        {/* ── Header ───────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line shrink-0">
          <h2 className="font-sans text-sm font-medium text-fg">Settings</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-dim hover:text-fg hover:bg-panel-hover
              transition-all cursor-pointer"
            aria-label="Close settings"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Content ──────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* ── Column 1: Themes, Background, Layout ── */}
            <div className="space-y-6">
              {/* Theme */}
              <section className="pb-5 border-b border-line/30">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1">
                  Theme
                </h3>
                <p className="font-sans text-xs text-dim mb-4">
                  Complete visual identity — palette, backdrop, and materials
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {THEMES.map((t) => {
                    const active = themeId === t.id
                    const sw = t.swatch
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setThemeId(t.id)}
                        className={`
                          group relative flex flex-col gap-2 p-2 rounded-xl
                          border transition-all duration-300 cursor-pointer tactile text-left bg-input/20
                          ${active
                            ? 'border-accent ring-2 ring-accent/25 bg-panel'
                            : 'border-line hover:border-accent/40 hover:bg-panel-hover'
                          }
                        `}
                        aria-pressed={active}
                      >
                        {/* Mini preview: Double-Bezel micro-layout */}
                        <div 
                          className="relative flex items-center justify-center h-14 overflow-hidden rounded-lg border border-line/45 shadow-sm p-1.5"
                          style={{ backgroundColor: mode === 'dark' ? sw.darkCanvas : sw.lightCanvas }}
                        >
                          <div 
                            className="w-full h-full rounded border flex flex-col justify-between p-1 transition-all"
                            style={{ 
                              backgroundColor: mode === 'dark' ? sw.darkPanel : sw.lightPanel,
                              borderColor: 'rgba(127,127,127,0.15)',
                              boxShadow: active ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                            }}
                          >
                            {/* Micro content */}
                            <div className="w-1/2 h-1 rounded-full opacity-60" style={{ backgroundColor: mode === 'dark' ? '#fff' : '#000' }} />
                            <div className="w-2/3 h-1.5 rounded" style={{ backgroundColor: sw.accent }} />
                            <div className="w-full flex gap-0.5 mt-auto">
                              <div className="w-full h-1 rounded-sm bg-line-strong/30" />
                              <div className="w-full h-1 rounded-sm bg-line-strong/30" />
                              <div className="w-full h-1 rounded-sm bg-line-strong/30" />
                            </div>
                          </div>
                        </div>
                        <span className="font-sans text-xs text-fg font-semibold tracking-wide pl-0.5">{t.name}</span>
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Background style selector */}
              <section className="pb-5 border-b border-line/30">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1">
                  Background
                </h3>
                <p className="font-sans text-xs text-dim mb-3">
                  Toggle between vector/animated backdrops or theme photography
                </p>
                <div className="flex gap-2.5">
                  {(['default', 'photo'] as const).map((type) => {
                    const active = bgType === type
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setBgType(type)}
                        className={`
                          flex-1 py-2 rounded-lg text-xs font-sans font-medium tactile
                          transition-all duration-200 cursor-pointer border text-center
                          ${active
                            ? 'bg-accent text-white border-accent'
                            : 'bg-input border-line text-muted hover:text-fg hover:bg-panel-hover hover:border-line-strong'
                          }
                        `}
                      >
                        {type === 'default' ? 'Vector Art' : 'Photo Background'}
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* Layout & Density */}
              <section className="pb-5 md:pb-0">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1">
                  Layout
                </h3>
                <p className="font-sans text-xs text-dim mb-4">
                  Arrange widgets and control display density
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {LAYOUTS.map((l) => {
                    const active = layoutId === l.id
                    const Preview = LAYOUT_PREVIEWS[l.id]
                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => setLayoutId(l.id)}
                        title={l.description}
                        className={`
                          group relative p-2.5 rounded-xl text-xs font-sans text-left tactile
                          transition-all duration-300 cursor-pointer border flex flex-col items-center gap-2 h-auto
                          ${active
                            ? 'bg-accent/10 border-accent/60 text-fg ring-1 ring-accent/20'
                            : 'bg-input border-line text-muted hover:text-fg hover:bg-panel-hover hover:border-line-strong'
                          }
                        `}
                        aria-pressed={active}
                      >
                        {Preview ? <Preview active={active} /> : null}
                        <div className="text-center w-full">
                          <span className="font-semibold block leading-tight">{l.name}</span>
                          <span className={`text-[9px] block truncate leading-tight mt-0.5 ${active ? 'text-accent' : 'text-dim'}`}>
                            {l.description}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Density block */}
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <h4 className="font-sans text-xs font-medium text-fg">Widget Density</h4>
                    <p className="font-sans text-[10px] text-dim">Adjust margins and padding</p>
                  </div>
                  <div className="inline-flex rounded-lg border border-line p-0.5 bg-input/50 shrink-0">
                    {(['comfortable', 'compact'] as const).map((d) => {
                      const active = density === d
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDensity(d)}
                          className={`
                            px-3 py-1 rounded-md text-[11px] font-sans capitalize
                            transition-all duration-200 cursor-pointer hover:bg-panel-hover
                            ${active
                              ? 'bg-panel text-fg shadow-sm'
                              : 'text-muted hover:text-fg'
                            }
                          `}
                          aria-pressed={active}
                        >
                          {d}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </section>
            </div>

            {/* ── Column 2: Widgets, Greeting, Accent, Search ── */}
            <div className="space-y-6">
              {/* Widgets visibility */}
              <section className="pb-5 border-b border-line/30">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1">
                  Active Widgets
                </h3>
                <p className="font-sans text-xs text-dim mb-4">
                  Show or hide widgets on the start page
                </p>
                <div className="space-y-1 max-h-[160px] overflow-y-auto pr-1">
                  {widgets.map((w) => (
                    <label
                      key={w.id}
                      className="flex items-center justify-between py-2 px-2.5
                        rounded-lg hover:bg-panel-hover transition-colors cursor-pointer"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="text-xs text-fg font-medium leading-normal">{WIDGET_LABELS[w.id]}</p>
                        <p className="text-[10px] text-muted leading-tight truncate">{WIDGET_DESCRIPTIONS[w.id]}</p>
                      </div>
                      <Toggle
                        checked={w.visible}
                        onChange={() => toggleWidget(w.id)}
                        id={`widget-${w.id}`}
                      />
                    </label>
                  ))}
                </div>
              </section>

              {/* Greeting personalization */}
              <section className="pb-5 border-b border-line/30">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1">
                  Greeting
                </h3>
                <p className="font-sans text-xs text-dim mb-3">
                  Personalise the time-of-day message
                </p>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={greetingName}
                    onChange={(e) => setGreetingName(e.target.value)}
                    placeholder="Your name"
                    className="flex-1 bg-input border border-line rounded-lg px-3 py-2
                      text-xs text-fg font-sans placeholder:text-dim/50 outline-none
                      transition-all duration-200
                      focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
                  />
                  <label className="flex items-center gap-2 shrink-0 cursor-pointer select-none">
                    <span className="text-xs text-fg">Show "Dawn" branding</span>
                    <Toggle
                      checked={showBranding}
                      onChange={() => setShowBranding(!showBranding)}
                      id="branding-toggle"
                    />
                  </label>
                </div>
              </section>

              {/* Accent Color picker */}
              <section className="pb-5 border-b border-line/30">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1">
                  Accent Color
                </h3>
                <p className="font-sans text-xs text-dim mb-3">
                  Choose a preset or pick your own custom colour
                </p>
                <AccentPicker />
              </section>

              {/* Search Engine */}
              <section className="pb-0">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1">
                  Search Engine
                </h3>
                <p className="font-sans text-xs text-dim mb-3">
                  Which search engine to use in the prompt bar
                </p>
                <div className="flex gap-2">
                  {(['google', 'duckduckgo', 'bing'] as const).map((engine) => (
                    <button
                      key={engine}
                      type="button"
                      onClick={() => setSearchEngine(engine)}
                      className={`flex-1 py-2 rounded-lg text-xs font-sans tactile
                        transition-all duration-200 cursor-pointer border ${
                          searchEngine === engine
                            ? 'bg-accent text-white border-accent'
                            : 'bg-input border-line text-muted hover:text-fg hover:bg-panel-hover hover:border-line-strong'
                        }`}
                    >
                      {engine === 'google' ? 'Google' : engine === 'duckduckgo' ? 'DuckDuckGo' : 'Bing'}
                    </button>
                  ))}
                </div>
              </section>
            </div>

          </div>
        </div>

        {/* ── Footer ────────────────────────────────────────── */}
        <div className="border-t border-line/50 px-6 py-3 shrink-0">
          <p className="font-sans text-[10px] text-dim text-center">
            All settings saved locally in your browser
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}
