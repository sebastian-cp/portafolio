import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { inject as injectAnalytics } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!embedded) {
      <header>
        <strong><span class="mark">NG</span> Angular 19 · demos</strong>
        <nav aria-label="Principal">
          @for (l of links; track l.path) {
            <a [routerLink]="l.path" routerLinkActive="active" ariaCurrentWhenActive="page">{{ l.label }}</a>
          }
        </nav>
      </header>
    }
    <router-outlet />
  `,
  styles: `
    header {
      position: sticky; top: 0; z-index: 10;
      display: flex; flex-wrap: wrap; gap: 1rem;
      align-items: center; justify-content: space-between;
      padding: .75rem 1.5rem;
      border-bottom: 1px solid var(--border);
      background: color-mix(in oklab, var(--background) 75%, transparent);
      backdrop-filter: blur(16px);
    }
    strong { display: inline-flex; align-items: center; gap: .6rem; font-size: .875rem; font-weight: 600; }
    .mark {
      display: grid; place-items: center;
      width: 1.75rem; height: 1.75rem;
      border: 1px solid var(--border); border-radius: .5rem;
      background: var(--surface);
      font-size: .7rem; letter-spacing: -.02em;
    }
    nav { display: flex; gap: .25rem; padding: .25rem; border: 1px solid var(--border); border-radius: 999px; background: var(--surface); }
    a { padding: .35rem .85rem; border-radius: 999px; color: var(--muted); text-decoration: none; font-size: .875rem; transition: color .2s ease, background-color .2s ease; }
    a.active { background: var(--accent-soft); color: var(--foreground); }
    a:not(.active):hover { color: var(--foreground); }
  `,
})
export class AppComponent {
  /** Dentro del modal del portafolio cada demo se abre sola: el menú entre demos sobra. */
  readonly embedded = new URLSearchParams(location.search).has('embed');

  readonly links = [
    { path: '/grid', label: '50k filas' },
    { path: '/search', label: 'RxJS' },
    { path: '/rag', label: 'RAG' },
  ];

  constructor() {
    // Inicializa Vercel Analytics solo en el navegador
    if (typeof window !== 'undefined') {
      injectAnalytics();
    }
  }
}
