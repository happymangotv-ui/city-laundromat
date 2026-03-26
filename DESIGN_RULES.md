# City Laundromat — Design Rules

**Reference page:** `pickup-delivery.html` — this is the gold standard. All pages must match its look and feel.

---

## Layout

- **Hero section:** Always use `min-height: 60vh` (NOT 100vh). This keeps the nav-to-content spacing tight and consistent.
- **Nav:** Fixed at top, shared across all pages via `nav.njk`. Never modify per-page.
- **Footer:** Shared across all pages via `footer.njk`. Never modify per-page.
- **Section padding:** Use existing section classes. Never add custom top padding to hero sections.

## Typography

- **Nav links:** 15px, font-weight 500
- **Nav logo:** 1.3rem, font-weight 800
- **Hero h1:** clamp(2.2rem, 5vw, 3.6rem), font-weight 800
- **Body text:** 1.05rem, line-height 1.7
- **Section labels:** 0.8rem, uppercase, letter-spacing 1.5px, teal color
- **Section titles:** clamp(1.8rem, 4vw, 2.8rem), font-weight 800

## Colors

- **Primary teal:** `#2d7d6e`
- **Teal light:** `#3d9e8c`
- **Dark charcoal:** `#111827`
- **Gray text:** `#6b7280`
- **Background light:** `#f3f7f9`
- **White:** `#ffffff`

## Components

- **Service cards:** Equal height (`height: 100%`, `display: flex`, `flex-direction: column`). All cards in a grid must be same size.
- **Buttons (primary):** Teal gradient, border-radius 999px, font-weight 700
- **Buttons (secondary):** White background, border, border-radius 999px
- **Hero badge:** Pill shape, white bg, teal text, uppercase, small font

## Address

- Always display full address: **391 Brook Ave, Bronx NY 10454**
- Never abbreviate to just "391 Brook Ave" or "Brook Ave, Bronx"
- Use `{{ business.full_address }}` in templates

## Content Rules

- **Rush price:** $1.40/lb
- **Wash & fold price:** $1.25/lb
- **Self-serve price:** $2.69/wash
- **Booking URL:** Always use `{{ business.booking_url }}` — never hardcode
- **Phone:** Always use `{{ business.phone }}` — never hardcode
- **Wash & Fold page:** Hidden from nav (page exists but not linked)
- **No mention of clothes on hangers**
- **No "no minimum order"**

## New Pages

When adding a new page:
1. Copy `pickup-delivery.html` as the starting template
2. Change hero `min-height` to `60vh`
3. Update title, meta description, hero badge, h1, and body content
4. Do NOT add custom CSS that overrides shared styles
5. Do NOT hardcode phone, address, prices, or booking URL — use template variables

## Shared Files (never edit per-page)

- `src/_includes/base.njk` — all CSS and JS
- `src/_includes/nav.njk` — navigation
- `src/_includes/footer.njk` — footer
- `_data/business.json` — all business info (edit via /admin panel)
