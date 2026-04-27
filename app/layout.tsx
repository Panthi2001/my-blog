import type { Metadata } from "next";
import {Geist} from "next/font/google"
import "./globals.css"

const geist = Geist({
  variable: "--font-geist-sans",
  subsets:["latin"]
});

export const metadata: Metadata = {
  title: "My Blog",
  description: "A world through the eyes of Kushal. Movies, Books, Friends, Recommendations and everything in between"
}

export default function RootLayout({
  children
}:{children: React.ReactNode;}){
return (
<html lang="en" className="{geist.variable}">
  <body>
    <nav  className="max-w-2xl mx-auto px-6 py-2">
      <a href="/">Home</a>
      <a href="/movies">Movies</a>
      <a href="/books">Books</a>
      <a href="/poems">Poems</a>
      <a href="/life"> Life</a>
      <a href="/articles">Articles</a>
    </nav>
    <main>
      {children}
    </main>
  </body>
</html>






);




}