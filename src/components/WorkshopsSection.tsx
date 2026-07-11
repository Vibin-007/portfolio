import React from 'react'
import { BookOpen } from 'lucide-react'
import SplitTextReveal from './ui/split-text-reveal'
import FadeIn from './FadeIn'

const WorkshopsSection: React.FC = () => {
  const workshops = [
    {
      title: 'Mastering Generative AI',
      institution: 'IISc Bangalore',
      description: 'Gained hands-on experience with generative AI models and real-world applications across text, image, and data generation.',
      tags: ['Python', 'TensorFlow', 'Prompt', 'Tik Tokenizer']
    },
    {
      title: 'Intro to Machine Learning',
      institution: 'IIT Palakkad',
      description: 'Acquired foundational knowledge of supervised and unsupervised learning, model evaluation, and optimization techniques.',
      tags: ['Python', 'NumPy', 'Pandas']
    }
  ]

  return (
    <section id="workshops" className="relative bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 -mt-10 sm:-mt-12 md:-mt-14 z-20">
      <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
        <SplitTextReveal
          text="Workshops"
          as="h2"
          className="font-black uppercase leading-none tracking-tight text-center text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        />

        <div className="w-full flex flex-col gap-10">
          {workshops.map((workshop, index) => (
            <FadeIn key={index} delay={0.1 + index * 0.1} y={20} duration={0.7}>
              <div className="flex flex-col p-6 sm:p-8 rounded-[30px] border border-[#0C0C0C]/10 bg-[#0C0C0C]/[0.02] hover:bg-[#0C0C0C]/[0.05] transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#0C0C0C]/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-[#0C0C0C]" />
                  </div>
                  <div className="font-bold uppercase text-[#0C0C0C]" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)' }}>
                    {workshop.title}
                  </div>
                </div>
                <div className="font-medium text-[#0C0C0C]/70 uppercase tracking-wide text-sm sm:text-base mb-4">
                  {workshop.institution}
                </div>
                <p className="font-light leading-relaxed text-[#0C0C0C] opacity-70 mb-6" style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)' }}>
                  {workshop.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {workshop.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest bg-[#0C0C0C]/10 text-[#0C0C0C] border border-[#0C0C0C]/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkshopsSection
