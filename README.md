# Portafolio · Sebastián Cofré

Monorepo con dos apps frontend:

| App | Stack | Comandos |
|-----|-------|----------|
| `apps/web` | Next.js 15 (App Router), React 19, TypeScript, Tailwind 4 | `cd apps/web && npm i && npm run dev` |
| `apps/angular-demo` | Angular 19, Signals, OnPush | `cd apps/angular-demo && npm i && npm start` · tests: `npm test` |

## Interactividad (apps/web)
- Paleta de comandos `Ctrl/⌘ + K` (combobox accesible sobre `<dialog>`)
- Tema claro/oscuro sin flash (script previo al paint)
- Experiencia en pestañas con navegación por flechas
- Demo RAG sobre el CV: TF-IDF + similitud coseno, en el navegador (`src/lib/rag.ts`)
- Contadores, barra de progreso de scroll y palabra rotativa (CSS + rAF, respetan `prefers-reduced-motion`)
- Tests e2e: `cd apps/web && npm run test:e2e` (usa `CHROMIUM_PATH` si no tienes los navegadores de Playwright)

## Decisiones
- **Server Components por defecto**; las islas cliente son solo los componentes interactivos.
- **Sin librerías de animación**: CSS + IntersectionObserver, respeta `prefers-reduced-motion`.
- **Fuentes del sistema** y sin imágenes sin dimensiones → sin saltos de CLS.
- **Accesibilidad**: skip link, landmarks, `aria-pressed`, foco visible, `role="status"`.

## Personalizar
Edita `apps/web/src/data/projects.ts` y `profile.ts` con tus proyectos reales (URLs en producción y repos). 
