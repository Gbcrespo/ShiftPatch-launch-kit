# Step 5 notes: email through the ShiftPatch Gmail (D-024)

## How it works

1. Someone signs up. The page fires `signup_form_submitted` (unchanged), then calls `/api/contact` with email, role and `hero_variant`.
2. `/api/contact` signs the request with `EMAIL_SECRET` and forwards it to the Apps Script web app running in the ShiftPatch Gmail.
3. Apps Script adds a row to the Google Sheet "ShiftPatch email list", sends the welcome email from `shiftpatchsurvey@gmail.com`, and reports it to `/email/sent` (signed), which logs `welcome_email_sent`.
4. Every 10 minutes, a timer sends follow-up 1 at +2 hours and follow-up 2 at +6 hours, skipping unsubscribed rows.
5. In the welcome email, the 1×1 image logs `welcome_email_opened`, and the link logs `welcome_email_link_clicked`. Unsubscribe links open a confirm page, and the button marks the row.

Code: `functions/api/contact.ts`, `functions/email/[action].ts`, `functions/_shared/server.ts`, `apps-script/Code.gs`, and the form call in `src/components/SignupForm.astro`.

## Setup (owner, one time, done 2026-11-18)

1. Generate one shared secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` (64 characters, nothing after them).
2. script.google.com, signed in as the ShiftPatch Gmail: new project "ShiftPatch email", paste `apps-script/Code.gs`, and set the script properties `EMAIL_SECRET`, `SITE_URL` (`https://shiftpatch-concept.pages.dev`) and `SIGNER_NAME`. Run `setup` and allow the permissions. Then Deploy → Web app, executing as **Me**, with access set to **Anyone**.
3. Cloudflare Pages → shiftpatch-concept → Variables and Secrets (Production): `EMAIL_SECRET` (the same value) and `APPS_SCRIPT_URL` (the `/exec` URL).
4. **Retry the latest production deployment after any variable change.** Cloudflare only applies variables to new deployments.

## Troubleshooting (what happened on 2026-11-18)

- **Symptom:** signups reached PostHog, but no welcome email and no `welcome_email_sent`.
- **Checks:**
  - An unsigned POST to the `/exec` URL got `{"ok":false,"error":"bad_signature"}` back (through the 302 to `script.googleusercontent.com`), so the script was deployed, public and had a secret.
  - `/api/contact` returned 202, so Cloudflare had the URL.
- **Cause:** the two `EMAIL_SECRET` values didn't match. Cloudflare ignores the script's reply, so this failed silently.
- **Fix:** set a fresh secret on both sides, then retry the deployment. Afterwards `gbcrespo10+test4@gmail.com` got the welcome email, and `welcome_email_sent`, `_opened` and `_link_clicked` arrived on one person.

## Test addresses (remove in 6d)

| Address | Used for | Date |
| :--- | :--- | :--- |
| `step5-localtest@example.com` | Local function tests (no real email sent; PostHog events only) | 2026-11-18 |
| `gabriel+test1@gmail.com` | Browser signup before the fix (not in the Sheet, no email). **Not the owner's inbox**: plus-addressing delivers to `gabriel@gmail.com`. Never reuse it | 2026-11-18 |
| `gbcrespo10+test1@gmail.com` | Browser signup (`?internal=1`) before the fix: PostHog only, not in the Sheet, no email | 2026-11-18 |
| `gbcrespo10+test2@gmail.com` | Same as test1 | 2026-11-18 |
| `gbcrespo10+test3@gmail.com` | Same as test1 | 2026-11-18 |
| `gbcrespo10+test4@gmail.com` | Direct `/api/contact` call after the fix: in the Sheet, welcome received, 3 email events on one person. No browser signup, so there's no `signup_form_submitted` for it | 2026-11-18 |

## 5d status

- **Done:** the welcome email was received at test4. `welcome_email_sent` → `_opened` → `_link_clicked` arrived on one PostHog person (`06f009e6…`) at 21:47:31, 21:49:27 and 21:49:51 UTC.
- **Still open:**
  - One **browser** signup after the fix (accepting cookies) to confirm the 3 email events land on the same person as its `signup_form_submitted` and `$identify`.
  - Inbox, Promotions or Spam for each of 3 providers.
  - The follow-ups at +2 hours and +6 hours.
