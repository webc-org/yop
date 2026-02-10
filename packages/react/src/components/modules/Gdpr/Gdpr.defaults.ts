import type { GdprCategory, GdprStrings } from './Gdpr.types'

export const DEFAULT_CATEGORIES: GdprCategory[] = [
  {
    id: 'necessary',
    label: 'Necessary Cookies',
    description: 'Required for the site to function. Cannot be disabled.',
    required: true,
  },
  {
    id: 'targeting',
    label: 'Targeting Cookies',
    description: 'Used for relevant ads and social media features.',
  },
  {
    id: 'functional',
    label: 'Functional Cookies',
    description: 'Enable enhanced functionality and personalization.',
  },
  {
    id: 'performance',
    label: 'Performance Cookies',
    description: 'Help measure and improve site performance.',
  },
]

export const DEFAULT_STRINGS: GdprStrings = {
  title: 'Cookie Settings',
  description: `We use required cookies to keep this site running. We also use functional, performance, and targeting cookies to personalise content, measure traffic, and deliver relevant ads. Click "Accept All" to enable all cookies, "Necessary Only" to decline optional ones, or "More Choices" for granular control. You can update your preferences at any time. Learn more in our <a href="/privacy">privacy policy</a>.`,
  acceptAll: 'Accept All',
  necessaryOnly: 'Necessary Only',
  confirmSelections: 'Confirm Selections',
  alwaysActive: 'Always Active',
  footerText: `By confirming, you accept our Privacy Notice and Terms of Use.`,
  gpcNotice: `Global Privacy Control signal detected. Non-essential cookies are disabled by default.`,
  privacyPolicyLabel: 'Privacy Policy',
  termsLabel: 'Terms of Use',
  toggleLabel: 'Toggle {label}',
  moreChoices: 'More Choices',
  preferencesDescription: `Manage your cookie preferences below. You can enable or disable different categories of cookies.`,
}
