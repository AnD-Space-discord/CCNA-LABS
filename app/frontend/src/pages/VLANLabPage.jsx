import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import {
    Network,
    ArrowLeft,
    Download,
    Copy,
    CheckCircle2,
    Terminal,
    Zap,
    BookOpen,
    Layout
} from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';

const VLANLabPage = () => {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const labConfig = `enable
configure terminal
hostname SW1
!
vlan 10
 name Sales
vlan 20
 name Manager
vlan 30
 name Engineer
vlan 40
 name Support
!
interface fastEthernet 0/0
 switchport mode access
 switchport access vlan 10
!
interface fastEthernet 0/1
 switchport mode access
 switchport access vlan 20
!
interface fastEthernet 0/2
 switchport mode access
 switchport access vlan 30
!
interface fastEthernet 0/3
 switchport mode access
 switchport access vlan 40
!
end
show vlan brief`;

    const handleCopy = () => {
        navigator.clipboard.writeText(labConfig);
        setCopied(true);
        toast.success('Configuration copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([labConfig], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "SW1-config.txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        toast.success('Download started!');
    };

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

                    {/* Lab Header */}
                    <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="text-left">
                            <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-green-400 mb-6 italic">
                                <span>Beginner Phase 01</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-none">
                                VLAN <br />
                                <span className="text-blue-500">Configuration</span>
                            </h1>
                            <p className="text-lg text-slate-400 italic font-medium max-w-xl">
                                Master the fundamental skill of creating Virtual LANs on Cisco switches to manage broadcast domains.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => navigate('/labs/switching')}
                            className="border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 h-10 px-6 rounded-xl text-xs font-black uppercase italic tracking-widest flex items-center bg-slate-900/40"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Switching
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Objective */}
                            <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-800/50 rounded-[2rem] overflow-hidden shadow-2xl">
                                <CardHeader className="p-8 pb-0">
                                    <div className="flex items-center space-x-3 text-blue-500 mb-2">
                                        <Zap className="w-5 h-5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest italic">Core Objective</span>
                                    </div>
                                    <CardTitle className="text-2xl text-white font-bold tracking-tight">Mission Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 pt-4">
                                    <p className="text-slate-400 italic font-medium leading-relaxed">
                                        The objective of this lab is to learn and understand how to create VLANs on Cisco switches.
                                        VLANs allow you to segment your network into multiple, smaller broadcast domains for better
                                        network management and security.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Cisco CLI Terminal Styling */}
                            <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-800/50 rounded-[2.5rem] overflow-hidden shadow-2xl">
                                <CardHeader className="p-8 border-b border-slate-800/50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <Terminal className="w-6 h-6 text-blue-500" />
                                            <CardTitle className="text-2xl text-white font-bold tracking-tight">Cisco IOS CLI</CardTitle>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={handleCopy}
                                                variant="ghost"
                                                className="text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl px-4 h-10 transition-all"
                                            >
                                                {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                            </Button>
                                            <Button
                                                onClick={handleDownload}
                                                variant="ghost"
                                                className="text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl px-4 h-10 transition-all"
                                            >
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="bg-slate-950 p-8 font-mono text-xs md:text-sm overflow-x-auto leading-relaxed">
                                        <pre className="text-slate-300">
                                            <span className="text-green-500">SW1&gt;</span><span className="text-blue-500">enable</span>
                                            <span className="text-green-500">SW1#</span><span className="text-blue-500">configure terminal</span>
                                            <span className="text-slate-500 italic">! Enter configuration commands, one per line. End with CNTL/Z.</span>
                                            <span className="text-green-500">SW1(config)#</span><span className="text-blue-500">hostname SW1</span>
                                            <span className="text-green-500">SW1(config)#</span><span className="text-slate-500">!</span>
                                            <span className="text-green-500">SW1(config)#</span><span className="text-blue-500">vlan 10</span>
                                            <span className="text-green-500">SW1(config-vlan)#</span><span className="text-blue-500"> name Sales</span>
                                            <span className="text-green-500">SW1(config-vlan)#</span><span className="text-blue-500">vlan 20</span>
                                            <span className="text-green-500">SW1(config-vlan)#</span><span className="text-blue-500"> name Manager</span>
                                            <span className="text-green-500">SW1(config-vlan)#</span><span className="text-blue-500">vlan 30</span>
                                            <span className="text-green-500">SW1(config-vlan)#</span><span className="text-blue-500"> name Engineer</span>
                                            <span className="text-green-500">SW1(config-vlan)#</span><span className="text-blue-500">vlan 40</span>
                                            <span className="text-green-500">SW1(config-vlan)#</span><span className="text-blue-500"> name Support</span>
                                            <span className="text-green-500">SW1(config-vlan)#</span><span className="text-slate-500">!</span>
                                            <span className="text-green-500">SW1(config)#</span><span className="text-blue-500">interface fastEthernet 0/0</span>
                                            <span className="text-green-500">SW1(config-if)#</span><span className="text-blue-500"> switchport mode access</span>
                                            <span className="text-green-400">SW1(config-if)#</span><span className="text-blue-500"> switchport access vlan 10</span>
                                            <span className="text-green-500">SW1(config-if)#</span><span className="text-slate-500">!</span>
                                            <span className="text-green-500">SW1(config-if)#</span><span className="text-blue-500">interface fastEthernet 0/1</span>
                                            <span className="text-green-500">SW1(config-if)#</span><span className="text-blue-500"> switchport mode access</span>
                                            <span className="text-green-500">SW1(config-if)#</span><span className="text-blue-500"> switchport access vlan 20</span>
                                            <span className="text-green-500">SW1(config-if)#</span><span className="text-slate-500">!</span>
                                            <span className="text-green-500">SW1(config-if)#</span><span className="text-blue-500">end</span>
                                            <span className="text-green-500">SW1#</span><span className="text-blue-500">show vlan brief</span>

                                            <span className="text-cyan-500">VLAN Name                             Status    Ports</span>
                                            <span className="text-slate-500">---- -------------------------------- --------- -------------------------------</span>
                                            <span className="text-white">1    default                          active    </span>
                                            <span className="text-white">10   Sales                            active    Fa0/0</span>
                                            <span className="text-white">20   Manager                          active    Fa0/1</span>
                                            <span className="text-white">30   Engineer                         active    Fa0/2</span>
                                            <span className="text-white">40   Support                          active    Fa0/3</span>
                                        </pre>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar Details */}
                        <div className="space-y-8">
                            {/* VLAN Ranges */}
                            <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-800/50 rounded-[2rem] overflow-hidden shadow-2xl">
                                <CardHeader className="p-8 pb-0">
                                    <div className="flex items-center space-x-3 text-purple-500 mb-2">
                                        <BookOpen className="w-5 h-5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest italic">Reference</span>
                                    </div>
                                    <CardTitle className="text-xl text-white font-bold tracking-tight">VLAN Ranges</CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 pt-6 space-y-6">
                                    <div>
                                        <h4 className="text-blue-400 text-xs font-black uppercase tracking-widest mb-2 italic">Normal Range</h4>
                                        <p className="text-slate-500 text-sm italic font-medium leading-relaxed">2 – 1001: General purpose segmentation.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-yellow-400 text-xs font-black uppercase tracking-widest mb-2 italic">Legacy Range</h4>
                                        <p className="text-slate-500 text-sm italic font-medium leading-relaxed">1002 – 1005: Reserved for FDDI/Token Ring.</p>
                                    </div>
                                    <div className="pt-4 border-t border-slate-800/50">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest italic">Protocol</span>
                                            <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest italic font-mono">IEEE 802.1Q</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Topology Preview */}
                            <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-800/50 rounded-[2rem] overflow-hidden shadow-2xl">
                                <CardHeader className="p-8 pb-0">
                                    <div className="flex items-center space-x-3 text-cyan-500 mb-2">
                                        <Layout className="w-5 h-5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest italic">Topology</span>
                                    </div>
                                    <CardTitle className="text-xl text-white font-bold tracking-tight">Visualization</CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 pt-6">
                                    <div className="relative group rounded-2xl overflow-hidden border border-slate-800">
                                        <img
                                            src="https://emcglobal.in/Images/VLAN/vlan.jpg"
                                            alt="VLAN Lab Topology"
                                            className="w-full grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-blue-600/10 pointer-events-none" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-20 border-t border-slate-900 text-center relative z-10">
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] italic">© 2026 EMC Global Education Ecosystem</p>
            </footer>
        </div>
    );
};

export default VLANLabPage;
