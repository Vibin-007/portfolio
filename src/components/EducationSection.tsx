import React from 'react'
import { GraduationCap } from 'lucide-react'
import SplitTextReveal from './ui/split-text-reveal'
import FadeIn from './FadeIn'

const EducationSection: React.FC = () => {
  const education = [
    {
      degree: 'B.Sc (AI & Data Science)',
      institution: 'Rathinam College of Arts and Science',
      period: '2024 – 2027',
      current: true
    },
    {
      degree: 'Higher Secondary',
      institution: 'Devanga Hr Sec School',
      period: '2022 – 2024',
      current: false
    },
    {
      degree: 'Secondary School',
      institution: 'Sri Visweswara Vidyalaya',
      period: '2021 – 2022',
      current: false
    }
  ]

  return (
    <section id="education" className="relative bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-40 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <div className="flex flex-col items-center">
        <SplitTextReveal
          text="Education"
          as="h2"
          className="font-black uppercase leading-none tracking-tight text-center text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        />

        <div className="relative max-w-3xl w-full">
          {/* Timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 sm:left-[22px] sm:translate-x-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#0C0C0C] via-[#0C0C0C]/50 to-[rgba(12,12,12,0.1)]" />

          <div className="flex flex-col gap-12 sm:gap-16">
            {education.map((item, index) => (
              <FadeIn key={index} delay={index * 0.15} duration={0.7}>
                <div className="relative flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-8 w-full">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0 bg-white sm:bg-transparent py-2 sm:py-0">
                    <div className={`w-[38px] h-[38px] sm:w-[46px] sm:h-[46px] rounded-full border-2 flex items-center justify-center ${item.current ? 'border-[#0C0C0C] bg-[#EBEBEB]' : 'border-[#0C0C0C]/20 bg-white'}`}>
                      <GraduationCap className={`w-4 h-4 sm:w-5 sm:h-5 ${item.current ? 'text-[#0C0C0C]' : 'text-[#0C0C0C]/40'}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 w-full pb-2 relative z-10 bg-white sm:bg-transparent px-2 sm:px-0 flex flex-col items-center sm:items-start">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-1 sm:gap-4 mb-2">
                      <h3
                        className="text-[#0C0C0C] font-bold uppercase tracking-wide"
                        style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.8rem)' }}
                      >
                        {item.degree}
                      </h3>
                      <span className={`text-sm sm:text-base font-medium tracking-wider uppercase whitespace-nowrap mt-1 sm:mt-0 ${item.current ? 'text-[#0C0C0C]' : 'text-[#0C0C0C]/50'}`}>
                        {item.period}
                      </span>
                    </div>
                    <p className="text-[#0C0C0C]/70 font-light" style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.15rem)' }}>
                      {item.institution}
                    </p>
                    {item.current && (
                      <span className="inline-block mt-4 sm:mt-3 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest bg-[#0C0C0C]/10 text-[#0C0C0C] border border-[#0C0C0C]/20">
                        Currently Pursuing
                      </span>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationSection
