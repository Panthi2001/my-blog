"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

const categories = ["movies", "books", "food", "poetry", "life", "abstract", "photography"]

const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
const labelClass = "block text-sm text-gray-700 mb-1"

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState("")
  const [id, setId] = useState("")
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [category, setCategory] = useState("movies")
  const [date, setDate] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [published, setPublished] = useState(true)
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function init() {
      const resolvedParams = await params
      const postId = resolvedParams.id
      setId(postId)

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single()

      if (error || !data) {
        setError("Post not found")
        setFetching(false)
        return
      }

      setTitle(data.title)
      setSlug(data.slug)
      setCategory(data.category)
      setDate(data.date)
      setExcerpt(data.excerpt)
      setDescription(data.description || "")
      setContent(data.content)
      setPublished(data.published)
      // load existing images from database
      setImages(data.images || [])
      setFetching(false)
    }

    init()
  }, [])

  // upload single file to supabase storage and return public URL
  async function handleImageUpload(file: File): Promise<string> {
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`

    const { error } = await supabase.storage
      .from("images")
      .upload(filename, file)

    if (error) {
      setError("Image upload failed: " + error.message)
      return ""
    }

    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(filename)

    return urlData.publicUrl
  }

  // handle multiple file selection
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const uploadedUrls: string[] = []

    for (const file of Array.from(files)) {
      const url = await handleImageUpload(file)
      if (url) uploadedUrls.push(url)
    }

    setImages(prev => [...prev, ...uploadedUrls])
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase
      .from("posts")
      .update({
        title, slug, category, date,
        excerpt, description, content,
        images, // save updated images array
        published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/admin")
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this post?")) return

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)

    if (error) {
      setError(error.message)
      return
    }

    router.push("/admin")
  }

  if (fetching) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-16">
        <p className="text-gray-400 text-sm">Loading post...</p>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
        <button
          onClick={handleDelete}
          className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          Delete post
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Slug</label>
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
          <label className={labelClass}>Excerpt</label>
          <textarea
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            rows={2}
            className={`${inputClass} resize-none`}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
            className={`${inputClass} resize-none`}
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
            required
          />
        </div>

        {/* image upload */}
        <div>
          <label className={labelClass}>
            Images <span className="text-gray-400">(optional, multiple allowed)</span>
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-900 file:text-white hover:file:bg-gray-700"
          />

          {uploading && (
            <p className="text-sm text-gray-400 mt-2">Uploading images...</p>
          )}

          {/* show existing and newly uploaded images */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {images.map((url, index) => (
                <div key={index} className="relative h-24">
                  <img
                    src={url}
                    alt={`image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {/* remove image from array */}
                  <button
                    type="button"
                    onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
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
            Published
          </label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || uploading}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
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