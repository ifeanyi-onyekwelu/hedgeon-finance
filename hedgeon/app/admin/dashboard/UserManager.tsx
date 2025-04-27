'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Input, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SafeUser } from '@/types/user';
import { getAllUsersAdminApi } from '@/app/api/adminApi';

const UsersManager = () => {
    const [users, setUsers] = React.useState<SafeUser[]>([]);
    const [searchText, setSearchText] = React.useState('');
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ pageSize: 5, current: 1 });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllUsersAdminApi();
            console.log('Fetched users:', response.data);
            setUsers(response.data);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to fetch withdrawal requests'
            });
        } finally {
            setLoading(false);
        }
    };

    const columns: ColumnsType<SafeUser> = [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Phone', dataIndex: 'phone' },
        { title: 'KYC Status', dataIndex: 'kyc', render: kyc => kyc ? 'Verified' : 'Pending' },
        { title: 'Balance', dataIndex: 'walletBalance' },
        { title: 'Role', dataIndex: 'role' },
        {
            title: 'Actions',
            render: (_, record) => (
                <Space>
                    <Button size="small">View</Button>
                    <Button size="small" type="primary">Edit</Button>
                    <Button size="small" danger>Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Users Management</h2>
                <Input.Search
                    placeholder="Search users..."
                    onSearch={value => setSearchText(value)}
                    className="w-3/4 hidden"
                />
            </div>
            <Table
                columns={columns}
                dataSource={users.filter(u =>
                    u.name.includes(searchText) ||
                    u.email.includes(searchText)
                )}
                rowKey="_id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default UsersManager;