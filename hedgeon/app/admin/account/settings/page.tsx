'use client'

import { useState } from 'react';
import { useUser } from '@/context/UserContext';

const SettingsPage = () => {
    const { user } = useUser()
    const [settings, setSettings] = useState({
        theme: 'light',
        notifications: true,
        language: 'en',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle settings update
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Theme</label>
                    <select
                        value={settings.theme}
                        onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Notifications</label>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={settings.notifications}
                            onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                            className="mr-2"
                        />
                        <span>Enable notifications</span>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <select
                        value={settings.language}
                        onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default SettingsPage;