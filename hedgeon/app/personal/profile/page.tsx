'use client'
import React, { useState } from 'react';

// User Details Section
const UserDetailsForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you'd send this data to your backend
        console.log('User Details Submitted:', { name, email, phone });
    };

    return (
        <div className="bg-white shadow rounded-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Update Information
                </button>
            </form>
        </div>
    );
};

// KYC Verification Section (File Uploads)
const KYCVerificationForm = () => {
    const [idProof, setIdProof] = useState(null);
    const [addressProof, setAddressProof] = useState(null);
    const [selfie, setSelfie] = useState(null);

    const handleIdProofChange = (e) => {
        setIdProof(e.target.files[0]);
    };

    const handleAddressProofChange = (e) => {
        setAddressProof(e.target.files[0]);
    };

    const handleSelfieChange = (e) => {
        setSelfie(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('idProof', idProof);
        formData.append('addressProof', addressProof);
        formData.append('selfie', selfie);
        // In a real app, you'd send this formData to your backend for KYC verification
        console.log('KYC Data Submitted:', formData.get('idProof'), formData.get('addressProof'), formData.get('selfie'));
    };

    return (
        <div className="bg-white shadow rounded-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">KYC Verification</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="idProof" className="block text-gray-700 text-sm font-bold mb-2">
                        Upload ID Proof
                    </label>
                    <input
                        type="file"
                        id="idProof"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleIdProofChange}
                        accept="image/*, application/pdf"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="addressProof" className="block text-gray-700 text-sm font-bold mb-2">
                        Upload Proof of Address
                    </label>
                    <input
                        type="file"
                        id="addressProof"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleAddressProofChange}
                        accept="image/*, application/pdf"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="selfie" className="block text-gray-700 text-sm font-bold mb-2">
                        Upload Selfie
                    </label>
                    <input
                        type="file"
                        id="selfie"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleSelfieChange}
                        accept="image/*"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit for Verification
                </button>
            </form>
        </div>
    );
};

// Risk Profile Questionnaire Section (Radio Buttons)
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

// Main Profile Page Component
const ProfilePage = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Profile</h1>
            <UserDetailsForm />
            <KYCVerificationForm />
            <RiskProfileForm />
            {/* You can add more sections here, like Security Settings, etc. */}
        </div>
    );
};

export default ProfilePage;