import { describe, expect, it } from 'vitest';
import {
  DEFAULT_SERIES,
  buildHourBuckets,
  createDefaultConfig,
  formatHourLabel,
  normalizeConfig,
  normalizeOffset,
  subtractOffset,
} from '../src/utils';
import { buildAlignedDataset, toNumericHistoryPoints } from '../src/history';

describe('normalizeOffset', () => {
  it('prefers offset_hours when provided', () => {
    expect(normalizeOffset({ hours: 1, days: 2, years: 3 }, 4)).toEqual({ hours: 4, days: 2, years: 3 });
  });

  it('defaults missing values to zero', () => {
    expect(normalizeOffset()).toEqual({ hours: 0, days: 0, years: 0 });
  });
});

describe('normalizeConfig', () => {
  it('adds default range, title and series', () => {
    const config = normalizeConfig({ type: 'custom:history-compare-card', entity: 'sensor.temperature' });
    expect(config.title).toBe('History Compare');
    expect(config.range.hours).toBe(24);
    expect(config.series).toEqual(DEFAULT_SERIES);
  });
});

describe('createDefaultConfig', () => {
  it('creates a usable base config', () => {
    const config = createDefaultConfig();
    expect(config.type).toBe('custom:history-compare-card');
    expect(config.range.hours).toBe(24);
    expect(config.series).toHaveLength(3);
  });
});

describe('subtractOffset', () => {
  it('subtracts years, days and hours', () => {
    const input = new Date('2026-06-29T12:00:00Z');
    const result = subtractOffset(input, { years: 1, days: 1, hours: 2 });
    expect(result.toISOString()).toBe('2025-06-28T10:00:00.000Z');
  });
});

describe('buildHourBuckets', () => {
  it('builds hourly labels for the range', () => {
    expect(buildHourBuckets(3)).toEqual([0, 1, 2, 3]);
  });
});

describe('formatHourLabel', () => {
  it('formats short ranges in hours', () => {
    expect(formatHourLabel(3, 24)).toBe('3h');
  });

  it('formats long ranges with day labels', () => {
    expect(formatHourLabel(27, 48)).toBe('D1 3h');
  });
});

describe('toNumericHistoryPoints', () => {
  it('maps valid numeric values and preserves nulls for invalid states', () => {
    const start = new Date('2026-06-29T00:00:00Z');
    const result = toNumericHistoryPoints(
      [
        { last_changed: '2026-06-29T01:00:00Z', state: '21.2' },
        { last_changed: '2026-06-29T02:00:00Z', state: 'unknown' },
      ],
      start,
    );

    expect(result).toEqual([
      { x: 1, y: 21.2 },
      { x: 2, y: null },
    ]);
  });
});

describe('buildAlignedDataset', () => {
  it('fills buckets using the latest known value', () => {
    const result = buildAlignedDataset(
      [
        { x: 0.2, y: 20 },
        { x: 1.7, y: 22 },
      ],
      3,
    );

    expect(result).toEqual([
      { x: 0, y: null },
      { x: 1, y: 20 },
      { x: 2, y: 22 },
      { x: 3, y: 22 },
    ]);
  });
});
