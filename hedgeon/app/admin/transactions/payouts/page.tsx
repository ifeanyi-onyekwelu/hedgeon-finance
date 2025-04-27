'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button, Input, notification, Card, Descriptions, Badge, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
    ArrowLeftOutlined,
    SaveOutlined,
    CloseOutlined,
    EditOutlined
} from '@ant-design/icons';
import {
    getAllPayoutTrackersAdminApi,
} from '@/app/api/adminApi'; //  adjust the path if necessary
import { StopCircleIcon } from 'lucide-react';


const updatePayoutTracker = async (id: string, updatedData: any) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log('Updating payout tracker', id, 'with', updatedData);
    // In a real application, you would make an API call here
    return { success: true, message: 'Payout tracker updated successfully' };
};

interface PayoutTracker {
    _id: string;
    userId: { _id: string; name: string; email: string };
    investmentId: { _id: string; amount: number; plan: { name: string } };
    expectedROI: number;
    paidROI: number;
    lastPaidAt: Date | null;
    status: string; // Added status
}

const PayoutTrackerDetails: React.FC<{
    payout: PayoutTracker;
    onBack: () => void;
    onUpdate: () => void;
}> = ({ payout, onBack, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [localPayout, setLocalPayout] = useState<PayoutTracker>(payout);
    const initialPayout = React.useRef<PayoutTracker>(payout);

    useEffect(() => {
        setLocalPayout(payout);
        initialPayout.current = payout;
    }, [payout]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const updatedData = {
                paidROI: localPayout.paidROI,
                lastPaidAt: localPayout.lastPaidAt,
                status: localPayout.status
            };
            const response = await updatePayoutTracker(payout._id, updatedData);
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
                    description: 'Failed to update payout tracker',
                });
            }
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: `Failed to update payout tracker: ${error.message}`,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        setLocalPayout(initialPayout.current);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return <Badge status="processing" text="Pending" />;
            case 'completed':
                return <Badge status="success" text="Completed" />;
            case 'active':
                return <Badge status="success" text="Active" />;
            case 'in progress':
                return <Badge status="processing" text="In Progress" />;
            default:
                return <Badge text="Unknown" />;
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <Button onClick={onBack} className="mb-4">
                <ArrowLeftOutlined /> Back to List
            </Button>

            <Card title="Payout Tracker Details">
                <Descriptions bordered>
                    <Descriptions.Item label="User">
                        {localPayout.userId.name} ({localPayout.userId.email})
                    </Descriptions.Item>
                    <Descriptions.Item label="Investment">
                        {localPayout.investmentId.plan.name} (Amount: {localPayout.investmentId.amount})
                    </Descriptions.Item>
                    <Descriptions.Item label="Expected ROI">{localPayout.expectedROI}</Descriptions.Item>
                    <Descriptions.Item label="Paid ROI">
                        {editMode ? (
                            <Input
                                type="number"
                                value={localPayout.paidROI}
                                onChange={(e) =>
                                    setLocalPayout({ ...localPayout, paidROI: Number(e.target.value) })
                                }
                            />
                        ) : (
                            localPayout.paidROI
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Paid At">
                        {editMode ? (
                            <Input
                                type="date"
                                value={localPayout.lastPaidAt ? new Date(localPayout.lastPaidAt).toISOString().split('T')[0] : ''}
                                onChange={(e) => {
                                    const date = e.target.value ? new Date(e.target.value) : null;
                                    setLocalPayout({ ...localPayout, lastPaidAt: date });
                                }}
                            />
                        ) : (
                            localPayout.lastPaidAt ? new Date(localPayout.lastPaidAt).toLocaleString() : 'N/A'
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                        {editMode ? (
                            <Input
                                type="text"
                                value={localPayout.status}
                                onChange={(e) =>
                                    setLocalPayout({ ...localPayout, status: e.target.value })
                                }
                            />
                        ) : (
                            getStatusBadge(localPayout.status)
                        )}
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

const PayoutTrackerManager = () => {
    const [payouts, setPayouts] = useState<PayoutTracker[]>([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState<any>({
        pageSize: 10,
        current: 1,
    });
    const [selectedPayout, setSelectedPayout] = useState<PayoutTracker | null>(null);

    const fetchPayouts = async () => {
        try {
            setLoading(true);
            const response = await getAllPayoutTrackersAdminApi();
            setPayouts(response.data);
            setPaginationInfo({
                ...paginationInfo,
                total: response.data.length, // Use length of fetched data
            });
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: `Failed to fetch payouts: ${error.message}`,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayouts();
    }, []);

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const handleTableChange = (newPagination: any) => {
        setPaginationInfo(newPagination);
    };

    const handleViewDetails = (payout: PayoutTracker) => {
        setSelectedPayout(payout);
    };

    const handleBackToList = () => {
        setSelectedPayout(null);
    };

    const handlePayoutUpdate = () => {
        // Refresh the investment list after an update
        fetchPayouts();
    };


    const columns: ColumnsType<PayoutTracker> = [
        {
            title: 'User',
            dataIndex: ['userId', 'name'],
            render: (_, record) => record.userId.name,
            sorter: (a, b) => a.userId.name.localeCompare(b.userId.name),
        },
        {
            title: 'Investment',
            dataIndex: ['investmentId', 'plan', 'name'],
            render: (_, record) => record.investmentId.plan.name,
            sorter: (a, b) => a.investmentId.plan.name.localeCompare(b.investmentId.plan.name),
        },
        {
            title: 'Expected ROI',
            dataIndex: 'expectedROI',
            sorter: (a, b) => a.expectedROI - b.expectedROI,
        },
        {
            title: 'Paid ROI',
            dataIndex: 'paidROI',
            sorter: (a, b) => a.paidROI - b.paidROI,
        },
        {
            title: 'Last Paid At',
            dataIndex: 'lastPaidAt',
            render: (text) => (text ? new Date(text).toLocaleString() : 'N/A'),
            sorter: (a, b) =>
                (a.lastPaidAt?.getTime() || 0) - (b.lastPaidAt?.getTime() || 0),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => {
                switch (status) {
                    case 'pending':
                        return <Badge status="processing" text="Pending" />;
                    case 'completed':
                        return <Badge status="success" text="Completed" />;
                    case 'active':
                        return <Badge status="success" text="Active" />;
                    case 'in progress':
                        return <Badge status="processing" text="In Progress" />;
                    default:
                        return <Badge text="Unknown" />;
                }
            },
            sorter: (a, b) => a.status.localeCompare(b.status),
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

    const filteredPayouts = React.useMemo(() => {
        return payouts.filter((payout) => {
            const searchTermLower = searchText.toLowerCase();
            return (
                payout.userId.name.toLowerCase().includes(searchTermLower) ||
                payout.userId.email.toLowerCase().includes(searchTermLower) ||
                payout.investmentId.plan.name.toLowerCase().includes(searchTermLower) ||
                payout.status.toLowerCase().includes(searchTermLower) ||
                String(payout.expectedROI).includes(searchTermLower) ||
                String(payout.paidROI).includes(searchTermLower)
            );
        });
    }, [payouts, searchText]);

    if (selectedPayout) {
        return (
            <PayoutTrackerDetails
                payout={selectedPayout}
                onBack={handleBackToList}
                onUpdate={handlePayoutUpdate}
            />
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Payout Tracker Management</h2>
            </div>
            <Table
                columns={columns}
                dataSource={filteredPayouts}
                rowKey="_id"
                loading={loading}
                pagination={paginationInfo}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default PayoutTrackerManager;
