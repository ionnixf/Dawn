import { useState } from 'react'
import WidgetGrid from './components/WidgetGrid'
import StatusBar from './components/StatusBar'
import WidgetSettings from './components/WidgetSettings'
import { useStore } from './lib/store'

/**
 * The ambient backdrop. CSS shows only the layers for the active
 * `data-backdrop` (set on <html> by the store); the rest are inert.
 * Layers are rendered unconditionally so a theme switch is instant.
 */
function Backdrop() {
  const themeId = useStore((s) => s.themeId)
  const mode = useStore((s) => s.theme)
  const hasLightBg = ['midnight', 'forest'].includes(themeId)
  const photoUrl = mode === 'light' && hasLightBg
    ? `/${themeId.replace('-', '_')}_light_bg.jpg`
    : `/${themeId.replace('-', '_')}_bg.jpg`

  return (
    <div className="backdrop" aria-hidden="true">
      {/* Photo background layers */}
      <div
        className="backdrop__photo"
        style={{ backgroundImage: `url(${photoUrl})` }}
      />
      <div className="backdrop__overlay" />

      {/* Vector/Animated backdrop layers */}
      <div className="backdrop__layer backdrop__layer--1" />
      <div className="backdrop__layer backdrop__layer--2" />
      <div className="backdrop__layer backdrop__layer--glow" />
    </div>
  )
}

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const layoutId = useStore((s) => s.layoutId)

  const mainClass = `min-h-dvh flex flex-col px-4 pb-12 pt-6 w-full ${
    layoutId === 'sidebar'
      ? 'items-stretch md:items-start justify-center'
      : 'items-center justify-center'
  }`

  return (
    <>
      <Backdrop />

      <main className={mainClass}>
        <WidgetGrid />
      </main>

      <StatusBar onOpenSettings={() => setSettingsOpen(true)} />

      <WidgetSettings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  )
}
