# Sparkle RFID Design System Guide

This guide documents the design system token configurations (colors and typography) mapped in the Tailwind CSS configuration (`src/index.css`) based on the brand guide rules.

---

## Typography

- **Heading Font:** `Orbitron` (Bold / Heavy variants)
  - Custom Class: `font-heading` or `font-display`
- **Body Font:** `Inter` (Regular / Medium/ Semibold/ Bold variants)
  - Custom Class: `font-body` or `font-sans`
- **Console / Technical Font:** `JetBrains Mono`
  - Custom Class: `font-mono`

---

## Brand Color Palette

The following values are set inside the Tailwind theme block (`src/index.css` `@theme`) and are available as utility classes (e.g. `text-primary-gold`, `bg-secondary-graphite`, `border-primary-violet`):

### Primary Colors

| Token Name | Hex Code | Purpose / Usage | Tailwind Class |
| :--- | :--- | :--- | :--- |
| **Primary Violet** | `#D91CFF` | Scanning beams, laser graphics, high-value accents, glowing alerts | `primary-violet` |
| **Primary Gold** | `#D4A34A` | Corporate accent color, main CTA buttons, pricing highlights | `primary-gold` |
| **Primary White** | `#FFFFFF` | Text overlays on dark mode, card background fills, container borders | `primary-white` |

### Secondary Colors

| Token Name | Hex Code | Purpose / Usage | Tailwind Class |
| :--- | :--- | :--- | :--- |
| **Secondary Graphite** | `#1E1E1E` | Main dark background panels, dashboard logs cards | `secondary-graphite` |
| **Secondary Steel** | `#555555` | Secondary text captions, thin section lines, inactive status text | `secondary-steel` |
| **Secondary Cloud** | `#D9D9D9` | Light mode divider lines, disabled field fills, border lines | `secondary-cloud` |
| **Secondary Gold** | `#B98A32` | Clicked button states, active tabs, hover states | `secondary-gold` |

---

## Logo & Favicon Integration

- **Favicon:** The transparent brand mark is placed at `/favicon.png` inside the `public/` directory and loaded inside the browser tab head in `index.html`.
- **Header & Footer Brand Marks:** Renders from `/logo_dark.png` (light mode / white backgrounds) and `/logo_light-transprent.png` (dark mode / Graphite backgrounds) dynamically.
