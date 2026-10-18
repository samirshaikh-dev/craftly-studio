# Craftly Studio — Repository Context

## Project Overview

**Craftly Studio** is a full-stack digital agency website with an integrated CMS (Content Management System). It serves as the online presence for a digital studio based in **Vapi, Gujarat** that offers custom website development, local SEO, AI automation, website maintenance, and website redesign services.

The platform has two primary purposes:

1. **Generate qualified business leads** from small and medium businesses (manufacturing, healthcare, restaurants, hotels, real estate, professional services, education).
2. **Provide an internal CMS** so non-technical admin staff can manage website content — services, blog posts, portfolio case studies, and testimonials — without developer involvement.

**Core positioning:**

> "Not another template website. A digital experience crafted for your business."

The project is in **active early development** — the public site, admin CMS (blog + media + inquiries), Firebase backend, SEO system, and email pipeline are substantially implemented. Remaining work includes services/portfolio/testimonials CRUD, real auth, and testing.

---

## Why This Project Exists

Many small and medium businesses struggle with generic template websites, poor online visibility, lack of customer trust, and difficulty maintaining their web presence. Most need a digital partner who understands their goals, not just a website vendor.

Craftly Studio solves this by providing:

- Custom-designed, high-performance agency websites
- A CMS that lets admins publish and manage content independently
- SEO-optimized architecture for organic growth
- A scalable foundation for future AI-powered features

**Business goals:** Generate leads, build credibility as a premium studio, rank for local search terms (Vapi/Gujarat), convert visitors into consultation requests, and create recurring revenue through maintenance services.

---

## Key Features

### Public Website (Visitor-Facing) — Implemented

| Page | Route | Status |
|------|-------|--------|
| Homepage | `/` | Implemented — hero, problem statement, services, industries, portfolio preview, process, testimonials, CTA |
| About | `/about` | Implemented |
| Mission | `/mission` | Implemented |
| Services Listing | `/services` | Implemented |
| Service Detail | `/services/[slug]` | Implemented — hero, benefits, process, FAQ, CTA |
| Industries | `/industries/[slug]` | Implemented |
| Portfolio Listing | `/portfolio` | Implemented — grid of project cards |
| Blog Listing | `/blog` | Implemented — featured article, article cards |
| Blog Article | `/blog/[slug]` | Implemented — full article view with cover, tags, author, and related posts |
| Contact | `/contact` | Implemented — lead form with Firestore + email |
| Privacy | `/privacy` | Implemented |
| Terms | `/terms` | Implemented (1240 lines) |
| Sitemap | `/sitemap` | Implemented |
| Not Found | 404 | Implemented |

**Planned / Not yet built (public):**
- Case Study `/portfolio/[slug]`

### Admin CMS (Authenticated) — Implemented

| Feature | Route | Description |
|---------|-------|-------------|
| Login | `/admin/login` | Env-var credential check + `localStorage` session flag (simulated auth) |
| Dashboard | `/admin` | Stats overview (blog/media counts, lead counts) |
| Blog Management | `/admin/blog` | List, create (`/new`), edit (`/[slug]/edit`) — Firestore CRUD |
| Inquiries | `/admin/inquiries` | Lead inbox with status (new/contacted/converted) |
| Media Management | `/admin/media` | Cloudinary upload, list, delete + Firestore metadata |

**Planned / Not yet built (admin):**
- Service Management `/admin/services`
- Portfolio Management `/admin/portfolio`
- Testimonial Management `/admin/testimonials`
- SEO Settings `/admin/seo`

### API Routes — Implemented

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/contact` | `POST` | Zod-validated lead → Firestore `leads` + Nodemailer emails |
| `/api/media` | `POST` | Cloudinary upload + Firestore `media` record |
| `/api/media/[id]` | `DELETE` | Remove Cloudinary asset + Firestore doc |

### Email — Implemented

- Nodemailer SMTP service (`src/lib/mail.ts`)
- HTML templates for admin + user (`src/emails/admin-template.ts`, `src/emails/user-template.ts`)

### SEO — Implemented

- Metadata for every public page, `generateMetadata()` for dynamic pages
- JSON-LD structured data (Organization, Service, Article, LocalBusiness) via `src/lib/seo/schemas.ts`
- Auto-generated `sitemap.ts` and `robots.ts`
- Google Analytics GA4 component
- Google Search Console verification

### Planned Future Features (v2)

- AI chatbot for website visitors
- AI content assistant for admins (blog drafts, SEO descriptions)
- Lead management dashboard (internal CRM)
- Client portal, project tracking, invoice management
- Services, portfolio, and testimonials CMS CRUD
- Real Firebase Auth (email/password + roles) to replace simulated login

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.2.10 | App Router, SSR, SSG, routing, performance (React Compiler enabled) |
| React | 19.2.4 | UI library |
| TypeScript | ^5 | Type safety, maintainability (strict mode) |
| Tailwind CSS | ^4 | Utility-first styling via `@tailwindcss/postcss` |
| Framer Motion | 12.42.2 | Animations and transitions |
| Lenis | ^1.3.26 | Smooth global scrolling (SmoothScroll component) |
| Lucide React | 1.24.0 | Icons |
| shadcn/ui | (not installed) | Planned component library — currently custom Tailwind components |
| Google Fonts | — | Plus Jakarta Sans + Manrope (self-hosted via `next/font/google`) |

### Backend

| Technology | Purpose |
|-----------|---------|
| Firebase Firestore | NoSQL database — collections: `blogPosts`, `leads`, `media` |
| Firebase Auth | Initialized but auth is currently simulated (env-var check + localStorage) |
| Firebase Storage | Initialized (`src/lib/firebase.ts`) but not yet used — media goes through Cloudinary |
| Cloudinary | Image/file upload, storage, and delivery (v2 `cloudinary` SDK) |
| Nodemailer | SMTP email dispatch for contact form |

### Forms & Validation

| Technology | Purpose |
|-----------|---------|
| React Hook Form | Form state management |
| Zod | Schema validation (`src/utils/validation.ts`) |

### Testing (Planned — NOT set up)

| Technology | Purpose |
|-----------|---------|
| Vitest | Unit testing (utilities, validation, data handling) |
| React Testing Library | Component testing (forms, interactive components) |
| Playwright | End-to-end testing (user journeys, admin workflows) |

> **Note:** No test files, test script, or testing dependencies exist in the repo yet.

### Deployment & Analytics

| Technology | Purpose |
|-----------|---------|
| Vercel | Frontend hosting and deployment |
| Firebase Cloud | Backend services |
| Google Analytics | Traffic tracking (GA4 component in root layout) |
| Google Search Console | SEO monitoring (verification meta) |

### Build Tools

| Technology | Version | Purpose |
|-----------|---------|---------|
| ESLint | ^9 | Code linting (flat config, `eslint-config-next`) |
| PostCSS | — | CSS processing (`@tailwindcss/postcss` plugin) |
| React Compiler | (via `babel-plugin-react-compiler`) | Automatic memoization optimization (`reactCompiler: true`) |

---

## Folder Structure — Current State

```
craftly-studio/
├── .env.example               # 15 env var placeholders (Firebase, SMTP, GA, Cloudinary)
├── .gitignore                 # Ignores .env*, .next/, node_modules/, etc.
├── agents/                    # AI agent definitions (for AI coding assistants)
│   ├── generic/               # Tool-agnostic agent prompts
│   └── skills/                # 12 specialized engineering skills (frontend, ui-ux, backend, seo, etc.)
├── AGENTS.md                  # AI agent instructions for Next.js
├── animation-motion-plan.md   # Smoothness and animation strategy (Lenis + Framer Motion)
├── CLAUDE.md                  # Pointer to AGENTS.md
├── context.md                 # This document
├── docs/                      # Project specification documents
│   ├── 01_PRD.md
│   ├── 02_TECHNICAL_DESIGN.md
│   ├── 03_UI_UX.md
│   ├── 04_AI_RULES.md
│   ├── 05_TASKS.md            # Development Roadmap (33 tasks, 7 phases)
│   └── DESIGN.md
├── eslint.config.mjs          # ESLint 9 flat config
├── gemini.md                  # Gemini context and engineering system directives
├── next.config.ts             # reactCompiler: true, image remote patterns
├── postcss.config.mjs         # Tailwind v4 PostCSS plugin
├── pnpm-workspace.yaml        # Build-script allowlist
├── public/
├── src/
│   ├── app/                   # Next.js App Router (routes and pages)
│   │   ├── layout.tsx         # Root layout (fonts, SEO metadata, JSON-LD, PublicShell)
│   │   ├── globals.css        # Tailwind v4 theme tokens
│   │   ├── page.tsx           # Homepage
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── about/
│   │   ├── admin/
│   │   │   ├── (dashboard)/   # Route group — AuthGuard + AdminSidebar + AdminTopbar
│   │   │   │   ├── page.tsx   # Dashboard
│   │   │   │   ├── blog/      # Blog list + new/ + [slug]/edit/
│   │   │   │   ├── inquiries/
│   │   │   │   └── media/
│   │   │   └── login/
│   │   ├── api/
│   │   │   ├── contact/       # POST lead
│   │   │   └── media/         # POST upload, DELETE [id]
│   │   ├── blog/              # Listing page + [slug]/ dynamic article page
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── contact/
│   │   ├── industries/[slug]/
│   │   ├── mission/
│   │   ├── portfolio/
│   │   ├── privacy/
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   ├── [slug]/page.tsx
│   │   │   └── components/    # IndustriesGrid, ProcessTimeline, ServicesCta, etc.
│   │   ├── sitemap/
│   │   └── terms/
│   ├── components/
│   │   ├── auth/              # AuthGuard
│   │   ├── forms/             # BlogPostForm, ContactForm
│   │   ├── layout/            # AdminSidebar, AdminTopbar, Footer, Navbar, PublicShell, SmoothScroll
│   │   ├── sections/          # HeroSection, ServiceCard, TestimonialSection, etc.
│   │   └── seo/               # Breadcrumbs, JsonLd
│   ├── config/
│   │   └── config.ts          # Firebase + mail config from env vars
│   ├── constants/             # service-constants.ts (empty)
│   ├── emails/                # admin-template.ts, user-template.ts (HTML templates)
│   ├── hooks/                 # useAuth, useMediaQuery, useScrollNavbar
│   ├── lib/
│   │   ├── analytics.tsx      # GA4 script component
│   │   ├── cloudinary.ts      # Cloudinary SDK client
│   │   ├── firebase.ts        # Single Firebase init (app, db, auth, storage)
│   │   ├── mail.ts            # Nodemailer SMTP service
│   │   ├── firebase/
│   │   │   ├── blog/          # queries + mutations (blogPosts)
│   │   │   ├── contact/       # mutations (leads)
│   │   │   ├── lead/          # queries (leads)
│   │   │   └── media/         # queries (media)
│   │   └── seo/               # constants, metadata, schemas
│   ├── types/                 # blog.ts, lead.ts, media.ts, service.ts
│   └── utils/
│       └── validation.ts      # Zod schemas (contactForm, blogPost)
└── tsconfig.json              # strict, @/* → ./src/*
```

> **Note:** `src/features/` (documented in AGENTS.md) does not exist yet. There is no `src/components/ui/` (no shadcn/ui). `src/constants/service-constants.ts` is empty; `CloudTransition.tsx` and `PageHeader.tsx` are 1-line stubs.

---

## Database Schema (Firestore Collections)

### `blogPosts` — Implemented
| Field | Type | Description |
|-------|------|-------------|
| id | string | Document ID (auto-generated) |
| title | string | Article title |
| slug | string | URL slug (auto from title if empty) |
| excerpt | string | Short summary |
| content | string | Article content |
| coverImage | string | Cover image URL (Cloudinary) |
| category | string | Article category |
| tags | string[] | Tag list (parsed from comma string) |
| author | string | Author name |
| status | string | `published` or `draft` |
| readTime | number | Estimated read time (auto-calculated) |
| seo | object | SEO metadata (title, description, keywords[]) |
| publishedAt | timestamp | Publish date (null when draft) |
| createdAt | timestamp | Creation date (serverTimestamp) |
| updatedAt | timestamp | Last update |

### `leads` — Implemented
| Field | Type | Description |
|-------|------|-------------|
| id | string | Document ID (auto-generated) |
| name | string | Contact name (first + last) |
| email | string | Contact email |
| phone | string | Phone number |
| company | string | Company name |
| projectType | string | Selected project type (optional) |
| priorityLevel | string | Priority level (`Low Priority`, `Medium Priority`, `High Priority`, etc.) |
| budgetRange | string | Client budget range |
| timeline | string | Expected delivery timeline |
| message | string | Inquiry message |
| source | string | Lead source (e.g. `contact_form`) |
| status | string | `new`, `contacted`, `converted` |
| createdAt | timestamp | Submission date |

### `media` — Implemented
| Field | Type | Description |
|-------|------|-------------|
| id | string | Document ID (auto-generated) |
| fileName | string | Original file name |
| fileUrl | string | Cloudinary delivery URL |
| fileType | string | MIME type |
| fileSize | number | Size in bytes |
| publicId | string | Cloudinary public ID (for deletion) |
| createdAt | timestamp | Upload date |

### Planned Collections (not yet implemented)
- `users` — admin users with roles (`admin`/`editor`)
- `services` — service CRUD
- `portfolio` — case studies
- `testimonials` — client reviews
- `pages` / `settings` — CMS-managed page content and site settings

---

## Setup & Development

### Prerequisites

- Node.js 18+ (recommended: 20+)
- pnpm (recommended), npm, or yarn
- Firebase project (for backend services)
- Cloudinary account (for media)
- SMTP credentials (for contact emails)
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd craftly-studio

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials
```

### Environment Variables (`.env.local`)

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Admin Authentication (simulated login)
NEXT_PUBLIC_ADMIN_EMAIL=
NEXT_PUBLIC_ADMIN_PASSWORD=

# SMTP Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
CONTACT_EMAIL=

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Cloudinary
CLOUDINARY_URL=
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build production bundle |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

---

## Architecture Notes

### Rendering Strategy

The application uses **hybrid rendering**:

- **Static pages** (`/about`, `/contact`, `/privacy`, `/terms`, etc.): Generated at build time.
- **Dynamic content pages** (`/services/[slug]`, `/industries/[slug]`): Data-driven from local constants/SEO data.
- **Admin pages**: Client-rendered, protected by `AuthGuard`.
- **API routes** (`/api/*`): Server-side route handlers using Next 16 conventions (`params` is a `Promise`, awaited).

### Server vs. Client Components

- **Server Components (default):** Used for pages, data fetching, and layout.
- **Client Components (`"use client"`):** Forms, admin dashboard, auth UI, interactive sections.

### Data Flow

**Public Contact Form:**
```
User → ContactForm (React Hook Form + Zod) → POST /api/contact → Firestore `leads` + Nodemailer emails
```

**Admin Blog Content Creation:**
```
Admin → Login → Admin Dashboard → BlogPostForm → Firestore `blogPosts` write
```

**Admin Media Upload:**
```
Admin → /admin/media → POST /api/media → Cloudinary upload → Firestore `media` record
```

### Authentication & Authorization

- **Current:** Simulated auth — login page checks against `NEXT_PUBLIC_ADMIN_EMAIL` / `NEXT_PUBLIC_ADMIN_PASSWORD` env vars and sets a `craftly_admin_auth` flag in `localStorage`. `AuthGuard` (client) redirects unauthenticated users to `/admin/login`.
- **Planned:** Firebase Auth (email/password + roles `admin`/`editor`) replacing the simulated login.

### Security Notes

- Forms validated with Zod before any write.
- Media uploads go through a server route (API key stays server-side).
- Admin pages have a `noindex` robots directive.
- API keys and credentials live in `.env.local` — never committed.
- **Caveat:** current admin "auth" is client-side only (localStorage) — it is NOT real security. Real Firebase Auth + role verification is a roadmap item.

### Performance Targets

- Lighthouse score above 90
- Image optimization via Next.js `<Image>` component (remote patterns: `lh3.googleusercontent.com`)
- Static generation where possible
- React Compiler enabled for automatic memoization

---

## Development Guidelines

### Code Conventions

- **Language:** TypeScript everywhere. Avoid `any` — prefer `unknown` with validation.
- **Components:** Small, reusable, single-responsibility. PascalCase naming (e.g., `ServiceCard.tsx`).
- **Utilities:** camelCase naming (e.g., `formatDate.ts`).
- **Imports:** Use `@/*` path alias mapping to `./src/*`.
- **Styling:** Tailwind CSS classes. Follow shadcn/ui patterns (currently custom components). Responsive-first.
- **Images:** Use Next.js `<Image>` component with alt text. Never use raw `<img>`.

### Folder Organization

- Components go in `src/components/` (auth, forms, layout, sections, seo).
- Firebase data access goes in `src/lib/firebase/` (queries/mutations per domain).
- Custom hooks go in `src/hooks/`.
- TypeScript types go in `src/types/`.
- Utility functions go in `src/utils/`.
- Config constants go in `src/config/`.
- Email templates go in `src/emails/`.

### Form Handling

All forms must include:
- Zod validation schemas
- Error messages for each field
- Loading states during submission
- Success/error feedback after submission
- React Hook Form for state management

### SEO Requirements

Every public page must include:
- Custom `<title>` and meta description
- Open Graph data (og:title, og:description, og:image)
- Structured data (JSON-LD) for Organization, Service, Article, LocalBusiness
- Dynamic `generateMetadata()` for dynamic pages
- Canonical URLs
- Auto-generated sitemap

### Git Workflow

- **Branch naming:** `feature/service-cms`, `fix/auth-error`, `docs/readme-update`
- **Commit messages:** `type(scope): description` format (e.g., `feat(blog): add blog CMS`, `fix(auth): handle expired session`)

### Definition of Done

A feature is complete only when:
- Code is implemented and works correctly
- TypeScript has no errors
- UI is responsive across all breakpoints
- Form validation is in place
- Security has been reviewed
- Tests are added where required (unit, component, or E2E)
- Documentation is updated

---

## Development Roadmap

The project follows a 7-phase incremental build strategy (see `docs/05_TASKS.md`).

### Phase 1: Project Foundation — Mostly complete
- ✅ Next.js + TypeScript + App Router + ESLint + Tailwind v4
- ⬜ shadcn/ui (Button, Card, Input, Dialog, Form) — **not installed**
- ✅ Folder architecture
- ✅ Firebase configured (Firestore, Auth, Storage initialized)
- ✅ Environment variables

### Phase 2: Public Website — Mostly complete
- ✅ Global layout (Navbar, Footer, PublicShell)
- ✅ Homepage with all sections
- ✅ About, Mission, Services, Industries, Portfolio, Blog, Contact, legal pages
- ✅ SEO system, sitemap, robots, GA

### Phase 3: Admin CMS — Partially complete
- ⬜ Admin authentication (simulated only — real Firebase Auth planned)
- ✅ Admin dashboard with sidebar navigation
- ✅ Blog CRUD (Firestore)
- ✅ Inquiries/leads inbox
- ✅ Media management (Cloudinary)
- ⬜ CRUD for services, portfolio, testimonials
- ⬜ SEO settings page

### Phase 4: SEO & Growth — Complete
- ✅ Dynamic metadata system
- ✅ Dynamic sitemap + robots
- ✅ JSON-LD structured data
- ✅ Google Analytics + Search Console

### Phase 5: Advanced Features — Not started
- ⬜ AI chatbot for website visitors
- ⬜ AI content assistant for admin CMS
- ⬜ Lead management dashboard

### Phase 6: Testing — Not started
- ⬜ Unit tests with Vitest
- ⬜ Component tests with React Testing Library
- ⬜ End-to-end tests with Playwright

### Phase 7: Deployment — Not started
- ⬜ Production configuration (Vercel + Firebase)
- ⬜ Security review (Firebase rules, auth, validation, permissions)
- ⬜ Performance optimization
- ⬜ Final launch checklist

---

## Documentation Index

| File | Description |
|------|-------------|
| `gemini.md` | Gemini context and engineering system directives — strict skill enforcement protocol and architecture rules |
| `AGENTS.md` | Universal agent instructions — warns about Next.js 16 breaking changes and project tech stack |
| `CLAUDE.md` | Pointer to `AGENTS.md` for Claude Code / Anthropic assistants |
| `animation-motion-plan.md` | Smoothness and animation strategy — Lenis scroll integration and Framer Motion roadmap |
| `agents/skills/` | 12 specialized engineering skills (frontend, ui-ux, backend, database, devops, security, seo, performance, accessibility) |
| `agents/` | AI agent definitions directory — subagent prompts and instructions |
| `docs/01_PRD.md` | Product Requirements Document — vision, goals, personas, user stories, functional/non-functional requirements |
| `docs/02_TECHNICAL_DESIGN.md` | Technical Design Document — architecture, technology decisions, database design, API architecture, security |
| `docs/03_UI_UX.md` | UI/UX Specification — design principles, page layouts, component system, responsive behavior, animations |
| `docs/04_AI_RULES.md` | AI Coding Guidelines — rules for AI assistants: TypeScript, components, Firebase, security, testing, git |
| `docs/05_TASKS.md` | Development Roadmap — 33 tasks across 7 phases with priorities and dependencies |
| `docs/DESIGN.md` | Visual Design Specification — brand personality, typography, colors, layout philosophy, component design |

---

## Current State Summary

| Aspect | Status |
|--------|--------|
| Project scaffolding | Complete (Next.js 16.2.10 + React 19 + TypeScript + Tailwind v4 + React Compiler) |
| Public website | Implemented (home, about, mission, services, industries, portfolio, blog listing, blog detail `[slug]`, contact, legal) |
| Admin CMS | Partial (blog CRUD, inquiries, media) — services/portfolio/testimonials/seo pending |
| Authentication | Simulated (env-var + localStorage) — real Firebase Auth planned |
| Firebase | Configured — Firestore (`blogPosts`, `leads`, `media`) |
| Media storage | Cloudinary (Firebase Storage initialized but unused) |
| Motion & Polish | Lenis smooth scroll active + Framer Motion interactive cards/reveals |
| Email | Implemented (Nodemailer SMTP + HTML templates) |
| shadcn/ui | Not installed (custom Tailwind components) |
| Testing | Not set up (Vitest, RTL, Playwright roadmap items) |
| SEO | Complete (metadata, JSON-LD, dynamic sitemap, robots, GA, Search Console) |
| Git history | 13 commits on `main` (`type(scope): description` style) |
| Known technical debt | `any` in `src/types/lead.ts:19`; oversized pages (`terms` 1240 lines, `services/[slug]` 603, `industries/[slug]` 556); stubs in `CloudTransition.tsx`, `PageHeader.tsx`, `service-constants.ts` |
