# Copilot Instructions

## Objetivo del proyecto

Este proyecto es una Pokédex desarrollada con PokeAPI, construida con Next.js 15, React 19 y TypeScript estricto.

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19 + TypeScript strict |
| Estilos | Tailwind CSS + classnames + tailwind-merge |
| Estado global | Zustand 5 |
| HTTP | Axios |
| Iconos | react-icons |

Antes de realizar cualquier cambio:

- Analiza el código existente.
- Respeta la arquitectura actual siempre que sea coherente.
- Evita refactorizaciones masivas sin una justificación clara.
- Prioriza la mantenibilidad sobre la rapidez.
- No agregues dependencias innecesarias.

---

# Filosofía

Toda decisión debe priorizar:

- Clean Code
- SOLID
- DRY
- KISS
- Separation of Concerns
- Escalabilidad
- Legibilidad
- Reutilización
- Accesibilidad
- Performance

Si existen varias soluciones, elegir la más simple que resuelva correctamente el problema.

Siempre justificar decisiones importantes.

---

# Arquitectura

**Patrón adoptado: Layered Architecture con jerarquía de componentes Atomic.**

```
app/
  components/
    base/        → Primitivos sin dominio (Contenedor, Fondo, Button, Badge, Skeleton...)
    ui/          → Componentes de dominio (card/, modal/, nav/, ...)
  lib/
    model/       → Tipos y modelos de datos
    store/       → Zustand stores
    utils/       → Funciones puras y reutilizables
    hooks/       → Custom hooks (crear solo cuando haya lógica compartida entre componentes)
  services/
    get/         → Funciones de fetch desacopladas de la UI
public/
```

Reglas de dependencia entre capas:
- `components/` puede importar de `lib/` y `services/`.
- `lib/` no puede importar de `components/`.
- `services/` no puede importar de `components/` ni de `store/`.
- Los componentes **nunca** llaman a la API directamente; siempre pasan por `services/`.



# Componentes

Los componentes deben:

- Tener una única responsabilidad.
- Ser reutilizables cuando tenga sentido.
- Recibir props correctamente tipadas.
- Evitar lógica compleja.

**Límites establecidos:**
- Máximo **150 líneas** por archivo de componente.
- Máximo **40 líneas** por función o handler interno.
- Si un componente supera 150 líneas: dividirlo en subcomponentes o extraer lógica a un hook.

---

# Estado

**Decisiones tomadas:**
- **Zustand**: estado global del proyecto — lista de pokémons, tipos, estado de carga, pokémon seleccionado en modal.
- **React Query / SWR**: NO — el proyecto usa Axios + Zustand + `useCallback`/`useEffect`. No se justifica agregar otra librería para este alcance.
- **Estado local (`useState`)**: solo para UI efímera (toggles, inputs no controlados).

Nunca duplicar estado entre store y estado local.

---

# Tipado

Utilizar TypeScript estricto.

Evitar:

- any
- casting innecesario

Preferir tipos descriptivos.

Las respuestas de la API deben tiparse correctamente.

---

# Fetch de datos

No realizar fetch directamente desde componentes.

Centralizar el acceso a APIs.

Transformar datos antes de llegar a la UI.

Manejar correctamente:

- loading
- error
- empty state

---

# Hooks

Crear hooks únicamente cuando exista lógica reutilizable.

No crear hooks para encapsular una sola línea de código.

---

# Estilos

**Stack de estilos definido:**
- **Tailwind CSS**: sistema principal. Sin CSS Modules.
- **classnames**: para composición condicional de clases.
- **tailwind-merge (twMerge)**: para resolver conflictos al extender clases desde props.
- **Patrón estándar**: `twMerge(classNames(defaultStyles, className))` — ya establecido en `Contenedor` y `Fondo`.

Evitar clases extremadamente largas inline. Extraer a variables o componentes.

Evitar repetir strings de clases. Usar constantes o tokens del modelo.

---

# Design System

**Decisión**: Design System propio, pequeño y creciente. Sin Storybook por ahora.

Los tokens de dominio (colores, gradientes, iconos por tipo Pokémon) viven en `app/lib/model/card.tsx`.
Los tokens globales de color/spacing se definen vía variables CSS en `globals.css` y se exponen en `tailwind.config.ts`.

Primitivos existentes y por construir en `components/base/`:
- `Contenedor` ✅
- `Fondo` ✅
- `Button` (pendiente)
- `Badge` (pendiente)
- `Skeleton` (pendiente)
- `EmptyState` (pendiente)
- `ErrorState` (pendiente)

---

# Performance

**Métricas Lighthouse objetivo:**

| Categoría | Objetivo |
|---|---|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| SEO | ≥ 90 |
| Best Practices | ≥ 95 |

Priorizar:
- renderizados eficientes
- lazy loading y dynamic imports para componentes pesados
- imágenes optimizadas con `next/image` (siempre `alt` descriptivo)
- memoización únicamente cuando exista un problema de performance medible

No optimizar prematuramente.

---

# SEO

**Decisiones tomadas:**
- **`sitemap.xml`**: implementar cuando existan rutas por pokémon (`/pokemon/[name]`).
- **`robots.txt`**: sí, desde el inicio.
- **Metadata dinámica**: sí — usar `generateMetadata` de Next.js en cada page.

Cada página debe definir:
- `title`
- `description`
- Open Graph (`og:title`, `og:description`, `og:image`)
- `canonical`

---

# Accesibilidad

**Nivel objetivo: WCAG AA.**

Todo componente interactivo debe ser accesible. Obligatorio:
- HTML semántico (`button`, `nav`, `main`, `dialog`, etc.)
- Navegación completa por teclado (`Tab`, `Enter`, `Escape`, `Space`)
- Foco visible en todos los elementos interactivos (`focus:outline`)
- `aria-label` en elementos sin texto descriptivo visible
- `aria-modal`, `role="dialog"` en modales con focus trap
- Contraste mínimo 4.5:1 para texto normal
- `alt` descriptivo en todas las imágenes
- Soporte TalkBack (Android) y VoiceOver (iOS/macOS)

---

# Responsive

Desarrollar Mobile First.

Evitar tamaños fijos.

---

# Calidad

**Límites establecidos:**
- Complejidad ciclomática máxima: **10** por función.
- Máximo de líneas por archivo: **200**.
- Máximo de líneas por función: **40**.

No dejar:
- `console.log` (salvo `console.error` para errores reales)
- código muerto o comentado
- imports sin usar

Mantener funciones pequeñas, componentes pequeños y nombres descriptivos en español o inglés consistente (nunca mezclar idiomas en un mismo módulo).

---

# Testing

**Decisiones tomadas:**
- **Tests unitarios**: sí — a implementar con **Vitest + @testing-library/react** (aún no configurado).
- **Tests E2E**: no en esta etapa.
- **Cobertura mínima**: 70% para funciones en `lib/utils/` y `services/`.

Todo código nuevo debe ser testeable. Priorizar funciones puras y componentes desacoplados.

---

# Git

Seguir Conventional Commits.

Ejemplos:

feat:
fix:
refactor:
docs:
test:
chore:

---

# Documentación

Mantener actualizado el README.

Documentar decisiones importantes.

---

# Antes de generar código

Antes de escribir código, responder internamente:

- ¿Existe ya una solución similar?
- ¿Estoy duplicando lógica?
- ¿Este cambio rompe la arquitectura?
- ¿Existe una solución más simple?
- ¿Este código será fácil de mantener?
- ¿Es accesible?
- ¿Es responsive?
- ¿Tiene buen tipado?

Si la respuesta es negativa, proponer una alternativa.

---

# Dependencias

Antes de instalar cualquier dependencia nueva:
1. ¿Existe una solución nativa de Next.js/React?
2. ¿Se puede resolver en ≤ 30 líneas de código propio?
3. Comparar alternativas, justificar ventajas y desventajas.

No instalar librerías para resolver problemas simples.

**Dependencias actuales aprobadas:**

| Paquete | Justificación |
|---|---|
| `zustand` | Estado global simple sin boilerplate |
| `axios` | Cliente HTTP con interceptores y tipado limpio |
| `classnames` | Composición condicional de clases Tailwind |
| `tailwind-merge` | Resolución de conflictos al extender clases desde props |
| `react-icons` | Biblioteca unificada de iconos SVG |

## Actualización de documentación

Si una implementación modifica la arquitectura, las tecnologías utilizadas o las convenciones del proyecto, debes sugerir también la actualización de la documentación correspondiente.

Analiza si es necesario modificar alguno de estos archivos:

- README.md
- ARCHITECTURE.md
- DECISIONS.md

No asumas que la documentación está actualizada.
Indica exactamente qué secciones deberían modificarse.

# Actualización de documentación

Al finalizar cualquier tarea, analiza si el cambio realizado afecta la documentación del proyecto.

No modifiques automáticamente los archivos de documentación, salvo que se solicite explícitamente.

En su lugar, finaliza tu respuesta con el siguiente resumen:

## Resumen

- ¿Se modificó la arquitectura? (Sí/No)
- ¿Se agregó, eliminó o reemplazó alguna dependencia? (Sí/No)
- ¿Se incorporó un nuevo patrón o convención? (Sí/No)
- ¿Se modificó la estructura del proyecto? (Sí/No)

## Documentación sugerida

Indica únicamente los archivos que deberían revisarse:

- README.md
- docs/ARCHITECTURE.md
- docs/DECISIONS.md
- docs/CONTRIBUTING.md
- docs/ROADMAP.md

Para cada archivo, explica brevemente por qué debería actualizarse.

Si no es necesario actualizar ningún documento, indícalo explícitamente.