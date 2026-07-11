import React from 'react'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import Magnet from './Magnet'

interface LiveProjectButtonProps {
  href: string
}

const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ href }) => {
  return (
    <Magnet padding={30} strength={2} className="w-fit">
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View code for this project on GitHub"
        className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#D7E2EA]/30 px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-medium text-[#D7E2EA] uppercase tracking-widest hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA]/60 transition-colors duration-300 backdrop-blur-sm group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Github className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-white transition-colors" />
        <span>View Code</span>
      </motion.a>
    </Magnet>
  )
}

export default LiveProjectButton