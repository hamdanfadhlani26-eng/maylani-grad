-- =============================================
-- GRADUATION MESSAGES TABLE
-- Run this in Supabase SQL Editor
-- =============================================

create table if not exists graduation_messages (
  id          uuid default gen_random_uuid() primary key,
  name        text not null check (char_length(name) <= 60),
  message     text not null check (char_length(message) <= 500),
  created_at  timestamptz default now() not null
);

-- ─── Row Level Security ───
alter table graduation_messages enable row level security;

-- Anyone (anon) can INSERT (submit a message)
create policy "Anyone can insert messages"
  on graduation_messages
  for insert
  to anon
  with check (true);

-- Nobody can SELECT via anon key — only service role (used in /api/messages route)
-- This means guests CANNOT read other people's messages
create policy "No public read"
  on graduation_messages
  for select
  to anon
  using (false);

-- ─── Optional: index on created_at for fast ordering ───
create index if not exists graduation_messages_created_at_idx
  on graduation_messages (created_at desc);
