"use client"

import * as React from "react"

import {
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function SideBarBranding({
    branding
}) {

    return (
        <SidebarMenu>
            <SidebarMenuItem className="flex flex-row w-full h-fit gap-2 justify-center items-start" asChild>
                <Link href={'/'} className="flex flex-row w-full h-fit gap-2 justify-center items-start">
                    <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                        <branding.logo className="size-6" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-bold text-xl text-primary">
                            {branding.name}
                        </span>
                        <span className="truncate text-xs">{branding.plan}</span>
                    </div>
                </Link>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
