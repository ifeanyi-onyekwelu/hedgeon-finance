const RiskProfileForm = () => {
    const [investorType, setInvestorType] = useState('');

    const handleChange = (e) => {
        setInvestorType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you'd send this data to your backend
        console.log('Risk Profile Submitted:', { investorType });
    };

    return (
        <div className="bg-white shadow rounded-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Risk Profile Questionnaire</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Investor Type
                    </label>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="conservative"
                                name="investorType"
                                value="Conservative"
                                className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                onChange={handleChange}
                            />
                            <label htmlFor="conservative" className="ml-2 text-gray-700">
                                Conservative (Low Risk Tolerance)
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="moderate"
                                name="investorType"
                                value="Moderate"
                                className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                onChange={handleChange}
                            />
                            <label htmlFor="moderate" className="ml-2 text-gray-700">
                                Moderate (Medium Risk Tolerance)
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="aggressive"
                                name="investorType"
                                value="Aggressive"
                                className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                onChange={handleChange}
                            />
                            <label htmlFor="aggressive" className="ml-2 text-gray-700">
                                Aggressive (High Risk Tolerance)
                            </label>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit Risk Profile
                </button>
            </form>
        </div>
    );
};
