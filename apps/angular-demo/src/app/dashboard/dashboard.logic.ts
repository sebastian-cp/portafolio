export type SeriesKey = 'req' | 'lat' | 'err';

export interface Point {
  req: number; // solicitudes/s
  lat: number; // latencia p95 (ms)
  err: number; // errores (%)
}

export const SERIES: { key: SeriesKey; label: string; unit: string; max: number; color: string }[] = [
  { key: 'req', label: 'Solicitudes', unit: 'req/s', max: 1000, color: '#4338ca' },
  { key: 'lat', label: 'Latencia p95', unit: 'ms', max: 500, color: '#0e7490' },
  { key: 'err', label: 'Errores', unit: '%', max: 5, color: '#b91c1c' },
];

export const WINDOW = 40;
export const WIDTH = 600;
export const HEIGHT = 220;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Paseo aleatorio acotado. `rng` es inyectable para poder testearlo. */
export function nextPoint(prev: Point, rng: () => number = Math.random): Point {
  const walk = (v: number, step: number, max: number) => clamp(v + (rng() - 0.5) * step, 0, max);
  return { req: walk(prev.req, 160, 1000), lat: walk(prev.lat, 60, 500), err: walk(prev.err, 0.8, 5) };
}

export function seed(n = WINDOW, rng: () => number = Math.random): Point[] {
  const out: Point[] = [];
  let p: Point = { req: 500, lat: 180, err: 1 };
  for (let i = 0; i < n; i++) out.push((p = nextPoint(p, rng)));
  return out;
}

/** Puntos de una polilínea SVG; cada serie se normaliza contra su propio máximo. */
export function toPolyline(data: Point[], key: SeriesKey): string {
  const max = SERIES.find((s) => s.key === key)!.max;
  const stepX = WIDTH / (WINDOW - 1);
  return data.map((p, i) => `${(i * stepX).toFixed(1)},${(HEIGHT - (p[key] / max) * HEIGHT).toFixed(1)}`).join(' ');
}

export function summarize(data: Point[], key: SeriesKey) {
  const values = data.map((p) => p[key]);
  const last = values.at(-1) ?? 0;
  const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  return { last, avg, max: values.length ? Math.max(...values) : 0 };
}
