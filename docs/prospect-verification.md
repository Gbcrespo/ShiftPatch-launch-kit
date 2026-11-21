# Prospect verification: all 30 prospects (2026-11-21)

ShiftPatch is a pre-launch concept. This file checks the 30 prospects in `docs/research/prospects.csv` the way the hiring panel will spot-check 5: against public hospital directories and nursing registries, plus whether each row's evidence of the problem is still live. The checks were read-only. The owner then approved fixes 1–5 below. Fixes 1–4 changed `prospects.csv` only (P07, P28, P29 and P30). Fix 5 (P10) changed `prospects.csv` and the fact sentence of P10's connection note.

## Method

- **Checkers 1–3 (Sonnet, in parallel):** P01–P10, P11–P20 and P21–P30. Four checks per row:
  1. **Directory:** the CCN in the CMS Provider Data Catalog, "Hospital General Information" (dataset `xubh-q36u`), public API.
  2. **Role:** a current public source shows the person in that role at that facility (2025–2026, or a current page).
  3. **Registry:** the FL DOH MQA license lookup for nurse roles.
  4. **Evidence:** the row's evidence URL still loads and still states the claim. A dead page with a Wayback copy counts as partial.
  - The checkers did not see the earlier spot-checks.
- **Verifier:** the planned Opus verifier was stopped before it finished, at the owner's call. A **targeted Sonnet re-check** covered the three fails (P28, P29, P30) and P07, which had a name conflict. Its notes are in the session scratchpad.
- **Checker 1's own file was not saved.** Its results for P01–P10 come from its final report to the session: counts, fails, partials and manual checks. The URLs below for those rows are the CSV's own.
- **Rules:** public, free sources only. No sign-in, no CAPTCHA bypass, nobody contacted. No license numbers, addresses or personal contact details were recorded. Some hosts failed DNS or returned 403 from this machine (www.smh.com, ache.org, adventhealth.com, career.com, careerbuilder.com, the Lee Health leadership page); those are "couldn't verify", not "gone".
- **Status rule:** a row's status is its worst check, ignoring the nursing registry. That's because the registry couldn't be automated for any row: the MQA lookup is an interactive form, and Nursys needs you to accept its terms and pass a CAPTCHA. "Manual" means a non-registry check is still open.

## Summary

| Status | Rows | Count |
|---|---|---|
| Pass | P01, P02, P05, P10, P11, P12, P13, P15, P16, P17, P18, P19, P20, P22, P24, P25, P26, P27 | 18 |
| Partial | P03, P07, P08, P14, P21, P23, P28, P30 | 8 |
| Manual (evidence page blocked from automated fetch) | P04, P06, P09 | 3 |
| Fail | P29 | 1 |

**Per check:**

| Check | Pass | Partial | Fail | Manual | N/A |
|---|---|---|---|---|---|
| Directory (CMS) | 29 | 1 (P30) | 0 | 0 | 0 |
| Role | 24 | 6 (P03, P07, P14, P23, P28, P29) | 0 | 0 | 0 |
| Registry (MQA / Nursys) | 0 | 0 | 0 | 22 | 8 |
| Evidence | 21 | 3 (P08, P21, P28) | 1 (P29) | 5 (P04, P06, P07, P09, P14) | 0 |

## One row per prospect

Checked 2026-11-21. Directory = CMS name, city and state match the CSV for that CCN. "Sys" means the CSV uses the health-system name and CMS uses the flagship hospital's name.

| ID | Facility (CSV) | Directory | Role | License | Evidence live | Status | URL(s) |
|---|---|---|---|---|---|---|---|
| P01 | HCA Florida Osceola Hospital, Kissimmee | pass | pass | manual | pass | pass | role: hcafloridahealthcare.com/locations/osceola-hospital/about-us/leadership · ev: orlandoweekly.com (Kissimmee nurses floating) |
| P02 | HCA Florida Fawcett Hospital, Port Charlotte | pass | pass | manual | pass | pass | role: hcafloridahealthcare.com/locations/fawcett-hospital/about-us/leadership · ev: nationalnursesunited.org press |
| P03 | HCA Florida Fort Walton-Destin Hospital | pass | partial: only July 2025 sources, role page 403 | manual | pass | partial | getthecoast.com (Everette named CNO) · weartv.com (union contract) |
| P04 | HCA Florida Highlands Hospital, Sebring | pass | pass | manual | manual (career.com blocked) | manual | hcafloridahealthcare.com newsroom · career.com/job/hca-florida-highlands-hospital/prn-day-surgery-rn/… |
| P05 | Jackson Health System, Miami | pass | pass | manual | pass | pass | nursing.jacksonhealth.org/about-us · miamitodaynews.com/?p=83181 |
| P06 | Homestead Hospital (Baptist Health South Florida) | pass | pass | manual | manual (career.com blocked) | manual | baptisthealth.net nursing leaders · career.com/job/homestead-hospital/registered-nurse-float-pool… |
| P07 | Manatee Memorial Hospital, Bradenton | pass | partial: conflict (see fixes) | manual | manual (careerbuilder 403) | partial | srqmagazine.com SRQ Daily 2025-08-11 · scf.edu/news/2025/10/08/… · careerbuilder.com/job-details/rn-registered-nurse-resource-pool-float… |
| P08 | Halifax Health, Daytona Beach | pass | pass | manual | partial: page 404, Wayback 2026-04-10 shows float pool and SeaPool but not "short-staffed" | partial | halifaxhealth.org/about-us/leadership/heidi-wright · halifaxhealth.org/float-and-seapool |
| P09 | HCA Florida Lake Monroe Hospital, Sanford | pass (CMS: "Central Florida Lake Monroe Hospital") | pass | manual | manual (career.com blocked) | manual | hcafloridahealthcare.com/locations/lake-monroe-hospital/… · career.com/job/hca-florida-lake-monroe-hospital/registered-nurse-float-pool-prn/… |
| P10 | HCA Florida Largo Hospital | pass | pass (leadership page live, confirmed by the owner 2026-11-21) | manual | pass (fix 5): WUSF 2025-01-17 names Largo as a slated demonstration site; the old posting is gone with no Wayback copy | pass | hcafloridahealthcare.com/locations/largo-hospital/… · wusf.org/health-news-florida/2025-01-17/florida-nurses-rally-for-improved-staffing… |
| P11 | HCA Florida Largo Hospital | pass | pass | N/A (CFO) | pass (expired, loads) | pass | hcafloridahealthcare.com/locations/largo-hospital/about-us/leadership · career.com (same Largo float-pool posting) |
| P12 | HCA Florida Oak Hill Hospital, Brooksville | pass | pass | manual | pass (expired, loads) | pass | hcafloridahealthcare.com/locations/oak-hill-hospital/… · career.com/job/hca-florida-oak-hill-hospital/rn-float-pool-med-surg-pcu/… |
| P13 | DeSoto Memorial Hospital, Arcadia | pass | pass (single source, 2025-10-17; possible sale or lease) | N/A (CEO) | pass | pass | wusf.org/health-news-florida/2025-10-17/desoto-memorial-weighs-offers… |
| P14 | Sarasota Memorial Health Care System | pass (sys) | partial: smh.com didn't resolve; search results only | manual (also try APRN) | manual (careerbuilder 403, no Wayback) | partial | smh.com/p.aspx?p=43 · careerbuilder.com/job-details/registered-nurse-float-nights-venice-fl… |
| P15 | NCH Healthcare System, Naples | pass (sys) | pass | manual | pass | pass | nchmd.org/about-us/officers-and-trustees · career.com/job/nch-and-careers/staffing-bed-control-specialist/… |
| P16 | NCH Healthcare System, Naples | pass (sys) | pass | manual | pass | pass | nchmd.org/about-us/officers-and-trustees · career.com/job/naples-comprehensive-health-nch/rn-tsp-pacu-pre-op-hss/… |
| P17 | Memorial Hospital Pembroke, Pembroke Pines | pass | pass (CNO since July 2025) | manual | pass, weak: a system posting at Joe DiMaggio, not Pembroke (the CSV says so) | pass | mhs.net/medical-professionals/nursing/about-us/leadership · career.com/job/memorial-healthcare-system/jdch-rn-specialty-ii-float-pool/… |
| P18 | Baptist Hospital, Pensacola | pass | pass (WEAR-TV, Nov 2026) | manual | pass | pass | weartv.com/news/local/pensacola-baptist-hospital-to-add-40-acute-care-beds… |
| P19 | Tampa General Hospital Crystal River | pass | pass | manual | pass (expired, loads) | pass | tgh.org/careers-at-tampa-general/nursing-at-tgh/nursing-leadership · simplyhired.com (Clinical Nurse Float Team) |
| P20 | Tampa General Hospital, Tampa | pass | pass | manual | pass (the CSV's Brooksville/Spring Hill clause isn't on the page; the message doesn't cite it) | pass | tgh.org/…/nursing-leadership · tgh.org/…/nurses-float-pool |
| P21 | Memorial Regional Hospital, Hollywood | pass | pass (release 2026-04-21) | N/A (CFO) | partial: posting is Joe DiMaggio's (CSV discloses) and expired | partial | jdch.com/news/2026/04/katherine-wong-named-cfo… · career.com/job/memorial-healthcare-system/jdch-rn-specialty-ii-float-pool/… |
| P22 | HCA Florida Sarasota Doctors Hospital | pass | pass (SRQ Daily 2026-06-15) | N/A (CFO) | pass (expired, loads) | pass | srqmagazine.com/srq-daily/2026-06-15/… · career.com/job/hca-florida-sarasota-doctors-hospital/medical-surgical-float-pool… |
| P23 | Sarasota Memorial Health Care System | pass (sys) | partial: smh.com didn't resolve; search results only | N/A (CFO) | pass (expired, loads) | partial | smh.com/p.aspx?p=224 · businessobserverfl.com/news/2025/feb/18/sarasota-memorial-new-cfo · career.com/job/sarasota-memorial-health-care-system/registered-nurse-float-night/… |
| P24 | HCA Florida Memorial Hospital, Jacksonville | pass | pass (newsroom 2026-07-27) | N/A (CFO) | pass (expired, loads) | pass | hcafloridahealthcare.com/about-us/newsroom/memorial-hospital-names-jordan-fulkerson… · career.com/job/hca-florida-memorial-hospital/travel-nurse-rn-cvor… |
| P25 | HCA Florida Englewood Hospital | pass | pass (newsroom 2025-10-27) | manual | pass (expired, loads) | pass | hcafloridahealthcare.com/locations/englewood-hospital/…/nicole-carr-named-chief-nursing-officer… · career.com/job/hca-florida-englewood-hospital/registered-nurse-rn-float-pool-prn/… |
| P26 | HCA Florida North Florida Hospital, Gainesville | pass | pass | manual | pass (open posting) | pass | hcafloridahealthcare.com/locations/north-florida-hospital/about-us/leadership · career.com/job/hca-florida-north-florida-hospital/registered-nurse-float-pool-emergency-services/… |
| P27 | HCA Florida North Florida Hospital, Gainesville | pass | pass | N/A (CFO) | pass | pass | as P26 |
| P28 | Lee Health (Lee Memorial Hospital), Fort Myers | pass (sys) | partial: role sources didn't open; search results only | manual | partial: posting returns 410; **Wayback copy 2026-07-20 states the claim** | partial | jobs.leehealth.org/job/20390/… (410) · web.archive.org/web/20260720125543/https://jobs.leehealth.org/job/20390/… |
| P29 | Lee Health (Lee Memorial Hospital), Fort Myers | pass (sys) | partial: ACHE bio didn't open and is undated; no current Lee Health source | N/A (MBA, FACHE) | **fail**: posting 404, no Wayback snapshot; 6 related SRC postings also gone | **fail** | jobs.leehealth.org/job/staffing-resource-data-specialist-…-65597-1 (404) · ache.org/people/Kristi-McMillan-Web |
| P30 | AdventHealth Apopka | partial: CMS has no Apopka facility; CCN 100007 is AdventHealth Orlando, which Apopka reports under (search-result evidence only) | pass (release 2025-07-23) | manual | pass | partial | data.cms.gov/provider-data/api/1/datastore/query/xubh-q36u/0 · centralfloridahealthnews.com/new-chief-nursing-officer-named-for-adventhealth-apopka |

## Fixes (owner-approved and applied to `prospects.csv` on 2026-11-21; no outreach message changed)

Ordered by risk: most likely to be picked and failed by the panel first.

1. **P29: evidence fail.** The posting is gone (404), with no archived copy, and no live page states the claim about forecasting and redeploying agency travelers.
   - `problem_evidence_date`: (empty) → `expired, archived copy unavailable (404 on 2026-11-21; no Wayback snapshot)`
   - `notes`: append `Live SRC context only: https://jobs.leehealth.org/job/21002/flexible-float-pool-rn-prn-days-nights-level-icu-pcu2-float-prn-nursing-us-fl-fort-myers/ (Department: Staffing Resource Center). The forecasting/agency-traveler claim has no live source. Checked 2026-11-21.`
   - Outreach: no change. The P29 message cites the ACHE bio, and the posting is already under "Facts not used". Keep its "check the role is current before sending" flag; the ACHE page returned a Cloudflare challenge today.
   - Alternative, if you'd rather not keep a row with expired evidence: replace P29. That needs a new verified prospect; I won't name one without a source.
2. **P30: directory partial.** CMS has no separate Apopka facility; searches by city, name and ZIP 32703 all return nothing.
   - `ccn`: keep `100007`.
   - `notes`: replace the last sentence with `CMS Hospital General Information has no Apopka facility (city APOPKA, name LIKE APOPKA and ZIP 32703 return 0, checked 2026-11-21); CCN 100007 = ADVENTHEALTH ORLANDO, Orlando FL, which the Apopka campus reports under (seen in AHD/Turquoise search results, not opened).`
   - Outreach: no change.
3. **P28: evidence partial.** The original returns 410, but the archived copy states the claim.
   - `problem_evidence_url`: → `https://web.archive.org/web/20260720125543/https://jobs.leehealth.org/job/20390/seasonal-high-demand-and-winter-float-pool-non-benefited-2026-2027-season-icu-ed-pcu-only-seasonal-nursing-us-fl-fort-myers/`
   - `problem_evidence_date`: → `2026/2027 season; archived copy 2026-07-20; original URL 410 as of 2026-11-21`
   - `notes`: append `Original posting returned 410 on 2026-11-21; archived copy quotes: "Join Lee Health's Staffing Resource Center (SRC) High Demand/Seasonal RN Program" and staff "will float to other acute care inpatient units within the Lee Health system". Live year-round equivalent: https://jobs.leehealth.org/job/21002/…`
   - Outreach: no change. The message cites the Feb 2026 Magnet release, not the posting.
4. **P07: role partial (conflict).** The CSV already names Judy Young, and the newest sources support her: SRQ Daily 2025-08-11, and State College of Florida 2025-10-08, which calls Manatee Memorial "her new CNO position". The hospital's own leadership page still lists Katy Wilkens (appointed Nov 2023) and looks stale. Its Wayback copy is from 2025-04-30, before Young.
   - `name`, `title`, `role_source_url`: no change.
   - `notes`: replace the "Wilkens/Young unresolved" sentence with `Hospital's own leadership page still lists Katy Wilkens (appointed Nov 2023) but looks stale: SRQ Daily 2025-08-11 names Judy Young CNO; State College of Florida 2025-10-08 (https://www.scf.edu/news/2025/10/08/leading-hospital-nursing-staff-practice-and-care/) calls Manatee Memorial her "new CNO position". No 2026 confirmation found. Checked 2026-11-21.`
   - Outreach: P07 has no message.
5. **P10: evidence replaced (applied 2026-11-21, owner-approved).** The role was confirmed live by the owner. The career.com float-pool posting is gone, with no Wayback copy.
   - `problem_evidence`, `problem_evidence_url`, `problem_evidence_date` now cite WUSF, 2025-01-17 (https://www.wusf.org/health-news-florida/2025-01-17/florida-nurses-rally-for-improved-staffing-health-insurance-and-ai-safeguards). The article says further demonstrations "were slated for" HCA Florida Largo Hospital, organized by National Nurses United; it doesn't say one took place there. `confidence` stays medium.
   - Outreach: only P10's connection note changed. The fact sentence now reads "WUSF listed HCA Florida Largo as a planned site of the January 2025 statewide nurse staffing demonstrations." It's placed after the intro, because CLAUDE.md says never lead with a labor dispute (297 characters). The float-pool question that follows was kept as it was.
6. **No change, listed for the record:**
   - P03 role: July 2025 sources only.
   - P08 evidence: the archived copy supports the float pool but not "short-staffed".
   - P14 and P23 role: smh.com didn't resolve.
   - P21 evidence: the posting is a sister hospital's, which the CSV already says.

No outreach message's cited fact was found to be false. P10's message cites a posting that couldn't be fetched automatically (see the manual checks).

## Manual-check list

**Nursing registry (22 rows).** Use https://mqa-internet.doh.state.fl.us/MQASearchServices/HealthCareProviders with Profession = Registered Nurse, then last name and first name. If a name isn't found, try Nursys QuickConfirm (https://www.nursys.com; you'll need to accept its terms and pass a CAPTCHA). Florida is in the Nurse Licensure Compact, so a multistate license from another state may not show in Florida's lookup. Record only: found, license type, active.

| Row | Search | Row | Search |
|---|---|---|---|
| P01 | Masongsong, JoAnne | P15 | Echevarria, Ilia |
| P02 | Hawk, Beth | P16 | Teegarden, Gina |
| P03 | Everette, Joseph | P17 | Fraginals, Jonathan |
| P04 | Oliveira, Anjelis | P18 | Jandora, Christie |
| P05 | Biggs, Carol | P19 | Holder, Marci |
| P06 | Cabrera, Ana | P20 | Mykoo, Yuri |
| P07 | Young, Judy | P25 | Carr, Nicole |
| P08 | Wright, Heidi | P26 | Farris, Michelle (several likely; match Gainesville) |
| P09 | Watkins, Stacey | P28 | Higgins, Jennifer |
| P10 | Conti, Diane | P30 | McCoy, Latonya |
| P12 | Sanders, Sheila | | |
| P14 | Lucas, Jean (also try Advanced Practice Registered Nurse) | | |

**Evidence and role pages blocked from automated fetch** (open in a browser):
- **P04, P06, P09:** the row's career.com posting. (P10's posting was replaced by fix 5.)
- **P07:** the CareerBuilder posting in the row, and the Manatee Memorial leadership page, which shows Wilkens or Young.
- **P14:** the CareerBuilder posting (look for "Ultimate Float Team"), and https://www.smh.com/p.aspx?p=43 (Jean Lucas).
- **P23:** https://www.smh.com/p.aspx?p=224 (Jen Rosati).
- **P28:** the Lee Health leadership page for Jennifer Higgins.
- **P29:** https://ache.org/people/Kristi-McMillan-Web (current role).

## Compared with the earlier spot-checks

The 18 Nov spot-check (P03, P07, P11, P21, P27) and this morning's review (P06, P09, P12, P17, P26) mostly agree with this pass:
- **Agreements:** directories and roles hold. The main weakness is evidence that rests on expired float-pool job postings. P17 and P21 cite a sister hospital (Joe DiMaggio). P07's Wilkens/Young conflict was already flagged on 18 Nov; it now has a 2025-10 source for Young, and the hospital's own page looks stale. The registry was a manual check in every pass.
- **One difference:** this morning's review found P06's and P09's postings expired but readable, whereas today's checker couldn't fetch them (job-site block). That's a tooling difference, not a change in the evidence.
