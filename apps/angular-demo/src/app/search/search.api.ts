import { Observable, throwError, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

/** Catálogo neutro: solo sirve para tener algo que buscar. */
export const CATALOG = [
  'angular', 'angular cdk', 'angular material', 'angular signals', 'angular universal',
  'react', 'react query', 'react router', 'react testing library', 'redux toolkit',
  'next.js', 'nuxt', 'svelte', 'solidjs', 'qwik', 'astro', 'remix',
  'typescript', 'javascript', 'rxjs', 'zod', 'vitest', 'jest', 'jasmine', 'karma',
  'playwright', 'cypress', 'puppeteer', 'storybook', 'chromatic',
  'tailwind css', 'sass', 'postcss', 'css modules', 'styled components',
  'node.js', 'deno', 'bun', 'express', 'fastify', 'nestjs', 'django', 'fastapi',
  'postgresql', 'mysql', 'sqlite', 'redis', 'mongodb', 'chromadb', 'pinecone',
  'docker', 'kubernetes', 'argocd', 'jenkins', 'github actions', 'gitlab ci',
  'vite', 'webpack', 'rollup', 'esbuild', 'turbopack', 'parcel',
  'openai api', 'langchain', 'embeddings', 'rag', 'sonarqube', 'eslint', 'prettier',
];

/**
 * Latencia inversa al largo de la consulta: las búsquedas amplias tardan más.
 * Es lo que hace visible el race condition — "a" vuelve mucho después que
 * "angular", así que con mergeMap el resultado viejo pisa al nuevo.
 */
export function latencyFor(query: string): number {
  return Math.max(180, 1200 - query.length * 150);
}

export function filterCatalog(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return CATALOG.filter((item) => item.includes(q)).slice(0, 8);
}

export interface Hit {
  query: string;
  items: string[];
}

/**
 * API falsa. Con `failFirst`, el primer intento de cada consulta falla para
 * poder mostrar el reintento con backoff.
 */
export class FakeSearchApi {
  private attempts = new Map<string, number>();

  reset(): void {
    this.attempts.clear();
  }

  search(query: string, failFirst: boolean): Observable<Hit> {
    return timer(latencyFor(query)).pipe(
      switchMap(() => {
        const n = (this.attempts.get(query) ?? 0) + 1;
        this.attempts.set(query, n);
        if (failFirst && n === 1) return throwError(() => new Error('503 Service Unavailable'));
        return timer(0).pipe(map(() => ({ query, items: filterCatalog(query) })));
      }),
    );
  }
}
