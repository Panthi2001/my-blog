import { getAllPostsFromDB } from "@/lib/posts"
import Link from "next/link"
import Image from "next/image"

export default async function BooksPage() {
  const posts = await getAllPostsFromDB().then(p => p.filter(post => post.category === "books"))

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      {/* intro */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Books
        </h1>

        <div className="space-y-4 text-gray-600 leading-relaxed">
       <p>
  Books have a strange way of finding you at the exact moment you need them. Sometimes you pick one up without thinking much about it. Other times it starts with something small, a random post while doom scrolling, someone saying a book changed their life forever, and that curiosity pulls you in. And somehow, it ends up meaning more than you expected.
</p>
<p>
  Books hold entire worlds within them, and often something beyond that. They move across everything, stories of desire and the deeply human, to the darkest and most unsettling corners of thought, to love, hate, war, and wild, unrestrained fiction. They do not just reflect reality, they preserve the unseen parts of it, the layers we pass by without noticing.
</p>
<p>
  What I enjoy most is how unbounded books can feel. When a writer is not tightly held by rules or authority, the work takes on a different kind of life. It can be sharp, uncomfortable, beautiful, or completely unpredictable. Out of that freedom come unforgettable characters, heroes, villains, entire worlds, even ideas that would not survive anywhere else.
</p>
<p>
  These are not reviews in any strict sense. They are closer to conversations I had with a book, what it showed me, what I brought into it, and what neither of us expected to find. Some I read for the story. Some I read because something in the real world demanded I try to understand more.
</p>
<p>
  I read slowly and I read carefully. A book that makes me pause and stare at the wall for a few minutes is doing something right.
</p>
        </div>
      </div>

      <div className="border-t border-gray-100 mb-12" />

      {/* articles list */}
      {posts.length === 0 ? (
        <p className="text-gray-400 text-sm">No books written about yet. Check back soon.</p>
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
                <Link href={`/books/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                {post.excerpt}
              </p>

              <Link
                href={`/books/${post.slug}`}
                className="text-sm text-blue-500 hover:underline"
              >
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