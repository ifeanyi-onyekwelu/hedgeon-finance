import React, { useEffect, useState } from 'react';
import { FiArrowUpRight, FiCheckCircle, FiDollarSign, FiDownload, FiLoader, FiXCircle, FiZap } from 'react-icons/fi';
import { withdrawApi, getUserTransactions } from '@/app/api/userApi';
import { QrCode } from 'lucide-react';
import { Table } from 'antd';
import formatNumberWithCommas from '@/utils/formatNumbersWithCommas';

const WithdrawalSection = ({ walletBalance }: any) => {
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('USDT');
    const [walletAddress, setWalletAddress] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [withdrawalSuccess, setWithdrawalSuccess] = useState(false);
    const [withdrawalError, setWithdrawalError] = useState('');

    const handleWithdrawal = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setWithdrawalSuccess(false);
        setWithdrawalError('');

        try {
            const response = await withdrawApi({ amount: withdrawalAmount, currency: selectedCurrency, walletAddress });
            console.log(response)
        } catch (err: any) {
            console.log("Withdrawal error", err)
            setWithdrawalError(`Withdrawal failed: ${err.response.data.message}`);
        }

        if (!walletAddress || parseFloat(withdrawalAmount) <= 0) {
            setWithdrawalError('Please provide a valid amount and wallet address.');
            setIsSubmitting(false);
            return;
        }

        setWithdrawalAmount('');
        setWalletAddress('');
        setIsSubmitting(false);
    };

    const currencies = ['USDT', 'BTC', 'SOL', 'ETH'];

    return (
        <div className="bg-white rounded-xl p-8 mb-8 border border-gray-100/70 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
                <FiDownload className="w-8 h-8 text-indigo-600" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Withdraw Crypto
                </h2>
            </div>

            {/* Status Alerts */}
            {withdrawalSuccess && (
                <div className="animate-fade-in-up mb-6">
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3">
                        <FiCheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                        <div>
                            <p className="font-semibold text-emerald-800">Withdrawal Successful</p>
                            <p className="text-sm text-emerald-700 mt-1">Check your wallet shortly.</p>
                        </div>
                    </div>
                </div>
            )}
            {withdrawalError && (
                <div className="animate-shake-x mb-6">
                    <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-center gap-3">
                        <FiXCircle className="w-6 h-6 text-rose-600 shrink-0" />
                        <div>
                            <p className="font-semibold text-rose-800">Withdrawal Failed</p>
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
                    <label htmlFor="withdrawalAmount" className="text-sm font-medium text-gray-700 flex justify-between">
                        Withdrawal Amount
                        <button
                            type="button"
                            onClick={() => setWithdrawalAmount(walletBalance || 0)}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1"
                        >
                            <FiZap className="w-4 h-4" />
                            Withdraw All
                        </button>
                    </label>
                    <div className="relative group">
                        <div className="relative flex items-center bg-white rounded-xl border border-gray-200 hover:border-indigo-300">
                            <span className="pl-4 pr-2 text-gray-400">
                                <FiDollarSign className="w-5 h-5" />
                            </span>
                            <input
                                type="number"
                                className="flex-1 py-4 pl-2 pr-4 border-0 bg-transparent text-lg font-medium outline-none"
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

                {/* Currency Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Select Cryptocurrency</label>
                    <select
                        className="w-full py-3 px-4 border border-gray-200 rounded-xl"
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Wallet Address */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Wallet Address</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 py-3 px-4 border border-gray-200 rounded-xl"
                            placeholder={`Enter your ${selectedCurrency} wallet address`}
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
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

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
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
                                Withdraw {selectedCurrency}
                            </>
                        )}
                    </div>
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Processing time: Instant • Network fee may apply
                </p>
            </form>
        </div>
    );
};


const TransactionHistory = () => {
    // Sample transaction data
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTransactions = async () => {
        setIsLoading(true)
        try {
            const response = await getUserTransactions();
            setTransactions(response.data.transactions)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error('Error fetching transactions:', error);
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [])


    // Define columns for the Ant Design Table
    const columns = [
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Plan',
            render: (record: any) => {
                return record.investment?.plan?.planId?.name || "-";
            },
            sorter: (a, b) => {
                const planA = a.investment?.plan?.planId?.name || "";
                const planB = b.investment?.plan?.planId?.name || "";
                return planA.localeCompare(planB);
            },
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: any) => `$${formatNumberWithCommas(amount)}`, // Use render to format currency
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            render: (createdAt: any) => new Date(createdAt).toLocaleDateString(), // Format date
        },
    ];

    return (
        // Keep the outer styling div
        <div className="bg-white shadow rounded-md p-6 mb-6">
            {/* Keep the header */}
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Transaction History</h2>

            {/* Use Ant Design Table component */}
            {/* Ant Design Table automatically handles empty data when dataSource is an empty array */}
            <Table
                dataSource={transactions} // Pass your data array here
                columns={columns}       // Pass your column definitions here
                rowKey="id"             // Specify the unique key for each row
                loading={isLoading}      // Add loading={true} if fetching data asyncally
            />
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

const TransactionAndWithdrawalSection = ({ walletBalance }: any) => {
    return (
        <div className="mt-8">
            <WithdrawalSection walletBalance={walletBalance} />
            <TransactionHistory />
            <AutoReinvestOption />
        </div>
    );
};

export default TransactionAndWithdrawalSection;