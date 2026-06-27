import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FadeIn from './FadeIn'
import LiveProjectButton from './LiveProjectButton'
import { ExternalLink } from 'lucide-react'
import SplitTextReveal from './ui/split-text-reveal'

interface Project {
  id: number
  number: string
  category: string
  name: string
  client: string
  description: string
  techStack: string[]
  link: string
}

const ProjectCard: React.FC<{
  project: Project
  index: number
  totalCards: number
  containerRef: React.RefObject<HTMLDivElement>
}> = ({ project, index, totalCards, containerRef }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const targetScale = 1 - (totalCards - 1 - index) * 0.03
  const scale = useTransform(
    scrollYProgress,
    [index / totalCards, 1],
    [1, targetScale]
  )

  return (
    <motion.div
      className="sticky h-[85vh] flex items-center justify-center origin-top"
      style={{
        top: `calc(6rem + ${index * 28}px)`,
        scale
      }}
    >
      <div className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA]/30 bg-[#0C0C0C] p-6 sm:p-10 md:p-16 w-full max-w-7xl h-[80%] max-h-[700px] flex flex-col justify-between shadow-2xl relative overflow-hidden group">
        
        {/* Decorative Background Gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="flex flex-col h-full relative z-10">
          <div className="flex justify-between items-start mb-10">
            <div className="flex items-start gap-6 sm:gap-10">
              <div
                className="font-black text-[#D7E2EA]"
                style={{ fontSize: 'clamp(6rem, 22vw, 160px)', lineHeight: '0.8' }}
              >
                {project.number}
              </div>
              <div className="hidden sm:flex flex-col mt-2">
                <div className="text-white font-medium uppercase tracking-widest text-sm sm:text-base mb-2">
                  {project.category}
                </div>
                <div className="text-[#D7E2EA]/60 font-light text-xs sm:text-sm uppercase tracking-wider">
                  {project.client}
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              {project.link && (
                <LiveProjectButton href={project.link} />
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h3 className="font-black uppercase text-[#D7E2EA] mb-4 sm:mb-8 tracking-wide" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              {project.name}
            </h3>

            {/* Mobile Category & Client */}
            <div className="sm:hidden flex flex-col mb-6 mt-[-4px]">
              <div className="text-white font-medium uppercase tracking-widest text-sm mb-1.5">
                {project.category}
              </div>
              <div className="text-[#D7E2EA]/60 font-light text-xs uppercase tracking-wider">
                {project.client}
              </div>
            </div>

            <p className="text-[#D7E2EA]/70 font-light leading-relaxed max-w-3xl" style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}>
              {project.description}
            </p>
          </div>

          {/* Mobile View Code Button */}
          {project.link && (
            <div className="sm:hidden mt-0">
              <LiveProjectButton href={project.link} />
            </div>
          )}

          <div className="mt-12 sm:mt-10 flex flex-wrap gap-3">
            {project.techStack.map(tech => (
              <span key={tech} className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium uppercase tracking-widest bg-[#D7E2EA]/10 text-[#D7E2EA] border border-[#D7E2EA]/20">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ProjectsSection: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const projects: Project[] = [
    {
      id: 1,
      number: '01',
      category: 'Web Application',
      name: 'College Event Website',
      client: '(Academic)',
      description: 'Responsive website for a college event with multiple event categories, registration forms, and user-friendly UI for event details and schedules.',
      techStack: ['Django', 'PostgreSQL', 'JavaScript', 'HTML/CSS'],
      link: 'https://github.com/Vibin-007/College_event.git' // Placeholder until user provides exact link
    },
    
    {
      id: 2,
      number: '02',
      category: 'Web Application',
      name: 'Personal Portfolio',
      client: '(Personal)',
      description: 'A highly interactive, modern personal portfolio website built with React and Framer Motion. Features custom scroll animations, dynamic sticky layouts, and a sleek dark theme.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      link: 'https://github.com/Vibin-007/portfolio.git' // Placeholder until user provides exact link
    },
    {
      id: 3,
      number: '03',
      category: 'Android Application',
      name: 'Vibe',
      client: '(Personal)',
      description: 'A feature-rich music player designed to offer a premium listening experience. Features smart audio controls, real-time synchronization for collaborative listening, and intuitive gesture controls.',
      techStack: ['Flutter', 'Dart', 'Android SDK'],
      link: 'https://github.com/Vibin-007/vibe'
    }
  ]

  return (
    <section id="projects" className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10">
      <div className="px-5 sm:px-8 md:px-10 py-20">
        <SplitTextReveal
          text="Projects"
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        />

        <div
          ref={containerRef}
          className="relative mt-24 md:mt-32"
          style={{ height: `${projects.length * 100}vh` }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={projects.length}
              containerRef={containerRef}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection