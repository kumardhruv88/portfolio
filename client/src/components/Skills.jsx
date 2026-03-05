import React from 'react';
import { 
  FaPython, FaJava, FaDatabase, FaReact, FaNodeJs, FaBrain, 
  FaLanguage, FaRobot, FaServer, FaEye, FaGitAlt, FaDocker 
} from 'react-icons/fa';
import { 
  SiJavascript, SiTensorflow, SiPytorch, SiExpress, SiFastapi, 
  SiScikitlearn, SiMongodb, SiPostgresql, SiJupyter 
} from 'react-icons/si';

const Skills = () => {
  const seeds = [
    { 
      category: "Languages", 
      skills: [
        { name: "Python", icon: FaPython, color: "text-blue-400" },
        { name: "Java", icon: FaJava, color: "text-red-500" },
        { name: "SQL", icon: FaDatabase, color: "text-gray-300" },
        { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" }
      ] 
    },
    { 
      category: "Frameworks/Libs", 
      skills: [
        { name: "TensorFlow", icon: SiTensorflow, color: "text-orange-500" },
        { name: "PyTorch", icon: SiPytorch, color: "text-orange-600" },
        { name: "React", icon: FaReact, color: "text-blue-500" },
        { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
        { name: "Express", icon: SiExpress, color: "text-gray-300" },
        { name: "FastAPI", icon: SiFastapi, color: "text-teal-500" }
      ] 
    },
    { 
      category: "AI/ML", 
      skills: [
        { name: "Deep Learning", icon: FaBrain, color: "text-pink-400" },
        { name: "NLP", icon: FaLanguage, color: "text-indigo-400" },
        { name: "GenAI", icon: FaRobot, color: "text-purple-400" },
        { name: "RAG", icon: FaServer, color: "text-cyan-400" },
        { name: "Computer Vision", icon: FaEye, color: "text-lime-400" },
        { name: "Scikit-learn", icon: SiScikitlearn, color: "text-yellow-500" }
      ] 
    },
    { 
      category: "Tools", 
      skills: [
        { name: "Git", icon: FaGitAlt, color: "text-red-500" },
        { name: "Docker", icon: FaDocker, color: "text-blue-500" },
        { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
        { name: "Jupyter", icon: SiJupyter, color: "text-orange-400" }
      ] 
    },
  ];

  return (
    <section id="skills" className="py-20 container mx-auto px-4">
      <h2 className="text-4xl font-display font-bold text-center text-white mb-16">
        Neural <span className="text-secondary">Competencies</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {seeds.map((seed, idx) => (
          <div key={idx} className="glass-card p-6 rounded-2xl border-t-2 border-secondary/50 hover:bg-white/5 transition-all">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2">{seed.category}</h3>
            <div className="flex flex-wrap gap-3">
              {seed.skills.map((skill, sIdx) => {
                const Icon = skill.icon;
                return (
                  <div key={sIdx} className="relative group">
                      <span className="flex items-center space-x-2 px-3 py-1.5 bg-primary/50 text-gray-300 rounded-lg text-sm border border-white/10 group-hover:border-highlight group-hover:text-white transition-colors cursor-default">
                          <Icon className={`text-base ${skill.color}`} />
                          <span>{skill.name}</span>
                      </span>
                      {/* Tiny connector dot */}
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
