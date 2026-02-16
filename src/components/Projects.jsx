import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaRobot } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import { getImageUrl } from '../utils/cloudinary'
import gsap from 'gsap'
import { projects, projectTypes, TAG_CLASS, FILTER_CATEGORIES } from '../data/projectsData'

// Desktop carousel — maximized space
const CARD_WIDTH_DESKTOP = 450
const CARD_GAP_DESKTOP = 32
const VIEWPORT_W_DESKTOP = 1100

// Mobile carousel — compact but readable
const CARD_WIDTH_MOBILE = 270
const CARD_GAP_MOBILE = 14
const VIEWPORT_W_MOBILE = 320

const SLIDESHOW_INTERVAL_MS = 3500

function ProjectImage({ project, className = 'w-full h-full object-cover' }) {
  const images = project.images?.length > 1 ? project.images : null
  const singleImage = project.images?.[0] ?? project.image
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length <= 1) return
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % images.length)
    }, SLIDESHOW_INTERVAL_MS)
    return () => clearInterval(id)
  }, [images])

  const rawSrc = images ? images[slideIndex] : singleImage
  if (!rawSrc) return null
  const src = getImageUrl(rawSrc, { quality: 'auto', fetchFormat: 'auto' })
  const showRobotPlaceholder = (e) => {
    const el = e.target
    el.style.display = 'none'
    el.nextElementSibling?.classList.remove('hidden')
  }

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={src}
          src={src}
          alt={project.title}
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onError={showRobotPlaceholder}
        />
      </AnimatePresence>
      <div className="hidden w-full h-full bg-slate-800/80 flex items-center justify-center absolute inset-0">
        <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-500/40 flex items-center justify-center">
          <FaRobot className="w-8 h-8 text-cyan-400" />
        </div>
      </div>
    </div>
  )
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('professional')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)
  const trackDesktopRef = useRef(null)
  const trackMobileRef = useRef(null)

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'academic') return p.type === 'academic' || p.type === 'internship'
    return p.type === activeFilter
  })

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeFilter])

  useEffect(() => {
    if (currentIndex >= filteredProjects.length && filteredProjects.length > 0) {
      setCurrentIndex(filteredProjects.length - 1)
    }
  }, [currentIndex, filteredProjects.length])

  const goNext = () => {
    if (filteredProjects.length <= 1) return
    setDescriptionExpanded(false)
    setCurrentIndex((i) => (i + 1) % filteredProjects.length)
  }
  const goPrev = () => {
    if (filteredProjects.length <= 1) return
    setDescriptionExpanded(false)
    setCurrentIndex((i) => (i - 1 + filteredProjects.length) % filteredProjects.length)
  }

  const CAROUSEL_PADDING = 2

  // Desktop GSAP
  useEffect(() => {
    const el = trackDesktopRef.current
    if (!el || filteredProjects.length === 0) return

    const step = CARD_WIDTH_DESKTOP + CARD_GAP_DESKTOP
    const centerIndex = CAROUSEL_PADDING + currentIndex
    const offset = VIEWPORT_W_DESKTOP / 2 - CARD_WIDTH_DESKTOP / 2 - centerIndex * step

    gsap.to(el, {
      x: offset,
      duration: 0.6,
      ease: 'power2.out'
    })
  }, [currentIndex, filteredProjects.length])

  // Mobile GSAP
  useEffect(() => {
    const el = trackMobileRef.current
    if (!el || filteredProjects.length === 0) return

    const step = CARD_WIDTH_MOBILE + CARD_GAP_MOBILE
    const centerIndex = CAROUSEL_PADDING + currentIndex
    const offset = VIEWPORT_W_MOBILE / 2 - CARD_WIDTH_MOBILE / 2 - centerIndex * step

    gsap.to(el, {
      x: offset,
      duration: 0.5,
      ease: 'power2.out'
    })
  }, [currentIndex, filteredProjects.length])

  const currentProject = filteredProjects[currentIndex]
  const hasProjects = filteredProjects.length > 0

  const getCircularArray = (arr, padding = 2) => {
    if (arr.length === 0) return []
    const n = arr.length
    const result = [...arr]
    for (let i = 0; i < padding; i++) {
      result.unshift(arr[(n - 1 - i + n) % n])
      result.push(arr[i % n])
    }
    return result
  }

  const DescriptionPanel = () =>
    currentProject ? (
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border-l-4 border-l-cyan-400/80 border border-cyan-500/30 p-2.5 sm:p-4 md:p-5 shadow-xl">
        <div className="flex flex-col gap-1.5 sm:gap-3 md:gap-4">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3">
            <div className="min-w-0">
              <h3 className="font-display text-sm sm:text-lg font-semibold text-white leading-tight">
                {currentProject.title}
              </h3>
              {currentProject.subtitle && (
                <span className="text-cyan-400/90 text-xs sm:text-sm font-medium block sm:inline mt-0.5 sm:mt-0">
                  — {currentProject.subtitle}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.a
                href={currentProject.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/25 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/35 hover:text-white transition-colors font-semibold text-xs sm:text-sm"
              >
                <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> View code
              </motion.a>
              {currentProject.demo && (
                <motion.a
                  href={currentProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-400 hover:text-cyan-400 border border-slate-600 hover:border-cyan-500/40 transition-colors text-xs sm:text-sm"
                >
                  <FaExternalLinkAlt className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Demo
                </motion.a>
              )}
            </div>
          </div>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-none md:line-clamp-4">
            {currentProject.description}
          </p>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-gray-500 text-[10px] sm:text-xs font-medium uppercase tracking-wider">Tech:</span>
            {currentProject.tech.map((tech, ti) => (
              <span
                key={ti}
                className="px-2 py-0.5 rounded text-[10px] sm:text-xs bg-slate-700/90 text-gray-300 border border-slate-600/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  ) : null

  return (
    <div className="relative min-h-screen py-16 sm:py-20 md:py-24 px-3 sm:px-4 overflow-x-hidden overflow-y-visible">
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" aria-hidden />
      <div className="max-w-[1440px] mx-auto relative flex flex-col z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <h2 className="text-section-title sm:text-section-title-md md:text-section-title-lg lg:text-section-title-xl font-bold text-white mb-3 sm:mb-4">
            Featured <span className="text-amber-400 font-display italic">Projects</span>
          </h2>
          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-cyan-500 mx-auto mb-2" />
          <p className="text-gray-400 text-sm sm:text-base mt-3 sm:mt-4 max-w-xl mx-auto px-1">
            Multi-agent systems, document AI, and computer vision.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="flex justify-center mb-6 sm:mb-8 md:mb-10"
          role="tablist"
          aria-label="Project category filter"
        >
          <div className="inline-flex p-1 rounded-lg sm:rounded-xl bg-slate-800/80 border border-slate-600/50 shadow-inner">
            {FILTER_CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat.id
              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show ${cat.label} projects`}
                  onClick={() => setActiveFilter(cat.id)}
                  whileTap={{ scale: 0.98 }}
                  className={`relative px-3 py-2.5 sm:px-5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium min-h-[44px] flex items-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="absolute inset-0 rounded-lg bg-cyan-500/25 border border-cyan-500/50"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Empty state */}
        {!hasProjects && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-16 md:py-24 px-4 rounded-2xl border border-slate-600/50 bg-slate-800/40 backdrop-blur-sm"
          >
            <p className="text-gray-400 text-lg md:text-xl font-medium">Soon to be added</p>
            <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto">Personal projects will appear here.</p>
          </motion.div>
        )}

        {/* MOBILE: Clean spacing hierarchy */}
        {hasProjects && (
        <div className="flex flex-col md:hidden gap-3">
          {/* Dots */}
          <div className="flex items-center justify-center gap-2">
            {filteredProjects.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => { setDescriptionExpanded(false); setCurrentIndex(i) }}
                aria-label={`Project ${i + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-8 bg-cyan-400' : 'w-2.5 bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          {/* Carousel */}
          <div className="w-full flex justify-center px-2">
            <div 
              className="relative overflow-hidden flex justify-center"
              style={{ 
                width: VIEWPORT_W_MOBILE,
                maxWidth: '100%',
                height: 340,
                perspective: '1000px'
              }}
            >
              <div
                ref={trackMobileRef}
                className="absolute left-0 top-0 flex items-start"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                {getCircularArray(filteredProjects, 2).map((project, idx) => {
                  const actualIdx = (idx - 2 + filteredProjects.length) % filteredProjects.length
                  const isCenter = actualIdx === currentIndex
                  const offset = actualIdx - currentIndex
                  
                  let normalizedOffset = offset
                  if (offset > filteredProjects.length / 2) {
                    normalizedOffset = offset - filteredProjects.length
                  } else if (offset < -filteredProjects.length / 2) {
                    normalizedOffset = offset + filteredProjects.length
                  }

                  const isLeft = normalizedOffset === -1
                  const isRight = normalizedOffset === 1
                  
                  return (
                    <motion.div
                      key={`mobile-${project.title}-${idx}`}
                      className="flex-shrink-0 cursor-pointer"
                      style={{
                        width: CARD_WIDTH_MOBILE,
                        marginRight: CARD_GAP_MOBILE,
                        transformStyle: 'preserve-3d',
                      }}
                      animate={{
                        scale: isCenter ? 1 : 0.85,
                        rotateY: isLeft ? 25 : isRight ? -25 : 0,
                        zIndex: isCenter ? 30 : 10,
                        opacity: isCenter ? 1 : 0.75,
                        filter: isCenter ? 'blur(0px) brightness(1)' : 'blur(3px) brightness(0.7)',
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      onClick={() => !isCenter && setCurrentIndex(actualIdx)}
                    >
                      <div className={`rounded-xl overflow-hidden border-2 ${isCenter ? 'border-cyan-400/60 shadow-2xl' : 'border-slate-600/40'}`}>
                        <div className="bg-slate-800/95">
                          <div className="relative w-full aspect-[4/3] bg-slate-800 overflow-hidden">
                            {(project.image || project.images?.length) ? (
                              <ProjectImage project={project} />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-800/80">
                                <FaRobot className="w-8 h-8 text-cyan-400" />
                              </div>
                            )}
                            {project.tag && (
                              <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-medium border ${TAG_CLASS}`}>
                                {project.tag}
                              </span>
                            )}
                            <span className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-medium border ${projectTypes[project.type].class}`}>
                              {projectTypes[project.type].label}
                            </span>
                          </div>
                          <div className="p-2.5">
                            <h3 className="font-display text-sm font-semibold text-white line-clamp-1">{project.title}</h3>
                            {project.subtitle && (
                              <p className="text-cyan-400/90 text-xs mt-0.5 line-clamp-1">{project.subtitle}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Arrows - proper spacing */}
          <div className="flex justify-center items-center gap-8">
            <motion.button
              type="button"
              onClick={goPrev}
              aria-label="Previous"
              disabled={filteredProjects.length <= 1}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-slate-800/95 border-2 border-cyan-500/50 text-cyan-400 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none hover:bg-cyan-500/20 transition-colors"
            >
              <FaChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              type="button"
              onClick={goNext}
              aria-label="Next"
              disabled={filteredProjects.length <= 1}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-slate-800/95 border-2 border-cyan-500/50 text-cyan-400 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none hover:bg-cyan-500/20 transition-colors"
            >
              <FaChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Description - proper spacing */}
          <div>
            <DescriptionPanel />
          </div>
        </div>
        )}

        {/* DESKTOP - unchanged */}
        {hasProjects && (
        <div className="hidden md:block w-full">
          <div className="flex items-center justify-center gap-2 mb-2">
            {filteredProjects.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => { setDescriptionExpanded(false); setCurrentIndex(i) }}
                aria-label={`Project ${i + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-8 bg-cyan-400' : 'w-2.5 bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
              <motion.button
                type="button"
                onClick={goPrev}
                aria-label="Previous project"
                disabled={filteredProjects.length <= 1}
                whileHover={{ scale: filteredProjects.length > 1 ? 1.08 : 1 }}
                whileTap={{ scale: 0.96 }}
                className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-slate-800/95 border-2 border-cyan-500/50 text-cyan-400 shadow-xl flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                <FaChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              </motion.button>
              <div 
                className="relative overflow-hidden flex justify-center flex-shrink-0"
                style={{ width: VIEWPORT_W_DESKTOP, height: 520, perspective: '1200px' }}
              >
                <div
                  ref={trackDesktopRef}
                  className="absolute left-0 top-0 flex items-start"
                  style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                >
                  {getCircularArray(filteredProjects, 2).map((project, idx) => {
                    const actualIdx = (idx - 2 + filteredProjects.length) % filteredProjects.length
                    const isCenter = actualIdx === currentIndex
                    const offset = actualIdx - currentIndex
                    
                    let normalizedOffset = offset
                    if (offset > filteredProjects.length / 2) {
                      normalizedOffset = offset - filteredProjects.length
                    } else if (offset < -filteredProjects.length / 2) {
                      normalizedOffset = offset + filteredProjects.length
                    }

                    const isLeft = normalizedOffset === -1
                    const isRight = normalizedOffset === 1
                    
                    return (
                      <motion.div
                        key={`desktop-${project.title}-${idx}`}
                        className="flex-shrink-0 cursor-pointer"
                        style={{
                          width: CARD_WIDTH_DESKTOP,
                          marginRight: CARD_GAP_DESKTOP,
                          transformStyle: 'preserve-3d',
                        }}
                        animate={{
                          scale: isCenter ? 1 : 0.88,
                          rotateY: isLeft ? 25 : isRight ? -25 : 0,
                          zIndex: isCenter ? 30 : 10,
                          opacity: isCenter ? 1 : 0.75,
                          filter: isCenter ? 'blur(0px) brightness(1)' : 'blur(3px) brightness(0.7)',
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={() => !isCenter && setCurrentIndex(actualIdx)}
                      >
                        <div className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                          isCenter ? 'border-cyan-400/60 shadow-2xl shadow-cyan-500/20 ring-2 ring-cyan-500/40' : 'border-slate-600/50 hover:border-cyan-500/40 shadow-xl'
                        }`}>
                          <div className="bg-slate-800/95 backdrop-blur-sm">
                            <div className="relative w-full aspect-[4/3] bg-slate-800 overflow-hidden">
                              {(project.image || project.images?.length) ? (
                                <ProjectImage project={project} />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-800/80">
                                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-500/40 flex items-center justify-center">
                                    <FaRobot className="w-8 h-8 text-cyan-400" />
                                  </div>
                                </div>
                              )}
                              {project.tag && (
                                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-medium border ${TAG_CLASS}`}>
                                  {project.tag}
                                </span>
                              )}
                              <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-medium border ${projectTypes[project.type].class}`}>
                                {projectTypes[project.type].label}
                              </span>
                            </div>
                            <div className="p-4">
                              <h3 className="font-display text-lg font-semibold text-white leading-tight">{project.title}</h3>
                              {project.subtitle && (
                                <p className="text-cyan-400/90 text-sm mt-1 leading-tight line-clamp-1">{project.subtitle}</p>
                              )}
                              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mt-2">{project.description}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
              <motion.button
                type="button"
                onClick={goNext}
                aria-label="Next project"
                disabled={filteredProjects.length <= 1}
                whileHover={{ scale: filteredProjects.length > 1 ? 1.08 : 1 }}
                whileTap={{ scale: 0.96 }}
                className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-slate-800/95 border-2 border-cyan-500/50 text-cyan-400 shadow-xl flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors disabled:opacity-50 disabled:pointer-events-none"
              >
                <FaChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
              </motion.button>
            </div>
          </div>

          <div className="mt-3 w-full">
            <DescriptionPanel />
          </div>
        </div>
        )}
      </div>

      {/* Decorative laptop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-0 left-0 w-[min(88vw,920px)] h-[min(78vh,640px)] max-w-[920px] max-h-[640px] hidden lg:flex items-end justify-start pointer-events-none z-0"
      >
        <div className="absolute inset-0 blob-corner-lb bg-gradient-to-tr from-cyan-500/25 via-blue-500/15 to-slate-900/90" />
        <div className="absolute inset-0 blob-corner-lb bg-gradient-to-tr from-cyan-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 blob-corner-lb overflow-hidden">
          <img
            src={getImageUrl('/laptop_vqb31a.png')}
            alt="Development setup"
            className="absolute inset-0 w-full h-full object-cover object-left object-bottom"
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default Projects