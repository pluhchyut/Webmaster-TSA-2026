# Community Hub Platform

This repository now contains two layers:

- the original static TSA site at the repo root
- a new `Next.js` App Router foundation under `src/` for the no-AI community hub platform

## No AI policy

This project must not use OpenAI, Anthropic, Google Gemini, Cohere, Hugging Face inference APIs, moderation APIs, sentiment APIs, embeddings APIs, summarization APIs, or any other AI-powered external service.

Core behavior is implemented with deterministic application code, SQL-oriented data models, server-side validation, rule-based moderation, and manually authored content structures.

## Stack

- `Next.js` App Router
- `TypeScript`
- `PostgreSQL`
- `Prisma`
- `Tailwind CSS`
- optional `Supabase Realtime`
- `Vitest` for deterministic logic tests

## Included foundation

- Prisma schema for users, memories, unsent messages, issues, reports, moderation logs, and audit events
- deterministic memory scoring in `src/lib/memoryScoring.ts`
- deterministic moderation in `src/lib/moderationRules.ts`
- role checks in `src/lib/permissions.ts`
- route handler scaffolding in `src/app/api`
- seeded demo content in `prisma/seed.ts`
- responsive App Router pages for:
  - `/memories`
  - `/unsent`
  - `/issues`
  - `/admin`

## Local setup

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Generate the Prisma client:

```bash
npm run prisma:generate
```

4. Run migrations against your Postgres database:

```bash
npm run prisma:migrate
```

5. Seed demo data:

```bash
npm run db:seed
```

6. Start the app:

```bash
npm run dev
```

## Current implementation notes

- The new full-stack foundation lives alongside the original static TSA files so the existing site is not destroyed while the platform is being built out.
- When `DATABASE_URL` is missing, read-only demo content is used for the App Router pages and API `GET` routes.
- Mutating route handlers return a clear database-configuration error until Postgres is connected.

## Next recommended phases

1. wire a real auth provider into `src/lib/auth.ts`
2. add Prisma migrations from the schema
3. connect UI forms to the route handlers
4. add integration tests for the API flows
5. add realtime updates for memory revival and moderation queue changes
