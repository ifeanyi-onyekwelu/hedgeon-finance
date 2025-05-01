'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProtectedLayout({
    children,
    allowedRoles,
}: {
    children: React.ReactNode,
    allowedRoles?: string[],
}) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const role = localStorage.getItem('user_role');

        console.log('Token:', token);
        console.log('Role:', role);

        if (!token || !role) {
            router.push('/auth/login');
            return;
        }

        if (allowedRoles && !allowedRoles.includes(role)) {
            router.push('/unauthorized'); // Or any custom 403 page
            return;
        }

        setAuthorized(true);
    }, []);

    if (!authorized) return null; // Or a loading spinner

    return <>{children}</>;
}
