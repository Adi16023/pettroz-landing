# Pettroz landing

Marketing site for two Pettroz products: Petrol Pump Management and standalone Attendance & Payroll.

```bash
npm install
npm run dev
```

## Design and motion

Page layouts use `.site-container` with fluid side padding (`max(1.25rem, 4vw)`)
and no fixed desktop width cap. Text blocks keep their own readable line lengths.
Avoid decorative badges, repeated taglines and section preambles; retain product
information, useful headings, navigation and actions. Preview captions only identify
demo data.

The homepage hero shows only Petrol Pump Management, with a guided app demo:
a cursor edits and saves a fuel rate, then navigates through Sales (including
records), Dip stock and DSR daily closing before returning to the dashboard.
Immediately after the hero, an automatically moving fuel-brand carousel uses
logos from the sibling `Petroz/public/brands` directory.
The carousel retains the independent-software and non-affiliation disclaimer.
The homepage follows with an operational overview and reasons to choose Pettroz,
then open product rows instead of enclosing cards. Each has a
product introduction beside four non-clickable, icon-led capability groups,
combining related features into short explanations without repeating screenshots.
Each product has one link to its product page's `#showcase` walkthrough.
Attendance & Payroll appears first as a standalone product. Petrol Pump Management
then shows Attendance & Payroll inclusion (on eligible plans) followed by its
additional station features, rather than repeating workforce features.
Further homepage sections cover supported fuel-station brands, automation,
financial control, workforce, customers, reports, multi-outlet management, a
five-step business value summary and the supplied petrol-pump FAQs. The feature
catalogue presents 24 pump modules and the attendance modules, with detailed
capability pages and the supplied feature FAQs.
Below the petrol-pump hero, an interactive Sales / Stock / Closing explorer uses
the source-based app screens as static, user-selected views. Business capabilities
are grouped into customers, finances and multi-outlet operations, followed by the
eligible-plan workforce inclusion. Detailed module links remain available without
repeating the entire feature catalogue in cards.
Both product pages use animated previews. Attendance demonstrates a new check-in,
with matching updates to counts, the donut, designation totals and recent punches,
then visits Attendance records, Shifts & Rosters, Leave and Payroll before returning
to Overview. Sidebar highlights follow the visible screen. Closing the DSR and
processing payroll are synthetic demo state changes, never real write actions.
These demos loop automatically without a visible caption or playback controls,
pause offscreen or in hidden tabs,
and stay static for reduced-motion users. Product listing previews remain static.
No pages display a "How it works" section.
The previews are read-only, source-based renders of the logged-in Petroz UI with
demo data identified in accessible descriptions, not live customer data or captured screenshots.
They are reused on the product listing and individual product pages.

`src/components/product-preview.tsx` adapts the app's `shell/desk-shell.tsx`,
`shell/rail.tsx`, `shell/ops-strip.tsx`, `(desk)/dashboard/page.tsx` and
`attendance/overview.tsx` from the sibling `Petroz/src` folder.
`src/components/product-ui.tsx` carries the relevant DeskCard, MetricCard, KpiCard
and chart presentation, including the original tank SVG paths.
Tanks use the app's fill-and-wave presentation with a continuous wave loop for
the landing demos. Their motion pauses offscreen or in hidden tabs and is disabled
for reduced-motion users; displayed stock quantities do not change.
`src/components/product-demo-screens.tsx` adapts Sales, Dip, DSR and the attendance
records, shifts, leave and payroll screens with synthetic records.
Scoped `.petroz-product-ui` styles preserve the app's tokens, enlarged typography,
card shadows and sidebar without changing the landing page theme.

The app's authentication, store, customer records and write actions are deliberately
excluded. The desktop canvas scales as a whole to preserve the app layout at thumbnail
sizes. When the application UI changes, update these presentation extracts alongside it.
The original Lottie assets and workflow components are retained but are not rendered
on any page.

## Navigation

The header adapts the centered pill-navigation pattern from `viralos-landing` to
Pettroz's navy and red palette. The highlight follows pointer or keyboard focus,
then returns to the current route. Nested routes retain their parent highlight.
The menu collapses based on available space rather than a fixed breakpoint.
The compact panel supports Escape, outside-click dismissal and reduced motion.

## Enquiry availability

Demo and contact requests are intentionally unavailable until an enquiry backend is
connected. These pages do not collect contact details or claim a request was submitted.
Before enabling booking, wire a verified delivery service and implement server-side
validation, consent handling, submission/error states, and a real delivery confirmation.

## Validation

```bash
npm run lint
npm run build
```

Check the homepage and both product pages on desktop and mobile, including feature
links, automatic app demo looping, keyboard navigation, FAQs
and reduced-motion mode.
