import { searchPosts } from "@/lib/posts"
import Link from "next/link"
import Image from "next/image"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q || ""
  
  // only search if query is at least 2 characters
  const posts = query.length >= 2 ? await searchPosts(query) : []

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Search</h1>

      {/* search results */}
      {query.length >= 2 && posts.length === 0 && (
        <p className="text-gray-400 text-sm">
          No results found for "{query}"
        </p>
      )}

      {posts.length > 0 && (
        <div>
          <p className="text-sm text-gray-400 mb-8">
            {posts.length} result{posts.length !== 1 ? "s" : ""} for "{query}"
          </p>

          <div className="space-y-8">
            {posts.map(post => (
              <div key={post.slug} className="group">

                {post.images && post.images.length > 0 && (
                  <div className="relative h-48 mb-4">
                    <Image
                      src={post.images[0]}
                      alt={post.title}
                      fill
                      className="rounded-xl object-cover"
                    />
                  </div>
                )}

                <span className="text-xs uppercase tracking-widest text-gray-400">
                  {post.category}
                </span>

                <h2 className="text-xl font-semibold text-gray-900 mt-1 mb-2 group-hover:text-blue-500 transition-colors duration-200">
                  <Link href={`/${post.category}/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

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

                <div className="border-b border-gray-100 mt-8" />

              </div>
            ))}
          </div>
        </div>
      )}

    </main>
  )
}