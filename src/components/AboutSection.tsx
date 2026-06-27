import React from 'react'
import { Brain, Database, Code2, BarChart3 } from 'lucide-react'
import FadeIn from './FadeIn'
import AnimatedText from './AnimatedText'
import ContactButton from './ContactButton'
import SplitTextReveal from './ui/split-text-reveal'

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen px-5 sm:px-8 md:px-10 py-20 flex flex-col items-center justify-center">
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <Brain className="w-[80px] sm:w-[120px] md:w-[160px] h-auto text-[#D7E2EA] opacity-[0.08]" strokeWidth={1} />
        </FadeIn>
      </div>

      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <Database className="w-[60px] sm:w-[100px] md:w-[140px] h-auto text-[#D7E2EA] opacity-[0.08]" strokeWidth={1} />
        </FadeIn>
      </div>

      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <Code2 className="w-[80px] sm:w-[120px] md:w-[160px] h-auto text-[#D7E2EA] opacity-[0.08]" strokeWidth={1} />
        </FadeIn>
      </div>

      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <BarChart3 className="w-[70px] sm:w-[110px] md:w-[150px] h-auto text-[#D7E2EA] opacity-[0.08]" strokeWidth={1} />
        </FadeIn>
      </div>

      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 z-10">
        <SplitTextReveal
          text="About me"
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        />

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text="I'm an AI & Data Science undergraduate at Rathinam College of Arts and Science. With a strong foundation in Machine Learning and hands-on experience in Python, data analysis, and full-stack web development, I bridge the gap between intelligent backend systems and intuitive user interfaces. Let's build something incredible together!"
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 1vw, 1.35rem)' }}
          />

          <FadeIn delay={0.2} y={20} duration={0.7}>
            <a href="#contact">
              <ContactButton />
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default AboutSection