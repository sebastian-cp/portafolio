# Portafolio · Sebastián Cofré

Monorepo con dos apps frontend:

| App | Stack | Comandos |
|-----|-------|----------|
| `apps/web` | Next.js 15 (App Router), React 19, TypeScript, Tailwind 4 | `cd apps/web && npm i && npm run dev` |
| `apps/angular-demo` | Angular 19, Signals, OnPush | `cd apps/angular-demo && npm i && npm start` · tests: `npm test` |

## Logos y marcas
Los logos de tecnología vienen de `simple-icons` (CC0) y se pintan en `currentColor`,
no en el color de marca, para que contrasten en ambos temas. Los logos de Clínica Alemana,
BID y LUXXOR están en `apps/web/public/logos/` y se declaran en `apps/web/src/data/logos.ts`;
quita una entrada de ahí y la tarjeta deja de mostrarlo. La insignia AZ-900 es un diseño
propio, no el arte oficial de Microsoft: para usar el oficial, descarga el PNG desde Credly
a `public/badges/az-900.png` y pásalo como `image` a `CertBadge`.

## Sistema de diseño
Tokens en `apps/web/src/app/globals.css` (claro/oscuro), primitivas en `apps/web/src/ui`
(`Card`, `Button`, `Badge`, `Tabs`) documentadas en Storybook. Tipografía: Instrument Sans +
JetBrains Mono vía `next/font` (auto-hospedadas, con métricas de respaldo para no provocar CLS).
Las apps de Angular reusan los mismos tokens en `apps/angular-demo/src/styles.css`.

## Demos (apps/web, ES/EN en `/es` y `/en`)
- **Core Web Vitals en vivo**: LCP, CLS, INP, FCP y TTFB medidos con `PerformanceObserver`, más un laboratorio para provocar CLS e INP.
- **Accesibilidad antes/después**: componentes «sin ARIA» vs «con ARIA» y árbol de accesibilidad calculado en vivo (`src/lib/a11y-tree.ts`).
- **Demo RAG sobre el CV**: TF-IDF + similitud coseno en el navegador (`src/lib/rag.ts`).
- **Design system en Storybook**: `src/ui` (Button, Badge, Tabs) y ProjectCard. `npm run storybook` · `npm run build:all` genera `public/storybook`.
- Paleta `Ctrl/⌘ + K`, tema claro/oscuro sin flash, i18n con middleware por `Accept-Language`.
- Tests e2e: `npm run test:e2e` (usa `CHROMIUM_PATH` si no tienes los navegadores de Playwright).

## Demos (apps/angular-demo)
Rutas lazy: `/tasks` (Signals + OnPush), `/dashboard` (métricas en vivo con `effect()` y SVG propio), `/rag` (mismo motor TF-IDF). Tests: `npm test`.

## Decisiones
- **Server Components por defecto**; las islas cliente son solo los componentes interactivos.
- **Sin librerías de animación**: CSS + IntersectionObserver, respeta `prefers-reduced-motion`.
- **Fuentes del sistema** y sin imágenes sin dimensiones → sin saltos de CLS.
- **Accesibilidad**: skip link, landmarks, `aria-pressed`, foco visible, `role="status"`.

## Personalizar
Edita `apps/web/src/data/projects.ts` y `profile.ts` con tus proyectos reales (URLs en producción y repos). 
