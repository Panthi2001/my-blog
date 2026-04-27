// fs = file system, built into Node.js, lets us read files from disk
import fs from "fs"

// path = built into Node.js, helps build file paths that work on Mac/Windows/Linux
import path from "path"

// gray-matter = splits markdown files into frontmatter (data) and content
import matter from "gray-matter"

// build the absolute path to your /content folder
// process.cwd() = root of your project
const contentDirectory = path.join(process.cwd(), "content")

// this is the shape of every post object — TypeScript will warn you if anything is missing
export type Post = {
  slug: string        // filename without .md — used in the URL
  category: string   // which folder it came from (movies, poetry etc)
  title: string      // from frontmatter
  date: string       // from frontmatter — used for sorting
  excerpt: string    // short preview shown on homepage cards
  description: string // context — how you found it, why you wrote it
  images: string[]      // optional image path, empty string if none
  content: string    // the full article body below the frontmatter
}

// all your content folders — we loop through each one
const categories = [
  "movies",
  "books",
  "food",
  "poetry",
  "life",
  "abstract",
  "photography"
]

// this function collects every article from every category and returns them sorted by date
export function getAllPosts(): Post[] {
  
  // start with an empty array — we fill this up as we find articles
  const allPosts: Post[] = []

  // go through each category one by one
  for (const category of categories) {
    
    // build path to this category folder e.g. /content/movies
    const categoryPath = path.join(contentDirectory, category)

    // if the folder doesn't exist yet, skip it — prevents crashes
    if (!fs.existsSync(categoryPath)) continue

    // get list of all files inside this category folder
    const files = fs.readdirSync(categoryPath)

    // go through each file in the folder
    for (const file of files) {

      // skip anything that isn't a markdown file (images, folders etc)
      if (!file.endsWith(".md")) continue

      // build the full path to this specific file
      const filePath = path.join(categoryPath, file)

      // read the raw text content of the file
      const fileContent = fs.readFileSync(filePath, "utf-8")

      // gray-matter splits the file into:
      // data = frontmatter (title, date, excerpt etc)
      // content = everything below the --- block
      const { data, content } = matter(fileContent)

      // add this post to our array as a clean object
      allPosts.push({
        slug: file.replace(".md", ""), // project-hail-mary.md → project-hail-mary
        category,                      // movies, poetry etc
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        description: data.description || "", // if no description, use empty string
        images: data.image || [],             // if no image, use empty string
        content,
      })
    }
  }

  // sort all posts by date — newest first
  // getTime() converts date string to a number so we can compare them
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}


// gets a single post by its category and slug
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