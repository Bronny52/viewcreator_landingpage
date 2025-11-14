## UX Recommendations

* Use a centered modal with overlay, matching `glass-panel`, dark theme, and `viral-green` accents.

* Trigger from the Footer “Contact” link; no page navigation.

* Smooth open/close with scale+opacity using Tailwind classes; disable background interactions while open.

* Mobile-first layout, full-width on small screens, constrained (`max-w-md`) on desktop.

* Provide immediate feedback: inline success state in the modal; no redirects.

## Accessibility

* `role="dialog"`, `aria-modal="true"`, labelled by a visible title.

* Focus trap within the modal; return focus to the trigger on close.

* Close via overlay click, dedicated close button, and `Escape` key.

* Manage `aria-expanded` on the Footer “Contact” trigger.

## Fields & Validation

* Inputs: `name` (required), `email` (required, format), `message` (required, min length).

* Optional: `subject` dropdown and hidden honeypot field to deter bots.

* Client-side validation with clear, inline error messages.

## Submission Strategy

* Frontend `fetch` POST to configurable `CONTACT_ENDPOINT`.

* If no backend is available: temporary fallback to a third-party form endpoint or `mailto:`; success UI shown without navigation.

* Disable submit during request; handle timeouts and errors with retry guidance.

## Technical Implementation

### HTML (index.html)

1. Add a hidden modal near the end of `<body>`:

   * Overlay `fixed inset-0 bg-black/60 backdrop-blur-sm hidden`.

   * Modal container `glass-panel rounded-2xl p-6 max-w-md w-[92%] mx-auto` centered with Flex.

   * Form with labeled inputs, required indicators, and submit/cancel buttons.
2. Update Footer “Contact” link to include `id="contactTrigger"`, `aria-controls="contactModal"`, `aria-expanded="false"`.

### CSS (assets/css/base.css)

* Reuse existing utilities; minimal custom rules for overlay stacking if needed (e.g., higher `z-index`).

* Keep styles consistent with `glass-panel` and typography.

### JS (assets/js/app.js)

1. Add `initContactModal(trigger, modal)` to:

   * Toggle modal visibility; set `aria-expanded` and body scroll lock.

   * Trap focus; close on overlay click and `Escape`.
2. Add `initContactForm(form)` to:

   * Validate inputs; show inline errors.

   * Submit via `fetch` to `CONTACT_ENDPOINT`; show success/error states; reset form.
3. Call initializers in `DOMContentLoaded` with element lookups by id.

## Security & Performance

* Sanitize and trim input values; never echo raw input back into HTML.

* Basic email format validation; prevent duplicate submissions; reasonable timeout.

* No external scripts beyond current CDNs; minimal listeners; use `requestAnimationFrame` only for transitions if needed.

## Deliverables

* Modal markup integrated in `index.html`.

* JS behaviors added to `assets/js/app.js`.

* Optional small CSS additions in `assets/css/base.css` for overlay.

* Works entirely client-side with configurable endpoint; no redirection.

## Next Steps

* I’ll implement the modal, wire up the footer trigger, add validators and submit handling, and verify accessibility and mobile responsiveness across breakpoints.

