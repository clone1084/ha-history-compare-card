# ha-history-compare-card

Home Assistant History Compare Card.

## What it does
`history-compare-card` is a Lovelace custom card for Home Assistant that overlays the history of one entity across multiple aligned periods, for example **now**, **yesterday**, and **last year**, on the same chart.

It is designed to be easy to install with HACS and easy to configure through the Lovelace visual editor.

## Features
- HACS-compatible frontend card
- Modern TypeScript + Lit implementation
- Chart.js visualization with aligned hourly buckets
- Default comparison periods:
  - Now
  - Yesterday
  - Last Year
- Add, remove, and customize additional comparison periods
- Visual editor for entity, title, range, colors, and offsets
- Uses Home Assistant history API directly
- Refresh throttling to reduce unnecessary history reloads
- Tests for helper and alignment logic

## HACS installation
1. Open **HACS** in Home Assistant.
2. Open **Frontend**.
3. Open the top-right menu and choose **Custom repositories**.
4. Add this repository URL and choose **Dashboard** as the category.
5. Install **History Compare Card**.
6. Confirm the resource exists under **Settings → Dashboards → Resources**:
   - `/hacsfiles/ha-history-compare-card/history-compare-card.js`
   - type: `module`

## Local development
```bash
npm install
npm test
npm run build
```

Build output:
- `dist/history-compare-card.js`

## Example configuration
```yaml
type: custom:history-compare-card
entity: sensor.temperature
title: Temperature comparison
range:
  hours: 24
series:
  - name: Now
    offset_hours: 0
    color: "#00bcd4"
  - name: Yesterday
    offset:
      days: 1
    color: "#4caf50"
  - name: Last Year
    offset:
      years: 1
    color: "#ff9800"
```

## Notes
- Best suited for numeric entities such as temperature, humidity, energy, power, and similar sensors.
- Additional comparison periods can be configured from the visual editor.
- History values are normalized onto shared hour buckets so overlap is easier to read.
- The card is frontend-only and does not require a custom backend integration.

## Recommended next step before public release
Test the card in a real Home Assistant instance and create the first GitHub release tag, for example `v0.1.0`.
