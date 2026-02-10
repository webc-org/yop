# Push UI Documentation

Multi-framework UI component library with shared design system.

## Packages

| Package | Description | Status |
|---------|-------------|--------|
| `@pushui/styles` | SCSS design system, CSS variables, utility classes | Ready |
| `@pushui/react` | React component library (49 components) | Ready |
| `@pushui/svelte` | Svelte component library | Planned |
| `@pushui/vue` | Vue component library | Planned |
| `@pushui/angular` | Angular component library | Planned |

## Installation

```bash
# React
pnpm add @pushui/react

# Styles only
pnpm add @pushui/styles
```

## Usage

```tsx
import { Button, Header, Select } from '@pushui/react'
import '@pushui/react/styles.css'
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

## Demo

[Storybook](https://webc-org.github.io/pushui/)

## Quick Start

```bash
# Clone
git clone https://github.com/webc-org/pushui.git
cd pushui

# Install
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```
