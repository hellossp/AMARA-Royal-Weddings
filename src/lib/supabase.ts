import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const isSupabaseReady = Boolean(supabaseUrl && supabaseAnonKey);

// Public client for client components (with RLS restrictions)
export const supabasePublic = isSupabaseReady
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Server/Admin client (bypasses RLS for secure admin tasks on server)
export const supabaseAdmin =
  Boolean(supabaseUrl && supabaseServiceRole)
    ? createClient(supabaseUrl, supabaseServiceRole, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      })
    : null;
