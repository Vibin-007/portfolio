import { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Workshops from './components/Workshops';
import Contact from './components/Contact';
function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <CustomCursor />
      {!loaderDone && <Loader onDone={() => setLoaderDone(true)} />}
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Workshops />
        <Contact />
      </main>
    </>
  );
}

export default App;
