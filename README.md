# History Compare Card

A modern HACS-installable Lovelace card for Home Assistant that compares historical values for a single entity over aligned time windows, such as **now vs yesterday vs last year**.

## Features
- HACS-ready frontend Lovelace card
- Overlay comparison of multiple historical periods on one chart
- Default comparison periods:
  - Now
  - Yesterday
  - Last Year
- Configurable additional comparison periods
- Visual Lovelace editor for entity, range and offsets
- Data loaded from Home Assistant history API
- TypeScript codebase with tests for core helpers

## Installation with HACS
### Option 1: Custom repository
1. Open HACS in Home Assistant.
2. Go to **Frontend**.
3. Open the menu and choose **Custom repositories**.
4. Add this repository URL and select **Dashboard** as category.
5. Search for **History Compare Card** and install it.
6. Verify the resource exists in **Settings → Dashboards → Resources**:
   - URL: `/hacsfiles/ha-history-compare-card/history-compare-card.js`
   - Resource type: `module`

## Local development
```bash
npm install
npm test
npm run build
```

The production bundle is generated at `dist/history-compare-card.js`.

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
- Works best with numeric entities such as temperatures, power, humidity and similar sensors.
- Each comparison period is aligned onto the same hour buckets to make overlaps easy to read.
- Additional comparison periods can be added with the visual editor.
- The card uses the Home Assistant frontend API, so it does not require a separate backend component.
