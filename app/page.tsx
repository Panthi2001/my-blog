import { getAllPostsFromDB } from "@/lib/posts"
import HomeClient from "./HomeClient"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = Number(page) || 1
  const { posts, total } = await getAllPostsFromDB(currentPage, 10)
  const totalPages = Math.ceil(total / 10)

  return <HomeClient posts={posts} currentPage={currentPage} totalPages={totalPages} />
}