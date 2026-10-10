import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'tasks', title: 'Task Board', loadComponent: () => import('./tasks/tasks.component').then((m) => m.TasksComponent) },
  { path: 'dashboard', title: 'Dashboard en vivo', loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent) },
  { path: 'rag', title: 'Demo RAG', loadComponent: () => import('./rag/rag.component').then((m) => m.RagComponent) },
  { path: '**', redirectTo: 'tasks' },
];
