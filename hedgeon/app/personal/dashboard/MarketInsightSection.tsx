import React from 'react';
import {
    FiTrendingUp,
    FiActivity,
    FiDollarSign,
    FiFileText,
    FiArrowUpRight,
    FiBarChart2,
    FiClock,
    FiDownloadCloud
} from 'react-icons/fi';

const MarketInsightSection = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <FiTrendingUp className="w-8 h-8 text-indigo-600" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Market Insights & Analysis
                </h2>
            </div>

            {/* Market Trends */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <FiActivity className="text-indigo-600" />
                        Real-Time Market Trends
                    </h3>
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                        Explore Trends
                        <FiArrowUpRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Sentiment Card */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-sm font-medium text-green-800 mb-1">Market Sentiment</h4>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-green-600">72%</span>
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                        Bullish
                                    </span>
                                </div>
                            </div>
                            <FiBarChart2 className="w-12 h-12 text-green-200" />
                        </div>
                        <div className="mt-4 h-2 bg-green-100 rounded-full overflow-hidden">
                            <div className="w-3/4 h-full bg-green-500"></div>
                        </div>
                    </div>

                    {/* Sectors Card */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Top Performing Sectors</h4>
                        <div className="space-y-3">
                            {['Technology', 'Healthcare', 'Energy'].map((sector, index) => (
                                <div key={sector} className="flex items-center justify-between">
                                    <span className="text-gray-600">{sector}</span>
                                    <span className={`text-sm font-medium ${index === 0 ? 'text-green-600' : 'text-gray-500'}`}>
                                        +{4.5 - index * 1.2}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Economic Indicators */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <FiDollarSign className="text-indigo-600" />
                        Key Economic Indicators
                    </h3>
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                        View History
                        <FiArrowUpRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { label: 'Inflation Rate', value: '3.2%', trend: 'up' },
                        { label: 'Interest Rate', value: '5.5%', trend: 'neutral' },
                        { label: 'GDP Growth', value: '1.8%', trend: 'down' }
                    ].map((indicator) => (
                        <div key={indicator.label} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-gray-700">{indicator.label}</h4>
                                <span className={`text-sm ${indicator.trend === 'up' ? 'text-green-600' :
                                        indicator.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                                    }`}>
                                    {indicator.trend === 'up' ? '↑' : indicator.trend === 'down' ? '↓' : '↔'}
                                </span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mt-2">{indicator.value}</p>
                            <div className="mt-3 text-sm text-gray-500 flex items-center gap-1">
                                <FiClock className="w-4 h-4" />
                                Updated 2h ago
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Market News */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <FiFileText className="text-indigo-600" />
                        Latest Market News
                    </h3>
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                        All News
                        <FiArrowUpRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        {
                            title: "Tech Stocks Rally on AI Breakthroughs",
                            source: "Financial Times",
                            timestamp: "45m ago",
                            trend: 'up'
                        },
                        {
                            title: "Fed Holds Rates Steady Amid Inflation Concerns",
                            source: "Bloomberg",
                            timestamp: "2h ago",
                            trend: 'neutral'
                        }
                    ].map((news) => (
                        <a
                            key={news.title}
                            href="#"
                            className="group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-indigo-200 transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="text-gray-900 font-medium group-hover:text-indigo-600 transition-colors">
                                        {news.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 mt-1">{news.source}</p>
                                </div>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${news.trend === 'up' ? 'bg-green-100 text-green-800' :
                                        news.trend === 'down' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {news.trend === 'up' ? 'Positive' : news.trend === 'down' ? 'Negative' : 'Neutral'}
                                </span>
                            </div>
                            <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
                                <FiClock className="w-4 h-4" />
                                {news.timestamp}
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* Reports Section */}
            <section className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6">
                <div className="flex items-center justify-between text-white">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Q2 2024 Market Report</h3>
                        <p className="text-sm opacity-90">Comprehensive analysis of global market trends</p>
                    </div>
                    <button className="bg-white/10 hover:bg-white/20 px-5 py-2 rounded-lg transition-colors flex items-center gap-2">
                        <FiDownloadCloud className="w-5 h-5" />
                        Download PDF
                    </button>
                </div>
            </section>
        </div>
    );
};

export default MarketInsightSection;