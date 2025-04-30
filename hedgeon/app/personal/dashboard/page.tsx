'use client';
import { useState, useEffect } from 'react';
import {
    FiDollarSign, FiActivity, FiTrendingUp,
    FiChevronRight, FiList, FiGift, FiRepeat, FiStar, FiArrowUpRight
} from 'react-icons/fi';
import dynamic from 'next/dynamic';
import { useUser } from '@/context/UserContext';
import TransactionAndWithdrawalSection from './TransactionAndWithdrawSection';
import { getPlansApi } from '@/app/api/planApi';
import MarketInsightSection from './MarketInsightSection';
import Link from 'next/link';

// Lazy load charts for better performance
const PortfolioChart = dynamic(() => import('./PortfolioChart'), { ssr: false });
const RiskMeter = dynamic(() => import('./RiskMeter'), { ssr: false });

// Dummy data for demonstration purposes
const upcomingPayouts = [
    { fund: 'Growth Fund Alpha', amount: '$150.00', date: 'May 5, 2025' },
    { fund: 'Tech Innovation ETF', amount: '$75.50', date: 'May 12, 2025' },
];

const recentTransactions = [
    { type: 'Investment', fund: 'Blue Chip Stocks', amount: '+$500.00', date: 'Apr 15, 2025' },
    { type: 'Withdrawal', amount: '-$100.00', date: 'Apr 10, 2025' },
    { type: 'Fee', description: 'Management Fee', amount: '-$2.50', date: 'Apr 5, 2025' },
];

const recommendedFunds = [
    { name: 'Balanced Growth Portfolio', risk: 'Moderate', returns: '+8.7%', link: '#' },
    { name: 'Emerging Tech Fund', risk: 'High', returns: '+12.5%', link: '#' },
];

const PersonalDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeView, setActiveView] = useState('overview');
    const { user } = useUser();
    const [plans, setPlans] = useState<any[]>([])

    const fetchData = async () => {
        try {
            const response = await getPlansApi()
            setPlans(response.data['plans']);
        } catch (err) {
            console.error("Error fetching plans:", err);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="bg-gray-50 py-8 px-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Investment Dashboard</h1>
            <section className="space-y-6">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                        title="Total Invested"
                        value={`$${user?.totalInvested}`}
                        change="+2.4%"
                        icon={<FiDollarSign />}
                        color="bg-blue-100"
                    />
                    <MetricCard
                        title="Net Returns"
                        value={`$${user?.netReturns}`}
                        change="+5.1%"
                        icon={<FiTrendingUp />}
                        color="bg-green-100"
                    />
                    <MetricCard
                        title="Withdrawable"
                        value={`$${user?.walletBalance}`}
                        change="+1.2%"
                        icon={<FiActivity />}
                        color="bg-purple-100"
                    />
                </div>

                {/* Portfolio Performance Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Portfolio Performance</h2>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">1M</button>
                            <button className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors">1Y</button>
                            <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">All</button>
                        </div>
                    </div>
                    <div className="h-72">
                        <PortfolioChart />
                    </div>
                </div>

                {/* <MarketInsightSection /> */}

                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center space-x-2">
                            <FiGift className="text-xl text-gray-500" />
                            <span>Upcoming Payouts & Dividends</span>
                        </h2>
                        {upcomingPayouts.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {upcomingPayouts.map((payout, index) => (
                                    <li key={index} className="py-3 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">{payout.fund}</p>
                                            <p className="text-sm text-gray-500">{payout.date}</p>
                                        </div>
                                        <span className="font-semibold text-green-600">{payout.amount}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No upcoming payouts or dividends.</p>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center space-x-2">
                            <FiRepeat className="text-xl text-gray-500" />
                            <span>Recent Transactions</span>
                        </h2>
                        {recentTransactions.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {recentTransactions.map((transaction, index) => (
                                    <li key={index} className="py-3 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-800">{transaction.type}</p>
                                            {transaction.fund && <p className="text-sm text-gray-500">{transaction.fund}</p>}
                                            {transaction.description && <p className="text-sm text-gray-500">{transaction.description}</p>}
                                        </div>
                                        <span className={`font-semibold ${transaction.type === 'Withdrawal' || transaction.type === 'Fee' ? 'text-red-600' : 'text-green-600'}`}>{transaction.amount}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No recent transactions to display.</p>
                        )}
                    </div>
                </div> */}

                {/* Recommended Funds */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center space-x-2">
                        <FiStar className="text-xl text-yellow-500" />
                        <span>Recommended Funds</span>
                    </h2>
                    {plans.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {plans
                                .sort(() => 0.5 - Math.random()) // Shuffle the array
                                .slice(0, 3).map((plan, index) => (
                                    <div key={index} className="border rounded-xl p-4 hover:shadow-md transition-shadow">
                                        <h3 className="font-semibold text-gray-800">{plan.name}</h3>
                                        <p className="text-sm text-gray-500">Risk: <span className="font-medium">{plan.riskLevel}</span></p>
                                        <p className="text-sm text-green-600">Returns: <span className="font-medium">{plan.estimatedROI}%</span></p>
                                        <a href={`explore/${plan._id}`} className="inline-flex items-center text-blue-500 hover:underline mt-2 text-sm">
                                            View Details <FiArrowUpRight className="ml-1" />
                                        </a>
                                    </div>

                                ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No plan recommendations available based on your risk profile.</p>
                    )}
                </div>

                {/* Explore More Funds */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center space-x-2">
                        <FiList className="text-xl text-green-500" />
                        <span>Explore More Funds</span>
                    </h2>
                    <p className="text-gray-600 mb-4">Browse available investment opportunities and manage your portfolio.</p>
                    <Link href="/personal/explore" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                        View All Funds
                    </Link>
                </div>

                <TransactionAndWithdrawalSection walletBalance={user?.walletBalance} />
            </section>
        </div>
    );
};

const MetricCard = ({ title, value, change, icon, color }: any) => (
    <div className="bg-white p-6 rounded-md shadow-sm hover:shadow-md transition-shadow border border-gray-200">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-600 mb-2">{title}</p>
                <p className="text-2xl font-bold text-gray-800 mb-2">{value}</p>
                <span className={`text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {change} vs last month
                </span>
            </div>
            <div className={`${color} p-3 rounded-md text-white flex items-center justify-center`}>
                <span className="text-xl">{icon}</span>
            </div>
        </div>
    </div>
);

export default PersonalDashboard;