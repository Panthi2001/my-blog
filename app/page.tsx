// no "use client" here — this runs only on the server
import { getAllPosts } from "@/lib/posts"
import  HomeClient from './HomeClient'

export default function Home() {
  // this runs on the server — fs works fine here
  const posts = getAllPosts()

  // pass the posts down to the client component as a prop
  return <HomeClient posts={posts} />
}