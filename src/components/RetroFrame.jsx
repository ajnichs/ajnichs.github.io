export default function RetroFrame({ children }) {
  return (
    <div className="mx-auto my-6 w-[min(96vw,980px)] rounded-xl border border-[#171a18] bg-[#0a0c10] p-3 sm:p-4 shadow-[0_0_0_2px_#0f1216_inset,0_0_50px_rgba(0,0,0,0.6)]">
      {/* Bezel */}
      <div className="relative overflow-hidden rounded-lg border border-[#172219] bg-[#398b4a37] p-3 sm:p-4 shadow-[inset_1_2px_12px_rgba(0,0,0,0.9)]">
        {/* Screen glass/glare */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/12 mix-blend-color-dodge" />
        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] mix-blend-darken"/>
        {/* Pixel border */}
        <div className="pointer-events-none absolute inset-2 border border-white/10" />
        <div className="relative">{children}</div>
      </div>
      {/* Label */}
      <div className="mt-2 text-center text-[10px] uppercase tracking-widest text-green-200">DEVELOPED BY A.J. Nichols © 2025</div>
    </div>
  )
}
