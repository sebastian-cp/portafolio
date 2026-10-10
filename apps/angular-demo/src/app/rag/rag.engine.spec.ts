import { KNOWLEDGE } from './knowledge';
import { retrieve, tokenize } from './rag.engine';

describe('rag.engine', () => {
  it('ignora tildes, mayúsculas y stopwords', () => {
    expect(tokenize('¿Qué experiencia tienes con Playwright?')).toEqual(['playwr']);
  });

  it('recupera el fragmento de Playwright', () => {
    expect(retrieve('¿Qué experiencia tienes con Playwright?', KNOWLEDGE)[0].chunk.id).toBe('k6');
  });

  it('recupera el fragmento de RAG', () => {
    expect(retrieve('¿Cómo implementaste RAG?', KNOWLEDGE)[0].chunk.id).toBe('k8');
  });

  it('devuelve vacío si no hay coincidencias', () => {
    expect(retrieve('zzzz qqqq', KNOWLEDGE)).toEqual([]);
  });
});
