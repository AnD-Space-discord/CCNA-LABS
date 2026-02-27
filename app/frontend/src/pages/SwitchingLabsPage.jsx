import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import {
    Network,
    ArrowLeft,
    Clock,
    ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';

const SwitchingLabsPage = () => {
    const navigate = useNavigate();

    const switchingLabs = [
        {
            id: 'accessing-switch-router',
            title: 'Lab: Accessing Switch and Router',
            description: 'Learn CLI modes and fundamental switch access settings.',
            difficulty: 'Beginner',
            duration: '30 mins',
            topics: ['CLI Navigation', 'Basic Commands', 'Configuration Modes']
        },
        {
            id: 'vlan-configuration',
            title: 'Lab: VLAN Configuration',
            description: 'Create VLANs, assign ports, and manage broadcast domains.',
            difficulty: 'Beginner',
            duration: '45 mins',
            topics: ['VLAN Creation', 'Port Assignment', 'VLAN Verification']
        },
        {
            id: 'trunking-configuration',
            title: 'Lab: Trunking Configuration',
            description: 'Configure 802.1Q trunking to carry multiple VLANs.',
            difficulty: 'Intermediate',
            duration: '1 hour',
            topics: ['802.1Q', 'Trunk Ports', 'Native VLAN']
        },
        {
            id: 'intervlan-routing',
            title: 'Lab: Inter-VLAN Routing',
            description: 'Configure Router-on-a-Stick for communication between VLANs.',
            difficulty: 'Intermediate',
            duration: '1 hour',
            topics: ['Router-on-a-Stick', 'Subinterfaces', 'VLAN Communication']
        },
        {
            id: 'port-security',
            title: 'Lab: Port Security',
            description: 'Secure switch ports by limiting MAC addresses.',
            difficulty: 'Intermediate',
            duration: '45 mins',
            topics: ['MAC Filtering', 'Security Violations', 'Port Shutdown']
        }
    ];

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
                    <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="text-left">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-none">
                                Switching <br />
                                <span className="text-blue-500">Labs</span>
                            </h1>
                            <p className="text-lg text-slate-400 italic font-medium max-w-xl">
                                Master VLAN configuration, trunking, and switch security fundamentals.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => navigate('/labs')}
                            className="border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 h-10 px-6 rounded-xl text-xs font-black uppercase italic tracking-widest flex items-center bg-slate-900/40"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {switchingLabs.map((lab, index) => (
                            <div key={index} className="relative group">
                                <Card
                                    className="relative bg-slate-900/30 backdrop-blur-xl border-slate-800/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-[1.5rem] overflow-hidden shadow-2xl"
                                    onClick={() => navigate(`/labs/switching/${lab.id}`)}
                                >
                                    <CardHeader className="p-8">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-center space-x-4">
                                                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black tracking-widest uppercase italic backdrop-blur-md border ${lab.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                        'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                        }`}>
                                                        {lab.difficulty}
                                                    </span>
                                                    <span className="flex items-center text-slate-500 text-[10px] font-black uppercase tracking-widest italic">
                                                        <Clock className="w-3.5 h-3.5 mr-2 text-blue-500" />
                                                        {lab.duration}
                                                    </span>
                                                </div>
                                                <CardTitle className="text-2xl text-white font-bold tracking-tight group-hover:text-blue-400 transition-colors">
                                                    {lab.title}
                                                </CardTitle>
                                                <CardDescription className="text-slate-400 text-base italic font-medium leading-relaxed">
                                                    {lab.description}
                                                </CardDescription>
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {lab.topics.map((topic, idx) => (
                                                        <span key={idx} className="px-3 py-1 bg-slate-950/50 border border-slate-800/80 rounded-lg text-[9px] font-bold text-slate-500 uppercase tracking-widest italic">
                                                            {topic}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-800/50 border border-slate-700/50 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all group-hover:translate-x-1">
                                                <ChevronRight className="w-6 h-6 text-slate-500 group-hover:text-white" />
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="py-20 border-t border-slate-900 text-center relative z-10">
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] italic">© 2026 EMC Global Education Ecosystem</p>
            </footer>
        </div>
    );
};

export default SwitchingLabsPage;
