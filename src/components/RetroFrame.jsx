import { useState } from 'react'

export default function RetroFrame({ children, booted = true, onOpenAscii }) {
  const [scanEnabled, setScanEnabled] = useState(true)

  // When not booted, render children without the bezel or controls so BootScreen stays clean
  if (!booted) {
    return <div className="mx-auto my-6 w-[min(96vw,980px)]">{children}</div>
  }

  return (
    <div className="mx-auto my-6 w-[min(96vw,980px)] rounded-xl border border-[#171a18] bg-[#0a0c10] p-3 sm:p-4 shadow-[0_0_0_2px_#0f1216_inset,0_0_50px_rgba(0,0,0,0.6)]">
      {/* Bezel */}
      <div
        className={`relative overflow-hidden rounded-lg border border-[#090b0a] bg-[#000000] p-3 sm:p-4 shadow-[inset_1_2px_12px_rgba(0,0,0,0.9)] ${scanEnabled ? 'scan-enabled' : ''}`}
        style={{ isolation: 'isolate' }}
      >
  {/* small scanline toggle (top-right) */}
  <div className="absolute right-3 top-3 z-50 flex items-center gap-2 text-[11px] text-green-200 opacity-90">
          {/* ASCII label + small ascii preview button - placed to the left of scanlines toggle */}
          {onOpenAscii && (
            <>
              <span className="hidden sm:inline">ASCII</span>
              <button
                onClick={onOpenAscii}
                title="Open ASCII preview"
                className="inline-flex items-center justify-center h-6 w-6 rounded-sm bg-green-900/30 hover:bg-green-800 text-[11px] text-green-200"
                aria-label="Open ASCII preview"
              >
                <span className="sr-only">Open ASCII preview</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 6h8M8 12h8M8 18h8"/></svg>
              </button>
            </>
          )}
          <span className="hidden sm:inline">Scanlines</span>
          <button
            aria-pressed={scanEnabled}
            onClick={() => setScanEnabled(s => !s)}
            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 ${scanEnabled ? 'bg-green-500' : 'bg-white/10'}`}
            title="Toggle scanlines"
          >
            <span className={`absolute left-0.5 inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${scanEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>

  {/* Screen glass/glare (topmost) - improved visibility while keeping chroma tint) */}
  <div className="glass-glare z-60" />
  <div className="glass-top z-65" />
  {/* Chromatic aberration removed */}
  {/* Scanlines overlay (above content) */}
  <div className="scanlines z-30" aria-hidden />
  {/* CRT curvature / vignette mask (above content) */}
  <div className="crt-mask z-30" aria-hidden />
  {/* Vignette (under glass but above content) */}
  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] mix-blend-darken z-40"/>
  {/* Pixel border */}
  <div className="pointer-events-none absolute inset-2 border border-white/10 z-50" />
  <div className="relative z-10">{children}</div>
      </div>
      {/* Label */}
      <div className="mt-2 text-center text-[10px] uppercase tracking-widest text-green-200">DEVELOPED BY A.J. Nichols © 2025</div>
    </div>
  )
}
