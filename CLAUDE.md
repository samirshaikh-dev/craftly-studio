# AI Agent Instructions — Craftly Studio

<!-- BEGIN:nextjs-agent-rules -->
## ⚠️ Next.js Version Warning

This is NOT the Next.js you know.

This version (16.2.10) has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices. Dynamic route `params` and `searchParams` are Promises and must be awaited.
<!-- END:nextjs-agent-rules -->

---

## Single Source of Truth for Repository Context

> [!IMPORTANT]
> ### REPOSITORY CONTEXT: ZERO DUPLICATION POLICY
> All repository architecture, tech stack specifications, database schemas (Firestore collections: `blogPosts`, `leads`, `media`), route inventories, API contracts, folder structures, and roadmap phases are documented exclusively in:
>
> 📖 **[context.md](file:///s:/craftly-studio/context.md)**
>
> **Do NOT duplicate repository context in agent instructions.** To inspect the current implementation status, data models, or system architecture, all AI assistants and CLIs **must read context directly from `context.md`** before planning or executing tasks.

---

## Mandatory Pre-Implementation Protocol: ALWAYS Load Context & Skills

> [!CAUTION]
> ### STRICT ENFORCEMENT: ZERO IMPLEMENTATION WITHOUT READING CONTEXT & SKILLS
> Before proposing any changes, writing a single line of code, creating new files, or editing existing files, the AI **MUST ALWAYS**:
> 1. **Read Repository Context:** Inspect [context.md](file:///s:/craftly-studio/context.md) to ground the solution in the active repository state, data schemas, and architectural boundaries.
> 2. **Load Applicable Discipline Skill(s):** Read the corresponding skill file(s) from `agents/skills/`.
>
> Writing code without first reading `context.md` and the corresponding skill(s) is strictly prohibited across all AI agent CLIs and tools.

### Discipline Routing Matrix

| Discipline | Skill Document | When to Activate |
| :--- | :--- | :--- |
| **Frontend & App Router** | [agents/skills/frontend-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/frontend-engineer/SKILL.md) | Next.js 16 / React 19 RSC boundaries, hydration, forms, client state, error boundaries |
| **UI/UX & Visual Design** | [agents/skills/ui-ux-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/ui-ux-engineer/SKILL.md) | Design tokens, spacing, typography, theme contrast, responsive ergonomics, interactive states |
| **Backend & API Architecture** | [agents/skills/backend-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/backend-engineer/SKILL.md) | Firestore data access, Cloudinary integration, Nodemailer email pipelines, route handlers |
| **Database Engineering** | [agents/skills/database-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/database-engineer/SKILL.md) | Firestore collections, schema models, document timestamps, query patterns, indexing |
| **Technical SEO & Schema** | [agents/skills/seo-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/seo-engineer/SKILL.md) | JSON-LD schemas, dynamic metadata, OpenGraph cards, sitemaps, robots.txt |
| **Keyword Strategy & Content** | [agents/skills/seo-keyword-research-implementation/SKILL.md](file:///s:/craftly-studio/agents/skills/seo-keyword-research-implementation/SKILL.md) | Local search intent, agency service keywords, topic clusters, on-page optimization |
| **Performance Engineering** | [agents/skills/performance-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/performance-engineer/SKILL.md) | Core Web Vitals, Lenis smooth scrolling, bundle size, Cloudinary asset delivery, caching |
| **Accessibility Standards** | [agents/skills/accessibility-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/accessibility-engineer/SKILL.md) | WCAG 2.1 AA compliance, keyboard navigation, focus management, ARIA roles |
| **Security & Secret Hygiene** | [agents/skills/security-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/security-engineer/SKILL.md) | Input validation, Firestore security rules, secret segregation, CSRF/XSS defense |
| **DevOps & Build Infrastructure** | [agents/skills/devops-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/devops-engineer/SKILL.md) | Next.js build optimizations, package management via pnpm, deployment configs |
| **AI Integrations** | [agents/skills/ai-engineer/SKILL.md](file:///s:/craftly-studio/agents/skills/ai-engineer/SKILL.md) | Chatbots, conversational UI, and CMS AI content assistants |
| **Brand & Entity Profile SEO** | [agents/skills/personal-seo-profile-optimizer/SKILL.md](file:///s:/craftly-studio/agents/skills/personal-seo-profile-optimizer/SKILL.md) | Agency brand entity optimization, knowledge graph alignment |

---

## Key Commands

```bash
pnpm dev           # Start development server
pnpm build         # Build for production
pnpm start         # Start production server
pnpm lint          # Run ESLint
```

---

## Core Engineering Rules & Directives

1. **Mandatory Context & Skill Ingestion (Absolute Non-Negotiable):**
   - **NEVER** write code, create files, or modify files without first reading [context.md](file:///s:/craftly-studio/context.md) and the applicable skill in `agents/skills/`.
2. **Next.js 16 Version Awareness:**
   - App Router conventions: dynamic page and route handler `params` and `searchParams` are Promises and must be awaited.
3. **Server Components by Default:**
   - Keep pages and data-fetching components as Server Components.
   - Use `"use client"` exclusively for interactive elements (forms, framer-motion animations, auth guards).
4. **Strict TypeScript & Type Safety:**
   - Zero `any` policy. Use strict interfaces in `src/types/` (`blog.ts`, `lead.ts`, `media.ts`, `service.ts`).
   - Use Zod schemas for all client and server boundaries (`src/utils/validation.ts`).
5. **Styling & Design Tokens:**
   - Use Tailwind CSS v4 utility classes and defined tokens in `src/app/globals.css`.
   - Never use ad-hoc inline styles or raw CSS files.
   - Images must always use Next.js `<Image>` with explicit aspect ratios and descriptive `alt` tags.
6. **Data Storage & Asset Separation:**
   - Firestore is the single source of truth for structured documents (`blogPosts`, `leads`, `media`).
   - Cloudinary handles all media uploads, optimization, and asset delivery.
   - Document timestamps must always record `createdAt` and `updatedAt`.
7. **Form Handling Protocol:**
   - Always pair React Hook Form with Zod resolvers.
   - Every form must explicitly implement: initial state, interactive validation, error messages, submitting/loading spinner, and post-submission feedback.
8. **SEO & Accessibility:**
   - Every public route must export descriptive metadata.
   - Inject valid JSON-LD schemas using `@/components/seo/JsonLd`.
   - Maintain WCAG 2.1 AA accessibility (color contrast, interactive element focus rings, semantic HTML).
9. **Security & Secrets Hygiene:**
   - Never commit `.env` or credentials.
   - Keep API secrets (`CLOUDINARY_URL`, `SMTP_PASS`, Firebase Admin keys) strictly on the server.

---

## AI Agent Ecosystem

Purpose-built agents and skill configurations for this codebase:

- **Discipline Skills:** `agents/skills/` — 12 modular skills defining domain standards for all AI tools.
- **opencode Subagents:** `.opencode/agent/` — loaded natively by opencode (`frontend`, `admin-cms`, `backend`, `seo`, `ui-ux`, `testing`, `tech-lead`).
- **Generic AI Prompts:** `agents/generic/` — tool-agnostic definitions for Cursor, Claude Code, GitHub Copilot, ChatGPT, etc.

---

## Definition of Done

A feature or fix is complete only when:

- [context.md](file:///s:/craftly-studio/context.md) and relevant `agents/skills/` were consulted
- Code is implemented and compiles cleanly without TypeScript errors
- UI is responsive across all breakpoints
- Form validation and error states are in place
- Security and secret hygiene have been verified
- Tests are added where required
- Documentation is updated
