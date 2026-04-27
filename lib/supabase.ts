import { createClient } from "@supabase/supabase-js"

// these come from your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// create and export the client — import this wherever you need database access
export const supabase = createClient(supabaseUrl, supabaseKey)