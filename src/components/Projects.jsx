import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const Projects = () => {
  const projects = [
    {
      title: 'Image Classification Model',
      description: 'Deep learning model using CNN for image classification with 95% accuracy. Built with TensorFlow and deployed using Flask API.',
      tech: ['Python', 'TensorFlow', 'Flask', 'OpenCV'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Sentiment Analysis API',
      description: 'NLP project analyzing customer reviews using BERT model. Real-time sentiment classification with RESTful API.',
      tech: ['Python', 'PyTorch', 'FastAPI', 'BERT'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Chatbot with RAG',
      description: 'Intelligent chatbot using Retrieval-Augmented Generation. Answers questions based on custom knowledge base.',
      tech: ['Python', 'LangChain', 'OpenAI', 'Vector DB'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Predictive Analytics Dashboard',
      description: 'ML-powered dashboard for sales forecasting. Interactive visualizations with real-time predictions.',
      tech: ['React', 'Python', 'Scikit-learn', 'D3.js'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Object Detection System',
      description: 'Real-time object detection using YOLO. Detects and tracks multiple objects in video streams.',
      tech: ['Python', 'YOLO', 'OpenCV', 'TensorFlow'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Recommendation Engine',
      description: 'Collaborative filtering recommendation system. Personalized suggestions based on user behavior.',
      tech: ['Python', 'Pandas', 'NumPy', 'Flask'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      color: 'from-pink-500 to-rose-500',
    },
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
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all group"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${project.color} mb-4 flex items-center justify-center text-2xl`}>
                🚀
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 rounded-full text-xs bg-slate-700 text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FaGithub /> Code
                </motion.a>
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FaExternalLinkAlt /> Demo
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects


