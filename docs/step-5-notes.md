# Step 5 notes: email through the ShiftPatch Gmail (D-024)

## How it works

1. Someone signs up. The page fires `signup_form_submitted` (unchanged), then calls `/api/contact` with email, role and `hero_variant`.
2. `/api/contact` signs the request with `EMAIL_SECRET` and forwards it to the Apps Script web app running in the ShiftPatch Gmail.
3. Apps Script adds a row to the Google Sheet "ShiftPatch email list", sends the welcome email from `shiftpatchsurvey@gmail.com`, and reports it to `/email/sent` (signed), which logs `welcome_email_sent`.
4. Every 10 minutes, a timer sends follow-up 1 at +2 hours and follow-up 2 at +6 hours, skipping unsubscribed rows.
5. In the welcome email, the 1×1 image logs `welcome_email_opened`, and the link logs `welcome_email_link_clicked`. Unsubscribe links open a confirm page, and the button marks the row.

Code: `functions/api/contact.ts`, `functions/email/[action].ts`, `functions/_shared/server.ts`, `apps-script/Code.gs`, and the form call in `src/components/SignupForm.astro`.

## Setup (owner, one time)

Done in the ShiftPatch Google account. The steps are in the session summary and are repeated here once the setup is confirmed.

## Test addresses (remove in 6d)

| Address | Used for | Date |
| :--- | :--- | :--- |
| `step5-localtest@example.com` | Local function tests (no real email sent; PostHog events only) | 2026-11-18 |
