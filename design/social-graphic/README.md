# LinkedIn graphic template

One reusable 1200x627 graphic in the "Charge sheet" style. Pre-launch concept: the "Pre-launch concept" label is always shown.

Edit nothing to re-render with a new headline. From the repo root in PowerShell:

    .\design\social-graphic\render.ps1 -Headline "Your question here?" -Source "Source: named source, date" -Out docs\gtm\assets\post04.png

- `-Headline` becomes the serif headline (long text shrinks automatically; keep it under about 100 characters).
- `-Source` sets the line at the bottom left. Leave it off for the default line, or pass `-Source ""` to clear it.
- `-Out` defaults to `docs/gtm/assets/linkedin-template.png`.
- Needs Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe`.

You can also open `template.html?h=...&s=...` in a browser to preview. Any number in a headline needs its source named in the source line.
