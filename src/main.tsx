import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { useStore } from './lib/store'
import './styles/index.css'
import App from './App'

function Root() {
  const theme = useStore((s) => s.theme)

  useEffect(() => {
    const el = document.documentElement
    el.classList.toggle('dark', theme === 'dark')
    el.classList.toggle('light', theme === 'light')
  }, [theme])

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
