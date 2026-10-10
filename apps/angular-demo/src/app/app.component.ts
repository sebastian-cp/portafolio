import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <strong>Angular 19 · demos</strong>
      <nav aria-label="Principal">
        @for (l of links; track l.path) {
          <a [routerLink]="l.path" routerLinkActive="active" ariaCurrentWhenActive="page">{{ l.label }}</a>
        }
      </nav>
    </header>
    <router-outlet />
  `,
  styles: `
    header { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between; padding: .75rem 1.5rem; border-bottom: 1px solid #e7e5e4; background: #fff; }
    nav { display: flex; gap: .5rem; }
    a { padding: .4rem .8rem; border-radius: 999px; color: #57534e; text-decoration: none; border: 1px solid transparent; }
    a.active { background: #4338ca; color: #fff; }
    a:not(.active):hover { border-color: #a8a29e; }
  `,
})
export class AppComponent {
  readonly links = [
    { path: '/tasks', label: 'Tareas' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/rag', label: 'RAG' },
  ];
}
