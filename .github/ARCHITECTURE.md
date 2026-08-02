# Architecture

> Este documento describe **cómo está construido el proyecto y por qué**. No es una guía de estilo ni un listado de reglas. Eso vive en `copilot-instructions.md`.

---

## ¿Qué es este proyecto?

Una **Pokédex** desarrollada con [PokeAPI](https://pokeapi.co/). Permite explorar Pokémon, filtrarlos por tipo y ver el detalle de cada uno en un modal.

**Stack real:**

| Tecnología | Versión | Rol |
|---|---|---|
| Next.js | 15 (App Router) | Framework, routing, rendering |
| React | 19 | UI |
| TypeScript | 5 (strict) | Tipado |
| Tailwind CSS | 3 | Estilos |
| classnames | 2.5 | Composición condicional de clases |
| tailwind-merge | 3 | Resolución de conflictos de clases |
| Zustand | 5 | Estado global |
| Axios | 1.7 | Cliente HTTP |
| react-icons | 5.5 | Iconografía SVG |

---

## Estructura de carpetas

```
app/
├── components/
│   ├── base/            # Primitivos UI sin dominio
│   │   └── card/
│   │       ├── Contenedor.tsx
│   │       └── Fondo.tsx
│   └── ui/              # Componentes de dominio compuestos desde base/
│       ├── card/
│       │   ├── Card.tsx
│       │   └── Cards.tsx
│       ├── modal/
│       │   └── PokemonModal.tsx
│       └── nav/
│           └── Nav.tsx
├── lib/
│   ├── model/           # Tipos TypeScript + tokens de diseño por dominio
│   │   └── card.tsx     # typeColors, typeIcons, typeGradientColors
│   ├── store/           # Zustand stores (uno por dominio)
│   │   └── usePokemonStore/
│   │       ├── usePokemonStore.ts
│   │       └── useTiposStore.ts
│   └── utils/           # Funciones puras y reutilizables
│       └── obtenerTipo.ts
├── services/
│   └── get/             # Funciones de fetch desacopladas de la UI
│       ├── getPokemons.ts
│       └── getTipos.ts
├── globals.css
├── layout.tsx
└── page.tsx
```

**Regla de dependencias entre capas:**

```
components/ ──→ lib/  ✅
components/ ──→ services/  ✅
lib/        ──→ components/  ❌
services/   ──→ store/  ❌
services/   ──→ components/  ❌
```

Los componentes nunca llaman a la API directamente.

---

## Flujo de datos

```
PokeAPI
  ↓  (Axios)
services/get/getPokemons.ts
  ↓
page.tsx  (useEffect + useCallback)
  ↓
usePokemonStore  (Zustand)
  ↓
Cards.tsx  →  Card.tsx
```

La página (`page.tsx`) es el único punto que orquesta la carga inicial. Una vez en el store, cualquier componente puede leer los datos sin prop drilling.

---

## Modelo de rendering

Actualmente **toda la app es Client-side Rendering (CSR)**.

- `page.tsx` tiene `"use client"` porque usa Zustand y `useEffect` para la carga inicial.
- Todos los componentes hijos que consumen el store también son Client Components.
- `layout.tsx` sigue siendo Server Component (metadatos estáticos).

**Trade-off consciente**: CSR implica peor SEO inicial y TTFB, pero es aceptable porque:
1. PokeAPI no requiere autenticación ni datos sensibles.
2. La Pokédex es una app interactiva, no un sitio de contenido estático.
3. Se compensa con `generateMetadata` cuando se implementen rutas `/pokemon/[name]`.

**Decisión pendiente**: cuando existan rutas individuales de Pokémon, evaluar si usar `fetch` en Server Components para pre-renderizado.

---

## Estado global

### Qué stores existen

| Store | Archivo | Contenido |
|---|---|---|
| `usePokemonStore` | `store/usePokemonStore/usePokemonStore.ts` | `pokemons[]`, `estaCargando`, `selectedPokemon` |
| `useTiposStore` | `store/usePokemonStore/useTiposStore.ts` | `pokemonTipo[]` (lista para el filtro de nav) |

### Qué va al store vs qué va a estado local

| Caso | Dónde |
|---|---|
| Lista de pokémon cargados | `usePokemonStore` |
| Pokémon seleccionado para el modal | `usePokemonStore` |
| Estado de carga global | `usePokemonStore` |
| Lista de tipos para el filtro | `useTiposStore` |
| UI efímera (toggle, hover) | `useState` local |

**Por qué `selectedPokemon` vive en el store y no en estado local de `Cards.tsx`**: permite que en el futuro cualquier componente pueda abrir el modal (por ejemplo, desde una búsqueda o un link), sin refactorizar la jerarquía de componentes.

---

## Arquitectura de componentes

### División base/ vs ui/

```
base/   → Primitivos sin conocimiento del dominio Pokémon
            Reciben props genéricas (className, children, pokemon?)
            Establecen el patrón visual y accesible base
            Ejemplo: Contenedor, Fondo

ui/     → Componentes de dominio, compuestos desde base/
            Conocen el modelo Pokémon
            Leen del store o reciben props tipadas con Pokemon
            Ejemplo: Card, Cards, PokemonModal, Nav
```

### Patrón de extensión de estilos

Todo componente base acepta `className` y usa el patrón:

```tsx
const styles = twMerge(classNames(defaultStyles, className))
```

Esto permite que `ui/` extienda los estilos de `base/` sin conflictos de especificidad de Tailwind.

---

## Modal y accesibilidad

`PokemonModal` se renderiza mediante **React Portal** (`ReactDOM.createPortal`) directamente en `document.body`.

**Por qué Portal y no render inline:**
1. Evita problemas de z-index con el stacking context de los ancestros.
2. El nodo queda fuera de la jerarquía DOM del card, lo cual es correcto semánticamente.
3. Los screen readers (VoiceOver, TalkBack) anuncian los diálogos correctamente cuando están fuera del contenido principal.

**Gestión de foco:**
- Al abrir: guarda `document.activeElement`, mueve el foco al dialog.
- Focus trap: `Tab` y `Shift+Tab` ciclan dentro del modal.
- Al cerrar (`Escape`, backdrop, botón): restaura el foco al elemento que abrió el modal.

---

## Tokens de diseño

Los tokens específicos del dominio Pokémon (colores, gradientes e iconos por tipo) viven en `app/lib/model/card.tsx`, no dispersos en los componentes.

```
typeColors         → bg-* de Tailwind por tipo
typeGradientColors → gradientes de fondo por tipo
typeIcons          → componentes de react-icons por tipo
typeColorsBorder   → colores de borde inferior/izquierdo
typeColorsBorderleft → colores de borde superior/derecho
```

Los tokens globales (background, foreground) se definen como variables CSS en `globals.css` y se exponen en `tailwind.config.ts`.

---

## Convenciones de naming

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes | PascalCase | `PokemonModal.tsx` |
| Hooks | `useNombre` | `usePokemonStore.ts` |
| Servicios | `verboRecurso` | `getPokemons.ts` |
| Stores | `useNombreStore` | `usePokemonStore.ts` |
| Utils | camelCase descriptivo | `obtenerTipo.ts` |
| Tipos/Interfaces | PascalCase | `Pokemon`, `ContenedorProps` |

---

## Registro de decisiones arquitectónicas (ADR)

| Fecha | Decisión | Alternativa considerada | Motivo |
|---|---|---|---|
| 2026-07-30 | Layered Architecture | Feature-Based | El proyecto es una única feature (Pokédex); capas técnicas aportan más claridad que carpetas por feature |
| 2026-07-30 | Zustand para estado global | React Context | Menor boilerplate, sin re-renders en cascada, mejor soporte TypeScript |
| 2026-07-30 | Sin React Query | TanStack Query | PokeAPI es de solo lectura y sin autenticación; la cache manual con Zustand es suficiente para este alcance |
| 2026-07-30 | Axios sobre fetch nativo | SWR + fetch | Permite interceptores futuros (auth, logging), manejo de errores más limpio |
| 2026-07-30 | classnames + tailwind-merge | clsx | Ya instalados; `twMerge(classNames(...))` resuelve composición condicional y conflictos de Tailwind en un solo patrón |
| 2026-07-30 | React Portal para el modal | Render inline en Cards | Evita problemas de z-index, árbol DOM correcto para screen readers |
| 2026-07-30 | `selectedPokemon` en store | Estado local en Cards | Desacopla la apertura del modal de la jerarquía de componentes; escalable a links directos |
| 2026-07-30 | `"use client"` en page.tsx | Server Component + RSC | Necesario para Zustand; se acepta CSR a cambio de simplicidad en la carga inicial |

---

## Roadmap técnico

### Pendiente

- [ ] Rutas individuales `/pokemon/[name]` con Server Components y `generateMetadata`
- [ ] `robots.txt` estático en `/public`
- [ ] `sitemap.xml` dinámico al implementar rutas individuales
- [ ] Configuración de Vitest + @testing-library/react
- [ ] Tests unitarios para `lib/utils/` y `services/get/`
- [ ] Primitivos faltantes: `Button`, `Badge`, `Skeleton`, `EmptyState`, `ErrorState`
- [ ] Filtro por tipo funcional conectado al store
- [ ] Paginación o infinite scroll para la lista de Pokémon
- [ ] Dark mode con variable CSS `prefers-color-scheme`

### UI
- ¿Construiremos un Design System propio o usaremos una librería base?

### Testing
- ¿Cuál será la cobertura mínima aceptable?
- ¿Qué partes son críticas y requieren tests obligatorios?

### Performance
- ¿Qué métricas de Lighthouse se consideran objetivo?

### SEO
- ¿Qué páginas deben indexarse?
- ¿Qué datos estructurados aportan valor para una Pokédex?

### Accesibilidad
- ¿El objetivo será cumplir WCAG AA o aspirar a AAA?