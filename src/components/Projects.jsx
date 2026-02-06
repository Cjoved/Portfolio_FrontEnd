import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaRobot } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { getImageUrl } from '../utils/cloudinary'

const CARD_WIDTH_DESKTOP = 400
const CARD_OVERLAP_DESKTOP = 100
const STEP_DESKTOP = CARD_WIDTH_DESKTOP - CARD_OVERLAP_DESKTOP

const projectTypes = {
  professional: { label: 'Professional', class: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' },
  academic: { label: 'Academic', class: 'bg-slate-600/50 text-gray-300 border-slate-500/50' },
  internship: { label: 'Internship', class: 'bg-slate-600/50 text-gray-300 border-slate-500/50' },
}

const projects = [
  {
    title: 'Agentic AI Survey System',
    subtitle: 'AI-Powered Survey Generation & Analysis Platform',
    type: 'professional',
    image: '/projects/survey-system.jpg',
    description: 'Production-ready FastAPI backend with multi-agent architecture (4 specialized agents) automating end-to-end survey lifecycle: conversational generation, document extraction, knowledge-base search, and response analysis. LangGraph-based multi-step agentic workflow (9 stages) with episodic memory. Multi-collection vector database (Qdrant) with hybrid semantic+keyword search and PostgreSQL. Conversational chat with PostgreSQL-backed memory, LRU caching, multi-user support. Statistical and sentiment analysis pipelines with LLM-generated executive summaries. Langfuse for observability, prompt management, A/B testing, API auth, and rate limiting.',
    tech: ['Python', 'FastAPI', 'LangChain', 'LangGraph', 'OpenRouter', 'Google Gemini', 'Qdrant', 'PostgreSQL', 'spaCy', 'Docling', 'Tesseract', 'Docker', 'Langfuse'],
    github: 'https://github.com/Cjoved',
    demo: null,
  },
  {
    title: 'Agentic AI Evaluator',
    subtitle: 'Multi-Agent Agricultural Trial Evaluation System',
    type: 'professional',
    image: '/eval1_of3csr.png',
    images: ['/eval1_of3csr.png', '/eval2_qot7rd.png', '/eval3_kp3byo.png', '/eval4_ggk8ir.png', '/eval5_vqqphp.png'],
    description: '8-stage LangGraph workflow to process agricultural demo trial PDFs with quality gates and automatic retries. CrewAI multi-agent evaluation layer (4 specialized agents) with confidence-scored quality assessment. Hybrid semantic + keyword search over Qdrant with ensemble retriever. Conversational AI agent with 30+ specialized tools and PostgreSQL-backed memory, supporting Taglish/Filipino/English. Redis + ARQ background workers for async job processing, API authentication, rate limiting, and full LLM observability.',
    tech: ['Python', 'FastAPI', 'LangGraph', 'CrewAI', 'LangChain', 'Google Gemini', 'OpenRouter', 'Qdrant', 'PostgreSQL', 'Redis/ARQ', 'Docker', 'Langfuse'],
    github: 'https://github.com/Cjoved',
    demo: null,
  },
  {
    title: 'Black Sigatoka Early Stage Detection System',
    subtitle: 'Banana Leaf Disease Detection using Computer Vision',
    type: 'professional',
    image: '/projects/black-sigatoka.jpg',
    description: 'End-to-end ML pipeline for 7 disease stages with strict image quality checks, intelligent 256×256 tiling, and stratified train-val-test split. YOLO12n model on combined dataset with unified 7-class mapping, real-time augmentation, and hyperparameter tuning (mAP50, precision, recall, F1). FastAPI inference service with validation, error handling, and model caching. Docker and Docker Compose for production deployment.',
    tech: ['Python', 'Ultralytics YOLO (YOLO12n)', 'PyTorch', 'OpenCV', 'Pillow', 'FastAPI', 'Docker', 'Jupyter'],
    github: 'https://github.com/Cjoved',
    demo: null,
  },
  {
    title: 'RHive (Research Hive)',
    subtitle: 'Thesis/Capstone Management System',
    type: 'academic',
    image: '/rhive1_wxjwpl.png',
    images: ['/rhive1_wxjwpl.png', '/rhive2_c0dpbd.png', '/rhive3_qt2y1n.png', '/rhive4_irbkdg.png'],
    description: 'Led design and implementation of IMRaD manuscript generation module, transforming raw research content into structured academic drafts. NLP-powered pipeline (Python + FastAPI) with preprocessing, section detection, and LLM-based prompts for IMRaD formatting. Integrated with main RHive web platform for automated manuscript formatting. Thesis system achieved ISO 25010:2023 software quality rating of 4.4 (Effective/Highly Effective) for usability, reliability, and security.',
    tech: ['Vite React', 'Tailwind CSS', 'Node.js', 'Express.js', 'Python (FastAPI)', 'Firestore', 'NLP/LLM'],
    github: 'https://github.com/Cjoved/imrad-gen',
    demo: null,
  },
  {
    title: 'Conversational Support & Ticketing System',
    subtitle: 'AI Intern – PROMPTING_AI AGENT',
    type: 'internship',
    image: '/support1_garqwr.png',
    images: ['/support1_garqwr.png', '/support2_o8qevh.png', '/support3_tq2fiw.png'],
    description: 'FastAPI + LangChain support agent routing user queries by intent and tone across multiple LLMs via OpenRouter. Intent and tone detection pipeline with LLM prompt design and retry/fallback logic. Ticketing workflow with automatic ticket creation (ID, priority, category, status) and database integration. /chat API with optional word-by-word streaming responses and cache management endpoints.',
    tech: ['Python', 'FastAPI', 'LangChain', 'OpenRouter (Mistral, DeepSeek, OpenChat)', 'MySQL', 'Pydantic'],
    github: 'https://github.com/Intern94/chat_support',
    demo: null,
  },
]

// Offset so selected card center aligns with flex container (viewport) center
const getTrackOffset = (index) => {
  const n = projects.length
  const trackWidth = (n - 1) * STEP_DESKTOP + CARD_WIDTH_DESKTOP
  const selectedCardCenter = index * STEP_DESKTOP + CARD_WIDTH_DESKTOP / 2
  return trackWidth / 2 - selectedCardCenter
}

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
  const isCloudinary = src.startsWith('https://res.cloudinary.com/')
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)
  const [direction, setDirection] = useState(0)
  const goNext = () => {
    setDirection(1)
    setDescriptionExpanded(false)
    setCurrentIndex((i) => (i + 1) % projects.length)
  }
  const goPrev = () => {
    setDirection(-1)
    setDescriptionExpanded(false)
    setCurrentIndex((i) => (i - 1 + projects.length) % projects.length)
  }

  const currentProject = projects[currentIndex]
  const descriptionLong = currentProject.description.length > 320

  const DescriptionPanel = () => (
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-xl mx-auto px-2 md:px-0 md:max-w-none scroll-mt-24"
      id="project-detail"
    >
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border-l-4 border-l-cyan-400/80 border border-cyan-500/30 p-4 md:p-6 shadow-xl">
        <div className="flex flex-wrap items-baseline gap-2 mb-1">
          <h3 className="font-display text-lg md:text-2xl font-semibold text-white">
            {currentProject.title}
          </h3>
          <span className="text-gray-500 text-xs font-medium">
            {currentIndex + 1} of {projects.length}
          </span>
        </div>
        {currentProject.subtitle && (
          <p className="text-cyan-400 text-sm font-medium mb-4">
            {currentProject.subtitle}
          </p>
        )}
        <div className="border-t border-slate-600/50 pt-4">
          <p
            className={`text-gray-300 text-sm md:text-base leading-relaxed ${descriptionExpanded ? '' : 'line-clamp-6 md:line-clamp-8'}`}
          >
            {currentProject.description}
          </p>
          {descriptionLong && (
            <button
              type="button"
              onClick={() => setDescriptionExpanded((e) => !e)}
              aria-expanded={descriptionExpanded}
              className="mt-2 text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 rounded"
            >
              {descriptionExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
        <p className="text-gray-500 text-xs font-medium mt-5 mb-2 uppercase tracking-wider">Tech</p>
        <div className="flex flex-wrap gap-2">
          {currentProject.tech.map((tech, ti) => (
            <span
              key={ti}
              className="px-3 py-1.5 rounded-lg text-xs bg-slate-700/90 text-gray-300 border border-slate-600/50"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-6">
          <motion.a
            href={currentProject.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/25 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/35 hover:text-white transition-colors font-semibold text-sm"
          >
            <FaGithub className="w-4 h-4" /> View code
          </motion.a>
          {currentProject.demo && (
            <motion.a
              href={currentProject.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-gray-400 hover:text-cyan-400 border border-slate-600 hover:border-cyan-500/40 transition-colors text-sm"
            >
              <FaExternalLinkAlt className="w-4 h-4" /> Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="relative min-h-screen py-24 px-2 sm:px-3 md:px-4 overflow-x-hidden overflow-y-visible">
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" aria-hidden />
      <div className="max-w-[1440px] mx-auto relative flex flex-col z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-section-title md:text-section-title-lg font-bold text-white mb-4">
            Featured <span className="text-amber-400 font-display italic">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-2" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Multi-agent systems, document AI, and computer vision.
          </p>
        </motion.div>

        {/* Mobile: description FIRST (agad kitang-kita), then single card */}
        <div className="flex flex-col md:hidden gap-8">
          <DescriptionPanel />
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                transition={{ duration: 0.25 }}
                className="w-[min(92vw,440px)] mx-auto"
              >
                <div className="rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-xl bg-slate-800/95">
                  <div className="relative aspect-video w-full bg-slate-800 overflow-hidden">
                    {(projects[currentIndex].image || projects[currentIndex].images?.length) ? (
                      <ProjectImage project={projects[currentIndex]} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-800/80">
                        <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-500/40 flex items-center justify-center">
                          <FaRobot className="w-8 h-8 text-cyan-400" />
                        </div>
                      </div>
                    )}
                    <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-medium border ${projectTypes[projects[currentIndex].type].class}`}>
                      {projectTypes[projects[currentIndex].type].label}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-semibold text-white">{projects[currentIndex].title}</h3>
                    <p className="text-cyan-400/90 text-xs mt-0.5 line-clamp-1">{projects[currentIndex].subtitle}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-between items-center mt-4 px-2">
              <motion.button
                type="button"
                onClick={goPrev}
                aria-label="Previous"
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-slate-800/95 border-2 border-cyan-500/50 text-cyan-400 flex items-center justify-center"
              >
                <FaChevronLeft className="w-5 h-5" />
              </motion.button>
              <span className="text-gray-500 text-sm">{currentIndex + 1} / {projects.length}</span>
              <motion.button
                type="button"
                onClick={goNext}
                aria-label="Next"
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full bg-slate-800/95 border-2 border-cyan-500/50 text-cyan-400 flex items-center justify-center"
              >
                <FaChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Desktop: two clear containers — explanation LEFT, carousel RIGHT (no overlap) */}
        <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_minmax(520px,1.75fr)] md:gap-6 lg:gap-8 md:items-start md:w-full">
          {/* Left container: explanation only */}
          <div className="min-w-0 flex flex-col">
            <div className="lg:sticky lg:top-24">
              <DescriptionPanel />
            </div>
          </div>
          {/* Right container: carousel only — min-width so side cards always peek through */}
          <div className="min-w-0 flex flex-col items-center overflow-hidden">
          <div
            className="relative min-h-[420px] lg:min-h-[460px] overflow-hidden flex justify-center w-full min-w-0"
          >
            {/* Arrows in separate layer — fixed left/right so they never move when track animates */}
            <div className="absolute inset-0 flex justify-between items-center px-4 lg:px-6 pointer-events-none">
              <motion.button
                type="button"
                onClick={goPrev}
                aria-label="Previous project"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="pointer-events-auto w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-slate-800/95 border-2 border-cyan-500/50 text-cyan-400 shadow-xl flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors flex-shrink-0 z-30"
              >
                <FaChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              </motion.button>
              <motion.button
                type="button"
                onClick={goNext}
                aria-label="Next project"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="pointer-events-auto w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-slate-800/95 border-2 border-cyan-500/50 text-cyan-400 shadow-xl flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors flex-shrink-0 z-30"
              >
                <FaChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
              </motion.button>
            </div>

            {/* Track: flex centers the track; x = offset so SELECTED card center = container center */}
            <motion.div
              className="flex items-start flex-shrink-0"
              animate={{ x: getTrackOffset(currentIndex) }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            >
              {projects.map((project, i) => {
                const offset = i - currentIndex
                const isCenter = offset === 0
                return (
                  <motion.div
                    key={i}
                    className="flex-shrink-0 cursor-pointer"
                    style={{ width: CARD_WIDTH_DESKTOP }}
                    animate={{
                      scale: 1 - Math.min(0.18, Math.abs(offset) * 0.08),
                      rotate: offset * 3,
                      zIndex: 20 + projects.length - Math.abs(offset),
                      opacity: Math.abs(offset) > 2 ? 0.35 : 0.88 + (isCenter ? 0.12 : 0),
                    }}
                    transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                    onClick={() => !isCenter && setCurrentIndex(i)}
                  >
                    <div
                      className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                        isCenter
                          ? 'border-cyan-400/60 shadow-2xl shadow-cyan-500/20 ring-2 ring-cyan-500/40'
                          : 'border-slate-600/60 border-cyan-500/30 shadow-xl'
                      }`}
                    >
                      <div className="bg-slate-800/95 backdrop-blur-sm">
                        <div className="relative aspect-video w-full bg-slate-800 overflow-hidden">
                          {(project.image || project.images?.length) ? (
                            <ProjectImage project={project} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-800/80">
                              <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-500/40 flex items-center justify-center">
                                <FaRobot className="w-8 h-8 text-cyan-400" />
                              </div>
                            </div>
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
            </motion.div>
            </div>

        <div className="flex items-center justify-center gap-2 mt-6 w-full">
          {projects.map((_, i) => (
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
        <p className="text-center text-gray-500 text-sm mt-2">
          {currentIndex + 1} / {projects.length}
        </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8 md:hidden">
          {projects.map((_, i) => (
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
        <p className="text-center text-gray-500 text-sm mt-2 md:hidden">
          {currentIndex + 1} / {projects.length}
        </p>
      </div>

      {/* Left bottom corner: malaking wavy blob abot sa middle, laptop fit sa blob */}
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
            alt="Development setup — modern tools and workflows"
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
