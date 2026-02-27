import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import {
    Network,
    ArrowLeft,
    Shield,
    Wifi,
    Server,
    Code,
    ChevronRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LabsPage = () => {
    const navigate = useNavigate();

    const labCategories = [
        {
            icon: <Wifi className="w-8 h-8" />,
            title: 'Switching Labs',
            description: 'VLANs, Trunking, Port Security, and EtherChannel configurations.',
            labs: 5,
            color: 'from-blue-600 to-cyan-600',
            path: '/labs/category/switching'
        },
        {
            icon: <Network className="w-8 h-8" />,
            title: 'Routing Labs',
            description: 'Static routing, OSPF, EIGRP, and Inter-VLAN routing mastery.',
            labs: 6,
            color: 'from-cyan-600 to-teal-600',
            path: '/labs/category/routing'
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Security Labs',
            description: 'Standard & Extended ACLs, NAT, and device hardening techniques.',
            labs: 4,
            color: 'from-purple-600 to-pink-600',
            path: '/labs/category/security'
        },
        {
            icon: <Server className="w-8 h-8" />,
            title: 'IP Services Labs',
            description: 'DHCP, NTP, SNMP, and Network Management protocols.',
            labs: 4,
            color: 'from-orange-600 to-red-600',
            path: '/labs/category/ip-services'
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
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
                            <span className="text-blue-400 text-sm font-medium flex items-center">
                                <Code className="w-4 h-4 mr-2" />
                                Hands-On Lab Repository
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
                            CCNA Lab <br />
                            <span className="gradient-text">
                                Repository
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed italic font-medium">
                            Master Cisco networking with hands-on labs covering switching, routing, security, and IP services.
                            Each lab includes step-by-step instructions and real CLI configurations.
                        </p>
                    </div>

                    {/* Lab Categories Grid */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {labCategories.map((category, index) => (
                            <div key={index} className="relative group">
                                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-20 rounded-[2.5rem] blur-xl group-hover:blur-2xl transition-all`} />
                                <Link to={category.path} className="block h-full">
                                    <Card
                                        className="relative bg-slate-900/40 backdrop-blur-xl border-slate-800/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full rounded-[2.5rem] overflow-hidden shadow-2xl"
                                    >
                                        <CardHeader className="p-10">
                                            <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                                                {category.icon}
                                            </div>
                                            <CardTitle className="text-3xl text-white mb-4 font-bold tracking-tight">{category.title}</CardTitle>
                                            <CardDescription className="text-slate-400 text-lg mb-8 italic">
                                                {category.description}
                                            </CardDescription>
                                            <div className="flex items-center justify-between mt-auto">
                                                <span className="text-xs font-black text-slate-500 uppercase tracking-widest italic">{category.labs} Labs Available</span>
                                                <div className="text-blue-400 hover:text-white hover:bg-blue-600/20 rounded-xl font-black uppercase italic tracking-widest text-xs flex items-center px-4 py-2 transition-all">
                                                    View Labs
                                                    <ChevronRight className="w-4 h-4 ml-2" />
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default LabsPage;
