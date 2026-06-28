import { useState } from 'react'
import WidgetGrid from './components/WidgetGrid'
import StatusBar from './components/StatusBar'
import WidgetSettings from './components/WidgetSettings'

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <>
      {/* Animated aurora backdrop */}
      <div className="aurora" aria-hidden="true" />

      <main
        className="min-h-dvh flex flex-col items-center justify-center
          px-4 pb-16 pt-8"
      >
        <div className="w-full max-w-xl mx-auto">
          <WidgetGrid />
        </div>
      </main>

      <StatusBar onOpenSettings={() => setSettingsOpen(true)} />

      <WidgetSettings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  )
}
