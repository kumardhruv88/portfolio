import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalendar, FaClock } from 'react-icons/fa';
import axios from 'axios';

const fallbackPosts = [
    {
        "id": 1,
        "slug": "supervised-fine-tuning",
        "title": "Supervised Fine-Tuning: Transforming Base Models",
        "excerpt": "Yesterday I learned about Supervised Fine Tuning (SFT) and how it adapts pre-trained base models like LLaMA into instruction-following assistants. It bridges the gap between raw text prediction and helpful interaction.",
        "content": "<p class=\"mb-4\">Base Large Language Models (LLMs) like LLaMA or GPT-4-base are powerful next-token predictors, but they aren't naturally helpful assistants. They might complete a question with another question rather than answering it. This is where <strong>Supervised Fine-Tuning (SFT)</strong> comes in.</p><h3 class=\"text-xl font-bold text-white mb-2 mt-6\">What is SFT?</h3><p class=\"mb-4\">SFT is the process of training a pre-trained base model on a smaller, high-quality dataset of instruction-response pairs. If pre-training teaches the model \"English\" and \"World Knowledge,\" SFT teaches it \"How to behave.\"</p><h3 class=\"text-xl font-bold text-white mb-2 mt-6\">The Process</h3><ul class=\"list-disc list-inside space-y-2 mb-4 ml-4\"><li><strong>Dataset Collection:</strong> Curating thousands of high-quality (Prompt, Completion) pairs.</li><li><strong>Training:</strong> Updating the model weights to maximize the likelihood of the completion given the prompt.</li><li><strong>Loss Function:</strong> Standard Cross-Entropy Loss is used, masked so we only calculate loss on the response tokens, not the prompt.</li></ul><h3 class=\"text-xl font-bold text-white mb-2 mt-6\">Why it Matters</h3><p>Without SFT, models are just autocomplete engines. With SFT, they become chatbots, code assistants, and reasoning engines. Yesterday's experiment involved fine-tuning a LLaMA-3-8B model on the Alpaca dataset using LoRA (Low-Rank Adaptation), which reduced memory usage by 70% while retaining 95% of performance.</p>",
        "date": "Jan 30, 2026",
        "readTime": "5 min read",
        "tags": ["LLMs", "Fine-Tuning", "SFT"],
        "imageGradient": "from-pink-500 to-rose-500",
        "status": "published"
    },
    {
        "id": 2,
        "slug": "deconstructing-upi",
        "title": "Deconstructing UPI: A System Design Deep Dive",
        "excerpt": "Exploring the architectural brilliance behind India's Unified Payments Interface. From NPCI's switch to PSPs and banking layers, understanding how real-time scalable payments work at a billion-scale.",
        "content": "<p class=\"mb-4\">India's <strong>Unified Payments Interface (UPI)</strong> is a marvel of modern fintech engineering, processing over 10 billion transactions monthly. But how does it handle this scale with near-zero latency?</p><h3 class=\"text-xl font-bold text-white mb-2 mt-6\">Key Components</h3><ul class=\"list-disc list-inside space-y-2 mb-4 ml-4\"><li><strong>NPCI Switch:</strong> The central router that connects all banks. It ensures the request goes from Payer PSP to Payee PSP.</li><li><strong>PSP (Payment Service Provider):</strong> Apps like GPay or PhonePe that provide the frontend interface.</li><li><strong>Banking Core (CBS):</strong> The actual bank ledgers where money is debited and credited.</li></ul><h3 class=\"text-xl font-bold text-white mb-2 mt-6\">The Atomic Transaction Flow</h3><ol class=\"list-decimal list-inside space-y-2 mb-4 ml-4\"><li>User initiates pay request via PSP A.</li><li>PSP A sends request to NPCI Switch.</li><li>NPCI resolves the VPA (Virtual Payment Address) to bank details.</li><li>NPCI pings the Sender's Bank for debit authentication (MPIN).</li><li>Upon success, NPCI signals Receiver's Bank to credit.</li><li>Confirmation flows back: Bank -> NPCI -> PSP -> User.</li></ol><p>All this happens in under 3 seconds. The use of asynchronous messaging queues and highly optimized database locks ensures consistency even during peak loads.</p>",
        "date": "Jan 28, 2026",
        "readTime": "8 min read",
        "tags": ["System Design", "FinTech", "Scalability"],
        "imageGradient": "from-blue-500 to-indigo-500",
        "status": "published"
    },
    {
        "id": 3,
        "slug": "why-llms-hallucinate",
        "title": "Why Do LLMs Hallucinate? The Probability Trap",
        "excerpt": "Hallucinations aren't bugs; they are features of probabilistic token generation. We look at why models confidently invent facts and mitigation strategies like RAG and grounding.",
        "content": "<p class=\"mb-4\">Ask an LLM about a made-up historical event, and it might write a convincing essay about it. This is called <strong>Hallucination</strong>.</p><h3 class=\"text-xl font-bold text-white mb-2 mt-6\">The Root Cause: Next-Token Prediction</h3><p class=\"mb-4\">LLMs don't \"know\" facts. They calculate the probability of the next word. If the most probable continuation of a sentence is a lie (because it sounds plausible based on training data patterns), the model will generate it.</p><h3 class=\"text-xl font-bold text-white mb-2 mt-6\">Temperature & Sampling</h3><p class=\"mb-4\">We use parameters like <code>Temperature</code> to control creativity. High temperature adds randomness, increasing the chance of hallucination. Low temperature makes the model deterministic but repetitive.</p><h3 class=\"text-xl font-bold text-white mb-2 mt-6\">Mitigation Strategies</h3><ul class=\"list-disc list-inside space-y-2 mb-4 ml-4\"><li><strong>RAG (Retrieval-Augmented Generation):</strong> Providing the model with factual context (documents) before it answers.</li><li><strong>Chain of Thought (CoT):</strong> Asking the model to \"think step-by-step\" reduces logic errors.</li><li><strong>Grounding:</strong> Forcing the model to cite sources.</li></ul><p>Understanding hallucinations is key to building reliable AI agents in production.</p>",
        "date": "Jan 25, 2026",
        "readTime": "6 min read",
        "tags": ["GenAI", "Research", "LLMs"],
        "imageGradient": "from-purple-500 to-violet-500",
        "status": "published"
    }
];

const Blog = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('/api/blog');
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setPosts(res.data);
                } else {
                    setPosts(fallbackPosts);
                }
            } catch (error) {
                console.error("Failed to fetch blog posts", error);
                setPosts(fallbackPosts);
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
