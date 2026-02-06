import { motion } from 'framer-motion'
import { getImageUrl } from '../utils/cloudinary'

const Skills = () => {
  const skillCategories = [
    { title: 'Programming & Scripting', skills: ['Python', 'SQL', 'JavaScript'] },
    { title: 'AI/ML/DL Frameworks', skills: ['PyTorch', 'TensorFlow', 'scikit-learn', 'YOLO (Ultralytics)', 'spaCy'] },
    { title: 'LLMs & Agentic Systems', skills: ['LangChain', 'LangGraph', 'CrewAI', 'Prompt Engineering', 'OpenRouter', 'Google Gemini'] },
    { title: 'NLP & Document Intelligence', skills: ['Embeddings (e5, bge)', 'Sentiment Analysis', 'OCR (Tesseract)', 'PDF (Docling, PyMuPDF)'] },
    { title: 'Backend & APIs', skills: ['FastAPI', 'Node.js', 'Express.js', 'RESTful API', 'Swagger/OpenAPI'] },
    { title: 'Data & Databases', skills: ['PostgreSQL', 'MySQL', 'Firestore', 'Qdrant', 'Redis'] },
    { title: 'Tools & Platforms', skills: ['Git', 'Docker', 'Jupyter', 'Cursor', 'Google Colab', 'Langfuse'] },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="relative min-h-screen py-24 px-4 bg-slate-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-section-title md:text-section-title-lg font-bold text-white mb-4">
            Skills & <span className="text-amber-400 font-display italic">Technologies</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-2"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-400/50 transition-all"
            >
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                {category.title}
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2"
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-slate-700/80 text-gray-300 border border-cyan-500/30 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right bottom corner: malaking wavy blob abot sa middle, robot fit sa blob */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-0 right-0 w-[min(88vw,920px)] h-[min(78vh,640px)] max-w-[920px] max-h-[640px] hidden lg:flex items-end justify-end pointer-events-none z-0"
      >
        {/* Wavy blob background – image clipped to same shape, bg shows where cut */}
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


