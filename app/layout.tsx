import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Kyle Schrock",
  description: "Official site of Kyle Schrock",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-900 text-white flex flex-col">
        <header className="p-4 flex justify-between items-center bg-neutral-800 shadow">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold"><Link href="/">Home</Link></h1>
          </div>
          <nav className="space-x-6">
            <Link href="/events">Upcoming Shows</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>
        <main className="flex-grow p-6">{children}</main>
        <footer className="p-4 text-center text-sm text-black border-t border-neutral-700">
          © {new Date().getFullYear()} Kyle Schrock. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
