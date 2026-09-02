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
      <body className="flex min-h-screen flex-col bg-white text-black">
        <header className="border-b border-neutral-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 md:px-10">
            <Link href="/" className="group shrink-0" aria-label="Kyle Schrock home">
              <span className="block text-xl font-black tracking-tight text-black transition group-hover:text-neutral-600 md:text-2xl">
                Kyle Schrock
              </span>
              <span className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-neutral-500">
                Stand-up comedian
              </span>
            </Link>
            <nav aria-label="Main navigation" className="flex items-center gap-5 text-sm font-semibold md:gap-8">
              <Link href="/events" className="text-neutral-700 transition hover:text-black">
                Shows
              </Link>
              <Link href="/about" className="text-neutral-700 transition hover:text-black">
                About
              </Link>
              <Link href="/contact" className="text-neutral-700 transition hover:text-black">
                Contact
              </Link>
              <Link
                href="/contact"
                className="hidden rounded-lg bg-black px-5 py-2.5 text-white transition hover:bg-neutral-700 sm:inline-block"
              >
                Book Kyle
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-black px-6 py-12 text-white md:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <Link href="/" className="text-2xl font-black tracking-tight">
                Kyle Schrock
              </Link>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-400">
                Stand-up comedy about the everyday chaos we all recognize.
              </p>
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#dfe490]">
                Explore
              </h2>
              <nav aria-label="Footer navigation" className="mt-4 flex flex-col gap-3 text-sm text-neutral-300">
                <Link href="/events" className="transition hover:text-white">Upcoming shows</Link>
                <Link href="/about" className="transition hover:text-white">About Kyle</Link>
                <Link href="/contact" className="transition hover:text-white">Booking and contact</Link>
              </nav>
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#dfe490]">
                Stay in touch
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                Have a venue, event, or good story? Get in touch.
              </p>
              <Link href="/contact" className="mt-4 inline-block text-sm font-bold underline underline-offset-4 transition hover:text-[#dfe490]">
                Start a conversation
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-neutral-800 pt-5 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Kyle Schrock. All rights reserved.</p>
            <p>South Bend, Indiana</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
