import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Network, ArrowRight, CheckCircle2, Mail, Shield, Globe, Award, BookOpen, Cpu, Zap, Calendar, Wifi, HardDrive, Layout, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { labs } from '../data/labs';
import { blogs } from '../data/blogs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function HomePage() {
    const [isVisible, setIsVisible] = useState(false);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setNewsletterEmail('');
            alert('Subscribed successfully!');
        }, 1000);
    };

    const stats = [
        { icon: <Globe className="w-6 h-6" />, value: '1,000+', label: 'Students Globally' },
        { icon: <Award className="w-6 h-6" />, value: '20+', label: 'Professional Labs' },
        { icon: <Zap className="w-6 h-6" />, value: '95%', label: 'Success Rate' },
    ];

    const repositoryCategories = [
        {
            title: 'Switching Labs',
            description: 'VLANs, Trunking, Port Security, and EtherChannel configurations.',
            icon: <Wifi className="w-6 h-6 text-blue-400" />,
            count: labs.filter(l => l.category === 'Switching').length,
            color: 'blue',
            path: '/labs/category/switching',
            categoryName: 'Switching'
        },
        {
            title: 'Routing Labs',
            description: 'Static routing, OSPF, EIGRP, and Inter-VLAN routing mastery.',
            icon: <Network className="w-6 h-6 text-cyan-400" />,
            count: labs.filter(l => l.category === 'Routing').length,
            color: 'cyan',
            path: '/labs/category/routing',
            categoryName: 'Routing'
        },
        {
            title: 'Security Labs',
            description: 'Standard & Extended ACLs, NAT, and device hardening techniques.',
            icon: <Shield className="w-6 h-6 text-purple-400" />,
            count: labs.filter(l => l.category === 'Security').length,
            color: 'purple',
            path: '/labs/category/security',
            categoryName: 'Security'
        },
        {
            title: 'IP Services Labs',
            description: 'DHCP, NTP, SNMP, and Network Management protocols.',
            icon: <HardDrive className="w-6 h-6 text-red-400" />,
            count: labs.filter(l => l.category === 'IP Services').length,
            color: 'red',
            path: '/labs/category/ip-services',
            categoryName: 'IP Services'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar />

            {/* Gradient Overlay Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-blue-950/20 via-slate-950 to-purple-950/20 pointer-events-none" />

            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-4">
                <div className="container mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
                                <span className="text-blue-400 text-sm font-medium tracking-tight italic">🚀 Premium Network Training Ecosystem</span>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-bold leading-tight tracking-tight">
                                <span className="text-white">Engineering</span>
                                <br />
                                <span className="gradient-text">
                                    Mastery
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl italic">
                                Master production-ready Cisco configurations through structured, high-fidelity practice modules.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    size="lg"
                                    onClick={() => navigate('/labs')}
                                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all px-10 h-16 rounded-2xl font-black uppercase italic tracking-widest"
                                >
                                    Explore Labs
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-blue-500 transition-all h-16 rounded-2xl font-black uppercase italic tracking-widest">
                                    View Curriculum
                                </Button>
                            </div>
                        </div>
                        <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-[3rem] blur-3xl" />
                            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-3 rounded-[3rem] backdrop-blur-xl border border-slate-700/50 shadow-2xl overflow-hidden group">
                                <img
                                    src="https://images.pexels.com/photos/5092815/pexels-photo-5092815.jpeg"
                                    alt="Network Engineering Lab"
                                    className="rounded-[2.5rem] w-full object-cover aspect-video md:aspect-auto group-hover:scale-105 transition-transform duration-700 opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CCNA Lab Repository Section */}
            <section className="relative py-32 px-4 overflow-hidden">
                <div className="container mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center space-x-2 bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-8 italic">
                            <ChevronRight className="w-3 h-3 rotate-180" />
                            <span>Hands-On Lab Repository</span>
                            <ChevronRight className="w-3 h-3" />
                        </div>
                        <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                            CCNA Lab <br />
                            <span className="gradient-text">Repository</span>
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto italic font-medium leading-relaxed">
                            Master Cisco networking with hands-on labs covering switching, routing, security, and IP services.
                            Each lab includes step-by-step instructions and real CLI configurations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {repositoryCategories.map((cat, index) => (
                            <div key={index} className="group cursor-pointer" onClick={() => navigate(cat.path)}>
                                <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-800/50 hover:border-slate-700 transition-all duration-500 p-8 h-full flex flex-col items-start text-left relative overflow-hidden rounded-[2.5rem] shadow-2xl group-hover:-translate-y-2">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl" />

                                    <div className={`p-4 rounded-2xl bg-${cat.color}-500/10 border border-${cat.color}-500/20 mb-8 group-hover:scale-110 transition-transform`}>
                                        {cat.icon}
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">
                                        {cat.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm md:text-base mb-8 italic leading-relaxed">
                                        {cat.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between w-full">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic font-mono bg-slate-950/50 px-4 py-2 rounded-xl">
                                            {cat.count} Labs Available
                                        </span>
                                        <div className="flex items-center text-blue-400 text-xs font-black uppercase tracking-widest italic group-hover:translate-x-2 transition-transform">
                                            View Labs <ChevronRight className="ml-2 w-4 h-4" />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Individual Featured Labs Section */}
            <section id="labs" className="relative py-32 px-4">
                <div className="container mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Hands-on Practice</h2>
                            <p className="text-slate-500 mt-2 italic font-medium">Select a module to begin your technical training session.</p>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/labs')}
                            className="text-blue-400 hover:text-white hover:bg-blue-600/20 px-8 h-14 rounded-2xl font-black uppercase italic tracking-widest transition-all"
                        >
                            See Full Library <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {labs.slice(0, 6).map((lab, index) => (
                            <div key={index} className="relative group">
                                <Card className="relative bg-slate-900/50 border-slate-800/50 hover:border-blue-500/50 transition-all duration-500 h-full overflow-hidden rounded-[2rem] shadow-2xl flex flex-col">
                                    <div className="h-40 bg-slate-800 relative overflow-hidden">
                                        <img src={lab.topology} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" alt={lab.title} />
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase italic backdrop-blur-md border ${lab.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                lab.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                    'bg-red-500/10 text-red-400 border-red-500/20'
                                                }`}>
                                                {lab.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                    <CardHeader className="p-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">{lab.category}</span>
                                            <span className="text-[10px] text-slate-500 font-mono">ID: {lab.id}</span>
                                        </div>
                                        <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors uppercase italic font-black">{lab.title}</CardTitle>
                                        <CardDescription className="text-sm text-slate-400 line-clamp-2 italic mt-4 leading-relaxed">{lab.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="px-8 pb-8 mt-auto pt-0">
                                        <Button
                                            className="w-full bg-slate-800 hover:bg-blue-600 text-white transition-all h-12 rounded-xl font-black uppercase italic tracking-widest text-xs"
                                            onClick={() => navigate(`/labs/${lab.id}`)}
                                        >
                                            Start Lab
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section id="blog" className="relative py-32 px-4 border-t border-slate-900">
                <div className="container mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">Technical Insights</h2>
                            <p className="text-slate-500 mt-2 italic font-medium">Deep-dives into protocols, architectural design, and career growth.</p>
                        </div>
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/blogs')}
                            className="text-purple-400 hover:text-white hover:bg-purple-600/20 px-8 h-14 rounded-2xl font-black uppercase italic tracking-widest transition-all"
                        >
                            Read All Articles <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {blogs.slice(0, 3).map((blog, index) => (
                            <div key={index} className="group flex flex-col h-full cursor-pointer" onClick={() => navigate(`/blog/${blog.id}`)}>
                                <Card className="bg-slate-900/40 border-slate-800/50 hover:border-purple-500/30 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col h-full rounded-[2rem]">
                                    <div className="h-56 bg-slate-800 relative overflow-hidden shrink-0">
                                        <img
                                            src={`https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop`}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-40"
                                        />
                                        <div className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full backdrop-blur-md">
                                            <span className="text-purple-400 text-[10px] font-black tracking-widest uppercase italic">{blog.category}</span>
                                        </div>
                                    </div>
                                    <CardHeader className="p-8 grow">
                                        <div className="flex items-center space-x-4 text-slate-500 text-[10px] mb-6 font-black uppercase tracking-widest italic">
                                            <Calendar className="w-4 h-4 text-purple-600" />
                                            <span>{blog.date}</span>
                                        </div>
                                        <CardTitle className="text-2xl text-white group-hover:text-purple-400 transition-colors mb-4 italic font-black uppercase leading-tight">
                                            {blog.title}
                                        </CardTitle>
                                        <CardDescription className="text-slate-400 italic leading-relaxed line-clamp-2 mt-auto">
                                            {blog.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="relative py-32 px-4 overflow-hidden border-t border-slate-900">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                <div className="container mx-auto max-w-4xl text-center relative z-10 bg-slate-900/30 p-12 md:p-20 rounded-[4rem] border border-slate-800/50 backdrop-blur-xl">
                    <div className="mb-8 flex justify-center">
                        <div className="p-6 bg-blue-600/10 rounded-[2rem] border border-blue-500/20 shadow-2xl shadow-blue-500/10 relative">
                            <Mail className="w-12 h-12 text-blue-400" />
                            <div className="absolute inset-0 blur-2xl bg-blue-500/30 opacity-50" />
                        </div>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black text-white mb-6 italic tracking-tighter uppercase leading-none">Engineering <span className="text-blue-500">Updates</span></h3>
                    <p className="text-lg text-slate-400 mb-12 italic font-medium max-w-xl mx-auto">Subscribe for weekly protocol deep-dives and laboratory architectural updates.</p>
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                        <Input
                            type="email"
                            placeholder="engineering@company.com"
                            className="flex-1 bg-slate-950/50 border-slate-800 text-white h-16 rounded-2xl px-8 focus:border-blue-500 transition-all font-bold italic"
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            required
                        />
                        <Button type="submit" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white h-16 px-12 rounded-2xl shadow-2xl shadow-blue-600/30 font-black uppercase italic tracking-widest active:scale-95 transition-all" disabled={loading}>
                            {loading ? 'SYNCING...' : 'Join Hub'}
                        </Button>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
}
