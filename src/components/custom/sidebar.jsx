"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChartLine, Fence, LayoutDashboard, Leaf, UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { navigate } from "@/hooks/navigate";
import Link from "next/link";
import { lugife } from "@/lib/config";
import { Separator } from "@/components/ui/separator";
import { signOutAction } from "@/lib/actions";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/authenticated";

export function LogOutDialog() {
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await signOutAction();
    if (res?.status == 200) {
      navigate("/sign-in");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "justify-start items-center w-full flex cursor-default select-none rounded-sm py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 px-2"
          )}
        >
          Sign out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will log you out of the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              buttonVariants("destructive"),
              "bg-red-600 hover:bg-red-500"
            )}
            onClick={handleLogout}
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const NAV = [
  {
    icon: <LayoutDashboard className="h-8 w-8" />,
    title: "Dashboard",
    value: "dashboard",
    href: "/dashboard",
  },
  {
    icon: <Fence className="h-8 w-8" />,
    title: "My Garden",
    value: "my-garden",
    href: "/garden",
  },
  {
    icon: <ChartLine className="h-8 w-8" />,
    title: "Analytics",
    value: "analytics",
    href: "#",
  },
];

export function SidebarNav({ className, items, ...props }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex flex-col justify-start w-full lg:space-y-2",
        className
      )}
      {...props}
    >
      {items.map((item, idx) => {
        return (
          <div
            key={idx}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname.includes(item.href)
                ? "hover:bg-primary bg-primary"
                : "hover:bg-gray-100 hover:no-underline",
              "relative justify-between cursor-pointer w-full"
            )}
          >
            <Link
              href={item.href}
              className={cn(
                "flex flex-row justify-start items-center w-full gap-3 text-[1rem] font-semibold",
                pathname.includes(item.href)
                  ? "w-full p-0 text-white"
                  : "w-full p-0 text-primary"
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}

export function UserDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "hover:bg-primary hover:no-underline hover:text-white text-primary",
            "flex flex-row items-center justify-start cursor-pointer relative w-full py-6"
          )}
        >
          <div
            className={`flex flex-row items-center justify-start w-full h-full p-0 gap-2 text-[1rem] font-semibold`}
          >
            <Avatar>
              <AvatarFallback className="text-primary">
                <UserRound className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <p>Profile</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ms-5 w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <LogOutDialog />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Sidebar({ params }) {
  return (
    <>
      <div className="hidden lg:flex flex-col justify-center items-center w-[300px] h-full">
        <Card className="flex flex-col w-full h-full shadow-none rounded-none">
          <CardHeader className="flex flex-row justify-center items-center w-full px-2">
            <div
              className={cn(
                "flex items-center text-3xl font-medium text-[#16423C]",
                lugife.className
              )}
            >
              <Link className="flex flex-row gap-1 items-center" href={"/"}>
                <Leaf className="h-8 w-8" />
                LEAFY
              </Link>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center px-2 pb-2 gap-3">
            <Separator />
            <SidebarNav items={NAV} />
          </CardContent>
          <CardFooter className="mt-auto mb-0 flex-col gap-3 px-2 pb-2">
            <Separator />
            <UserDropDown />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
