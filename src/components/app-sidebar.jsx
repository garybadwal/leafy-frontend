"use client"

import * as React from "react"
import {
  Bot,
  Fence,
  LayoutPanelLeft,
  Leaf,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { SideBarBranding } from "@/components/sidebar-branding"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { navigations } from "@/lib/config"
import { useAuth } from "@/components/authenticated"

export function AppSidebar({ ...props }) {
  const {user, loading} = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SideBarBranding branding={navigations.branding} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigations.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user?.user_metadata} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
