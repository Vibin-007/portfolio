import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Copy, Check, X } from 'lucide-react'

interface LiveProjectButtonProps {
  href: string
}

const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ href }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        aria-label="Open code repository options for this project"
        className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#D7E2EA]/30 px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-medium text-[#D7E2EA] uppercase tracking-widest hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA]/60 transition-colors duration-300 backdrop-blur-sm group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Open</span>
      </motion.button>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-[#D7E2EA]/15 bg-[#121212]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl z-10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 text-[#D7E2EA] transition-all duration-200"
                  aria-label="Close pop-up"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                  {/* Icon Header */}
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <Github className="w-8 h-8 text-[#D7E2EA]" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-wide">
                    Project Source Code
                  </h3>
                  <p className="text-[#D7E2EA]/60 text-xs sm:text-sm mb-8 max-w-sm">
                    You can view the code repository on GitHub or copy the link directly.
                  </p>

                  {/* Link Box */}
                  <div className="w-full flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl p-3 sm:p-4 mb-8">
                    <span className="flex-1 text-[#D7E2EA] font-mono text-xs sm:text-sm truncate select-all text-left">
                      {href}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-[#D7E2EA] transition-all duration-200 flex-shrink-0"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-[#D7E2EA]/60 hover:text-white" />
                      )}
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white text-black font-semibold px-6 py-3.5 hover:bg-white/95 active:scale-[0.98] transition-all duration-200 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit GitHub</span>
                    </a>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-1 rounded-xl border border-white/10 bg-white/5 text-white font-semibold px-6 py-3.5 hover:bg-white/10 active:scale-[0.98] transition-all duration-200 text-sm"
                    >
                      Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  )
}

export default LiveProjectButton