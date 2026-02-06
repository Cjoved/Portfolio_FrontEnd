import { motion } from 'framer-motion'
import { FaCogs, FaShieldAlt, FaSearch, FaBolt } from 'react-icons/fa'

const WhyAI = () => {
  const features = [
    {
      icon: FaCogs,
      title: 'Multi-Agent Systems',
      description: 'Orchestrated workflows with LangGraph & CrewAI for complex, collaborative AI tasks.',
    },
    {
      icon: FaShieldAlt,
      title: 'Production-Ready',
      description: 'FastAPI backends with auth, rate limiting, observability, and Docker deployment.',
    },
    {
      icon: FaSearch,
      title: 'Document Intelligence',
      description: 'NLP pipelines: embeddings, OCR, PDF processing, and semantic search with Qdrant.',
    },
    {
      icon: FaBolt,
      title: 'Computer Vision',
      description: 'End-to-end ML pipelines with YOLO, PyTorch, and real-time inference APIs.',
    },
  ]

  return (
    <div className="relative py-24 px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-section-title md:text-section-title-lg font-bold text-white mb-4">
            Why <span className="text-amber-400 font-display italic">AI</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            AI is redefining how we build intelligent systems. Here's what I bring to the table.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-xl p-6 bg-slate-800/40 border border-cyan-500/30 hover:border-cyan-400/50 transition-all text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-lg flex items-center justify-center text-2xl text-cyan-400">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhyAI
