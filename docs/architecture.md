# Architecture

## Monorepo Structure

```
pushui/
├── packages/
│   ├── styles/              # @pushui/styles - Shared SCSS design system
│   │   └── styles/          # SCSS source files
│   │       ├── mixins/      # SCSS mixins (mq, typo, etc.)
│   │       ├── utilities/   # Utility classes
│   │       └── index.scss   # Main entry
│   │
│   └── react/               # @pushui/react - React component library
│       └── src/
│           ├── components/
│           │   ├── base/    # Atomic UI elements (21)
│           │   ├── form/    # Form inputs and controls (13)
│           │   ├── modules/ # Content wrappers (9)
│           │   └── sections/# Page-level layouts (6)
│           ├── types/       # Shared TypeScript types
│           └── index.ts     # Library entry point
│
├── apps/                    # (future) Storybook, docs site
├── docs/                    # Documentation
├── turbo.json               # Turborepo config
└── pnpm-workspace.yaml      # pnpm workspaces
```

## Packages

| Package | Description | Entry |
|---------|-------------|-------|
| `@pushui/styles` | SCSS design system, CSS variables, utility classes | `dist/index.css` |
| `@pushui/react` | React components with CSS Modules | `dist/index.mjs` |

## Path Aliases (packages/react)

Configured in tsconfig, vitest, tsup:

```typescript
import { Button } from 'form/Button'
import { Title } from 'base/Title'
import { Card } from 'modules/Card'
import { Header } from 'sections/Header'
import type { ColorVariant } from 'types'
```

## Component File Pattern

```
ComponentName/
├── ComponentName.tsx           # Implementation
├── ComponentName.types.ts      # TypeScript types
├── ComponentName.module.scss   # Scoped styles
├── ComponentName.stories.tsx   # Storybook
├── ComponentName.test.tsx      # Tests
└── index.ts                    # Barrel export
```

## TypeScript Patterns

### Component Props

```typescript
import type { ComponentPropsWithRef } from 'react'
import type { ColorVariant } from 'types'

export type ComponentTypes = ComponentPropsWithRef<'div'> & {
  variant?: ColorVariant
}
```

### Shared Types (types/)

```typescript
export type ColorVariant =
  | 'default' | 'primary' | 'secondary'
  | 'success' | 'danger' | 'warning' | 'info'
```

## Compound Components

### Header (sections/Header/)

Complex compound component with context:

```
Header/
├── HeaderRoot.tsx              # Context provider, state management
├── HeaderContext.tsx           # Context + useHeader hook
├── Top/                        # Top navigation section
├── Main/                       # Main navigation section
├── Mobile/                     # Mobile menu
├── useHeaderDropdown.ts        # Shared dropdown logic hook
└── useHeaderNavLabel.ts        # Nav aria-label hook
```

### Footer (sections/Footer/)

Structural compound component (no context needed):

```
Footer/
├── FooterRoot.tsx              # Semantic <footer> wrapper
├── Main/                       # Main content section
└── Bottom/                     # Bottom bar section
```

## Adding a New Component

1. **Choose category**: `base/`, `form/`, `modules/`, or `sections/`

2. **Create folder**: `packages/react/src/components/{category}/MyComponent/`

3. **Create files**:

```typescript
// MyComponent.types.ts
import type { ComponentPropsWithRef } from 'react'
import type { ColorVariant } from 'types'

export type MyComponentTypes = ComponentPropsWithRef<'div'> & {
  variant?: ColorVariant
}

// MyComponent.tsx
import clsx from 'clsx'
import styles from './MyComponent.module.scss'
import type { MyComponentTypes } from './MyComponent.types'

export function MyComponent({
  ref,
  variant = 'default',
  className,
  children,
  ...rest
}: MyComponentTypes) {
  return (
    <div
      ref={ref}
      className={clsx(styles.root, styles[`variant-${variant}`], className)}
      {...rest}
    >
      {children}
    </div>
  )
}

// index.ts
export { MyComponent } from './MyComponent'
export type { MyComponentTypes } from './MyComponent.types'
```

4. **Register** in `packages/react/src/components/{category}/index.ts`:

```typescript
export * from './MyComponent'
```
