'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Space, Input, notification, Badge, Card, Descriptions, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAllPlansAdminApi, updatePlanAdminApi } from '@/app/api/adminApi'; // Adjust the path as necessary
import Section from '@/components/admin/Section';
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';

interface IPlan {
    _id: string;
    name: string;
    minAmount: number;
    maxAmount: number;
    durationMonths: number;
    durationType: string;
    estimatedROI: number;
    taxOnProfit: number;
    referralBonus: number;
    riskLevel: 'CONSERVATIVE' | 'MODERATE' | 'AGGRESSIVE';
    benefits: string[];
    status: boolean;
    createdAt: Date;
}

interface PlanDetailsProps {
    plan: IPlan;
    onUpdate: (id: string, updatedPlan: Partial<IPlan>) => void; // Add onUpdate prop
    onBack: () => void; // Add onUpdate prop
}

const PlanDetails: React.FC<PlanDetailsProps> = ({ plan, onUpdate, onBack }) => {
    const [editMode, setEditMode] = useState(false);
    const [localPlan, setLocalPlan] = useState<IPlan>(plan);
    const initialPlan = useRef<IPlan>(plan);
    const [loading, setLoading] = useState(false); // Add loading state

    // Initialize localPlan and initialPlan when the plan prop changes
    useEffect(() => {
        setLocalPlan(plan);
        initialPlan.current = plan;
    }, [plan]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        try {
            setLoading(true); // Set loading to true before making the API call
            // Prepare the updated plan data
            const updatedPlanData: Partial<IPlan> = {
                name: localPlan.name,
                minAmount: localPlan.minAmount,
                maxAmount: localPlan.maxAmount,
                durationMonths: localPlan.durationMonths,
                durationType: localPlan.durationType,
                estimatedROI: localPlan.estimatedROI,
                taxOnProfit: localPlan.taxOnProfit,
                referralBonus: localPlan.referralBonus,
                riskLevel: localPlan.riskLevel,
                benefits: localPlan.benefits,
                status: localPlan.status,
            };

            // Call the onUpdate function to update the plan
            onUpdate(plan._id, updatedPlanData);

            notification.success({
                message: 'Success',
                description: 'Plan details updated successfully!',
            });
            setEditMode(false); // Exit edit mode after saving
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: `Failed to update plan details: ${error.message}`,
            });
        } finally {
            setLoading(false); // Set loading back to false
        }

    };

    const handleCancel = () => {
        setEditMode(false);
        setLocalPlan(initialPlan.current); // Reset to initial values
    };

    const benefitsOptions = [
        "Benefit 1",
        "Benefit 2",
        "Benefit 3",
        "Benefit 4",
        "Benefit 5",
    ];

    const riskLevelOptions = [
        "CONSERVATIVE",
        "MODERATE",
        "AGGRESSIVE"
    ]

    return (
        <Card title={`Plan Details for ${localPlan.name}`}>
            <Descriptions bordered>
                <Descriptions.Item label="Name">
                    {editMode ? (
                        <Input value={localPlan.name} onChange={(e) => setLocalPlan({ ...localPlan, name: e.target.value })} />
                    ) : (
                        localPlan.name
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Min Amount">
                    {editMode ? (
                        <Input type="number" value={localPlan.minAmount} onChange={(e) => setLocalPlan({ ...localPlan, minAmount: Number(e.target.value) })} />
                    ) : (
                        localPlan.minAmount
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Max Amount">
                    {editMode ? (
                        <Input type="number" value={localPlan.maxAmount} onChange={(e) => setLocalPlan({ ...localPlan, maxAmount: Number(e.target.value) })} />
                    ) : (
                        localPlan.maxAmount
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Duration (Months)">
                    {editMode ? (
                        <Input type="number" value={localPlan.durationMonths} onChange={(e) => setLocalPlan({ ...localPlan, durationMonths: Number(e.target.value) })} />
                    ) : (
                        localPlan.durationMonths
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Estimated ROI">
                    {editMode ? (
                        <Input type="number" value={localPlan.estimatedROI} onChange={(e) => setLocalPlan({ ...localPlan, estimatedROI: Number(e.target.value) })} />
                    ) : (
                        localPlan.estimatedROI
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Tax on Profit">
                    {editMode ? (
                        <Input type="number" value={localPlan.taxOnProfit} onChange={(e) => setLocalPlan({ ...localPlan, taxOnProfit: Number(e.target.value) })} />
                    ) : (
                        localPlan.taxOnProfit
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Referral Bonus">
                    {editMode ? (
                        <Input type="number" value={localPlan.referralBonus} onChange={(e) => setLocalPlan({ ...localPlan, referralBonus: Number(e.target.value) })} />
                    ) : (
                        localPlan.referralBonus
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Risk Level">
                    {editMode ? (
                        <Select
                            value={localPlan.riskLevel}
                            onChange={(value) => setLocalPlan({ ...localPlan, riskLevel: value as any })}
                            options={riskLevelOptions.map((option) => ({
                                label: option,
                                value: option,
                            }))}
                        />
                    ) : (
                        localPlan.riskLevel
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Benefits">
                    {editMode ? (
                        <Select
                            mode="multiple"
                            value={localPlan.benefits}
                            onChange={(values) => setLocalPlan({ ...localPlan, benefits: values })}
                            options={benefitsOptions.map((option) => ({
                                label: option,
                                value: option,
                            }))}
                        />
                    ) : (
                        localPlan.benefits.join(', ')
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                    {editMode ? (
                        <Select
                            value={localPlan.status}
                            onChange={(value) => setLocalPlan({ ...localPlan, status: value })}
                            options={[
                                { label: 'Active', value: true },
                                { label: 'Inactive', value: false },
                            ].map(option => ({ label: option.label, value: option.value }))}
                        />
                    ) : (
                        <Badge status={localPlan.status ? 'success' : 'error'} text={localPlan.status ? 'Active' : 'Inactive'} />
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Created At">
                    {new Date(localPlan.createdAt).toLocaleString()}
                </Descriptions.Item>
            </Descriptions>
            <div className="mt-4">
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
    );
};

const PlansManager = () => {
    const [plans, setPLANs] = useState<IPlan[]>([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState<any>({
        pageSize: 10,
        current: 1,
    });
    const [selectedPLAN, setSelectedPLAN] = useState<IPlan | null>(null);
    const [verificationStatus, setVerificationStatus] = useState<boolean | null>(null); // null for all, true, or false

    const fetchPLANs = async () => {
        try {
            setLoading(true);

            const response = await getAllPlansAdminApi()
            const responseData = await response.data;

            setPLANs(responseData); // Adjust based on your API response structure
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: error.message || 'Failed to fetch PLAN submissions',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPLANs();
    }, [])

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const planColumns: ColumnsType<IPlan> = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <strong>{text}</strong>, // Example of custom rendering
        },
        {
            title: 'Min Amount',
            dataIndex: 'minAmount',
            render: (value) => `$${value.toFixed(2)}`, // Format as currency
            sorter: (a, b) => a.minAmount - b.minAmount,
        },
        {
            title: 'Max Amount',
            dataIndex: 'maxAmount',
            render: (value) => `$${value.toFixed(2)}`, // Format as currency
            sorter: (a, b) => a.maxAmount - b.maxAmount,
        },
        {
            title: 'Duration (Months)',
            dataIndex: 'durationMonths',
            sorter: (a, b) => a.durationMonths - b.durationMonths,
        },
        {
            title: 'Estimated ROI',
            dataIndex: 'estimatedROI',
            render: (value) => `${(value * 100).toFixed(2)}%`, // Format as percentage
            sorter: (a, b) => a.estimatedROI - b.estimatedROI,
        },
        {
            title: 'Tax on Profit',
            dataIndex: 'taxOnProfit',
            render: (value) => `${(value * 100).toFixed(2)}%`, // Format as percentage
            sorter: (a, b) => a.taxOnProfit - b.taxOnProfit,
        },
        {
            title: 'Referral Bonus',
            dataIndex: 'referralBonus',
            render: (value) => `$${value.toFixed(2)}`, // Format as currency
            sorter: (a, b) => a.referralBonus - b.referralBonus,
        },
        {
            title: 'Risk Level',
            dataIndex: 'riskLevel',
            filters: [
                { text: 'Conservative', value: 'CONSERVATIVE' },
                { text: 'Moderate', value: 'MODERATE' },
                { text: 'Aggressive', value: 'AGGRESSIVE' },
            ],
            onFilter: (value, record) => record.riskLevel === value,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => (
                <Badge status={status ? 'success' : 'default'} text={status ? 'Active' : 'Inactive'} />
            ),
            filters: [
                { text: 'Active', value: true },
                { text: 'Inactive', value: false },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (value) => new Date(value).toLocaleDateString(), // Format date
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
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

    const handleViewDetails = (plan: IPlan) => {
        setSelectedPLAN(plan);
    };

    const handleBackToList = () => {
        setSelectedPLAN(null);
    };

    const handlePLANUpdate = () => {
        // Refresh the plan list after an update
        fetchPLANs();
    };


    if (selectedPLAN) {
        return (
            <PlanDetails
                plan={selectedPLAN}
                onBack={handleBackToList}
                onUpdate={handlePLANUpdate}
            />
        );
    }

    return (
        <Section>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">PLAN Management</h2>
                    <div className='flex gap-4'>
                        <Input.Search
                            placeholder="Search PLAN..."
                            onSearch={handleSearch}
                            className="w-3/4"
                        />
                    </div>
                </div>
                <Table
                    columns={planColumns}
                    dataSource={plans}
                    rowKey="_id"
                    loading={loading}
                    pagination={paginationInfo}
                />
            </div>
        </Section>
    );
};

export default PlansManager;
