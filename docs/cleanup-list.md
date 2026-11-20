# Cleanup list (D-032)

Person profiles proposed for deletion in step 8, phase 4.

**Owner decision (D-038, 2026-11-20): approved rows 1–10, 12, 15 and 16 (13 profiles). Rows 11, 13 and 14 are kept (D-025 provider tests).**

Rule (D-032): delete internal/test person profiles whose events are **all before the experiment start, 2026-11-19 17:48:18 UTC**. Keep the owner's main profile and every person with events after launch. Person IDs only, never emails. "Test address" means the profile's distinct ID is one of the owner's own test addresses; I checked this with a yes/no query, without reading the address.

Data: PostHog project 741778, read 2026-11-20 about 13:55 UTC. Event counts include every event on the profile.

## Proposed for deletion (16)

| # | Person ID | Label | Events | First event (UTC) | Last event (UTC) | Why it's test |
| :--- | :--- | :--- | ---: | :--- | :--- | :--- |
| 1 | `a49971c8-d8ef-5b5b-b4c9-3e613b6f0e99` | Local dev visit (step 4) | 6 | 2026-11-18 14:40:17 | 2026-11-18 14:40:29 | `$internal_or_test_user`; host localhost:8788 |
| 2 | `cfc11353-a83d-51a1-b149-86af48433596` | Local dev visit (step 4) | 8 | 2026-11-18 14:40:34 | 2026-11-18 14:40:36 | same |
| 3 | `ea9d77a3-460c-50af-9440-93948d7622f7` | Local dev visit (step 4) | 8 | 2026-11-18 14:40:36 | 2026-11-18 14:40:39 | same |
| 4 | `91a6ec08-4ffa-5d38-8cc2-c7fe648d9e94` | Local dev visit (step 4) | 8 | 2026-11-18 14:40:39 | 2026-11-18 14:40:41 | same |
| 5 | `c3e67dac-707f-59f5-a5cc-a3c3f1e28fec` | Local dev visit (step 4) | 8 | 2026-11-18 14:40:41 | 2026-11-18 14:40:44 | same |
| 6 | `c12f55f2-b6b2-5964-9342-3ba46c03dbfa` | Local dev visit (step 4) | 8 | 2026-11-18 14:40:44 | 2026-11-18 14:40:46 | same |
| 7 | `f17b2954-404b-558b-9444-53368b3a1a3b` | Local dev visit (step 4) | 10 | 2026-11-18 14:42:29 | 2026-11-18 14:45:18 | same |
| 8 | `d6433dda-e58e-5ffa-a191-ad9c655f838d` | Local dev visit (step 4) | 6 | 2026-11-18 14:47:06 | 2026-11-18 14:47:07 | same |
| 9 | `7f4c03a3-5977-5af6-9664-e12ea95caecc` | Local internal visit (step 4f) | 7 | 2026-11-18 15:46:41 | 2026-11-18 15:46:42 | `is_internal`; localhost:8788 |
| 10 | `16bbde04-ee73-5501-8b63-76cef6acb60e` | Local internal visit (step 4f) | 7 | 2026-11-18 15:47:30 | 2026-11-18 15:47:31 | `is_internal`; localhost:8788 |
| 11 | `4be90e83-f91c-5849-89ef-6908154069ef` | Owner's provider test (5d), email events only | 2 | 2026-11-19 12:55:21 | 2026-11-19 12:57:27 | test address (the Hotmail one D-025 kept) |
| 12 | `c153f8bf-bb48-5476-9fe1-c3ed3c37e0af` | Owner's test signup, live site (5d) | 29 | 2026-11-19 13:06:25 | 2026-11-19 13:27:42 | `is_internal`; test address; 1 pre-launch survey answer |
| 13 | `c943e25c-406e-5cd9-8a31-d6fa98237988` | Owner's 6a end-to-end run | 34 | 2026-11-19 17:27:22 | 2026-11-19 17:29:14 | test address; 1 pre-launch survey answer |
| 14 | `9f2be5af-bddc-5413-8cb0-889df34ff6a4` | Owner's 6a end-to-end run | 38 | 2026-11-19 17:29:52 | 2026-11-19 17:31:12 | test address; 1 pre-launch survey answer |
| 15 | `248e5e0f-a85a-524d-9a14-fa4bfdc0752c` | Owner's 6a run, email events only (decliner) | 3 | 2026-11-19 17:33:27 | 2026-11-19 17:33:43 | test address |
| 16 | `33b0ef3e-9953-5fa7-979e-24983acae740` | Owner's 6a run, email events only (decliner) | 3 | 2026-11-19 17:36:02 | 2026-11-19 17:39:58 | test address |

Total: 185 events. Every one is before 2026-11-19 17:48:18 UTC; none of these persons has an event after launch.

## Kept (not on the list)

| Person ID | Label | Why kept |
| :--- | :--- | :--- |
| `b7b21c2e-c1d0-525e-940c-6e060f49d1b8` | Owner, main profile | D-032: step 5 evidence; also has events after launch. Its one pre-launch survey answer stays (excluded by the launch date) |
| `f7f85f93-e73b-5c9e-9806-6ff644e50f47` | Friend 1, after Accept | Real visitor, after launch |
| `c6d3e84a-62e8-505e-8de9-c69f12931a3c` | Owner, step 8 test 0 (live, old code) | Events after launch (D-032 rule); internal, filtered out of every tile |
| `f29dc930-b2ed-5ba0-a7bf-855d6e069d3d` | Owner, step 8 test 1 (preview) | same |
| `9fceb1b9-7a19-5c7f-b704-eb71ab1928dd` | Owner, step 8 test 2 (preview) | same |
| `d1688f5f-3225-5f24-8dfe-a5a2c783f189` | Owner, step 8 test 3 (preview) | same |

**Can't be deleted (no person record, cookieless):**
- the 17 pre-launch survey answerers without a record (D-032: read the survey from launch)
- the unattributed visit `836fe88c…` (labeled, kept on purpose)
- the link-preview click `d4ce36f0…`
- the localhost clicks
- the preview-URL `$pageview` `476d4df1…`

## How the deletion would run

- **Delete the person with their events and recordings**, the same way as the 6d cleanup (D-025).
- **Only IDs the owner approves.**
- **Afterwards, re-run the auditor.**
  - Tile numbers must not move: every event on this list is before 18:00 UTC.
  - "Before launch" survey answers should drop by 3 answers and 3 persons (rows 12–14).
