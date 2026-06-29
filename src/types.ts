export interface HistoryCompareOffset {
  hours?: number;
  days?: number;
  years?: number;
}

export interface HistoryCompareSeriesConfig {
  name: string;
  color?: string;
  offset_hours?: number;
  offset?: HistoryCompareOffset;
}

export interface HistoryCompareRangeConfig {
  hours: number;
}

export interface HistoryCompareCardConfig {
  type: 'custom:history-compare-card';
  entity: string;
  title?: string;
  range?: HistoryCompareRangeConfig;
  series?: HistoryCompareSeriesConfig[];
}

export interface HistoryPoint {
  last_changed: string;
  state: string;
}

export interface NormalizedSeriesConfig {
  name: string;
  color: string;
  offset: Required<HistoryCompareOffset>;
}

export interface ChartSeries {
  name: string;
  color: string;
  points: Array<{ x: number; y: number | null }>;
}
