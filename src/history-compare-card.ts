import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { ChartSeries, HistoryCompareCardConfig } from './types';
import { normalizeConfig, hoursBetween } from './utils';
import { buildChartSeries } from './history';
import './history-compare-card-editor';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

@customElement('history-compare-card')
export class HistoryCompareCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: Required<HistoryCompareCardConfig>;
  @state() private _loading = false;
  @state() private _error?: string;
  @state() private _series: ChartSeries[] = [];
  private _chart?: Chart;

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
    canvas {
      width: 100% !important;
      max-height: 360px;
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
    void this._load();
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
          <canvas id="chart"></canvas>
        </div>
      </ha-card>
    `;
  }

  protected updated(): void {
    if (this._series.length) {
      this._renderChart();
    }
  }

  private async _load(): Promise<void> {
    if (!this.hass || !this._config) {
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
    } catch (error) {
      this._error = error instanceof Error ? error.message : 'Unable to load history';
    } finally {
      this._loading = false;
    }
  }

  private _renderChart(): void {
    const canvas = this.renderRoot.querySelector('#chart') as HTMLCanvasElement | null;
    if (!canvas || !this._config) {
      return;
    }

    const labels = hoursBetween(new Date(0), new Date(this._config.range.hours * 60 * 60 * 1000)).map((value) => `${value}h`);

    this._chart?.destroy();
    this._chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: this._series.map((series) => ({
          label: series.name,
          data: labels.map((_, index) => {
            const point = series.points.find((item) => Math.round(item.x) === index);
            return point?.y ?? null;
          }),
          borderColor: series.color,
          backgroundColor: series.color,
          spanGaps: true,
          tension: 0.25,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: false },
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
