import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Share2, Youtube, ExternalLink, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import Navbar from '../components/Navbar';

export default function VlogsPage() {
    const vlogs = [
        {
            id: 'ccna-intro',
            title: 'Getting Started with CCNA 200-301',
            description: 'Everything you need to know about the new CCNA exam, syllabus, and study plan.',
            duration: '15:20',
            thumbnail: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg',
            youtubeUrl: '#'
        },
        {
            id: 'packet-tracer-tips',
            title: 'Packet Tracer Pro Tips',
            description: 'Speed up your configuration and troubleshooting with these hidden Packet Tracer features.',
            duration: '12:45',
            thumbnail: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
            youtubeUrl: '#'
        },
        {
            id: 'real-world-routing',
            title: 'Real World Routing Scenarios',
            description: 'Watch how we handle complex routing issues in a live production environment.',
            duration: '22:10',
            thumbnail: 'https://images.pexels.com/photos/4439425/pexels-photo-4439425.jpeg',
            youtubeUrl: '#'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300">
            <Navbar />
            <div className="fixed inset-0 bg-gradient-to-br from-red-950/10 via-slate-950 to-blue-950/10 pointer-events-none" />

            <main className="pt-32 pb-20 px-4 relative z-10">
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-16 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-slate-500 mb-4 font-bold uppercase tracking-widest text-left">
                            <span>Hub</span>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-red-500">Video</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 italic tracking-tight text-left">Video Library</h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl italic text-left">Visual walkthroughs, career insight, and hardware deep-dives.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {vlogs.map((vlog, index) => (
                            <Card key={index} className="bg-slate-900/40 border-slate-800/50 overflow-hidden group hover:border-red-500/30 transition-all duration-700 shadow-2xl hover:-translate-y-2">
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={vlog.thumbnail}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60 group-hover:opacity-80"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.5)] transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                            <Play className="w-8 h-8 text-white fill-current translate-x-1" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-6 right-6 bg-slate-950/90 px-3 py-1.5 rounded-xl text-[10px] font-black text-white backdrop-blur-md border border-slate-800 tracking-widest">
                                        {vlog.duration}
                                    </div>
                                </div>
                                <CardHeader className="p-8 text-left">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                            <Clock className="w-4 h-4 mr-2 text-red-500" />
                                            Updated Monday
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full bg-slate-800/50 hover:bg-slate-700"><Share2 className="w-4 h-4" /></Button>
                                    </div>
                                    <CardTitle className="text-2xl md:text-3xl text-white group-hover:text-red-500 transition-colors mb-4 italic font-black leading-tight uppercase">
                                        {vlog.title}
                                    </CardTitle>
                                    <CardDescription className="text-slate-400 text-sm md:text-base italic leading-relaxed line-clamp-2">
                                        {vlog.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-8 pb-8 pt-0">
                                    <Button className="w-full bg-slate-800 hover:bg-red-600 text-white transition-all h-14 rounded-2xl font-black uppercase tracking-widest italic shadow-xl shadow-black/20">
                                        Play Lesson
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="mt-20 py-16 border-t border-slate-900 text-center">
                <p className="text-slate-500 text-sm italic font-medium tracking-widest">© 2026 EMC GLOBAL MEDIA HUB</p>
            </footer>
        </div>
    );
}
