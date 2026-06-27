import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SplitTextRevealProps {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number
}

const SplitTextReveal: React.FC<SplitTextRevealProps> = ({ text, className = '', style, delay = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-20% 0px' })

  // Split text into words, then words into characters
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay },
    },
  }

  const child = {
    hidden: {
      opacity: 0,
      y: '100%',
    },
    visible: {
      opacity: 1,
      y: '0%',
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      ref={containerRef}
      className={className.replace('hero-heading', '').trim()}
      style={style}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap" style={{ marginRight: wordIdx === words.length - 1 ? '0' : '0.25em' }}>
          {word.split('').map((char, charIdx) => (
            <span key={charIdx} className="inline-block overflow-hidden pb-2 -mb-2">
              <motion.span 
                variants={child} 
                className={`inline-block ${className.includes('hero-heading') ? 'hero-heading' : ''}`}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.div>
  )
}

export default SplitTextReveal
