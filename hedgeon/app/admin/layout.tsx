'use client';

import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    LogoutOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/navigation'; // Import useRouter
import ProtectedLayout from '../ProtectedLayout';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Dashboard', '/admin/dashboard ', <PieChartOutlined />), // Use routes as keys
    getItem('Users', '/admin/users', <TeamOutlined />),
    getItem('Investments', '/admin/investments', <DesktopOutlined />),
    getItem('KYC', '/admin/kyc', <FileOutlined />),
    getItem('Plans', '/admin/plans', <FileOutlined />),
    getItem('Transactions', '/admin/transactions', <FileOutlined />, [getItem('Withdrawals', '/admin/transactions/withdrawals'), getItem('Payouts Tracker', '/admin/transactions/payouts'),]),
    getItem('Account', '', <UserOutlined />, [getItem('Profile', '/admin/account/profile'), getItem('Change Password', '/admin/account/change-password'), getItem('Settings', '/admin/account/settings'),]),
    getItem('Logout', '/admin/logout', <LogoutOutlined color='red' />),
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const router = useRouter(); // Initialize useRouter

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        router.push(e.key); // Navigate to the clicked menu item's key (which is the route)
    };

    return (
        <ProtectedLayout allowedRoles={['admin']}>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={['/admin/dashboard']} // Set the initial selected key to a route
                        mode="inline"
                        items={items}
                        onClick={handleMenuClick} // Add the onClick handler
                    />
                </Sider>
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            {children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Hedgeon Finance ©{new Date().getFullYear()}
                    </Footer>
                </Layout>
            </Layout>
        </ProtectedLayout>
    );
};

export default AdminLayout;