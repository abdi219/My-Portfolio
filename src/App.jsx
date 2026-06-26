import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import ExtraCurricular from './components/ExtraCurricular';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ModelLab from './components/ModelLab';
import './App.css';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLabOpen, setIsLabOpen] = useState(false);
  const [activeEngine, setActiveEngine] = useState(() => {
    return localStorage.getItem('hero_3d_model') || 'neural-tree';
  });

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Navbar 
        isChatOpen={isChatOpen} 
        setIsChatOpen={setIsChatOpen}
        isLabOpen={isLabOpen}
        setIsLabOpen={setIsLabOpen}
      />
      <main>
        <Hero activeEngine={activeEngine} />
        <About />
        <Projects />
        <Certificates />
        <ExtraCurricular />
        <Contact />
      </main>
      <Footer />
      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      <ModelLab 
        isOpen={isLabOpen} 
        onClose={() => setIsLabOpen(false)}
        activeEngine={activeEngine}
        onApplyEngine={setActiveEngine}
      />
    </div>
  );
}

export default App;

