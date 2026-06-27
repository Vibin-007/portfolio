import React, { useRef, useEffect } from 'react'

interface MarqueeSectionProps {
  className?: string
}

const MarqueeSection: React.FC<MarqueeSectionProps> = ({ className = '' }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollOffset, setScrollOffset] = React.useState(0)

  const row1Skills = [
    'Python', 'Java', 'JavaScript', 'HTML/CSS', 'Django', 'Flask',
    'PostgreSQL', 'MySQL', 'Git', 'GitHub', 'TensorFlow'
  ]

  const row2Skills = [
    'NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Machine Learning',
    'Data Analysis', 'Supervised Learning', 'Unsupervised Learning'
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const sectionTop = sectionRef.current.offsetTop
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      const offset = (scrollY - sectionTop + windowHeight) * 0.3
      setScrollOffset(offset)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', handleScroll, { passive: true })
          } else {
            window.removeEventListener('scroll', handleScroll)
          }
        })
      },
      { threshold: 0 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const SkillPill: React.FC<{ name: string }> = ({ name }) => (
    <div className="flex-shrink-0 px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-2xl border border-[#D7E2EA]/15 bg-gradient-to-br from-[#D7E2EA]/8 to-[#D7E2EA]/3 backdrop-blur-sm">
      <span className="text-[#D7E2EA] font-semibold text-base sm:text-lg md:text-xl uppercase tracking-wider whitespace-nowrap">
        {name}
      </span>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className={`relative bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden ${className}`}
    >
      <div className="flex flex-col gap-4">
        <div
          className="flex gap-4"
          style={{
            transform: `translateX(${scrollOffset - 200}px)`,
            willChange: 'transform'
          }}
        >
          {[...row1Skills, ...row1Skills, ...row1Skills].map((skill, index) => (
            <SkillPill key={`row1-${index}`} name={skill} />
          ))}
        </div>

        <div
          className="flex gap-4"
          style={{
            transform: `translateX(${-(scrollOffset - 200)}px)`,
            willChange: 'transform'
          }}
        >
          {[...row2Skills, ...row2Skills, ...row2Skills].map((skill, index) => (
            <SkillPill key={`row2-${index}`} name={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MarqueeSection