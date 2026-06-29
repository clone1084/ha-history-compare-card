import { describe, expect, it } from 'vitest';
import { DEFAULT_SERIES, hoursBetween, normalizeConfig, normalizeOffset, subtractOffset } from '../src/utils';

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

describe('subtractOffset', () => {
  it('subtracts years, days and hours', () => {
    const input = new Date('2026-06-29T12:00:00Z');
    const result = subtractOffset(input, { years: 1, days: 1, hours: 2 });
    expect(result.toISOString()).toBe('2025-06-28T10:00:00.000Z');
  });
});

describe('hoursBetween', () => {
  it('builds hourly labels for the range', () => {
    const result = hoursBetween(new Date(0), new Date(3 * 60 * 60 * 1000));
    expect(result).toEqual([0, 1, 2, 3]);
  });
});
