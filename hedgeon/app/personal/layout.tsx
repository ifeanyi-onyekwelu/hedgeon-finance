import DashboardHeader from "@/components/personal/Header";
import DashboardSidebar from "@/components/personal/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <DashboardSidebar />
            <main className="flex-1 p-8 bg-gray-50 min-h-screen">
                <DashboardHeader />
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout