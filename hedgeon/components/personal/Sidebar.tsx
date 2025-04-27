'use client'

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
    FiHome, FiDollarSign, FiPieChart, FiTrendingUp,
    FiHelpCircle, FiUser, FiChevronDown, FiMenu, FiX
} from 'react-icons/fi';

const DashboardSidebar = () => {
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState<string[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleMenu = (menuName: string) => {
        setOpenMenus(prev =>
            prev.includes(menuName)
                ? prev.filter(item => item !== menuName)
                : [...prev, menuName]
        );
    };

    const isActive = (href: string) => pathname === href;

    return (
        <div className={`bg-white h-screen shadow-xl border-r border-gray-100 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} overflow-hidden`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h1 className={`text-xl font-bold text-gray-800 ${!isSidebarOpen && 'hidden'}`}>WealthHub</h1>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                >
                    {isSidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
                {[
                    {
                        href: '/personal/dashboard',
                        icon: <FiHome />,
                        text: 'Dashboard',
                    },
                    {
                        href: '/personal/explore',
                        icon: <FiTrendingUp />,
                        text: 'Explore Funds',
                    },
                    {
                        href: '/personal/profile',
                        icon: <FiUser />,
                        text: 'Profile',
                    },
                ].map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        className={`flex items-center p-3 rounded transition-all ${isActive(item.href)
                            ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600 font-semibold'
                            : 'hover:bg-gray-50 hover:border-l-4 hover:border-gray-200'
                            } ${!isSidebarOpen && 'justify-center'}`}
                    >
                        <span className={`text-xl ${isActive(item.href) ? 'text-blue-600' : 'text-gray-600'}`}>
                            {item.icon}
                        </span>
                        <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>{item.text}</span>
                    </a>
                ))}

                {/* Support Dropdown */}
                <div className={`${!isSidebarOpen && 'px-3'}`}>
                    <button
                        onClick={() => toggleMenu('support')}
                        className={`flex items-center justify-between w-full p-3 rounded-xl hover:bg-gray-50 transition-colors ${!isSidebarOpen && 'justify-center'
                            }`}
                    >
                        <div className="flex items-center">
                            <FiHelpCircle className="text-xl text-gray-600" />
                            <span className={`ml-3 ${!isSidebarOpen && 'hidden'}`}>Support</span>
                        </div>
                        <FiChevronDown
                            className={`text-gray-500 transition-transform ${openMenus.includes('support') ? 'rotate-180' : ''
                                } ${!isSidebarOpen && 'hidden'}`}
                        />
                    </button>
                    {openMenus.includes('support') && isSidebarOpen && (
                        <div className="pl-11 mt-1 space-y-1">
                            {[
                                { href: '/support/chat', text: 'Live Chat' },
                                { href: '/support/faq', text: 'FAQs' },
                                { href: '/support/guides', text: 'Guides' },
                            ].map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className={`block p-2 text-sm rounded-lg transition-colors ${isActive(item.href)
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'hover:bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    {item.text}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            {/* Collapsed Tooltips */}
            {!isSidebarOpen && (
                <div className="absolute left-20 ml-2 hidden [.group:hover_&]:block">
                    <div className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg">
                        {[
                            { href: '/personal/dashboard', text: 'Dashboard' },
                            { href: '/personal/explore', text: 'Explore Funds' },
                            { href: '/market-insights', text: 'Market Insights' },
                            { href: '/profile', text: 'Profile' },
                            { href: '#', text: 'Support' },
                        ].find((item) => isActive(item.href))?.text}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardSidebar;