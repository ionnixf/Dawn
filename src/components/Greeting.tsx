import { useState, useEffect } from 'react'
import { useStore } from '../lib/store'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Greeting() {
  const name = useStore((s) => s.greetingName)
  const showBranding = useStore((s) => s.showBranding)
  const [greeting, setGreeting] = useState(getGreeting)

  useEffect(() => {
    const id = setInterval(() => {
      setGreeting(getGreeting())
    }, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="text-center select-none pt-4 pb-2">
      <h1
        className="text-fg font-semibold"
        style={{
          fontFamily: '"Source Serif 4", Georgia, serif',
          fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
        }}
      >
        {greeting}
        {name ? (
          <>
            , <span className="text-accent">{name}</span>
          </>
        ) : null}
      </h1>
      {showBranding ? (
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/60 mt-3">
          Claude Home
        </p>
      ) : null}
    </div>
  )
}
