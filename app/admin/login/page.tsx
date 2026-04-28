"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    // prevent default form submission behavior
    e.preventDefault()
    setLoading(true)
    setError("")

    // attempt to sign in with credentials
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // handle redirect manually
    })

    if (result?.error) {
      // wrong credentials
      setError("Invalid email or password")
      setLoading(false)
    } else {
      // success — go to admin dashboard
      router.push("/admin")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Admin Login
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Only for Kushal. You know who you are.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
              placeholder="••••••••"
              required
            />
          </div>

          {/* show error if login fails */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white rounded-lg px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </main>
  )
}