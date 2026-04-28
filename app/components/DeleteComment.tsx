"use client"

import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function DeleteComment({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm("Delete this comment?")) return

    await supabase.from("comments").delete().eq("id", id)

    // refresh the page to show updated list
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs text-red-500 hover:text-red-700 transition-colors duration-200"
    >
      Delete
    </button>
  )
}