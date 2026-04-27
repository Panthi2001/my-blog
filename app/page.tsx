import { getAllPostsFromDB } from "@/lib/posts"
import HomeClient from "./HomeClient"

export default async function Home() {
  const posts = await getAllPostsFromDB()
  console.log("Posts from DB:", posts)
  console.log("Post count:", posts.length)
  return <HomeClient posts={posts} />
}