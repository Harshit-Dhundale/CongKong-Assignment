// lib/supabaseAdmin.ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

if (!process.env.SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
}

// ONLY ever import this from Node-only code (API routes or scripts)
export const supabaseAdmin: SupabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
