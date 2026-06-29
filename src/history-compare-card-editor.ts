import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { HistoryCompareCardConfig, HistoryCompareSeriesConfig } from './types';
import {
  DEFAULT_SERIES_COLOR,
  DEFAULT_TITLE,
  createDefaultConfig,
  denormalizeSeries,
  getEntityOptions,
  normalizeSeriesConfig,
} from './utils';

@customElement('history-compare-card-editor')
export class HistoryCompareCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: HistoryCompareCardConfig;

  static styles = css`
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
  `;

  public setConfig(config: HistoryCompareCardConfig): void {
    const base = createDefaultConfig();
    this._config = {
      ...base,
      ...config,
      title: config.title ?? DEFAULT_TITLE,
      range: config.range ?? base.range,
      series: normalizeSeriesConfig(config.series).map(denormalizeSeries),
    };
  }

  protected render() {
    if (!this._config) {
      return html``;
    }

    const entities = getEntityOptions(this.hass?.states ?? {});

    return html`
      <div class="grid">
        <label>
          Entity
          <select .value=${this._config.entity} @change=${this._onEntityChange}>
            <option value="">Select entity</option>
            ${entities.map((entityId) => html`<option value=${entityId}>${entityId}</option>`)}
          </select>
        </label>

        <label>
          Title
          <input .value=${this._config.title ?? ''} @input=${this._onTitleChange} />
        </label>

        <label>
          Range hours
          <input type="number" min="1" .value=${String(this._config.range?.hours ?? 24)} @input=${this._onRangeChange} />
        </label>

        ${(this._config.series ?? []).map((series, index) => this._renderSeries(series, index))}

        <button type="button" @click=${this._addSeries}>Add comparison period</button>
      </div>
    `;
  }

  private _renderSeries(series: HistoryCompareSeriesConfig, index: number) {
    return html`
      <div class="series">
        <div class="series-header">
          <strong>Series ${index + 1}</strong>
          <button type="button" @click=${() => this._removeSeries(index)}>Remove</button>
        </div>
        <label>
          Name
          <input .value=${series.name} @input=${(event: Event) => this._updateSeries(index, 'name', (event.target as HTMLInputElement).value)} />
        </label>
        <label>
          Color
          <input type="color" .value=${series.color ?? DEFAULT_SERIES_COLOR} @input=${(event: Event) => this._updateSeries(index, 'color', (event.target as HTMLInputElement).value)} />
        </label>
        <label>
          Offset hours
          <input type="number" .value=${String(series.offset?.hours ?? series.offset_hours ?? 0)} @input=${(event: Event) => this._updateSeriesOffset(index, 'hours', Number((event.target as HTMLInputElement).value))} />
        </label>
        <label>
          Offset days
          <input type="number" .value=${String(series.offset?.days ?? 0)} @input=${(event: Event) => this._updateSeriesOffset(index, 'days', Number((event.target as HTMLInputElement).value))} />
        </label>
        <label>
          Offset years
          <input type="number" .value=${String(series.offset?.years ?? 0)} @input=${(event: Event) => this._updateSeriesOffset(index, 'years', Number((event.target as HTMLInputElement).value))} />
        </label>
      </div>
    `;
  }

  private _onEntityChange(event: Event) {
    this._emit({ entity: (event.target as HTMLSelectElement).value });
  }

  private _onTitleChange(event: Event) {
    this._emit({ title: (event.target as HTMLInputElement).value });
  }

  private _onRangeChange(event: Event) {
    const hours = Math.max(1, Number((event.target as HTMLInputElement).value) || 24);
    this._emit({ range: { hours } });
  }

  private _addSeries() {
    const series = [
      ...(this._config?.series ?? []),
      { name: 'Comparison', color: DEFAULT_SERIES_COLOR, offset: { hours: 0, days: 0, years: 0 } },
    ];
    this._emit({ series });
  }

  private _removeSeries(index: number) {
    const series = [...(this._config?.series ?? [])];
    series.splice(index, 1);
    this._emit({ series });
  }

  private _updateSeries(index: number, key: 'name' | 'color', value: string) {
    const series = [...(this._config?.series ?? [])];
    series[index] = { ...series[index], [key]: value };
    this._emit({ series });
  }

  private _updateSeriesOffset(index: number, key: 'hours' | 'days' | 'years', value: number) {
    const series = [...(this._config?.series ?? [])];
    series[index] = {
      ...series[index],
      offset: {
        hours: series[index].offset?.hours ?? series[index].offset_hours ?? 0,
        days: series[index].offset?.days ?? 0,
        years: series[index].offset?.years ?? 0,
        [key]: Number.isFinite(value) ? value : 0,
      },
      offset_hours: undefined,
    };
    this._emit({ series });
  }

  private _emit(changes: Partial<HistoryCompareCardConfig>) {
    this._config = {
      ...this._config!,
      ...changes,
    };

    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config },
    }));
  }
}
