import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Check, Copy } from 'lucide-react'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex items-start gap-2.5 px-4 py-1.5 group ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-lg bg-[#1A1A1A] border border-white/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-[#D7E2EA]/50 font-[Kanit] font-bold text-[11px]">V</span>
        </div>
      )}

      {/* Message bubble */}
      <div className={`relative max-w-[82%] ${isUser ? 'ml-auto' : 'mr-auto'}`}>
        <div
          className={`px-3.5 py-2.5 text-[13px] leading-[1.6] font-[Kanit] ${
            isUser
              ? 'bg-[#1C1C1C] border border-white/[0.06] text-[#D7E2EA]/85 rounded-2xl rounded-tr-md'
              : 'bg-[#141414] border border-white/[0.04] text-[#D7E2EA]/75 rounded-2xl rounded-tl-md'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="chat-markdown [&_p]:mb-1.5 [&_p:last-child]:mb-0 [&_ul]:my-1.5 [&_ul]:ml-4 [&_ol]:my-1.5 [&_ol]:ml-4 [&_li]:my-0.5 [&_li]:text-[#D7E2EA]/70 [&_strong]:text-[#D7E2EA]/90 [&_strong]:font-semibold [&_em]:text-[#D7E2EA]/60 [&_h1]:text-[14px] [&_h1]:font-semibold [&_h1]:text-[#D7E2EA]/90 [&_h1]:mb-2 [&_h2]:text-[13px] [&_h2]:font-semibold [&_h2]:text-[#D7E2EA]/85 [&_h2]:mb-1.5 [&_h3]:text-[13px] [&_h3]:font-medium [&_h3]:text-[#D7E2EA]/80 [&_code]:bg-[#1E1E1E] [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[12px] [&_code]:text-[#D7E2EA]/60 [&_pre]:bg-[#1A1A1A] [&_pre]:border [&_pre]:border-white/[0.04] [&_pre]:rounded-lg [&_pre]:p-2.5 [&_pre]:my-2 [&_hr]:border-white/[0.05] [&_hr]:my-2">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Timestamp + Copy */}
        <div className={`flex items-center gap-1.5 mt-0.5 px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-[9px] text-[#D7E2EA]/15 font-[Kanit]">{formatTime(message.timestamp)}</span>
          {!isUser && (
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-[#D7E2EA]/15 hover:text-[#D7E2EA]/40"
              title="Copy response"
            >
              {copied ? (
                <Check size={10} className="text-emerald-400/60" />
              ) : (
                <Copy size={10} />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ChatMessage
