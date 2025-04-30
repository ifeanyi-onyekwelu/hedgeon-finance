'use client';

import { useState } from "react";

interface KYCData {
    documentType: string;
    idProof?: File;
    addressProof?: File;
    selfie?: File;
}

const KYCVerificationForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<KYCData>({
        documentType: 'passport',
    });
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const documentTypes = [
        { value: 'passport', label: 'Passport' },
        { value: 'driver_license', label: 'Driver License' },
        { value: 'national_id', label: 'National ID' },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof KYCData) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, [field]: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionStatus('loading');

        try {
            const formPayload = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value instanceof File) {
                    formPayload.append(key, value);
                } else {
                    formPayload.append(key, value);
                }
            });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSubmissionStatus('success');
            setCurrentStep(1);
            setFormData({ documentType: 'passport' });
        } catch (error) {
            setSubmissionStatus('error');
        }
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Document Type
                            </label>
                            <select
                                name="documentType"
                                value={formData.documentType}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            >
                                {documentTypes.map((doc) => (
                                    <option key={doc.value} value={doc.value}>
                                        {doc.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Upload ID Document ({formData.documentType})
                            </label>
                            <input
                                type="file"
                                onChange={(e) => handleFileUpload(e, 'idProof')}
                                accept="image/*, application/pdf"
                                className="w-full p-2 border rounded-md"
                                required
                            />
                            {formData.idProof && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Selected: {formData.idProof.name}
                                </p>
                            )}
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Proof of Address (Utility bill, bank statement, etc.)
                            </label>
                            <input
                                type="file"
                                onChange={(e) => handleFileUpload(e, 'addressProof')}
                                accept="image/*, application/pdf"
                                className="w-full p-2 border rounded-md"
                                required
                            />
                            {formData.addressProof && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Selected: {formData.addressProof.name}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Selfie with Document
                            </label>
                            <input
                                type="file"
                                onChange={(e) => handleFileUpload(e, 'selfie')}
                                accept="image/*"
                                className="w-full p-2 border rounded-md"
                                required
                            />
                            {formData.selfie && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Selected: {formData.selfie.name}
                                </p>
                            )}
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                            <h3 className="font-semibold mb-2">Review Your Submission</h3>
                            <p className="text-sm">Document Type: {formData.documentType}</p>
                            <p className="text-sm">ID Document: {formData.idProof?.name}</p>
                            <p className="text-sm">Address Proof: {formData.addressProof?.name}</p>
                            <p className="text-sm">Selfie: {formData.selfie?.name}</p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-white shadow rounded-md p-6 mb-6 w-full md:w-2/5 mx-auto">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">KYC Verification</h2>

            <div className="mb-6">
                <div className="flex justify-between">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex-1">
                            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center
                ${currentStep >= step ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                                {step}
                            </div>
                            <div className="text-center mt-2 text-sm">Step {step}</div>
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {renderStep()}

                <div className="mt-6 flex justify-between">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                        >
                            Back
                        </button>
                    )}

                    {currentStep < 3 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md ml-auto"
                            disabled={!formData.idProof}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md ml-auto"
                            disabled={submissionStatus === 'loading'}
                        >
                            {submissionStatus === 'loading' ? 'Submitting...' : 'Submit Verification'}
                        </button>
                    )}
                </div>

                {submissionStatus === 'success' && (
                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
                        Submission successful! Your documents are under review.
                    </div>
                )}
                {submissionStatus === 'error' && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                        Error submitting documents. Please try again.
                    </div>
                )}
            </form>
        </div>
    );
};

export default KYCVerificationForm;