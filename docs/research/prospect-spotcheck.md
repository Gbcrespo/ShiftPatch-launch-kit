# Prospect spot-check (Agent 3, sonnet)

All access dates 2026-11-18. ShiftPatch is a pre-launch concept; nothing is built.

## Method
Seeded random pick of 5 of 27 rows, then five checks per row. Script: `C:\Users\Gabriel\AppData\Local\Temp\claude\473d37250f4f2a2f\7c048f14-2fb8-476f-b34a-a242e1e6777c\scratchpad\spotcheck_pick.py`

```python
import csv, random, sys
SEED = 20261118
with open(sys.argv[1], newline='', encoding='utf-8') as f:
    ids = sorted(r['id'] for r in csv.DictReader(f))
rng = random.Random(SEED)
print("seed", SEED)
print("picked", rng.sample(ids, 5))
```
Run: `python -I spotcheck_pick.py <prospects.csv>`. Output: `seed 20261118` / `picked ['P21', 'P27', 'P07', 'P11', 'P03']`.

## Summary table
| Row | 1 CMS/CCN | 2 Title current | 3 Problem evidence | 4 Outreach fact | 5 RN license |
|---|---|---|---|---|---|
| P03 Everette (CNO) | PASS | PARTIAL | PASS | PARTIAL | not reachable |
| P07 Young (CNO) | PASS | PASS | PARTIAL | PASS | not reachable |
| P11 Romig (CFO) | PASS | PASS | PASS | PASS | n/a |
| P21 Wong (CFO) | PASS | PASS | PARTIAL | PASS | n/a |
| P27 Redd-Hachey (CFO) | PASS | PASS | PASS | PASS | n/a |

## Per-row details
Check 1 for all rows used the CMS Hospital General Information API (xubh-q36u), facility_id filter, accessed 2026-11-18.

### P03 Joseph Everette, CNO, HCA Florida Fort Walton-Destin Hospital (CCN 100223)
1. PASS. CMS: 100223 = HCA FLORIDA FORT WALTON-DESTIN HOSPITAL, FORT WALTON BEACH, FL, Acute Care, Proprietary.
2. PARTIAL. role_source_url (getthecoast.com) returned 403 to me. Search summaries show the July 10, 2025 announcement (Becker's also 403). No 2026 source naming him and no HCA hospital page found. A search-result job posting listed a different "Chief Nurse Executive" (Erica Rossitto, undated, likely a division role). Current status not confirmed; nothing contradicts it.
3. PASS. https://weartv.com/news/local/fort-walton-destin-hospital-nurses-seek-union-contract-over-safety-and-staffing-concerns loads. Published Jan 14, 2026. Supports understaffing, unionizing in September, wanting an end to floating, and the hospital's "hopeful... fair and reasonable" statement. Date matches.
4. PARTIAL. Named CNO July 2025, born at hospital, ex-CNO Oviedo since May 2023, DNP from UCF: consistent across two search summaries (getthecoast, Becker's), but primary pages not openable.
5. Not reachable. The MQA page (https://mqa-internet.doh.state.fl.us/MQASearchServices/HealthCareProviders) is a form that needs submission; my fetch tool cannot submit it.

### P07 Judy Young, CNO, Manatee Memorial Hospital (CCN 100035)
1. PASS. CMS: MANATEE MEMORIAL HOSPITAL, BRADENTON, FL.
2. PASS. SRQ Daily 2025-08-11 (https://www.srqmagazine.com/srq-daily/2025-08-11/27444_Manatee-Memorial-Hospital-Names-Judy-Young-as-Chief-Nursing-Officer?share=1) names her CNO. Second source: SCF article 2025-10-08 (https://www.scf.edu/news/2025/10/08/leading-hospital-nursing-staff-practice-and-care/) calls her CNO at Manatee Memorial. Caveat: Manatee's leadership page (403 to me) reportedly still showed Katy Wilkens (per search snippet), and Lakewood Ranch's site listed Young earlier; both look out of date.
3. PARTIAL. The CareerBuilder URL returned 403; I could not open it. Title was seen only in search results by the original researcher. Unverified; the row's date field is "date seen". No archive checked.
4. PASS. SRQ confirms CNO at Lakewood Ranch Medical Center since 2014, 38+ years nursing, reports to CEO Andy Guz.
5. Not reachable (same form limit).

### P11 Glenn Romig, CFO, HCA Florida Largo Hospital (CCN 100248)
1. PASS. CMS: HCA FLORIDA LARGO HOSPITAL, LARGO, FL.
2. PASS. https://hcafloridahealthcare.com/locations/largo-hospital/about-us/leadership lists Glenn Romig as CFO. Page undated; single source.
3. PASS. https://www.career.com/job/hca-florida-largo-hospital/registered-nurse-float-pool-med-surg/j202604080858061808406 loads: "Registered Nurse Float Pool Med Surg", posted April 8, 2026, closing May 22, 2026, expired. Matches row. Weak signal for a CFO (a recruiting pattern).
4. PASS. Page lists CEO Sebastian Strom, COO J.R. Rehmann, CNO Diane Conti, CFO Romig.
5. n/a (CFO).

### P21 Katherine Wong, CFO, Memorial Regional / Joe DiMaggio Children's (CCN 100038)
1. PASS (with note). CMS: 100038 = MEMORIAL REGIONAL HOSPITAL, HOLLYWOOD, FL. The CCN covers only the Memorial Regional half of the organization name; JDCH was not checked as a separate CCN.
2. PASS. https://www.jdch.com/news/2026/04/katherine-wong-named-cfo-for-memorial-regional-and-joe-dimaggio-childrens-hospitals, dated April 21, 2026. No second source sought.
3. PARTIAL. https://career.com/job/memorial-healthcare-system/jdch-rn-specialty-ii-float-pool/j202503120412533662316 loads: posted March 12, 2025, closed June 19, 2025 (expired); critical care units; "work throughout the South Broward Hospital District". But it shows Full Time, Nights, not "per diem" as the row says. The posting is also over a year old.
4. PASS. Named CFO April 21, 2026 (previously CFO of Memorial Hospital West); $670M expansion with a 150-bed tower.
5. n/a.

### P27 Kristy Redd-Hachey, CFO, HCA Florida North Florida Hospital (CCN 100204)
1. PASS. CMS: HCA FLORIDA NORTH FLORIDA HOSPITAL, GAINESVILLE, FL.
2. PASS. https://www.hcafloridahealthcare.com/locations/north-florida-hospital/about-us/leadership lists her as CFO (CEO Gabe Bullaro, COO Mark Amox, CNO Michelle Farris). Undated; single source.
3. PASS. https://www.career.com/job/hca-florida-north-florida-hospital/registered-nurse-float-pool-emergency-services/j202510242045305670291 loads: full-time, posted 9/17/2026, available before 2/10/2027. Matches.
4. PASS. CFO with CEO Gabe Bullaro confirmed.
5. n/a.

## Overall verdict
Data quality is good. All 5 CCNs and facility names/cities match CMS. 4 of 5 titles are confirmed on current sources and none is contradicted. No fabricated facts found, and no FAILs. Weak points: two evidence items (P07 unopened; P21 "per diem" wrong and the posting is 20 months old) and P03's unconfirmed current status. The RN license check could not be run with my tools.

## Rows to fix
- P03: current role unverified (only July 2025 sources; both primary pages 403 to automated fetch). Re-check in a browser or on the hospital site. Outreach fact rests on search summaries.
- P07: problem_evidence_url returned 403; confirm the posting opens in a browser or replace it. Date field is "date seen", not a posting date.
- P21: row says "per diem" but the posting shows full-time nights; fix wording. The posting expired 2025-06-19. Organization name pairs two hospitals but the CCN covers only Memorial Regional.
- P11, P27: no fix; note evidence is a generic pool-recruiting signal and the leadership pages are undated.
- P03, P07: RN license lookup still to be done manually at the MQA site.

## Log
- agent: Agent 3 (spot-check)
- model: sonnet
- start: 2026-11-18 15:19:59 (date -u); end: about 15:35 same day (approximate; not re-read from the clock)
- task: independent spot-check of 5 random rows of prospects.csv
- method: seeded pick (above); CMS API lookups; WebFetch of role and evidence URLs; WebSearch for second sources; MQA form page inspected
- search queries: "Joseph Everette Chief Nursing Officer HCA Florida Fort Walton-Destin Hospital"; "Judy Young Chief Nursing Officer Manatee Memorial Hospital"; "\"Everette\" CNO \"Fort Walton-Destin\" nurses 2026"
- sources: CMS API https://data.cms.gov/provider-data/api/1/datastore/query/xubh-q36u/0 (5 CCNs); URLs listed per row; https://www.manateememorial.com/about-us/leadership (403); https://hcafloridahealthcare.com/locations/fort-walton-destin-hospital/about-us/leadership (404); https://manateememorial.com/about/hospital-leadership-and-board-of-governors (403); https://www.beckershospitalreview.com/hospital-executive-moves/florida-interim-ceo-returns-to-hca-hospital-as-cno (403); MQA form page
- kept/dropped: no rows dropped (verification only); items marked PARTIAL where primary pages were blocked
- known gaps: no license verification; several 403 pages; no second source for the CFO titles beyond official pages; Wilkens/Young conflict at Manatee unresolved on the hospital's own page
- output file: C:\Users\Gabriel\Downloads\ShiftPatch Repo\shiftpatch-launch-kit\docs\research\prospect-spotcheck.md

## Main-session follow-up (2026-11-18)

No row failed, so no row was replaced. The fixes:
- **P21:** corrected. The evidence sentence said "per diem", but the posting is full-time nights. The main session re-opened https://career.com/job/memorial-healthcare-system/jdch-rn-specialty-ii-float-pool/j202503120412533662316 on 2026-11-18: "JDCH: RN - Specialty II Float Pool", Full Time, Shift: Nights, posted 3/12/2025, closed 6/19/2025. Confidence lowered from high to medium, because the evidence is for the children's hospital, not Memorial Regional's own CCN, and has expired.
- **P03, P07:** kept at medium. The partial findings are added to their notes, with "confirm before outreach".
- **RN license (P03, P07):** still to do. The FL DOH MQA lookup is a form the agents' tools can't submit. It's on the owner's manual check list.
