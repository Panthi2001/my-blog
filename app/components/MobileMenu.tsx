"use client"

import { useState } from "react"
import Link from "next/link"

const links = [
  { href: "/movies", label: "Movies" },
  { href: "/books", label: "Books" },
  { href: "/poetry", label: "Poetry" },
  { href: "/life", label: "Life" },
  { href: "/abstract", label: "Abstract" },
  { href: "/food", label: "Food" },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">

      {/* hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
      >
        {open ? (
          // X icon when open
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          // hamburger icon when closed
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        )}
      </button>

      {/* dropdown menu */}
      {open && (
        <div className="absolute right-0 top-10 w-48 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg py-2 z-50">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

    </div>
  )
}