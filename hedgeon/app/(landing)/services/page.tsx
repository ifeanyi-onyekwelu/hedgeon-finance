import BreadcrumbsSection from '@/components/public/Breadcrumb'
import React from 'react'
import {
    PieChart, Check, ArrowRight, Briefcase, Building2,
    DollarSign,
    UserPlus,
} from "lucide-react"
import Link from 'next/link'

function page() {
    const whyPMSItems = [
        {
            title: 'Dedicated Portfolio Composition', description: 'Client’s portfolio is managed individually as per investment goals'
        },
        {
            title: 'Monitoring/ Swift decision making', description: 'There is no need for investor to follow the market fluctuations on continuous basis'
        },
        {
            title: 'Flexibility', description: 'Complete flexibility to Switch between equity or debt or liquid funds'
        },
        {
            title: 'Control & Transparency', description: 'Access to back office gives absolute information on the portfolio and transactions.'
        },
        {
            title: 'Knowledge Sharing', description: 'Better interaction with fund management team provides regular updates on the changing dynamics of the equity markets'
        },
        {
            title: 'Ownership', description: 'All transactions done in the client’s account so ownership remains with client'
        },
    ]

    const fundTypes = ['Equity funds', 'Growth and Value Funds', 'Large - Cap and Small - Cap Funds', 'Bond Fund', 'Foreign Stocks Funds', 'Money Market Funds', 'Sector Funds & Asset Allocation Funds) & IPOs']

    const merchantServices = [
        {
            title: 'Crypto Brokerage Service',
            description: 'Verified merchants can help investors buy and sell crypto, earning commissions while ensuring transaction security.'
        },
        {
            title: 'Business Loans & Credit Facilities',
            description: 'Loans are offered for entrepreneurs and businesses using their investment portfolios as collateral.'
        }
    ]

    const copyTrading = [
        {
            title: 'Copy Trading',
            description: 'Automatically replicate trades of our expert traders in real-time—ideal for both novice investors and busy professionals.'
        },
        {
            title: 'Trading Signal Subscription',
            description: 'Receive daily and weekly market signals with actionable trade setups for forex, stocks, and crypto. Get clear entry, exit, and stop loss levels along with detailed market insights and strategy reports.'
        },
    ]

    const realEstateBenefits = [
        'Earn passive income through rental yields',
        'Capital appreciation as property values increase',
        'Hands-off management – we handle property acquisition, tenant management, and maintenance.'
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <BreadcrumbsSection
                title="Services"
            />

            <section className="space-y-24 py-20 bg-gradient-to-b from-slate-950 via-sky-950 to-indigo-950">
                <div className="max-w-7xl mx-auto px-6 space-y-20">
                    {/* PMS Section */}
                    <div className="relative bg-gradient-to-br from-slate-800/50 to-blue-900/30 rounded-[3rem] p-12 border border-sky-800/30 shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                        <div className="relative z-10">
                            <div className="flex items-start gap-6 mb-8">
                                <div className="bg-sky-400/10 p-4 rounded-2xl border border-sky-400/20">
                                    <PieChart className="w-12 h-12 text-sky-400" />
                                </div>
                                <div>
                                    <h2 className="text-4xl font-bold bg-gradient-to-r from-sky-300 to-cyan-400 bg-clip-text text-transparent mb-2">
                                        Portfolio Management Services (PMS)
                                    </h2>
                                    <div className="h-1 w-24 bg-sky-400/30 rounded-full mb-6"></div>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="bg-slate-900/40 p-8 rounded-2xl border border-sky-800/30">
                                        <h3 className="text-2xl font-semibold text-sky-300 mb-4">What is PMS?</h3>
                                        <p className="text-slate-300 leading-relaxed">
                                            Portfolio Management Services (PMS) is an investment portfolio in stocks, fixed income, debt, cash, structured products and other individual securities, managed by a professional money manager that can potentially be tailored to meet specific investment objectives. When one invests in PMS, the investor owns individual securities. You have the freedom and flexibility to tailor the portfolio to address personal preferences and financial goals. Although portfolio managers may oversee hundreds of portfolios, each individual account may be unique.
                                        </p>
                                    </div>

                                    <Link href="/auth/signup" className="w-full bg-primary text-white">
                                        <span className="flex items-center justify-center gap-3">
                                            Open Live Account
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Link>
                                </div>

                                <div className="bg-slate-900/40 p-8 rounded-2xl border border-sky-800/30">
                                    <h3 className="text-2xl font-semibold text-emerald-300 mb-6">Why PMS?</h3>
                                    <ul className="space-y-6">
                                        {whyPMSItems.map((item, index) => (
                                            <li key={index} className="flex items-start gap-4 group">
                                                <div className="w-8 h-8 bg-emerald-400/10 rounded-lg flex items-center justify-center mt-1">
                                                    <Check className="w-5 h-5 text-emerald-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-slate-100 font-medium mb-1">{item.title}</h4>
                                                    <p className="text-slate-300/90">{item.description}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mutual Funds & IPOs */}
                    <div className="bg-slate-900/40 p-12 rounded-3xl border border-purple-800/30 shadow-xl">
                        <div className="flex items-center gap-6 mb-10">
                            <DollarSign className="w-12 h-12 text-purple-400" />
                            <h2 className="text-4xl font-bold text-purple-200">Mutual Funds & IPOs</h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 mb-12">
                            <p className="text-slate-300 leading-relaxed">
                                Mutual Funds and Initial Public Offerings (IPOs) offer an opportunity to invest in a diversified, professionally managed basket of securities at a relatively low cost. They provide liquidity and transparency while helping you build a diversified portfolio.
                            </p>
                            <p className="text-gray-400 mb-4 leading-relaxed">
                                Fundacion Finance provides comprehensive transaction support for primary market investments via mutual funds and IPOs. We offer personalized services for a range of mutual funds, including Equity funds, Growth and Value Funds, Large-Cap and Small-Cap Funds, Bond Funds, Foreign Stock Funds, Money Market Funds, Sector Funds, and Asset Allocation Funds.
                            </p>
                            <div className="bg-slate-800/30 p-6 rounded-xl">
                                <h4 className="text-lg font-semibold text-purple-300 mb-4">Fund Types We Offer:</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {fundTypes.map((type) => (
                                        <div key={type} className="flex items-center gap-2 text-slate-300">
                                            <Check className="w-4 h-4 text-emerald-400" />
                                            {type}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Merchant Program */}
                    <div className="bg-gradient-to-br from-slate-900 to-emerald-900/20 p-12 rounded-3xl border border-emerald-800/30">
                        <div className="flex items-center gap-6 mb-10">
                            <Briefcase className="w-12 h-12 text-emerald-400" />
                            <h2 className="text-4xl font-bold text-emerald-200">Merchant Program & Services</h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 mb-12">
                            <p className="text-slate-300 leading-relaxed">
                                Our highly qualified and experienced staff provide independent advice on key financial services, including pensions, inheritance tax, life assurance and protection, health insurance, employee benefits, investments, business protection, and wealth planning. We help companies pivot into more profitable directions, expand and grow, and correct past mistakes to optimize their ventures.
                            </p>
                            <div className="space-y-8">
                                {merchantServices.map((service) => (
                                    <div key={service.title} className="bg-slate-800/30 p-6 rounded-xl border border-emerald-800/30">
                                        <h4 className="text-lg font-semibold text-emerald-300 mb-3">{service.title}</h4>
                                        <p className="text-slate-300">{service.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-emerald-900/20 p-12 rounded-3xl border border-emerald-800/30">
                        <div className="flex items-center gap-6 mb-10">
                            <Briefcase className="w-12 h-12 text-emerald-400" />
                            <h2 className="text-4xl font-bold text-emerald-200">Copy Trading & Signal Subscription Service</h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 mb-12">
                            <p className="text-slate-300 leading-relaxed">
                                At Hedgeon Finance, we understand that not every investor has the time or expertise to actively trade in the markets. Our service allows you to benefit from expert trading strategies and market insights.
                            </p>
                            <div className="space-y-8">
                                {copyTrading.map((service) => (
                                    <div key={service.title} className="bg-slate-800/30 p-6 rounded-xl border border-emerald-800/30">
                                        <h4 className="text-lg font-semibold text-emerald-300 mb-3">{service.title}</h4>
                                        <p className="text-slate-300">{service.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Other Sections Similar Pattern */}

                    {/* Real Estate Section */}
                    <div className="bg-slate-900/40 p-12 rounded-3xl border border-amber-800/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/real-estate-pattern.svg')] opacity-10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-6 mb-10">
                                <Building2 className="w-12 h-12 text-amber-400" />
                                <h2 className="text-4xl font-bold text-amber-200">Real Estate Investment</h2>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-8 mb-12">
                                <div className="space-y-6">
                                    <p className="text-slate-300 leading-relaxed">
                                        At Hedgeon Finance, we offer strategic real estate investment services that allow you to diversify your portfolio with high-value property investments. Our expert-led approach ensures consistent returns, capital growth, and risk minimization.
                                    </p>
                                    <h3 className="text-2xl text-gray-300 mb-2 font-medium">How Our Real Estate Investment Works</h3>
                                    <ul className="list-disc pl-6 text-gray-400 space-y-2 mb-4">
                                        <li>
                                            Investors can own a share in income-generating properties such as commercial buildings, residential apartments, short-term rental properties (Airbnb-style investments), or land banking for future appreciation.
                                        </li>
                                    </ul>
                                    <div className="bg-slate-800/30 p-6 rounded-xl">
                                        <h4 className="text-lg font-semibold text-amber-300 mb-4">Investment Benefits</h4>
                                        <ul className="space-y-4">
                                            {realEstateBenefits.map((benefit) => (
                                                <li key={benefit} className="flex items-center gap-3 text-slate-300">
                                                    <Check className="w-5 h-5 text-amber-400" />
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Add property image gallery component here */}
                            </div>
                        </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="text-center py-16">
                        <div className="bg-slate-900/40 p-12 rounded-3xl border border-sky-800/30">
                            <h3 className="text-2xl font-semibold text-slate-100 mb-4">Need Specialized Assistance?</h3>
                            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                                Our financial experts are ready to help you navigate complex investment landscapes and find optimal solutions.
                            </p>
                            <button className="bg-gradient-to-r from-sky-500 to-cyan-600 px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all">
                                Contact Our Advisory Team
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default page
