# Shadow Garden — Vercel Deployment Guide

## Prerequisites

- Node.js 18+
- pnpm or npm
- Supabase account (free tier works)
- Vercel account (free tier works)

---

## Step 1: Set Up Supabase Database

1. Go to [supabase.com](https://supabase.com) → **New project**
2. Choose a name, region, and password
3. Wait for setup (~2 minutes)
4. Go to **Settings → Database** and copy the **Connection string** (use the Prisma URI)
   - Format: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
5. Go to **Settings → API** and copy:
   - `Project URL`
   - `anon/public` key

---

## Step 2: Local Setup

```bash
# Install dependencies
npm install

# or pnpm
pnpm install
```

Create your `.env.local` file (copy from `.env.example`):

```bash
cp .env.example .env.local
```

Fill in:
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres"
JWT_SECRET="your-random-secret-string-here"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Step 3: Push Database Schema

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase
npx prisma db push

# Seed with demo data + all 35k cards
npx tsx prisma/seed.ts
```

> ⚠️ Seeding 35k cards may take 3–5 minutes. This is a one-time operation.

---

## Step 4: Test Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**OTP Test Mode:**  
When `TWILIO_ACCOUNT_SID` is not set (local dev), the OTP code is displayed in the login form directly. No SMS is needed for testing.

---

## Step 5: Deploy to Vercel

### Option A: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow prompts, then set environment variables:

```bash
vercel env add DATABASE_URL
vercel env add DIRECT_URL
vercel env add JWT_SECRET
```

### Option B: Vercel Dashboard

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Set environment variables in **Settings → Environment Variables**:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Supabase connection string |
| `DIRECT_URL` | Same as DATABASE_URL |
| `JWT_SECRET` | Random secure string (32+ chars) |
| `NEXT_PUBLIC_APP_URL` | Your Vercel domain (e.g. `https://shadow-garden.vercel.app`) |

5. Click **Deploy**

---

## Step 6: Optional — Real SMS OTP with Twilio

1. Create a [Twilio](https://twilio.com) account (free trial available)
2. Get a phone number and your credentials
3. Add to Vercel environment variables:

```
TWILIO_ACCOUNT_SID=ACxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
```

Without Twilio, the app uses **dev mode** — the OTP is shown in the UI. This is fine for development but **disable it in production** or add Twilio.

---

## Folder Structure

```
shadow-garden/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Login & Register pages
│   ├── (main)/             # App pages (cards, guilds, etc.)
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout with sidebar
│   └── page.tsx            # Home page
├── components/             # Reusable React components
│   ├── cards/              # Card display components
│   ├── guilds/             # Guild components
│   ├── layout/             # Sidebar, Topbar
│   ├── profile/            # Profile components
│   └── ui/                 # Generic UI components
├── lib/                    # Server utilities
│   ├── auth.ts             # OTP auth + JWT sessions
│   ├── db.ts               # Prisma client
│   └── utils.ts            # Helper functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed script
├── public/
│   └── card.json           # 35,314 anime cards
├── types/                  # TypeScript types
├── hooks/                  # React hooks
├── store/                  # Zustand state
└── middleware.ts            # Route protection
```

---

## API Routes

| Method | Path | Description |
|---|---|---|
| POST | `/api/auth/request-otp` | Send OTP to phone |
| POST | `/api/auth/verify-otp` | Verify OTP, create session |
| POST | `/api/auth/logout` | Clear session |
| GET | `/api/cards` | List cards (paginated, filterable) |
| GET | `/api/guilds` | List guilds |
| POST | `/api/guilds` | Create guild |
| GET | `/api/leaderboard` | Global leaderboard |
| GET | `/api/profile` | Get current user profile |
| PATCH | `/api/profile` | Update profile |

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | Supabase PostgreSQL connection string |
| `DIRECT_URL` | ✅ | Same as DATABASE_URL (for migrations) |
| `JWT_SECRET` | ✅ | Secret for signing session tokens |
| `NEXT_PUBLIC_APP_URL` | ✅ | Your production URL |
| `TWILIO_ACCOUNT_SID` | Optional | For real SMS OTP |
| `TWILIO_AUTH_TOKEN` | Optional | Twilio auth token |
| `TWILIO_PHONE_NUMBER` | Optional | Twilio phone number |

---

## Connecting to the WhatsApp Bot

The bot (`SHOOB_API_URL`) should point to your deployed Vercel URL. Update the bot's environment variable:

```
SHOOB_API_URL=https://your-shadow-garden.vercel.app
```

The bot's database connection should use the same Supabase project for shared data.

---

## Common Issues

**`P1001: Can't reach database server`**  
→ Check your `DATABASE_URL` is correct and the IP is not blocked in Supabase (Dashboard → Settings → Database → Connection Pooling).

**`OTP not received`**  
→ In dev mode, the OTP appears in the UI. For production, add Twilio credentials.

**`Cards not loading`**  
→ Run `npx tsx prisma/seed.ts` to seed the database, or check that `public/card.json` exists.

**`Vercel build fails`**  
→ Make sure all environment variables are set in Vercel Dashboard → Settings → Environment Variables.
