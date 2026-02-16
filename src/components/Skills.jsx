import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { getImageUrl } from '../utils/cloudinary'

// Icons: skill-icons.dev, simpleicons.org, devicon, and official brand/GitHub logos
// Refs: docs.crewai.com | langfuse.com/docs | qdrant.tech/brand-resources | openrouter.ai | docling.ai
const SKILL_ICON = (name) => `https://skillicons.dev/icons?i=${name}`
const SIMPLE_ICON = (name) => `https://cdn.simpleicons.org/${name}/94a3b8`
const DEVICON = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg`
const GITHUB_RAW = (repo, path) => `https://raw.githubusercontent.com/${repo}/main/${path}`
const GITHUB_RAW_MASTER = (repo, path) => `https://raw.githubusercontent.com/${repo}/master/${path}`
// Local images from public/ (crewai.jpeg, docling.jpeg, langfuse.jpeg, oper router.png, qdrant-brandmark-red.svg, yolo.jpeg)
const PUBLIC_IMG = (filename) => `/${filename}`

const skillCategories = [
  {
    title: 'Programming & Scripting',
    skills: [
      { name: 'Python', percent: 95, icon: SKILL_ICON('python') },
      { name: 'SQL', percent: 85, icon: DEVICON('postgresql/postgresql-original') },
      { name: 'JavaScript', percent: 50, icon: SKILL_ICON('js') },
      { name: 'TypeScript', percent: 55, icon: SKILL_ICON('ts') },
    ],
  },
  {
    title: 'AI/ML & Computer Vision',
    skills: [
      { name: 'PyTorch', percent: 70, icon: SKILL_ICON('pytorch') },
      { name: 'YOLO (Ultralytics)', percent: 65, icon: PUBLIC_IMG('yolo.jpeg') },
      { name: 'spaCy', percent: 70, icon: SIMPLE_ICON('spacy') },
    ],
  },
  {
    title: 'LLMs & Agentic Systems',
    skills: [
      { name: 'LangChain', percent: 80, icon: SIMPLE_ICON('langchain') },
      { name: 'LangGraph', percent: 75, icon: SIMPLE_ICON('langchain') },
      { name: 'CrewAI', percent: 55, icon: PUBLIC_IMG('crewai.jpeg') },
      { name: 'OpenRouter', percent: 70, icon: PUBLIC_IMG('oper%20router.png') },
      { name: 'Google Gemini', percent: 65, icon: SIMPLE_ICON('googlegemini') },
    ],
  },
  {
    title: 'NLP & Document Intelligence',
    skills: [
      { name: 'Sentiment Analysis', percent: 55, icon: SIMPLE_ICON('huggingface') },
      { name: 'OCR (Tesseract)', percent: 55, icon: DEVICON('filetype-pdf/filetype-pdf-original') },
      { name: 'PDF / Docling', percent: 65, icon: PUBLIC_IMG('docling.jpeg') },
    ],
  },
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'FastAPI', percent: 90, icon: SKILL_ICON('fastapi') },
      { name: 'Node.js', percent: 55, icon: SKILL_ICON('nodejs') },
      { name: 'Express.js', percent: 55, icon: SKILL_ICON('express') },
      { name: 'RESTful API', percent: 90, icon: SKILL_ICON('fastapi') },
    ],
  },
  {
    title: 'Data & Databases',
    skills: [
      { name: 'PostgreSQL', percent: 70, icon: SKILL_ICON('postgres') },
      { name: 'Qdrant', percent: 70, icon: PUBLIC_IMG('qdrant-brandmark-red.svg') },
      { name: 'MySQL', percent: 50, icon: SKILL_ICON('mysql') },
      { name: 'Firestore', percent: 50, icon: SKILL_ICON('firebase') },
      { name: 'Redis', percent: 50, icon: SKILL_ICON('redis') },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', percent: 95, icon: SKILL_ICON('git') },
      { name: 'Docker', percent: 75, icon: SKILL_ICON('docker') },
      { name: 'Jupyter', percent: 50, icon: GITHUB_RAW('jupyter/notebook', 'notebook.svg') },
      { name: 'Langfuse', percent: 65, icon: PUBLIC_IMG('langfuse.jpeg') },
    ],
  },
]

// Count-up animation for percentage when in view
function AnimatedPercent({ percent, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isInView) return
    const duration = 1200
    const steps = 30
    const step = percent / steps
    const interval = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= percent) {
        setCount(percent)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)
    return () => clearInterval(timer)
  }, [isInView, percent])
  return <span ref={ref}>{count}%</span>
}

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  }

  return (
    <div className="relative min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-slate-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <h2 className="text-section-title sm:text-section-title-md md:text-section-title-lg lg:text-section-title-xl font-bold text-white mb-3 sm:mb-4">
            Skills & <span className="text-amber-400 font-display italic">Tech Stack</span>
          </h2>
          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-cyan-500 mx-auto mb-2" />
          <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Technologies I use in my projects
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.08 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 border border-cyan-500/30 hover:border-cyan-400/50 transition-all"
            >
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-cyan-400">
                {category.title}
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-slate-700/80 border border-cyan-500/20 flex items-center justify-center overflow-hidden">
                      <img
                        src={skill.icon}
                        alt=""
                        className="w-5 h-5 object-contain"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                      <span className="hidden text-xs font-bold text-cyan-400 w-5 h-5 flex items-center justify-center">
                        {skill.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline gap-2 mb-0.5">
                        <span className="text-sm font-medium text-gray-200 truncate">
                          {skill.name}
                        </span>
                        <span className="text-xs font-semibold text-cyan-400 flex-shrink-0 tabular-nums">
                          <AnimatedPercent percent={skill.percent} />
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-700/80 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: categoryIndex * 0.08 + skillIndex * 0.05 }}
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right bottom corner: robot blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-0 right-0 w-[min(88vw,920px)] h-[min(78vh,640px)] max-w-[920px] max-h-[640px] hidden lg:flex items-end justify-end pointer-events-none z-0"
      >
        <div className="absolute inset-0 blob-corner-rb bg-gradient-to-tl from-cyan-500/25 via-blue-500/15 to-slate-900/90" />
        <div className="absolute inset-0 blob-corner-rb bg-gradient-to-tl from-cyan-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 blob-corner-rb overflow-hidden">
          <img
            src={getImageUrl('/robot_axxsvy.png')}
            alt="AI and development — multi-agent systems, LLMs, and modern tools"
            className="absolute inset-0 w-full h-full object-cover object-right object-bottom"
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default Skills
