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
    const [formData, setFormData] = useState<KYCData>({ documentType: 'passport' });
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

    const renderFilePreview = (file?: File) => {
        if (!file) return null;

        const isImage = file.type.startsWith('image/');
        const isPDF = file.type === 'application/pdf';

        if (isImage) {
            return (
                <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="mt-2 max-h-48 border rounded-md shadow"
                />
            );
        }

        if (isPDF) {
            return (
                <a
                    href={URL.createObjectURL(file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-600 underline text-sm"
                >
                    View PDF
                </a>
            );
        }

        return (
            <p className="text-sm text-gray-600 mt-2">
                Uploaded: {file.name}
            </p>
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionStatus('loading');

        try {
            const formPayload = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value instanceof File || typeof value === 'string') {
                    formPayload.append(key, value);
                }
            });

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

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
                    <>
                        <label className="block mb-2 text-sm font-medium">Document Type</label>
                        <select
                            name="documentType"
                            value={formData.documentType}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        >
                            {documentTypes.map(doc => (
                                <option key={doc.value} value={doc.value}>
                                    {doc.label}
                                </option>
                            ))}
                        </select>

                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium">
                                Upload ID Document ({formData.documentType})
                            </label>
                            <input
                                type="file"
                                accept="image/*,application/pdf"
                                onChange={(e) => handleFileUpload(e, 'idProof')}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                            {renderFilePreview(formData.idProof)}
                        </div>
                    </>
                );

            case 2:
                return (
                    <>
                        <div>
                            <label className="block mb-2 text-sm font-medium">Proof of Address</label>
                            <input
                                type="file"
                                accept="image/*,application/pdf"
                                onChange={(e) => handleFileUpload(e, 'addressProof')}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                            {renderFilePreview(formData.addressProof)}
                        </div>

                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium">Selfie with Document</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, 'selfie')}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                            {renderFilePreview(formData.selfie)}
                        </div>
                    </>
                );

            case 3:
                return (
                    <div className="space-y-3 bg-gray-50 p-4 rounded-md border">
                        <h3 className="font-semibold">Review Your Details</h3>
                        <p><strong>Document Type:</strong> {formData.documentType}</p>
                        <p><strong>ID Document:</strong> {formData.idProof?.name}</p>
                        <p><strong>Address Proof:</strong> {formData.addressProof?.name}</p>
                        <p><strong>Selfie:</strong> {formData.selfie?.name}</p>
                    </div>
                );

            default:
                return null;
        }
    };

    const canGoNext = currentStep === 1
        ? !!formData.idProof
        : currentStep === 2
            ? !!formData.addressProof && !!formData.selfie
            : true;

    return (
        <div className="bg-white shadow rounded-lg p-6 w-full mt-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">KYC Verification</h2>

            <div className="flex justify-between mb-6">
                {[1, 2, 3].map((step) => (
                    <div key={step} className="flex-1 text-center">
                        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center
                            ${currentStep >= step ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            {step}
                        </div>
                        <p className="text-xs mt-1">Step {step}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                    {renderStep()}
                </div>

                <div className="mt-6 flex justify-between items-center">
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
                            className="ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                            disabled={!canGoNext}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="ml-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                            disabled={submissionStatus === 'loading'}
                        >
                            {submissionStatus === 'loading' ? 'Submitting...' : 'Submit'}
                        </button>
                    )}
                </div>

                {submissionStatus === 'success' && (
                    <p className="mt-4 text-green-700 bg-green-100 px-4 py-2 rounded-md">
                        Submission successful! Your documents are under review.
                    </p>
                )}
                {submissionStatus === 'error' && (
                    <p className="mt-4 text-red-700 bg-red-100 px-4 py-2 rounded-md">
                        Submission failed. Please try again later.
                    </p>
                )}
            </form>
        </div>
    );
};

export default KYCVerificationForm;
