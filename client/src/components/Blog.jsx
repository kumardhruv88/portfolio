import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendar, FaClock } from 'react-icons/fa';
import axios from 'axios';

const Blog = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/blog');
                setPosts(res.data);
            } catch (error) {
                console.error("Failed to fetch blog posts", error);
                // Fallback would go here if needed, but we rely on backend now
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <section id="blog" className="py-20 container mx-auto px-4 relative">
            <h2 className="text-4xl font-display font-bold text-center text-white mb-16">
                Neural <span className="text-highlight">Logs</span>
            </h2>

            {loading ? (
                <div className="text-center text-white">Loading Thoughts...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.article 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card rounded-2xl overflow-hidden group hover:shadow-[0_0_30px_rgba(255,0,128,0.2)] transition-all duration-300 border border-white/5 hover:border-white/20 flex flex-col h-full"
                        >
                            {/* Image Placeholder */}
                            <div className={`h-48 w-full bg-gradient-to-br ${post.imageGradient} relative overflow-hidden flex-shrink-0`}>
                                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors"></div>
                                {/* Neural Pattern Overlay */}
                                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                                
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur text-xs px-3 py-1 rounded-full text-white border border-white/10 flex items-center gap-1">
                                    <FaClock className="text-secondary" /> {post.readTime}
                                </div>
                            </div>

                            <div className="p-6 space-y-4 flex flex-col flex-grow">
                                <div className="flex gap-2 flex-wrap">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="text-xs font-mono text-secondary px-2 py-0.5 bg-secondary/10 rounded border border-secondary/20">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold font-display text-white group-hover:text-highlight transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                    <span className="text-xs text-gray-500 flex items-center gap-1"><FaCalendar /> {post.date}</span>
                                    <button 
                                        onClick={() => setSelectedPost(post)}
                                        className="text-sm font-bold text-white hover:text-secondary transition-colors flex items-center gap-1 group-hover:gap-2 duration-300"
                                    >
                                        Read Node <span>→</span>
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            )}
            
            <div className="text-center mt-12">
                <button className="px-8 py-3 bg-white/5 hover:bg-white/10 backdrop-blur border border-white/10 rounded-full text-white font-bold transition-all hover:scale-105">
                    View All Logs
                </button>
            </div>

            {/* Modal for Reading Post */}
            <AnimatePresence>
                {selectedPost && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedPost(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#0a0e27] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header Image */}
                            <div className={`h-64 w-full bg-gradient-to-br ${selectedPost.imageGradient} relative`}>
                                <button 
                                    onClick={() => setSelectedPost(null)}
                                    className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors z-10"
                                >
                                    <FaTimes size={20} />
                                </button>
                                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#0a0e27] to-transparent">
                                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 leading-tight">
                                        {selectedPost.title}
                                    </h2>
                                    <div className="flex items-center gap-4 text-sm text-gray-300">
                                        <span className="flex items-center gap-1"><FaCalendar /> {selectedPost.date}</span>
                                        <span className="flex items-center gap-1"><FaClock /> {selectedPost.readTime}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-12">
                                <div 
                                    className="prose prose-invert prose-lg max-w-none text-gray-300"
                                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                                ></div>
                                
                                <div className="mt-12 pt-8 border-t border-white/10">
                                    <h4 className="text-white font-bold mb-4">Tags:</h4>
                                    <div className="flex gap-2 flex-wrap">
                                        {selectedPost.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-sm text-secondary border border-white/10">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Blog;
