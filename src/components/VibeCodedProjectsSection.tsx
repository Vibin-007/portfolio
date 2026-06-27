import React from 'react'
import { Github } from 'lucide-react'
import FadeIn from './FadeIn'
import { ExpandableCard } from '@/components/ui/expandable-card'
import { Button } from '@/components/ui/button'

const VibeCodedProjectsSection: React.FC = () => {
  return (
    <section id="vibe-projects" className="relative bg-[#0C0C0C] z-10">
      <div className="px-5 sm:px-8 md:px-10 py-20 pb-32 max-w-7xl mx-auto w-full">
        <FadeIn delay={0} y={40} duration={0.7}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 9vw, 120px)' }}
          >
            Vibe Coded Projects
          </h2>
        </FadeIn>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
          <FadeIn delay={0.1} y={20} duration={0.7} className="w-full h-full">
            <ExpandableCard
              title="Vibe"
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop"
              description="Android Music Player"
              classNameExpanded="[&_h4]:text-white [&_h4]:font-bold [&_h4]:uppercase [&_h4]:tracking-widest [&_h4]:text-lg [&_h4]:mt-4 [&_h4]:mb-2"
            >
              <h4>The Concept</h4>
              <p>
                A sleek, performant music player designed exclusively for Android devices. The primary goal was to create a highly aesthetic UI that makes managing and playing music a visually pleasing experience.
              </p>
              <h4>Implementation</h4>
              <p>
                Built entirely with Flutter, leveraging its powerful rendering engine to achieve 60fps animations, smooth transitions, and a highly responsive user experience native to Android.
              </p>
              <h4>Tech Stack</h4>
              <p>
                <strong>Tech Stack:</strong> Flutter, Dart, Android SDK.
              </p>
              <div className="pt-6">
                <a href="https://github.com/Vibin-007/vibe" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="flex items-center gap-2 w-fit">
                    <Github size={18} /> View Code
                  </Button>
                </a>
              </div>
            </ExpandableCard>
          </FadeIn>

          <FadeIn delay={0.2} y={20} duration={0.7} className="w-full h-full">
            <ExpandableCard
              title="Folio"
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop"
              description="Desktop PDF Viewer"
              classNameExpanded="[&_h4]:text-white [&_h4]:font-bold [&_h4]:uppercase [&_h4]:tracking-widest [&_h4]:text-lg [&_h4]:mt-4 [&_h4]:mb-2"
            >
              <h4>The Concept</h4>
              <p>
                A lightweight, fast, and elegant PDF viewer tailored specifically for desktop environments. Folio was designed to provide a distraction-free reading experience on both Windows and Linux.
              </p>
              <h4>Implementation</h4>
              <p>
                Developed using Flutter for Desktop to ensure native-like performance. It utilizes custom window rendering and efficient file handling protocols to quickly load and navigate large documents across operating systems.
              </p>
              <h4>Tech Stack</h4>
              <p>
                <strong>Tech Stack:</strong> Flutter, Dart, C++.
              </p>
              <div className="pt-6">
                <a href="https://github.com/Vibin-007/Folio" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="flex items-center gap-2 w-fit">
                    <Github size={18} /> View Code
                  </Button>
                </a>
              </div>
            </ExpandableCard>
          </FadeIn>
        </ul>
      </div>
    </section>
  )
}

export default VibeCodedProjectsSection
