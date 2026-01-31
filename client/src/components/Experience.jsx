import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaRocket } from 'react-icons/fa';

const Experience = () => {
  return (
    <section id="experience" className="py-20 container mx-auto px-4">
      <h2 className="text-4xl font-display font-bold text-center text-white mb-16">
        Neural <span className="text-secondary">Chronicles</span>
      </h2>

      <div className="relative max-w-4xl mx-auto border-l-2 border-white/10 ml-4 md:ml-auto">
        {/* Experience 1 */}
        <div className="mb-16 relative pl-8 md:pl-12">
            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-secondary shadow-[0_0_10px_#ff0080]"></span>
            
            <div className="max-w-sm">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative glass-card p-0 rounded-2xl border border-white/5 hover:border-secondary/30 transition-all overflow-hidden"
            >
                {/* Image Section (Top Half) */}
                <div className="relative h-32 w-full overflow-hidden">
                    <img 
                        src="/projects/bharatverse.png" 
                        alt="BharatVerse" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    {/* Subtle Overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>

                {/* Content Section (Bottom Half) */}
                <div className="p-4 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">Winner - Smart India Hackathon 2025</h3>
                        <span className="text-secondary font-mono text-xs">Dec 2024 – Jan 2025</span>
                    </div>
                    <h4 className="text-highlight font-space text-sm mb-3">AI/ML Developer — BharatVerse Project</h4>
                    
                    <p className="text-gray-400 mb-3 text-sm italic">
                        Built AI storytelling system for Indian mythological narratives in multiple native languages.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <h5 className="text-white font-bold text-sm uppercase tracking-wide mb-2">Technical Implementation</h5>
                            <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                                <li>Multimodal AI Pipeline with Semantic Search (Transformer embeddings)</li>
                                <li>Narrative Generation using Qwen LLM & FAISS Vector DB</li>
                                <li>Multilingual TTS (5 languages) reducing latency from 30s to 5-7s</li>
                                <li>Achieved 95%+ cultural accuracy via fine-tuning</li>
                            </ul>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {['Python', 'Transformers', 'Qwen', 'FAISS', 'LangChain', 'FastAPI'].map((tech) => (
                                <span key={tech} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300 border border-white/5">{tech}</span>
                            ))}
                        </div>

                         {/* Links */}
                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                            <a 
                                href="https://bharatverse-topaz.vercel.app/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm font-bold text-white hover:text-secondary transition-all flex items-center gap-2 group-hover:translate-x-1 duration-300"
                            >
                                Live <span>→</span>
                            </a>
                            
                            <a 
                                href="https://github.com/kumardhruv88/BharatVerse" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white hover:text-secondary transition-colors"
                            >
                                <FaGithub size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
            </div>
        </div>

        {/* Experience 2 */}
        <div className="mb-16 relative pl-8 md:pl-12">
            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent shadow-[0_0_10px_#9d4edd]"></span>
            
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl border border-white/5 hover:border-accent/30 transition-all"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">Independent AI/ML Developer</h3>
                    <span className="text-accent font-mono text-sm">Sep 2024 – Present</span>
                </div>
                
                <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
                    <li>developing and deploying production-grade AI applications</li>
                    <li>Researching LLMs, RAG architectures, and multimodal AI</li>
                    <li>Contributing to open-source and writing technical blogs (50+ posts)</li>
                </ul>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
