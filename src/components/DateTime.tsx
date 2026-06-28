import { useState, useEffect } from 'react'

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

export default function DateTime() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="widget-card relative overflow-hidden text-center px-8 py-7">
      {/* Accent corner mark */}
      <div className="absolute top-0 left-0 w-[3px] h-full bg-accent/40 rounded-l-xl" />

      <p className="font-sans text-xs text-muted uppercase tracking-[0.2em]">
        {formatDate(now)}
      </p>
      <p
        className="mt-3 text-fg tabular-nums tracking-tight"
        style={{
          fontFamily: '"Source Serif 4", Georgia, serif',
          fontSize: 'clamp(3rem, 12vw, 5rem)',
          lineHeight: 1,
          fontWeight: 600,
        }}
      >
        {formatTime(now)}
      </p>
    </div>
  )
}
