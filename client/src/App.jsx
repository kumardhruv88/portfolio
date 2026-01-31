import React from 'react';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Blog from './components/Blog';
import Contact from './components/Contact';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode, SiKaggle } from 'react-icons/si';

function App() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden selection:bg-secondary selection:text-white">
      <ThreeBackground />
      <Navbar />
      
      {/* HERO SECTION */}
      <header id="home" className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="space-y-6 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight">
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">DHRUV</span> 
            <span className="text-transparent bg-clip-text bg-neural-gradient animate-pulse block md:inline md:ml-4">KUMAR</span>
          </h1>
          
          <div className="h-px w-32 bg-secondary mx-auto my-6 shadow-[0_0_10px_#ff0080]"></div>

          <h2 className="text-xl md:text-2xl font-space text-gray-300 tracking-wider">
            AI/ML ENGINEER | DEEP LEARNING SPECIALIST | GENAI DEVELOPER
          </h2>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
             <a href="#projects" className="px-8 py-3 bg-secondary hover:bg-pink-600 rounded-full font-bold transition-all shadow-lg hover:shadow-pink-500/50 hover:-translate-y-1 inline-block">
               Explore Projects
             </a>
             <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full font-bold transition-all hover:-translate-y-1 inline-block cursor-pointer">
               View Resume
             </a>
          </div>

          <div className="flex justify-center space-x-8 pt-12 text-3xl text-gray-400">
            <a href="https://github.com/kumardhruv88" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all filter hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/dhruv-kumar-64752327a" target="_blank" rel="noopener noreferrer" className="hover:text-[#0077b5] hover:scale-110 transition-all filter hover:drop-shadow-[0_0_8px_rgba(0,119,181,0.5)]"><FaLinkedin /></a>
            <a href="https://leetcode.com/dhruv_0808" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFA116] hover:scale-110 transition-all filter hover:drop-shadow-[0_0_8px_rgba(255,161,22,0.5)]"><SiLeetcode /></a>
            <a href="https://www.kaggle.com/dhruvkumar11" target="_blank" rel="noopener noreferrer" className="hover:text-[#20BEFF] hover:scale-110 transition-all filter hover:drop-shadow-[0_0_8px_rgba(32,190,255,0.5)]"><SiKaggle /></a>
            <a href="mailto:dhruvkumar@example.com" className="hover:text-red-500 hover:scale-110 transition-all filter hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"><FaEnvelope /></a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
            </div>
        </div>
      </header>

      <main className="relative z-10 space-y-0 pb-20">
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </main>

      <footer className="py-8 text-center text-gray-500 text-sm glass-card border-t border-white/10 mt-20">
        <p>© 2026 Dhruv Kumar. Neural Portfolio. All systems nominal.</p>
      </footer>
    </div>
  );
}

export default App;
