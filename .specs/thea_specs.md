# THEA Specs

## Scope
Build a Home Assistant Lovelace card distributed through HACS that compares historical data for one entity over the same time window across multiple offsets.

## Functional requirements
- Card type: `custom:history-compare-card`
- Default range: 24 hours
- Default comparison series:
  - `Now` with zero offset
  - `Yesterday` with 1 day offset
  - `Last Year` with 1 year offset
- Data source: Home Assistant APIs
- Visualization: single combined comparison chart/grid suitable for quick comparison
- Config GUI:
  - select entity
  - configure range
  - add/remove/edit comparison periods
  - edit series name and color
- YAML configuration should support both:
  - `offset_hours`
  - structured `offset: { days, years, hours }`

## Non-functional requirements
- Modern HACS-compatible structure
- TypeScript implementation
- Easy install and simple configuration
- Tests for new functions and methods
- Documentation for HACS installation and usage
