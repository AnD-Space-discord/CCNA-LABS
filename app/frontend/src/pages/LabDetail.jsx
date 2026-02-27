import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Network,
    ArrowLeft,
    Download,
    CheckCircle2,
    Terminal as TerminalIcon,
    Layout,
    Target,
    ChevronRight,
    Copy,
    Zap,
    BookOpen,
    Clock,
    X
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { labs } from '../data/labs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'sonner';

export default function LabDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const lab = labs.find(l => l.id === id);
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const [taskConfigs, setTaskConfigs] = useState({});
    const [viewingConfig, setViewingConfig] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Load legacy HTML content if needed
        if (lab && lab.legacyFile && (!lab.tasks || lab.tasks.length === 0)) {
            setLoading(true);
            fetch(`/content/labs/${lab.legacyFile}`)
                .then(res => res.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const mainContent = doc.querySelector('main') || doc.body;

                    const selectorsToRemove = ['nav', 'footer', 'header', 'script', 'style'];
                    selectorsToRemove.forEach(selector => {
                        mainContent.querySelectorAll(selector).forEach(el => el.remove());
                    });

                    setContent(mainContent.innerHTML);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching legacy lab:', err);
                    setLoading(false);
                    setContent('<p className="text-red-500">Failed to load lab content.</p>');
                });
        }

        // Load task configurations from scripts if scriptPath is provided
        if (lab && lab.tasks) {
            lab.tasks.forEach((task, index) => {
                if (task.scriptPath && !task.config) {
                    fetch(task.scriptPath)
                        .then(res => res.text())
                        .then(text => {
                            setTaskConfigs(prev => ({ ...prev, [index]: text }));
                        })
                        .catch(err => console.error(`Error fetching script ${task.scriptPath}:`, err));
                }
            });
        }
    }, [lab, id]);

    if (!lab) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
                <Navbar />
                <h1 className="text-4xl font-bold mb-4">Lab Not Found</h1>
                <Link to="/labs">
                    <Button variant="outline">Back to Library</Button>
                </Link>
            </div>
        );
    }

    const handleCopy = (config) => {
        navigator.clipboard.writeText(config);
        setCopied(true);
        toast.success('Configuration copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = (config, filename) => {
        const element = document.createElement("a");
        const file = new Blob([config], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${filename || 'config'}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        toast.success('Download started!');
    };

    const formatConfig = (text, taskTitle) => {
        if (!text) return null;
        const hostnameMatch = text.match(/hostname\s+([A-Za-z0-9-_]+)/i);
        const hostname = hostnameMatch ? hostnameMatch[1] : (taskTitle.split(' ')[0] || 'Router');

        let currentMode = 'base';
        return text.split('\n').map((line, idx) => {
            const trimmed = line.trim();
            if (trimmed === '' || trimmed === '!') {
                return <div key={idx} className="h-3" />;
            }

            const lowerLine = trimmed.toLowerCase();

            // Determine mode BEFORE this line (for prompt display)
            const displayMode = currentMode;

            // Update mode AFTER determining what to show
            if (lowerLine === 'enable') {
                currentMode = 'base';
            } else if (lowerLine === 'configure terminal' || lowerLine === 'conf t') {
                currentMode = 'config';
            } else if (lowerLine.startsWith('interface') || lowerLine.startsWith('int ')) {
                currentMode = 'config-if';
            } else if (lowerLine.startsWith('router ')) {
                currentMode = 'config-router';
            } else if (lowerLine.startsWith('line ')) {
                currentMode = 'config-line';
            } else if (lowerLine === 'exit') {
                if (currentMode === 'config-if' || currentMode === 'config-router' || currentMode === 'config-line') {
                    currentMode = 'config';
                } else if (currentMode === 'config') {
                    currentMode = 'base';
                }
            } else if (lowerLine === 'end') {
                currentMode = 'base';
            }

            const promptSuffix = displayMode === 'base' ? '#' : `(${displayMode})#`;

            return (
                <div key={idx} className="flex items-start gap-1 px-6 py-0.5 font-mono text-[15px] leading-7">
                    <span className="text-[#4ADE80] font-semibold select-none shrink-0 whitespace-nowrap">
                        {hostname}{promptSuffix}
                    </span>
                    <span className="text-[#CBD5E1] ml-1">
                        {trimmed}
                    </span>
                </div>
            );
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300">
            <Navbar />

            <div className="fixed inset-0 bg-[#020617] pointer-events-none" />
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
            </div>

            <main className="pt-24 md:pt-32 pb-32 px-6 relative z-10 w-full animate-in fade-in duration-700">
                <div className="container mx-auto max-w-6xl text-center">

                    {/* Centered Header */}
                    <div className="mb-24 flex flex-col items-center">
                        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4 uppercase">
                            {lab.title}
                        </h1>
                        <p className="text-blue-500 font-bold uppercase tracking-widest text-xs italic">
                            Dynamic Training Configuration Library
                        </p>
                    </div>

                    <div className="space-y-24 text-left">

                        {/* Objective Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-8 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">
                                    Objective
                                </h2>
                            </div>
                            <p className="text-slate-400 font-medium leading-relaxed italic text-lg opacity-80 pl-4 border-l border-white/5 ml-0.5">
                                the objective of this lab is to learn and understand how to configure and verify {lab.title.toLowerCase()} on cisco infrastructure and verify connectivity.
                            </p>
                        </div>

                        {/* Lab Topology Section */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-8 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">
                                    Lab Topology
                                </h2>
                            </div>
                            <div className="rounded-[2.5rem] bg-[#F8FAFC] p-4 md:p-12 shadow-2xl border border-white/10 group overflow-hidden">
                                <div className="relative aspect-[16/9] flex items-center justify-center">
                                    <img
                                        src={lab.topology}
                                        alt="Lab Topology"
                                        className="max-w-full max-h-full object-contain group-hover:scale-[1.02] transition-transform duration-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Task Sections */}
                        {lab.tasks && lab.tasks.length > 0 ? (
                            <div className="space-y-20">
                                {lab.tasks.map((task, i) => {
                                    const configContent = taskConfigs[i] || task.config;

                                    // Hacky grouping for the demo: If it's the first task, add the "Task 1" header
                                    const isFirstInTask = i === 0;
                                    const isFirstInTask2 = i === 3; // Example split
                                    const isFirstInTask3 = i === 6;

                                    return (
                                        <div key={i} className="space-y-4">
                                            {/* Task Title with left blue border — matching screenshot */}
                                            <div className="flex items-center gap-4 pl-4 border-l-4 border-blue-500">
                                                <h3 className="text-xl font-bold text-white tracking-tight">
                                                    {`Task ${i + 1} – ${task.title}`}
                                                </h3>
                                            </div>

                                            {/* Terminal Window */}
                                            <div className="rounded-xl overflow-hidden shadow-2xl border border-[#2a2f45]">
                                                {/* Mac dots bar — dark navy */}
                                                <div className="flex items-center gap-2 px-4 py-3 bg-[#1e2235]">
                                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                                                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                                                </div>
                                                {/* Terminal body — true black */}
                                                <div className="bg-[#0d0d0d] py-5 overflow-x-auto">
                                                    {configContent ? formatConfig(configContent, task.title) : (
                                                        <div className="px-6 italic text-slate-700 font-mono text-sm animate-pulse">Establishing terminal session...</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : loading ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
                                <div className="w-16 h-16 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin" />
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] italic">Compiling Lab Architecture...</p>
                            </div>
                        ) : (
                            <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-800/50 rounded-[1.5rem] overflow-hidden shadow-2xl">
                                <CardContent className="p-10">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: content }}
                                        className="legacy-content-wrapper text-left prose prose-invert prose-slate max-w-none italic font-medium leading-relaxed"
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Lab Resources Hub (Bottom Section) */}
                        <div className="pt-10">
                            <Card className="bg-[#050505]/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 md:p-16 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

                                <div className="relative grid md:grid-cols-2 gap-16">
                                    <div className="space-y-10 text-left">
                                        <div className="space-y-3">
                                            <h4 className="text-4xl font-black text-white italic tracking-tighter">Lab Resources</h4>
                                            <p className="text-slate-500 font-medium italic text-lg leading-relaxed">Detailed configurations and quick links for this laboratory exercise.</p>
                                        </div>

                                        <div className="space-y-6 pt-4">
                                            <div className="flex items-center gap-3 text-white font-black text-sm uppercase tracking-widest italic">
                                                <Zap className="w-5 h-5 text-blue-500" />
                                                Quick View
                                            </div>
                                            <div className="flex flex-wrap gap-4">
                                                {lab.tasks.map((task, i) => (
                                                    <Button
                                                        key={i}
                                                        onClick={() => setViewingConfig({ title: task.title, content: taskConfigs[i] || task.config })}
                                                        className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-8 py-3 text-[11px] font-black uppercase italic tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/10"
                                                    >
                                                        View {task.title.split(' ')[0]}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-10">
                                        <div className="flex items-center gap-3 text-white font-black text-sm uppercase tracking-widest italic">
                                            <Download className="w-5 h-5 text-[#10B981]" />
                                            Script Downloads
                                        </div>
                                        <div className="space-y-4">
                                            {lab.tasks.map((task, i) => (
                                                <Button
                                                    key={i}
                                                    onClick={() => handleDownload(taskConfigs[i] || task.config, task.title)}
                                                    className="w-full bg-[#10B981] hover:bg-[#059669] text-white rounded-2xl py-5 flex items-center justify-start px-8 group transition-all hover:scale-[1.02] shadow-xl shadow-green-500/5"
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
                                                        <Download className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-[11px] font-black uppercase italic tracking-widest">Download {task.title} Configuration</span>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Mark as Proficient Button - Bottom Right Alignment */}
                        <div className="flex justify-end pt-12">
                            <Button className="bg-blue-600/10 hover:bg-blue-600 border border-blue-600/30 text-blue-500 hover:text-white px-10 py-6 rounded-2xl flex items-center gap-6 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/5 group">
                                <span className="font-black uppercase italic tracking-widest text-base">Mark lab as complete</span>
                                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                    <ChevronRight className="w-6 h-6" />
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* View Configuration Modal */}
            {viewingConfig && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#0d0d0d] border border-[#2a2f45] rounded-2xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
                        {/* Header with Dots — navy bar */}
                        <div className="flex items-center justify-between px-4 py-3 bg-[#1e2235]">
                            <div className="flex gap-4 items-center">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                                </div>
                                <h3 className="text-sm font-semibold text-slate-400 tracking-tight">{viewingConfig.title}</h3>
                            </div>
                            <button
                                onClick={() => setViewingConfig(null)}
                                className="text-slate-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="py-5 overflow-y-auto bg-[#0d0d0d] text-left">
                            {viewingConfig.content ? (
                                <pre className="px-6 font-mono text-[14px] leading-7 text-[#CBD5E1] whitespace-pre-wrap">{viewingConfig.content}</pre>
                            ) : (
                                <div className="px-6 italic text-slate-700 font-mono text-sm">Configuration empty or not found.</div>
                            )}
                        </div>
                        <div className="px-6 py-4 border-t border-[#2a2f45] bg-[#1e2235] flex justify-end gap-3">
                            <Button
                                onClick={() => handleCopy(viewingConfig.content)}
                                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-[10px] font-black uppercase italic tracking-widest px-6"
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </Button>
                            <Button
                                onClick={() => handleDownload(viewingConfig.content, viewingConfig.title)}
                                className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase italic tracking-widest px-6"
                            >
                                Download
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
