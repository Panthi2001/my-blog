import { getPostBySlugFromDB } from "@/lib/posts"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import CommentSection from "@/app/components/CommentSection"
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  const post = await getPostBySlugFromDB(category, slug)

  if (!post) return notFound()

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      <span className="text-xs uppercase tracking-widest text-gray-400">
        {post.category}
      </span>

      <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-2">
        {post.title}
      </h1>

      <p className="text-sm text-gray-400 mb-4">{post.date}</p>

      {post.description && (
        <p className="text-gray-500 italic border-l-4 border-gray-200 pl-4 mb-8">
          {post.description}
        </p>
      )}

      {post.images && post.images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {post.images.map((image, index) => (
            <div key={index} className="relative h-48">
              <Image
                src={image}
                alt={`${post.title} image ${index + 1}`}
                fill
                className="rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className={`leading-relaxed space-y-4 prose prose-gray max-w-none ${
        post.category === "poetry"
          ? "text-center italic text-gray-700 text-lg font-serif border-t border-gray-200 pt-8 mt-4"
          : "text-gray-700"
      }`}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
        <CommentSection postSlug={slug} postCategory={category} />
    </main>
  )
}