"use client"
import { supabase } from "@/lib/supabase"
import { useState } from "react"
import { useRouter } from "next/navigation"

const categories = ["movies", "books", "food", "poetry", "life", "abstract", "photography"]

export default function NewPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [category, setCategory] = useState("movies")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [excerpt, setExcerpt] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [published, setPublished] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // auto generate slug from title — runs on every title keystroke
  function handleTitleChange(value: string) {
    setTitle(value)
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .trim()
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.from("posts").insert({
      title, slug, category, date,
      excerpt, description, content,
      images: [], published,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // success — back to dashboard
    router.push("/admin")
  }

  // shared input styles — defined once, reused everywhere
  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
  const labelClass = "block text-sm text-gray-700 mb-1"

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
            className={inputClass}
            placeholder="Project Hail Mary"
            required
          />
        </div>

        <div>
          <label className={labelClass}>
            Slug <span className="text-gray-400">(auto generated)</span>
          </label>
          <input
            type="text"
            value={slug}
            onChange={e => setSlug(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className={inputClass}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Excerpt <span className="text-gray-400">(short preview)</span>
          </label>
          <textarea
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            rows={2}
            className={`${inputClass} resize-none`}
            placeholder="A short preview of this post..."
            required
          />
        </div>

        <div>
          <label className={labelClass}>
            Description <span className="text-gray-400">(context behind the post)</span>
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
            className={`${inputClass} resize-none`}
            placeholder="How you came across this..."
          />
        </div>

        <div>
          <label className={labelClass}>
            Content <span className="text-gray-400">(supports markdown)</span>
          </label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={12}
            className={`${inputClass} resize-none font-mono`}
            placeholder="Write your full article here..."
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={e => setPublished(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="published" className="text-sm text-gray-700">
            Publish immediately
          </label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Post"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="border border-gray-200 text-gray-600 px-6 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>

      </form>
    </main>
  )
}