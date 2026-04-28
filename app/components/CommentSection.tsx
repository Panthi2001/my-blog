"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

type Comment = {
  id: string
  name: string
  content: string
  created_at: string
}

export default function CommentSection({
  postSlug,
  postCategory,
}: {
  postSlug: string
  postCategory: string
}) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // fetch comments when page loads
  useEffect(() => {
    async function fetchComments() {
      const { data } = await supabase
        .from("comments")
        .select("*")
        .eq("post_slug", postSlug)
        .order("created_at", { ascending: false })

      if (data) setComments(data)
    }

    fetchComments()
  }, [postSlug])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    const { error } = await supabase.from("comments").insert({
      post_slug: postSlug,
      post_category: postCategory,
      name,
      content,
    })

    if (error) {
      setError("Something went wrong. Please try again.")
      setLoading(false)
      return
    }

    // add new comment to list without refetching
    setComments(prev => [{
      id: Date.now().toString(),
      name,
      content,
      created_at: new Date().toISOString(),
    }, ...prev])

    // reset form
    setName("")
    setContent("")
    setSuccess(true)
    setLoading(false)
  }

  // format date nicely
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400"

  return (
    <div className="mt-16 border-t border-gray-100 pt-12">

      <h2 className="text-xl font-semibold text-gray-900 mb-8">
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      {/* comment form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-12">

        <div>
          <label className="block text-sm text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Comment</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder="Write your comment..."
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {success && (
          <p className="text-green-500 text-sm">Comment posted successfully.</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>

      </form>

      {/* comments list */}
      {comments.length === 0 ? (
        <p className="text-gray-400 text-sm">No comments yet. Be the first to leave one.</p>
      ) : (
        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment.id} className="border-b border-gray-100 pb-6">

              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 text-sm">
                  {comment.name}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDate(comment.created_at)}
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {comment.content}
              </p>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}