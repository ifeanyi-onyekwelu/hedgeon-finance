'use client'

import { useState } from 'react';
import { FiChevronDown, FiActivity, FiRepeat, FiFileText } from 'react-icons/fi';

const InvestmentList = () => {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    return (
        <div className="p-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Investments</h1>

                {/* Active Investments */}
                <div className="mb-12">
                    <h2 className="text-xl font-semibold mb-6">Active Investments</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map(id => (
                            <div key={id} className="bg-white rounded-xl shadow-sm">
                                <div className="p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                                    onClick={() => setExpandedId(expandedId === id ? null : id)}
                                >
                                    <div>
                                        <h3 className="font-semibold">Global Tech Growth Fund</h3>
                                        <p className="text-gray-500 text-sm">Invested: $15,000</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                            <p className="text-green-600 font-semibold">+18.4%</p>
                                            <p className="text-sm text-gray-500">Current Value: $17,760</p>
                                        </div>
                                        <FiChevronDown className={`transform transition-transform ${expandedId === id ? 'rotate-180' : ''
                                            }`} />
                                    </div>
                                </div>

                                {expandedId === id && (
                                    <div className="p-6 border-t">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-medium mb-4 flex items-center">
                                                    <FiActivity className="mr-2" /> Performance
                                                </h4>
                                                <div className="h-32 bg-gray-100 rounded-lg animate-pulse" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-4 flex items-center">
                                                    <FiRepeat className="mr-2" /> Auto-Reinvestment
                                                </h4>
                                                <label className="flex items-center space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        className="form-switch h-5 w-10 rounded-full bg-gray-200 checked:bg-blue-500 transition-colors"
                                                    />
                                                    <span>Reinvest Dividends Automatically</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentList;