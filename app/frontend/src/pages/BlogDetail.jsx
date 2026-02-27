import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Network, ArrowLeft, Bookmark, Share2, Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { blogs } from '../data/blogs';
import Footer from '../components/Footer';

export default function BlogDetail() {
    const { id } = useParams();
    const blog = blogs.find(b => b.id === id);
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (blog && blog.legacyFile && (!blog.content || blog.content.length === 0)) {
            setLoading(true);
            fetch(`/content/blogs/${blog.legacyFile}`)
                .then(res => res.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const mainContent = doc.querySelector('main') || doc.body;

                    // Cleanup
                    const nav = mainContent.querySelector('nav');
                    if (nav) nav.remove();
                    const footer = mainContent.querySelector('footer');
                    if (footer) footer.remove();

                    setContent(mainContent.innerHTML);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching legacy blog:', err);
                    setLoading(false);
                });
        }
    }, [blog]);

    if (!blog) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                <Link to="/blogs">
                    <Button variant="outline">Back to Blog</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 pb-20">
            <div className="fixed inset-0 bg-gradient-to-br from-purple-950/20 via-slate-950 to-blue-950/20 pointer-events-none" />

            <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/blogs" className="flex items-center space-x-2 group">
                        <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-slate-300 group-hover:text-white transition-colors font-medium">Insights Hub</span>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <Network className="w-6 h-6 text-purple-400" />
                        <span className="font-bold gradient-text text-lg">EMC Blog</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                            <Bookmark className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="pt-40 pb-32 px-4 relative z-10 w-full">
                <article className="container mx-auto max-w-4xl text-left">
                    {/* Post Header */}
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6 italic tracking-widest uppercase">
                            <span className="text-purple-400 text-xs font-bold">{blog.category}</span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-10 leading-[1.1] tracking-tight italic">
                            {blog.title}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-8 text-slate-500 font-medium italic">
                            <div className="flex items-center bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                                <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                                {blog.date}
                            </div>
                            <div className="flex items-center bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                                <Clock className="w-4 h-4 mr-2 text-purple-400" />
                                {blog.readTime}
                            </div>
                            <div className="flex items-center bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                                <User className="w-4 h-4 mr-2 text-purple-400" />
                                Engineering Team
                            </div>
                        </div>
                    </div>

                    <div className="relative mb-20 group">
                        <div className="absolute inset-0 bg-purple-500/30 blur-[100px] opacity-20" />
                        <img
                            src="https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg"
                            alt="Article Hero"
                            className="w-full h-[500px] object-cover rounded-[3rem] border border-slate-800 relative z-10 shadow-2xl opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                        </div>
                    ) : blog.content && blog.content.length > 0 ? (
                        <div className="space-y-10">
                            {blog.content.map((item, i) => {
                                if (item.type === 'paragraph') {
                                    return (
                                        <p key={i} className="text-xl text-slate-400 leading-relaxed font-normal italic">
                                            {item.text}
                                        </p>
                                    );
                                }
                                if (item.type === 'heading') {
                                    return (
                                        <h2 key={i} className="text-4xl font-bold text-white pt-8 mb-6 flex items-center italic">
                                            <div className="w-10 h-1 bg-purple-500 rounded-full mr-5" />
                                            {item.text}
                                        </h2>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{ __html: content }}
                            className="legacy-content-wrapper prose prose-invert prose-purple max-w-none text-left italic"
                        />
                    )}

                    <div className="mt-32 p-16 rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
                        <h3 className="text-3xl font-bold text-white mb-6 relative z-10 italic">Was this helpful?</h3>
                        <p className="text-slate-400 mb-10 max-w-lg mx-auto relative z-10 text-lg italic">
                            Join 5,000+ engineers receiving our weekly deep-dives into networking protocols and production scenarios.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10">
                            <input
                                type="email"
                                placeholder="you@company.com"
                                className="flex-1 bg-slate-800/50 border border-slate-700 rounded-2xl px-8 py-4 text-white focus:outline-none focus:border-purple-500 transition-all shadow-inner italic"
                            />
                            <Button className="bg-purple-600 hover:bg-purple-500 text-white rounded-2xl px-10 shadow-2xl shadow-purple-600/30 font-bold active:scale-95 transition-transform">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
