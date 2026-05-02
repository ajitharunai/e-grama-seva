---
name: Gram Seva Portal
colors:
  surface: '#fdf7ff'
  surface-dim: '#ded8e0'
  surface-bright: '#fdf7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f2fa'
  surface-container: '#f2ecf4'
  surface-container-high: '#ece6ee'
  surface-container-highest: '#e6e0e9'
  on-surface: '#1d1b20'
  on-surface-variant: '#494551'
  inverse-surface: '#322f35'
  inverse-on-surface: '#f5eff7'
  outline: '#7a7582'
  outline-variant: '#cbc4d2'
  surface-tint: '#6750a4'
  primary: '#4f378a'
  on-primary: '#ffffff'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#cfbcff'
  secondary: '#63597c'
  on-secondary: '#ffffff'
  secondary-container: '#e1d4fd'
  on-secondary-container: '#645a7d'
  tertiary: '#765b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#fdf7ff'
  on-background: '#1d1b20'
  surface-variant: '#e6e0e9'
typography:
  hero-numbers:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: '1.3'
  h2:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
  body:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
  sublabel-tamil:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.4'
  footer:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  sidebar_width: 260px
  container_max_width: 1440px
  gutter: 24px
  margin_page: 32px
  stack_sm: 8px
  stack_md: 16px
  stack_lg: 24px
---

## Brand & Style

The design system is engineered to bridge the gap between high-level governance and grassroots administration. It adopts a **Corporate Modern** aesthetic with a strong emphasis on **Data-Forward Minimalism**. Inspired by the precision of Linear and the analytical clarity of Google Looker Studio, the interface evokes a sense of efficiency, transparency, and institutional trust. 

The visual narrative is built on "breathable" layouts—utilizing generous whitespace to ensure that complex village administrative data remains legible and non-intimidating. The color story utilizes deep Emerald Teals to represent the agrarian and administrative roots of Tamil Nadu, punctuated by high-energy Orange accents to signify digital progress and urgent action items.

## Colors

This design system utilizes a sophisticated monochromatic green foundation to establish a calm, professional environment. 

- **Structural Colors**: The `primary_dark` (#004D40) is reserved for persistent navigational elements like the sidebar and top bar, creating a "frame" for the content.
- **Action Colors**: `accent_orange` (#FF6D00) is the high-visibility driver for Call-to-Actions (CTAs) and active indicators, providing a sharp contrast against the teal palette.
- **Surface & Background**: The background uses a subtle `background_mint` (#E0F2F1) rather than pure white to reduce eye strain during long administrative sessions, while `surface_white` provides the "elevation" for content cards.

## Typography

The typography system relies on **Inter** to deliver a utilitarian, highly readable experience across varying screen densities. 

- **Information Hierarchy**: Hero Numbers are emphasized to highlight key village metrics (e.g., population count, fund allocation) at a glance.
- **Bilingual Support**: Sublabels are specifically optimized for Tamil script integration at 11px, ensuring that secondary translations remain legible without cluttering the primary English interface.
- **Readability**: A base body size of 15px ensures comfortable reading for long-form administrative reports.

## Layout & Spacing

This design system employs a **Fixed-Fluid Hybrid Grid**. The sidebar remains fixed at 260px to maintain consistent navigation, while the main content area utilizes a 12-column fluid grid that scales to a maximum width of 1440px.

- **Vertical Rhythm**: A 8px baseline grid governs all spacing.
- **Page Margins**: Large 32px outer margins ensure the "breathable" quality requested, preventing the UI from feeling cramped on large desktop monitors.
- **Data Density**: Gutters are kept at 24px to allow for high-density data tables and card layouts without visual overlap.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Soft Ambient Shadows**. 

- **Base Layer**: The Mint Off-White background serves as the lowest depth level.
- **Card Layer**: Content is housed in white cards with a subtle 12px radius. To create a premium "floating" effect, cards use a specific teal-tinted shadow: `0 4px 16px rgba(0,105,92,0.10)`. 
- **Interactive Depth**: On hover, cards should transition to a slightly deeper shadow or a 1px border of `primary_pale` to indicate interactivity.
- **Navigation Depth**: The sidebar uses a flat, dark treatment to ground the interface, relying on color saturation rather than shadows for its presence.

## Shapes

The design system uses a **Rounded** shape language to soften the institutional nature of the portal, making it feel more accessible to local administrators.

- **Large Components**: Cards and containers use a 12px (0.75rem) radius.
- **Interactive Elements**: Buttons and Input fields use a standard 8px (0.5rem) radius for a modern, approachable feel.
- **Small Elements**: Tags and status badges may utilize a fully rounded (pill) shape to distinguish them from actionable buttons.

## Components

### Buttons
- **Primary**: Solid `accent_orange` (#FF6D00) with white text. 8px radius. Used for "Add New," "Submit," or "Approve."
- **Secondary**: Ghost style with a `primary_brand` (#00695C) 1.5px border and matching text.
- **Tertiary**: Text-only using `primary_brand` for low-priority actions like "Cancel" or "View More."

### Input Fields
- **Default State**: 8px radius, `primary_pale` (#B2DFDB) 1px border, white background.
- **Focus State**: 2px border of `primary_brand` with a soft teal outer glow.
- **Labels**: Secondary muted text above the input; Tamil sublabels positioned immediately below the primary label at 11px.

### Tables
- **Headers**: Solid `primary_brand` background with white semibold text.
- **Rows**: Alternating row colors using `alt_row` (#F5FFFE) for high-scanability.
- **Hover**: Rows highlight in `background_mint` (#E0F2F1) to track data horizontally.

### Sidebar & Navigation
- **Width**: 260px.
- **Active State**: Navigation items feature a 4px vertical "pill" indicator of `accent_orange` on the left edge, with the menu text shifting to white.
- **Icons**: Simple, 20px stroke-based icons in `primary_light`.

### Cards & Metrics
- **Metric Cards**: Feature the `hero-numbers` (40px) in `primary_brand`, with a small trend indicator (up/down arrow) in status colors.
- **Status Badges**: Small, pill-shaped backgrounds using 10% opacity of the status color with 100% opacity text.
