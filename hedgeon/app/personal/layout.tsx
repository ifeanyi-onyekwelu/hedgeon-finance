import DashboardHeader from "@/components/personal/Header";
import DashboardSidebar from "@/components/personal/Sidebar";
import ProtectedLayout from "../ProtectedLayout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProtectedLayout allowedRoles={['user']}>
            <div className="flex">
                <DashboardSidebar />
                <main className="flex-1 p-8 bg-gray-50 min-h-screen">
                    <DashboardHeader />
                    {children}
                </main>
            </div>
        </ProtectedLayout>
    );
};

export default DashboardLayout