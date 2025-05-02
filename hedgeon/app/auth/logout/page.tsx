'use client';

import React, { useState } from 'react';
import { logoutApi } from '@/app/api/authApi';
import { useRouter } from 'next/navigation';

function LogoutPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            const response = await logoutApi();
            console.log(response);
            localStorage.removeItem('access_token');

            // Optional: Delay a bit to show the "Logging out..." message
            setTimeout(() => {
                router.push('/auth/login');
            }, 1500);
        } catch (error) {
            console.error('Logout failed:', error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 space-y-6 shadow-xl text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20">
                    <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">
                        {loading ? 'Logging out...' : 'Log out of your account?'}
                    </h2>
                    {!loading && (
                        <p className="text-gray-300">Please confirm that you want to end your current session.</p>
                    )}
                </div>

                <div className="space-y-4">
                    <button
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 py-3 px-4 text-white font-medium rounded-lg transition-all transform
              ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5'}
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800`}
                        onClick={handleLogout}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        {loading ? 'Logging out...' : 'Confirm Log Out'}
                    </button>

                    <button
                        disabled={loading}
                        className="inline-block w-full py-2.5 px-4 text-gray-300 hover:text-white font-medium rounded-lg border border-gray-600 hover:border-gray-400
              transition-colors focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogoutPage;
