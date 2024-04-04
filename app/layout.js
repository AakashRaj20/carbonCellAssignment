import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MobileNav from "@/components/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <MobileNav />
          <div className="lg:col-span-2">
            <Navbar />
          </div>
          <div className="lg:col-span-10 p-2 lg:pl-0 mt-14 md:mt-14 lg:mt-0">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
