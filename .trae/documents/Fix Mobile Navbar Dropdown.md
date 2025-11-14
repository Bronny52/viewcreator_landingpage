## Goal
Make the mobile navbar dropdown open/close when tapping the hamburger button, matching existing UI.

## Approach
- Wire the hamburger button with proper IDs and ARIA attributes.
- Add a hidden mobile menu panel aligned under the fixed navbar, styled with `glass-panel` and Tailwind classes.
- Reuse the existing `initMobileMenu(button, menu)` logic to toggle visibility and `aria-expanded`.

## Changes
- HTML: Assign `id="mobileMenuButton"` and `aria-controls="mobileMenu"` to the hamburger button.
- HTML: Add `#mobileMenu` as a `md:hidden` dropdown with the same nav items (Tools, Protocol, Pricing, Blog).
- JS: No changes required; the initializer already calls `initMobileMenu` with these IDs.

## Accessibility
- Use `aria-expanded` on the trigger and keep focus behavior simple for mobile.
- Maintain tap targets and spacing for touch usability.

## Validation
- Run locally and verify the menu opens/closes and respects the fixed navbar layout.

## Outcome
- Functional mobile dropdown menu consistent with the current design, no redirection.