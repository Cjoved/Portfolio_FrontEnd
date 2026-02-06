import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'
import { toast } from 'sonner'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa'
import { cn } from '../utils/cn'

// Form ID from .env only — never commit the real ID to the project
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || ''

const inputBase = 'w-full px-4 py-3 bg-slate-800/40 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 transition-colors resize-none disabled:opacity-60'

function ContactFormWithSpree() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID)

  useEffect(() => {
    if (state.succeeded) toast.success("Message sent! I'll get back to you soon.")
  }, [state.succeeded])

  const contactInfo = [
    { icon: FaEnvelope, text: 'veridianocrich@gmail.com', link: 'mailto:veridianocrich@gmail.com' },
    { icon: FaPhone, text: '+63-966-224-758', link: 'tel:+63966224758' },
    { icon: FaMapMarkerAlt, text: 'Nagcarlan, Laguna, Philippines', link: 'https://maps.google.com/?q=Nagcarlan,Laguna,Philippines' },
  ]

  const socialLinks = [
    { icon: FaLinkedin, href: 'https://linkedin.com/in/crichveridiano', label: 'LinkedIn' },
    { icon: FaGithub, href: 'https://github.com/Cjoved', label: 'GitHub' },
  ]

  if (state.succeeded) {
    return (
      <div className="min-h-screen py-24 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-section-title md:text-section-title-lg font-bold text-white mb-4">
              Get In <span className="text-amber-400 font-display italic">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-cyan-500 mx-auto mb-4" />
            <p className="text-cyan-400 text-lg font-medium">
              Thanks for your message! I&apos;ll get back to you soon.
            </p>
            <p className="text-gray-400 mt-2">
              You can also reach me at{' '}
              <a href="mailto:veridianocrich@gmail.com" className="text-cyan-400 hover:underline">
                veridianocrich@gmail.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    )
  }

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
            Have a project in mind? Let&apos;s collaborate and build something amazing together!
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

          {/* Contact Form — Formspree */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                disabled={state.submitting}
                className={inputBase}
                required
                minLength={2}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                disabled={state.submitting}
                className={cn(inputBase, state.errors?.length && 'border-red-500/60')}
                required
              />
              <span className="mt-1 block text-sm text-red-400"><ValidationError prefix="Email" field="email" errors={state.errors} /></span>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Your Message"
                disabled={state.submitting}
                className={cn(inputBase, state.errors?.length && 'border-red-500/60')}
                required
                minLength={10}
              />
              <span className="mt-1 block text-sm text-red-400"><ValidationError prefix="Message" field="message" errors={state.errors} /></span>
            </div>

            <motion.button
              type="submit"
              disabled={state.submitting}
              whileHover={!state.submitting ? { scale: 1.02 } : {}}
              whileTap={!state.submitting ? { scale: 0.98 } : {}}
              className="w-full px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-cyan-500/30 transition-shadow disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {state.submitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  )
}

function Contact() {
  if (!FORMSPREE_ID) {
    return <ContactFormFallback />
  }
  return <ContactFormWithSpree />
}

// Same form UI when Formspree ID is not set — submit opens their email app with message (so they still "message on the page")
function ContactFormFallback() {
  const [submitting, setSubmitting] = useState(false)
  const contactInfo = [
    { icon: FaEnvelope, text: 'veridianocrich@gmail.com', link: 'mailto:veridianocrich@gmail.com' },
    { icon: FaPhone, text: '+63-966-224-758', link: 'tel:+63966224758' },
    { icon: FaMapMarkerAlt, text: 'Nagcarlan, Laguna, Philippines', link: 'https://maps.google.com/?q=Nagcarlan,Laguna,Philippines' },
  ]
  const socialLinks = [
    { icon: FaLinkedin, href: 'https://linkedin.com/in/crichveridiano', label: 'LinkedIn' },
    { icon: FaGithub, href: 'https://github.com/Cjoved', label: 'GitHub' },
  ]
  const onMailtoSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const name = (form.name?.value || '').trim()
    const email = (form.email?.value || '').trim()
    const message = (form.message?.value || '').trim()
    if (!name || !email || !message) {
      toast.error('Please fill in name, email, and message.')
      return
    }
    setSubmitting(true)
    const subject = encodeURIComponent(`Portfolio message from ${name}`)
    const body = encodeURIComponent(`${message}\n\n---\nFrom: ${name} <${email}>`)
    window.location.href = `mailto:veridianocrich@gmail.com?subject=${subject}&body=${body}`
    toast.success("Opening your email app. Send the email to reach me.")
    setSubmitting(false)
  }
  return (
    <div className="min-h-screen py-24 px-4 bg-slate-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-section-title md:text-section-title-lg font-bold text-white mb-4">
            Get In <span className="text-amber-400 font-display italic">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Have a project in mind? Let&apos;s collaborate and build something amazing together!</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            {contactInfo.map((info, i) => (
              <motion.a key={i} href={info.link} className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-cyan-500/30 hover:border-cyan-400/50 transition-colors group">
                <div className="text-2xl text-cyan-400"><info.icon /></div>
                <span className="text-gray-300 group-hover:text-white">{info.text}</span>
              </motion.a>
            ))}
            <div className="pt-6">
              <h4 className="text-xl font-semibold text-white mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((s, i) => (
                  <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-800/40 rounded-lg flex items-center justify-center text-2xl text-gray-400 hover:text-cyan-400 border border-cyan-500/30" whileHover={{ scale: 1.1 }}><s.icon /></motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.form initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} onSubmit={onMailtoSubmit} className="space-y-6">
            <div>
              <label htmlFor="fallback-name" className="block text-gray-300 mb-2">Name</label>
              <input type="text" id="fallback-name" name="name" placeholder="Your Name" disabled={submitting} className={inputBase} required minLength={2} />
            </div>
            <div>
              <label htmlFor="fallback-email" className="block text-gray-300 mb-2">Email</label>
              <input type="email" id="fallback-email" name="email" placeholder="your.email@example.com" disabled={submitting} className={inputBase} required />
            </div>
            <div>
              <label htmlFor="fallback-message" className="block text-gray-300 mb-2">Message</label>
              <textarea id="fallback-message" name="message" rows="6" placeholder="Your Message" disabled={submitting} className={inputBase} required minLength={10} />
            </div>
            <motion.button type="submit" disabled={submitting} whileHover={!submitting ? { scale: 1.02 } : {}} whileTap={!submitting ? { scale: 0.98 } : {}} className="w-full px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-cyan-500/30 transition-shadow disabled:opacity-70 disabled:cursor-not-allowed">
              {submitting ? 'Opening...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  )
}

export default Contact
