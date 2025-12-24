import { motion } from 'framer-motion'

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
    { label: 'Projects Completed', value: '10+' },
    { label: 'Technologies Mastered', value: '15+' },
    { label: 'Years of Experience', value: '1+' },
  ]

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.p variants={itemVariants} className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate Junior AI Engineer with a strong foundation in machine learning, 
              deep learning, and artificial intelligence. My journey in AI started with curiosity 
              about how machines can learn and make intelligent decisions.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-gray-300 leading-relaxed">
              I specialize in building end-to-end AI solutions, from data preprocessing and model 
              development to deployment and optimization. I'm always eager to learn new technologies 
              and tackle challenging problems in the AI space.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, I enjoy reading research papers, contributing to open-source 
              projects, and exploring the latest trends in AI and machine learning.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 text-center border border-purple-500/20 hover:border-purple-500/50 transition-colors"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default About


