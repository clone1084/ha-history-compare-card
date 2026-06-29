var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { i as i2, x, T as T3, s as s3, n as nothing, e as e2 } from "./lit-element.js";
import { e as e3 } from "./decorators.js";
import { C as Chart, a as LineController, L as LineElement, P as PointElement, b as LinearScale, c as CategoryScale, T as Tooltip, d as Legend, F as Filler } from "./chart.js";
var DEFAULT_SERIES = [
  { name: "Now", color: "#00bcd4", offset: { hours: 0, days: 0, years: 0 } },
  { name: "Yesterday", color: "#4caf50", offset: { hours: 0, days: 1, years: 0 } },
  { name: "Last Year", color: "#ff9800", offset: { hours: 0, days: 0, years: 1 } }
];
var DEFAULT_RANGE_HOURS = 24;
var DEFAULT_TITLE = "History Compare";
var DEFAULT_SERIES_COLOR = "#3f51b5";
function normalizeOffset(offset, offsetHours) {
  return {
    hours: offsetHours ?? (offset == null ? void 0 : offset.hours) ?? 0,
    days: (offset == null ? void 0 : offset.days) ?? 0,
    years: (offset == null ? void 0 : offset.years) ?? 0
  };
}
function denormalizeSeries(series) {
  return {
    name: series.name,
    color: series.color,
    offset: { ...series.offset }
  };
}
function normalizeSeriesConfig(series) {
  return ((series == null ? void 0 : series.length) ? series : DEFAULT_SERIES).map((item) => ({
    name: item.name,
    color: item.color ?? DEFAULT_SERIES_COLOR,
    offset: normalizeOffset(item.offset, item.offset_hours)
  }));
}
function normalizeConfig(config) {
  const range = { hours: Math.max(1, Number(((_a = config.range) == null ? void 0 : _a.hours) ?? DEFAULT_RANGE_HOURS)) };
  var _a;
  return {
    type: config.type,
    entity: config.entity,
    title: (config.title == null ? void 0 : config.title.trim()) || DEFAULT_TITLE,
    range,
    series: normalizeSeriesConfig(config.series)
  };
}
function createDefaultConfig() {
  return {
    type: "custom:history-compare-card",
    entity: "",
    title: DEFAULT_TITLE,
    range: { hours: DEFAULT_RANGE_HOURS },
    series: DEFAULT_SERIES.map((item) => ({ ...item, offset: { ...item.offset } }))
  };
}
function subtractOffset(date, offset) {
  const next = new Date(date);
  if (offset.years) {
    next.setFullYear(next.getFullYear() - offset.years);
  }
  if (offset.days) {
    next.setDate(next.getDate() - offset.days);
  }
  if (offset.hours) {
    next.setHours(next.getHours() - offset.hours);
  }
  return next;
}
function buildHourBuckets(rangeHours) {
  const normalized = Math.max(1, Math.round(rangeHours));
  return Array.from({ length: normalized + 1 }, (_, index) => index);
}
function formatHourLabel(hour, totalHours) {
  if (totalHours <= 24) {
    return `${hour}h`;
  }
  const day = Math.floor(hour / 24);
  const hourOfDay = hour % 24;
  return `D${day} ${hourOfDay}h`;
}
function getEntityOptions(states) {
  return Object.entries(states).filter(([entityId, state]) => {
    var _a, _b;
    const domain = entityId.split(".")[0];
    const unitOfMeasurement = (_a = state.attributes) == null ? void 0 : _a.unit_of_measurement;
    const stateClass = (_b = state.attributes) == null ? void 0 : _b.state_class;
    const supportedDomains = ["sensor", "input_number", "number"];
    return supportedDomains.includes(domain) || typeof unitOfMeasurement === "string" || typeof stateClass === "string";
  }).map(([entityId]) => entityId).sort((left, right) => left.localeCompare(right));
}
async function fetchHistory(hass, entityId, start, end) {
  const startTime = encodeURIComponent(start.toISOString());
  const endTime = encodeURIComponent(end.toISOString());
  const path = `history/period/${startTime}?filter_entity_id=${encodeURIComponent(entityId)}&end_time=${endTime}&minimal_response`;
  const response = await hass.callApi("GET", path);
  const series = Array.isArray(response) ? response[0] : [];
  return Array.isArray(series) ? series : [];
}
function toNumericHistoryPoints(raw, start) {
  return raw.map((point) => ({
    x: (new Date(point.last_changed).getTime() - start.getTime()) / (60 * 60 * 1e3),
    y: Number.isFinite(Number(point.state)) ? Number(point.state) : null
  })).filter((point) => point.x >= 0).sort((left, right) => left.x - right.x);
}
function buildAlignedDataset(points, rangeHours) {
  const buckets = buildHourBuckets(rangeHours);
  let cursor = 0;
  let latestValue = null;
  return buckets.map((bucket) => {
    while (cursor < points.length && points[cursor].x <= bucket) {
      latestValue = points[cursor].y;
      cursor += 1;
    }
    return {
      x: bucket,
      y: latestValue
    };
  });
}
async function buildChartSeries(hass, entityId, rangeHours, seriesConfigs) {
  const now = /* @__PURE__ */ new Date();
  const baseEnd = now;
  const baseStart = new Date(now.getTime() - rangeHours * 60 * 60 * 1e3);
  return Promise.all(
    seriesConfigs.map(async (config) => {
      const start = subtractOffset(baseStart, config.offset);
      const end = subtractOffset(baseEnd, config.offset);
      const raw = await fetchHistory(hass, entityId, start, end);
      const numeric = toNumericHistoryPoints(raw, start);
      const points = buildAlignedDataset(numeric, rangeHours);
      return {
        name: config.name,
        color: config.color,
        points
      };
    })
  );
}
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);
var REFRESH_THROTTLE_MS = 5 * 60 * 1e3;
let HistoryCompareCardEditor = class extends i2 {
  constructor() {
    super(...arguments);
    __publicField(this, "hass");
    __publicField(this, "_config");
  }
  setConfig(config) {
    const base = createDefaultConfig();
    this._config = {
      ...base,
      ...config,
      title: config.title ?? DEFAULT_TITLE,
      range: config.range ?? base.range,
      series: normalizeSeriesConfig(config.series).map(denormalizeSeries)
    };
  }
  render() {
    if (!this._config) {
      return x``;
    }
    const entities = getEntityOptions((this.hass == null ? void 0 : this.hass.states) ?? {});
    return x`
      <div class="grid">
        <label>
          Entity
          <select .value=${this._config.entity} @change=${this._onEntityChange}>
            <option value="">Select entity</option>
            ${entities.map((entityId) => x`<option value=${entityId}>${entityId}</option>`)}
          </select>
        </label>

        <label>
          Title
          <input .value=${this._config.title ?? ""} @input=${this._onTitleChange} />
        </label>

        <label>
          Range hours
          <input type="number" min="1" .value=${String(((_a = this._config.range) == null ? void 0 : _a.hours) ?? 24)} @input=${this._onRangeChange} />
        </label>

        ${((_b = this._config.series) ?? []).map((series, index) => this._renderSeries(series, index))}

        <button type="button" @click=${this._addSeries}>Add comparison period</button>
      </div>
    `;
    var _a, _b;
  }
  _renderSeries(series, index) {
    return x`
      <div class="series">
        <div class="series-header">
          <strong>Series ${index + 1}</strong>
          <button type="button" @click=${() => this._removeSeries(index)}>Remove</button>
        </div>
        <label>
          Name
          <input .value=${series.name} @input=${(event) => this._updateSeries(index, "name", event.target.value)} />
        </label>
        <label>
          Color
          <input type="color" .value=${series.color ?? DEFAULT_SERIES_COLOR} @input=${(event) => this._updateSeries(index, "color", event.target.value)} />
        </label>
        <label>
          Offset hours
          <input type="number" .value=${String(((_a = series.offset) == null ? void 0 : _a.hours) ?? series.offset_hours ?? 0)} @input=${(event) => this._updateSeriesOffset(index, "hours", Number(event.target.value))} />
        </label>
        <label>
          Offset days
          <input type="number" .value=${String(((_b = series.offset) == null ? void 0 : _b.days) ?? 0)} @input=${(event) => this._updateSeriesOffset(index, "days", Number(event.target.value))} />
        </label>
        <label>
          Offset years
          <input type="number" .value=${String(((_c = series.offset) == null ? void 0 : _c.years) ?? 0)} @input=${(event) => this._updateSeriesOffset(index, "years", Number(event.target.value))} />
        </label>
      </div>
    `;
    var _a, _b, _c;
  }
  _onEntityChange(event) {
    this._emit({ entity: event.target.value });
  }
  _onTitleChange(event) {
    this._emit({ title: event.target.value });
  }
  _onRangeChange(event) {
    const hours = Math.max(1, Number(event.target.value) || 24);
    this._emit({ range: { hours } });
  }
  _addSeries() {
    const series = [
      ...this._config?.series ?? [],
      { name: "Comparison", color: DEFAULT_SERIES_COLOR, offset: { hours: 0, days: 0, years: 0 } }
    ];
    this._emit({ series });
  }
  _removeSeries(index) {
    const series = [...this._config?.series ?? []];
    series.splice(index, 1);
    this._emit({ series });
  }
  _updateSeries(index, key, value) {
    const series = [...this._config?.series ?? []];
    series[index] = { ...series[index], [key]: value };
    this._emit({ series });
  }
  _updateSeriesOffset(index, key, value) {
    var _a, _b, _c;
    const series = [...this._config?.series ?? []];
    series[index] = {
      ...series[index],
      offset: {
        hours: ((_a = series[index].offset) == null ? void 0 : _a.hours) ?? series[index].offset_hours ?? 0,
        days: ((_b = series[index].offset) == null ? void 0 : _b.days) ?? 0,
        years: ((_c = series[index].offset) == null ? void 0 : _c.years) ?? 0,
        [key]: Number.isFinite(value) ? value : 0
      },
      offset_hours: void 0
    };
    this._emit({ series });
  }
  _emit(changes) {
    this._config = {
      ...this._config,
      ...changes
    };
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: this._config }
    }));
  }
};
__publicField(HistoryCompareCardEditor, "styles", s3`
    .grid {
      display: grid;
      gap: 12px;
    }
    .series {
      border: 1px solid var(--divider-color);
      padding: 12px;
      border-radius: 8px;
      display: grid;
      gap: 8px;
    }
    .series-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    label {
      display: grid;
      gap: 4px;
      font-size: 0.9rem;
    }
    input, select, button {
      font: inherit;
      padding: 8px;
    }
    button {
      cursor: pointer;
    }
  `);
__decorateClass([
  e3({ attribute: false })
], HistoryCompareCardEditor.prototype, "hass", 2);
__decorateClass([
  T3()
], HistoryCompareCardEditor.prototype, "_config", 2);
HistoryCompareCardEditor = __decorateClass([
  e2("history-compare-card-editor")
], HistoryCompareCardEditor);
let HistoryCompareCard = class extends i2 {
  constructor() {
    super(...arguments);
    __publicField(this, "hass");
    __publicField(this, "_config");
    __publicField(this, "_loading", false);
    __publicField(this, "_error");
    __publicField(this, "_series", []);
    __publicField(this, "_chart");
    __publicField(this, "_lastLoadedAt", 0);
    __publicField(this, "_refreshTimer");
  }
  static async getConfigElement() {
    return document.createElement("history-compare-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:history-compare-card",
      entity: "sensor.temperature"
    };
  }
  setConfig(config) {
    if (!config.entity) {
      throw new Error("Entity is required");
    }
    this._config = normalizeConfig(config);
    this._lastLoadedAt = 0;
    void this._load(true);
  }
  getCardSize() {
    return 4;
  }
  render() {
    if (!this._config) {
      return nothing;
    }
    return x`
      <ha-card header=${this._config.title}>
        <div class="wrapper">
          <div class="meta">Entity: ${this._config.entity} · Range: ${this._config.range.hours}h</div>
          ${this._loading ? x`<div class="status">Loading history…</div>` : nothing}
          ${this._error ? x`<div class="status">${this._error}</div>` : nothing}
          <div class="chart-shell">
            <canvas id="chart"></canvas>
          </div>
        </div>
      </ha-card>
    `;
  }
  firstUpdated() {
    this._scheduleRefresh();
  }
  updated(changedProperties) {
    if (changedProperties.has("hass") && this._config) {
      void this._load(false);
    }
    if (this._series.length) {
      this._renderChart();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._chart?.destroy();
    if (this._refreshTimer) {
      window.clearInterval(this._refreshTimer);
      this._refreshTimer = void 0;
    }
  }
  _scheduleRefresh() {
    if (this._refreshTimer) {
      window.clearInterval(this._refreshTimer);
    }
    this._refreshTimer = window.setInterval(() => {
      void this._load(true);
    }, REFRESH_THROTTLE_MS);
  }
  async _load(force) {
    if (!this.hass || !this._config) {
      return;
    }
    const now = Date.now();
    if (!force && now - this._lastLoadedAt < REFRESH_THROTTLE_MS) {
      return;
    }
    this._loading = true;
    this._error = void 0;
    try {
      this._series = await buildChartSeries(
        this.hass,
        this._config.entity,
        this._config.range.hours,
        this._config.series
      );
      this._lastLoadedAt = now;
    } catch (error) {
      this._error = error instanceof Error ? error.message : "Unable to load history";
      this._series = [];
    } finally {
      this._loading = false;
    }
  }
  _renderChart() {
    const canvas = this.renderRoot.querySelector("#chart");
    if (!canvas || !this._config) {
      return;
    }
    const labels = buildHourBuckets(this._config.range.hours).map((value) => formatHourLabel(value, this._config.range.hours));
    this._chart?.destroy();
    this._chart = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: this._series.map((series) => ({
          label: series.name,
          data: series.points.map((point) => point.y),
          borderColor: series.color,
          backgroundColor: `${series.color}33`,
          pointRadius: 0,
          pointHoverRadius: 4,
          borderWidth: 2,
          spanGaps: true,
          fill: false,
          stepped: true,
          tension: 0
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false
        },
        plugins: {
          legend: {
            position: "bottom"
          },
          tooltip: {
            callbacks: {
              title: (items) => items[0]?.label ?? ""
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
};
__publicField(HistoryCompareCard, "styles", s3`
    ha-card {
      display: block;
      padding: 16px;
    }
    .wrapper {
      display: grid;
      gap: 16px;
    }
    .meta {
      color: var(--secondary-text-color);
      font-size: 0.9rem;
    }
    .status {
      padding: 12px;
      border-radius: 8px;
      background: var(--secondary-background-color);
    }
    .chart-shell {
      position: relative;
      min-height: 360px;
    }
    canvas {
      width: 100% !important;
      height: 360px !important;
    }
  `);
__decorateClass([
  e3({ attribute: false })
], HistoryCompareCard.prototype, "hass", 2);
__decorateClass([
  T3()
], HistoryCompareCard.prototype, "_config", 2);
__decorateClass([
  T3()
], HistoryCompareCard.prototype, "_loading", 2);
__decorateClass([
  T3()
], HistoryCompareCard.prototype, "_error", 2);
__decorateClass([
  T3()
], HistoryCompareCard.prototype, "_series", 2);
HistoryCompareCard = __decorateClass([
  e2("history-compare-card")
], HistoryCompareCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "history-compare-card",
  name: "History Compare Card",
  description: "Compare an entity history over multiple periods"
});
