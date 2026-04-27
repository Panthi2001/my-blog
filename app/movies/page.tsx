import { getAllPosts } from "@/lib/posts"
import Link from "next/link"
import Image from "next/image"

export default function MoviesPage() {
  // get only movie posts
  const posts = getAllPosts().filter(post => post.category === "movies")

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      {/* intro section */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Movies
        </h1>

        <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
  These are the movies I have enjoyed watching or simply cannot forget,
  the ones that left something behind after the credits rolled. Not reviews
  in the traditional sense. More like honest reactions from someone who
  watches too much and thinks too hard.
</p>
<p>
  What draws me to cinema is the lens of the director, the way they choose
  to see the world. A frame that captures something I walked past a hundred
  times without ever really seeing. Movies remind me how many lives happen
  around us daily that we never notice, never think about, never care to
  understand. A good film makes you care, even briefly.
</p>
<p>
  I am not a critic. I am just someone who sat in the dark and felt something.
  That is all any of us are when the lights go down.
</p>
        </div>
      </div>

      {/* divider */}
      <div className="border-t border-gray-100 mb-12" />

      {/* articles list */}
      {posts.length === 0 ? (
        <p className="text-gray-400 text-sm">No movies written about yet. Check back soon.</p>
      ) : (
        <div className="space-y-8">
          {posts.map(post => (
            <div key={post.slug} className="group">

              {/* image if exists */}
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

              {/* date */}
              <span className="text-xs text-gray-400">{post.date}</span>

              {/* title */}
              <h2 className="text-xl font-semibold text-gray-900 mt-1 mb-2 group-hover:text-blue-500 transition-colors duration-200">
                <Link href={`/movies/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              {/* excerpt */}
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                {post.excerpt}
              </p>

              {/* read more */}
              <Link
                href={`/movies/${post.slug}`}
                className="text-sm text-blue-500 hover:underline"
              >
                Read more →
              </Link>

              {/* divider between posts */}
              <div className="border-b border-gray-100 mt-8" />

            </div>
          ))}
        </div>
      )}

    </main>
  )
}