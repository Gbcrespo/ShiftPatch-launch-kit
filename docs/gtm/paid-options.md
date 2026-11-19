# Paid media options (step 7, phase 1: options only)

ShiftPatch is a pre-launch concept. Nothing is built, and nothing here is run or bought. This file lists options for the owner to choose from (D-027). It is not the paid campaign spec. Phase 2 writes the spec for the option the owner picks.

- **Buyer:** Florida hospital nursing and staffing leaders: CNO / director of nursing, staffing or scheduling office, nurse managers, finance or operations (D-014, D-015, D-009).
- **Headline number:** buyer-role signups, `signup_form_submitted` with `is_buyer_role = true` (D-009). Channel rate = buyer-role signups ÷ visitors, by `utm_source` (D-022, `docs/tracking-plan.md`).
- **Where paid traffic lands:** `/`, the page running the live hero A/B test "Hero framing: money vs time" (D-001, experiment 612484).
- **Earlier scoring:** `docs/research/traction-channels.md` scored social and display ads at 14 of 25 and SEM at 12 of 25. Both lost points on cost and "can't run this week", not on fit.
- **Sources:** all web sources below were accessed on 2026-11-19. "Vendor blog" means an agency or tool vendor's page, not the ad platform. Those figures are national or global, not Florida or hospital-specific, and they don't agree with each other.

## Summary

| | A. LinkedIn Sponsored Content | B. Google Search ads | C. Association email placement |
| :--- | :--- | :--- | :--- |
| Targets named buyer roles | Yes, by title, function, seniority, industry, company size and US state | No. Targets what people type, not who they are | Yes, to an association's list, but it isn't Florida-only |
| Florida-only | Yes (state is a location option) | Yes (Google location targeting) | No (AONL is national; FONL has no standalone ad) |
| Audience size, public | No. Needs a logged-in Campaign Manager estimate | No. Needs a logged-in Keyword Planner | AONL: "15,000+ members and prospects", national |
| Cost basis | Auction. $10/day minimum (LinkedIn). CPC $5 to $12.40 (vendor blogs, national) | Auction. CPC $4.76 to $5.87 (vendor benchmark, national) | Flat fee. AONL email banner $3,000 (2026 page) |
| Test budget | $210 floor to $750, 3 weeks | $500, 3 weeks | $3,000, one email |
| Clicks at that budget | about 16 to 42 ($210), 60 to 150 ($750) | about 85 to 105, only if the search volume exists | Can't estimate (no public click rate) |
| Honesty fit | Good, if the ad says "concept" | Fair. Policy bars promising unavailable products | Depends on the association accepting a concept |
| Risk to A/B test | Medium. Needs neutral copy | Medium. Keywords pick a pain | Low volume, low risk |

**Recommendation (owner decides):** option A at the $750 level, with neutral copy and the website-visit objective. Reasons are in "Recommendation" below.

---

## Option A: LinkedIn Sponsored Content (single image), Florida only

### Targeting

LinkedIn's help page lists the facets this needs ([LinkedIn Help, Targeting options, a424655](https://www.linkedin.com/help/linkedin/answer/a424655)):

- **Location:** "state" is a listed level ("continent, country cluster, country, state, region/market area, county, and city"). This closes the gap in `traction-channels.md`, which said Florida-only targeting was unverified on [S10]. The help page lists state under *recent* location; it doesn't say outright that *permanent* (profile) location also goes to state level. Check in Campaign Manager.
- **Job title, job function, seniority:** all listed. Titles come "primarily [from] member account input, with some business logic and inference".
- **Company industry and company size:** both listed. Size "primarily uses Page admin account input data".
- **How facets combine:** OR within a category, AND across categories. LinkedIn suggests starting with two or three facets so the audience doesn't get too small ([LinkedIn Help, a417950](https://www.linkedin.com/help/lms/answer/a417950), seen in search summary).

A starting set for phase 2: location Florida (US state) AND job titles matching the D-009 buyer roles (Chief Nursing Officer, Director of Nursing, Nurse Manager, Staffing Coordinator or Manager, Scheduling Coordinator, plus finance and operations director titles) AND company industry hospitals and health care. Company size is optional.

### Audience size

- **Not verifiable from public sources.** LinkedIn shows the reachable audience only inside Campaign Manager, on the right of the targeting screen (a424655). That needs a logged-in ad account. No public page states the size of this Florida audience.
- **Floor:** an ad set needs at least "300 member accounts". LinkedIn suggests "a minimum of 50,000 to drive results" and 300,000+ for Sponsored Content ([LinkedIn Help, a423690](https://www.linkedin.com/help/lms/answer/a423690); [LinkedIn audience page](https://business.linkedin.com/advertise/ads/audience) says 50,000+ for single image ads).
- **Context from the repo, not an audience size:** Florida has 223 CMS hospital records (`target-customer.md`). A title-targeted Florida nurse-leader audience is probably well under 50,000, so expect LinkedIn to flag it as small and to suggest broadening (unverified until the forecast is run).

### Cost assumptions

| Item | Figure | Source | Type |
| :--- | :--- | :--- | :--- |
| Minimum daily budget | $10, any ad format | [LinkedIn, Maximize your budget](https://business.linkedin.com/advertise/ads/best-practices/maximize-your-budget) | LinkedIn |
| Minimum lifetime budget, new campaign | $100, then $10 × days scheduled | same page | LinkedIn |
| Suggested daily budget, new advertiser | $25 | same page | LinkedIn (a suggestion, not a minimum) |
| Minimum bid | Varies by audience. Returned per targeting by LinkedIn's pricing API (`bidLimits.min`) | [Microsoft Learn, Ad Budget Pricing API](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ad-budget-pricing) | LinkedIn developer docs. The sample response figures there are an example, not a price for this audience |
| Healthcare CPC | $5 to $8 | [Stackmatix, 2026-09-02](https://www.stackmatix.com/blog/linkedin-ads-cost) (no source named for the figure) | Vendor blog, global |
| Healthcare CPC | $6.00 to $10.50, and $6.90 to $12.40 for "tightly qualified leads" | [Webtonic, updated 2026-10-09](https://www.webtonic.io/blog/health-wellness-linkedin-ads-statistics), quoting Foundry CRO and Ryze | Vendor blog quoting vendor blogs |
| Daily overspend | Sources disagree (20%, 50% or up to 100% above the daily budget on a given day) | search summaries of vendor blogs only | Not confirmed on a LinkedIn page. Phase 2 should set a lifetime budget cap |

Planning CPC range: **$5.00 to $12.40**, the outer bounds of the vendor figures above. A narrow senior Florida audience may cost more than these averages. The real number comes from the Campaign Manager bid suggestion.

### Test budget and clicks

| Level | Spend | Clicks at $12.40 | Clicks at $5.00 |
| :--- | :--- | :--- | :--- |
| Floor: $10/day × 21 days | $210 | about 16 | about 42 |
| Test: about $36/day × 21 days | $750 | about 60 | about 150 |

Arithmetic only (spend ÷ CPC, rounded down). These are clicks, not visitors or signups. No source gives a conversion rate for this audience, so none is assumed.

### Trade-offs

- **Reach of named buyers:** the best of the three. It is the only option that filters by job title and state at the same time. Titles are self-reported, so some nurses and vendors will get through; the `is_buyer_role` filter handles that in reporting.
- **Cost:** the highest per click, but a low floor ($10/day) and no flat fee.
- **Honesty fit:** good, with care. [LinkedIn's ads policy](https://members.linkedin.com/legal/ads-policy) (last revised 2025-11-18) says "Your product or service must accurately match the content of your ad" and "Any claims in your ad must have factual support". An ad that says "a concept I'm testing, nothing is built yet" matches the page. It also says the display URL domain must match the destination domain (the `/go/` link is on the same domain, so this fits), and "Do not send members to a landing page that generates a pop-up". The consent banner is a fixed bar along the bottom of the page (`src/components/ConsentBanner.astro`), not a modal. It is probably not a pop-up under this rule, but that is my reading; phase 2 should confirm it.
- **Lead Gen Forms:** not recommended. A form inside LinkedIn would skip the page, the A/B test and the PostHog funnel, and would put email addresses into LinkedIn. Use the website-visit objective.
- **LinkedIn Insight Tag:** not recommended. It adds a third-party tracking cookie, which the ads policy says needs "full disclosure and consent", and the privacy page doesn't cover it. Measure through the `/go/` link and UTMs only.
- **Measurability:** good. `/go/linkedin_ads` fires `channel_link_clicked`, and visits carry `utm_source=linkedin_ads`. LinkedIn's own click count gives a cross-check.
- **Risk to the A/B test:** medium. Paid visitors are split 50/50 by the flag like everyone else, so the split stays fair. Two real risks: (1) ad copy that leans on money or time would pre-sell one variant, so copy follows the neutral-pain rule (CLAUDE.md, D-027); (2) a burst of paid visitors could dominate the experiment's sample, so the result would mostly describe LinkedIn ad clickers. The experiment can't be filtered by `utm_source` after the fact without the owner's call, so the owner should decide whether paid starts before or after the A/B read.

---

## Option B: Google Search ads on problem terms, Florida only

### Targeting

- Keywords about the problem, not a product category, for example "float pool scheduling", "fill open nursing shifts", "internal staffing agency hospital", "reduce nurse agency spend". These are examples for phase 2, not researched terms.
- Location: Florida. Google Ads location targeting by state is a standard setting. I didn't fetch Google's help page for it in this pass.
- Many shift-related searches come from nurses looking for shifts, the supply side (D-014 rules them out). Phase 2 would need negative keywords such as "jobs", "travel nurse", "per diem nurse".

### Audience size

- **Not verifiable from public sources.** Search volume comes from Google Keyword Planner, which needs a Google Ads account ([Google Ads Help, Use Keyword Planner](https://support.google.com/adwords/answer/2999770), seen in search summary). Vendor blogs say accounts without spend see bucketed ranges such as "1K to 10K" (search summary, not confirmed on a Google page).
- `traction-channels.md` already flagged that this niche buyer probably searches little for a problem with no category name (unverified). A small budget may simply not spend.

### Cost assumptions

| Item | Figure | Source | Type |
| :--- | :--- | :--- | :--- |
| All-industry average CPC | $5.42 | [LocaliQ, Search advertising benchmarks, updated 2026-06-01](https://localiq.com/blog/search-advertising-benchmarks/) | Vendor benchmark (LocaliQ/WordStream client accounts on Google and Microsoft Ads), national, no date range stated |
| Business Services average CPC | $5.87 (CTR 6.10%) | same | same |
| Physicians & Surgeons average CPC | $4.76 | same | same. The closest healthcare row; the page has no hospital or B2B healthcare category |
| Minimum budget | None found on a Google page in this pass | — | Gap |

Planning CPC range: **$4.76 to $5.87.** These are averages across consumer and B2B advertisers. Niche B2B healthcare terms could cost more or less, and could have almost no volume.

### Test budget and clicks

$500 over 3 weeks (about $24/day): **about 85 clicks at $5.87, about 105 at $4.76**, but only if the Florida search volume exists. If it doesn't, the budget goes unspent and the test says little.

### Trade-offs

- **Reach of named buyers:** low. Google targets the query, not the job title. Clicks will include nurses, students, recruiters and vendors.
- **Cost:** lower per click than LinkedIn on the benchmark figures. No flat fee.
- **Honesty fit:** fair. [Google's Misrepresentation policy](https://support.google.com/adspolicy/answer/6020955) bars "Promising products, services, or promotional offers in the ad that are unavailable". A search ad has little room to explain "concept", and a searcher with an urgent problem expects a working tool. The ad text must say "concept" or "idea I'm testing" up front.
- **Measurability:** good with `/go/google_ads` (the redirect is on the same domain). Google's auto-tagging (`gclid`) isn't needed.
- **Risk to the A/B test:** medium. The keyword itself picks a pain: "reduce agency spend" pre-sells money (Variant A), "stop calling nurses" pre-sells time (Variant B). Phase 2 would need a balanced keyword set, or neutral terms only.

---

## Option C: Association email placement (AONL, or FONL/FHA if a rate appears)

What public sources show:

| Placement | Price | Audience | Source | Notes |
| :--- | :--- | :--- | :--- | :--- |
| AONL pre-conference email banner (728×90) | $3,000, one advertiser per email | "15,000+ members and prospects", national | [AONL, Email Banner Advertisement](https://aonl.org/conference/sponsorship-opportunities/banner-ad) | Page is for the 2026 conference. 2027 rates not checked. No eligibility rules stated |
| AONL media kit (e-newsletters, e-blasts) | Not public (form-gated) | "Over 12,000 Influential Nursing Leaders Nationwide" | [AHA/AONL media kit 2026](https://sponsors.aha.org/HFC-Sponsor-AONL-Media-Kit-2026.html) | No geographic targeting listed |
| FONL (Florida) | No standalone ad. The cheapest package with a "Custom pre-conference email to FONL members" is Platinum Exhibitor, $5,000 | "hundreds of nurse leaders" | [FONL 2026 prospectus](https://s3.amazonaws.com/nursing-network/production/attachments/2397/original/2026_FONL_Prospectus_5.20.2026.pdf) (PDF text extracted locally) | Tied to the Nov 4–6, 2026 conference, which is over. No 2027 prospectus found. The [FONL site](https://fonl.nursingnetwork.com/) lists no ad rates |
| FHA (Florida) | No public rate. A 2024 *academic* sponsorship ($5,000) includes an "FHA newsletter advertisement" | weekly newsletter, size not stated | [FHA 2024 Annual Academic Sponsorship](https://www.fha.org/common/Uploaded%20files/FHA/Sponsor%20Uploads/2024%20Annual%20Academic%20Sponsorship_FINAL.pdf) | For universities and colleges, not vendors. Also says "No sales presentations allowed" in member groups |
| Becker's Hospital Review, South Florida Hospital News | Not public | — | [Becker's media kit](https://www.beckershospitalreview.com/media-kit/) (gated); no rate page found for South Florida Hospital News | Search summaries only |

### Test budget and clicks

$3,000 flat for one AONL email banner. **Clicks can't be estimated**: AONL doesn't publish open or click rates, and I won't invent one. The Florida share of AONL's list isn't published either.

### Trade-offs

- **Reach of named buyers:** high quality (nurse leaders by membership), but national. Most of the spend reaches people outside Florida, against D-015.
- **Cost:** the highest outlay for one send, with no way to stop early.
- **Honesty fit:** uncertain. An association may not accept a sponsor with no product. A sponsor logo next to the association's name can also read as an endorsement, which a concept shouldn't imply.
- **Measurability:** good with a slug such as `/go/aonl_email_2027`, but a single send gives one burst of data.
- **Risk to the A/B test:** low, because the volume is small and arrives on one day.

---

## Recommendation (owner decides)

**Option A, LinkedIn Sponsored Content, at the $750 / 3-week level**, set up as:

- Florida (state) AND D-009 buyer titles AND hospital industry. Run the Campaign Manager forecast first. If it says the audience is under 300, the test can't run as specified and phase 2 goes back to the owner.
- Website-visit objective. No Lead Gen Forms, no Insight Tag.
- Ad copy under the CLAUDE.md voice rules: says "concept", neutral on money vs time, asks for a look at the page.
- A lifetime budget cap of $750, so daily overspend can't push the total past it.

Why: it is the only option that reaches the named buyer roles in Florida only, its floor is low ($10/day), and its honesty and measurement fit is the cleanest. It also tests H2's premise (`traction-channels.md`) that LinkedIn job titles let ShiftPatch choose who sees the link.

Why not the others: B can't target roles, its keywords tilt the A/B test, and its volume is unknown. C is national, a $3,000 flat fee, has no estimable clicks, and has no Florida placement on sale right now.

**Open question for the owner:** start paid during the live A/B test, or after it is read? Paid clicks would land on the experiment and could make up most of its sample.

## UTM check

Checked against `functions/go/[channel].ts` and D-019:

| Channel | `/go` link | utm_source | utm_medium | Status |
| :--- | :--- | :--- | :--- | :--- |
| LinkedIn organic | `/go/linkedin` | `linkedin` | `social` | **Exists**, as D-019 says |
| LinkedIn paid | — | — | — | **Doesn't exist**, as expected |
| Google paid | — | — | — | Doesn't exist |
| Association paid | — | — | — | Doesn't exist |

The function sets `utm_source` to the slug itself and `utm_campaign=prelaunch-2026-11` on every link. `?c=` becomes `utm_content`, so ad variants can be tagged (e.g. `/go/linkedin_ads?c=ad01`) without a new slug.

## Proposed changes (owner decides)

Nothing is created in phase 1. For the option picked, phase 2 would propose one entry in the `CHANNELS` map in `functions/go/[channel].ts` and a matching row in D-019's list:

| Option | Slug | utm_source | utm_medium | utm_content |
| :--- | :--- | :--- | :--- | :--- |
| A. LinkedIn ads | `/go/linkedin_ads` | `linkedin_ads` | `paid_social` | `?c=ad01`, `ad02`… per ad |
| B. Google Search | `/go/google_ads` | `google_ads` | `paid_search` | `?c=kw_<group>` per ad group |
| C. AONL email | `/go/aonl_email_2027` | `aonl_email_2027` | `paid_email` | `?c=banner01` |

Other decisions for the owner:

1. Which option, if any, and the budget level.
2. Whether paid keeps `utm_campaign=prelaunch-2026-11` (the function hard-codes it today) or gets its own campaign value.
3. Paid during or after the A/B read (see above).
4. The `paid_social` / `paid_search` / `paid_email` medium names. They follow common analytics usage; nothing in the repo fixes them yet.

---

## Log

- **Agent:** Agent C, phase 1
- **Model:** Opus 5.5 (claude-opus-5-5)
- **Start (UTC, `date -u`):** Thu, Nov 19, 2026  8:22:40 PM
- **End (UTC, `date -u`):** Thu, Nov 19, 2026  8:27:47 PM
- **Task:** Propose 2 to 3 paid media platform and budget options for reaching Florida hospital nursing and staffing leaders, with sourced costs, a test budget in clicks, trade-offs, a labelled recommendation, and a UTM check. Options only; no spec.
- **Method:** Read CLAUDE.md, D-001, D-009, D-014, D-015, D-019, D-022, D-027, `tracking-plan.md`, `grading-checklist.md`, `target-customer.md`, `traction-channels.md` and `functions/go/[channel].ts`. Checked the consent banner's CSS against LinkedIn's pop-up rule. Searched and fetched LinkedIn help, policy and developer pages, Google policy and help pages, a vendor search benchmark, and association sponsorship pages. Extracted the FONL and FHA PDFs with `pdftotext` into the scratchpad. Clicks = spend ÷ CPC, rounded down.
- **Sources fetched:** linkedin.com/help answers a424655 and a423690; business.linkedin.com ad-targeting, audience and maximize-your-budget pages; members.linkedin.com/legal/ads-policy; learn.microsoft.com LinkedIn Ad Budget Pricing API; support.google.com/adspolicy/answer/6020955; localiq.com/blog/search-advertising-benchmarks; stackmatix.com/blog/linkedin-ads-cost; webtonic.io health-wellness LinkedIn stats; aonl.org banner-ad page; sponsors.aha.org AONL 2026 media kit; FONL 2026 prospectus PDF; FONL home page; FHA 2024 academic sponsorship PDF. Search summaries only: LinkedIn help a417950, Google Keyword Planner help, Becker's media kit, South Florida Hospital News, LinkedIn overspend figures.
- **Kept:** LinkedIn first-party minimums and targeting facets; vendor CPC ranges, labelled as vendor and national; LocaliQ search CPCs; AONL and FONL published prices.
- **Dropped and why:** WordStream 2025 figures ($2.62 health CPC): the WordStream page returned 403, and the third-party copies conflicted with each other. The API sample bid figures on Microsoft Learn: an illustrative example, not a price. The 2010 Becker's $400 rate: 16 years old. The Texas Hospital Association and FSASC rate cards: other organizations, not buyable for this audience. A sponsored newsletter as a separate option: no public rate for a Florida nurse-leader newsletter was found, so it is folded into option C.
- **Known gaps:** no audience size for any option (needs logged-in LinkedIn Campaign Manager and Google Keyword Planner); no hospital-leader-specific CPC; no click-through rate for any association email; whether LinkedIn *permanent* location targets a US state not stated outright; no Google minimum budget or Florida location help page fetched; 2027 rates for AONL, FONL and FHA not found; whether the consent bar counts as a "pop-up" under LinkedIn policy is my reading, unconfirmed.
- **Output files:** C:\Users\Gabriel\Downloads\ShiftPatch Repo\shiftpatch-launch-kit\docs\gtm\paid-options.md
