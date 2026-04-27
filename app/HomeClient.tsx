"use client"

import { useState } from "react"
import Link from "next/link"
import { Post } from "@/lib/posts"
import Image from "next/image"
// receives posts from the server as a prop
export default function HomeClient({ posts }: { posts: Post[] }) {
  const [showMore, setShowMore] = useState(false)

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 ">

      {/* Top half — intro */}
      <div className="flex items-center gap-8 mb-16 px-6 rounded-xl
  shadow-md 
  hover:shadow-xl 
  transition-shadow 
  duration-300">
        <div className="w-24 h-24 rounded-full bg-gray-200 shrink-0" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Kushal Panthi
          </h1>
          <p className="text-gray-500 leading-relaxed mb-3">
            CS student and professional, occasional writer, and a leaf in the wind.
            This is my corner of the internet.
          </p>

          <button
            onClick={() => setShowMore(!showMore)}
            className="text-sm text-blue-500 hover:underline"
          >
            {showMore ? "Show less ↑" : "More about me ↓"}
          </button>

          {showMore && (
            <div className="mt-4 text-gray-600 leading-relaxed space-y-3 text-sm">
              <p>
                I am in my late 20s. A student of computer science and technology 
                though that is just one layer of who I am.
              </p>
              <p>
                Occasionally I write poems in Nepali. Did I forget to mention that I
                am a Nepali, stranded between Homo sapiens and this particular point
                in time?
              </p>
              <p>
                I am just a leaf stranded in the wind. When there is no wind, I am
                here  but usually I like to make plans, take actions, read books,
                listen to a TED talk or two.
              </p>
              <p>
                Could you imagine our ancestors used to carve information onto stones 
                while today, in a single day, we produce more information than all of
                humanity created before the 20th century. Even if most of it is useless. Haha.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom half — latest writing */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 ">
          Latest Writing
        </h2>

        <div className="space-y-8 rounded-xl px-6
  shadow-md 
  hover:shadow-xl 
  transition-shadow 
  duration-300">
          {posts.map((post: Post) => (
            <div key={post.slug} className="border-b border-gray-100 pb-8">
              {post.images && post.images.length > 0 && (
  <Image
    src={post.images[0]}
    alt={post.title}
    width={400}
    height={200}
    className="w-full rounded-lg mb-3 object-cover"
  />
)}
              <span className="text-xs uppercase tracking-widest text-gray-400">
                {post.category}
              </span>

              <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">
                {post.title}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{post.date}</span>
                <Link
                  href={`/${post.category}/${post.slug}`}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Read more →
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

    </main>
  )
}