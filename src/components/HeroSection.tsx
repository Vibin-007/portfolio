import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText, Download } from 'lucide-react'
import FadeIn from './FadeIn'
import Magnet from './Magnet'
import portraitImg from '../assets/images/img.png'
import resumePdf from '../assets/files/Vibin_Resume.pdf'
import { EtheralShadow } from './ui/etheral-shadow'
import SplitTextReveal from './ui/split-text-reveal'
import { GlassButton } from './ui/glass-button'

const HeroSection: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Workshops', href: '#workshops' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <section className="relative min-h-screen sm:h-screen flex flex-col overflow-x-clip pb-10 sm:pb-0">
      <EtheralShadow
        color="rgba(128, 128, 128, 0.15)"
        animation={{ scale: 100, speed: 90 }}
        noise={{ opacity: 1, scale: 1.2 }}
        sizing="fill"
      />
      <nav className="px-6 md:px-10 pt-6 md:pt-8 flex justify-end items-center relative z-50">
        <FadeIn delay={0.15} y={-20} duration={0.7}>
          {/* Desktop Menu */}
          <div className="hidden md:flex flex-wrap justify-end gap-x-8">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[#D7E2EA] font-medium text-sm md:text-lg lg:text-[1.2rem] uppercase tracking-wider hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[#D7E2EA] hover:text-white transition-colors p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </FadeIn>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-40 bg-[#0C0C0C]/90 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-2xl sm:text-3xl font-medium uppercase tracking-widest text-[#D7E2EA] hover:text-white"
              >
                {item.name}
              </motion.a>
            ))}
            <motion.button
              onClick={() => { setIsResumeOpen(true); setIsMenuOpen(false); }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.05 }}
              className="text-2xl sm:text-3xl font-medium uppercase tracking-widest text-[#D7E2EA] hover:text-white"
            >
              View Resume
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col items-center justify-start sm:justify-center px-5 relative z-10">
        
        {/* MOBILE HEADING (2 lines) */}
        <div className="sm:hidden flex flex-col items-center justify-center w-full relative z-0 pt-2 mb-6">
          <SplitTextReveal 
            text="Hi, I'm"
            delay={0.1}
            className="hero-heading font-black uppercase tracking-tight leading-none text-[24vw]"
          />
          <SplitTextReveal 
            text="Vibin"
            delay={0.25}
            className="hero-heading font-black uppercase tracking-tight leading-none text-[28vw] -mt-2"
          />
        </div>

        {/* DESKTOP HEADING (1 line) */}
        <div className="hidden sm:flex w-full justify-center items-center relative z-0">
          <SplitTextReveal 
            text="Hi, i'm vibin"
            delay={0.15}
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] md:-mt-5"
          />
        </div>

        <div className="w-full flex-1 flex flex-col mt-auto relative z-20 max-w-7xl mx-auto pb-7 sm:pb-8 md:pb-10">
          
          {/* MOBILE LAYOUT */}
          <div className="sm:hidden flex flex-col h-full justify-end items-center w-full">
            <div className="w-[70vw] relative pointer-events-none">
              <FadeIn delay={0.4} y={30} duration={0.7} className="w-full">
                <img
                  src={portraitImg}
                  alt="Vibin.D"
                  className="w-full h-auto object-cover rounded-3xl"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                  }}
                />
              </FadeIn>
            </div>
            <FadeIn delay={0.5} y={20} duration={0.7} className="w-full text-center mt-8 mb-6 px-6">
              <p className="text-[#888888] font-bold uppercase tracking-widest leading-relaxed text-base mx-auto max-w-[300px]">
                AI &amp; DS Student Passionate About Building Intelligent Solutions
              </p>
            </FadeIn>
          </div>

          {/* DESKTOP LAYOUT */}
          <div className="hidden sm:flex flex-row justify-between items-end w-full h-full mt-auto relative">

            {/* Desktop Image (Centered Absolute) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[320px] md:w-[400px] lg:w-[460px] pointer-events-none z-10">
              <FadeIn delay={0.4} y={30} duration={0.7} className="w-full">
                <Magnet
                  padding={150}
                  strength={3}
                  activeTransition="transform 0.3s ease-out"
                  inactiveTransition="transform 0.6s ease-in-out"
                >
                  <img
                    src={portraitImg}
                    alt="Vibin.D"
                    className="w-full h-auto object-cover rounded-3xl"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
                    }}
                  />
                </Magnet>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Left Side Typographic Text (Absolute to screen edge) */}
      <div className="hidden sm:flex absolute bottom-8 left-4 md:left-8 lg:left-12 z-20 max-w-[30vw]">
        <FadeIn delay={0.35} y={0} duration={0.7}>
          <div 
            className="text-left text-[#555555] flex flex-col items-start leading-[0.9] font-black uppercase tracking-normal"
            style={{ fontSize: 'clamp(2.5rem, 4.5vw, 5.5rem)' }}
          >
            <span>AI &amp; DS</span>
            <span>Student</span>
            <span>Passionate</span>
            <span>About</span>
            <span>Building</span>
            <span>Intelligent</span>
            <span>Solutions</span>
          </div>
        </FadeIn>
      </div>

      {/* Desktop Resume Typographic Button (Absolute to screen edge) */}
      <div className="hidden sm:flex absolute bottom-8 right-4 md:right-8 lg:right-12 z-30 pointer-events-auto max-w-[30vw]">
        <FadeIn delay={0.5} y={0} duration={0.7}>
          <div 
            onClick={() => setIsResumeOpen(true)}
            className="text-right text-[#555555] hover:text-white transition-colors cursor-pointer group flex flex-col items-end leading-[0.9] font-black uppercase tracking-normal"
            style={{ fontSize: 'clamp(2.5rem, 4.5vw, 5.5rem)' }}
          >
            <span>Click</span>
            <span>Here</span>
            <span>To View</span>
            <span>Resume</span>
          </div>
        </FadeIn>
      </div>

      {/* Resume Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#0C0C0C]/80 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[850px] h-[85vh] bg-[#111111] rounded-3xl sm:rounded-[32px] shadow-2xl border border-white/10 overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-[#D7E2EA]/10 bg-[#111111]">
                <h3 className="text-white font-black uppercase tracking-wide text-xl flex items-center gap-3">
                  <FileText size={20} /> RESUME
                </h3>
                <div className="flex items-center gap-4">
                  <a href={resumePdf} download="Vibin_Resume.pdf" target="_blank" rel="noopener noreferrer" className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-300 focus:outline-none" title="Download Resume">
                    <Download size={18} />
                  </a>
                  <button onClick={() => setIsResumeOpen(false)} className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-300 focus:outline-none" aria-label="Close">
                    <X size={20} strokeWidth={2} />
                  </button>
                </div>
              </div>
              
              {/* PDF Viewer */}
              <div className="flex-1 w-full bg-[#E5E5E5] relative">
                <iframe 
                  src={`${resumePdf}#toolbar=0&navpanes=0&view=Fit`} 
                  className="absolute inset-0 w-full h-full border-0" 
                  title="Resume PDF"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default HeroSection