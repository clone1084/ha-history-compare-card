# History Compare Card

A modern HACS-installable Lovelace card for Home Assistant that compares historical values for a single entity over aligned time windows, such as **now vs yesterday vs last year**.

## Features
- HACS-ready frontend card
- Historical comparisons on one chart
- Default comparison periods:
  - Now
  - Yesterday
  - Last Year
- Configurable additional comparison periods
- Visual Lovelace editor
- Data loaded from Home Assistant history API

## Installation with HACS
### Option 1: Custom repository
1. Open HACS in Home Assistant.
2. Go to **Frontend**.
3. Open the menu and choose **Custom repositories**.
4. Add this repository URL and select **Dashboard** as category.
5. Search for **History Compare Card** and install it.
6. Add the generated resource if HACS does not do it automatically:
   - URL: `/hacsfiles/ha-history-compare-card/history-compare-card.js`
   - Resource type: `module`

## Manual build
```bash
npm install
npm run build
npm test
```

The build output is generated in `dist/history-compare-card.js`.

## Example configuration
```yaml
type: custom:history-compare-card
entity: sensor.temperature
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
- The card requests entity history through Home Assistant frontend API calls.
- Additional comparison periods can be added with the visual editor.
