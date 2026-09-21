import { createClient } from '@supabase/supabase-js'

const fallbackSupabaseUrl = 'https://omxwqafftdwylqexxkga.supabase.co'
const fallbackSupabaseAnonKey = 'sb_publishable_AbFZhAoI3m3pIlvMW4piNw_NKlJiqHd'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackSupabaseUrl
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackSupabaseAnonKey

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null
