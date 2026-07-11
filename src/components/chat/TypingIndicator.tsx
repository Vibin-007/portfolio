import React from 'react'
import { motion } from 'framer-motion'

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-2.5 px-4 py-1.5">
      <div className="w-7 h-7 rounded-lg bg-[#1A1A1A] border border-white/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-[#D7E2EA]/50 font-[Kanit] font-bold text-[11px]">V</span>
      </div>
      <div className="bg-[#141414] border border-white/[0.04] rounded-2xl rounded-tl-md px-3.5 py-3">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-[5px] h-[5px] rounded-full bg-[#D7E2EA]/25"
              animate={{
                y: [0, -4, 0],
                opacity: [0.25, 0.6, 0.25],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                delay: i * 0.12,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
