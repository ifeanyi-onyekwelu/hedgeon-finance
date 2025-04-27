'use client';

import React from 'react';
import DashboardStats from './DashboardStats';
import UsersManager from './UserManager';
import KYCApprovals from './KYCApprovals';
import WithdrawalRequests from './WithdrawalRequest';
import { useUser } from '@/context/UserContext';
import Section from '@/components/admin/Section';

const AdminDashboard = () => {
    const { user } = useUser();

    return (
        <Section>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name ?? "Admin"}</h1>

            <DashboardStats />
            <UsersManager />
            <KYCApprovals />
            <WithdrawalRequests />
        </Section>
    );
};

export default AdminDashboard;