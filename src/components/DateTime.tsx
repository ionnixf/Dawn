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
    <div className="widget-card relative overflow-hidden text-center py-7">
      {/* Accent corner mark */}
      <div className="absolute top-0 left-0 w-1 h-full bg-accent/60" />

      <p className="font-mono text-[11px] text-muted uppercase tracking-[0.2em]">
        {formatDate(now)}
      </p>
      <p className="font-mono text-6xl mt-3 tabular-nums tracking-tight text-fg font-semibold">
        {formatTime(now)}
      </p>
    </div>
  )
}
