'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Input, notification, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAllInvestmentsAdminApi } from '@/app/api/adminApi';
import InvestmentDetails from './InvestmentDetails';

const InvestmentManager = () => {
    const [investments, setInvestments] = useState<any[]>([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [paginationInfo, setPaginationInfo] = useState<any>({
        pageSize: 10,
        current: 1,
    });
    const [selectedInvestment, setSelectedInvestment] =
        useState<any>(null);

    const fetchInvestments = async () => {
        try {
            setLoading(true);
            const response = await getAllInvestmentsAdminApi();

            setInvestments(response.data);
            setPaginationInfo({
                ...paginationInfo,
                total: response.data,
            });
        } catch (error: any) {
            notification.error({
                message: 'Error',
                description: `Failed to fetch investments requests: ${error.message}`,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvestments();
    }, []);

    const handleSearch = (value: string) => {
        setSearchText(value);
        console.log('Searching:', value);
    };

    const handleTableChange = (newPagination: any) => {
        setPaginationInfo(newPagination);
    };

    const columns: ColumnsType<any> = [
        {
            title: 'User',
            dataIndex: ['user', 'name'], // Access nested user property
            render: (_, record) => record.user.name,
            sorter: (a, b) => a.user.name.localeCompare(b.user.name),
        },
        {
            title: 'Plan',
            dataIndex: 'name',
            render: (_, record) => record.plan.name,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            sorter: (a, b) =>
                new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            sorter: (a, b) =>
                new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
        },
        {
            title: 'Auto Reinvestment',
            dataIndex: 'autoReinvest',
            render: (text) => (text ? 'Yes' : 'No'),
        },
        {
            title: 'Is Reinvestment',
            dataIndex: 'isReinvestment',
            render: (text) => (text ? 'Yes' : 'No'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => {
                switch (status) {
                    case 'active':
                        return <Badge status="success" text="Active" />;
                    case 'paused':
                        return <Badge status="warning" text="Paused" />;
                    case 'completed':
                        return <Badge status="success" text="Completed" />;
                    case 'cancelled':
                        return <Badge status="error" text="Cancelled" />;
                    case 'pending':
                        return <Badge status="processing" text="Pending" />;
                    default:
                        return <Badge text="Unknown" />;
                }
            },
            sorter: (a, b) => a.status.localeCompare(b.status),
        },
        {
            title: 'ROI Accumulated',
            dataIndex: 'roiAccumulated',
            sorter: (a, b) => a.roiAccumulated - b.roiAccumulated,
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            sorter: (a, b) => a.currency.localeCompare(b.currency),
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

    const handleViewDetails = (investment: any) => {
        setSelectedInvestment(investment);
    };

    const handleBackToList: any = () => {
        setSelectedInvestment(null);
    };

    const handleInvestmentUpdate = () => {
        // Refresh the investment list after an update
        fetchInvestments();
    };

    const filteredInvestments = React.useMemo(() => {
        return investments.filter((investment) => {
            const searchTermLower = searchText.toLowerCase();
            return (
                investment.plan.name.toLowerCase().includes(searchTermLower) ||
                investment.status.toLowerCase().includes(searchTermLower) ||
                investment.user.name.toLowerCase().includes(searchTermLower) ||
                String(investment.investmentAmount).includes(searchTermLower) // Add more fields as needed
            );
        });
    }, [investments, searchText]);

    if (selectedInvestment) {
        return (
            <InvestmentDetails
                investment={selectedInvestment}
                onBack={handleBackToList}
                onUpdate={handleInvestmentUpdate}
            />
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Investment Management</h2>
                <Input.Search
                    placeholder="Search investment..."
                    onSearch={handleSearch}
                    className="w-3/4" // Make it visible
                />
            </div>
            <Table
                columns={columns}
                dataSource={filteredInvestments}
                rowKey="_id"
                loading={loading}
                pagination={paginationInfo}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default InvestmentManager;