# Yop Documentation

Multi-framework UI component library with shared design system.

## Packages

| Package | Description | Status |
|---------|-------------|--------|
| `@yop/styles` | SCSS design system, CSS variables, utility classes | Ready |
| `@yop/react` | React component library (48 components) | Ready |
| `@yop/vue` | Vue component library | Planned |
| `@yop/angular` | Angular component library | Planned |

## Installation

```bash
# React
pnpm add @yop/react

# Styles only
pnpm add @yop/styles
```

## Usage

```tsx
import { Button, Header, Select } from '@yop/react'
import '@yop/react/styles.css'
```

## Documentation

| Doc | Contents |
|-----|----------|
| [architecture.md](architecture.md) | Monorepo structure, file patterns, adding components |
| [components.md](components.md) | Component catalog (base, form, modules, sections) |
| [styling.md](styling.md) | CSS variables, utility classes, theming |
| [i18n.md](i18n.md) | Translation keys by component |
| [testing.md](testing.md) | Test guidelines |
| [development.md](development.md) | Commands, package exports, SSR |

## Quick Start

```bash
# Clone
git clone https://github.com/webc-org/yop.git
cd yop

# Install
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```
