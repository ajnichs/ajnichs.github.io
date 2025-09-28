import { useEffect, useMemo, useState } from 'react'
import BootScreen from './components/BootScreen'
import RetroFrame from './components/RetroFrame'
import LinkButton from './components/LinkButton'
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

  // --- Typing header config ---
  const titleText = "Amanda J. Nichols"
  const subtitleText = "Developer"
  const titleSpeed = 100 // ms per char
  const subtitleDelay = titleText.length * titleSpeed + 300

  return (
    <main className="min-h-[100svh] bg-base text-text">
      {!booted && <BootScreen lines={bootLines} onDone={() => setBooted(true)} />}

      <RetroFrame>
        {/* Header: mobile-first with typing */}
        <header className="mx-auto w-full max-w-4xl px-4 pt-4 text-center sm:pt-6">
  <TypingLine
    text="Amanda J. Nichols"
    speed={80}
    pause={1500}
    loop={true}
    start={booted}   // ✅ only starts after boot screen is done
    className="drop-shadow-[0_0_3px_#3F853D] block text-2xl sm:text-3xl font-mono text-green-500"
  />
  <TypingLine
    text="Developer"
    speed={60}
    start={booted}
    className="drop-shadow-[0_0_2px_#073811] block mt-1 text-xs sm:text-sm text-green-700"
  />
</header>

        {/* Content: responsive grid becomes two columns on >=md */}
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 p-4 sm:grid-cols-[1fr] sm:gap-8 sm:p-6 md:grid-cols-[260px_1fr]">
          {/* Sprite column (centered on mobile) */}
          <div className="flex flex-col items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}ajsprite.png`}
              alt="AJ sprite portrait"
              className="w-48 md:w-64 
                         drop-shadow-[0_0_12px_#075915] mix-blend-exclusion
                         hover:drop-shadow-[0_0_15px_#3F853D] hover:scale-105 hover:brightness-110
                         transition duration-300 hover:blend-"
            />
          </div>

          {/* Link-tree column */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-green-200">
              Hi!  I'm Amanda (or AJ). I'm a computer science student based in Pennsylvania who loves coding, crpyto, and all that other stuff. 
              <b> This portfolio is currently under construction.</b> Built using Tailwind CSS and React.
            </p>

            <div className="grid gap-3">
              <LinkButton href={LINKS.projects}>View Projects</LinkButton>
              <LinkButton href={LINKS.resume} external>
                <span className="inline-flex items-center justify-center gap-2">
                  <FileText className="text-green-600 h-4 w-4" /> Resume (PDF)
                </span>
              </LinkButton>
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
          </div>
        </div>

        {/* Projects anchor */}
        <section id="projects" className="mx-auto w-full max-w-4xl px-4 pb-8 sm:px-6">
          <h2 className="mb-3 text-base sm:text-lg tracking-widest text-green-500 drop-shadow-[0_0_3px_#3F853D]">PROJECTS</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-green-200">
            <li>Better-Left-Unread — Node.js + SQLite anonymous message board micro-site</li>
            <li>Polynomial Class (C++) — linked-list representation with ops</li>
            <li>Matrix-Style Static Page — cyber aesthetic experiment</li>
          </ul>
        </section>
      </RetroFrame>
    </main>
  )
}
