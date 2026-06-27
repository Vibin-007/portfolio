import React, { useState } from 'react'
import { Mail, Phone, Github, Linkedin, Copy, Check } from 'lucide-react'
import FadeIn from './FadeIn'
import { EtheralShadow } from './ui/etheral-shadow'
import SplitTextReveal from './ui/split-text-reveal'
import Magnet from './Magnet'
import { SpotlightCard } from './ui/spotlight-card'

const ContactItem = ({ contact }: { contact: any }) => {
  return (
    <a
      href={contact.href}
      target={contact.href.startsWith('http') ? '_blank' : undefined}
      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-4 sm:gap-6 w-full"
    >
      <Magnet padding={20} strength={1.2}>
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/[0.02] group-hover:border-[#D7E2EA]/50 group-hover:bg-[#D7E2EA]/10 flex items-center justify-center transition-all duration-300">
          <contact.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#D7E2EA]/60 group-hover:text-white transition-colors duration-300" />
        </div>
      </Magnet>
      <div className="flex-1 min-w-0">
        <div className="text-[#D7E2EA]/40 text-sm font-medium tracking-wide mb-0.5">
          {contact.label}
        </div>
        <div className="text-[#D7E2EA] font-medium text-base sm:text-lg truncate group-hover:text-white transition-colors duration-300">
          {contact.value}
        </div>
      </div>
    </a>
  )
}

const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false)

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'vibind007@gmail.com',
      href: 'mailto:vibind007@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 86083 22120',
      href: 'tel:+918608322120'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/Vibin-007',
      href: 'https://github.com/Vibin-007'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/vibin-d',
      href: 'https://linkedin.com/in/vibin-d'
    }
  ]

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText('vibind007@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 pb-10 px-5 sm:px-8 md:px-10 z-50 overflow-hidden">
      <EtheralShadow
        color="rgba(128, 128, 128, 0.15)"
        animation={{ scale: 100, speed: 90 }}
        noise={{ opacity: 1, scale: 1.2 }}
        sizing="fill"
      />
      <div className="flex flex-col items-center max-w-5xl mx-auto relative z-10">
        <SplitTextReveal
          text="Get In Touch"
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-6 sm:mb-8"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        />

        <FadeIn delay={0.1} y={20} duration={0.7}>
          <p className="text-[#D7E2EA]/60 font-light text-center mb-16 sm:mb-20" style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}>
            Let&apos;s connect and build something together
          </p>
        </FadeIn>

        <FadeIn delay={0.2} y={30} duration={0.8} className="w-full">
          <SpotlightCard className="w-full max-w-4xl mx-auto border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.02] p-8 sm:p-12 md:p-16 rounded-[2.5rem]">
            
            {/* Top Section: Email Pill */}
            <div className="flex justify-center mb-12 sm:mb-16">
              <a 
                href="mailto:vibind007@gmail.com"
                onClick={handleCopyEmail}
                className="group relative flex items-center justify-center gap-3 px-6 py-4 sm:px-10 sm:py-5 border border-[#D7E2EA]/20 bg-[#D7E2EA]/[0.03] hover:bg-[#D7E2EA]/10 hover:border-[#D7E2EA]/40 rounded-2xl sm:rounded-full transition-all duration-300"
              >
                <span className="text-xl sm:text-2xl md:text-3xl font-medium text-[#D7E2EA] tracking-wide group-hover:text-white transition-colors duration-300">
                  vibind007@gmail.com
                </span>
                {copied ? (
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 flex-shrink-0" />
                ) : (
                  <Copy className="w-5 h-5 sm:w-6 sm:h-6 text-[#D7E2EA]/40 group-hover:text-white transition-colors duration-300 flex-shrink-0" />
                )}
              </a>
            </div>

            {/* Divider */}
            <div className="w-full h-px border-t-2 border-dashed border-[#D7E2EA]/10 mb-12 sm:mb-16"></div>

            {/* Bottom Section: 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-14 w-full px-0 sm:px-6">
              {contactLinks.map((contact) => (
                <ContactItem key={contact.label} contact={contact} />
              ))}
            </div>

          </SpotlightCard>
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={0.7} y={10} duration={0.7}>
          <p className="text-[#D7E2EA]/20 text-sm font-light mt-20 sm:mt-24 text-center">
            © {new Date().getFullYear()} Vibin D
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

export default ContactSection
