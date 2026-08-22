# Maylani Grad — Undangan Digital Wisuda

Undangan wisuda interaktif dengan motion untuk **Maylani Syafvitri, S.T.**

## Stack
- **Next.js 14** (App Router)
- **Framer Motion** — animasi 3D tilt foto, spring physics, scroll reveal
- **Supabase** — menyimpan pesan/doa tamu
- **Tailwind CSS** — styling dengan palette navy blue custom
- **Vercel** — deployment

---

## Setup Awal

### 1. Clone & install
```bash
git clone <repo>
cd maylani-grad
npm install
```

### 2. Buat Supabase project
1. Buka [supabase.com](https://supabase.com) → New Project
2. Setelah project dibuat, buka **SQL Editor**
3. Paste isi file `supabase-setup.sql` → Run

### 3. Environment variables
```bash
cp .env.local.example .env.local
```
Isi `.env.local` dengan nilai dari Supabase dashboard:
- `Settings → API → Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `Settings → API → anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `Settings → API → service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`
- Ganti `NEXT_PUBLIC_ADMIN_PASSWORD` sesukamu

### 4. Tambah foto wisudawan
Taruh 3 foto di folder `public/photos/`:
```
public/
  photos/
    photo-1.jpg   ← foto kiri
    photo-2.jpg   ← foto tengah (utama)
    photo-3.jpg   ← foto kanan
```
Ukuran ideal: min 400x600px, portrait orientation.

### 5. Run locally
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000)

---

## Deploy ke Vercel

```bash
npm i -g vercel
vercel
```

Atau push ke GitHub lalu connect di [vercel.com](https://vercel.com).

**Tambah environment variables di Vercel:**
`Settings → Environment Variables` → tambah semua dari `.env.local`

**Custom domain:**
`Settings → Domains` → tambah `maylani-grad.vercel.app`

---

## URL & Fitur

| URL | Fungsi |
|-----|--------|
| `maylani-grad.vercel.app?to=Nama+Tamu` | Undangan untuk tamu tertentu |
| `maylani-grad.vercel.app?to=Bu+Sari` | Contoh — nama muncul di splash |
| `maylani-grad.vercel.app/admin` | Admin panel (lihat semua pesan) |

**Default tanpa `?to=`** → tampil "Tamu Undangan"

### Admin Panel
- Buka `/admin`
- Masukkan password (`NEXT_PUBLIC_ADMIN_PASSWORD`)
- Lihat semua doa & pesan yang masuk
- Tamu **tidak bisa** melihat pesan orang lain (RLS Supabase)

---

## Kustomisasi

### Ganti info acara
Edit `components/InvitationPage.tsx` → array `details` di baris 14–30.

### Ganti quote
Edit `components/InvitationPage.tsx` → section `QUOTE SECTION`.

### Ganti password admin
`.env.local` → `NEXT_PUBLIC_ADMIN_PASSWORD`

---

## Struktur File

```
app/
  layout.tsx          ← root layout + fonts
  page.tsx            ← splash + invitation orchestrator
  globals.css         ← design tokens, animations
  admin/
    page.tsx          ← admin panel (password protected)
  api/
    messages/
      route.ts        ← server-side Supabase fetch (service role)
components/
  SplashScreen.tsx    ← halaman pertama "buka undangan"
  InvitationPage.tsx  ← halaman utama undangan
  MagneticPhoto.tsx   ← foto 3D tilt + floating + spring physics
  FlowerDecor.tsx     ← custom SVG bunga (no emoji)
  MessageForm.tsx     ← form kirim doa & pesan
  RevealOnScroll.tsx  ← scroll reveal wrapper
lib/
  supabase.ts         ← Supabase client
public/
  photos/             ← taruh foto wisudawan di sini
supabase-setup.sql    ← SQL untuk setup database
```
