# Auto Max — CRM & AI Integration Design

**Date:** 2026-04-17
**Status:** Approved (pending user review of written spec)
**Supersedes:** n/a — extends `2026-03-25-wow-factor-design.md`

## Context

The Auto Max front-end replacement site is ~70% built and deployed at
`automax-eosin.vercel.app`. Design, motion, inventory UI, financing calculator,
feature search, About page, and contact footer are all in place.

Every revenue-generating pathway is still missing: forms dead-end, there's no
backend, no lead logging, no analytics, no AI layer.

Late discovery revealed that Auto Max already runs two industry-standard dealer
systems:
- **VinSolutions** (Cox Automotive) — their existing CRM and system of record
- **Dealer eProcess (DEP)** — their current website/inventory platform

This changes the strategy. **We do not build or replace a CRM.** We build a
modern front-end and AI layer that feeds VinSolutions over ADF-XML (the
universal dealer-CRM lead-ingestion format).

## Goals

1. Every form submission on the new site produces a properly-formatted ADF-XML
   lead in Chris's VinSolutions inbox within 5 seconds.
2. Chris has a lightweight, Chris-facing analytics view of *our site's*
   contribution — lead count, lead source, conversion over time — without
   touching his VinSolutions workflow.
3. The new site pulls live inventory from DEP's feed, rendering dynamic VDPs
   with VIN-tagged lead forms.
4. AI layer enriches every outgoing ADF lead with a pre-qualification summary
   and a drafted first-response message, delivered inside the ADF `<notes>`
   field so Chris's sales team sees the value inside their existing tool.
5. Each tier is independently shippable and independently billable.

## Non-Goals

- Building a CRM. VinSolutions is the CRM. We do not replicate lead status,
  pipelines, sales rep assignment, task lists, or any VinSolutions-native
  workflow.
- Replacing DEP as Chris's contract-bound site until his DEP contract ends.
  Launch day is a DNS cutover, not a platform fight.
- Direct VinSolutions Connect API integration in phase one. ADF-email is the
  integration surface; Connect API is a nice-to-have for Tier 3+.
- Training Chris's staff on new tools. Zero-retraining is a design constraint.

## Architecture

```
[Browser]
  ├─ Static React site (Vite) — already deployed on Vercel
  └─ Form submissions → POST /api/leads/{contact|test-drive|financing|trade-in|feature-search}

[Vercel Functions — Node.js runtime, Fluid Compute]
  ├─ /api/leads/*  → validate → persist → enrich (Tier 3) → send ADF email
  ├─ /api/inventory → cached fetch from DEP feed, normalized
  └─ /api/admin/*  → gated analytics endpoints

[Supabase]
  ├─ leads (id, created_at, source, form_type, vehicle_vin, payload, ai_summary, adf_sent_at)
  ├─ vehicles (cached slice of DEP feed for VDP rendering + search)
  ├─ sessions (attribution — utm, referrer, landing page, device)
  └─ admin_users (Chris + future sales managers)

[External]
  ├─ Resend → ADF-XML emails to VinSolutions inbox
  ├─ Twilio → optional SMS notification to Chris on new lead
  ├─ DEP inventory feed → scheduled pull every 15 min, cached in Supabase
  ├─ OpenAI/Anthropic → lead enrichment + inventory chat (Tier 3)
  └─ Vercel Analytics + PostHog free tier → funnel/session data
```

## Tier Structure

### Tier 1 — Modern Front, Feeds Your CRM (~$3–5k + $100–150/mo)

**Scope:**
- Supabase project, schema for `leads`, `sessions`, `admin_users`
- Vercel Functions for each form type, each writing to Supabase and emitting ADF
- ADF-XML builder (see `buildADF(lead)` below) covering the ADF 1.0 spec
- Resend integration, sending ADF as email body to the VinSolutions inbox
- Twilio SMS to Chris on new-lead events (opt-in, easy to disable)
- Lightweight Chris-facing dashboard at `/admin` — magic-link auth, single user
- Dashboard shows: lead count (today / 7d / 30d), source breakdown, form-type
  breakdown, per-lead detail (payload, UTMs, ADF send status, VinSolutions
  confirmation), and a "resend ADF" button for failures

**What's explicitly excluded from Tier 1:** lead *status* tracking (new/
contacted/sold), sales-rep assignment, notes beyond the initial payload, kanban
views, any two-way texting. Those live in VinSolutions. We do not re-implement
them.

**Acceptance:**
- [ ] Submitting any form on the site results in a VinSolutions lead within 5s
- [ ] Chris receives an SMS within 10s of each new lead
- [ ] `/admin` dashboard shows all leads with working source attribution
- [ ] Resending a failed ADF works end-to-end

### Tier 2 — Real Inventory & Dynamic VDPs (~$4–6k + $50/mo)

**Scope:**
- Scheduled Vercel Cron fetches DEP inventory feed every 15 minutes, writes
  normalized rows to `vehicles` in Supabase
- Dynamic VDP routes (`/inventory/[year]-[make]-[model]-[vin]`) rendering from
  Supabase with proper SEO metadata, structured data (JSON-LD Vehicle schema),
  and OG tags
- Vehicle-specific lead forms auto-populate the ADF `<vehicle>` block with VIN,
  year, make, model, stock number
- Feature Search component swaps client-side mock data for live Supabase query
- Inventory Section on the homepage becomes a rotating "featured 6" query

**Acceptance:**
- [ ] Every live DEP vehicle has a working VDP URL within 15 min of appearing
  on DEP
- [ ] Sold/removed vehicles 404 or redirect to category within 15 min
- [ ] Lead form on a VDP produces an ADF with correctly populated `<vehicle>`
- [ ] Feature Search filters against live Supabase data

### Tier 3 — AI Concierge That Supercharges VinSolutions (~$6–10k + $200–400/mo)

**Scope:**
- **Inventory chat widget** (floating) — user natural-language query →
  Anthropic or OpenAI function-calling against Supabase `vehicles` → returns
  matching cars with links to VDPs. If the conversation surfaces intent (test
  drive, financing, trade-in), offers a form pre-filled from chat context
- **Lead enrichment pipeline** — every Tier 1 lead passes through an LLM
  before ADF send; LLM generates a 2–4-sentence pre-qualification summary
  (budget signals, timeline, vehicle specificity, credit hints, urgency),
  injected into the ADF `<notes>` field
- **AI-drafted first response** — LLM also drafts a friendly, on-brand first
  SMS and first email response; drafts are included in the ADF `<notes>` so
  the salesperson can paste-and-send
- **Chat-to-lead conversion analytics** — dashboard adds a "chat-originated
  leads" row showing ROI of the AI layer

**Guardrails:**
- Hard cap on per-lead token spend (~$0.05 ceiling)
- Fallback: if enrichment fails or times out >3s, ADF sends without enrichment
- No AI-generated prices, warranties, or guarantees; strict system prompt
- Chat widget never sends outbound messages on the customer's behalf

**Acceptance:**
- [ ] Chat can answer "what 4Runners under $25k do you have?" accurately from
  live Supabase inventory
- [ ] 95% of ADF leads include an enrichment summary within 3s added latency
- [ ] Spot-check of 20 enrichment summaries by Chris shows ≥90% "actionable"

## Data Model (Supabase)

```sql
-- Minimal Tier 1 schema. Extends for Tier 2/3.

create table leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  form_type       text not null check (form_type in
                    ('contact','test_drive','financing','trade_in','feature_search','chat')),
  source          text,               -- utm_source or derived
  landing_page    text,
  referrer        text,
  payload         jsonb not null,     -- full form body
  vehicle_vin     text,               -- if applicable
  ai_summary      text,               -- Tier 3
  ai_draft_sms    text,               -- Tier 3
  ai_draft_email  text,               -- Tier 3
  adf_sent_at     timestamptz,
  adf_error       text,
  notified_at     timestamptz         -- SMS-to-Chris confirmation
);

create table vehicles (
  vin             text primary key,
  year            int not null,
  make            text not null,
  model           text not null,
  trim            text,
  price           int,
  mileage         int,
  body_style      text,
  features        text[],
  photos          text[],
  stock_number    text,
  last_seen_feed  timestamptz not null default now(),
  removed_at      timestamptz
);

create table sessions (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  anon_id         text not null,
  utm             jsonb,
  device          text,
  landing_page    text
);

create table admin_users (
  id              uuid primary key default auth.uid(),
  email           text unique not null,
  role            text not null default 'owner'
);
```

RLS on all tables. Service role key only used server-side in Vercel Functions.

## ADF-XML Integration

ADF 1.0 is a stable XML spec used by every major dealer CRM since 2003. A
minimal valid lead:

```xml
<?xml version="1.0"?>
<?adf version="1.0"?>
<adf>
  <prospect>
    <requestdate>2026-04-17T14:30:00-05:00</requestdate>
    <vehicle interest="buy" status="used">
      <year>2022</year>
      <make>Hyundai</make>
      <model>Kona</model>
      <vin>5NMJ...</vin>
    </vehicle>
    <customer>
      <contact>
        <name part="first">Maria</name>
        <name part="last">Kowalski</name>
        <email>maria@example.com</email>
        <phone>+14055550123</phone>
      </contact>
    </customer>
    <vendor>
      <vendorname>Auto Max Website</vendorname>
    </vendor>
    <provider>
      <name part="full">automax-eosin.vercel.app</name>
      <service>Web Lead</service>
    </provider>
  </prospect>
</adf>
```

Sent as the body of a plain email to the VinSolutions ADF inbox. Subject line
convention: `ADF Lead - [vehicle or form type] - [customer name]`. Tier 3
appends an enriched `<notes>` block inside `<prospect>`.

Module: `api/_lib/adf.ts` — pure function `buildADF(lead: Lead): string`,
easy to unit test.

## Security & Auth

- Admin dashboard: Supabase magic-link auth, owner-only until multi-user is a
  real need. Restrict via RLS + server-side role check.
- API routes: rate-limited per IP (Upstash/Vercel KV), honeypot field on all
  forms, Turnstile CAPTCHA on submit.
- Environment variables managed via `vercel env pull`; never committed.
- Preview deployment password-protected (Vercel Deployment Protection) until
  launch.
- No PII in logs. Resend transactional, no marketing features enabled.

## Phasing Plan

**Pre-discovery (unblocked, can start today):**
- Supabase project + schema
- Vercel Function skeletons for all form types
- ADF-XML builder + unit tests against a fake inbox (Mailtrap)
- Form wiring on existing components
- Magic-link auth on `/admin` route

**Blocked on Chris discovery email:**
- Pointing Resend at real VinSolutions inbox
- DEP inventory feed pull (Tier 2)
- Production Twilio number

**Launch sequence:**
1. Tier 1 complete and demoed to Chris with seed data → contract signed
2. Swap fake inbox → real VinSolutions inbox, real Twilio, real Chris login
3. Tier 2 build once DEP feed is in hand
4. Tier 3 build, starts billing the AI retainer

## Open Questions (awaiting discovery)

- Confirm "DEP" = Dealer eProcess (vs. Dealer Experience Platform or similar)
- VinSolutions plan tier — ADF-email only, or Connect API available?
- Does Auto Max have a CARFAX or AutoCheck subscription we can surface on VDPs?
- Financing — does Chris have preferred lender partners with iframe apps
  (Route One, Dealertrack), or is the Financing Calculator → lead flow
  sufficient for launch?
- Who at Chris's team should receive SMS notifications on new leads — Chris
  alone, or a rotation?

## Risks

- **DEP locks the inventory feed behind an integration fee.** Mitigation: scrape
  the public inventory pages as fallback. Ugly, but works.
- **VinSolutions ADF inbox rejects our format.** Mitigation: test against the
  ADF 1.0 spec with real-looking payloads before going live. Cox has a test
  mode; we'll use it.
- **Chris walks after Tier 1 and doesn't sign Tier 2/3.** Acceptable — Tier 1
  alone is profitable, and it leaves the door open.
- **AI enrichment cost spirals with volume.** Mitigation: hard per-lead token
  cap and daily spend alerts via Vercel monitoring.

## Out of Scope

- Photo enhancement / reconditioning pipeline
- Service-department scheduling
- Parts inventory
- Social media auto-posting of new arrivals
- SEO content / blog system
- Multi-location / franchise support (Auto Max Del City branch is a separate
  microsite problem, not a multi-tenant problem)
