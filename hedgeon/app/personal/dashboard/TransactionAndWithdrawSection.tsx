import { IconFileBitcoin } from '@tabler/icons-react';
import { Banknote, QrCode } from 'lucide-react';
import React, { useState } from 'react';
import { FiArrowUpRight, FiCheckCircle, FiDollarSign, FiDownload, FiLoader, FiXCircle, FiZap } from 'react-icons/fi';

const WithdrawalSection = ({ walletBalance }: any) => {
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('bank');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);
    const [withdrawalError, setWithdrawalError] = useState('');

    const handleWithdrawal = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setWithdrawalSuccess(false);
        setWithdrawalError('');

        // Simulate API call for withdrawal
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (parseFloat(withdrawalAmount) > 0) {
            // Simulate successful withdrawal
            setWithdrawalSuccess(true);
            setWithdrawalAmount('');
        } else {
            // Simulate withdrawal error
            setWithdrawalError('Please enter a valid withdrawal amount.');
        }

        setIsSubmitting(false);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100/70 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
                <FiDownload className="w-8 h-8 text-indigo-600" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Withdraw Funds
                </h2>
            </div>

            {/* Animated Status Indicators */}
            {withdrawalSuccess && (
                <div className="animate-fade-in-up mb-6">
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3">
                        <FiCheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                        <div>
                            <p className="font-semibold text-emerald-800">Withdrawal Processed!</p>
                            <p className="text-sm text-emerald-700 mt-1">
                                Funds should arrive within 1-3 business days
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {withdrawalError && (
                <div className="animate-shake-x mb-6">
                    <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-center gap-3">
                        <FiXCircle className="w-6 h-6 text-rose-600 shrink-0" />
                        <div>
                            <p className="font-semibold text-rose-800">Transaction Failed</p>
                            <p className="text-sm text-rose-700 mt-1">{withdrawalError}</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleWithdrawal} className="space-y-6">
                {/* Balance Preview */}
                <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-indigo-700">Available Balance</p>
                            <p className="text-2xl font-bold text-indigo-900">${walletBalance}</p>
                        </div>
                        <FiDollarSign className="w-10 h-10 text-indigo-400" />
                    </div>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label htmlFor="withdrawalAmount" className="block text-sm font-medium text-gray-700">
                            Withdrawal Amount
                        </label>
                        <button
                            type="button"
                            // onClick={() => setWithdrawalAmount(560.54)}
                            onClick={() => setWithdrawalAmount(walletBalance || 0)}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1 cursor-pointer"
                        >
                            <FiZap className="w-4 h-4" />
                            Withdraw All
                        </button>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <div className="relative flex items-center bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors">
                            <span className="pl-4 pr-2 text-gray-400">
                                <FiDollarSign className="w-5 h-5" />
                            </span>
                            <input
                                type="number"
                                id="withdrawalAmount"
                                className="flex-1 py-4 pl-2 pr-4 border-0 bg-transparent text-lg font-medium focus:ring-0"
                                placeholder="0.00"
                                value={withdrawalAmount}
                                onChange={(e) => setWithdrawalAmount(e.target.value)}
                                min="0.01"
                                step="0.01"
                                required
                            />
                            <span className="px-4 text-gray-400 font-medium">USD</span>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                        Payment Method
                    </label>

                    <div className="grid gap-3">
                        <RadioCard
                            value="bank"
                            selected={paymentMethod === 'bank'}
                            onChange={() => setPaymentMethod('bank')}
                            icon={<Banknote className="w-6 h-6" />}
                            title="Bank Transfer"
                            description="1-3 business days processing"
                        />

                        <RadioCard
                            value="crypto"
                            selected={paymentMethod === 'crypto'}
                            onChange={() => setPaymentMethod('crypto')}
                            icon={<IconFileBitcoin className="w-6 h-6" />}
                            title="Crypto Wallet"
                            description="Instant processing • 0.5% fee"
                        />
                    </div>

                    {/* Dynamic Fields */}
                    {paymentMethod === 'crypto' && (
                        <div className="animate-fade-in">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Wallet Address
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 py-3 px-4 border border-gray-200 rounded-xl focus:border-indigo-300 focus:ring-0"
                                    placeholder="Enter crypto wallet address"
                                    required
                                />
                                <button
                                    type="button"
                                    className="px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-colors"
                                >
                                    <QrCode className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* CTA Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                >
                    <div className="flex items-center justify-center gap-2">
                        {isSubmitting ? (
                            <>
                                <FiLoader className="animate-spin w-5 h-5" />
                                Processing Withdrawal...
                            </>
                        ) : (
                            <>
                                <FiArrowUpRight className="w-5 h-5" />
                                Initiate Withdrawal
                            </>
                        )}
                    </div>
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Typical processing time: {paymentMethod === 'bank' ? '1-3 business days' : 'Instant'}
                </p>
            </form>
        </div>
    );
};

const RadioCard = ({ value, selected, onChange, icon, title, description }: any) => (
    <label className={`relative cursor-pointer border rounded-xl p-4 transition-all ${selected ? 'border-indigo-300 bg-indigo-50/50' : 'border-gray-200 hover:border-indigo-200'}`}>
        <input
            type="radio"
            value={value}
            checked={selected}
            onChange={onChange}
            className="absolute opacity-0"
        />
        <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg ${selected ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                {icon}
            </div>
            <div>
                <p className="font-medium text-gray-900">{title}</p>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
        </div>
    </label>
)


const TransactionHistory = () => {
    // Sample transaction data
    const transactions = [
        { id: 1, type: 'Investment', fund: 'Growth Fund', amount: 1000, date: '2025-04-15' },
        { id: 2, type: 'Withdrawal', amount: 200, date: '2025-04-10' },
        { id: 3, type: 'Dividend', fund: 'Value Fund', amount: 50, date: '2025-04-01' },
    ];

    return (
        <div className="bg-white shadow rounded-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Transaction History</h2>
            {transactions.length === 0 ? (
                <p className="text-gray-500">No transactions yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Fund/Details
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{transaction.type}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{transaction.fund || '-'}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">${transaction.amount.toFixed(2)}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{transaction.date}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const AutoReinvestOption = () => {
    const [isAutoReinvestEnabled, setIsAutoReinvestEnabled] = useState(false);

    const handleToggleAutoReinvest = () => {
        setIsAutoReinvestEnabled(!isAutoReinvestEnabled);
        // In a real application, you would handle saving this preference.
    };

    return (
        <div className="bg-white shadow rounded-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Auto Reinvestment</h2>
            <div className="flex items-center justify-between">
                <span className="text-gray-700">Automatically reinvest profits and dividends?</span>
                <button
                    className={`relative inline-flex flex-shrink-0 w-11 h-6 transition-colors duration-200 ease-in-out rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isAutoReinvestEnabled ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}
                    role="switch"
                    aria-checked={isAutoReinvestEnabled}
                    onClick={handleToggleAutoReinvest}
                >
                    <span className="sr-only">Enable automatic reinvestment</span>
                    <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200 ${isAutoReinvestEnabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                    ></span>
                </button>
            </div>
            {isAutoReinvestEnabled && (
                <p className="text-sm text-gray-500 mt-2">Your profits and dividends will be automatically reinvested based on your portfolio allocation.</p>
            )}
            {!isAutoReinvestEnabled && (
                <p className="text-sm text-gray-500 mt-2">You will receive profits and dividends as withdrawable balance.</p>
            )}
        </div>
    );
};

const Trades = () => {
    // Sample trades data
    const tradesData = [
        { id: 1, symbol: 'AAPL', type: 'Buy', quantity: 10, price: 170.50, date: '2025-04-18' },
        { id: 2, symbol: 'GOOGL', type: 'Sell', quantity: 5, price: 2500.20, date: '2025-04-17' },
    ];

    return (
        <div className="bg-white shadow rounded-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Trades</h2>
            {tradesData.length === 0 ? (
                <p className="text-gray-500">No recent trades.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Symbol
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tradesData.map((trade) => (
                                <tr key={trade.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{trade.symbol}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{trade.type}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{trade.quantity}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">${trade.price.toFixed(2)}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{trade.date}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const TransactionAndWithdrawalSection = ({ walletBalance }: any) => {
    return (
        <div className="mt-8">
            <WithdrawalSection walletBalance={walletBalance} />
            <TransactionHistory />
            <Trades />
            <AutoReinvestOption />
        </div>
    );
};

export default TransactionAndWithdrawalSection;