import React from 'react'
import SpecularButton from './ui/SpecularButton'

interface ContactButtonProps {
  className?: string
}

const ContactButton: React.FC<ContactButtonProps> = ({ className = '' }) => {
  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#contact';
    }
  };

  return (
    <SpecularButton
      size="lg"
      radius={999}
      tint="#ffffff"
      tintOpacity={0.1}
      blur={2}
      textColor="#f5f5f5"
      lineColor="#ffffff"
      baseColor="#525252"
      intensity={1.2}
      shineSize={30}
      shineFade={50}
      thickness={1.2}
      speed={0.3}
      followMouse
      proximity={250}
      autoAnimate={false}
      onClick={handleClick}
      className={className}
    >
      Contact Me
    </SpecularButton>
  )
}

export default ContactButton