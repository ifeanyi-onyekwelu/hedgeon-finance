'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-6">The page you are looking for does not exist.</p>
            <Link
                href="/"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Go back home
            </Link>
        </div>
    );
}
