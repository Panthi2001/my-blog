import { getAllPosts, getAllPostsFromDB } from "@/lib/posts"
import Link from "next/link"

export default async function PoetryPage() {
  const posts = await getAllPostsFromDB().then(p => p.filter(post => post.category === "poetry"))

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Poetry
        </h1>

        <blockquote className="border-l-4 border-gray-300 pl-6 mb-8">
          <p className="text-gray-600 italic text-lg leading-relaxed">
            "Out beyond ideas of wrongdoing and rightdoing, there is a field.
            I will meet you there."
          </p>
          <footer className="text-sm text-gray-400 mt-2">
            — Rumi, translated by Coleman Barks
            <a
              href="https://poetrysociety.org/poetry-in-motion/out-beyond-ideas-of-wrongdoing-and-rightdoing"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-400 hover:underline"
            >
              Read full poem →
            </a>
          </footer>
        </blockquote>

        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            With the gift of the internet and translation across languages, we in
            the 21st century can understand poets from every corner of the world,
            every era, every time frame. From Rumi to Shakespeare to our own beloved
            poets of Nepal  Motti Ram Bhatta, Laxmi Prasad Devkota, Bhanubhakta
            Acharya  their words are now only a search away.
          </p>
          <p>
            And yet I feel we are not utilizing this immense gift. In an era of
            scrolling, shorter formats, constant dopamine, and the endless hunger
            for stimulation, the ability to sit with a poem to really sit with it 
            has quietly degraded. We consume more and absorb less.
          </p>
          <p>
            But here is what I wish more people knew: poems are short. You can read
            a hundred in a day. They ask for very little time and give back something
            disproportionate  a good dopamine, a cross-examination of your own
            thoughts, a dimensional shift that can range from profanity to
            righteousness, from grief to something that feels almost like flight.
          </p>
          <p>
            This is my small corner for poetry. Some I have written myself, in Nepali,
            in the quiet moments between everything else. Some are poems I have come
            across that stopped me mid-scroll and made me read them again. And again.
          </p>
      </div>
      </div>

      <div className="border-t border-gray-100 mb-12" />

      {posts.length === 0 ? (
        <p className="text-gray-400 text-sm">No poems yet. Check back soon.</p>
      ) : (
        <div className="space-y-8">
          {posts.map(post => (
            <div key={post.slug} className="group">

              <span className="text-xs text-gray-400">{post.date}</span>

              <h2 className="text-xl font-semibold text-gray-900 mt-1 mb-2 group-hover:text-blue-500 transition-colors duration-200">
                <Link href={`/poetry/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mb-3 italic">
                {post.excerpt}
              </p>

              {post.description && (
                <p className="text-gray-400 text-xs leading-relaxed mb-3">
                  {post.description}
                </p>
              )}

              <Link
                href={`/poetry/${post.slug}`}
                className="text-sm text-blue-500 hover:underline"
              >
                Read →
              </Link>

              <div className="border-b border-gray-100 mt-8" />

            </div>
          ))}
        </div>
      )}

    </main>
  )
}