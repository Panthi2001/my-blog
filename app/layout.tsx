import type { Metadata } from "next"
import { Geist } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Lens of Kushal",
  description: "A world through the eyes of Kushal. Movies, books, poetry and everything in between.",
  icons:{
    icon:"./favicon.ico"
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-white text-gray-900 min-h-screen flex flex-col">

        {/* navbar */}
        <header className="border-b border-gray-100 sticky top-0 bg-white z-10">
          <nav className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">

            {/* blog name — left side */}
            <Link href="/" className="font-semibold text-gray-900 tracking-tight hover:text-gray-600 transition-colors duration-200">
              Lens of Kushal
            </Link>

            {/* links — right side */}
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/movies" className="hover:text-gray-900 transition-colors duration-200">
                Movies
              </Link>
              <Link href="/books" className="hover:text-gray-900 transition-colors duration-200">
                Books
              </Link>
              <Link href="/poetry" className="hover:text-gray-900 transition-colors duration-200">
                Poetry
              </Link>
              <Link href="/life" className="hover:text-gray-900 transition-colors duration-200">
                Life
              </Link>
              <Link href="/abstract" className="hover:text-gray-900 transition-colors duration-200">
                Abstract
              </Link>
               <Link href="/food" className="hover:text-gray-900 transition-colors duration-200">
                Food
              </Link>
              <Link href="/photography" className="hover:text-gray-900 transition-colors duration-200">
                Photography
              </Link>
              
            </div>

          </nav>
        </header>

        {/* page content */}
        <main className="flex-1">
          {children}
        </main>

        {/* footer */}
        <footer className="border-t border-gray-100 mt-16">
          <div className="max-w-2xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-gray-400">
            <span>Kushal Panthi</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </footer>

      </body>
    </html>
  )
}