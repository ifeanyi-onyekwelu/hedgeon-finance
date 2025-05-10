'use client';

import { useState } from "react";
import { motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react";
import { uploadKycDocuments } from "@/app/api/userApi";

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
            formPayload.append('documentType', formData.documentType); // Include documentType
            if (formData.idProof) formPayload.append('idProof', formData.idProof);
            if (formData.addressProof) formPayload.append('addressProof', formData.addressProof);
            if (formData.selfie) formPayload.append('selfie', formData.selfie);

            console.log('Form Data:');
            for (let [key, value] of formPayload.entries()) {
                console.log(`${key}:`, value);
            }

            const response = await uploadKycDocuments(formPayload);
            console.log("Response", response);

            setSubmissionStatus('success');
            setFormData({ documentType: 'passport' });
            setCurrentStep(1); // Go back to the first step
        } catch (error: any) {
            setSubmissionStatus('error');
            console.error("KYC Upload Error:", error);
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
                    <div className="bg-gray-50 p-6 rounded-md border space-y-4">
                        <h3 className="font-semibold text-lg">Review Your Uploads</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                                <h4 className="font-semibold text-md">ID Document</h4>
                                {formData.idProof && (
                                    <>
                                        <p className="text-gray-600">{formData.idProof.name}</p>
                                        {renderFilePreview(formData.idProof)}
                                    </>
                                )}
                                {!formData.idProof && <p className="text-gray-600">No file uploaded</p>}
                            </div>
                            <div>
                                <h4 className="font-semibold text-md">Proof of Address</h4>
                                {formData.addressProof && (
                                    <>
                                        <p className="text-gray-600">{formData.addressProof.name}</p>
                                        {renderFilePreview(formData.addressProof)}
                                    </>
                                )}
                                {!formData.addressProof && <p className="text-gray-600">No file uploaded</p>}
                            </div>
                            <div>
                                <h4 className="font-semibold text-md">Selfie with Document</h4>
                                {formData.selfie && (
                                    <>
                                        <p className="text-gray-600">{formData.selfie.name}</p>
                                        {renderFilePreview(formData.selfie)}
                                    </>
                                )}
                                {!formData.selfie && <p className="text-gray-600">No file uploaded</p>}
                            </div>
                        </div>

                        <p className="text-sm text-gray-600">Please ensure all details are correct before proceeding.</p>
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

                <div className="mt-6 flex justify-between items-center mb-6">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                        >
                            Back
                        </button>
                    )}
                    {currentStep < 3 && (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="ml-auto bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                            disabled={!canGoNext}
                        >
                            Continue
                        </button>
                    )}

                    {currentStep === 3 && (
                        <button
                            type="submit"
                            className="ml-auto bg-primary hover:bg-primary-fade text-white px-4 py-2 rounded-md"
                            disabled={submissionStatus === 'loading'}
                        >
                            {submissionStatus === 'loading' ? 'Submitting...' : 'Submit'}
                        </button>
                    )}
                </div>

                {submissionStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-green-50 border border-green-100 rounded-sm flex items-center space-x-3 animate-shake"
                    >
                        <Alert variant="default">
                            <CheckCircle className="h-4 w-4" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>
                                Submission successful! Your documents are under review
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}
                {submissionStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-100 rounded-sm flex items-center space-x-3 animate-shake"
                    >
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                Submission failed. Please try again later.
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                )}
            </form>
        </div>
    );
};

export default KYCVerificationForm;
