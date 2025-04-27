// components/admin/DashboardStats.tsx
import React from 'react';

const DashboardStats = () => {
    // Fetch stats from API
    const stats = [
        { title: 'Total Users', value: '1,234', icon: '👤' },
        { title: 'Active Investments', value: '$452k', icon: '💼' },
        { title: 'Pending KYC', value: '23', icon: '📑' },
        { title: 'Total Profit', value: '$152k', icon: '💰' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">{stat.title}</p>
                            <p className="text-2xl font-bold mt-2">{stat.value}</p>
                        </div>
                        <span className="text-3xl">{stat.icon}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;