import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import useServerPathname from "@/hooks/serverPathname";
import Sidebar from "@/components/custom/sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default: "Leafy",
    template: "%s | Leafy",
  },
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const pathname = useServerPathname();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {["/", "/sign-in", "/sign-up"].includes(pathname) ? (
          children
        ) : (
          <main className="flex flex-col lg:flex-row justify-start items-center w-screen h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col justify-center items-center w-full h-full">
              {children}
            </div>
          </main>
        )}
        <Toaster />
      </body>
    </html>
  );
}
