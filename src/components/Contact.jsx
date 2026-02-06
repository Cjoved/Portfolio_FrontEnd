import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa'
import { cn } from '../utils/cn'

// Replace with your Formspree form ID from https://formspree.io (e.g. "xyzwabcd")
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

const inputBase = 'w-full px-4 py-3 bg-slate-800/40 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 transition-colors resize-none disabled:opacity-60'

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  })

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        reset()
        toast.success("Message sent! I'll get back to you soon.")
      } else {
        toast.error('Something went wrong. Please email me directly at veridianocrich@gmail.com.')
      }
    } catch {
      toast.error('Something went wrong. Please email me directly at veridianocrich@gmail.com.')
    }
  }

  const contactInfo = [
    { icon: FaEnvelope, text: 'veridianocrich@gmail.com', link: 'mailto:veridianocrich@gmail.com' },
    { icon: FaPhone, text: '+63-966-224-758', link: 'tel:+63966224758' },
    { icon: FaMapMarkerAlt, text: 'Nagcarlan, Laguna, Philippines', link: 'https://maps.google.com/?q=Nagcarlan,Laguna,Philippines' },
  ]

  const socialLinks = [
    { icon: FaLinkedin, href: 'https://linkedin.com/in/crichveridiano', label: 'LinkedIn' },
    { icon: FaGithub, href: 'https://github.com/Cjoved', label: 'GitHub' },
  ]

  return (
    <div className="min-h-screen py-24 px-4 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-section-title md:text-section-title-lg font-bold text-white mb-4">
            Get In <span className="text-amber-400 font-display italic">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">
            Have a project in mind? Let's collaborate and build something amazing together!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 transition-colors group"
              >
                <div className="text-2xl text-cyan-400 group-hover:scale-110 transition-transform">
                  <info.icon />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {info.text}
                </span>
              </motion.a>
            ))}

            <div className="pt-6">
              <h4 className="text-xl font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-slate-800/40 rounded-lg flex items-center justify-center text-2xl text-gray-400 hover:text-cyan-400 border border-cyan-500/30 hover:border-cyan-400/50 transition-all"
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                disabled={isSubmitting}
                className={cn(inputBase, errors.name && 'border-red-500/60 focus-visible:ring-red-400')}
                {...register('name')}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="your.email@example.com"
                disabled={isSubmitting}
                className={cn(inputBase, errors.email && 'border-red-500/60 focus-visible:ring-red-400')}
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="6"
                placeholder="Your Message"
                disabled={isSubmitting}
                className={cn(inputBase, errors.message && 'border-red-500/60 focus-visible:ring-red-400')}
                {...register('message')}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400" role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              className="w-full px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-cyan-500/30 transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  )
}

export default Contact
