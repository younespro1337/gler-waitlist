GLER Waitlist Dashboard — Frontend Developer Assessment
========================================================

A responsive Next.js + Material UI implementation of a Waitlist dashboard based on the provided Figma/brief. It includes a rich DataGrid with filters, inline editing, custom pagination styled like the design, and an in‑memory API for demo data.

Quick Start
-----------

Prerequisites

- Node.js 18.18+ (or 20+ recommended)

Install and run

```
npm install
npm run dev
```

Open `http://localhost:3000`, then navigate to `http://localhost:3000/waitlist`.

Scripts
-------

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm start` — run the built app
- `npm run preview` — build + start
- `npm run lint` — run ESLint

What’s Implemented
-------------------

- Waitlist page with filters and search
  - Debounced search; filter by status, vendor type, offering, postcode, and date range.
  - Efficient single‑pass filtering with indexed fields.
- DataGrid table (MUI X)
  - Editable row fields with validation (email, phone, postcode) and constrained selects for status/vendor/offering.
  - Custom compact footer with Figma‑style numeric pager on the left and the MUI rows‑per‑page selector on the right.
  - Auto height when page size = 10 (no scroll); virtualized scroll for 25/50.
  - Alternating row colors, compact density, and hover/selection styling.
- Pagination logic
  - Controlled `paginationModel` and clamped page index when data or page size changes.
  - Reusable `PaginationTabs` component for arrows + numbered buttons.
- Header and layout
  - App header with tabs and menus; “Service Dashboard” navigates to `/`.
  - Table header visibility guarded (z-index + layout tweaks) so it’s never hidden behind the search area.
- API and data
  - `/api/service-providers` returns seeded data using Faker and caches in memory.

Key Files
---------

- `src/app/waitlist/page.tsx` — Waitlist screen composition and data loading
- `src/components/filters/FiltersPanel.tsx` — Filters UI and state
- `src/components/waitlist/WaitlistHeader.tsx` — Title, entity toggle, and search input
- `src/components/table/ServiceProvidersTable.tsx` — DataGrid with editing and controlled pagination
- `src/components/table/CustomGridFooter.tsx` — Custom footer that hosts the pager + MUI selector
- `src/components/pagination/PaginationTabs.tsx` — Reusable pager component
- `src/components/layout/AppHeader.tsx` — Top navigation bar
- `src/lib/seed.ts` — Deterministic data generator
- `src/app/api/service-providers/route.ts` — API route serving the cached seed data

Design Details & Choices
------------------------

- Figma‑style pagination: numeric tabs and arrows visually match the design while staying accessible; integrates with DataGrid state via `apiRef`.
- No scroll at 10 rows: `autoHeight` enables page content to fit exactly; 25/50 enable internal table scrolling for performance.
- Responsiveness: layout uses CSS grid and MUI responsive props; pager wraps on small widths.
- Editing safety: input validation prevents invalid updates; errors are surfaced in console for this demo.

How to Verify
-------------

1. Start dev server: `npm run dev`.
2. Go to `/waitlist`.
3. Try search, toggle filters, and change date range; rows update instantly.
4. Edit a row (email/phone/postcode) and save; invalid formats are rejected.
5. Change page size to 10/25/50 and observe footer + scrolling behavior.
6. Use the numeric pager to navigate pages; state stays in sync with the selector.
7. Click the “Service Dashboard” tab to navigate to home `/`.

Notes & Next Steps
------------------

- This demo uses an in‑memory seed; refreshing the server will regenerate data.
- Potential enhancements if desired:
  - Ellipsis in pager for very large page counts.
  - Persist filters/pagination to the URL for shareable state.
  - Server‑side pagination if data volume grows.
  - Unit tests for filter/pager logic.

###### Tech Stack

- Next.js (App Router), React 19, TypeScript
- Material UI v7 and DataGrid
- Day.js, Axios, Faker
