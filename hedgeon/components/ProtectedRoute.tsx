// components/ProtectedRoute.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import { useUser } from '@/context/UserContext';
import axiosInstance from '@/app/api/axiosInstance';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axiosInstance.get('/protected'); // Or an endpoint that also returns user roles
                console.log(response)
                setIsAuthenticated(true);
            } catch (error: any) {
                if (error?.response?.status === 401 || error?.message?.includes('redirecting to login')) {
                    router.push('/auth/login');
                } else {
                    console.error("Authentication check error:", error);
                }
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router, user?.role]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // Optionally render a "Not Authorized" message or redirect
        return <div>Not Authorized. Please log in.</div>;
    }

    // Check if a required role is specified and if the user has that role
    if (requiredRole && user?.role !== requiredRole) {
        return <div>Not Authorized. Requires {requiredRole} role.</div>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;