import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa'
import { cn } from '../utils/cn'

// Set your backend base URL in .env as VITE_CHAT_API_URL (e.g. https://your-api.fly.dev)
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || ''

const AskCrich = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMessage = { role: 'user', content: trimmed }
    setMessages((m) => [...m, userMessage])
    setInput('')
    setLoading(true)

    try {
      if (!CHAT_API_URL) {
        setMessages((m) => [
          ...m,
          {
            role: 'assistant',
            content: "Connect your backend: set VITE_CHAT_API_URL in .env to your API base URL, and implement POST /chat with body { message: string } returning { reply: string }.",
          },
        ])
        setLoading(false)
        return
      }

      const res = await fetch(`${CHAT_API_URL.replace(/\/$/, '')}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(errText || res.statusText)
      }

      const data = await res.json()
      const reply = data.reply ?? data.response ?? data.answer ?? data.message ?? 'No reply returned.'
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: `Sorry, the AI agent isn't available right now. (${err.message || 'Network error'}) Connect your backend and set VITE_CHAT_API_URL.`,
        },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen py-24 px-4 bg-slate-900/30">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-section-title md:text-section-title-lg font-bold text-white mb-4">
            Ask <span className="text-amber-400 font-display italic">Crich</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto mb-3" />
          <p className="text-gray-400 text-lg">
            Ask anything about my experience, projects, or skills. Powered by your AI backend.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-800/60 backdrop-blur-sm shadow-xl"
        >
          {/* Messages area */}
          <div
            className="min-h-[320px] max-h-[480px] overflow-y-auto p-4 md:p-6 flex flex-col gap-4"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mb-4">
                  <FaRobot className="w-7 h-7 text-cyan-400" />
                </div>
                <p className="text-gray-400 text-sm max-w-sm">
                  Try: &quot;What projects have you built?&quot; or &quot;What&apos;s your experience with LangChain?&quot;
                </p>
              </div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'flex gap-3 max-w-[90%]',
                    msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                  )}
                >
                  <div
                    className={cn(
                      'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                      msg.role === 'user'
                        ? 'bg-cyan-500/30 text-cyan-300'
                        : 'bg-slate-600/60 text-cyan-400'
                    )}
                  >
                    {msg.role === 'user' ? (
                      <FaUser className="w-3.5 h-3.5" />
                    ) : (
                      <FaRobot className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'rounded-xl px-4 py-3 text-sm md:text-base',
                      msg.role === 'user'
                        ? 'bg-cyan-500/20 border border-cyan-500/40 text-gray-100'
                        : 'bg-slate-700/50 border border-slate-600/50 text-gray-200'
                    )}
                  >
                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-600/60 flex items-center justify-center text-cyan-400">
                  <FaRobot className="w-3.5 h-3.5" />
                </div>
                <div className="rounded-xl px-4 py-3 bg-slate-700/50 border border-slate-600/50">
                  <span className="inline-flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-cyan-500/20 bg-slate-800/40">
            <div className="flex gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about my experience, projects, or skills..."
                rows={1}
                disabled={loading}
                className="flex-1 min-h-[44px] max-h-32 px-4 py-3 rounded-xl bg-slate-800/80 border border-cyan-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 resize-none disabled:opacity-60 text-sm md:text-base"
                aria-label="Message"
              />
              <motion.button
                type="button"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                whileHover={!loading && input.trim() ? { scale: 1.05 } : {}}
                whileTap={!loading && input.trim() ? { scale: 0.98 } : {}}
                className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-shadow"
                aria-label="Send message"
              >
                <FaPaperPlane className="w-4 h-4" />
              </motion.button>
            </div>
            <p className="text-gray-500 text-xs mt-2 text-center">
              Responses come from your AI backend. Set <code className="bg-slate-700/50 px-1 rounded">VITE_CHAT_API_URL</code> in .env when ready.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AskCrich
