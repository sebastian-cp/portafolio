import { filterCatalog, latencyFor } from './search.api';

describe('search.api', () => {
  it('las consultas cortas tardan más que las largas', () => {
    expect(latencyFor('a')).toBeGreaterThan(latencyFor('angular'));
  });

  it('la latencia nunca baja de 180 ms', () => {
    expect(latencyFor('una consulta larguísima')).toBe(180);
  });

  it('filtra por subcadena sin distinguir mayúsculas', () => {
    expect(filterCatalog('ANGU').every((x) => x.includes('angu'))).toBeTrue();
    expect(filterCatalog('angular').length).toBeGreaterThan(0);
  });

  it('una consulta vacía no devuelve nada', () => {
    expect(filterCatalog('   ')).toEqual([]);
  });

  it('acota la cantidad de resultados', () => {
    expect(filterCatalog('a').length).toBeLessThanOrEqual(8);
  });
});
