## Goal
Add an on-page success follow-up without any booking CTA and auto-close the contact modal after successful submission.

## Approach
- Show a small bottom-centered toast styled with `glass-panel` after a successful send.
- Close the contact modal immediately on success and auto-hide the toast after a few seconds.

## Changes
- HTML: Add hidden `#contactToast` near the end of `<body>` with a concise success message.
- JS: Implement `closeContactModal()` and `showContactToast()`; call them in the success branch of the contact form submission.

## Accessibility
- Toast uses `aria-live="polite"` and does not steal focus.
- Modal close returns focus to the trigger.

## Validation
- Submit the contact form locally; confirm modal closes, toast appears, and auto-hides.

## Outcome
- Smooth, on-page confirmation aligned with the current UI, no extra CTAs.