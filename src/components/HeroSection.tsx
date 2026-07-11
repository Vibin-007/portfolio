import React from 'react'
import FadeIn from './FadeIn'
import Magnet from './Magnet'
import portraitImg from '../assets/images/img.webp'
import { EtheralShadow } from './ui/etheral-shadow'
import SplitTextReveal from './ui/split-text-reveal'

const HeroSection: React.FC = () => {
  return (
    <header id="hero" className="relative min-h-screen sm:h-screen flex flex-col overflow-x-clip pb-10 sm:pb-0">
      <h1 className="sr-only">Vibin D – Flutter, React &amp; Full Stack Developer</h1>
      <EtheralShadow
        color="rgba(128, 128, 128, 0.15)"
        animation={{ scale: 100, speed: 90 }}
        noise={{ opacity: 1, scale: 1.2 }}
        sizing="fill"
      />

      {/* Spacer for fixed glass navbar */}
      <div className="pt-20 sm:pt-16" />

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
                  alt="Vibin D - Personal Portrait"
                  width="504"
                  height="572"
                  decoding="async"
                  fetchPriority="high"
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
                    alt="Vibin D - Personal Portrait"
                    width="504"
                    height="572"
                    decoding="async"
                    fetchPriority="high"
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
    </header>
  )
}

export default HeroSection