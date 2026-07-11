import React from 'react'
import { Trophy, Globe, Github } from 'lucide-react'
import FadeIn from './FadeIn'
import { AnimatedFeatureSpotlight } from '@/components/ui/feature-spotlight'
import SplitTextReveal from './ui/split-text-reveal'

import hack1 from '@/assets/images/hack1.webp'

const HackathonsSection: React.FC = () => {
  return (
    <section id="hackathons" className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 -mt-10 sm:-mt-12 md:-mt-14 z-30">
      <div className="flex flex-col items-center max-w-6xl mx-auto w-full">
        <SplitTextReveal
          text="Hackathons"
          as="h2"
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        />

        <FadeIn delay={0.2} y={20} duration={0.7} className="w-full">
          <AnimatedFeatureSpotlight
            // preheaderIcon={<Trophy className="h-5 w-5 text-yellow-400" />}
            preheaderText="Winner: Vibe Visionary Award"
            heading={
              <>
                <span className="text-[#D7E2EA]/50">The</span> Vibehathon{' '}
                <span className="text-[#D7E2EA]/50">Experience</span>
              </>
            }
            description="A 24-hour intense coding sprint where our team collaborated to build an innovative solution from scratch. We focused on pushing the boundaries of web experiences and were honored with the Vibe Visionary Award for our work."
            buttonText="View Website"
            buttonIcon={<Globe size={18} />}
            buttonProps={{ 
              onClick: () => window.open('https://healthcare-five-bay.vercel.app/', '_blank'),
              variant: "default",
            }}
            secondaryButtonText="View Code"
            secondaryButtonIcon={<Github size={18} />}
            secondaryButtonProps={{
              onClick: () => window.open('https://github.com/Vibin-007/healthcare', '_blank'),
              variant: "outline",
            }}
            imageUrl={hack1}
            imageAlt="Hackathon team collaborating"
          />
        </FadeIn>
      </div>
    </section>
  )
}

export default HackathonsSection
