import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText, Download } from 'lucide-react'
import { useLiquidGlass } from './ui/useLiquidGlass'
import resumePdf from '../assets/files/Vibin_Resume.pdf'
import './GlassNavbar.css'

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Workshops', href: '#workshops' },
  { name: 'Hackathons', href: '#hackathons' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
]

const GlassNavbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('dark')

  // Apply liquid glass refraction to the navbar
  useLiquidGlass(navRef, {
    scale: -112,
    chroma: 6,
    border: 0.15,
    mapBlur: 16,
    blur: 6,
    saturate: 1.5,
    radius: 100,
    fallbackBlur: 16,
  })

  // Track scroll for navbar appearance and background color detection
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      // Detect if navbar is over a white section
      const sections = document.querySelectorAll('section')
      let currentSection: Element | null = null
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        // Check if the vertical center of the navbar (approx 40px from top) is inside this section
        if (rect.top <= 40 && rect.bottom >= 40) {
          currentSection = section
        }
      })
      if (currentSection) {
        const isLight = (currentSection as Element).classList.contains('bg-white')
        setNavTheme(isLight ? 'light' : 'dark')
      } else {
        // Fallback for hero section which might not be a <section> or just doesn't have bg-white
        setNavTheme('dark')
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Close mobile menu on link click
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMenuOpen(false)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={`glass-navbar ${scrolled ? 'glass-navbar--scrolled' : ''} ${
          navTheme === 'light' ? 'glass-navbar--light-bg' : ''
        }`}
        aria-label="Main navigation"
        onPointerMove={(e) => {
          const el = navRef.current
          if (!el) return
          const rect = el.getBoundingClientRect()
          const gx = ((e.clientX - rect.left) / rect.width) * 100
          const gy = ((e.clientY - rect.top) / rect.height) * 100
          el.style.setProperty('--gx', gx.toFixed(1) + '%')
          el.style.setProperty('--gy', gy.toFixed(1) + '%')
        }}
      >
        {/* Cursor-tracked glare overlay */}
        <div className="glass-navbar__glare" aria-hidden="true" />

        <div className="glass-navbar__content">
          {/* Desktop Nav Links */}
          <div className="glass-navbar__links">
            {NAV_LINKS.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`glass-navbar__link ${activeSection === item.href.slice(1) ? 'glass-navbar__link--active' : ''}`}
                onClick={handleNavClick}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="glass-navbar__link-text">{item.name}</span>
                {activeSection === item.href.slice(1) && (
                  <motion.span
                    className="glass-navbar__link-indicator"
                    layoutId="nav-indicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Desktop Resume Button */}
          <motion.button
            className="glass-navbar__resume-btn"
            onClick={() => setIsResumeOpen(true)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: NAV_LINKS.length * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <FileText size={15} />
            <span>Resume</span>
          </motion.button>

        </div>
      </nav>

      {/* Floating Mobile Toggle Button */}
      {!isMenuOpen && (
        <button
          className="glass-mobile-floating-btn"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={28} color="#D7E2EA" strokeWidth={1.5} />
        </button>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="glass-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="glass-mobile-menu__backdrop" />
            <button
              className="glass-mobile-close-btn"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} color="#D7E2EA" strokeWidth={1.5} />
            </button>
            <div className="glass-mobile-menu__links">
              {NAV_LINKS.filter(item => item.name !== 'Home').map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: i * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`glass-mobile-menu__link ${activeSection === item.href.slice(1) ? 'glass-mobile-menu__link--active' : ''}`}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.button
                onClick={() => { setIsResumeOpen(true); setIsMenuOpen(false) }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ delay: NAV_LINKS.length * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="glass-mobile-menu__link"
              >
                View Resume
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-[#0C0C0C]/80 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12"
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
                  <a
                    href={resumePdf}
                    download="Vibin_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-300 focus:outline-none"
                    title="Download Resume"
                  >
                    <Download size={18} />
                  </a>
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-300 focus:outline-none"
                    aria-label="Close"
                  >
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
    </>
  )
}

export default GlassNavbar
