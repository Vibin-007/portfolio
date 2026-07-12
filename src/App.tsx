import React from 'react'
import './App.css'
import GlassNavbar from './components/GlassNavbar'
import { 
  HeroSection, 
  MarqueeSection, 
  AboutSection, 
  SkillsSection, 
  ProjectsSection,
  DataScienceProjectsSection,
  HackathonsSection,
  EducationSection,
  WorkshopsSection,
  ContactSection
} from './components'


import { ScrollProgress } from './components/ScrollProgress'

function App() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] font-[Kanit] text-[#D7E2EA]">
      <ScrollProgress />
      <GlassNavbar />
      <HeroSection />
      <main>
        <MarqueeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <DataScienceProjectsSection />
        <WorkshopsSection />
        <HackathonsSection />
        <EducationSection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App