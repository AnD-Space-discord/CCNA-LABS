import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { blogs } from '../data/blogs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function BlogsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDifficulty = selectedDifficulty === 'All' || blog.difficulty === selectedDifficulty;
        return matchesSearch && matchesDifficulty;
    });

    const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300">
            <Navbar />
            <div className="fixed inset-0 bg-gradient-to-br from-purple-950/20 via-slate-950 to-blue-950/20 pointer-events-none" />

            <main className="pt-32 pb-20 px-4 relative z-10 text-left">
                <div className="container mx-auto max-w-6xl text-left">
                    <div className="mb-16 text-center md:text-left max-w-3xl">
                        <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-slate-500 mb-4 font-bold uppercase tracking-widest">
                            <span>Hub</span>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-purple-400">Insights</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 italic tracking-tight">Technical Blog</h1>
                        <p className="text-lg md:text-xl text-slate-400 font-medium italic">Deep-dives into networking protocols, career strategies, and production scenarios.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 mb-20 items-center">
                        <div className="flex-1 relative w-full">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500" />
                            <Input
                                placeholder="Explore technical topics..."
                                className="pl-16 bg-slate-900/50 border-slate-700 h-20 rounded-[2rem] text-xl backdrop-blur-xl shadow-2xl italic text-white placeholder:text-slate-600 focus:border-purple-500 transition-all font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {difficulties.map(diff => (
                                <button
                                    key={diff}
                                    onClick={() => setSelectedDifficulty(diff)}
                                    className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest italic transition-all border ${selectedDifficulty === diff
                                        ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/20'
                                        : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:border-slate-700'
                                        }`}
                                >
                                    {diff}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Blogs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 text-left">
                        {filteredBlogs.map((blog, index) => {
                            const blogImages = {
                                'Switching': 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
                                'Routing': 'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
                                'Security': 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
                                'IP Services': 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
                            };
                            const blogImg = blogImages[blog.category] || 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
                            return (
                                <Link to={`/blog/${blog.id}`} key={index} className="group">
                                    <Card className="bg-slate-900/40 border-slate-800/50 hover:bg-slate-900/60 hover:border-purple-500/30 transition-all duration-500 h-full flex flex-col overflow-hidden shadow-xl hover:-translate-y-2">
                                        <div className="h-48 md:h-56 bg-slate-800 relative overflow-hidden shrink-0">
                                            <img
                                                src={blogImg}
                                                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 mx-auto"
                                            />
                                            <div className="absolute top-4 left-4 px-4 py-1.5 bg-purple-600/20 border border-purple-500/30 rounded-full backdrop-blur-md">
                                                <span className="text-purple-400 text-[10px] font-black uppercase tracking-widest">{blog.category}</span>
                                            </div>
                                        </div>
                                        <CardHeader className="p-8 text-left">
                                            <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-500 mb-4 font-bold uppercase tracking-widest">
                                                <span className={`px-3 py-1 rounded-lg border ${blog.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                    blog.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                        'bg-red-500/10 text-red-400 border-red-500/20'
                                                    }`}>
                                                    {blog.difficulty}
                                                </span>
                                                <span className="flex items-center"><Calendar className="w-3 h-3 mr-2 text-purple-400" />{blog.date}</span>
                                                <span className="flex items-center"><Clock className="w-3 h-3 mr-2 text-purple-400" />{blog.readTime}</span>
                                            </div>
                                            <CardTitle className="text-2xl text-white group-hover:text-purple-400 transition-colors mb-4 italic font-extrabold leading-tight">
                                                {blog.title}
                                            </CardTitle>
                                            <CardDescription className="text-sm italic leading-relaxed text-slate-400 line-clamp-3">
                                                {blog.description}
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
