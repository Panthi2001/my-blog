import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { supabase } from "./supabase"

const contentDirectory = path.join(process.cwd(), "content")

export type Post = {
  slug: string
  category: string
  title: string
  date: string
  excerpt: string
  description: string
  images: string[]
  content: string
}

const categories = [
  "movies",
  "books",
  "food",
  "poetry",
  "life",
  "abstract",
  "photography"
]

export function getAllPosts(): Post[] {
  const allPosts: Post[] = []

  for (const category of categories) {
    const categoryPath = path.join(contentDirectory, category)
    if (!fs.existsSync(categoryPath)) continue

    const files = fs.readdirSync(categoryPath)

    for (const file of files) {
      if (!file.endsWith(".md")) continue

      const filePath = path.join(categoryPath, file)
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const { data, content } = matter(fileContent)

      allPosts.push({
        slug: file.replace(".md", ""),
        category,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        description: data.description || "",
        images: data.images || [],
        content,
      })
    }
  }

  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(category: string, slug: string): Post | undefined {
  const filePath = path.join(contentDirectory, category, `${slug}.md`)
  if (!fs.existsSync(filePath)) return undefined

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  return {
    slug,
    category,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    description: data.description || "",
    images: data.images || [],
    content,
  }
}

export async function getAllPostsFromDB(page = 1, limit = 10): Promise<{posts: Post[], total: number}> {
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .eq("published", true)
    .order("date", { ascending: false })
    .range(from, to)

  if (error) {
    console.error("Error fetching posts:", error)
    return { posts: [], total: 0 }
  }

  return { posts: data as Post[], total: count || 0 }
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .eq("category", category)
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  return data as Post[]
}

export async function getPostBySlugFromDB(
  category: string,
  slug: string
): Promise<Post | undefined> {
  console.log("Looking for:", category, slug)
  
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("category", category)
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching post:", error)
    return undefined
  }

  return data as Post
}