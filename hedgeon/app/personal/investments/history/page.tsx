import { FiFileText } from 'react-icons/fi';

const InvestmentList = () => {

    return (
        <div className="p-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Investments</h1>

                {/* Past Investments */}
                <div>
                    <h2 className="text-xl font-semibold mb-6">Investment History</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(id => (
                            <div key={id} className="bg-white p-6 rounded-xl shadow-sm">
                                <div className="flex justify-between mb-4">
                                    <h3 className="font-semibold">Emerging Markets Fund</h3>
                                    <span className="text-sm px-2 py-1 bg-red-100 text-red-800 rounded-full">Closed</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Final Value:</span>
                                        <span className="font-semibold">$22,450</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Duration:</span>
                                        <span>3 years</span>
                                    </div>
                                    <button className="w-full mt-4 flex items-center justify-center text-blue-600 hover:bg-blue-50 py-2 rounded-lg">
                                        <FiFileText className="mr-2" /> View Documents
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestmentList;