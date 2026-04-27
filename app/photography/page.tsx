import { getAllPosts } from "@/lib/posts"
import Link from "next/link"
import Image from "next/image"

export default function PhotographyPage() {
  const posts = getAllPosts().filter(post => post.category === "photography")

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Photography
        </h1>

        {/* YOUR QUOTE HERE — something about seeing, light, or capturing moments */}
        <blockquote className="border-l-4 border-gray-300 pl-6 mb-8">
          <p className="text-gray-600 italic text-lg leading-relaxed">
            "Your quote here"
          </p>
          <footer className="text-sm text-gray-400 mt-2">— Author</footer>
        </blockquote>

        <div className="space-y-4 text-gray-600 leading-relaxed">
          {/* WRITE YOUR INTRO HERE */}
          {/* Talk about your relationship with photography */}
          {/* What you try to capture */}
          {/* Your camera, your eye, your process */}
          <p>Your intro paragraph one here.</p>
          <p>Your intro paragraph two here.</p>
          <p>Your intro paragraph three here.</p>
        </div>
      </div>

      <div className="border-t border-gray-100 mb-12" />

      {/* photography uses a grid layout — images are the content */}
      {posts.length === 0 ? (
        <p className="text-gray-400 text-sm">No photos yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {posts.map(post => (
            <Link key={post.slug} href={`/photography/${post.slug}`} className="group">

              {post.images && post.images.length > 0 ? (
                <div className="relative h-48">
                  <Image
                    src={post.images[0]}
                    alt={post.title}
                    fill
                    className="rounded-xl object-cover group-hover:opacity-90 transition-opacity duration-200"
                  />
                </div>
              ) : (
                // placeholder if no image yet
                <div className="h-48 bg-gray-100 rounded-xl" />
              )}

              <p className="text-sm text-gray-600 mt-2 group-hover:text-blue-500 transition-colors duration-200">
                {post.title}
              </p>
              <p className="text-xs text-gray-400">{post.date}</p>

            </Link>
          ))}
        </div>
      )}

    </main>
  )
}