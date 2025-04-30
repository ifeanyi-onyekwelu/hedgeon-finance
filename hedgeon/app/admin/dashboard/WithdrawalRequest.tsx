'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button, Input, notification, Card, Descriptions, Badge, Space, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
    ArrowLeftOutlined,
    SaveOutlined,
    CloseOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { getAllWithdrawalRequestsAdminApi } from '@/app/api/adminApi';


const updateWithdrawal = async (id: string, updatedData: any) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log('Updating withdrawal', id, 'with', updatedData);
    // In a real application, you would make an API call here
    return { success: true, message: 'Withdrawal updated successfully' };
};

interface Withdrawal {
    _id: string;
    userId: { _id: string; name: string; email: string };
    amount: number;
    currency: string;
    walletAddress: string;
    status: 'PENDING' | 'APPOVED' | 'FAILED' | 'DECLINED';
    createdAt: Date;
}

const WithdrawalDetails: React.FC<{
    withdrawal: Withdrawal;
    onBack: () => void;
    onUpdate: () => void;
}> = ({ withdrawal, onBack, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [localWithdrawal, setLocalWithdrawal] = useState<Withdrawal>(withdrawal);
    const initialWithdrawal = React.useRef<Withdrawal>(withdrawal);

    useEffect(() => {
        setLocalWithdrawal(withdrawal);
        initialWithdrawal.current = withdrawal;
    }, [withdrawal]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const updatedData = {
                status: localWithdrawal.status,
            };
            const response = await updateWithdrawal(withdrawal._id, updatedData);
            if (response.success) {
                notification.success({
                    message: 'Success',
                    description: response.message,
                });
                setEditMode(false);
                onUpdate(); // Refresh
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Failed to update withdrawal',
                });
            }
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: `Failed to update withdrawal: ${error.message}`,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setLocalWithdrawal(initialWithdrawal.current);
    };

    const getStatusBadge = (status: Withdrawal['status']) => {
        switch (status) {
            case 'PENDING':
                return <Badge status="processing" text="Pending" />;
            case 'APPOVED':
                return <Badge status="success" text="Approved" />;
            case 'FAILED':
                return <Badge status="error" text="Failed" />;
            case 'DECLINED':
                return <Badge status="error" text="Declined" />;
            default:
                return <Badge text="Unknown" />;
        }
    };

    const statusOptions: Withdrawal['status'][] = ['PENDING', 'APPOVED', 'FAILED', 'DECLINED'];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <Button onClick={onBack} className="mb-4">
                <ArrowLeftOutlined /> Back to List
            </Button>

            <Card title="Withdrawal Details">
                <Descriptions bordered>
                    <Descriptions.Item label="User">
                        {withdrawal.userId.name} ({withdrawal.userId.email})
                    </Descriptions.Item>
                    <Descriptions.Item label="Amount">{withdrawal.amount}</Descriptions.Item>
                    <Descriptions.Item label="Currency">{withdrawal.currency}</Descriptions.Item>
                    <Descriptions.Item label="Wallet Address">{withdrawal.walletAddress}</Descriptions.Item>
                    <Descriptions.Item label="Status">
                        {editMode ? (
                            <Select
                                value={localWithdrawal.status}
                                onChange={(value) =>
                                    setLocalWithdrawal({ ...localWithdrawal, status: value as Withdrawal['status'] })
                                }
                                options={statusOptions.map((option) => ({
                                    label: option,
                                    value: option,
                                }))}
                            />
                        ) : (
                            getStatusBadge(withdrawal.status)
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {new Date(withdrawal.createdAt).toLocaleString()}
                    </Descriptions.Item>
                </Descriptions>
                <div className="mt-4 flex gap-4">
                    {editMode ? (
                        <>
                            <Button
                                type="primary"
                                onClick={handleSave}
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : <><SaveOutlined /> Save</>}
                            </Button>
                            <Button
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                {loading ? 'Cancelling...' : <><CloseOutlined /> Cancel</>}
                            </Button>
                        </>
                    ) : (
                        <Button onClick={handleEdit}>
                            <EditOutlined /> Edit
                        </Button>
                    )}
                </div>
            </Card>
        </div>
    );
};

const WithdrawalManager = ({ withdrawals, fetchData }: any) => {
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState<any>({
        pageSize: 10,
        current: 1,
    });
    const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);

    const handleTableChange = (newPagination: any) => {
        setPaginationInfo(newPagination);
    };

    const handleViewDetails = (withdrawal: Withdrawal) => {
        setSelectedWithdrawal(withdrawal);
    };

    const handleBackToList = () => {
        setSelectedWithdrawal(null);
    };

    const handleWithdrawalUpdate = () => {
        // Refresh the withdrawal list after an update
        fetchData();
    };

    const columns: ColumnsType<Withdrawal> = [
        {
            title: 'User',
            dataIndex: ['userId', 'name'],
            render: (_, record) => record.userId.name,
            sorter: (a, b) => a.userId.name.localeCompare(b.userId.name),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            sorter: (a, b) => a.currency.localeCompare(b.currency),
        },
        {
            title: 'Wallet Address',
            dataIndex: 'walletAddress',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: Withdrawal['status']) => {
                switch (status) {
                    case 'PENDING':
                        return <Badge status="processing" text="Pending" />;
                    case 'APPOVED':
                        return <Badge status="success" text="Approved" />;
                    case 'FAILED':
                        return <Badge status="error" text="Failed" />;
                    case 'DECLINED':
                        return <Badge status="error" text="Declined" />;
                    default:
                        return <Badge text="Unknown" />;
                }
            },
            sorter: (a, b) => a.status.localeCompare(b.status),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (text) => new Date(text).toLocaleString(),
            sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
        },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button size="small" onClick={() => handleViewDetails(record)}>
                        View
                    </Button>
                </Space>
            ),
        },
    ];

    const filteredWithdrawals = React.useMemo(() => {
        return withdrawals.filter((withdrawal: any) => {
            const searchTermLower = searchText.toLowerCase();
            return (
                withdrawal.userId.name.toLowerCase().includes(searchTermLower) ||
                withdrawal.userId.email.toLowerCase().includes(searchTermLower) ||
                withdrawal.currency.toLowerCase().includes(searchTermLower) ||
                withdrawal.walletAddress.toLowerCase().includes(searchTermLower) ||
                withdrawal.status.toLowerCase().includes(searchTermLower) ||
                String(withdrawal.amount).includes(searchTermLower)
            );
        });
    }, [withdrawals, searchText]);

    if (selectedWithdrawal) {
        return (
            <WithdrawalDetails
                withdrawal={selectedWithdrawal}
                onBack={handleBackToList}
                onUpdate={handleWithdrawalUpdate}
            />
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Withdrawal Management</h2>
            </div>
            <Table
                columns={columns}
                dataSource={filteredWithdrawals}
                rowKey="_id"
                loading={loading}
                pagination={paginationInfo}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default WithdrawalManager;
