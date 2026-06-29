import type { HomeAssistant } from 'custom-card-helpers';
import { subtractOffset, buildHourBuckets } from './utils';
import type { ChartSeries, HistoryPoint, NormalizedSeriesConfig } from './types';

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
): Array<{ x: number; y: number | null }> {
  const buckets = buildHourBuckets(rangeHours);
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

export async function buildChartSeries(
  hass: HomeAssistant,
  entityId: string,
  rangeHours: number,
  seriesConfigs: NormalizedSeriesConfig[],
): Promise<ChartSeries[]> {
  const now = new Date();
  const baseEnd = now;
  const baseStart = new Date(now.getTime() - rangeHours * 60 * 60 * 1000);

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
        points,
      };
    }),
  );
}
