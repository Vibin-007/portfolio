import React from 'react'
import './App.css'
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


function App() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] font-[Kanit] text-[#D7E2EA]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <DataScienceProjectsSection />
      <WorkshopsSection />
      <HackathonsSection />
      <EducationSection />
      <ContactSection />
    </div>
  )
}

export default App