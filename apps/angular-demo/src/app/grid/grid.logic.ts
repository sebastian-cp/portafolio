import { EventRow, Status } from './grid.data';

export type SortKey = 'code' | 'name' | 'module' | 'status' | 'ms' | 'at';
export type SortDir = 'asc' | 'desc';

export interface Slice {
  /** Índice de la primera fila que se renderiza. */
  start: number;
  /** Índice (exclusivo) de la última. */
  end: number;
  /** Relleno superior en px, para que la barra de scroll no mienta. */
  padTop: number;
  /** Alto total del contenido como si estuviera todo renderizado. */
  totalHeight: number;
}

/**
 * Ventana visible de una lista virtualizada.
 * En producción usaría `@angular/cdk/scrolling`; está a mano para mostrar
 * que el mecanismo son dos multiplicaciones y un `slice`, no magia.
 */
export function sliceFor(
  scrollTop: number,
  viewportHeight: number,
  rowHeight: number,
  total: number,
  overscan = 6,
): Slice {
  const totalHeight = total * rowHeight;
  if (total === 0 || rowHeight <= 0) return { start: 0, end: 0, padTop: 0, totalHeight: 0 };

  const clamped = Math.max(0, Math.min(scrollTop, Math.max(0, totalHeight - viewportHeight)));
  const first = Math.floor(clamped / rowHeight);
  const visible = Math.ceil(viewportHeight / rowHeight);

  const start = Math.max(0, first - overscan);
  const end = Math.min(total, first + visible + overscan);
  return { start, end, padTop: start * rowHeight, totalHeight };
}

const STATUS_ORDER: Record<Status, number> = { ok: 0, slow: 1, error: 2 };

const compare = (a: EventRow, b: EventRow, key: SortKey): number => {
  if (key === 'status') return STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
  if (key === 'ms' || key === 'at') return a[key] - b[key];
  return a[key].localeCompare(b[key]);
};

export interface Query {
  text: string;
  status: Status | 'all';
  sort: SortKey;
  dir: SortDir;
}

/** Filtra y ordena. Puro y sin dependencias: se testea sin montar Angular. */
export function applyQuery(rows: readonly EventRow[], q: Query): EventRow[] {
  const needle = q.text.trim().toLowerCase();
  const out: EventRow[] = [];

  for (const r of rows) {
    if (q.status !== 'all' && r.status !== q.status) continue;
    if (needle && !r.code.toLowerCase().includes(needle) && !r.name.includes(needle) && !r.module.includes(needle)) continue;
    out.push(r);
  }

  const sign = q.dir === 'asc' ? 1 : -1;
  return out.sort((a, b) => compare(a, b, q.sort) * sign);
}
