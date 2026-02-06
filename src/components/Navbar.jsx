import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '../utils/cn'
import { getImageUrl, getResumeUrl } from '../utils/cloudinary'
import { useLenis } from '../context/LenisContext'

const Navbar = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollTo } = useLenis()

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Why AI', id: 'why-ai' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Certifications', id: 'certifications' },
  ]

  const scrollToSection = (id) => {
    scrollTo(`#${id}`)
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-cyan-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('home') }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 text-xl font-bold text-white"
          >
            <img src={getImageUrl('/logo_fqqftz.png')} alt="Crich Veridiano" className="h-8 w-8 rounded object-contain" />
            <span className="font-extrabold">Crich</span>
            <span className="text-cyan-400 font-semibold">Veridiano</span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'text-sm font-medium transition-colors',
                  activeSection === item.id ? 'text-cyan-400' : 'text-gray-300 hover:text-white'
                )}
              >
                {item.name}
              </motion.button>
            ))}
            <a
              href={getResumeUrl()}
              target="_blank"
              rel="noopener noreferrer"
              download="Crich_Veridiano_Resume.pdf"
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors hidden md:block"
            >
              Resume
            </a>
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm shadow-lg hover:shadow-cyan-500/30 transition-shadow"
            >
              Contact Us
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden text-gray-300 hover:text-cyan-400 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Navigation menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 space-y-2 border-t border-cyan-500/20"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium',
                  activeSection === item.id ? 'text-cyan-400 bg-cyan-500/10' : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                )}
              >
                {item.name}
              </button>
            ))}
            <a href={getResumeUrl()} target="_blank" rel="noopener noreferrer" download="Crich_Veridiano_Resume.pdf" className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-cyan-400">
              Download Resume
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
            >
              Contact Us
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
