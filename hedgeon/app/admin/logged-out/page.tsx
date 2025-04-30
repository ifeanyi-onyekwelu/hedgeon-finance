import Link from "next/link";

const LogoutPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
                <p className="text-gray-700">You have been logged out</p>
                <Link href="/auth/login">Go to login</Link>
            </div>
        </div>
    );
};

export default LogoutPage;