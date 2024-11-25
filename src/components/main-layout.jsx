'use client'

import { AppSidebar } from "@/components/app-sidebar"
import BreadcrumbedHeader from "@/components/header-breadcrumb"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import Authenticated from "@/components/authenticated"
import { usePathname } from "next/navigation"

export default function MainLayout({ children }) {

    const pathname = usePathname();

    return (
        <Authenticated>
            {["/", "/sign-in", "/sign-up"].includes(pathname) ? (
                children
            ) : (
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                        <BreadcrumbedHeader />
                        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                            {children}
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            )}
        </Authenticated>
    )
}
