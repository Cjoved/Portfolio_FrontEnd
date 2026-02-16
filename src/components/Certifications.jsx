import { motion } from 'framer-motion'
import { FaAward } from 'react-icons/fa'

const Certifications = () => {
  const certs = [
    { name: 'Generative AI in Practice', issuer: 'Sololearn', id: 'CC-MKQ46JL3', date: 'Aug 2025' },
    { name: 'Prompt Engineering Applications', issuer: 'Simplilearn SkillUp', id: '8888760', date: 'Aug 2025' },
    { name: 'AI Game Development', issuer: 'LUCSO', date: 'May 2024' },
    { name: 'Microsoft Copilot Training', issuer: 'LUCSO', date: 'May 2024' },
  ]

  return (
    <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-slate-900/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-section-title sm:text-section-title-md md:text-section-title-lg lg:text-section-title-xl font-bold text-white mb-2 sm:mb-3">
            Certifications & <span className="text-amber-400 font-display italic">Training</span>
          </h2>
          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-cyan-500 mx-auto mb-2" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {certs.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-slate-800/40 border border-cyan-500/30 hover:border-cyan-400/50 transition-colors"
            >
              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <FaAward className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-white text-sm sm:text-base">{cert.name}</h3>
                <p className="text-gray-400 text-xs sm:text-sm">{cert.issuer}</p>
                {cert.id && <p className="text-cyan-400/80 text-xs mt-0.5">ID: {cert.id}</p>}
                <p className="text-gray-500 text-xs mt-1">{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Certifications
