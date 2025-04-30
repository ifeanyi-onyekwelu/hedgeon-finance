'use client'
import { updateProfileApi, uploadProfilePictureApi } from '@/app/api/userApi';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import React, { useEffect, useState } from 'react';

// User Details Section
const UploadImage = () => {
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile); // store file for upload

            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string); // show preview
            };
            reader.readAsDataURL(uploadedFile);
        }
    };

    const handleDeleteImage = () => {
        setImage(null);
        setFile(null);
    };

    const handleSubmit = async () => {
        if (!file) return alert("No file selected");
        try {
            const res = await uploadProfilePictureApi(file);
            console.log("Upload success:", res.data);
        } catch (err) {
            console.error("Upload error:", err);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Image Preview Box */}
            <div className="p-1 rounded-full w-32 h-32 border-2 border-badge">
                <div
                    className="rounded-full w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${image || "https://via.placeholder.com/150?text=No+Image"})`,
                    }}
                ></div>
            </div>

            <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
            />
            <div className="flex space-x-3">
                <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => document.getElementById("file-upload")?.click()}
                >
                    Upload
                </Button>

                <Button
                    variant="destructive"
                    size="lg"
                    onClick={handleDeleteImage}
                >
                    Delete
                </Button>

                <Button
                    variant="default"
                    size="lg"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

function UserProfile() {
    const { updateUser, refreshUser, user } = useUser();
    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState<{ name: string, email: string, phone: string }>({
        name: "",
        email: "",
        phone: "",
    });


    useEffect(() => {
        if (user) {
            userData.name = user.name || "";
            userData.email = user.email || "";
            userData.phone = user.phone || "";
        }
    }, [user]);

    if (!user) {
        return <div>Loading...</div>;
    }

    type FormFields = keyof typeof userData;

    const fields: {
        name: FormFields;
        label: string;
        placeholder: string;
        required?: boolean;
        readOnly?: boolean;
        type: string;
    }[] = [
            {
                name: "name",
                label: "Name",
                placeholder: "Enter your full name",
                required: true,
                type: "text",
            },
            {
                name: "email",
                label: "Email Address",
                placeholder: "Enter your email address",
                type: "email",
                readOnly: true,
            },
            {
                name: "phone",
                label: "Phone Number",
                placeholder: "Enter your phone",
                required: true,
                type: "text",
                readOnly: true,
            },
        ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('User Data', userData);
        setLoading(true);

        try {
            const response = (await updateProfileApi(userData)).data;
            console.log("Response from API", response);
            const { updated_user } = response;
            updateUser(updated_user);
            refreshUser();
        } catch (err) {
            console.log("Error updating profile", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-2 w-3/4">
            <div className="bg-white p-10 rounded space-y-10">
                <UploadImage />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <h1 className="text-2xl font-semibold">Personal Details</h1>

                    {fields.map((field) => (
                        <div key={field.name} className="flex flex-col space-y-2">
                            <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={userData[field.name] || ""}
                                onChange={(e) => setUserData({ ...userData, [field.name]: e.target.value })}
                                required={field.required}
                                readOnly={field.readOnly}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {(field.name === "email" || field.name === 'phone') && (
                                <p className="text-sm text-gray-500">
                                    Contact support to change your {field.name.includes('email') ? "email" : "phone number"}.
                                </p>
                            )}
                        </div>
                    ))}

                    <Button type='submit'>UPDATE</Button>
                </form>
            </div>
        </div>
    );
}

export default UserProfile