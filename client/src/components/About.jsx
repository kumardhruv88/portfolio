import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 flex flex-col md:flex-row items-center justify-center gap-10 container mx-auto px-4">
      {/* Left: Avatar / 3D Element */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/3 flex justify-center"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-secondary/50 shadow-[0_0_50px_rgba(255,0,128,0.3)] overflow-hidden glass-card flex items-center justify-center">
            {/* Placeholder for 3D Avatar */}
            <div className="text-6xl text-white font-display">DK</div>
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-highlight/20 animate-spin-slow"></div>
        </div>
      </motion.div>

      {/* Right: Bio */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 space-y-6 text-left"
      >
        <h2 className="text-4xl font-display font-bold text-white mb-6">
          <span className="border-b-4 border-secondary">Bio_</span>Node
        </h2>
        
        <p className="text-gray-300 text-lg leading-relaxed">
          A passionate <strong className="text-highlight">AI/ML Engineer</strong> specializing in Deep Learning, NLP, and Generative AI. 
          Winner of Smart India Hackathon 2025, I build intelligent systems that solve real-world problems.
        </p>

        <p className="text-gray-300 text-lg leading-relaxed">
            Currently pursuing B.Tech in CS at NSUT Delhi, combining academic excellence with hands-on experience in cutting-edge ML technologies.
        </p>

        {/* Interactive Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {[
                { label: 'AI/ML Development', color: 'bg-secondary' },
                { label: 'Deep Learning', color: 'bg-accent' },
                { label: 'GenAI & LLMs', color: 'bg-highlight' },
                { label: 'Data Science', color: 'bg-green-500' },
            ].map((skill, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/20 transition-all hover:translate-x-2 cursor-default">
                    <span className={`w-3 h-3 rounded-full ${skill.color} shadow-[0_0_10px_currentColor]`}></span>
                    <span className="font-space text-sm">{skill.label}</span>
                </div>
            ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
