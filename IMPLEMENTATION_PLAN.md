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

## Status
- [x] Repository inspected
- [x] README reviewed
- [x] Initial implementation plan created
- [ ] Card implementation completed
- [ ] Tests added
- [ ] Documentation finalized
- [ ] Plan updated on successful completion
