'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiBell, FiChevronDown, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useUser } from '@/context/UserContext';
import { logoutApi } from '@/app/api/authApi';
import { useRouter } from 'next/navigation';

const CurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <p className="text-sm text-gray-500">{formattedDate}</p>
    );
};

function DashboardHeader() {
    const { user } = useUser();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const router = useRouter()

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const closeProfileMenu = (event: MouseEvent) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
            setIsProfileMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeProfileMenu);
        return () => {
            document.removeEventListener('mousedown', closeProfileMenu);
        };
    }, []);

    const handleLogout = async () => {
        try {
            const response = await logoutApi();
            console.log(response);
            router.push('/auth/login');
            // Handle successful logout (e.g., redirect to login page)
        } catch (error) {
            console.error('Logout failed:', error);
            // Handle error (e.g., show a notification)
        }
    }

    return (
        <div className="flex justify-between items-center mb-6 md:mb-8">
            {/* Left Section: Greeting and Date */}
            <div>
                <h1 className="text-xl font-semibold text-gray-800 md:text-2xl">Good morning, {user?.name}</h1>
                <CurrentDate />
            </div>

            {/* Right Section: Notifications and Profile */}
            <div className="flex items-center space-x-3 md:space-x-4">
                {/* Notification Bell */}
                <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <FiBell className="text-xl text-gray-600" />
                    {/* Optional: Notification badge */}
                    {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full">3</span> */}
                </button>

                {/* Profile Section with Dropdown Trigger */}
                <div className="relative">
                    <button
                        onClick={toggleProfileMenu}
                        className="flex items-center rounded-full cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 flex items-center justify-center text-white font-semibold text-sm md:w-10 md:h-10">
                            {user?.name?.charAt(0).toUpperCase()} {/* Display initials if no image */}
                        </div>
                        <FiChevronDown className="text-gray-500 ml-1.5" />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isProfileMenuOpen && (
                        <div
                            ref={profileMenuRef}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10 border border-gray-100 z-50"
                        >
                            <div className="py-2">
                                <span className="block px-4 py-2 text-sm text-gray-700 cursor-default">
                                    Signed in as <span className="font-semibold">{user?.name?.split(' ')[0]}</span>
                                </span>
                                <hr className="border-gray-200 my-1" />
                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left focus:outline-none">
                                    <FiUser className="inline-block mr-2 text-gray-500" />
                                    Profile
                                </button>
                                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left focus:outline-none">
                                    <FiSettings className="inline-block mr-2 text-gray-500" />
                                    Settings
                                </button>
                                <hr className="border-gray-200 my-1" />
                                <button className="block px-4 py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-700 w-full text-left focus:outline-none" onClick={handleLogout}>
                                    <FiLogOut className="inline-block mr-2 text-red-500" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardHeader;