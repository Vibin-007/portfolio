import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, ChevronDown } from 'lucide-react'
import ChatMessage, { type Message } from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import { generateResponse, SUGGESTED_QUESTIONS, WELCOME_MESSAGE } from '../../lib/nlp-engine'

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: WELCOME_MESSAGE,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setShowSuggestions(false)
    setIsTyping(true)

    if (inputRef.current) {
      inputRef.current.style.height = '20px'
    }

    const delay = Math.random() * 500 + 300
    await new Promise((resolve) => setTimeout(resolve, delay))

    const response = generateResponse(trimmed)

    const typingDelay = Math.min(response.length * 5, 1500)
    await new Promise((resolve) => setTimeout(resolve, typingDelay))

    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiMsg])
    setIsTyping(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    const textarea = e.target
    textarea.style.height = '20px'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
  }

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[9999] w-[52px] h-[52px] rounded-full bg-[#161616] border border-white/[0.08] shadow-xl shadow-black/40 flex items-center justify-center cursor-pointer hover:border-white/[0.15] transition-all duration-300"
          >
            <span className="text-[#D7E2EA]/70 font-[Kanit] font-bold text-lg hover:text-[#D7E2EA] transition-colors">V</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-[9999] w-[380px] h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] flex flex-col rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/80 bg-black"
          >
            {/* Header */}
            <div className="absolute top-3 left-3 right-3 z-10 flex items-center gap-2">
              {/* Icon Tile */}
              <div className="relative w-10 h-10 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.1] flex items-center justify-center shadow-md shadow-black/10">
                <span className="text-[#D7E2EA] font-[Kanit] font-extrabold text-lg select-none leading-none">V</span>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-[1.5px] border-[#0E0E0E]" />
              </div>

              {/* Name Tile */}
              <div className="flex-1 h-10 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.1] px-4 flex items-center justify-center shadow-md shadow-black/10">
                <h3 className="text-[#D7E2EA] font-bold text-[14px] tracking-wide font-[Kanit] leading-none">Vibin</h3>
              </div>

              {/* Close Button Tile */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.12] transition-all text-[#D7E2EA]/85 hover:text-white shadow-md shadow-black/10"
              >
                <ChevronDown size={16} />
              </button>
            </div>

             {/* Messages Area */}
             <div 
               ref={messagesContainerRef}
               className="flex-1 overflow-y-auto pt-16 pb-20 space-y-0.5 chat-scroll"
               style={{ 
                 backgroundColor: 'transparent',
                 scrollbarWidth: 'thin',
                 scrollbarColor: 'rgba(215, 226, 234, 0.15) transparent',
               }}
             >
               <style>{`
                 .chat-scroll::-webkit-scrollbar {
                   width: 4px;
                 }
                 .chat-scroll::-webkit-scrollbar-track {
                   background: transparent;
                 }
                 .chat-scroll::-webkit-scrollbar-thumb {
                   background: rgba(215, 226, 234, 0.15);
                   border-radius: 9999px;
                 }
                 .chat-scroll::-webkit-scrollbar-thumb:hover {
                   background: rgba(215, 226, 234, 0.3);
                 }
               `}</style>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {/* Suggested Questions */}
              {showSuggestions && messages.length <= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="px-4 pt-2 pb-1"
                >
                  <p className="text-[#D7E2EA]/20 text-[10px] uppercase tracking-[0.15em] mb-2.5 font-[Kanit]">Try asking</p>
                  <div className="flex flex-col gap-1.5">
                    {SUGGESTED_QUESTIONS.slice(0, 6).map((q, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.05 }}
                        onClick={() => sendMessage(q)}
                        className="text-left px-3.5 py-2 text-[12px] rounded-xl bg-[#151515] border border-white/[0.04] text-[#D7E2EA]/35 hover:text-[#D7E2EA]/70 hover:bg-[#1A1A1A] hover:border-white/[0.08] transition-all duration-200 font-[Kanit]"
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="absolute bottom-3 left-3 right-3 z-10">
              <div className="flex items-center gap-2 bg-white/[0.05] backdrop-blur-md border border-white/[0.08] rounded-3xl pl-3 pr-1.5 py-1.5 focus-within:border-white/[0.15] transition-all duration-200 shadow-sm shadow-black/20">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Vibin..."
                  rows={1}
                  className="flex-1 bg-transparent text-[13px] text-[#D7E2EA]/90 placeholder:text-[#D7E2EA]/15 resize-none outline-none py-0 pl-1 leading-5 max-h-[120px] font-[Kanit]"
                  style={{ height: '20px', scrollbarWidth: 'none' }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isTyping}
                  className="flex-shrink-0 w-7 h-7 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-[#D7E2EA] disabled:bg-white/[0.03] disabled:text-[#D7E2EA]/20 flex items-center justify-center transition-all"
                >
                  <Send size={11} className="transform translate-x-[0.5px]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
