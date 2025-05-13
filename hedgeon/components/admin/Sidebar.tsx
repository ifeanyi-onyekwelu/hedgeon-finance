'use client'

import {
    LayoutDashboard,
    Compass,
    LineChart,
    User2,
    ChevronUp,
    Users,
    File,
    User,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

export function AdminSidebar() {
    const { user } = useUser()

    const items = [
        {
            title: "Home",
            url: "/admin/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Users",
            url: "/admin/users",
            icon: Users,
        },
        {
            title: "Investments",
            url: "/admin/investments",
            icon: Compass,
        },
        {
            title: "Kyc",
            url: "/admin/kyc",
            icon: File,
        },
        {
            title: "Plans",
            url: "/admin/plans",
            icon: Compass,
        },
    ];
    return (
        <Sidebar>
            <SidebarContent>
                <Image src="/images/logo.png" alt="Hedgeon Finance Logo" width={50} height={200} className="mx-auto py-5" />
                <SidebarGroup>
                    <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                            <Collapsible>
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton asChild>
                                            <Link href="#">
                                                <LineChart />
                                                <span>Transaction</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {[{ url: '/admin/transactions/withdrawals', title: 'Withdrawals' }, { url: '/admin/transactions/payouts', title: 'Payouts Tracker' }].map((item, index) => (
                                                <SidebarMenuItem key={item.title}>
                                                    <SidebarMenuButton asChild>
                                                        <Link href={item.url}>
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>

                            <Collapsible>
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton asChild>
                                            <Link href="#">
                                                <User />
                                                <span>Account</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {[{ url: '/admin/account/profile', title: 'Profile' }, { url: '/admin/account/change-password', title: 'Change Password' }, { url: '/admin/account/settings', title: 'Settings' }].map((item, index) => (
                                                <SidebarMenuItem key={item.title}>
                                                    <SidebarMenuButton asChild>
                                                        <Link href={item.url}>
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> {user?.name}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <Link href="/personal/profile">
                                        <span>Account</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/personal/profile/settings">
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/auth/logout">
                                        <span>Sign out</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}


export default AdminSidebar;