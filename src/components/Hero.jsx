import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Lottie from 'lottie-react'

const Hero = () => {
  const [avatarError, setAvatarError] = useState(false)
  const [lottieData, setLottieData] = useState(null)

  // Subtle decorative Lottie (optional; fails gracefully if URL is down)
  useEffect(() => {
    fetch('https://assets2.lottiefiles.com/packages/lf20_2cw3s2xx.json')
      .then((r) => (r.ok ? r.json() : null))
      .then(setLottieData)
      .catch(() => setLottieData(null))
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Cjoved' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/crichveridiano' },
    { icon: FaEnvelope, href: 'mailto:veridianocrich@gmail.com' },
  ]

  return (
    <div className="min-h-screen flex items-center px-4 pt-16 pb-24 relative overflow-hidden">
      {/* neuro.jpg: ambient AI/neural theme; strong overlay keeps text primary (UX) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: 'url(/neuro.jpg)' }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/92 via-slate-950/85 to-slate-950/95 pointer-events-none" aria-hidden />
      {/* Optional Lottie accent (top-right, subtle) */}
      {lottieData && (
        <div className="absolute top-20 right-4 w-24 h-24 md:w-32 md:h-32 opacity-30 pointer-events-none" aria-hidden>
          <Lottie animationData={lottieData} loop className="w-full h-full" />
        </div>
      )}
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Headline + CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-left"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Unleashing the Power of{' '}
            <span className="text-cyan-400">AI</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-400 mb-8 max-w-xl"
          >
            Transforming ideas with secure, scalable, and intelligent systems—multi-agent workflows, document intelligence, and computer vision.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-8"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="min-h-[44px] inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-cyan-500/30 transition-shadow"
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="min-h-[44px] inline-flex items-center px-6 py-3 rounded-lg border border-cyan-500/60 text-cyan-400 font-semibold hover:bg-cyan-500/10 transition-colors"
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="min-h-[44px] inline-flex items-center px-6 py-3 rounded-lg text-gray-400 font-semibold hover:text-white transition-colors"
            >
              Download Resume
            </motion.a>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl text-gray-500 hover:text-cyan-400 transition-colors"
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Profile image + depth layer (reference: blurred designs behind headshot) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex justify-center items-center"
        >
          {/* Depth: blurred “cards” behind profile for layered look */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none" aria-hidden>
            <div className="absolute w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 blur-xl -translate-x-16 translate-y-8 rotate-6" />
            <div className="absolute w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-2xl bg-blue-500/15 border border-blue-400/20 blur-xl translate-x-14 -translate-y-4 -rotate-12" />
            <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-amber-500/10 border border-amber-400/20 blur-lg translate-y-12 rotate-3" />
          </div>
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-80 lg:h-80 xl:w-[26rem] xl:h-[26rem] 2xl:w-[28rem] 2xl:h-[28rem]">
            {/* Outer glow – stronger so image stands out */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-cyan-500/25 via-blue-500/20 to-cyan-600/25 blur-2xl opacity-90" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/15 to-blue-600/15 blur-xl glow-cyan" />
            {/* Frame – thicker border, ring for depth */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-400/60 bg-slate-800/80 shadow-2xl ring-4 ring-cyan-500/20 flex items-center justify-center"
            >
              {!avatarError ? (
                <img
                  src="/avatar.png"
                  alt="Crich Joved Veridiano"
                  className="w-full h-full object-cover object-top scale-105"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <img
                  src="/profile.png"
                  alt="Crich Joved Veridiano"
                  className="w-full h-full object-cover object-top scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextElementSibling?.classList.remove('hidden')
                  }}
                />
              )}
              <div className="hidden w-full h-full flex flex-col items-center justify-center gap-1 bg-slate-800/80 absolute inset-0">
                <span className="text-5xl xl:text-6xl font-bold text-cyan-400/80">CJV</span>
                <span className="text-xs text-gray-500">Profile photo</span>
              </div>
            </motion.div>
            {/* Tech badges */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
              {['LLM', 'CV', 'NLP'].map((label, i) => (
                <div
                  key={i}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-cyan-500/40 flex items-center justify-center text-[10px] font-semibold text-cyan-400/80 bg-slate-800/90 backdrop-blur-sm"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
