// ============================================================
// supabase.js — Supabase client singleton
//
// ── One-time Supabase setup (do this once, ~2 minutes) ─────
//
// 1. Go to https://supabase.com  → New project
// 2. Once created, open the SQL Editor and run:
//
//    create table leaderboard (
//      id         uuid        default gen_random_uuid() primary key,
//      name       text        not null,
//      score      integer     not null check (score > 0),
//      created_at timestamptz default now()
//    );
//
//    alter table leaderboard enable row level security;
//
//    create policy "public read"
//      on leaderboard for select using (true);
//
//    create policy "public insert"
//      on leaderboard for insert with check (score > 0 and char_length(name) <= 20);
//
// 3. Go to Project Settings → API
//    Copy "Project URL"  → VITE_SUPABASE_URL
//    Copy "anon public"  → VITE_SUPABASE_ANON_KEY
//
// 4. Create a file called  .env.local  in the project root:
//
//    VITE_SUPABASE_URL=https://xxxx.supabase.co
//    VITE_SUPABASE_ANON_KEY=eyJ...
//
// 5. On Vercel: add the same two variables under
//    Project → Settings → Environment Variables
//
// If the env vars are missing the game works normally —
// the leaderboard just shows a "not configured" message.
// ============================================================

import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// Export null when not configured so callers can guard gracefully
export const supabase = url && key ? createClient(url, key) : null
