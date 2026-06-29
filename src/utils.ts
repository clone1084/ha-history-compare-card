import type { HistoryCompareCardConfig, HistoryCompareOffset, NormalizedSeriesConfig } from './types';

export const DEFAULT_SERIES: NormalizedSeriesConfig[] = [
  { name: 'Now', color: '#00bcd4', offset: { hours: 0, days: 0, years: 0 } },
  { name: 'Yesterday', color: '#4caf50', offset: { hours: 0, days: 1, years: 0 } },
  { name: 'Last Year', color: '#ff9800', offset: { hours: 0, days: 0, years: 1 } },
];

export const DEFAULT_RANGE_HOURS = 24;

export function normalizeOffset(offset?: HistoryCompareOffset, offsetHours?: number): Required<HistoryCompareOffset> {
  return {
    hours: offsetHours ?? offset?.hours ?? 0,
    days: offset?.days ?? 0,
    years: offset?.years ?? 0,
  };
}

export function normalizeConfig(config: HistoryCompareCardConfig): Required<HistoryCompareCardConfig> {
  const range = config.range ?? { hours: DEFAULT_RANGE_HOURS };
  const series = (config.series?.length ? config.series : DEFAULT_SERIES).map((item) => ({
    name: item.name,
    color: item.color ?? '#3f51b5',
    offset: normalizeOffset(item.offset, item.offset_hours),
  }));

  return {
    type: config.type,
    entity: config.entity,
    title: config.title ?? 'History Compare',
    range,
    series,
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

export function hoursBetween(start: Date, end: Date): number[] {
  const values: number[] = [];
  const total = Math.max(1, Math.round((end.getTime() - start.getTime()) / (60 * 60 * 1000)));
  for (let i = 0; i <= total; i += 1) {
    values.push(i);
  }
  return values;
}
