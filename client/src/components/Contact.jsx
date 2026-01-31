import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // EmailJS Service
    // REPLACE THESE WITH YOUR ACTUAL KEYS FROM EMAILJS DASHBOARD
    // OR BETTER, USE ENVIRONMENT VARIABLES: import.meta.env.VITE_EMAILJS_SERVICE_ID, etc.
    const serviceID = 'service_apqnlck'; 
    const templateID = 'template_zpwbt98'; 
    const publicKey = 'dmFxGtGYT1pFaQdDj';

    emailjs.send(serviceID, templateID, form, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      }, (err) => {
        console.error('FAILED...', err);
        setStatus('error');
      });
  };

  return (
    <section id="contact" className="py-20 container mx-auto px-4">
      <div className="max-w-2xl mx-auto glass-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(157,78,221,0.2)]">
        <h2 className="text-4xl font-display font-bold text-center text-white mb-8">
          Initialize <span className="text-highlight">Handshake</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-space text-gray-400">Identity Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={form.name} 
                        onChange={handleChange}
                        required
                        className="w-full bg-primary/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary transition-colors"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-space text-gray-400">Communication Node (Email)</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={form.email} 
                        onChange={handleChange}
                        required
                        className="w-full bg-primary/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary transition-colors"
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-space text-gray-400">Data Packet (Message)</label>
                <textarea 
                    name="message" 
                    value={form.message} 
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full bg-primary/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary transition-colors"
                    placeholder="Project collaboration inquiry..."
                ></textarea>
            </div>

            <button 
                type="submit" 
                disabled={status === 'sending'}
                className={`w-full py-4 rounded-lg font-bold text-white text-lg transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2 ${status === 'sending' ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-secondary to-accent hover:shadow-[0_0_20px_rgba(255,0,128,0.5)]'}`}
            >
                <span>{status === 'sending' ? 'TRANSMITTING...' : status === 'success' ? 'SIGNAL RECEIVED' : status === 'error' ? 'TRANSMISSION FAILED' : 'TRANSMIT SIGNAL'}</span>
                {status === 'idle' && <FaPaperPlane />}
            </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
