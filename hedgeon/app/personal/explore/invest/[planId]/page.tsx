'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { InvestmentPlan } from '../../page';
import { getPlanDetailsApi } from '@/app/api/planApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiAlertCircle, FiArrowLeft, FiArrowUpRight, FiCopy, FiInfo, FiLoader } from 'react-icons/fi';
import { getAllCurrencies } from '@/app/api/utils';
import formatNumberWithCommas from '@/utils/formatNumbersWithCommas';

interface Fee {
    name: string;
    amount: number;
}

interface CryptoAddress {
    currency: string;
    address: string;
    qrCodeUrl: string; // URL for the QR code image
}

const PaymentPage = () => {
    const { planId } = useParams();
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState<'form' | 'confirmation'>('form');
    const [plan, setPlan] = useState<InvestmentPlan | null>(null);
    const [investmentAmount, setInvestmentAmount] = useState<number | ''>('');
    const [selectedCurrency, setSelectedCurrency] = useState<'BTC' | 'USDT' | 'ETH' | 'TRX'>('USDT'); // Default to USDT
    const [fees, setFees] = useState<Fee[]>([]);
    const [estimatedReturn, setEstimatedReturn] = useState<number>(0);
    const [loadingPlan, setLoadingPlan] = useState(true);
    const [errorPlan, setErrorPlan] = useState<string | null>(null);
    const [processingPayment, setProcessingPayment] = useState(false);
    const [cryptoAddress, setCryptoAddress] = useState<CryptoAddress | null>(null);

    const availableCurrencies = ['BTC', 'USDT (Trc-20)', 'ETH', 'SOL'];

    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {
                setLoadingPlan(true);
                const response = await getPlanDetailsApi(planId as string);
                setPlan(response.data['plan']);
            } catch (err: any) {
                console.error('Error fetching plan details:', err);
                setErrorPlan('Failed to load plan details for investment.');
            } finally {
                setLoadingPlan(false);
            }
        };

        if (planId) {
            fetchPlanDetails();
        }
    }, [planId]);

    useEffect(() => {
        if (plan && typeof investmentAmount === 'number' && investmentAmount > 0) {
            const monthlyReturnRate = plan.estimatedROI / 100 / 12;
            setEstimatedReturn(investmentAmount * monthlyReturnRate * plan.durationMonths);
            setFees([]); // No fees for crypto deposit (you might adjust this)
        } else {
            setEstimatedReturn(0);
            setFees([]);
        }
    }, [plan, investmentAmount]);

    const handleInvestmentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numberValue = value === '' ? '' : parseFloat(value);
        setInvestmentAmount(numberValue);
    };

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(e.target.value as 'BTC' | 'USDT' | 'ETH' | 'TRX');
        setCryptoAddress(null); // Clear previous address when currency changes
    };

    const handleInvestNow = async () => {
        if (!plan) {
            toast.error('Investment plan details are not loaded.');
            return;
        }
        if (typeof investmentAmount !== 'number' || investmentAmount <= 0) {
            toast.error('Please enter a valid investment amount.');
            return;
        }
        if (investmentAmount < plan.minAmount || investmentAmount > plan.maxAmount) {
            toast.error(`Amount must be between $${plan.minAmount} and $${plan.maxAmount}.`);
            return;
        }

        setProcessingPayment(true);
        try {
            // Fetch crypto address when proceeding to payment
            const response = await getAllCurrencies(selectedCurrency);
            if (response.status === 200) {
                const data = await response.data;
                setCryptoAddress(data['currency'] as CryptoAddress);
                setCurrentStep('confirmation');
            } else {
                toast.error('Failed to load payment address');
            }
        } catch (error) {
            console.error('Error during investment initiation:', error);
            toast.error('An unexpected error occurred while initiating investment.');
        } finally {
            setProcessingPayment(false);
        }
    };








    if (loadingPlan) {
        return <div className="min-h-screen flex items-center justify-center">Loading payment details...</div>;
    }

    if (errorPlan || !plan) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
                {errorPlan || 'Could not load payment information.'}
                <button onClick={() => router.back()} className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Go Back
                </button>
            </div>);
    }






    const renderFormStep = () => (
        <div className="min-h-fit py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-fullax-w-xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-200 hover:shadow-xl">
                <div className="p-3 space-y-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium group transition-colors"
                    >
                        <FiArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Plan
                    </button>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">Invest in {plan.name}</h1>
                        <p className="text-gray-500">Choose your investment amount and preferred cryptocurrency</p>
                    </div>

                    <div className="space-y-6">
                        {/* Amount Input */}
                        <div>
                            <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700 mb-2">
                                Investment Amount (USD)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    id="investmentAmount"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder={`$${formatNumberWithCommas(plan.minAmount)} - $${formatNumberWithCommas(plan.maxAmount)}`}
                                    value={investmentAmount}
                                    onChange={handleInvestmentAmountChange}
                                    min={plan.minAmount}
                                    max={plan.maxAmount}
                                />
                                <span className="absolute right-4 top-3.5 text-gray-400">USD</span>
                            </div>
                            {(typeof investmentAmount === 'number' && (investmentAmount < plan.minAmount || investmentAmount > plan.maxAmount)) && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <FiAlertCircle className="mr-1.5" />
                                    Amount must be between ${formatNumberWithCommas(plan.minAmount)} and ${formatNumberWithCommas(plan.maxAmount)}
                                </p>
                            )}
                        </div>

                        {/* Currency Selector */}
                        <div>
                            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                                Select Cryptocurrency
                            </label>
                            <div className="relative">
                                <select
                                    id="currency"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-no-repeat bg-[right_1rem_center] bg-[length:1.5em] transition-all"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236B7280'%3e%3cpath d='M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z'/%3e%3c/svg%3e")` }}
                                    value={selectedCurrency}
                                    onChange={handleCurrencyChange}
                                >
                                    {availableCurrencies.map((currency) => (
                                        <option key={currency} value={currency}>{currency}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Investment Summary */}
                        {typeof investmentAmount === 'number' && investmentAmount > 0 && (
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Investment Summary</h4>
                                <dl className="space-y-3">
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Amount</dt>
                                        <dd className="font-medium">${investmentAmount.toLocaleString()}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Duration</dt>
                                        <dd className="font-medium">{plan.durationMonths} months</dd>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-gray-200">
                                        <dt className="text-green-700">Estimated Return</dt>
                                        <dd className="font-semibold text-green-700">${formatNumberWithCommas(estimatedReturn)}</dd>
                                    </div>
                                </dl>
                            </div>
                        )}

                        <button
                            onClick={handleInvestNow}
                            disabled={processingPayment}
                            className="w-full bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <div className="flex items-center justify-center">
                                {processingPayment ? (
                                    <>
                                        <FiLoader className="animate-spin mr-3" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <FiArrowUpRight className="mr-3" />
                                        Proceed to Payment
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    const renderConfirmationStep = () => (
        <div className="space-y-6">
            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                    <FiInfo className="shrink-0 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Payment Instructions</h3>
                </div>

                <p className="text-gray-700 mb-4">
                    Send exactly <span className="font-semibold text-blue-600">${formatNumberWithCommas(investmentAmount as number)}</span> worth of{' '}
                    <span className="font-semibold">{selectedCurrency}</span> to:
                </p>

                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                    <div className="flex items-center justify-between">
                        <p className="font-mono text-sm break-all pr-4">{cryptoAddress?.address}</p>
                        <button
                            onClick={() => navigator.clipboard.writeText(cryptoAddress?.address || '')}
                            className="shrink-0 text-blue-600 hover:text-blue-800 p-2 rounded-md"
                        >
                            <FiCopy className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {cryptoAddress?.qrCodeUrl && (
                    <div className="text-center border-t pt-4 mt-4">
                        <p className="text-sm text-gray-600 mb-3">Scan QR Code</p>
                        <img
                            src={cryptoAddress.qrCodeUrl}
                            alt="QR Code"
                            className="inline-block w-40 h-40 p-2 bg-white rounded-lg border border-gray-200"
                        />
                    </div>
                )}

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setCurrentStep('form');
                            setCryptoAddress(null);
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-2"
                    >
                        <FiArrowLeft className="mr-2" />
                        Back to Amount Selection
                    </button>
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Investment Summary</h4>
                <dl className="space-y-3">
                    <div className="flex justify-between">
                        <dt className="text-gray-600">Plan Name</dt>
                        <dd className="font-medium">{plan.name}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-gray-600">Investment Amount</dt>
                        <dd className="font-medium">${formatNumberWithCommas(investmentAmount as number)}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-gray-600">Payment Currency</dt>
                        <dd className="font-medium">{selectedCurrency}</dd>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                        <dt className="text-green-700">Estimated Return</dt>
                        <dd className="font-semibold text-green-700">${formatNumberWithCommas(estimatedReturn)}</dd>
                    </div>
                </dl>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-200 hover:shadow-xl">
                <div className="p-8 space-y-6">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium group transition-colors"
                    >
                        <FiArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Plan
                    </button>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {currentStep === 'form' ? 'Invest in' : 'Confirm Payment for'} {plan.name}
                        </h1>
                        <p className="text-gray-500">
                            {currentStep === 'form'
                                ? 'Choose your investment amount and preferred cryptocurrency'
                                : 'Complete your investment by sending the payment'}
                        </p>
                    </div>

                    {currentStep === 'form' ? renderFormStep() : renderConfirmationStep()}
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;