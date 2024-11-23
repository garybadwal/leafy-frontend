"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/custom/sidebar";
import Authenticated from "@/components/authenticated";

export default function MainLayout({ children }) {
  const pathname = usePathname();

  return (
    <Authenticated>
      {["/", "/sign-in", "/sign-up"].includes(pathname) ? (
        children
      ) : (
        <>
          <main className="flex flex-col lg:flex-row justify-start items-center w-screen h-screen gap-5 overflow-hidden">
            <Sidebar />
            <div className="flex flex-col justify-center items-center w-full h-full">
              {children}
            </div>
          </main>
        </>
      )}
    </Authenticated>
  );
}
