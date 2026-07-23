# Holiday CMS (Strapi)

Headless CMS powering the Kenya Airways Holidays landing page. Built with **Strapi v5** (5.50.2) using SQLite for local development.

## Content Architecture

### Content Types

| Content Type | Purpose |
| ------------ | ------- |
| **Tenant** | Airline/brand configuration (name, slug, domain, theme, header nav, footer) |
| **Page** | Landing pages with dynamic zone sections |

#### Tenant Fields

| Field | Type | Description |
| ----- | ---- | ----------- |
| `name` | string (required) | Brand display name |
| `slug` | string (required) | URL-safe identifier (e.g. `kqh`) |
| `domain` | string (required) | Associated domain |
| `default_language` | string | Language code (default `en-en`) |
| `is_active` | boolean | Enable/disable tenant (default `true`) |
| `theme` | component | `branding.theme` – colors, fonts, logo, favicon |
| `Header` | component (repeatable) | `block.navigation-group` – top navigation items |
| `footer` | component | `block.footer` – footer layout, links, socials, awards |

#### Page Fields

| Field | Type | Description |
| ----- | ---- | ----------- |
| `title` | string | Page title |
| `slug` | string | URL path (e.g. `/`) |
| `page_type` | enum | `home`, `campaign`, `article`, `about`, `faq` |
| `page_section` | dynamic zone | Hero, Search Widget, Destination Grid |

### Components

| Component | Category | Purpose |
| --------- | -------- | ------- |
| `branding.theme` | Branding | Colors, fonts, logo, favicon |
| `branding.font-family` | Branding | Font selection enum (inter, roboto, poppins, montserrat, prata, playfair_display, lora) |
| `branding.typography` | Branding | Font family + size for a heading level |
| `block.hero` | Block | Hero banner with desktop/mobile media, text, overlay, CTAs |
| `block.search-widget` | Block | Tabbed search form with configurable tabs and deeplink URLs |
| `block.search-tabs` | Block | Individual tab config (label, icon, search_type, deeplink, product ID) |
| `block.destination-grid` | Block | Card grid with configurable column layout and "view all" link |
| `block.cards` | Block | Individual destination card (title, subtitle, image, button) |
| `block.footer` | Block | Footer with column layout, links, policies, awards, socials |
| `block.navigation-group` | Block | Header nav item – link or dropdown containing link groups |
| `block.link-group` | Block | Group of links with optional CTA |
| `block.link` | Block | Single link (label, url, open_new_tab) |
| `block.social-group` | Block | Social media links section with display toggle |
| `block.social-link` | Block | Single social link (platform enum + url) |
| `block.award` | Block | Award badge images with sizing and display toggle |

### Tenant Theme Fields

The `branding.theme` component on each Tenant controls the frontend's CSS variables:

- `primary_color` – Main brand color (buttons, accents) – default `#000000`
- `secondary_color` – Secondary brand color (footer, nav) – default `#FFFFFF`
- `background_color` – Page background – default `#FFFFFF`
- `accent_color` – Accent highlights – default `#0000FF`
- `text_primary` – Main body text color – default `#000000`
- `text_secondary` – Muted/secondary text color – default `#6C757D`
- `heading_font_family` – Heading font (uses `branding.font-family` component)
- `body_font_family` – Body font (uses `branding.font-family` component)
- `logo` – Brand logo (media)
- `favicon` – Site favicon (media)

### Search Widget Tabs

Each search tab defines a booking product type:

| Field | Description |
| ----- | ----------- |
| `label` | Tab display name |
| `icon` | Icon identifier |
| `search_type` | `flight_hotel`, `flight_stopover`, `hotel`, `tour`, `event` |
| `deeplink_base_url` | Base URL for booking engine |
| `product_id` | Product identifier for deeplink |
| `enabled` | Toggle tab visibility |

### Footer Structure

The footer component supports:

- **Layout**: `simple`, `column_2`, `column_3`, `column_4`
- **Colors**: `background_color`, `text_color`
- **Copyright**: Rich text
- **footer_links**: Repeatable link groups (each with title + links + optional CTA)
- **policy_links**: Flat list of policy/legal links
- **awards**: Award badge images with sizing
- **social_links**: Social media links grouped with display toggle

## Getting Started

### Prerequisites

- Node.js >=20.0.0 (up to 26.x)
- npm >=6.0.0

### Setup

1. Install dependencies:

```bash
npm install
```

2. Start in development mode (with auto-reload):

```bash
npm run develop
```

3. Open the admin panel at [http://localhost:1337/admin](http://localhost:1337/admin)

### First-Time Setup

1. Create an admin user when prompted
2. Generate an API token (Settings → API Tokens) for the frontend
3. Create a **Tenant** entry with slug `kqh` and configure the theme
4. Add **Header** navigation groups to the Tenant (links and/or dropdowns)
5. Add a **Footer** to the Tenant (layout, links, socials, awards)
6. Create a **Page** entry with slug `/` and page_type `home`
7. Add sections to the page's `page_section` dynamic zone (hero, search-widget, destination-grid)
8. Publish both entries
9. Enable **public `find` permissions** for Page and Tenant (Settings → Roles → Public)

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run develop` | Start with auto-reload |
| `npm run start` | Start without auto-reload |
| `npm run build` | Build admin panel |
| `npm run strapi` | Run Strapi CLI commands |
| `npm run upgrade` | Upgrade Strapi to latest |
| `npm run upgrade:dry` | Dry-run Strapi upgrade |

## Data

Local development uses SQLite (stored at `.tmp/data.db`). This file is gitignored.

Uploaded media is stored in `public/uploads/`.

## Deployment

For production, consider:
- [Strapi Cloud](https://cloud.strapi.io)
- Self-hosted with PostgreSQL/MySQL

See the [Strapi deployment docs](https://docs.strapi.io/dev-docs/deployment) for options.
