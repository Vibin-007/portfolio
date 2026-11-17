import { useEffect, useMemo, useRef, useState } from "react";
import { Loader } from "@/components/Loader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Projects } from "@/sections/Projects";
import { DataScience } from "@/sections/DataScience";
import { Workshops } from "@/sections/Workshops";
import { Hackathon } from "@/sections/Hackathon";
import { Education } from "@/sections/Education";
import { Contact } from "@/sections/Contact";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { setupScrollProgress } from "@/animations/transitions";
import { lockScroll } from "@/lib/smoothScroll";

/** Eases a displayed number toward its target, then stops its frame loop. */
function useTweenedProgress(target: number) {
  const [display, setDisplay] = useState(0);
  const currentRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      currentRef.current += (target - currentRef.current) * 0.12;
      if (Math.abs(target - currentRef.current) < 0.4) currentRef.current = target;
      const rounded = Math.round(currentRef.current);
      setDisplay((prev) => (prev === rounded ? prev : rounded));
      if (currentRef.current !== target) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return display;
}

export default function App() {
  const [fontsReady, setFontsReady] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [loaderRemoved, setLoaderRemoved] = useState(false);
  const [intro, setIntro] = useState(false);

  const progressBarRef = useRef<HTMLDivElement>(null);

  // Safety nets so the loader can never hang on stalled fonts.
  useEffect(() => {
    const min = window.setTimeout(() => setMinElapsed(true), 1400);
    const fontTimeout = window.setTimeout(() => setFontsReady(true), 3500);
    return () => {
      window.clearTimeout(min);
      window.clearTimeout(fontTimeout);
    };
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts
        .ready
        .then(() => setFontsReady(true))
        .catch(() => setFontsReady(true));
    } else {
      setFontsReady(true);
    }
  }, []);

  const target = useMemo(() => {
    let value = 8;
    if (fontsReady) value = 42;
    if (fontsReady && minElapsed) value = 100;
    return value;
  }, [fontsReady, minElapsed]);

  const displayed = useTweenedProgress(target);

  useEffect(() => {
    if (target < 100 || loaderDone) return;
    setLoaderDone(true);
    setIntro(true);
  }, [target, loaderDone]);

  useEffect(() => {
    lockScroll(!loaderDone);
  }, [loaderDone]);

  useEffect(() => {
    if (!loaderDone || !progressBarRef.current) return;
    const bar = progressBarRef.current;
    const ctx = gsap.context(() => {
      setupScrollProgress(bar);
    });
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 320);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [loaderDone]);

  return (
    <>
      <div className="progress-rail" aria-hidden="true">
        <div ref={progressBarRef} className="progress-bar" />
      </div>

      <SmoothScroll>
        <main id="main">
          <Hero intro={intro} />
          <About />
          <Skills />
          <Projects />
          <DataScience />
          <Workshops />
          <Hackathon />
          <Education />
          <Contact />
        </main>
      </SmoothScroll>

      <div className="grain" aria-hidden="true" />

      {!loaderRemoved ? (
        <Loader
          progress={displayed}
          done={loaderDone}
          onComplete={() => setLoaderRemoved(true)}
        />
      ) : null}
    </>
  );
}
