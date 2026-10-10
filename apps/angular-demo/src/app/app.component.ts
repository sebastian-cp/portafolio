import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';

type Filter = 'all' | 'pending' | 'done';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

const STORAGE_KEY = 'task-board';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly filters: { value: Filter; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'done', label: 'Completadas' },
  ];

  readonly tasks = signal<Task[]>(this.load());
  readonly filter = signal<Filter>('all');

  readonly visible = computed(() => {
    const f = this.filter();
    return this.tasks().filter((t) => f === 'all' || (f === 'done') === t.done);
  });
  readonly remaining = computed(() => this.tasks().filter((t) => !t.done).length);

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks()));
      } catch {
        /* almacenamiento no disponible */
      }
    });
  }

  add(input: HTMLInputElement): void {
    const title = input.value.trim();
    if (!title) return;
    this.tasks.update((ts) => [...ts, { id: Date.now(), title, done: false }]);
    input.value = '';
    input.focus();
  }

  toggle(id: number): void {
    this.tasks.update((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  remove(id: number): void {
    this.tasks.update((ts) => ts.filter((t) => t.id !== id));
  }

  private load(): Task[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Task[];
    } catch {
      return [];
    }
  }
}
