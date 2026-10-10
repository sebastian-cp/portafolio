import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, mergeMap, retry, switchMap, tap } from 'rxjs/operators';
import { FakeSearchApi, Hit, latencyFor } from './search.api';

type Strategy = 'switchMap' | 'mergeMap';
type ReqState = 'inflight' | 'applied' | 'stale' | 'cancelled' | 'failed';

interface Req {
  id: number;
  query: string;
  /** ms desde el inicio de la ráfaga. */
  offset: number;
  ms: number;
  state: ReqState;
  retries: number;
}

const WORD = 'angular';
const DEBOUNCE = 100;

@Component({
  selector: 'app-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  readonly strategies: Strategy[] = ['switchMap', 'mergeMap'];

  readonly strategy = signal<Strategy>('switchMap');
  readonly failFirst = signal(false);
  readonly text = signal('');
  readonly reqs = signal<Req[]>([]);
  readonly results = signal<string[]>([]);
  readonly shownQuery = signal('');
  readonly error = signal('');
  readonly typing = signal(false);

  readonly inflight = computed(() => this.reqs().some((r) => r.state === 'inflight'));
  readonly isStale = computed(() => this.shownQuery() !== '' && this.shownQuery() !== this.text().trim());
  readonly span = computed(() => Math.max(1200, ...this.reqs().map((r) => r.offset + r.ms)));

  private readonly input$ = new Subject<string>();
  private readonly api = new FakeSearchApi();
  private seq = 0;
  private burstStart = 0;

  constructor() {
    // La estrategia se elige al construir el pipe, así que al cambiarla hay que
    // rearmar la suscripción. onCleanup corta la anterior.
    effect((onCleanup) => {
      const strategy = this.strategy();
      const combine = strategy === 'switchMap' ? switchMap : mergeMap;

      const sub = this.input$
        .pipe(
          debounceTime(DEBOUNCE),
          distinctUntilChanged(),
          combine((query: string) => this.request(query)),
        )
        .subscribe({
          next: (hit) => this.apply(hit),
          error: (e: Error) => this.error.set(e.message),
        });

      onCleanup(() => sub.unsubscribe());
    });
  }

  /** Una petición instrumentada: deja rastro de inicio, fin, cancelación y reintentos. */
  private request(query: string) {
    const id = ++this.seq;
    const startedAt = performance.now();
    let settled = false;

    this.track({
      id,
      query,
      offset: Math.round(startedAt - this.burstStart),
      ms: latencyFor(query),
      state: 'inflight',
      retries: 0,
    });

    return this.api.search(query, this.failFirst()).pipe(
      retry({
        count: 2,
        delay: (_err, n) => {
          this.update(id, (r) => ({ ...r, retries: n, ms: r.ms + 300 * 2 ** (n - 1) + latencyFor(query) }));
          return timer(300 * 2 ** (n - 1));
        },
      }),
      tap(() => {
        settled = true;
        this.update(id, (r) => ({ ...r, ms: Math.round(performance.now() - startedAt) }));
      }),
      finalize(() => {
        // Si nunca emitió, el operador de arriba la desuscribió: eso es cancelar.
        if (!settled) this.update(id, (r) => (r.state === 'inflight' ? { ...r, state: 'cancelled', ms: Math.round(performance.now() - startedAt) } : r));
      }),
    );
  }

  private apply(hit: Hit): void {
    const latest = this.lastQuery();
    const stale = hit.query !== latest;
    this.update(hit.query, (r) => ({ ...r, state: stale ? 'stale' : 'applied' }));
    this.results.set(hit.items);
    this.shownQuery.set(hit.query);
    this.error.set('');
  }

  private lastQuery(): string {
    const list = this.reqs();
    return list.length ? list[list.length - 1].query : '';
  }

  private track(r: Req): void {
    this.reqs.update((list) => [...list, r]);
  }

  private update(key: number | string, fn: (r: Req) => Req): void {
    this.reqs.update((list) => {
      const i = typeof key === 'number'
        ? list.findIndex((r) => r.id === key)
        : list.map((r) => r.query).lastIndexOf(key);
      if (i < 0) return list;
      const copy = [...list];
      copy[i] = fn(copy[i]);
      return copy;
    });
  }

  type(value: string): void {
    if (!this.reqs().length) this.burstStart = performance.now();
    this.text.set(value);
    this.input$.next(value);
  }

  /** Teclea una palabra letra por letra: así se ven varias peticiones en vuelo. */
  async simulate(): Promise<void> {
    if (this.typing()) return;
    this.typing.set(true);
    this.clear();
    this.burstStart = performance.now();
    for (let i = 1; i <= WORD.length; i++) {
      this.text.set(WORD.slice(0, i));
      this.input$.next(WORD.slice(0, i));
      await new Promise((r) => setTimeout(r, 140));
    }
    this.typing.set(false);
  }

  clear(): void {
    this.reqs.set([]);
    this.results.set([]);
    this.shownQuery.set('');
    this.error.set('');
    this.seq = 0;
    this.api.reset();
  }

  left(r: Req): number {
    return (r.offset / this.span()) * 100;
  }

  width(r: Req): number {
    return Math.max(2, (r.ms / this.span()) * 100);
  }
}
