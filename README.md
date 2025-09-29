GLER Waitlist Dashboard — Frontend Developer Assessment
=======================================================

A clean, responsive Waitlist dashboard built with Next.js + Material UI. It matches the provided Figma brief with a left filter stack and a DataGrid table for Service Providers, plus client-side search, filtering, and pagination. A small Customers placeholder is included (not provided in the Figma).

Screenshots
-----------

Home

![Home](public/Home.png)

Waitlist

![Waitlist](public/Waitlist.png)

Non-Technical Setup (2–5 minutes)
----------------------------------

Option A — Run locally

1) Install Node.js LTS
- Go to https://nodejs.org and install “LTS” (18 or 20).
- After install, open “Terminal” (macOS) or “PowerShell” (Windows) and run: `node -v` — it should print something like v20.x.

2) Download this project
- If you received a ZIP, unzip it to a simple folder like `C:\gler-waitlist` or `~/gler-waitlist`.

3) Start the app
- Open Terminal/PowerShell in the project folder and run:

```
npm install
npm run dev
```

- Open http://localhost:3000 in your browser, then go to http://localhost:3000/waitlist.

Option B — One-click deploy to Vercel

- Create a free account at https://vercel.com (or log in).
- Import this repo and click Deploy. The first build takes ~1–2 minutes.
- Copy the live URL and share it.

Developer Setup
---------------

Requirements
- Node.js 18.18+ (or 20.x recommended)

Scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm start` — run the built app
- `npm run preview` — build + start
- `npm run lint` — run ESLint

Architecture
------------

- App Router (Next.js): single route at `/waitlist`, plus a mock API.
- Client components for table/filters; API provides seeded data.
- Axios fetch; client-side filtering/sorting/pagination for demo scale.

Key Files
---------

- `src/app/waitlist/page.tsx` — page composition and data loading
- `src/components/filters/FiltersPanel.tsx` — filters UI and state
- `src/components/waitlist/WaitlistHeader.tsx` — title, entity toggle, search
- `src/components/table/ServiceProvidersTable.tsx` — DataGrid + editing + pagination
- `src/components/table/CustomGridFooter.tsx` — compact footer hosting pager + selector
- `src/components/pagination/PaginationTabs.tsx` — reusable pager
- `src/components/layout/AppHeader.tsx` — top navigation bar
- `src/lib/seed.ts` — deterministic data generator
- `src/app/api/service-providers/route.ts` — mock API route

Features
--------

- Filters: postcode, status, date range, vendor type, service offering
- Debounced search; URL-synced filters/search/page size
- DataGrid: compact, alternating rows, sticky header; 25 rows by default
- Inline edit with validation (email/phone/postcode, select fields)
- Pager: numeric tabs with First/Prev/Next/Last; MUI selector on the right
- Loading/empty/error states (non-blocking)
- Header: nav tabs and user area; location shown

Design Snapshot & DELTA
-----------------------

- Snapshot: “Frontend Developer Assessment – Dashboard UI (Figma/PDF)”
- DELTAs:
  - Customers view is a placeholder (not provided in the Figma).
  - Pager numeric tabs are on the left (selector on the right). If the design prefers right alignment, this can be toggled easily.

API Contract (demo)
-------------------

- Request: `GET /api/service-providers`
  - For the demo, the API returns all seeded rows. The client applies filters/pagination.
- Response shape

```
{
  "data": ServiceProvider[]
}
```

Where `ServiceProvider` is:

```
{
  id: string;
  email: string;
  phone: string;
  postcode: string;
  vendorType: 'Independent' | 'Company';
  serviceOffering: 'Housekeeping' | 'Window Cleaning' | 'Car Valet';
  signupDate: string; // ISO
  status: 'Onboarded' | 'Rejected' | 'Pending';
}
```

Accessibility & Performance
---------------------------

- Keyboard reachable and labeled MUI inputs by default
- Focus states visible; compact density for data views
- Vercel Analytics + Speed Insights are included for traffic/perf insight

Troubleshooting (Windows)
-------------------------

- If you see dev-only errors under `.next/static/development/_buildManifest.js.tmp.*`, do this:
  1) Stop dev server
  2) Delete the `.next` (and `build/`) folder
  3) Re-run with `npm run dev`
  4) If persistent, run `npm run preview` for a production check

Submission Checklist (quick)
----------------------------

- Live link (Vercel) and GitHub repo in your email
- Attach updated CV
- Paste Design Snapshot and list DELTAs
- Confirm: no console errors; main flows work (filters/search/pager/edit)

Suggested Final Commit Message
------------------------------

```
feat: finalize GLER Waitlist demo (Next.js + MUI)

- Add filters, URL-synced search, and compact DataGrid
- Implement numeric pager with first/last and MUI selector
- Customers placeholder (not in Figma) and user header polish
- Add Vercel Analytics + Speed Insights; improve README with screenshots
- Fix Windows dev file race, build warnings, and TS/ESLint issues
```

License
-------

Private assignment submission. Do not distribute without permission.
