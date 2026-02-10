# Gdpr

Cookie consent modal with localStorage persistence, customizable categories, and Global Privacy Control support. Uses Modal, Accordion, Switch, Button, Badge, and Link components.

## Import

```tsx
import { GdprProvider, useGdpr } from '@ui'
```

## Setup

Wrap your app with `GdprProvider` inside `Modals`:

```tsx
<Modals>
  <GdprProvider>
    <App />
  </GdprProvider>
</Modals>
```

## Usage

### Basic

```tsx
<GdprProvider
  privacyPolicyUrl="/privacy"
  termsUrl="/terms"
>
  <App />
</GdprProvider>
```

### Custom Categories

```tsx
<GdprProvider
  categories={[
    {
      id: 'necessary',
      label: 'Essential',
      description: 'Core site functionality.',
      required: true,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      description: 'Usage statistics.',
    },
  ]}
>
  <App />
</GdprProvider>
```

### Custom Strings

```tsx
<GdprProvider
  strings={{
    title: 'Privacy Preferences',
    acceptAll: 'Accept All Cookies',
    description: 'We use cookies to improve your experience.',
  }}
>
  <App />
</GdprProvider>
```

### Reading Consent

```tsx
const { consent, hasConsented, hasCategory } = useGdpr()

if (hasCategory('targeting')) {
  // Load analytics
}
```

### Opening Settings Programmatically

```tsx
const { openSettings } = useGdpr()

<Button onClick={openSettings}>Cookie Settings</Button>
```

## Props (GdprProviderTypes)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `categories` | `GdprCategory[]` | 4 defaults | Cookie categories to display |
| `strings` | `Partial<GdprStrings>` | English defaults | UI string overrides |
| `storageKey` | `string` | `'GDPR'` | localStorage key for consent |
| `autoOpen` | `boolean` | `true` | Open modal on first visit |
| `respectGPC` | `boolean` | `true` | Honor Global Privacy Control signal |
| `modalWidth` | `string` | `'65rem'` | Modal width |
| `privacyPolicyUrl` | `string` | - | Privacy policy link URL |
| `termsUrl` | `string` | - | Terms of use link URL |
| `onConsentChange` | `(consent) => void` | - | Callback when consent changes |

## Hook API

### useGdpr()

Returns:

| Property | Type | Description |
|----------|------|-------------|
| `consent` | `GdprConsent` | Current consent state per category |
| `hasConsented` | `boolean` | Whether user has made a choice |
| `isGPCEnabled` | `boolean` | Whether GPC signal is detected |
| `openSettings` | `() => void` | Open the consent modal |
| `hasCategory` | `(id: string) => boolean` | Check if a category is consented |

## Types

### GdprCategory

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique category identifier |
| `label` | `string` | Display label |
| `description` | `string` | Expanded description text |
| `required` | `boolean` | Cannot be disabled (shows "Always Active") |

### GdprStrings

| Property | Default |
|----------|---------|
| `title` | "Cookie Settings" |
| `description` | "We use cookies to operate this site..." |
| `preferencesDescription` | "Manage your cookie preferences below..." |
| `acceptAll` | "Accept All" |
| `necessaryOnly` | "Necessary Only" |
| `confirmSelections` | "Confirm Selections" |
| `moreChoices` | "More Choices" |
| `alwaysActive` | "Always Active" |
| `footerText` | "By confirming, you accept our..." |
| `gpcNotice` | "Global Privacy Control signal detected..." |
| `privacyPolicyLabel` | "Privacy Policy" |
| `termsLabel` | "Terms of Use" |
| `toggleLabel` | "Toggle {label}" |

## Default Categories

| ID | Label | Required |
|----|-------|----------|
| `necessary` | Necessary Cookies | Yes |
| `targeting` | Targeting Cookies | No |
| `functional` | Functional Cookies | No |
| `performance` | Performance Cookies | No |

## Accessibility

- Modal provides focus trap and Escape key close
- Switch toggles have `aria-label` per category
- Accordion triggers have `aria-expanded` and keyboard navigation
- Required categories show badge instead of interactive control

## Strapi Integration

```tsx
const gdprData = await strapi.find('gdpr-settings')

<GdprProvider
  categories={gdprData.categories}
  strings={gdprData.strings}
  privacyPolicyUrl={gdprData.privacyPolicyUrl}
  termsUrl={gdprData.termsUrl}
>
  <App />
</GdprProvider>
```
