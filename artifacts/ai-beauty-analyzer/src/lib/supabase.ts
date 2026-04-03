import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

export const isSupabaseReady = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseReady) {
  // eslint-disable-next-line no-console
  console.warn(
    "Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
  );
}

export const supabase = isSupabaseReady
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
