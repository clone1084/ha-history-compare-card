import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { HistoryCompareCardConfig, HistoryCompareSeriesConfig } from './types';
import { DEFAULT_SERIES } from './utils';

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
    label {
      display: grid;
      gap: 4px;
      font-size: 0.9rem;
    }
    input, select, button {
      font: inherit;
      padding: 8px;
    }
  `;

  public setConfig(config: HistoryCompareCardConfig): void {
    this._config = {
      type: 'custom:history-compare-card',
      entity: config.entity ?? '',
      title: config.title ?? 'History Compare',
      range: config.range ?? { hours: 24 },
      series: config.series ?? DEFAULT_SERIES.map((item) => ({
        name: item.name,
        color: item.color,
        offset: item.offset,
      })),
    };
  }

  protected render() {
    if (!this._config) {
      return html``;
    }

    const entities = Object.keys(this.hass?.states ?? {}).filter((entityId) => entityId.startsWith('sensor.') || entityId.startsWith('binary_sensor.') || entityId.startsWith('input_number.'));

    return html`
      <div class="grid">
        <label>
          Entity
          <select .value=${this._config.entity} @change=${this._onEntityChange}>
            <option value="">Select entity</option>
            ${entities.map((entityId) => html`<option value=${entityId}>${entityId}</option>`) }
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
        <label>
          Name
          <input .value=${series.name} @input=${(event: Event) => this._updateSeries(index, 'name', (event.target as HTMLInputElement).value)} />
        </label>
        <label>
          Color
          <input type="color" .value=${series.color ?? '#3f51b5'} @input=${(event: Event) => this._updateSeries(index, 'color', (event.target as HTMLInputElement).value)} />
        </label>
        <label>
          Offset hours
          <input type="number" .value=${String(series.offset_hours ?? series.offset?.hours ?? 0)} @input=${(event: Event) => this._updateSeriesOffset(index, 'hours', Number((event.target as HTMLInputElement).value))} />
        </label>
        <label>
          Offset days
          <input type="number" .value=${String(series.offset?.days ?? 0)} @input=${(event: Event) => this._updateSeriesOffset(index, 'days', Number((event.target as HTMLInputElement).value))} />
        </label>
        <label>
          Offset years
          <input type="number" .value=${String(series.offset?.years ?? 0)} @input=${(event: Event) => this._updateSeriesOffset(index, 'years', Number((event.target as HTMLInputElement).value))} />
        </label>
        <button type="button" @click=${() => this._removeSeries(index)}>Remove</button>
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
    const hours = Number((event.target as HTMLInputElement).value) || 24;
    this._emit({ range: { hours } });
  }

  private _addSeries() {
    const series = [...(this._config?.series ?? []), { name: 'Comparison', color: '#9c27b0', offset: { hours: 0, days: 0, years: 0 } }];
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
        [key]: value,
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
