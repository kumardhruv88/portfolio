import React from 'react';
import { motion } from 'framer-motion';

const Education = () => {
    const courses = [
        "Data Structures & Algorithms", "Machine Learning", "Deep Learning", "OOP", "DBMS", "Linear Algebra"
    ];

  return (
    <section id="education" className="py-20 container mx-auto px-4 relative">
        <div className="absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-secondary to-transparent -translate-x-1/2 opacity-30 hidden md:block"></div>

      <h2 className="text-4xl font-display font-bold text-center text-white mb-16 relative z-10">
        Academic <span className="text-highlight">Pathways</span>
      </h2>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border-l-4 border-secondary relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-9xl font-display font-bold text-white">2027</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">B.Tech in Computer Science Engineering</h3>
            <p className="text-highlight font-space text-lg mb-4">Netaji Subhas University of Technology (NSUT), New Delhi</p>
            <div className="flex justify-between items-center text-gray-400 text-sm mb-6">
                <span>2023 – 2027</span>
                <span>CGPA: 7.05/10</span>
            </div>

            <div>
                <h4 className="text-secondary font-bold mb-3 uppercase tracking-wider text-sm">Vital Knowledge Nodes</h4>
                <div className="flex flex-wrap gap-2">
                    {courses.map((course, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 rounded-md text-xs border border-white/10 hover:border-secondary/50 transition-colors">
                            {course}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
