import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaRocket } from 'react-icons/fa';
import axios from 'axios';

// Fallback data if API fails or DB is empty
const fallbackProjects = [
  {
    title: "House Price Prediction",
    description: "End-to-end regression model with 86.29% accuracy using Stacked Ensemble (XGBoost + Random Forest).",
    techStack: ["Python", "Scikit-learn", "XGBoost"],
    stats: "R² = 0.8629",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "RAG-Based AI Chatbot",
    description: "Production chatbot with web search, document processing, and persistent memory using LangChain & FAISS.",
    techStack: ["FastAPI", "LangChain", "Groq", "PostgreSQL"],
    stats: "Avg response: 2.3s",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "ARTISIO E-Commerce",
    description: "Full-stack MERN platform for artisans with AI subscription curation and Stripe payments.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe"],
    stats: "Lighthouse 95+",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "CinematiQ Recommender",
    description: "Hybrid movie recommender combining collaborative filtering (SVD) and content-based analysis.",
    techStack: ["Python", "Flask", "React", "Transformers"],
    stats: "NDCG@10: 0.85",
    color: "from-green-500 to-emerald-500",
  },
];

const ProjectCard = ({ project, index }) => {
    // Determine color randomly if not set, or map from index
    const colors = [
        "from-blue-500 to-cyan-500",
        "from-purple-500 to-pink-500",
        "from-orange-500 to-red-500",
        "from-green-500 to-emerald-500"
    ];
    const colorClass = project.color || colors[index % colors.length];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative glass-card p-0 rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full border border-white/5"
        >
            {/* Image Section (Top Half) */}
            {project.image && (
                <div className="relative h-32 w-full overflow-hidden">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    {/* Subtle Overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>
            )}

            {/* Content Section (Bottom Half) */}
            <div className="p-4 flex flex-col flex-grow relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-highlight transition-colors leading-tight">{project.title}</h3>
                </div>

                <p className="text-gray-300 mb-4 text-sm leading-relaxed flex-grow line-clamp-3">{project.description}</p>

                {project.stats && (
                    <div className="mb-3">
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">Performance: {project.stats}</span>
                    </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack?.slice(0, 3).map((t, i) => (
                        <span key={i} className="px-2 py-1 bg-white/5 text-xs text-gray-400 rounded border border-white/5">
                            {t}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    {project.demoLink && project.demoLink !== '#' ? (
                        <a 
                            href={project.demoLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-bold text-white hover:text-secondary transition-all flex items-center gap-2 group-hover:translate-x-1 duration-300"
                        >
                            Live <span>→</span>
                        </a>
                    ) : (
                        <span></span>
                    )}
                    
                    {project.repoLink && project.repoLink !== '#' && (
                        <a 
                            href={project.repoLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white hover:text-secondary transition-colors"
                        >
                            <FaGithub size={20} />
                        </a>
                    )}
                </div>
            </div>
            
            {/* Hover Glow (Optional - kept subtle) */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${colorClass} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 pointer-events-none`}></div>
        </motion.div>
    )
}

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        if (res.data && res.data.length > 0) {
            setProjects(res.data);
        } else {
            setProjects(fallbackProjects);
        }
      } catch (error) {
        console.warn("Failed to fetch projects, using fallback data.");
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 container mx-auto px-4">
       <h2 className="text-4xl font-display font-bold text-center text-white mb-4">
        Project <span className="text-highlight">Matrix</span>
      </h2>
      <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
        A collection of deployed neural networks, full-stack applications, and research implementations.
      </p>

      {loading ? (
        <div className="text-center text-secondary">Initializing Neural Pathways...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
            ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
