import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Navbar } from "./navbar"

export const dynamic = 'force-dynamic'

export async function NavbarWrapper() {
  return <Navbar />
} 