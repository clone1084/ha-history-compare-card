import type { HomeAssistant } from 'custom-card-helpers';
import { subtractOffset, buildTimeBuckets } from './utils';
import type { ChartSeries, HistoryPoint, NormalizedSeriesConfig, StatisticValue } from './types';

export async function fetchHistory(
  hass: HomeAssistant,
  entityId: string,
  start: Date,
  end: Date,
): Promise<HistoryPoint[]> {
  const startTime = encodeURIComponent(start.toISOString());
  const endTime = encodeURIComponent(end.toISOString());
  const path = `history/period/${startTime}?filter_entity_id=${encodeURIComponent(entityId)}&end_time=${endTime}&minimal_response`;
  const response = await hass.callApi<HistoryPoint[][]>('GET', path);
  const series = Array.isArray(response) ? response[0] : [];
  return Array.isArray(series) ? series : [];
}

export function toNumericHistoryPoints(raw: HistoryPoint[], start: Date): Array<{ x: number; y: number | null }> {
  return raw
    .map((point) => ({
      x: (new Date(point.last_changed).getTime() - start.getTime()) / (60 * 60 * 1000),
      y: Number.isFinite(Number(point.state)) ? Number(point.state) : null,
    }))
    .filter((point) => point.x >= 0)
    .sort((left, right) => left.x - right.x);
}

export function buildAlignedDataset(
  points: Array<{ x: number; y: number | null }>,
  rangeHours: number,
  aggregationMinutes = 60,
): Array<{ x: number; y: number | null }> {
  const buckets = buildTimeBuckets(rangeHours, aggregationMinutes);
  let cursor = 0;
  let latestValue: number | null = null;

  return buckets.map((bucket) => {
    while (cursor < points.length && points[cursor].x <= bucket) {
      latestValue = points[cursor].y;
      cursor += 1;
    }

    return {
      x: bucket,
      y: latestValue,
    };
  });
}

const HISTORY_RETENTION_MS = 10 * 24 * 60 * 60 * 1000;

export async function fetchStatistics(
  hass: HomeAssistant,
  entityId: string,
  start: Date,
  end: Date,
): Promise<StatisticValue[]> {
  const response = await hass.callWS<Record<string, StatisticValue[]>>({
    type: 'recorder/statistics_during_period',
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    statistic_ids: [entityId],
    period: 'hour',
    types: ['mean', 'state'],
  });
  return response?.[entityId] ?? [];
}

export function toNumericStatisticsPoints(
  stats: StatisticValue[],
  start: Date,
): Array<{ x: number; y: number | null }> {
  return stats
    .map((stat) => ({
      x: (stat.start * 1000 - start.getTime()) / (60 * 60 * 1000),
      y: stat.mean ?? stat.state ?? null,
    }))
    .filter((point) => point.x >= 0)
    .sort((left, right) => left.x - right.x);
}

export async function buildChartSeries(
  hass: HomeAssistant,
  entityId: string,
  rangeHours: number,
  seriesConfigs: NormalizedSeriesConfig[],
  aggregationMinutes = 60,
): Promise<ChartSeries[]> {
  const now = new Date();
  const baseEnd = now;
  const baseStart = new Date(now.getTime() - rangeHours * 60 * 60 * 1000);

  const results = await Promise.allSettled(
    seriesConfigs.map(async (config) => {
      const start = subtractOffset(baseStart, config.offset);
      const end = subtractOffset(baseEnd, config.offset);

      const useStatistics = now.getTime() - start.getTime() > HISTORY_RETENTION_MS;
      let numeric: Array<{ x: number; y: number | null }>;

      if (useStatistics) {
        const stats = await fetchStatistics(hass, entityId, start, end);
        numeric = toNumericStatisticsPoints(stats, start);
      } else {
        const raw = await fetchHistory(hass, entityId, start, end);
        numeric = toNumericHistoryPoints(raw, start);
      }

      const points = buildAlignedDataset(numeric, rangeHours, aggregationMinutes);

      return {
        name: config.name,
        color: config.color,
        points,
      };
    }),
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    console.error(`[history-compare-card] Failed to load series "${seriesConfigs[index].name}":`, result.reason);
    return { name: seriesConfigs[index].name, color: seriesConfigs[index].color, points: [] };
  });
}
