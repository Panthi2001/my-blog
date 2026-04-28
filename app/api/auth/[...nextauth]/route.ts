import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      // this function runs when you submit the login form
      // it checks your credentials against what is in .env.local
      async authorize(credentials) {
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          // credentials match — return a user object
          return { id: "1", email: process.env.ADMIN_EMAIL }
        }
        // credentials do not match — return null means login fails
        return null
      }
    })
  ],

  // where to redirect when someone tries to access a protected page
  pages: {
    signIn: "/admin/login"
  },

  // use JWT tokens to store session — no database needed for auth
  session: {
    strategy: "jwt"
  },

  // secret key used to encrypt the JWT token
  secret: process.env.NEXTAUTH_SECRET
})

// NextAuth needs both GET and POST — GET for session checks, POST for login
export { handler as GET, handler as POST }