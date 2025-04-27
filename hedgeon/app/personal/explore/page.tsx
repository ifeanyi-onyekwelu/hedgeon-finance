'use client';

import React, { useEffect, useState } from 'react';
import { getPlansApi } from '../../api/planApi';
import {
    FiClock, FiTrendingUp, FiShield, FiGift, FiTag
} from 'react-icons/fi';
import Link from 'next/link';

export interface InvestmentPlan {
    _id: string;
    name: string;
    minAmount: number;
    maxAmount: number;
    durationMonths: number;
    estimatedROI: number;
    taxOnProfit: number;
    referralBonus: number;
    riskLevel: string;
    benefits: string[];
}

const InvestmentsPage = () => {
    const [plans, setPlans] = useState<InvestmentPlan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await getPlansApi();
                setPlans(response.data['plans']);
            } catch (error) {
                console.error('Error fetching plans:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const riskLevelColors = {
        CONSERVATIVE: 'bg-green-100 text-green-700 border-green-200',
        MODERATE: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        AGGRESSIVE: 'bg-red-100 text-red-700 border-red-200',
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    Explore Investment Opportunities
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg border border-gray-200"
                        >
                            {plan.name === "Premium Package" && (
                                <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                                    Popular
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">{plan.name}</h3>
                                <div className="flex items-center space-x-2 mb-2">
                                    <FiShield className={`w-5 h-5 ${riskLevelColors[plan.riskLevel]?.split(' ')[1]}`} />
                                    <span className={`text-sm font-medium ${riskLevelColors[plan.riskLevel]?.split(' ')[1]}`}>
                                        {plan.riskLevel} Risk
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">Invest between <span className="font-semibold">${plan.minAmount.toLocaleString()}</span> and <span className="font-semibold">${plan.maxAmount.toLocaleString()}</span> for a duration of <span className="font-semibold">{plan.durationMonths} months</span>.</p>

                                <div className="py-3 border-t border-b border-gray-200 mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-500"><FiTrendingUp className="inline mr-1" /> Est. ROI:</span>
                                        <span className="font-semibold text-green-600">{plan.estimatedROI}% APR</span>
                                    </div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-500"><FiTag className="inline mr-1" /> Tax on Profit:</span>
                                        <span className="font-semibold text-gray-700">{plan.taxOnProfit}%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500"><FiGift className="inline mr-1" /> Referral Bonus:</span>
                                        <span className="font-semibold text-blue-600">{plan.referralBonus}%</span>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Benefits</h4>
                                    <ul className="list-disc pl-5 text-gray-600 text-sm">
                                        {plan.benefits.slice(0, 3).map((benefit, index) => (
                                            <li key={index}>{benefit}</li>
                                        ))}
                                        {plan.benefits.length > 3 && <li className="text-blue-500 cursor-pointer hover:underline"><Link href={`explore/${plan._id}`}>See More</Link></li>}
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 border-t border-gray-200">
                                <Link href={`explore/invest/${plan._id}`} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-sm transition-colors flex items-center justify-center">
                                    Invest Now
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InvestmentsPage;