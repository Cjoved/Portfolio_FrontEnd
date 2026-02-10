import { motion } from 'framer-motion'
import { FaLinkedin } from 'react-icons/fa'
import { getImageUrl } from '../utils/cloudinary'

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  const stats = [
    { label: 'Key AI Systems Delivered', value: '4+' },
    { label: 'Technologies & Frameworks', value: '20+' },
    { label: 'Professional Experience', value: '6+ mo' },
  ]

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-section-title md:text-section-title-lg font-bold text-white mb-4">
            About <span className="text-amber-400 font-display italic">Me</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-2"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile photo – larger, with glow to match Hero */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1 flex justify-center md:justify-start"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-xl opacity-80" />
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-400/50 bg-slate-800/60 shadow-2xl ring-4 ring-cyan-500/20"
              >
                <img
                  src={getImageUrl('/profile_g6cu4g.png')}
                  alt="Crich Joved Veridiano"
                  className="w-full h-full object-cover object-top scale-105"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </motion.div>
              {/* Overlay card – reference-style “more on LinkedIn” */}
              <motion.a
                href="https://linkedin.com/in/crichveridiano"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="absolute -right-2 top-1/2 -translate-y-1/2 md:right-0 md:top-auto md:translate-y-0 md:bottom-4 z-10 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800/95 backdrop-blur-sm border border-cyan-500/40 shadow-xl text-gray-300 hover:text-cyan-400 hover:border-cyan-400/60 transition-colors"
              >
                <FaLinkedin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">Find me on LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 order-1 md:order-2"
          >
            <motion.p variants={itemVariants} className="text-lg text-gray-300 leading-relaxed">
              I'm a Junior AI Engineer with experience as a solo developer delivering end-to-end AI systems 
              in survey generation, document evaluation, and computer vision. I'm strong in Python, FastAPI, 
              LangChain/LangGraph, PyTorch/YOLO, and vector databases like Qdrant with PostgreSQL.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-gray-300 leading-relaxed">
              I design multi-agent and LLM-powered workflows, build production APIs, and handle data pipelines 
              from preprocessing to deployment. I collaborate with agricultural and business stakeholders to 
              transform domain needs into production-ready AI tools at Leads Agricultural Product Corporation.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-gray-300 leading-relaxed">
              BS in Computer Science (Data Science), Laguna University, June 2025. Relevant coursework: 
              Machine Learning, Deep Learning, NLP, Database Systems, AI, and Software Engineering.
            </motion.p>
            <motion.a
              href="#projects"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-cyan-500/30 transition-shadow"
            >
              Read More
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 order-3 md:col-span-2 min-w-0"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 text-center border border-cyan-500/30 hover:border-cyan-400/50 transition-colors min-w-0 overflow-hidden"
              >
                <div className="text-xl sm:text-2xl md:text-4xl font-bold text-cyan-400 mb-1 sm:mb-2 truncate">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 leading-tight line-clamp-2 break-words">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default About


