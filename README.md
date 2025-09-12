# Shopify-Portfolio (React + Vite)

This is a Shopify portfolio with an Admin panel. Admins can add/edit/delete/reorder projects. The public Home page is read-only. Data is stored in Supabase when configured, with localStorage as a fallback during development.

## Quick Start

1) Install deps and run dev
```bash
npm install
npm run dev
```

2) Admin login
- Set `VITE_ADMIN_PASSWORD` in a `.env` file (or use default `admin123` for local only).
- Open the Admin page and log in.

## Supabase (global persistence)

To make Admin changes visible to everyone on deployment, configure Supabase:

1) Create a project and a table `projects` with columns:
- `id` text PRIMARY KEY
- `title` text
- `desc` text
- `desktop_img` text
- `mobile_img` text
- `link` text
- `order_index` int4
- `created_at` timestamptz default now()

2) RLS
- Enable Row Level Security on `projects`.
- For quick demos, add permissive policies allowing anon select/insert/update/delete. For production, restrict writes (e.g., via edge functions or auth) so only admins can modify.

3) Env vars
Set these in `.env` locally and in Vercel Project Settings → Environment Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_PASSWORD`

## Deploy on Vercel
- Import this repo in Vercel.
- Add the env vars above.
- Deploy. The Home page reads from Supabase; the Admin page writes via the shared data service.

## Notes
- Images are compressed client-side for quality and size balance.
- Drag-and-drop in Admin updates the `order_index` field so ordering persists.
