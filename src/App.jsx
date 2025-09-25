import Magnetic from "./components/Magnetic";
import GooDefs from "./components/GooDefs";
import ParallaxBlobs from "./components/ParallaxBlobs";
import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Code2, Sparkles, ArrowRight } from "lucide-react";
import projects from "./projects.js";

const skills = [
  "C++", "Java", "JavaScript", "Node.js", "Git", "HTML", "CSS",
  "Python", "SQL", "React", "VSCode", "CLion"
];

export default function App() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/concrete.jpg?v=3')" }}
    >
      <div className="absolute inset-0 bg-white/60 z-0"></div>
      {/* background blobs & filter */}
      <GooDefs />
      <ParallaxBlobs />

      {/* content above blobs */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Projects />
          <Skills />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}


function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-slate-950/60 border-b border-slate-200/60 dark:border-slate-800">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center gap-4">
        <a href="#home" className="flex items-center gap-2 font-semibold">
        <img src="/laptop.png" alt="Logo" className="w-6 h-6" />
        </a>
        <a href="#home" className="flex items-center gap-2 font-semibold">
          <Code2 className="h-5 w-5" />
          <span>AJ Nichols</span>
        </a>
        <div className="ml-auto hidden sm:flex items-center gap-6 text-sm">
        <Magnetic><a href="#projects" className="hover:opacity-80">Projects</a></Magnetic>
        <Magnetic><a href="#skills"   className="hover:opacity-80">Skills</a></Magnetic>
        <Magnetic><a href="#about"    className="hover:opacity-80">About</a></Magnetic>
        <Magnetic><a href="#contact"  className="hover:opacity-80">Contact</a></Magnetic>
        <Magnetic strength={36}>
          <a
          href="/AJ_Nichols_Resume.pdf"
          className="inline-flex items-center gap-1 rounded-xl border border-slate-300 dark:border-slate-700 px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
        Résumé
    </a>
  </Magnetic>
</div>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT: intro text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-slate-700 dark:text-slate-300 w-max">
            <Sparkles className="h-4 w-4" />
            <span>Developer • Designer • Content Creator • Student</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Hi, I’m AJ.
          </h1>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800">
            <a>she/her</a>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Terminally addicted to learning new skills and building cool stuff.<br />
            Currently studying computer science at Millersville University.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:opacity-90"
            >
              View Projects <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="mailto:ajnichols@example.com"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Contact Me <Mail className="h-4 w-4" />
            </a>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <SocialIcon href="https://github.com/ajnichs" label="GitHub">
              <Github className="h-5 w-5" />
            </SocialIcon>
            <SocialIcon href="https://www.linkedin.com/in/ajnichs" label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </SocialIcon>
            <SocialIcon href="mailto:awjnichs@gmail.com" label="Email">
              <Mail className="h-5 w-5" />
            </SocialIcon>
          </div>
        </motion.div>

        {/* RIGHT: photo + featured stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex flex-col items-center space-y-6"
        >
          {/* 👇 Your photo */}
          <a href="#about" className="block w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-slate-300 dark:border-slate-700 shadow-lg transition duration-500 hover:scale-105">
  <img
    src="/me.jpeg"
    alt="AJ Nichols"
    className="object-cover w-full h-full grayscale hover:grayscale-0"
  />
</a>


          {/* Featured Stack card */}
          <div className="aspect-square rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-800 p-2 w-64">
            <div className="h-full w-full rounded-2xl grid place-items-center text-center px-6">
              <p className="text-sm uppercase tracking-widest text-slate-500">
                Featured Stack
              </p>
              <p className="text-2xl sm:text-3xl font-black">
                React • Node.js • Tailwind
              </p>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm">
                C++ • Java • Git
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Projects</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Magnetic key={p.title} strength={15} friction={0.2} className="block">
            <motion.article
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow-lg will-change-transform"
            >
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{p.description}</p>

              <ul className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <li
                    key={t}
                    className="text-xs rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-1 text-slate-600 dark:text-slate-300"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex gap-3">
                {p.repo && (
                  <a href={p.repo} className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
                    Code <Github className="h-4 w-4" />
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
                    Demo <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.article>
          </Magnetic>
        ))}
      </div>
    </section>
  );
}


function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Skills</h2>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        <ul className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <li key={s} className="text-sm rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-slate-700 dark:text-slate-300">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">About me :)</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            I am an incoming third year computer science student at Millersville University.
            So far through my studies, I have gained experience in <strong>C++</strong>, and <strong>Java</strong>
            . Alongside my coursework, I do my best to build projects that I find interesting as a way to develop new skills. 
            As of recently, I have been interested in web development, learning <strong>JavaScript</strong>, <strong>Node.js</strong>
            , and <strong>TailwindCSS</strong>. 
          </p>
          <p className="mt-4 text-slate-700 dark:text-slate-300">
            Outside of coding, I enjoy video editing, content creation, and I occasionally make music using Logic Pro.
            I also work with Wichita-based, independent record label, 
            <a href="https://www.tinasllc.com" className="underline hover:opacity-80"><strong> t.i.n.a.s. LLC</strong></a>, as a 
            pitchwriter and content creator.      
          </p>
          <p> <br />
            I look forward to learing new skills and collaborating on exciting projects!
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <h3 className="font-semibold">Highlights</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>• Built an anonymous posting site with moderation controls</li>
            <li>• Implemented a locally-hosted, interactive browser homepage</li>
            <li>• Designed multiple class projects with Tailwind</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-8 bg-white dark:bg-slate-900">
        <h2 className="text-2xl sm:text-3xl font-bold">Let's chat</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Want to talk about a cool project or opportunity? Feel free to reach out!
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="mailto:awjnichs@gmail.com"
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:opacity-90"
          >
            Email Me <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/ajnichs"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            GitHub <Github className="h-4 w-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/ajnichs"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            LinkedIn <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 text-sm text-slate-500 dark:text-slate-400">
       Developed by AJ Nichols.  © {new Date().getFullYear()} 
      </div>
    </footer>
  )
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {children}
    </a>
  )
}
