# IMPLEMENTATION PLAN

## Goal
Create a modern HACS-installable Home Assistant Lovelace card named `history-compare-card` that compares historical data for a selected entity over the same window across multiple offsets.

## Source of truth
- `.specs/thea_specs.md`
- User requirements in chat

## Requirements
- HACS-compatible frontend card
- Easy installation through HACS
- Default comparison series:
  - Now (last 24 hours)
  - Yesterday (same 24h window, offset 1 day)
  - Last Year (same 24h window, offset 1 year)
- Fetch data from Home Assistant APIs
- Simple GUI editor to choose the entity and manage comparison periods
- Allow adding more comparison periods via GUI
- Include tests for new functions/methods

## Planned implementation
1. Initialize modern frontend card project structure
2. Add HACS metadata and release/install docs
3. Implement card rendering with Chart.js line chart
4. Implement Home Assistant history fetching via REST API
5. Normalize offset windows into aligned comparison series
6. Add Lovelace editor GUI for entity/range/series management
7. Add tests for date/window helpers and config handling
8. Update README with installation and usage
9. Mark this plan completed after successful implementation
10. Harden packaging, entity filtering, refresh behavior, and release readiness
11. Fix HACS manifest compatibility for Home Assistant version comparison

## Status
- [x] Repository inspected
- [x] README reviewed
- [x] Initial implementation plan created
- [x] Card implementation completed
- [x] Tests added
- [x] Documentation finalized
- [x] Plan updated on successful completion
- [x] Hardening pass completed
- [x] HACS manifest compatibility patched

## Conclusion
Initial HACS-ready release completed with:
- TypeScript + Lit frontend card
- Chart.js comparison visualization
- Home Assistant history API integration
- Visual editor for entity, range, colors and offsets
- Tests for helper and alignment logic
- README and HACS metadata ready for installation
- Hardening for packaging, throttled refresh, and numeric-entity filtering
- HACS manifest compatibility fix for Home Assistant version parsing
