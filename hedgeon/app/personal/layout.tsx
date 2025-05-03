import DashboardHeader from "@/components/personal/Header";
import DashboardSidebar from "@/components/personal/Sidebar";
import ProtectedLayout from "../ProtectedLayout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {


    return (
        <ProtectedLayout allowedRoles={['user']}>
            <SidebarProvider>
                <DashboardSidebar />
                <main className="flex-1 bg-gray-50 min-h-screen">
                    <DashboardHeader />
                    <SidebarTrigger className="sticky top-16" size={'lg'} />
                    <div className="p-2">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </ProtectedLayout>
    );
};

export default DashboardLayout