'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logoutApi } from '@/app/api/authApi';
import { LoaderIcon } from 'lucide-react';

const LogoutPage = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await logoutApi();
            console.log(response);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    useEffect(() => {
        const performLogout = async () => {
            try {
                await handleLogout();
                router.push('/admin/logged-out');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        };

        performLogout();
    }, [router]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
                <div className="mb-4">
                    <LoaderIcon className='animate-spin' />
                </div>
                <p className="text-gray-700">Logging out...</p>
            </div>
        </div>
    );
};

export default LogoutPage;