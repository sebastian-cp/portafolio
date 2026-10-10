/** Generador de datos sintéticos. Nada aquí viene de un sistema real. */

export type Status = 'ok' | 'slow' | 'error';

export interface EventRow {
  id: number;
  code: string;
  name: string;
  module: string;
  status: Status;
  ms: number;
  at: number;
}

const MODULES = ['auth', 'billing', 'catalog', 'checkout', 'notify', 'reports', 'search', 'sync'];
const ACTIONS = [
  'create', 'update', 'delete', 'export', 'import', 'retry', 'validate',
  'publish', 'archive', 'refresh', 'reconcile', 'dispatch',
];
const SUBJECTS = ['record', 'batch', 'session', 'invoice', 'token', 'index', 'job', 'report'];

/** mulberry32: PRNG pequeño y con semilla, para que el set sea reproducible. */
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRows(count: number, seed = 42): EventRow[] {
  const rand = rng(seed);
  const pick = <T,>(xs: readonly T[]) => xs[Math.floor(rand() * xs.length)];
  const start = Date.UTC(2026, 0, 1);
  const rows: EventRow[] = new Array(count);

  for (let i = 0; i < count; i++) {
    const r = rand();
    const status: Status = r > 0.94 ? 'error' : r > 0.82 ? 'slow' : 'ok';
    const base = status === 'error' ? 1200 : status === 'slow' ? 600 : 40;
    rows[i] = {
      id: i + 1,
      code: `EV-${String(i + 1).padStart(6, '0')}`,
      name: `${pick(ACTIONS)}_${pick(SUBJECTS)}`,
      module: pick(MODULES),
      status,
      ms: Math.round(base + rand() * base * 1.8),
      at: start + Math.floor(rand() * 270 * 86_400_000),
    };
  }
  return rows;
}

export const MODULE_OPTIONS = MODULES;
