import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { HEIGHT, Point, SERIES, SeriesKey, WIDTH, WINDOW, nextPoint, seed, summarize, toPolyline } from './dashboard.logic';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  readonly series = SERIES;
  readonly width = WIDTH;
  readonly height = HEIGHT;
  readonly speeds = [
    { ms: 1000, label: 'Lento' },
    { ms: 400, label: 'Normal' },
    { ms: 150, label: 'Rápido' },
  ];

  readonly data = signal<Point[]>(seed());
  readonly running = signal(true);
  readonly speed = signal(400);
  readonly enabled = signal<Set<SeriesKey>>(new Set(['req', 'lat', 'err']));

  /** Líneas y estadísticas derivadas: se recalculan solo cuando cambian sus signals. */
  readonly lines = computed(() =>
    SERIES.map((s) => ({
      ...s,
      on: this.enabled().has(s.key),
      points: toPolyline(this.data(), s.key),
      stats: summarize(this.data(), s.key),
    })),
  );
  readonly chartLabel = computed(() =>
    this.lines()
      .filter((l) => l.on)
      .map((l) => `${l.label}: actual ${l.stats.last.toFixed(l.key === 'err' ? 2 : 0)} ${l.unit}`)
      .join('; '),
  );

  constructor() {
    // El efecto se vuelve a ejecutar si cambian running o speed; onCleanup detiene el intervalo anterior.
    effect((onCleanup) => {
      if (!this.running()) return;
      const id = setInterval(() => {
        this.data.update((d) => [...d.slice(-(WINDOW - 1)), nextPoint(d[d.length - 1])]);
      }, this.speed());
      onCleanup(() => clearInterval(id));
    });
  }

  toggleSeries(key: SeriesKey): void {
    this.enabled.update((s) => {
      const next = new Set(s);
      if (next.has(key)) { if (next.size > 1) next.delete(key); } else next.add(key);
      return next;
    });
  }
}
