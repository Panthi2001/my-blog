import { getAllPosts } from "@/lib/posts"
import Link from "next/link"
import Image from "next/image"

export default function LifePage() {
  const posts = getAllPosts().filter(post => post.category === "life")

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Life
        </h1>

        {/* YOUR QUOTE HERE — pick something that resonates with how you see life */}
        <blockquote className="border-l-4 border-gray-300 pl-6 mb-8">
          <p className="text-gray-600 italic text-lg leading-relaxed">
           Yet to be figured out
          </p>
          <footer className="text-sm text-gray-400 mt-2">— Kusha Panthi</footer>
        </blockquote>

        <div className="space-y-4 text-gray-600 leading-relaxed">
          {/* WRITE YOUR INTRO HERE */}
          {/* Talk about why you write about life */}
          {/* What does this section mean to you */}
          {/* What kind of things will you write about here */}
        <p> Someone in the 5 B.C said who gives a fuck</p>
        </div>
      </div>

      <div className="border-t border-gray-100 mb-12" />

      {posts.length === 0 ? (
        <p className="text-gray-400 text-sm">Nothing written yet. Check back soon.</p>
      ) : (
        <div className="space-y-8">
          {posts.map(post => (
            <div key={post.slug} className="group">

              {post.images && post.images.length > 0 && (
                <div className="relative h-52 mb-4">
                  <Image
                    src={post.images[0]}
                    alt={post.title}
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
              )}

              <span className="text-xs text-gray-400">{post.date}</span>

              <h2 className="text-xl font-semibold text-gray-900 mt-1 mb-2 group-hover:text-blue-500 transition-colors duration-200">
                <Link href={`/life/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                {post.excerpt}
              </p>

              <Link href={`/life/${post.slug}`} className="text-sm text-blue-500 hover:underline">
                Read more →
              </Link>

              <div className="border-b border-gray-100 mt-8" />

            </div>
          ))}
        </div>
      )}

    </main>
  )
}