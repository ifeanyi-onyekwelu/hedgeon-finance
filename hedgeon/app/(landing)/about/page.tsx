import BreadcrumbsSection from '@/components/public/Breadcrumb'
import {
    Check, TrendingUp, Globe, BarChart, ArrowRight, Target, Eye, ShieldCheck, Cpu, User,
    Activity, Leaf, Lock, Sparkles, Rocket
} from 'lucide-react'
import React from 'react'
function About() {
    return (
        <div className="min-h-screen bg-gray-50">
            <BreadcrumbsSection
                title="About Us"
                description="Explore the latest advancements in web technologies and best practices for building scalable applications in 2024."
            />

            {/* Company Overview */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Text Content */}
                        <div className="space-y-6 relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100/50 rounded-full blur-xl"></div>
                            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
                                Trusted Since 2002
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Pioneering Smarter <span className="text-primary">Wealth Management</span>
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Hedgeon Finance LLC combines decades of market expertise with cutting-edge technology to deliver innovative investment solutions. Our multi-strategy approach spans global markets, leveraging quantitative analysis and fundamental research to optimize returns while maintaining rigorous risk management protocols.
                            </p>
                            <button className="mt-4 inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors">
                                Explore Our History
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </button>
                        </div>

                        {/* Stats Card */}
                        <div className="bg-gradient-to-br from-primary to-indigo-600 p-8 rounded-2xl shadow-xl relative overflow-hidden">
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                            <h3 className="text-2xl font-bold text-white mb-8">By The Numbers</h3>
                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white text-primary p-3 rounded-lg">
                                            <TrendingUp className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-white">20+</p>
                                            <p className="text-gray-200">Years Experience</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white text-primary p-3 rounded-lg">
                                            <Globe className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-white">10k+</p>
                                            <p className="text-gray-200">Global Clients</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white text-primary p-3 rounded-lg">
                                            <BarChart className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-white">$15B+</p>
                                            <p className="text-gray-200">Assets Managed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="relative py-20 md:py-28 bg-gradient-to-br from-gray-900 to-blue-900 overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/graph-pattern.svg')" }}></div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                        <div className="bg-white/5 p-8 lg:p-12 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-green-400/10 p-4 rounded-xl">
                                    <Target className="w-8 h-8 text-green-400" />
                                </div>
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                                    Our Mission
                                </h3>
                            </div>
                            <p className="text-lg text-gray-200 leading-relaxed">
                                Empower global investors with AI-driven strategies and institutional-grade risk management,
                                delivering sustainable wealth creation through innovative financial solutions.
                            </p>
                        </div>

                        <div className="bg-white/5 p-8 lg:p-12 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-blue-400/10 p-4 rounded-xl">
                                    <Eye className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Our Vision
                                </h3>
                            </div>
                            <p className="text-lg text-gray-200 leading-relaxed">
                                Redefine global wealth management through quantum computing and blockchain technology,
                                becoming the most trusted name in next-generation financial services by 2030.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 md:py-28 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full text-sm font-semibold mb-4">
                            Philosophy
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Pillars of Excellence
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Foundational principles driving our relentless pursuit of financial innovation
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Algorithmic Integrity',
                                desc: 'Ethical AI models with explainable decision-making',
                                icon: ShieldCheck,
                                color: 'text-green-500'
                            },
                            {
                                title: 'Quantum Strategy',
                                desc: 'Next-generation portfolio optimization',
                                icon: Cpu,
                                color: 'text-purple-500'
                            },
                            {
                                title: 'Client Sovereignty',
                                desc: 'Personalized wealth ecosystems',
                                icon: User,
                                color: 'text-blue-500'
                            },
                            {
                                title: 'Risk Intelligence',
                                desc: 'Real-time systemic threat analysis',
                                icon: Activity,
                                color: 'text-red-500'
                            },
                            {
                                title: 'Sustainable Growth',
                                desc: 'ESG-focused capital allocation',
                                icon: Leaf,
                                color: 'text-emerald-500'
                            },
                            {
                                title: 'Blockchain Security',
                                desc: 'Immutable transaction ledgers',
                                icon: Lock,
                                color: 'text-amber-500'
                            },
                        ].map((value, idx) => (
                            <div
                                key={idx}
                                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-2"
                            >
                                <div className={`mb-6 ${value.color}`}>
                                    <value.icon className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-900 to-blue-900 overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('/grid-pattern.svg')" }}></div>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-block bg-white/5 px-6 py-2 rounded-full backdrop-blur-sm mb-6">
                        <Sparkles className="w-6 h-6 text-yellow-400 inline-block mr-2" />
                        <span className="text-yellow-400 font-medium">Future-Ready Investing</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Pioneer the Next Frontier of Wealth Creation
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Join our exclusive network accessing quantum-powered portfolios and
                        AI-driven market insights
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl transition-all hover:scale-[1.02]">
                            <Rocket className="w-5 h-5 inline-block mr-2 -mt-1" />
                            Launch Portfolio
                        </button>
                        <button className="border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:border-white/40 transition-all">
                            Schedule Quantum Consultation
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}


export default About
