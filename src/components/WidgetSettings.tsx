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

function Toggle({ checked, onChange, id }: { checked: boolean; onChange: () => void; id: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={onChange}
      className={`relative inline-flex items-center h-5 w-9 shrink-0 rounded-full border transition-all duration-200 ${
        checked
          ? 'bg-accent border-accent'
          : 'bg-panel border-line hover:border-line-strong'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm ring-0
          transition-all duration-200 ${
          checked ? 'translate-x-[18px]' : 'translate-x-[1px]'
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
        bg-canvas/80 backdrop-blur-sm"
    >
      <div
        className="bg-panel border border-line rounded-xl w-full max-w-3xl mx-4
          shadow-lg flex flex-col max-h-[90dvh]"
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
                          group relative flex flex-col gap-2 p-2.5 rounded-lg
                          border transition-all cursor-pointer tactile text-left
                          ${active
                            ? 'border-accent ring-2 ring-accent/25'
                            : 'border-line hover:border-accent/40'
                          }
                        `}
                        aria-pressed={active}
                      >
                        {/* Mini preview */}
                        <div className="flex items-stretch gap-1 h-9 overflow-hidden rounded">
                          <span
                            className="flex-1 rounded-l"
                            style={{ backgroundColor: mode === 'dark' ? sw.darkCanvas : sw.lightCanvas }}
                          />
                          <span
                            className="flex-1 border-x"
                            style={{
                              backgroundColor: mode === 'dark' ? sw.darkPanel : sw.lightPanel,
                              borderColor: 'rgba(127,127,127,0.15)',
                            }}
                          />
                          <span
                            className="w-3 rounded-r"
                            style={{ backgroundColor: sw.accent }}
                          />
                        </div>
                        <span className="font-sans text-xs text-fg font-medium">{t.name}</span>
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
                <div className="grid grid-cols-2 gap-2">
                  {LAYOUTS.map((l) => {
                    const active = layoutId === l.id
                    return (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => setLayoutId(l.id)}
                        title={l.description}
                        className={`
                          p-2.5 rounded-lg text-xs font-sans text-left tactile
                          transition-all duration-200 cursor-pointer border flex flex-col justify-between h-[64px]
                          ${active
                            ? 'bg-accent text-white border-accent'
                            : 'bg-input border-line text-muted hover:text-fg hover:bg-panel-hover hover:border-line-strong'
                          }
                        `}
                        aria-pressed={active}
                      >
                        <span className="font-medium leading-tight">{l.name}</span>
                        <span className={`text-[10px] block truncate leading-none ${active ? 'text-white/80' : 'text-dim'}`}>
                          {l.description}
                        </span>
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
  )
}
