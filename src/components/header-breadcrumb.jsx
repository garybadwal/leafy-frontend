'use client';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { navigations } from "@/lib/config";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

// Helper function to find the breadcrumb trail based on the current path
function findBreadcrumbTrail(navItems, pathname) {
    const trail = [];
    const findPath = (items, currentPath) => {
        for (const item of items) {
            if (item.urlRegex instanceof RegExp && item.urlRegex.test(currentPath)) {
                trail.push({ title: item.title, url: item.url });
                return true;
            }
            if (item.items && findPath(item.items, currentPath)) {
                trail.push({ title: item.title, url: item.url });
                return true;
            }
        }
        return false;
    };
    findPath(navItems, pathname);
    return trail.reverse(); // Reverse to get the path in order
}

export default function BreadcrumbedHeader() {
    const pathname = usePathname();
    const breadcrumbs = findBreadcrumbTrail(navigations.navMain, pathname);

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((breadcrumb, index) => (
                            <Fragment key={breadcrumb.url}>
                                <BreadcrumbItem >
                                    {index !== breadcrumbs.length - 1 ? (
                                        <>
                                            <BreadcrumbLink href={breadcrumb.url}>
                                                {breadcrumb.title}
                                            </BreadcrumbLink>
                                        </>
                                    ) : (
                                        <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                                {index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
