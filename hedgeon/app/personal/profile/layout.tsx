import { Bell, Lock, User2Icon, Verified } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const ListItem = ({ link }: any) => {
    return (
        <Link
            href={link.path}
            className={`space-x-2 px-3 py-2 rounded border-r-4 flex hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 ease-in-out`}
            key={link.name}
        >
            {link.icon}
            <span>{link.name}</span>
        </Link>
    );
};

const NavigationBox = ({ links }: any) => {

    return (
        <div className="p-5 rounded shadow-lg md:w-1/4 max-h-fit bg-white">
            <div className="space-y-2">
                {links.map((link: any) => (
                    <ListItem
                        link={link}
                    />
                ))}
            </div>
        </div>
    );
};


function SettingsLayout({ children }: { children: React.ReactNode }) {
    const links = [
        {
            name: "Profile",
            path: "/personal/profile",
            icon: <User2Icon />,
        },
        {
            name: "KYC",
            path: "/personal/profile/kyc",
            icon: <Verified />,
        },
        {
            name: "Security",
            path: "/personal/profile/change-password",
            icon: <Lock />,
        },
        {
            name: "Notification",
            path: "/personal/profile/notifications",
            icon: <Bell />,
        },
    ];

    return (
        <div className="flex space-x-10 md:flex-row flex-col">
            <NavigationBox links={links} />

            {children}
        </div>
    );
}

export default SettingsLayout;
