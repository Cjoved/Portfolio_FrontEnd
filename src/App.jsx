import { useState, useEffect, useRef } from 'react'
import { motion, MotionConfig } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Toaster } from 'sonner'
import Lenis from 'lenis'
import Hero from './components/Hero'
import WhyAI from './components/WhyAI'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Certifications from './components/Certifications'
import AskCrichWidget from './components/AskCrichWidget'
import { LenisProvider } from './context/LenisContext'

const SITE_URL = 'https://crichveridiano.dev'
const DEFAULT_DESCRIPTION = 'Crich Joved Veridiano — Junior AI Engineer. End-to-end AI systems: multi-agent workflows, document intelligence, computer vision. Python, FastAPI, LangChain, PyTorch, Qdrant.'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const lenisRef = useRef(null)

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'why-ai', 'about', 'skills', 'projects', 'contact', 'certifications']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Helmet>
        <title>Crich Veridiano | Junior AI Engineer</title>
        <meta name="description" content={DEFAULT_DESCRIPTION} />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Crich Veridiano | Junior AI Engineer" />
        <meta property="og:description" content="End-to-end AI systems: multi-agent workflows, document intelligence, computer vision. Python, FastAPI, LangChain, PyTorch, Qdrant." />
        <meta property="og:url" content={SITE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crich Veridiano | Junior AI Engineer" />
        <meta name="twitter:description" content="End-to-end AI systems: multi-agent workflows, document intelligence, computer vision." />
      </Helmet>
      <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          className: 'bg-slate-800/95 border border-cyan-500/30 text-white',
        }}
      />
      <LenisProvider lenisRef={lenisRef}>
        <div className="min-h-screen min-w-[320px] w-full max-w-[100vw] overflow-x-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
          <Navbar activeSection={activeSection} />

          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
          <section id="home">
            <Hero />
          </section>

          <section id="why-ai">
            <WhyAI />
          </section>

          <section id="about">
            <About />
          </section>

          <section id="skills">
            <Skills />
          </section>

          <section id="projects">
            <Projects />
          </section>

          <section id="contact">
            <Contact />
          </section>

          <section id="certifications">
            <Certifications />
          </section>
          </motion.main>

          <AskCrichWidget />
          <ScrollToTop />

          <footer className="py-10 border-t border-cyan-500/20 bg-slate-950/60">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm text-center sm:text-left">
                &copy; 2025 Crich Joved Veridiano · Junior AI Engineer
              </p>
              <div className="flex items-center gap-6" role="navigation" aria-label="Footer links">
                <a href="https://github.com/Cjoved" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm py-1">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/crichveridiano" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm py-1">
                  LinkedIn
                </a>
                <a href="#home" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm py-1">
                  Back to top
                </a>
              </div>
            </div>
            <p className="text-gray-600 text-xs mt-4 text-center">Built with React, Vite, Tailwind & Framer Motion</p>
          </footer>
        </div>
      </LenisProvider>
    </MotionConfig>
  )
}

export default App
