import React from 'react';

const Skills = () => {
  const seeds = [
    { category: "Languages", skills: ["Python", "Java", "SQL", "JavaScript"] },
    { category: "Frameworks/Libs", skills: ["TensorFlow", "PyTorch", "React", "Node.js", "Express", "FastAPI"] },
    { category: "AI/ML", skills: ["Deep Learning", "NLP", "GenAI", "RAG", "Computer Vision", "Scikit-learn"] },
    { category: "Tools", skills: ["Git", "Docker", "MongoDB", "PostgreSQL", "Jupyter"] },
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
              {seed.skills.map((skill, sIdx) => (
                <div key={sIdx} className="relative group">
                    <span className="px-3 py-1.5 bg-primary/50 text-gray-300 rounded-lg text-sm border border-white/10 group-hover:border-highlight group-hover:text-white transition-colors cursor-default block">
                        {skill}
                    </span>
                    {/* Tiny connector dot */}
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
