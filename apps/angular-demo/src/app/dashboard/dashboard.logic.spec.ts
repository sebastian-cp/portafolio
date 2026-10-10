import { HEIGHT, WINDOW, nextPoint, seed, summarize, toPolyline } from './dashboard.logic';

describe('dashboard.logic', () => {
  it('nextPoint se mantiene dentro de los límites', () => {
    let p = { req: 0, lat: 0, err: 0 };
    for (let i = 0; i < 500; i++) {
      p = nextPoint(p, () => (i % 2 ? 1 : 0));
      expect(p.req).toBeGreaterThanOrEqual(0);
      expect(p.req).toBeLessThanOrEqual(1000);
      expect(p.err).toBeLessThanOrEqual(5);
    }
  });

  it('seed genera una ventana completa', () => {
    expect(seed().length).toBe(WINDOW);
  });

  it('toPolyline mapea valores máximos arriba y mínimos abajo', () => {
    const pts = [{ req: 1000, lat: 0, err: 0 }, { req: 0, lat: 0, err: 0 }];
    const [first, second] = toPolyline(pts, 'req').split(' ');
    expect(first.endsWith(',0.0')).toBeTrue();
    expect(second.endsWith(`,${HEIGHT.toFixed(1)}`)).toBeTrue();
  });

  it('summarize calcula último, promedio y máximo', () => {
    const s = summarize([{ req: 100, lat: 0, err: 0 }, { req: 300, lat: 0, err: 0 }], 'req');
    expect(s).toEqual({ last: 300, avg: 200, max: 300 });
  });
});
