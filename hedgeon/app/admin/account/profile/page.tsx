'use client'

import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';

const ProfilePage = () => {
    const { user } = useUser()

    const [formData, setFormData] = useState({
        name: user?.name,
        email: user?.email,
        role: user?.role,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <input
                        type="text"
                        value={formData.role}
                        readOnly
                        className="w-full p-2 border rounded-md bg-gray-100"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;