import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

import hack1 from '@/assets/images/hack1.webp'
import hack2 from '@/assets/images/hack1.webp'

const slides = [
  {
    img: hack1,
    text: ["VIBEHATHON", "DAY ONE"],
  },
  {
    img: hack2,
    text: ["COLLABORATION", "IN ACTION"],
  },
  
]

interface SlideshowProps {
  onClose: () => void
}

export default function Slideshow({ onClose }: SlideshowProps) {
  const [current, setCurrent] = useState(0)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

  if (typeof document === "undefined") return null

  return createPortal(
    <div className="fixed inset-0 z-[200] bg-black/60 flex flex-col items-center justify-center backdrop-blur-2xl">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white/50 hover:text-white transition-colors z-50 p-2"
        aria-label="Close"
      >
        <X size={36} strokeWidth={1.5} />
      </button>

      {/* Slides */}
      <div className="relative w-[90%] sm:w-[80%] max-w-6xl h-[60vh] sm:h-[75vh] rounded-3xl sm:rounded-[40px] overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-4 hover:scale-110 active:scale-95"
        onClick={prevSlide}
        aria-label="Previous image"
      >
        <ChevronLeft size={48} strokeWidth={1} />
      </button>
      <button
        className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-4 hover:scale-110 active:scale-95"
        onClick={nextSlide}
        aria-label="Next image"
      >
        <ChevronRight size={48} strokeWidth={1} />
      </button>

      {/* Counter */}
      <div className="absolute bottom-10 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white/50 font-mono tracking-widest text-sm z-50 select-none">
        0{current + 1} / 0{slides.length}
      </div>
    </div>,
    document.body
  )
}
