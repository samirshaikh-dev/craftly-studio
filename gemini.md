# Craftly Studio — Gemini System Directives & Execution Standard

## Single Source of Truth for Repository Context

> [!IMPORTANT]
> ### REPOSITORY CONTEXT: ZERO DUPLICATION POLICY
> All repository architecture, tech stack specifications, database schemas (Firestore collections: `blogPosts`, `leads`, `media`), route inventories, API contracts, folder structures, and roadmap phases are documented exclusively in:
>
> 📖 **[context.md](file:///s:/craftly-studio/context.md)**
>
> **Do NOT duplicate repository context here.** To inspect the current implementation status, data models, or system architecture, the AI **must always read context directly from `context.md`** using `view_file`.

---

## Mandatory Pre-Implementation Protocol: ALWAYS Load Context & Skills

> [!CAUTION]
> ### STRICT ENFORCEMENT: ZERO IMPLEMENTATION WITHOUT READING CONTEXT & SKILLS
> Before proposing any changes, writing a single line of code, creating new files, or editing existing files, the AI **MUST ALWAYS**:
> 1. **Read Repository Context:** Call `view_file` on [context.md](file:///s:/craftly-studio/context.md) to ground the solution in the current repository state, schema models, and architectural boundaries.
> 2. **Load Applicable Discipline Skill(s):** Call `view_file` on the corresponding skill file(s) from `agents/skills/`.
>
> Writing code without first reading `context.md` and the corresponding skill(s) is strictly prohibited and constitutes an immediate protocol violation.
>
> **Mandatory Execution Pipeline:**
> 1. **Ingest Repository Context:**
>    - Load [context.md](file:///s:/craftly-studio/context.md) to inspect current implementation progress, active Firestore collections (`blogPosts`, `leads`, `media`), route contracts, and known technical debt.
> 2. **Identify & Load Applicable Discipline Skill(s):**
>    - **Frontend & App Router Architecture:** [agents/skills/frontend-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/frontend-engineer/SKILL.md) (Next.js 16 / React 19 RSC boundaries, hydration, forms, client state, error boundaries)
>    - **UI/UX Direction & Visual Design:** [agents/skills/ui-ux-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/ui-ux-engineer/SKILL.md) (Design tokens, spacing, typography, theme contrast, responsive ergonomics, interactive states)
>    - **Backend & API Architecture:** [agents/skills/backend-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/backend-engineer/SKILL.md) (Firestore data access, Cloudinary integration, Nodemailer email pipelines, route handlers)
>    - **Database Engineering & Schema:** [agents/skills/database-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/database-engineer/SKILL.md) (Firestore collections, schema models, document timestamps, query patterns, indexing)
>    - **Technical SEO, Schema & Crawlability:** [agents/skills/seo-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/seo-engineer/SKILL.md) (JSON-LD schemas, dynamic metadata, OpenGraph cards, sitemaps, robots.txt)
>    - **Keyword Strategy & Content Layer:** [agents/skills/seo-keyword-research-implementation/SKILL.md](file:///s:/craftly-studio/agents/skills/seo-keyword-research-implementation/SKILL.md) (Local search intent, agency service keywords, topic clusters, on-page optimization)
>    - **Performance & Optimization:** [agents/skills/performance-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/performance-engineer/SKILL.md) (Core Web Vitals, Lenis smooth scrolling, bundle size, Cloudinary asset delivery, SSR/SSG caching)
>    - **Accessibility Standards:** [agents/skills/accessibility-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/accessibility-engineer/SKILL.md) (WCAG 2.1 AA compliance, keyboard navigation, focus management, ARIA roles)
>    - **Security & Secret Hygiene:** [agents/skills/security-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/security-engineer/SKILL.md) (Input validation, Firestore security rules, secret segregation, CSRF/XSS defense)
>    - **DevOps & Build Infrastructure:** [agents/skills/devops-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/devops-engineer/SKILL.md) (Next.js build optimizations, package management via pnpm, deployment configs)
>    - **AI Integrations & Assistant Systems:** [agents/skills/ai-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/ai-engineer/SKILL.md) (Future chatbot and CMS AI content assistants)
>    - **Brand & Entity Profile SEO:** [agents/skills/personal-seo-profile-optimizer/SKILL.md](file:///s:/craftly-studio/agents/skills/personal-seo-profile-optimizer/SKILL.md) (Agency brand entity optimization, knowledge graph alignment)
> 3. **Evaluate & Comply:** Cross-reference the proposed implementation against `context.md` specs and the loaded skill's engineering principles, constraints, and checklists.
> 4. **Implement with Justification:** Apply changes in strict accordance with the loaded skill's standards and repository conventions.
>
> **This protocol applies unconditionally to ALL tasks — including bug fixes, component styling, content updates, schema tweaks, and API refactoring.**

---

## Core Engineering Directives

1. **Mandatory Context & Skill Ingestion (Absolute Non-Negotiable):**
   - **NEVER** write a single line of code, create a new file, or modify an existing file without first:
     1. Ingesting repository context by calling `view_file` on [context.md](file:///s:/craftly-studio/context.md) to verify database schema contracts, route boundaries, and current implementation status.
     2. Loading and inspecting the relevant discipline skill file(s) from `agents/skills/` using `view_file`.
   - Any code generated without prior context and skill consultation violates this repository's system directive.
2. **Next.js 16 Version Awareness:**
   - Always adhere to Next.js 16 conventions. Route handler and dynamic page `params` and `searchParams` are Promises and must be awaited per [context.md](file:///s:/craftly-studio/context.md#L382).
3. **Server Components by Default:**
   - Keep pages and data-fetching components as React Server Components.
   - Use `"use client"` exclusively for interactive elements (forms, framer-motion interactions, auth guards).
4. **Strict TypeScript & Type Safety:**
   - Zero `any` policy. Use strict interfaces in `src/types/` (`blog.ts`, `lead.ts`, `media.ts`, `service.ts`).
   - Use Zod schemas for all client and server boundaries (`src/utils/validation.ts`).
5. **Styling & Design Tokens:**
   - Use Tailwind CSS v4 utility classes and defined tokens in `src/app/globals.css`.
   - Never use ad-hoc inline styles or raw CSS files.
   - Images must always use `next/image` with explicit aspect ratios and descriptive `alt` tags.
6. **Data Storage & Asset Separation:**
   - Firestore is the single source of truth for structured documents (`blogPosts`, `leads`, `media`).
   - Cloudinary handles all media uploads, optimization, and asset delivery.
   - Document timestamps must always record `createdAt` and `updatedAt`.
7. **Form Handling Protocol:**
   - Always pair React Hook Form with Zod resolvers.
   - Every form must explicitly implement: initial state, interactive validation, error messages, submitting/loading spinner, and post-submission success feedback.
8. **SEO & Accessibility:**
   - Every public route must export descriptive metadata.
   - Inject valid JSON-LD schemas using `@/components/seo/JsonLd`.
   - Maintain WCAG 2.1 AA accessibility (color contrast, interactive element focus rings, semantic HTML).
9. **Security & Secrets Hygiene:**
   - Never commit `.env` or credentials.
   - Keep API secrets (`CLOUDINARY_URL`, `SMTP_PASS`, Firebase Admin keys) strictly on the server.
