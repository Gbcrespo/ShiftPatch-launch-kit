# Reviewer B: prospects and outreach pre-submission review

**Summary**
1. All 5 picks have a real facility, correct city and matching CCN in CMS data, and a named person listed in the stated title on the employer's own page today; no one was found to have left. No Major findings.
2. The weak spot is problem evidence: all five cite a float-pool job posting (4 expired). That shows a pool exists, not short-notice gaps, and P17's posting is for a different hospital (Joe DiMaggio Children's). P12, P09 and P06 are not messaged.
3. Counts confirmed: 30 prospects, 20 outreach messages. P17 and P26 messages cite accurate, non-controversial facts and break no copy rule. FL nurse license check could not be run (interactive form).

## Header
- Date: 2026-11-21. All URL access dates below: 2026-11-21.
- Method: `python -I pick.py docs/research/prospects.csv` (script at `C:\Users\Gabriel\AppData\Local\Temp\claude\473d37250f4f2a2f\24a34609-1265-4e56-be88-dcc0a6f842ce\scratchpad\reviewer-b\pick.py`: reads ids with csv.DictReader, sorts, `random.seed(20261121)`, prints `sorted(random.sample(ids, 5))`).
- Seed 20261121. Output: `['P06', 'P09', 'P12', 'P17', 'P26']`.
- Overlap with the 18 Nov check (seed 20261118; P21, P27, P07, P11, P03): none.
- Skills and agents checked: repo-parent `.claude/skills` has captions-overlay, hyperframes, hyperframes-cli, media-use (video tools, none fit). Repo `.claude/skills` does not exist. `.claude/agents` has metrics-auditor and metrics-verifier (metrics audit, not prospects; none fit). None used.
- Read-only: confirmed. The only file written in the repo is this one. No ShiftPatch site, preview, /go/ or email link visited; no PostHog calls; nothing sent; .env/.dev.vars not opened; no contact details recorded.
- Totals: prospects.csv has 30 data rows (pass). outreach-messages.md has 20 numbered message entries (pass, matches brief).
- Of my 5, only P17 and P26 have outreach messages (picks list excludes P06, P09, P12).

## Per-prospect results
Legend: V verified, PV partly verified, U unverifiable, W wrong.

| id | name | (a) real / spelling | (b) current title | (c) facility, city, CCN | (d) URLs and evidence | (e) FL license | Outreach fact | Overall |
|---|---|---|---|---|---|---|---|---|
| P06 | Ana M. Cabrera, VP/CNO, Homestead Hospital | V: listed with DNP, ACNP-BC, NEA-BC, CCRN; spelling matches | PV: Baptist Health nursing-leaders page lists her as VP/CNO, Homestead Hospital. Page undated, but carries 2026 content (a January 2026 appointment of another leader) and 2026 copyright. No independent 2025-26 corroboration found. | V: CMS 100125 Homestead Hospital, Homestead FL, voluntary non-profit | Role URL resolves and supports. Evidence URL resolves: RN Float Pool posted 2026-04-17, closed 2026-06-16, sign-on up to $15,000, expired. Supports "a float pool is recruited for", not short-notice gaps; the bonus leans money. | Couldn't check (MQA is an interactive form) | No message | PV |
| P09 | Stacey Watkins, CNO, HCA Florida Lake Monroe | PV: name appears on the hospital page only; web search found no other mention | PV: hospital leadership page lists her as CNO; undated (2026 footer). Not corroborated elsewhere | V on CCN/city: CMS 100161 Sanford FL. CMS name is "Central Florida Lake Monroe Hospital", differing from the HCA Florida brand | Role URL resolves. Evidence URL resolves: RN Float Pool PRN, posted 2026-04-15, closed 2026-05-14, expired. Shows a pool exists only. | Couldn't check | No message | PV |
| P12 | Sheila Sanders, CNO, HCA Florida Oak Hill | PV: hospital page only (as "CNO", senior team); web search found no other mention | PV: page undated (2026 footer); not corroborated | V: CMS 100264 HCA Florida Oak Hill Hospital, Brooksville FL | Role URL resolves. Evidence URL resolves: RN Float Pool Med Surg PCU, posted 2026-08-13, closed 2026-10-15, expired. Pool exists only. | Couldn't check | No message | PV |
| P17 | Jonathan Fraginals, CNO, Memorial Hospital Pembroke | V: Coral Gables, DAISY and Memorial pages show a nurse of that name (Barry University BSN) | V: mhs.net leadership page lists him as CNO of Memorial Hospital Pembroke and says he assumed the role in July 2025. No later change found; Memorial's 25 Aug 2026 release on CEO moves does not mention him | V: CMS 100230 Memorial Hospital Pembroke, Pembroke Pines FL, government hospital district | Role URL resolves, supports. Evidence URL resolves: "JDCH: RN - Specialty II Float Pool", Hollywood FL, posted 2025-03-12, closed 2025-06-19, expired. This is a different hospital (Joe DiMaggio Children's) and 20 months old, so it does not show a problem at Pembroke (the row's own notes say so). | Couldn't check | Accurate (see below) | PV: person/role/facility verified; evidence weak |
| P26 | Michelle Farris, CNO, HCA Florida North Florida | V: HCA release and Becker's name her | V: leadership page lists her as CNO with CEO Gabe Bullaro and CFO Redd-Hachey; HCA newsroom (via search) announced her Aug 2024 for hospital, outpatient centers and four free-standing EDs. No later change found | V: CMS 100204 HCA Florida North Florida Hospital, Gainesville FL | Role URL resolves, supports. Evidence URL resolves: Float Pool Emergency Services RN, full time, posted 2026-09-17, "available before 2/10/2027", apply button live (appears open). Supports that a pool role is advertised, not short-notice gaps. Posting-id/date conflict (id suggests Oct 2025) remains. The direct HCA release URL fetched returned 404 (search shows it exists at a different path). | Couldn't check | Accurate (see below) | V for person; PV for evidence |

URLs used (all accessed 2026-11-21):
- CMS Hospital General Information API (data.cms.gov dataset xubh-q36u), facility_id filter 100125, 100161, 100264, 100230, 100204.
- P06: https://baptisthealth.net/healthcare-professionals/for-nurses/advances-in-nursing-practice/meet-our-nursing-leaders ; https://www.career.com/job/homestead-hospital/registered-nurse-float-pool-healthcare-provider/j202507250446409428891
- P09: https://hcafloridahealthcare.com/locations/lake-monroe-hospital/about-us/leadership ; https://www.career.com/job/hca-florida-lake-monroe-hospital/registered-nurse-float-pool-prn/j202307302146252884183
- P12: https://hcafloridahealthcare.com/locations/oak-hill-hospital/about-us/leadership ; https://www.career.com/job/hca-florida-oak-hill-hospital/rn-float-pool-med-surg-pcu/j202604091948570535415
- P17: https://www.mhs.net/medical-professionals/nursing/about-us/leadership ; https://career.com/job/memorial-healthcare-system/jdch-rn-specialty-ii-float-pool/j202503120412533662316 ; https://www.mhs.net/news/2026/08/memorial-healthcare-system-announces-leadership-promotions-at-two-hospitals
- P26: https://www.hcafloridahealthcare.com/locations/north-florida-hospital/about-us/leadership ; https://www.career.com/job/hca-florida-north-florida-hospital/registered-nurse-float-pool-emergency-services/j202510242045305670291 ; web search results pointing to https://www.hcafloridahealthcare.com/about-us/newsroom/north-florida-hospital-announces-michelle-farris-as-chief-nursing-officer (direct fetch 404; content taken from the search summary only)
- FL MQA lookup https://mqa-internet.doh.state.fl.us/MQASearchServices/HealthCareProviders : form needs interactive search; I could not submit it, so check (e) is "couldn't check" for P06, P09, P12, P17, P26 (all CNOs).
- Web searches (standard mode) for each of the 5 names plus title, 2026-11-21.

## Outreach check (check 4)
| id | Cited fact (docs/gtm/outreach-messages.md) | Source check | Result |
|---|---|---|---|
| P17 (lines 124-141) | "Memorial Healthcare System's nursing leadership page lists you as CNO of Memorial Hospital Pembroke." | The mhs.net page lists exactly that, and states July 2025 start. Current, accurate, specific to him. The message sensibly omits the start date and the JDCH posting. | Accurate. Thin fact (a title listing). Prospect row/message notes still say start date "unverified", which is now outdated: the page itself states it. |
| P26 (lines 279-294) | "HCA Florida North Florida advertises an Emergency Services float pool RN role." | Posting live, full time, posted 2026-09-17, apply button active. Accurate and current as of today; the date on the page conflicts with the URL id, and the message cites no date (correct). A posting is a hospital-level fact, not specific to Farris. | Accurate, hospital-specific rather than person-specific. |

Copy-rule check for both messages: neither leads with a labor dispute, names a nurse (only the addressee, first name) or criticizes the hospital. The idea is described conditionally and "nothing is built" is stated. Pass.

## Findings
| # | Finding | Evidence | Severity | Type |
|---|---|---|---|---|
| 1 | No pick failed on person, facility or CCN. A spot-check of these 5 would pass those parts. | CMS xubh-q36u (5 matches); role pages above | n/a (info) | brief requirement |
| 2 | P17's problem evidence is a float-pool posting at a different hospital (JDCH, Hollywood), posted Mar 2025, expired Jun 2025. It does not show a short-notice problem at Pembroke. | prospects.csv:18; career.com URL above | Minor | brief requirement |
| 3 | P06, P09, P12 evidence is an expired float-pool posting. It shows a pool exists, not short-notice shift gaps. P06's also centres on a $15,000 bonus. A strict checker could call "evidence of this problem" partial. | prospects.csv:7, 10, 13 | Minor | brief requirement |
| 4 | P26 evidence is a live float-pool posting, but also a pool role rather than a shift gap, and its page date (2026-09-17) conflicts with the URL id (Oct 2025). | prospects.csv:27 | Minor | brief requirement |
| 5 | P09, P12 (and P06) roles rest on undated hospital pages with no second source found. Not stale or contradicted, just uncorroborated. P06's page does carry 2026 content. | role URLs above | Minor | brief requirement |
| 6 | P09's CMS name is "Central Florida Lake Monroe Hospital", not the HCA Florida brand; CCN, city match. Already noted in the row. A checker searching by brand may hesitate. | CMS 100161; prospects.csv:10 | Nit | opinion |
| 7 | P17 notes and messages file say the July 2025 start date is unverified; the leadership page now states it. Row could be updated and confidence raised. | prospects.csv:18; outreach-messages.md:126 | Nit | opinion |
| 8 | P26 outreach_fact (CNO since Aug 2024) is "search snippet only" in the CSV; I confirmed via search that HCA announced it, though the direct release URL returned 404 on fetch. Citing the 2024 release URL would need a working link. | prospects.csv:27; outreach-messages.md:374 | Nit | opinion |
| 9 | Nurse license check (e) could not be done for any of the 5 CNOs: the MQA lookup needs an interactive form. Designli may check the license directly. | MQA URL above | Minor | brief requirement |
| 10 | Counts and copy rules: 30 prospects, 20 messages, P17 and P26 comply. | prospects.csv; outreach-messages.md | n/a (info) | brief requirement |

Count by severity: Major 0, Minor 5 (#2, #3, #4, #5, #9), Nit 3 (#6, #7, #8); 2 informational rows.
