import React from 'react'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import SplitTextReveal from './ui/split-text-reveal'

const SkillsSection: React.FC = () => {
  const skills = [
    {
      number: '01',
      name: 'Python & Java',
      description: 'Core programming languages for ML model development, data processing, and building robust backend systems.'
    },
    {
      number: '02',
      name: 'Web Development',
      description: 'Full-stack development with Django, Flask, JavaScript, and HTML/CSS for building responsive, user-friendly interfaces.'
    },
    {
      number: '03',
      name: 'Database Management',
      description: 'Design and management of relational databases using PostgreSQL and MySQL for scalable, data-driven applications.'
    },
    {
      number: '04',
      name: 'Data Science',
      description: 'Data analysis and visualization using NumPy, Pandas, Scikit-learn, and Matplotlib for deriving actionable insights from complex datasets.'
    },
    {
      number: '05',
      name: 'Machine Learning',
      description: 'Building and evaluating supervised and unsupervised learning models — Linear & Logistic Regression, KNN, Decision Trees, Random Forest, K-Means, and DBSCAN — with expertise in preprocessing, feature engineering, and model optimization.'
    }
  ]

  return (
    <section id="skills" className="relative bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <div className="flex flex-col items-center">
        <SplitTextReveal
          text="Skills"
          className="font-black uppercase leading-none tracking-tight text-center text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        />

        <div className="flex flex-col max-w-5xl w-full">
          {skills.map((skill, index) => (
            <FadeIn key={skill.number} delay={index * 0.1} duration={0.7}>
              <div className="flex flex-col md:flex-row py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] last:border-b-0">
                <div className="w-full md:w-1/4 mb-4 md:mb-0">
                  <div
                    className="font-black text-[#0C0C0C]"
                    style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                  >
                    {skill.number}
                  </div>
                </div>
                <div className="w-full md:w-3/4">
                  <div
                    className="font-medium uppercase text-[#0C0C0C] mb-2"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {skill.name}
                  </div>
                  <div
                    className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {skill.description}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
