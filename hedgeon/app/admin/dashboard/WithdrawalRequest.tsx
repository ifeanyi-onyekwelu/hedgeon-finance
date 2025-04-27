'use client';

import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, notification } from 'antd';
import { approveWithdrawalRequestAdminApi, getAllWithdrawalRequestsAdminApi, rejectWithdrawalRequestAdminApi } from '@/app/api/adminApi';

interface Withdrawal {
    _id: string;
    userId: {
        _id: string;
        name: string;
        email: string;
    };
    amount: number;
    currency: any;
    walletAddress: string;
    status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'FAILED';
    createdAt: Date;
}

// Define status colors
const statusColor: { [key: string]: string } = {
    PENDING: 'blue',
    APPROVED: 'green',
    DECLINED: 'red',
    FAILED: 'orange'
};

const WithdrawalRequests = () => {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ pageSize: 5, current: 1 });

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    const fetchWithdrawals = async () => {
        try {
            setLoading(true);
            const response = await getAllWithdrawalRequestsAdminApi();
            console.log('Fetched withdrawals:', response.data);
            // setWithdrawals(response.data);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to fetch withdrawal requests'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (withdrawalId: string) => {
        try {
            const response = await approveWithdrawalRequestAdminApi(withdrawalId);
            console.log('Approved withdrawal:', response.data);

            notification.success({
                message: 'Approved',
                description: 'Withdrawal request approved successfully'
            });
            fetchWithdrawals();
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to approve withdrawal request'
            });
        }
    };

    const handleDecline = async (withdrawalId: string) => {
        try {
            const response = await rejectWithdrawalRequestAdminApi(withdrawalId, 'Declined by admin');
            console.log('Declined withdrawal:', response.data);

            notification.success({
                message: 'Declined',
                description: 'Withdrawal request declined successfully'
            });
            fetchWithdrawals();
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to decline withdrawal request'
            });
        }
    };

    const columns = [
        {
            title: 'User',
            dataIndex: 'userId',
            render: (userId: { name: string; email: string }) => (
                <div>
                    <div>{userId.name}</div>
                    <div className="text-gray-500 text-sm">{userId.email}</div>
                </div>
            )
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            render: (amount: number, record: Withdrawal) => (
                <div>
                    {amount} {record.currency}
                </div>
            )
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            render: (currency: any) => currency.toUpperCase()
        },
        { title: 'Wallet Address', dataIndex: 'walletAddress' },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: string) => (
                <Tag color={statusColor[status]} className="capitalize">
                    {status.toLowerCase()}
                </Tag>
            )
        },
        {
            title: 'Actions',
            render: (_: any, record: Withdrawal) => (
                <Space>
                    {record.status === 'PENDING' && (
                        <>
                            <Button
                                onClick={() => handleApprove(record._id)}
                                type="primary"
                                disabled={loading}
                            >
                                Approve
                            </Button>
                            <Button
                                onClick={() => handleDecline(record._id)}
                                danger
                                disabled={loading}
                            >
                                Decline
                            </Button>
                        </>
                    )}
                </Space>
            )
        }
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Withdrawal Requests</h2>
            <Table
                columns={columns}
                dataSource={withdrawals}
                rowKey="_id"
                pagination={pagination}
                loading={loading}
                onChange={setPagination}
                scroll={{ x: true }}
            />
        </div>
    );
};

export default WithdrawalRequests;