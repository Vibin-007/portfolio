import React from 'react'
import { Github } from 'lucide-react'
import FadeIn from './FadeIn'
import { ExpandableCard } from '@/components/ui/expandable-card'
import { Button } from '@/components/ui/button'
import Magnet from './Magnet'
import SplitTextReveal from './ui/split-text-reveal'
import scannerImg from '../assets/images/Scanner.png'
import summarizerImg from '../assets/images/Summarizer.png'

const DataScienceProjectsSection: React.FC = () => {
  return (
    <section id="ds-projects" className="relative bg-[#0C0C0C] z-10">
      <div className="px-5 sm:px-8 md:px-10 py-20 pb-32 max-w-7xl mx-auto w-full">
        <SplitTextReveal
          text="Data Science Projects"
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 9vw, 120px)' }}
        />

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
          <FadeIn delay={0.1} y={20} duration={0.7} className="w-full h-full">
            <ExpandableCard
              title="Document Scanner"
              src={scannerImg}
              description="OCR & AI Analyzer"
              classNameExpanded="[&_h4]:text-white [&_h4]:font-bold [&_h4]:uppercase [&_h4]:tracking-widest [&_h4]:text-lg [&_h4]:mt-4 [&_h4]:mb-2"
            >
              <h4>The Challenge</h4>
              <p>
                Extracting structured information from raw documents is a complex computer vision task. This project combines robust OCR with LLMs to automatically parse, summarize, and translate uploaded images or camera captures.
              </p>
              <h4>Technical Approach</h4>
              <p>
                I implemented adaptive thresholding and auto-orientation using OpenCV and Tesseract OCR to clean the images. Then, I integrated GPT-4o via CometAPI to perform advanced document understanding, entity extraction (emails, phone numbers), and structured receipt parsing.
              </p>
              <h4>Features & Stack</h4>
              <p>
                The app supports multi-language OCR and includes a sleek, dark-themed glassmorphism UI built with Streamlit.
                <br /><br />
                <strong>Tech Stack:</strong> Python, OpenCV, Tesseract OCR, Streamlit, GPT-4o.
              </p>
              <div className="pt-6">
                <Magnet padding={30} strength={2} className="w-fit">
                  <a href="https://github.com/Vibin-007/document-scanner" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="flex items-center gap-2 w-fit">
                      <Github size={18} /> View Code
                    </Button>
                  </a>
                </Magnet>
              </div>
            </ExpandableCard>
          </FadeIn>

          <FadeIn delay={0.2} y={20} duration={0.7} className="w-full h-full">
            <ExpandableCard
              title="NLP Summarizer"
              src={summarizerImg}
              description="Research Assistant"
              classNameExpanded="[&_h4]:text-white [&_h4]:font-bold [&_h4]:uppercase [&_h4]:tracking-widest [&_h4]:text-lg [&_h4]:mt-4 [&_h4]:mb-2"
            >
              <h4>The Challenge</h4>
              <p>
                Parsing and understanding long research documents or PDFs is time-consuming. I built this Streamlit-based web application to serve as an intelligent Research Assistant that automatically extracts and summarizes text from PDF, DOCX, and TXT files.
              </p>
              <h4>Technical Approach</h4>
              <p>
                The pipeline utilizes Natural Language Processing (NLP) for extractive summarization using NLTK based on word frequency. It also implements YAKE for identifying key insights and phrases, and generates interactive visualizations like Word Clouds and Plotly charts to analyze term relevance.
              </p>
              <h4>Features & Stack</h4>
              <p>
                The application also features audio synthesis to convert the generated summaries into speech for accessibility.
                <br /><br />
                <strong>Tech Stack:</strong> Python, NLTK, YAKE, Plotly, Streamlit.
              </p>
              <div className="pt-6">
                <Magnet padding={30} strength={2} className="w-fit">
                  <a href="https://github.com/Vibin-007/NLP_Document_Summarizer" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="flex items-center gap-2 w-fit">
                      <Github size={18} /> View Code
                    </Button>
                  </a>
                </Magnet>
              </div>
            </ExpandableCard>
          </FadeIn>
        </ul>
      </div>
    </section>
  )
}

export default DataScienceProjectsSection
