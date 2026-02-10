# GDPR

Cookie consent modal with localStorage persistence, customizable categories, and Global Privacy Control support. Uses Modal, Accordion, Switch, Button, Badge, and Link components.

## Import

```tsx
import { GDPRProvider, useGDPR } from '@ui'
```

## Setup

Wrap your app with `GDPRProvider` inside `Modals`:

```tsx
<Modals>
  <GDPRProvider>
    <App />
  </GDPRProvider>
</Modals>
```

## Usage

### Basic

```tsx
<GDPRProvider
  privacyPolicyUrl="/privacy"
  termsUrl="/terms"
>
  <App />
</GDPRProvider>
```

### Custom Categories

```tsx
<GDPRProvider
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
</GDPRProvider>
```

### Custom Strings

```tsx
<GDPRProvider
  strings={{
    title: 'Privacy Preferences',
    acceptAll: 'Accept All Cookies',
    description: 'We use cookies to improve your experience.',
  }}
>
  <App />
</GDPRProvider>
```

### Reading Consent

```tsx
const { consent, hasConsented, hasCategory } = useGDPR()

if (hasCategory('targeting')) {
  // Load analytics
}
```

### Opening Settings Programmatically

```tsx
const { openSettings } = useGDPR()

<Button onClick={openSettings}>Cookie Settings</Button>
```

## Props (GDPRProviderTypes)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `categories` | `GDPRCategory[]` | 4 defaults | Cookie categories to display |
| `strings` | `Partial<GDPRStrings>` | English defaults | UI string overrides |
| `storageKey` | `string` | `'pushui-gdpr'` | localStorage key for consent |
| `autoOpen` | `boolean` | `true` | Open modal on first visit |
| `respectGPC` | `boolean` | `true` | Honor Global Privacy Control signal |
| `modalWidth` | `string` | `'650px'` | Modal width |
| `privacyPolicyUrl` | `string` | - | Privacy policy link URL |
| `termsUrl` | `string` | - | Terms of use link URL |
| `onConsentChange` | `(consent) => void` | - | Callback when consent changes |

## Hook API

### useGDPR()

Returns:

| Property | Type | Description |
|----------|------|-------------|
| `consent` | `GDPRConsent` | Current consent state per category |
| `hasConsented` | `boolean` | Whether user has made a choice |
| `isGPCEnabled` | `boolean` | Whether GPC signal is detected |
| `openSettings` | `() => void` | Open the consent modal |
| `hasCategory` | `(id: string) => boolean` | Check if a category is consented |

## Types

### GDPRCategory

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique category identifier |
| `label` | `string` | Display label |
| `description` | `string` | Expanded description text |
| `required` | `boolean` | Cannot be disabled (shows "Always Active") |

### GDPRStrings

| Property | Default |
|----------|---------|
| `title` | "Cookie Settings" |
| `description` | "We use cookies to operate this site..." |
| `acceptAll` | "Accept All" |
| `necessaryOnly` | "Necessary Only" |
| `confirmSelections` | "Confirm Selections" |
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

<GDPRProvider
  categories={gdprData.categories}
  strings={gdprData.strings}
  privacyPolicyUrl={gdprData.privacyPolicyUrl}
  termsUrl={gdprData.termsUrl}
>
  <App />
</GDPRProvider>
```
