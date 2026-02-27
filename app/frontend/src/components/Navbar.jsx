import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Network, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Labs', path: '/labs' },
        { name: 'Blog', path: '/blogs' },
    ];

    const isHomePage = location.pathname === '/';

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50 py-3' : 'bg-transparent py-5'
            }`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo & Homepage Special Button */}
                <div className="flex items-center space-x-6">
                    <Link to="/" className="flex items-center space-x-2 group relative z-50">
                        <div className="relative">
                            <Network className="w-8 h-8 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                            <div className="absolute inset-0 blur-xl bg-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-xl font-bold gradient-text tracking-tight hidden sm:block">EMC Global</span>
                    </Link>

                    {isHomePage && (
                        <Link to="/labs" className="hidden lg:block">
                            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/20 px-6 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95">
                                View All Labs
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium transition-colors hover:text-blue-400 relative group ${location.pathname === link.path ? 'text-blue-400' : 'text-slate-300'
                                }`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                                }`} />
                        </Link>
                    ))}
                    {!isHomePage && (
                        <Link to="/">
                            <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:border-blue-500 transition-all px-6 py-2 rounded-xl text-xs font-bold flex items-center">
                                <X className="w-3 h-3 mr-2 rotate-45" /> Back to Home
                            </Button>
                        </Link>
                    )}
                    {isHomePage && (
                        <Link to="/labs">
                            <Button className="bg-slate-900/50 border border-slate-700 text-slate-300 hover:text-white hover:border-blue-500 transition-all px-6 py-2 rounded-xl text-xs font-bold">
                                Get Started
                            </Button>
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <div className="flex items-center space-x-4 md:hidden">
                    {isHomePage && (
                        <Link to="/labs">
                            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1.5 rounded-lg text-[10px] font-bold">
                                Labs
                            </Button>
                        </Link>
                    )}
                    <button
                        className="relative z-50 p-2 text-slate-300 hover:text-white transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation Overlay */}
                <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}>
                    {/* Backdrop Blur */}
                    <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={() => setIsOpen(false)} />

                    {/* Menu Content */}
                    <nav className={`absolute inset-x-0 top-0 pt-24 pb-12 px-6 flex flex-col space-y-6 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-10'
                        }`}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-2xl font-bold text-slate-300 hover:text-blue-400 transition-colors flex items-center justify-between group"
                            >
                                {link.name}
                                <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </Link>
                        ))}
                        <div className="pt-6">
                            <Link to="/labs">
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-6 rounded-2xl text-lg font-bold">
                                    View Repository
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
