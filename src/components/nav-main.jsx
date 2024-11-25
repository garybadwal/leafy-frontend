"use client"

import { ChevronRight, Layers2 } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"

function doesPathMatchDict(main, pathname) {
    // Helper function to recursively check urls in items
    function checkItems(items, path) {
        return items.some((item) => {
            if (item.url === path) {
                return true;
            }
            if (item.items && item.items.length > 0) {
                return checkItems(item.items, path);
            }
            return false;
        });
    }

    // Check the top-level url and its nested items
    if (main.url === pathname) {
        return true;
    }
    if (main.items && main.items.length > 0) {
        return checkItems(main.items, pathname);
    }
    return false;
}

export function NavMain({
    items,
}) {
    const pathname = usePathname();
    return (
        <SidebarGroup>
            <SidebarGroupLabel><Layers2 className="h-2 w-2 me-2" />Discover</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    !item.hidden
                        ? item?.items?.length > 0
                            ? <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={doesPathMatchDict(item, pathname)}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip={item.title}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                            {item.items?.length > 0 && <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                !subItem.hidden ?
                                                    (<SidebarMenuSubItem key={subItem.title} className={cn(doesPathMatchDict(item, pathname) ? "bg-neutral-100 text-accent-foreground hover:bg-neutral-100 hover:text-accent-foreground" : "")}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link href={subItem.url}>
                                                                <span>{subItem.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>)
                                                    : (<></>)
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                            : <SidebarMenuItem key={item.title} className={cn(doesPathMatchDict(item, pathname) ? "bg-neutral-100 text-accent-foreground hover:bg-neutral-100 hover:text-accent-foreground" : "")}>
                                <SidebarMenuButton tooltip={item.title} asChild>
                                    <Link href={item.url}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        {item.items?.length > 0 && <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        : <></>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
