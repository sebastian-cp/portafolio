import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal, viewChild } from '@angular/core';
import { EventRow, MODULE_OPTIONS, Status, makeRows } from './grid.data';
import { Query, SortKey, applyQuery, sliceFor } from './grid.logic';

const ROW_H = 40;
const TOTAL = 50_000;

@Component({
  selector: 'app-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent {
  readonly rowHeight = ROW_H;
  readonly total = TOTAL;
  readonly modules = MODULE_OPTIONS;
  readonly statuses: (Status | 'all')[] = ['all', 'ok', 'slow', 'error'];
  readonly columns: { key: SortKey; label: string; align?: 'right' }[] = [
    { key: 'code', label: 'Código' },
    { key: 'name', label: 'Evento' },
    { key: 'module', label: 'Módulo' },
    { key: 'status', label: 'Estado' },
    { key: 'ms', label: 'Duración', align: 'right' },
    { key: 'at', label: 'Fecha', align: 'right' },
  ];

  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');
  private readonly all = makeRows(TOTAL);

  readonly text = signal('');
  readonly status = signal<Status | 'all'>('all');
  readonly sort = signal<SortKey>('at');
  readonly dir = signal<'asc' | 'desc'>('desc');
  readonly scrollTop = signal(0);
  readonly viewportHeight = signal(480);
  readonly cursor = signal(0);

  /** Medición honesta: cuántos nodos hay y cuánto tarda el frame más lento. */
  readonly frameMs = signal(0);

  readonly query = computed<Query>(() => ({
    text: this.text(),
    status: this.status(),
    sort: this.sort(),
    dir: this.dir(),
  }));

  /**
   * El costo se devuelve junto al resultado en vez de escribirlo en otro signal:
   * un `computed` debe ser puro (Angular lanza NG0600 si escribe).
   */
  private readonly result = computed(() => {
    const t0 = performance.now();
    const rows = applyQuery(this.all, this.query());
    return { rows, ms: Math.round((performance.now() - t0) * 10) / 10 };
  });
  readonly rows = computed(() => this.result().rows);
  readonly filterMs = computed(() => this.result().ms);

  readonly slice = computed(() =>
    sliceFor(this.scrollTop(), this.viewportHeight(), ROW_H, this.rows().length),
  );
  readonly visibleRows = computed(() => {
    const s = this.slice();
    return this.rows().slice(s.start, s.end);
  });

  private rafPending = false;
  private lastFrame = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const el = this.viewport().nativeElement;
      this.viewportHeight.set(el.clientHeight);
      const ro = new ResizeObserver(() => this.viewportHeight.set(el.clientHeight));
      ro.observe(el);
      destroyRef.onDestroy(() => ro.disconnect());
    });
  }

  onScroll(el: HTMLElement): void {
    // Se escribe una sola vez por frame: el handler de scroll no toca layout.
    if (this.rafPending) return;
    this.rafPending = true;
    requestAnimationFrame((now) => {
      this.rafPending = false;
      if (this.lastFrame) {
        const delta = now - this.lastFrame;
        if (delta < 400) this.frameMs.update((prev) => Math.max(prev * 0.9, Math.round(delta * 10) / 10));
      }
      this.lastFrame = now;
      this.scrollTop.set(el.scrollTop);
      this.viewportHeight.set(el.clientHeight);
    });
  }

  setSort(key: SortKey): void {
    if (this.sort() === key) this.dir.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      this.sort.set(key);
      this.dir.set('asc');
    }
    this.goTo(0);
  }

  ariaSort(key: SortKey): 'ascending' | 'descending' | 'none' {
    if (this.sort() !== key) return 'none';
    return this.dir() === 'asc' ? 'ascending' : 'descending';
  }

  onKeydown(e: KeyboardEvent): void {
    const last = this.rows().length - 1;
    const page = Math.max(1, Math.floor(this.viewportHeight() / ROW_H) - 1);
    const next =
      e.key === 'ArrowDown' ? this.cursor() + 1
      : e.key === 'ArrowUp' ? this.cursor() - 1
      : e.key === 'PageDown' ? this.cursor() + page
      : e.key === 'PageUp' ? this.cursor() - page
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    this.goTo(Math.max(0, Math.min(last, next)));
  }

  /** Mueve el cursor y desplaza lo mínimo para dejarlo visible. */
  private goTo(index: number): void {
    this.cursor.set(index);
    const el = this.viewport().nativeElement;
    const top = index * ROW_H;
    const bottom = top + ROW_H;
    if (top < el.scrollTop) el.scrollTop = top;
    else if (bottom > el.scrollTop + el.clientHeight) el.scrollTop = bottom - el.clientHeight;
  }

  reset(): void {
    this.text.set('');
    this.status.set('all');
    this.goTo(0);
  }

  trackRow = (_: number, r: EventRow) => r.id;

  formatDate(ms: number): string {
    return new Date(ms).toISOString().slice(0, 10);
  }
}
