import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'grid' },
  { path: 'grid', title: 'Explorador de eventos', loadComponent: () => import('./grid/grid.component').then((m) => m.GridComponent) },
  { path: 'search', title: 'Buscador con RxJS', loadComponent: () => import('./search/search.component').then((m) => m.SearchComponent) },
  { path: 'rag', title: 'Demo RAG', loadComponent: () => import('./rag/rag.component').then((m) => m.RagComponent) },
  { path: '**', redirectTo: 'grid' },
];
