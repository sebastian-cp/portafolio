import { makeRows } from './grid.data';
import { applyQuery, sliceFor } from './grid.logic';

describe('grid.logic', () => {
  describe('sliceFor', () => {
    it('al inicio arranca en 0 y no deja relleno', () => {
      const s = sliceFor(0, 400, 40, 1000, 0);
      expect(s.start).toBe(0);
      expect(s.end).toBe(10);
      expect(s.padTop).toBe(0);
      expect(s.totalHeight).toBe(40_000);
    });

    it('el relleno siempre corresponde a la primera fila renderizada', () => {
      for (const top of [0, 37, 400, 1234, 39_000]) {
        const s = sliceFor(top, 400, 40, 1000, 6);
        expect(s.padTop).toBe(s.start * 40);
      }
    });

    it('renderiza una fracción mínima del total', () => {
      const s = sliceFor(20_000, 400, 40, 50_000);
      expect(s.end - s.start).toBeLessThan(40);
    });

    it('no se pasa del final aunque el scroll se exceda', () => {
      const s = sliceFor(9_999_999, 400, 40, 1000);
      expect(s.end).toBe(1000);
      expect(s.start).toBeLessThan(1000);
    });

    it('tolera una lista vacía', () => {
      expect(sliceFor(0, 400, 40, 0)).toEqual({ start: 0, end: 0, padTop: 0, totalHeight: 0 });
    });
  });

  describe('applyQuery', () => {
    const rows = makeRows(500);

    it('filtra por estado', () => {
      const out = applyQuery(rows, { text: '', status: 'error', sort: 'code', dir: 'asc' });
      expect(out.length).toBeGreaterThan(0);
      expect(out.every((r) => r.status === 'error')).toBeTrue();
    });

    it('busca por código, nombre y módulo', () => {
      const out = applyQuery(rows, { text: 'auth', status: 'all', sort: 'code', dir: 'asc' });
      expect(out.every((r) => `${r.code} ${r.name} ${r.module}`.toLowerCase().includes('auth'))).toBeTrue();
    });

    it('ordena ascendente y descendente', () => {
      const asc = applyQuery(rows, { text: '', status: 'all', sort: 'ms', dir: 'asc' });
      const desc = applyQuery(rows, { text: '', status: 'all', sort: 'ms', dir: 'desc' });
      expect(asc[0].ms).toBeLessThanOrEqual(asc.at(-1)!.ms);
      expect(desc[0].ms).toBe(asc.at(-1)!.ms);
    });

    it('el generador es reproducible con la misma semilla', () => {
      expect(makeRows(10, 7)).toEqual(makeRows(10, 7));
    });
  });
});
