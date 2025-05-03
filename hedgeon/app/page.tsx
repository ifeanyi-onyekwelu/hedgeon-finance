'use client'

import { ArrowRight, Check, PlayCircle } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { getAllPlansAdminApi } from './api/adminApi';
import { getPlansApi } from './api/planApi';
import formatNumberWithCommas from '@/utils/formatNumbersWithCommas'


function Home() {
    const features = [
        "Expert Investment Management",
        "Transparent Performance Tracking",
        "Real-Time ROI Monitoring",
        "Secure Crypto Transactions",
        "Diversified Portfolio Options",
        "24/7 Support & Consultation"
    ];

    const faqs = [
        { trigger: 'Is it accessible 1?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
        { trigger: 'Is it accessible 2?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
        { trigger: 'Is it accessible 3?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
    ]

    const expertise = [
        {
            image: "/images/hero-bg.jpg",
            title: "Trusted by Investor",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            offset: "md:top-0", // no offset
        },
        {
            image: "/images/hero-bg.jpg",
            title: "Trusted by Investor",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            offset: "md:-top-10",
        },
        {
            image: "/images/hero-bg.jpg",
            title: "Trusted by Investor",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            offset: "md:-top-20",
        },
    ];

    const [plans, setPlans] = useState<any[]>([])

    const fetchPlans = async () => {
        const response = await getPlansApi();
        console.log("Plans Response from api", response)
        setPlans(response.data['plans']);
    }

    useEffect(() => {
        fetchPlans();
    }, [])


    return (
        <>
            <section className="relative h-[80vh] min-h-screen w-full overflow-hidden">
                {/* Background with overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero-bg.jpg"
                        alt="Investment landscape"
                        layout="fill"
                        objectFit="cover"
                        className="brightness-90"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-primary/30" />
                </div>

                <div className="relative z-10 h-full flex items-center">
                    <div className="max-w-6xl mx-auto px-4 xl:px-0 w-full">
                        <div className="max-w-2xl space-y-8">
                            {/* Subheading with decorative line */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-0.5 bg-primary" />
                                <p className="text-lg font-semibold tracking-wide text-primary">
                                    SMART INVESTING
                                </p>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-gray-600">
                                <span className="text-white">
                                    Future-Focused
                                </span>{' '}
                                Wealth Management
                            </h1>

                            {/* Description */}
                            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed md:w-5/6">
                                Invest Smarter with Hedgeon Finance
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-6 mt-10">
                                <Link
                                    href="/auth/signup"
                                    className="relative inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                                >
                                    Sign Up
                                    <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
                                        <ArrowRight className="w-5 h-5" />
                                    </span>
                                </Link>

                                <Link
                                    href="#"
                                    className="inline-flex items-center px-8 py-4 text-white font-medium hover:text-gray-500 transition-colors group"
                                >
                                    <PlayCircle className="w-6 h-6 mr-2 text-primary group-hover:text-primary-dark" />
                                    Explore Funds
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center px-4">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <p className="text-4xl font-bold text-blue-900 mb-2">$2.1B+</p>
                        <p className="text-gray-600">Assets Under Management</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <p className="text-4xl font-bold text-green-500 mb-2">18.7%</p>
                        <p className="text-gray-600">Average Annual Returns</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <p className="text-4xl font-bold text-blue-900 mb-2">94%</p>
                        <p className="text-gray-600">Positive Performance Months</p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:space-x-10 md:space-y-0 space-y-10">
                        <div className="relative transform md:rotate-[-3deg]">
                            <Image
                                src="/images/hero-bg.jpg"
                                alt="James P. Morrison"
                                className="rounded-lg shadow-xl h-full w-full"
                                height={500}
                                width={400}
                            />

                            {/* Overlay badge */}
                            <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded shadow">
                                <h4 className="text-primary font-bold">James P. Morrison</h4>
                                <p className="text-sm">Chairman and CEO</p>
                            </div>
                        </div>

                        <div className="space-y-5 w-full md:w-1/2">
                            <h3 className="text-lg font-semibold text-primary">
                                Welcome To Hedgeon Finance
                            </h3>
                            <h1 className="text-3xl font-semibold">We Aim To Be The Best Invest Manager In The World</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-4 mb-4">
                                        <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="15"
                                                height="15"
                                                fill="currentColor"
                                                className="bi bi-check-circle-fill animate-pulse"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM7.247 11.14a.5.5 0 0 1-.707-.707l2-2a.5.5 0 0 1 .707.707l-2 2zm-.708-.708a.5.5 0 0 1 .708.708l-2-2a.5.5 0 1 1 .707-.707l2 2z" />
                                            </svg>
                                        </div>
                                        <p className='text-md'>{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative bg-gradient-to-br from-[#D8E3E7] to-[#c5d6dc] py-16 md:py-24 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48ZmlsdGVyIGlkPSduJyB4PScwJyB5PScwJz48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNuKScgb3BhY2l0eT0nMC4xJy8+PC9zdmc+')]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-6 md:space-y-8">
                        {/* Animated number */}
                        <div className="inline-flex items-end font-bold text-6xl md:text-7xl text-primary mb-4">
                            <span className="animate-float">+1200</span>
                            <sup className="text-2xl md:text-3xl font-medium ml-2">and counting</sup>
                        </div>

                        {/* Main heading */}
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            Trusted by Global
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Innovators
                            </span>
                        </h3>

                        {/* Supporting text */}
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Join thousands of businesses worldwide who've transformed their financial strategies with our expertise
                        </p>


                        {/* Trust badges */}
                        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                24/7 Customer Support
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                ISO 27001 Certified
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-4 xl:px-0 space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b-2 border-primary/20 pb-6">
                        <div className="mb-4 md:mb-0">
                            <h4 className="text-2xl font-bold text-primary-dark mb-2 relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-primary">
                                Our Expertise
                            </h4>
                        </div>
                        <Button
                            asChild
                            className="rounded-full px-8 py-6 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary hover:shadow-lg transition-all duration-300"
                        >
                            <Link href="/auth/signup" className="font-semibold text-white uppercase tracking-wide">
                                Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </div>

                    {/* Title Section */}
                    <div className="w-full md:w-4/5 space-y-4">
                        <h2 className="text-3xl font-bold text-primary mb-6">Why Choose Hedgeon Finance?</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            Empowering your financial future through innovative solutions and decades of market expertise.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        <div
                            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
                        >
                            {/* Content Container */}
                            <div className="p-6 bg-white relative rounded-xl">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Proven Investment Strategies</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    We combine fundamental and technical analysis to ensure high returns with controlled risk exposure.
                                </p>
                            </div>
                        </div>

                        <div
                            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
                        >
                            {/* Content Container */}
                            <div className="p-6 bg-white relative rounded-xl shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Expert Fund Management</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Our team consists of top-tier financial analysts, hedge fund managers, and market strategists who navigate market volatility with precision.
                                </p>
                            </div>
                        </div>

                        <div
                            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
                        >
                            {/* Content Container */}
                            <div className="p-6 bg-white relative rounded-xl">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Comprehensive Portfolio Management</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    We offer access to forex, stocks, hedge funds, real estate, and alternative investments all under one trusted firm.
                                </p>
                            </div>
                        </div>

                        <div
                            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
                        >
                            {/* Content Container */}
                            <div className="p-6 bg-white relative rounded-xl">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Secure & Transparent Transactions</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Our robust security measures, escrow systems, and smart contract integration ensure financial safety and transparency.
                                </p>
                            </div>
                        </div>

                        <div
                            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
                        >
                            {/* Content Container */}
                            <div className="p-6 bg-white relative rounded-xl">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Tailored Investment Plans</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    We customize strategies to match our clients’ risk appetite, financial goals, and investment timeline.
                                </p>
                            </div>
                        </div>

                        <div
                            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
                        >
                            {/* Content Container */}
                            <div className="p-6 bg-white relative rounded-xl shadow-md">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">Innovative Merchant Program</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    We provide unique earning opportunities by allowing verified merchants to facilitate crypto transactions while ensuring fund security.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-60 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center space-y-2 mb-14">
                        <h4 className="text-primary font-semibold text-xl">Our Pricing</h4>
                        <h2 className="text-2xl md:text-4xl font-semibold text-center">
                            Featured investment opportunities
                        </h2>
                        <p className='text-center text-sm md:text-md w-full md:w-3/5 mx-auto'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-4 p-5">
                        {plans.map((plan, index) => (
                            <div className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl" key={index}>
                                <div className="absolute inset-0.5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl" />

                                <div className="relative p-8 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                            {plan?.name}
                                        </h3>
                                        <span className="flex items-center gap-2 bg-cyan-900/30 text-cyan-400 px-3 py-1 rounded-full text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Active
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="pb-4 border-b border-slate-700">
                                            <p className="text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                                                {plan?.estimatedROI}%
                                            </p>
                                            <p className="text-sm text-slate-400">Monthly ROI</p>
                                        </div>

                                        <div className="space-y-4 text-slate-300">
                                            <div className="flex justify-between items-center">
                                                <span className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 110-2V4zm3 1h2v2H7V5zm0 4h2v2H7V9zm0 4h2v2H7v-2z" clipRule="evenodd" />
                                                    </svg>
                                                    Range
                                                </span>
                                                <span className="font-mono">${formatNumberWithCommas(plan?.minAmount)} - ${formatNumberWithCommas(plan?.maxAmount)}</span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                    </svg>
                                                    Duration
                                                </span>
                                                <span className="font-mono">{plan?.duration} {plan.durationType === 'weeks' ? 'weeks' : 'months'}</span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 110-2V4zm3 1h2v2H7V5zm0 4h2v2H7V9zm0 4h2v2H7v-2z" clipRule="evenodd" />
                                                    </svg>
                                                    Tax
                                                </span>
                                                <span className="font-mono">{plan?.taxOnProfit}%</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-slate-700">
                                            <ul className="space-y-3 text-slate-400">
                                                <li className="flex items-center gap-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    Priority Support
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    Exclusive Webinars
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    Custom Portfolio
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative px-8 pb-8">
                                    <Link href={`/personal/explore/invest/${plan._id}`} className="w-full group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500 bg-slate-700/50 hover:bg-slate-700/70 text-white py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2">
                                        Invest Now
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-b from-gray-100/50 to-white py-16 lg:py-24 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
                        {/* Text Content */}
                        <div className="relative space-y-6">
                            <div className="absolute -left-8 -top-8 w-24 h-24 bg-primary/10 rounded-full blur-3xl"></div>

                            <div className="space-y-4">
                                <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase">
                                    How We Work
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                    Pioneering Investment Management Excellence
                                </h2>
                                <div className="w-16 h-1.5 bg-gradient-to-r from-primary to-secondary mb-6"></div>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Leveraging cutting-edge strategies and decades of expertise, we deliver tailored financial solutions that drive sustainable growth and maximize returns.
                                </p>
                            </div>

                            {/* Enhanced CTA Button */}
                            <Link
                                href="#"
                                className="inline-flex items-center group font-semibold text-primary hover:text-primary-dark transition-colors duration-300"
                            >
                                <span className="mr-3">Explore Our Methodology</span>
                                <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </Link>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-6 pt-8">
                                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100/50">
                                    <div className="text-2xl font-bold text-gray-900">15+</div>
                                    <div className="text-sm text-gray-600 mt-1">Years Experience</div>
                                </div>
                                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100/50">
                                    <div className="text-2xl font-bold text-gray-900">$4.2B+</div>
                                    <div className="text-sm text-gray-600 mt-1">Assets Managed</div>
                                </div>
                            </div>
                        </div>

                        {/* Image/Content Placeholder */}
                        <div className="relative aspect-video bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl shadow-lg overflow-hidden">
                            {/* Add your image here */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                [Image placeholder]
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
