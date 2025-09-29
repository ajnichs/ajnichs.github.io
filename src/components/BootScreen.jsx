import { useEffect, useState } from 'react'

export default function BootScreen({ onDone, lines = [] }) {
  const [shownLines, setShownLines] = useState([])
  const [blink, setBlink] = useState(true)
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setShownLines(lines)
      const id = setTimeout(onDone, 800)
      return () => clearTimeout(id)
    }

    let i = 0
    const step = () => {
      if (i < lines.length) {
        setShownLines(prev => [...prev, lines[i]])
        i++
        setTimeout(step, 220)
      } else {
        setTimeout(onDone, 900)
      }
    }
    const start = setTimeout(step, 350)
    const cursor = setInterval(() => setBlink(b=>!b), 500)
    const skip = () => onDone()
    window.addEventListener('keydown', skip)
    window.addEventListener('click', skip)
    return () => { clearTimeout(start); clearInterval(cursor); window.removeEventListener('keydown', skip); window.removeEventListener('click', skip) }
  }, [lines, onDone])

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black text-[#8aff80] ${prefersReduced ? '' : 'scan-enabled'}`}>
      <div className="w-[min(92vw,760px)] rounded-lg border border-[#2f2] px-4 py-6 shadow-[0_0_24px_rgba(0,255,128,0.15)] relative overflow-hidden">
        {/* Scanlines + chromatic + CRT mask for the whole boot screen */}
        {!prefersReduced && (
          <>
            <div className="chromatic-left absolute inset-0 pointer-events-none" aria-hidden />
            <div className="chromatic-right absolute inset-0 pointer-events-none" aria-hidden />
            <div className="scanlines absolute inset-0 pointer-events-none" aria-hidden />
            <div className="crt-mask absolute inset-0 pointer-events-none" aria-hidden />
          </>
        )}
        <pre className="whitespace-pre-wrap text-sm leading-6">
{shownLines.join('\n')}
<span className={`ml-1 inline-block h-[1.1em] w-[0.6ch] align-[-0.15em] bg-[#8aff80] ${blink ? 'opacity-90' : 'opacity-10'}`} aria-hidden="true"/>
        </pre>
        <p className="mt-4 text-xs text-[#baffb1]/80">Press any key or click to skip</p>
      </div>
    </div>
  )
}
