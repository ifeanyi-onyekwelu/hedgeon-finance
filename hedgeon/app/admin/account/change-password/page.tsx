'use client'

import { useUser } from '@/context/UserContext';
import React, { useState } from 'react';
const ChangePasswordPage = () => {
    const { user } = useUser()
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle password change
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Current Password</label>
                    <input
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <input
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                    <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default ChangePasswordPage;