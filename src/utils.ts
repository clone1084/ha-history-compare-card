import type { HistoryCompareCardConfig, HistoryCompareOffset, HistoryCompareSeriesConfig, NormalizedSeriesConfig } from './types';

export const DEFAULT_SERIES: NormalizedSeriesConfig[] = [
  { name: 'Now', color: '#00bcd4', offset: { hours: 0, days: 0, years: 0 } },
  { name: 'Yesterday', color: '#4caf50', offset: { hours: 0, days: 1, years: 0 } },
  { name: 'Last Year', color: '#ff9800', offset: { hours: 0, days: 0, years: 1 } },
];

export const DEFAULT_RANGE_HOURS = 24;
export const DEFAULT_TITLE = 'History Compare';
export const DEFAULT_SERIES_COLOR = '#3f51b5';

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
    series: normalizeSeriesConfig(config.series),
  };
}

export function createDefaultConfig(): Required<HistoryCompareCardConfig> {
  return {
    type: 'custom:history-compare-card',
    entity: '',
    title: DEFAULT_TITLE,
    range: { hours: DEFAULT_RANGE_HOURS },
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

export function buildHourBuckets(rangeHours: number): number[] {
  const normalized = Math.max(1, Math.round(rangeHours));
  return Array.from({ length: normalized + 1 }, (_, index) => index);
}

export function formatHourLabel(hour: number, totalHours: number): string {
  if (totalHours <= 24) {
    return `${hour}h`;
  }

  const day = Math.floor(hour / 24);
  const hourOfDay = hour % 24;
  return `D${day} ${hourOfDay}h`;
}

export function getEntityOptions(states: Record<string, { attributes?: Record<string, unknown> }>): string[] {
  return Object.entries(states)
    .filter(([, state]) => {
      const deviceClass = state.attributes?.device_class;
      return deviceClass !== 'timestamp';
    })
    .map(([entityId]) => entityId)
    .sort((left, right) => left.localeCompare(right));
}
