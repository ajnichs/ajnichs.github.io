import { useEffect, useMemo, useState } from 'react'
import BootScreen from './components/BootScreen'
import RetroFrame from './components/RetroFrame'
import LinkButton from './components/LinkButton'
import Ascii3D from './components/Ascii3D'
import TypingLine from "./components/TypingLine";
import { Github, Linkedin, Mail, FileText } from 'lucide-react'

const LINKS = {
  resume: `${import.meta.env.BASE_URL}resume.pdf`,
  github: 'https://github.com/ajnichs',
  linkedin: 'https://www.linkedin.com/in/ajnichs',
  email: 'mailto:awjnichs@gmail.com',
  projects: '#projects', // <- added so the button works
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [asciiShape, setAsciiShape] = useState('donut')
  const [asciiOpen, setAsciiOpen] = useState(false)

  // sprite URL (used for masking the overlay so transparency isn't tinted)
  const spriteUrl = `${import.meta.env.BASE_URL}ajsprite.png`

  const bootLines = useMemo(() => [
    'AJN-PORTFOLIO v1.0',
    'Checking memory ............. OK',
    'Importing libraries ......... OK',
    'Loading drivers ............. OK',
    'Mounting /home/aj ........... OK',
    'Preparing for launch ........ OK',
    '',
    'aj-nichols:~$ Developed by AJ NICHOLS © 2025',
  ], [])

  useEffect(() => {
    const onKey = () => setBooted(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('click', onKey)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('click', onKey) }
  }, [])

  // restore ascii shape preference
  useEffect(() => {
    try {
      const key = window.localStorage.getItem('ascii.shape')
      if (key) setAsciiShape(key)
    } catch (e) {
      // ignore
    }
  }, [])

  // close modal on escape
  useEffect(() => {
    if (!asciiOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setAsciiOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [asciiOpen])

  // --- Typing header config ---
  const titleText = "Amanda J. Nichols"
  const subtitleText = "Developer"
  const titleSpeed = 100 // ms per char
  const subtitleDelay = titleText.length * titleSpeed + 300

  return (
    <main className="min-h-[100svh] bg-base text-text">
      {!booted && <BootScreen lines={bootLines} onDone={() => setBooted(true)} />}

  <RetroFrame booted={booted} onOpenAscii={() => setAsciiOpen(true)}>
        {/* Header: mobile-first with typing */}
        <header className="mx-auto w-full max-w-4xl px-4 pt-4 text-center sm:pt-6">
  <TypingLine
    text="Amanda J. Nichols"
    speed={200}
    pause={5000}
    loop={false}
    start={booted}   // ✅ only starts after boot screen is done
    className="drop-shadow-[0_0_3px_#3F853D] block text-2xl sm:text-3xl font-mono text-green-500"
  />
  <TypingLine
    text="Developer"
    speed={200}
    start={booted + 300}
    className="drop-shadow-[0_0_2px_#073811] block mt-1 text-xs sm:text-sm text-green-700"
  />
</header>

        {/* Content: responsive grid becomes two columns on >=md */}
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 p-4 sm:grid-cols-[1fr] sm:gap-8 sm:p-6 md:grid-cols-[260px_1fr]">
          {/* Sprite column (centered on mobile) */}
          <div className="flex flex-col items-center gap-2">
            {/* wrapper controls sizing and hover transform so img + overlay stay aligned */}
            <div className="relative w-48 md:w-64 transform transition duration-300 hover:scale-105 group">
              <img
                src={`${import.meta.env.BASE_URL}ajsprite.png`}
                alt="AJ sprite portrait"
                className="w-full h-auto drop-shadow-[0_0_10px_#000000] contrast-125
                transition duration-300 group-hover:saturate-150"
              />
              {/* green overlay - masked to the sprite image so transparency isn't tinted */}
              <div
                aria-hidden
                className="absolute inset-0 bg-green-500 opacity-50 mix-blend-overlay pointer-events-none transition-opacity duration-300 group-hover:opacity-60"
                style={{
                  WebkitMaskImage: `url(${spriteUrl})`,
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskSize: '100% 100%',
                  WebkitMaskPosition: 'center',
                  maskImage: `url(${spriteUrl})`,
                  maskRepeat: 'no-repeat',
                  maskSize: '100% 100%',
                  maskPosition: 'center',
                }}
              />
            </div>
            {/* left column intentionally minimal (projects list kept below) */}
            
          </div>

          {/* Link-tree column */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-green-200">
              Hi!  I'm Amanda (or AJ). I'm a computer science student based in Pennsylvania who loves coding, crypto, and all that other stuff. <br /> <br />
              <b> This portfolio is currently under construction.</b>
            </p>

            <div className="grid gap-3">
              <LinkButton href={LINKS.projects}>View Projects</LinkButton>
        
              <LinkButton href={LINKS.github} external>
                <span className="inline-flex items-center justify-center gap-2">
                  <Github className="text-green-600 h-4 w-4" /> GitHub
                </span>
              </LinkButton>
              <LinkButton href={LINKS.linkedin} external>
                <span className="inline-flex items-center justify-center gap-2">
                  <Linkedin className="text-green-600 h-4 w-4" /> LinkedIn
                </span>
              </LinkButton>
              <LinkButton href={LINKS.email} external>
                <span className="inline-flex items-center justify-center gap-2">
                  <Mail className="text-green-600 h-4 w-4" /> Email
                </span>
              </LinkButton>
            </div>
            {/* right column link-tree (donut moved below to be isolated) */}
            
          </div>
        </div>
        {/* Isolated ASCII animation row (no left/right neighbors) */}
        {/* ASCII preview moved to bezel controls via RetroFrame.onOpenAscii */}

        {/* ASCII Modal popup */}
        {asciiOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setAsciiOpen(false)}
              aria-hidden
            />

            <div className="relative z-10 w-[min(90vw,720px)] max-h-[85vh] overflow-auto p-4 rounded-md bg-[#021004] border border-green-800 shadow-2xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-green-300">ASCII Playground</span>
                  <div className="flex items-center gap-2">
                    {['donut','pyramid','cube'].map(s => (
                      <button
                        key={s}
                        onClick={() => {
                          setAsciiShape(s)
                          try { window.localStorage.setItem('ascii.shape', s) } catch (e) {}
                        }}
                        className={`px-2 py-1 text-[11px] font-mono rounded-sm transition-colors ${asciiShape===s ? 'bg-green-600 text-black' : 'bg-green-900/30 text-green-200'}`}
                        aria-pressed={asciiShape===s}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => setAsciiOpen(false)}
                    className="px-2 py-1 bg-red-700 hover:bg-red-600 rounded text-xs font-mono text-white"
                    aria-label="Close ASCII Preview"
                    autoFocus
                  >Close</button>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <Ascii3D cols={64} rows={24} speed={1} shape={asciiShape} className="text-green-300/90" />
              </div>
            </div>
          </div>
        )}

        {/* Projects anchor (kept below) */}
        <section id="projects" className="mx-auto w-full max-w-4xl px-4 pb-8 sm:px-6">
          <h2 className="mb-3 text-base sm:text-lg tracking-widest text-green-500 drop-shadow-[0_0_3px_#3F853D]">PROJECTS</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-green-200">
            <li>Better-Left-Unread ---- Node.js + SQLite</li>
            <li>Retro Portfolio ------- Tailwind CSS + React + Vite + Git</li>
            <li>Trading Bot (WIP) ----- Python </li>
          </ul>
        </section>
      </RetroFrame>
    </main>
  )
}
