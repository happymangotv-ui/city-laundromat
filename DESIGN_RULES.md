# City Laundromat — Design Rules

**Reference page:** `pickup-delivery.html` — this is the gold standard. All pages must match its look and feel.

---

## Spacing

- **Section padding:** `60px 6%` (desktop), `44px 5%` (mobile) — ✅ APPROVED. Do not change without explicit instruction.
- **Section header margin-bottom:** `40px` — space between the label/title and the content below it
- Gaps between sections should feel tight and intentional — not airy. When in doubt, reduce padding, not increase it.

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
- **Emoji icons:** Every service card MUST have an emoji in `.service-icon`. Never leave it empty. Use `style="margin:0 auto 20px"` to center it.
- **Icon alignment:** When cards have centered text (`style="text-align:center"`), always add `style="margin:0 auto 20px"` to `.service-icon` so the icon centers above the text. Never left-align an icon when the card text is centered.
- **Odd number of cards (3, 5, etc.):** Always force them onto one row using `grid-template-columns: repeat(N, 1fr)`. Never let an odd card sit alone on a second row — it looks unintentional.
- **Buttons (primary):** Teal gradient, border-radius 999px, font-weight 700
- **Buttons (secondary):** White background, border, border-radius 999px
- **Hero badge:** Pill shape, white bg, teal text, uppercase, small font

## Address

- Always display full address: **391 Brook Ave, Bronx NY 10454**
- Never abbreviate to just "391 Brook Ave" or "Brook Ave, Bronx"
- Use `{{ business.full_address }}` in templates

## Content Rules

- **Rush price:** `{{ business.prices.rush }}` — NEVER hardcode
- **Wash & fold price:** `{{ business.prices.wash_fold }}` — NEVER hardcode
- **Self-serve price:** `{{ business.prices.self_serve }}` — NEVER hardcode
- **Booking URL:** `{{ business.booking_url }}` — NEVER hardcode
- **Phone:** `{{ business.phone }}` — NEVER hardcode
- **Address:** `{{ business.full_address }}` — NEVER hardcode
- **Hero image:** `{{ business.hero_image }}` — NEVER hardcode. Same image shown on all pages.
- **Hero image styling:** `border-radius: 28px`, `outline: 3px solid rgba(255,255,255,0.9)`, `outline-offset: 7px`, `height: 480px` (locked), `width: auto` (adjusts to image), `object-fit: none` (never crop/squish). Consistent on every page, never override per-page.
- Rule: if it's editable in the /admin panel, it must use a template variable everywhere on the site
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
