-- Andrews Insurance Agency — initial schema
-- Idempotent: safe to run more than once.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- quote_leads
-- ---------------------------------------------------------------------------
create table if not exists public.quote_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  coverage_types text[] not null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  street_address text,
  city text default 'Kendallville',
  state text default 'IN',
  zip_code text not null,
  current_carrier text,
  policy_expiration_window text,
  -- Non-sensitive, line-specific details only (vehicle year/make/model, roof age,
  -- business industry, household size). Never SSNs, driver's license numbers,
  -- payment card numbers or medical records.
  coverage_details jsonb not null default '{}'::jsonb,
  preferred_contact_method text check (preferred_contact_method in ('phone', 'email', 'text')),
  tcpa_consent_granted boolean not null default false,
  tcpa_consent_text text not null,
  tcpa_consent_timestamp timestamptz not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  landing_page_path text,
  status text not null default 'new',
  constraint quote_leads_coverage_types_valid check (
    cardinality(coverage_types) > 0
    and coverage_types <@ array['auto', 'home', 'health', 'life', 'commercial']::text[]
  ),
  constraint quote_leads_tcpa_required check (tcpa_consent_granted = true)
);

create index if not exists quote_leads_created_at_idx on public.quote_leads (created_at desc);
create index if not exists quote_leads_status_idx on public.quote_leads (status);
create index if not exists quote_leads_email_idx on public.quote_leads (lower(email));

-- ---------------------------------------------------------------------------
-- appointments
-- ---------------------------------------------------------------------------
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  client_name text not null,
  email text not null,
  phone text not null,
  consultation_type text not null check (consultation_type in ('in_person_kendallville', 'phone', 'video')),
  insurance_topic text,
  requested_date date not null,
  requested_time_slot text not null,
  notes text,
  tcpa_consent_granted boolean not null default false,
  tcpa_consent_text text not null,
  tcpa_consent_timestamp timestamptz not null,
  status text not null default 'requested',
  constraint appointments_tcpa_required check (tcpa_consent_granted = true)
);

create index if not exists appointments_created_at_idx on public.appointments (created_at desc);
create index if not exists appointments_requested_date_idx on public.appointments (requested_date);

-- ---------------------------------------------------------------------------
-- service_requests
-- ---------------------------------------------------------------------------
create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  request_type text not null check (request_type in (
    'id_card_request',
    'certificate_of_insurance',
    'policy_review',
    'mortgagee_change',
    'claims_advocacy_callback',
    'billing_question'
  )),
  client_name text not null,
  email text not null,
  phone text not null,
  carrier_name text,
  message text,
  non_binding_acknowledged boolean not null,
  status text not null default 'new',
  constraint service_requests_ack_required check (non_binding_acknowledged = true)
);

create index if not exists service_requests_created_at_idx on public.service_requests (created_at desc);

-- ---------------------------------------------------------------------------
-- testimonials (publish only real, verifiable client reviews)
-- ---------------------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  reviewer_name text not null,
  city text,
  state text default 'IN',
  rating int not null check (rating between 1 and 5),
  review_text text not null,
  coverage_line text,
  verified_client boolean not null default false,
  published boolean not null default false,
  review_date date
);

create index if not exists testimonials_published_idx on public.testimonials (published, review_date desc);

-- ---------------------------------------------------------------------------
-- carriers
-- ---------------------------------------------------------------------------
create table if not exists public.carriers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  lines_supported text[] not null default '{}',
  claims_phone text,
  claims_url text,
  billing_url text,
  display_order int not null default 0,
  active boolean not null default true
);

create index if not exists carriers_active_order_idx on public.carriers (active, display_order);

insert into public.carriers (name, slug, lines_supported, claims_phone, claims_url, billing_url, display_order)
values
  ('Ameritas', 'ameritas', array['dental', 'vision'], '800-487-5553', 'https://www.ameritas.com/claims/', 'https://www.ameritas.com/digital/member-account', 1),
  ('VSP Vision Care', 'vsp', array['vision'], '800-877-7195', 'https://www.vsp.com', 'https://www.vsp.com', 2)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- Row-Level Security
-- ---------------------------------------------------------------------------
alter table public.quote_leads enable row level security;
alter table public.appointments enable row level security;
alter table public.service_requests enable row level security;
alter table public.testimonials enable row level security;
alter table public.carriers enable row level security;

-- Website visitors (anon) may only INSERT leads, and only with consent recorded.
drop policy if exists "anon can submit quote leads" on public.quote_leads;
create policy "anon can submit quote leads" on public.quote_leads
  for insert to anon
  with check (tcpa_consent_granted = true and status = 'new');

drop policy if exists "anon can request appointments" on public.appointments;
create policy "anon can request appointments" on public.appointments
  for insert to anon
  with check (tcpa_consent_granted = true and status = 'requested');

drop policy if exists "anon can submit service requests" on public.service_requests;
create policy "anon can submit service requests" on public.service_requests
  for insert to anon
  with check (non_binding_acknowledged = true and status = 'new');

-- Lead data is readable and editable only by signed-in agency admins: users whose
-- app_metadata contains {"role": "admin"} (set from the Supabase dashboard or admin API).
-- The service_role key bypasses RLS and must never be exposed to the browser.
drop policy if exists "staff manage quote leads" on public.quote_leads;
create policy "staff manage quote leads" on public.quote_leads
  for all to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "staff manage appointments" on public.appointments;
create policy "staff manage appointments" on public.appointments
  for all to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "staff manage service requests" on public.service_requests;
create policy "staff manage service requests" on public.service_requests
  for all to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Public, read-only content.
drop policy if exists "public reads published testimonials" on public.testimonials;
create policy "public reads published testimonials" on public.testimonials
  for select to anon, authenticated using (published = true);

drop policy if exists "staff manage testimonials" on public.testimonials;
create policy "staff manage testimonials" on public.testimonials
  for all to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "public reads active carriers" on public.carriers;
create policy "public reads active carriers" on public.carriers
  for select to anon, authenticated using (active = true);

drop policy if exists "staff manage carriers" on public.carriers;
create policy "staff manage carriers" on public.carriers
  for all to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Table privileges (RLS policies above still apply).
revoke all on public.quote_leads, public.appointments, public.service_requests from anon;
grant insert on public.quote_leads, public.appointments, public.service_requests to anon;
grant select on public.testimonials, public.carriers to anon;
grant select, insert, update, delete on
  public.quote_leads, public.appointments, public.service_requests, public.testimonials, public.carriers
  to authenticated;
