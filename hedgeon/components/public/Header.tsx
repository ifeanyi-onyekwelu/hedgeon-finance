'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { IconPhone } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { User2 } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact-us' },
];

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="z-50">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2"
                    >
                        <Image src="/images/logo.png" width={200} height={200} alt="Hedgeon Finance Logo" />
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`relative px-3 py-2 text-sm font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-primary' : 'text-gray-200 hover:text-white'
                                }`}
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* CTA Section */}
                <div className="hidden md:flex items-center space-x-6">
                    <div className={`flex items-center space-x-2 ${isScrolled ? 'text-gray-700' : 'text-gray-200'}`}>
                        <IconPhone className="w-5 h-5" />
                        <span className="text-sm">+1 (580) 304-2990</span>
                    </div>

                    <Link
                        href="/auth/login"
                        className="w-fit bg-primary text-white hover:bg-primary-dark flex items-center py-2 px-4 text-center rounded-sm hover:bg-primary-fade duration-300"
                    >
                        <User2 className="w-5 h-5 mr-2" />
                        Login
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    aria-label="Toggle menu"
                    className="md:hidden p-2 z-50"
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className={`w-6 h-0.5 mb-1.5 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-primary' : `${isScrolled ? 'bg-gray-700' : 'bg-white'}`}`} />
                    <div className={`w-6 h-0.5 mb-1.5 transition-all ${isMobileMenuOpen ? 'opacity-0' : `${isScrolled ? 'bg-gray-700' : 'bg-white'}`}`} />
                    <div className={`w-6 h-0.5 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-primary' : `${isScrolled ? 'bg-gray-700' : 'bg-white'}`}`} />
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.nav
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'tween' }}
                            className="fixed top-0 right-0 w-full max-w-xs h-screen bg-white shadow-2xl md:hidden p-8 z-50"
                        >
                            <div className="h-full flex flex-col justify-between">
                                <div className="space-y-2">
                                    <div className="text-2xl font-bold text-gray-800 mb-12">Menu</div>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            href={link.path}
                                            className="block text-gray-700 hover:text-primary text-lg py-2"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>

                                <div className="space-y-6 border-t pt-8">
                                    <div className="flex items-center space-x-2 text-gray-700">
                                        <IconPhone className="w-5 h-5" />
                                        <span>+1 (580) 304-2990</span>
                                    </div>
                                    <Link
                                        href="/auth/login"
                                        className="w-full bg-primary text-white hover:bg-primary-dark flex items-center py-2 px-4 text-center rounded-sm hover:bg-primary-fade duration-300"
                                    >
                                        <User2 className="w-5 h-5 mr-2" />
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header