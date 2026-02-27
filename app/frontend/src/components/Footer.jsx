import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="pt-40 pb-20 bg-[#020617] border-t border-white/5 relative z-10">
            <div className="container mx-auto px-6 max-w-6xl text-left">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-24">
                    <div className="col-span-2 space-y-8">
                        <h5 className="text-2xl font-black text-white italic tracking-tight uppercase">EMC Global</h5>
                        <p className="text-slate-500 italic font-medium max-w-xs text-base leading-relaxed opacity-80">
                            Engineering standard production training environments for the next generation of infrastructure experts.
                        </p>
                    </div>
                    <div className="space-y-8">
                        <h5 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] italic">About Us</h5>
                        <ul className="space-y-4 text-slate-500 font-bold italic text-sm">
                            <li><Link to="/" className="hover:text-blue-400 transition-colors">Our Mission</Link></li>
                            <li><Link to="/labs" className="hover:text-blue-400 transition-colors">Education Lab</Link></li>
                            <li><Link to="/" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-8">
                        <h5 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em] italic">Quick Links</h5>
                        <ul className="space-y-4 text-slate-500 font-bold italic text-sm">
                            <li><Link to="/" className="hover:text-blue-400 transition-colors text-blue-500/80">Home</Link></li>
                            <li><Link to="/labs" className="hover:text-blue-400 transition-colors">Labs</Link></li>
                            <li><Link to="/blogs" className="hover:text-blue-400 transition-colors">Blogs</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] italic text-center md:text-left">
                        © 2026 EMC Global Education Ecosystem. All Rights Reserved.
                    </p>
                    <div className="flex gap-8 text-[10px] font-black uppercase italic tracking-widest text-slate-700">
                        <Link to="/" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
                        <Link to="/" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
