import { getPostsByCategory } from "@/lib/posts"
import Link from "next/link"
import Image from "next/image"

export default async function FoodPage() {
  // get only movie posts
const posts = await getPostsByCategory("food")
    return(
         <main className="max-w-2xl mx-auto px-6 py-16">
           <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Food and Reviews
            </h1>
            <blockquote className="border-l-4 border-gray-300 pl-6 mb-8">
            <p className="text-gray-600 italic text-lg leading-relaxed">
            "Good food, good mood." 
            </p>
            </blockquote>
              <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            It is funny how we have spent years eating the most memorable meals,
            yet we cannot recall the exact taste. Only the salt. Maybe the heat.
            Maybe the smell that hit us before the first bite.
          </p>
          <p>
            Almost everyone wants food that tastes good and smells right. But what
            we rarely talk about is how personal that is  taste and aroma are not
            universal. They are shaped by where we grew up, what our mothers cooked
            on a Tuesday evening, what our culture decided was comfort and what was
            celebration.
          </p>
          <p>
            A dish that feels like home to one person is completely foreign to
            another. And yet somehow, across all of that difference, we all sit
            down and eat. That feels like something worth writing about.
          </p>
        </div>
      </div>

        <div className="border-t border-gray-100 mb-12" />
        
      {posts.length === 0 ? (
        <p className="text-gray-400 text-sm">No food posts yet. Check back soon.</p>
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
                <Link href={`/food/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                {post.excerpt}
              </p>

              <Link href={`/food/${post.slug}`} className="text-sm text-blue-500 hover:underline">
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