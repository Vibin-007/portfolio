'use client';

import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring physics for smooth trailing
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const checkDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const isMobileWidth = window.innerWidth < 1024; // Treat screens smaller than 1024px as mobile/tablet
      
      if (hasTouch || isCoarse || isMobileWidth) {
        setIsDesktop(false)
      } else {
        setIsDesktop(true)
      }
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)

    const moveCursor = (e: MouseEvent) => {
      if (!isDesktop) return
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      if (!isDesktop) return
      const target = e.target as HTMLElement
      // Check if we are hovering over a clickable element
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('resize', checkDevice)
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY, isDesktop])

  if (!isDesktop) return null

  return (
    <>
      {/* Outer Circle trailing the cursor - hidden on screens below md breakpoint */}
      <motion.div
        className="hidden md:flex fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#D7E2EA]/50 pointer-events-none z-[9999] items-center justify-center backdrop-blur-[2px]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(215, 226, 234, 0.1)' : 'rgba(215, 226, 234, 0)',
          borderColor: isHovering ? 'rgba(215, 226, 234, 0.8)' : 'rgba(215, 226, 234, 0.5)',
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Inner Dot exactly on the cursor - hidden on screens below md breakpoint */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full bg-[#D7E2EA] pointer-events-none z-[9999] shadow-[0_0_10px_rgba(215,226,234,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}

export default CustomCursor
