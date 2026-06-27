import React from 'react'
import { GlassButton } from './ui/glass-button'
import Magnet from './Magnet'

interface ContactButtonProps {
  className?: string
}

const ContactButton: React.FC<ContactButtonProps> = ({ className = '' }) => {
  return (
    <Magnet padding={30} strength={2} className={`inline-block ${className}`}>
      <a href="#contact" className="inline-block">
        <GlassButton
          size="default"
          contentClassName="flex items-center justify-center"
        >
          <span>Contact Me</span>
        </GlassButton>
      </a>
    </Magnet>
  )
}

export default ContactButton