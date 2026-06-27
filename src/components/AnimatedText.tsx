import React from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

const CharacterSpan: React.FC<{
  char: string
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}> = ({ char, index, total, scrollYProgress }) => {
  const start = index / total
  const end = Math.min(start + 0.05, 1)
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])

  const displayChar = char === ' ' ? '\u00A0' : char

  return (
    <span className="relative inline-block">
      <span className="invisible">{displayChar}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {displayChar}
      </motion.span>
    </span>
  )
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  style
}) => {
  const containerRef = React.useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  })

  return (
    <p ref={containerRef} className={className} style={style}>
      {text.split('').map((char, index) => (
        <CharacterSpan
          key={index}
          char={char}
          index={index}
          total={text.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  )
}

export default AnimatedText