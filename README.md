# Portafolio · Sebastián Cofré

Monorepo con dos apps frontend:

| App | Stack | Comandos |
|-----|-------|----------|
| `apps/web` | Next.js 15 (App Router), React 19, TypeScript, Tailwind 4 | `cd apps/web && npm i && npm run dev` |
| `apps/angular-demo` | Angular 19, Signals, OnPush | `cd apps/angular-demo && npm i && npm start` · tests: `npm test` |

## Decisiones
- **Server Components por defecto**; solo `ProjectGrid` (filtro) y `Reveal` (IntersectionObserver) son Client Components.
- **Sin librerías de animación**: CSS + IntersectionObserver, respeta `prefers-reduced-motion`.
- **Fuentes del sistema** y sin imágenes sin dimensiones → sin saltos de CLS.
- **Accesibilidad**: skip link, landmarks, `aria-pressed`, foco visible, `role="status"`.

## Personalizar
Edita `apps/web/src/data/projects.ts` y `profile.ts` con tus proyectos reales (URLs en producción y repos). 
