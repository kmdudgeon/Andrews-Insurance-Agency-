# Andrews Insurance Agency website

Multi-page website for Andrews Insurance Agency (Kendallville, Indiana), built with Next.js (App Router), TypeScript, Tailwind CSS and Supabase, and deployed on Vercel.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Checks to run before every push:

```bash
git pull --rebase origin main
npm run typecheck && npm run lint && npm run build
```

## Where things live

| What | Where |
| --- | --- |
| Business facts (name, address, phone, hours, licenses, carriers, legal text) | `src/data/agency-config.ts` |
| Coverage page content | `src/data/coverage.ts` |
| City page content | `src/data/locations.ts` |
| Guides and glossary | `src/data/resources.ts` |
| JSON-LD structured data | `src/lib/schema.ts` |
| `/llms.txt` and `/llms-full.txt` (generated from the data files) | `src/lib/llms.ts` |
| Form validation and server actions | `src/lib/validation.ts`, `src/app/actions.ts` |
| Database schema and row-level security | `supabase/migrations/001_initial_schema.sql` |

Edit a fact once in `agency-config.ts` and it updates every page, the footer, metadata, structured data and `llms.txt`.

## Connecting the database

Until Supabase keys are set, the site runs in **preview mode**: forms validate and show a confirmation, but nothing is stored and the visitor is told to call the office.

1. Create a Supabase project and run `supabase/migrations/001_initial_schema.sql` in the SQL editor.
2. In Vercel, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`) and redeploy.
3. To read leads from an app, give a Supabase Auth user `{"role": "admin"}` in `app_metadata`. Leads are always visible in the Supabase dashboard.

Website visitors can only insert leads, and only with consent recorded. Each quote and appointment stores the exact consent text and a UTC timestamp.

## Before launch

Have the principal broker confirm the items below; they came from the project brief and public sources, not from the agency directly.

- License numbers, office address and hours in `src/data/agency-config.ts`
- Carrier list and carrier phone numbers (currently Ameritas and VSP only)
- The Medicare notice wording, which CMS updates periodically, and whether Medicare products are offered
- The privacy policy, terms and disclaimers, ideally with an attorney or compliance contact
- Which Facebook page to link in the footer
- Real client reviews, if any should be shown on the site (the `testimonials` table is ready; none are published)
