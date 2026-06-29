import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { ChartSeries, HistoryCompareCardConfig } from './types';
import { normalizeConfig, buildHourBuckets, formatHourLabel } from './utils';
import { buildChartSeries } from './history';
import './history-compare-card-editor';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

const REFRESH_THROTTLE_MS = 5 * 60 * 1000;

@customElement('history-compare-card')
export class HistoryCompareCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: Required<HistoryCompareCardConfig>;
  @state() private _loading = false;
  @state() private _error?: string;
  @state() private _series: ChartSeries[] = [];
  private _chart?: Chart;
  private _lastLoadedAt = 0;
  private _refreshTimer?: number;

  static styles = css`
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
  `;

  public static async getConfigElement() {
    return document.createElement('history-compare-card-editor');
  }

  public static getStubConfig(): HistoryCompareCardConfig {
    return {
      type: 'custom:history-compare-card',
      entity: 'sensor.temperature',
    };
  }

  public setConfig(config: HistoryCompareCardConfig): void {
    if (!config.entity) {
      throw new Error('Entity is required');
    }

    this._config = normalizeConfig(config);
    this._lastLoadedAt = 0;
    void this._load(true);
  }

  public getCardSize(): number {
    return 4;
  }

  protected render() {
    if (!this._config) {
      return nothing;
    }

    return html`
      <ha-card header=${this._config.title}>
        <div class="wrapper">
          <div class="meta">Entity: ${this._config.entity} · Range: ${this._config.range.hours}h</div>
          ${this._loading ? html`<div class="status">Loading history…</div>` : nothing}
          ${this._error ? html`<div class="status">${this._error}</div>` : nothing}
          <div class="chart-shell">
            <canvas id="chart"></canvas>
          </div>
        </div>
      </ha-card>
    `;
  }

  protected firstUpdated(): void {
    this._scheduleRefresh();
  }

  protected updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('hass') && this._config) {
      void this._load(false);
    }

    if (this._series.length) {
      this._renderChart();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._chart?.destroy();
    if (this._refreshTimer) {
      window.clearInterval(this._refreshTimer);
      this._refreshTimer = undefined;
    }
  }

  private _scheduleRefresh(): void {
    if (this._refreshTimer) {
      window.clearInterval(this._refreshTimer);
    }

    this._refreshTimer = window.setInterval(() => {
      void this._load(true);
    }, REFRESH_THROTTLE_MS);
  }

  private async _load(force: boolean): Promise<void> {
    if (!this.hass || !this._config) {
      return;
    }

    const now = Date.now();
    if (!force && now - this._lastLoadedAt < REFRESH_THROTTLE_MS) {
      return;
    }

    this._loading = true;
    this._error = undefined;

    try {
      this._series = await buildChartSeries(
        this.hass,
        this._config.entity,
        this._config.range.hours,
        this._config.series,
      );
      this._lastLoadedAt = now;
    } catch (error) {
      this._error = error instanceof Error ? error.message : 'Unable to load history';
      this._series = [];
    } finally {
      this._loading = false;
    }
  }

  private _renderChart(): void {
    const canvas = this.renderRoot.querySelector('#chart') as HTMLCanvasElement | null;
    if (!canvas || !this._config) {
      return;
    }

    const labels = buildHourBuckets(this._config.range.hours).map((value) => formatHourLabel(value, this._config.range.hours));

    this._chart?.destroy();
    this._chart = new Chart(canvas, {
      type: 'line',
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
          tension: 0,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              title: (items) => items[0]?.label ?? '',
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'history-compare-card': HistoryCompareCard;
  }

  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'history-compare-card',
  name: 'History Compare Card',
  description: 'Compare an entity history over multiple periods',
});
