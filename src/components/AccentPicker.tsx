import { useRef } from 'react'
import { useStore } from '../lib/store'

const PRESETS = [
  { name: 'Terracotta', hex: '#c15f3c' },
  { name: 'Sage',       hex: '#6b8e6b' },
  { name: 'Amber',      hex: '#c89028' },
  { name: 'Slate Blue', hex: '#5d7a9a' },
  { name: 'Plum',       hex: '#8e5a7a' },
  { name: 'Rust',       hex: '#a04020' },
  { name: 'Forest',     hex: '#3f7a5e' },
  { name: 'Ocean',      hex: '#3d7a85' },
]

export default function AccentPicker() {
  const currentAccent = useStore((s) => s.accentColor)
  const setAccentColor = useStore((s) => s.setAccentColor)
  const pickerRef = useRef<HTMLInputElement>(null)

  const isPreset = PRESETS.some((p) => p.hex === currentAccent)

  function handlePresetClick(hex: string) {
    setAccentColor(hex)
  }

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAccentColor(e.target.value)
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-2.5">
        {PRESETS.map((preset) => (
          <button
            key={preset.hex}
            type="button"
            onClick={() => handlePresetClick(preset.hex)}
            className={`
              group relative flex flex-col items-center gap-1.5 px-2 py-2.5 rounded-lg
              border transition-all cursor-pointer tactile
              ${currentAccent === preset.hex
                ? 'border-accent ring-2 ring-accent/25'
                : 'border-line hover:border-accent/40'
              }
            `}
            title={preset.name}
          >
            <span
              className="block w-6 h-6 rounded-full ring-1 ring-black/10"
              style={{ backgroundColor: preset.hex }}
            />
            <span className="font-sans text-[10px] text-muted truncate w-full text-center">
              {preset.name}
            </span>
          </button>
        ))}

        {/* Custom */}
        <button
          type="button"
          onClick={() => pickerRef.current?.click()}
          className={`
            group relative flex flex-col items-center gap-1.5 px-2 py-2.5 rounded-lg
            border transition-all cursor-pointer tactile
            ${!isPreset
              ? 'border-accent ring-2 ring-accent/25'
              : 'border-line hover:border-accent/40'
            }
          `}
          title="Custom"
        >
          <span
            className="block w-6 h-6 rounded-full ring-1 ring-black/10 flex items-center justify-center"
            style={{ backgroundColor: isPreset ? '#e5e2d8' : currentAccent }}
          >
            {isPreset ? (
              <span className="text-[10px] font-sans text-muted font-medium">+</span>
            ) : null}
          </span>
          <span className="font-sans text-[10px] text-muted truncate w-full text-center">
            Custom
          </span>
        </button>
      </div>

      <input
        ref={pickerRef}
        type="color"
        value={isPreset ? PRESETS.find((p) => p.hex === currentAccent)!.hex : currentAccent}
        onChange={handleCustomChange}
        className="sr-only"
        aria-label="Pick a custom accent color"
      />
    </div>
  )
}
