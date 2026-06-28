import { Sun, Moon } from 'lucide-react'
import { useStore } from '../lib/store'

export default function ThemeToggle() {
  const theme = useStore((s) => s.theme)
  const toggleTheme = useStore((s) => s.toggleTheme)

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted hover:text-fg
        hover:bg-panel-hover rounded-md transition-colors cursor-pointer"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
      <span className="font-mono text-xs">{theme === 'dark' ? 'light' : 'dark'}</span>
    </button>
  )
}
