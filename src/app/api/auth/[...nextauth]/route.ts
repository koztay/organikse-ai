import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { supabase } from "@/lib/supabase"
import { User } from '@supabase/supabase-js'

export const runtime = 'edge'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req): Promise<import("next-auth").User | null> {
        if (!credentials?.email || !credentials?.password) return null
        
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        })

        if (error || !user || !user.email) return null
        
        return {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.email,
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/auth/signin',
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 