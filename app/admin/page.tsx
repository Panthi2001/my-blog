import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"


export default async function AdminDashboard() {
  // check if user is logged in — if not redirect to login
  const session = await getServerSession()
  if (!session) redirect("/admin/login")

  // fetch all posts including drafts
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("date", { ascending: false })

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      {/* header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your blog content
          </p>
        </div>

        {/* button to create new post */}
        <Link
          href="/admin/new"
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors duration-200"
        >
          + New Post
        </Link>
      </div>

      {/* posts table */}
      <div className="border border-gray-100 rounded-xl overflow-hidden">

        {/* table header */}
        <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 text-xs uppercase tracking-widest text-gray-400">
          <span className="col-span-2">Title</span>
          <span>Category</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        {/* post rows */}
        {posts && posts.map(post => (
          <div
            key={post.id}
            className="grid grid-cols-5 gap-4 px-6 py-4 border-t border-gray-100 items-center hover:bg-gray-50 transition-colors duration-150"
          >
            {/* title and edit link */}
            <div className="col-span-2">
              <p className="text-sm font-medium text-gray-900 truncate">
                {post.title}
              </p>
              <div className="flex gap-3 mt-1">
                <Link
                  href={`/admin/edit/${post.id}`}
                  className="text-xs text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <Link
                  href={`/${post.category}/${post.slug}`}
                  className="text-xs text-gray-400 hover:underline"
                  target="_blank"
                >
                  View →
                </Link>
              </div>
            </div>

            {/* category */}
            <span className="text-sm text-gray-500 capitalize">
              {post.category}
            </span>

            {/* date */}
            <span className="text-sm text-gray-400">
              {post.date}
            </span>

            {/* published status */}
            <span className={`text-xs px-2 py-1 rounded-full w-fit ${
              post.published
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-400"
            }`}>
              {post.published ? "Published" : "Draft"}
            </span>

          </div>
        ))}

      </div>

    </main>
  )
}

