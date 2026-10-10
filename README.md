# Portafolio · Sebastián Cofré

Monorepo con dos apps frontend independientes. Node 20.11+ o 22; cada app tiene su propio
`package.json`, así que hay que instalar en cada una.

| App | Stack | Dev | Verificar |
|-----|-------|-----|-----------|
| `apps/web` | Next.js 15 (App Router), React 19, TypeScript, Tailwind 4 | `npm run dev` → :3000 | `npm run lint` · `npm run test:e2e` |
| `apps/angular-demo` | Angular 19, Signals, OnPush | `npm start` → :4200 | `npm test` |

## Ramas

```
master    producción: Vercel despliega desde aquí
  ↑
dev       integración: todo el trabajo se hace aquí
```

- **Se trabaja directo en `dev`**, sin ramas `feat/*` ni `fix/*`.
- Para publicar, se mergea `dev` en `master`. La promoción va en un solo sentido.
- Mensajes de commit en español, en una línea. Cuerpo solo si hace falta explicar el porqué.

Antes de pushear:

```bash
cd apps/web && npm run lint && npx tsc --noEmit && npm run build
cd apps/angular-demo && npm test -- --watch=false && npx ng build
```

## Demos · `apps/web` (ES/EN en `/es` y `/en`)

- **Core Web Vitals en vivo**: LCP, CLS, INP, FCP y TTFB medidos con `PerformanceObserver`,
  más un laboratorio para provocar CLS e INP a propósito.
- **RAG sobre el CV**: TF-IDF y similitud coseno en el navegador, sin APIs (`src/lib/rag.ts`).
- **Design system en Storybook**: `npm run storybook`. `npm run build:all` lo genera en
  `public/storybook`, que es lo que necesita el enlace de la tarjeta en producción.
- Paleta `Ctrl/⌘ + K`, tema claro/oscuro sin flash, i18n por `Accept-Language` con middleware.

## Demos · `apps/angular-demo`

Rutas con carga diferida, todas con datos sintéticos y dominio neutro:

- `/grid` — tabla virtualizada de 50.000 filas escrita a mano (en producción usaría
  `@angular/cdk/scrolling`); la matemática de la ventana vive en `grid.logic.ts`, es pura y testeada.
- `/search` — RxJS: debounce, cancelación, reintento con backoff y `switchMap` contra `mergeMap`
  para que el race condition se vea en vez de explicarse.
- `/rag` — el mismo motor TF-IDF que la versión en React.

## Sistema de diseño

Tokens en `apps/web/src/app/globals.css` (claro y oscuro), primitivas en `apps/web/src/ui`
(`Card`, `Button`, `Badge`, `Tabs`) documentadas en Storybook. Tipografía Instrument Sans y
JetBrains Mono vía `next/font`: auto-hospedadas y con métricas de respaldo, para que el
intercambio de fuente no provoque CLS. Las apps de Angular reusan los mismos tokens en
`apps/angular-demo/src/styles.css`.

## Textos y contenido

Todo el texto del sitio vive en `apps/web/src/i18n/content/{es,en}.ts` y ambos comparten tipo:
si agregas una clave en `es.ts`, TypeScript obliga a traducirla en `en.ts`.

Los logos de tecnología vienen de `simple-icons` (CC0) y se pintan en `currentColor`, no en el
color de marca, para que contrasten en ambos temas. Los de Clínica Alemana, BID y LUXXOR están en
`apps/web/public/logos/` y se declaran en `apps/web/src/data/logos.ts`: quitar una entrada de ahí
basta para que la tarjeta deje de mostrarlo. La insignia AZ-900 es un diseño propio, no el arte
oficial de Microsoft; para usar el oficial, baja el PNG desde Credly a `public/badges/az-900.png`
y pásalo como `image` a `CertBadge`.

No se publican datos ni reglas de negocio de proyectos de clientes: las demos usan datos
sintéticos a propósito.

## Decisiones

- **Server Components por defecto**: las islas cliente son solo los componentes interactivos.
- **Sin librerías de animación**: CSS más `IntersectionObserver`, respetando `prefers-reduced-motion`.
- **Accesibilidad**: skip link, landmarks, `aria-pressed`, foco visible y `role="status"`.
- **Rendimiento**: imágenes con dimensiones declaradas y fuentes con métricas de respaldo, para no
  mover el layout mientras carga.
