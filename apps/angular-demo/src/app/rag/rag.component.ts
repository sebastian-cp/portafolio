import { ChangeDetectionStrategy, Component, OnDestroy, computed, signal } from '@angular/core';
import { KNOWLEDGE, SUGGESTIONS } from './knowledge';
import { retrieve } from './rag.engine';

@Component({
  selector: 'app-rag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rag.component.html',
  styleUrl: './rag.component.css',
})
export class RagComponent implements OnDestroy {
  readonly suggestions = SUGGESTIONS;
  readonly query = signal('');
  readonly asked = signal(false);
  readonly shown = signal(0);

  readonly hits = computed(() => (this.asked() ? retrieve(this.query(), KNOWLEDGE) : []));
  readonly answer = computed(() =>
    this.hits().length ? this.hits()[0].chunk.text : 'No encontré eso en mi CV. Prueba preguntando por experiencia, tecnologías o proyectos.',
  );
  readonly words = computed(() => this.answer().split(' '));
  readonly streaming = computed(() => this.shown() < this.words().length);
  readonly visibleText = computed(() => this.words().slice(0, this.shown()).join(' '));

  private timer?: ReturnType<typeof setInterval>;

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  ask(q = this.query()): void {
    if (!q.trim()) return;
    this.query.set(q);
    this.asked.set(true);
    clearInterval(this.timer);
    const total = this.words().length;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return this.shown.set(total);
    this.shown.set(0);
    this.timer = setInterval(() => {
      this.shown.update((n) => n + 1);
      if (this.shown() >= total) clearInterval(this.timer);
    }, 35);
  }
}
