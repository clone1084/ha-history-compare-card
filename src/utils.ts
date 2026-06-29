import type { HistoryCompareCardConfig, HistoryCompareOffset, HistoryCompareSeriesConfig, NormalizedSeriesConfig } from './types';

export const DEFAULT_SERIES: NormalizedSeriesConfig[] = [
  { name: 'Now', color: '#00bcd4', offset: { hours: 0, days: 0, years: 0 } },
  { name: 'Yesterday', color: '#4caf50', offset: { hours: 0, days: 1, years: 0 } },
  { name: 'Last Year', color: '#ff9800', offset: { hours: 0, days: 0, years: 1 } },
];

export const DEFAULT_RANGE_HOURS = 24;
export const DEFAULT_TITLE = 'History Compare';
export const DEFAULT_SERIES_COLOR = '#3f51b5';
export const DEFAULT_AGGREGATION_MINUTES = 60;
export const VALID_AGGREGATION_MINUTES = [5, 10, 15, 30, 60] as const;
export type AggregationMinutes = (typeof VALID_AGGREGATION_MINUTES)[number];

export function normalizeAggregationMinutes(value?: number): AggregationMinutes {
  const found = VALID_AGGREGATION_MINUTES.find((v) => v === value);
  return found ?? DEFAULT_AGGREGATION_MINUTES;
}

export function normalizeOffset(offset?: HistoryCompareOffset, offsetHours?: number): Required<HistoryCompareOffset> {
  return {
    hours: offsetHours ?? offset?.hours ?? 0,
    days: offset?.days ?? 0,
    years: offset?.years ?? 0,
  };
}

export function denormalizeSeries(series: NormalizedSeriesConfig): HistoryCompareSeriesConfig {
  return {
    name: series.name,
    color: series.color,
    offset: { ...series.offset },
  };
}

export function normalizeSeriesConfig(series?: HistoryCompareSeriesConfig[]): NormalizedSeriesConfig[] {
  return (series?.length ? series : DEFAULT_SERIES).map((item) => ({
    name: item.name,
    color: item.color ?? DEFAULT_SERIES_COLOR,
    offset: normalizeOffset(item.offset, item.offset_hours),
  }));
}

export function normalizeConfig(config: HistoryCompareCardConfig): Required<HistoryCompareCardConfig> {
  const range = { hours: Math.max(1, Number(config.range?.hours ?? DEFAULT_RANGE_HOURS)) };

  return {
    type: config.type,
    entity: config.entity,
    title: config.title?.trim() || DEFAULT_TITLE,
    range,
    aggregation_minutes: normalizeAggregationMinutes(config.aggregation_minutes),
    series: normalizeSeriesConfig(config.series),
  };
}

export function createDefaultConfig(): Required<HistoryCompareCardConfig> {
  return {
    type: 'custom:history-compare-card',
    entity: '',
    title: DEFAULT_TITLE,
    range: { hours: DEFAULT_RANGE_HOURS },
    aggregation_minutes: DEFAULT_AGGREGATION_MINUTES,
    series: DEFAULT_SERIES.map((item) => ({ ...item, offset: { ...item.offset } })),
  };
}

export function subtractOffset(date: Date, offset: Required<HistoryCompareOffset>): Date {
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

export function buildTimeBuckets(rangeHours: number, aggregationMinutes: number): number[] {
  const normalizedHours = Math.max(1, Math.round(rangeHours));
  const stepHours = aggregationMinutes / 60;
  const totalBuckets = Math.round(normalizedHours / stepHours);
  return Array.from({ length: totalBuckets + 1 }, (_, i) => i * stepHours);
}

export function buildHourBuckets(rangeHours: number): number[] {
  return buildTimeBuckets(rangeHours, 60);
}

export function formatHourLabel(hour: number, totalHours: number): string {
  if (totalHours <= 24) {
    return `${hour}h`;
  }

  const day = Math.floor(hour / 24);
  const hourOfDay = hour % 24;
  return `D${day} ${hourOfDay}h`;
}

export interface EntityOption {
  id: string;
  name: string;
}

export function formatEntityOptionLabel(id: string, name: string): string {
  return name !== id ? `${id} — ${name}` : id;
}

export function getEntityOptions(
  states: Record<string, { attributes?: Record<string, unknown> }>,
): EntityOption[] {
  return Object.entries(states)
    .filter(([entityId, state]) => {
      const domain = entityId.split('.')[0];
      const unitOfMeasurement = state.attributes?.unit_of_measurement;
      const stateClass = state.attributes?.state_class;
      const supportedDomains = ['sensor', 'input_number', 'number'];

      return supportedDomains.includes(domain) || typeof unitOfMeasurement === 'string' || typeof stateClass === 'string';
    })
    .map(([entityId, state]) => ({
      id: entityId,
      name: (state.attributes?.friendly_name ?? entityId) as string,
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}
