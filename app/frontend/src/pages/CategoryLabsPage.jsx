import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import {
    ArrowLeft,
    Clock,
    ChevronRight,
    Search
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { labs } from '../data/labs';

const CategoryLabsPage = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedDifficulty, setSelectedDifficulty] = React.useState('All');

    // Map URL friendly category names to data category names
    const categoryMap = {
        'switching': {
            title: 'Switching',
            description: 'Master VLAN configuration, trunking, and switch security fundamentals.',
            color: 'text-blue-500'
        },
        'routing': {
            title: 'Routing',
            description: 'Static routing, OSPF, EIGRP, and Inter-VLAN routing mastery.',
            color: 'text-cyan-500'
        },
        'security': {
            title: 'Security',
            description: 'Standard & Extended ACLs, NAT, and device hardening techniques.',
            color: 'text-purple-500'
        },
        'ip-services': {
            title: 'IP Services',
            description: 'DHCP, NTP, SNMP, and Network Management protocols.',
            color: 'text-orange-500'
        }
    };

    const currentCategory = categoryMap[category] || {
        title: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
        description: 'Technical lab repository for ' + category,
        color: 'text-blue-500'
    };

    const filteredLabs = labs.filter(lab => {
        const matchesCategory = lab.category.toLowerCase().replace(' ', '-') === category.toLowerCase();
        const matchesSearch = lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lab.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDifficulty = selectedDifficulty === 'All' || lab.difficulty === selectedDifficulty;
        return matchesCategory && matchesSearch && matchesDifficulty;
    });

    const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

    return (
        <div className="min-h-screen bg-slate-950">
            <Navbar />

            {/* Background Elements */}
            <div className="fixed inset-0 bg-gradient-to-br from-blue-950/20 via-slate-950 to-cyan-950/20 pointer-events-none" />
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Content */}
            <section className="relative pt-40 pb-20 px-4">
                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="mb-12 flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="text-left">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-none">
                                {currentCategory.title} <br />
                                <span className={currentCategory.color}>Labs</span>
                            </h1>
                            <p className="text-lg text-slate-400 italic font-medium max-w-xl">
                                {currentCategory.description}
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search labs..."
                                    className="pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all font-medium italic"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => navigate('/labs')}
                                className="border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 h-10 px-6 rounded-xl text-xs font-black uppercase italic tracking-widest flex items-center bg-slate-900/40"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Labs
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-12 justify-start">
                        {difficulties.map(diff => (
                            <button
                                key={diff}
                                onClick={() => setSelectedDifficulty(diff)}
                                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest italic transition-all border ${selectedDifficulty === diff
                                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20'
                                    : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:border-slate-700'
                                    }`}
                            >
                                {diff}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {filteredLabs.length > 0 ? (
                            filteredLabs.map((lab, index) => (
                                <Link
                                    to={`/labs/${lab.id}`}
                                    className="block relative group no-underline"
                                >
                                    <Card
                                        className="relative bg-slate-900/30 backdrop-blur-xl border-slate-800/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-[1.5rem] overflow-hidden shadow-2xl"
                                    >
                                        <CardHeader className="p-8">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                <div className="flex-1 space-y-4">
                                                    <div className="flex items-center space-x-4">
                                                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black tracking-widest uppercase italic backdrop-blur-md border ${lab.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                            lab.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                                'bg-red-500/10 text-red-400 border-red-500/20'
                                                            }`}>
                                                            {lab.difficulty}
                                                        </span>
                                                        <span className="flex items-center text-slate-500 text-[10px] font-black uppercase tracking-widest italic">
                                                            <Clock className="w-3.5 h-3.5 mr-2 text-blue-500" />
                                                            {lab.duration}
                                                        </span>
                                                    </div>
                                                    <CardTitle className="text-2xl text-white font-bold tracking-tight group-hover:text-blue-400 transition-colors">
                                                        Lab: {lab.title}
                                                    </CardTitle>
                                                    <CardDescription className="text-slate-400 text-base italic font-medium leading-relaxed">
                                                        {lab.description}
                                                    </CardDescription>
                                                    <div className="flex flex-wrap gap-2 pt-2">
                                                        {lab.objectives && lab.objectives.map((topic, idx) => (
                                                            <span key={idx} className="px-3 py-1 bg-slate-950/50 border border-slate-800/80 rounded-lg text-[9px] font-bold text-slate-500 uppercase tracking-widest italic">
                                                                {topic}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-600 border border-blue-500 shadow-lg shadow-blue-600/30 transition-all group-hover:scale-110 group-hover:translate-x-1 shrink-0">
                                                    <ChevronRight className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-slate-900/20 rounded-[2rem] border border-dashed border-slate-800">
                                <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                                <p className="text-slate-500 italic font-medium">No labs found in this category yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CategoryLabsPage;
