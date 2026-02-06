import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPaperPlane, FaRobot, FaUser, FaTimes } from 'react-icons/fa'
import { cn } from '../utils/cn'

const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || ''

const AskCrichWidget = () => {
  const [open, setOpen] = useState(false)
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

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

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
            content: "Connect your backend: set VITE_CHAT_API_URL in .env and implement POST /chat with { message } returning { reply }.",
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

      if (!res.ok) throw new Error(await res.text().catch(() => res.statusText))

      const data = await res.json()
      const reply = data.reply ?? data.response ?? data.answer ?? data.message ?? 'No reply returned.'
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: `AI isn't available right now. (${err.message || 'Network error'}) Set VITE_CHAT_API_URL when your backend is ready.` },
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
    <>
      {/* Floating button – visible on every page */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'fixed z-50 flex items-center gap-2 rounded-full shadow-lg border-2 transition-colors',
          'bottom-6 right-6 pl-4 pr-5 py-3',
          'bg-slate-800/95 backdrop-blur-md border-cyan-500/50 text-white hover:bg-slate-700/95 hover:border-cyan-400/60',
          open && 'border-cyan-400 bg-cyan-500/20'
        )}
        aria-label={open ? 'Close Ask Crich AI' : 'Open Ask Crich AI'}
        aria-expanded={open}
      >
        <FaRobot className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        <span className="text-sm font-semibold whitespace-nowrap">Ask Crich AI</span>
      </motion.button>

      {/* Chat panel – opens above the button */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[min(calc(100vw-3rem),400px)] rounded-2xl overflow-hidden border-2 border-cyan-500/40 bg-slate-800/98 backdrop-blur-xl shadow-2xl flex flex-col max-h-[min(70vh,520px)]"
            role="dialog"
            aria-label="Ask Crich AI chat"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/30 bg-slate-800/80">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                  <FaRobot className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Ask Crich AI</p>
                  <p className="text-xs text-gray-500">Ask about my experience & projects</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-700/80 transition-colors"
                aria-label="Close"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 min-h-[240px] max-h-[320px] overflow-y-auto p-3 flex flex-col gap-3"
              role="log"
              aria-live="polite"
            >
              {messages.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-gray-400 text-sm max-w-xs">
                    Ask anything about my experience, projects, or skills.
                  </p>
                  <p className="text-gray-500 text-xs mt-2">e.g. &quot;What projects use LangChain?&quot;</p>
                </div>
              )}

              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'flex gap-2 max-w-[92%]',
                      msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                    )}
                  >
                    <div
                      className={cn(
                        'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center',
                        msg.role === 'user' ? 'bg-cyan-500/30 text-cyan-300' : 'bg-slate-600/60 text-cyan-400'
                      )}
                    >
                      {msg.role === 'user' ? <FaUser className="w-3 h-3" /> : <FaRobot className="w-3 h-3" />}
                    </div>
                    <div
                      className={cn(
                        'rounded-xl px-3 py-2 text-sm',
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
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-600/60 flex items-center justify-center text-cyan-400">
                    <FaRobot className="w-3 h-3" />
                  </div>
                  <div className="rounded-xl px-3 py-2 bg-slate-700/50 border border-slate-600/50">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-cyan-500/20 bg-slate-800/60">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about experience, projects, skills..."
                  rows={1}
                  disabled={loading}
                  className="flex-1 min-h-[40px] max-h-24 px-3 py-2.5 rounded-xl bg-slate-800/90 border border-cyan-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none disabled:opacity-60 text-sm"
                  aria-label="Message"
                />
                <motion.button
                  type="button"
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  whileHover={!loading && input.trim() ? { scale: 1.05 } : {}}
                  whileTap={!loading && input.trim() ? { scale: 0.98 } : {}}
                  className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center shadow-md hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send"
                >
                  <FaPaperPlane className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AskCrichWidget
