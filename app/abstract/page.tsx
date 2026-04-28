import { getAllPosts } from "@/lib/posts"
import Link from "next/link"
import Image from "next/image"

export default function AbstractPage() {
  const posts = getAllPosts().filter(post => post.category === "abstract")

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Abstract
        </h1>

        {/* YOUR QUOTE HERE — something philosophical, economic, or thought provoking */}
        <blockquote className="border-l-4 border-gray-300 pl-6 mb-8">
          <p className="text-gray-600 italic text-lg leading-relaxed">
            Boxes which are unchecked
          </p>
          <footer className="text-sm text-gray-400 mt-2">— Unknown</footer>
        </blockquote>

        <div className="space-y-4 text-gray-600 leading-relaxed">
          {/* WRITE YOUR INTRO HERE */}
          {/* Talk about what abstract means to you */}
          {/* Economy, society, philosophy, big ideas */}
          {/* Why these topics matter to you */}
          <p>This section of the blog is for unexpected writings, fun moments, random incidents, or anything I think is a good read. No particular theme, no structure. Just things that felt worth putting down somewhere.</p>
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
                <Link href={`/abstract/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                {post.excerpt}
              </p>

              <Link href={`/abstract/${post.slug}`} className="text-sm text-blue-500 hover:underline">
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