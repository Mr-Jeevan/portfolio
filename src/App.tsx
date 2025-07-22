import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Tools from './components/Tools';
import Contact from './components/Contact';
import Navigation from './components/Navigation';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scrolling
    const lenis = () => {
      window.scrollTo({ behavior: 'smooth' });
    };
    
    // Initialize scroll animations
    gsap.fromTo('body', 
      { opacity: 0 }, 
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-x-hidden relative">
      {/* Liquid Animation Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.15)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.1)" />
            </linearGradient>
          </defs>
          <path
            className="liquid-path"
            d="M0,400 Q300,350 600,400 T1200,400 L1200,800 L0,800 Z"
            fill="url(#liquidGradient)"
          />
        </svg>
      </div>
      
      <Navigation />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Tools />
      <Contact />
    </div>
  );
}

export default App;