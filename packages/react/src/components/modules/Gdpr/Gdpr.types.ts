import type { ReactNode } from 'react'

export type GdprCategoryId = string

export type GdprCategory = {
  id: GdprCategoryId
  label: string
  description: string
  required?: boolean
}

export type GdprConsent = Record<GdprCategoryId, boolean>

export type GdprStrings = {
  title: string
  description: string
  acceptAll: string
  necessaryOnly: string
  confirmSelections: string
  alwaysActive: string
  footerText: string
  gpcNotice: string
  privacyPolicyLabel: string
  termsLabel: string
  toggleLabel: string
  moreChoices: string
  preferencesDescription: string
}

export type GdprProviderTypes = {
  children: ReactNode
  categories?: GdprCategory[]
  strings?: Partial<GdprStrings>
  storageKey?: string
  autoOpen?: boolean
  respectGPC?: boolean
  modalWidth?: string
  privacyPolicyUrl?: string
  termsUrl?: string
  onConsentChange?: (consent: GdprConsent) => void
}

export type GdprContextValue = {
  consent: GdprConsent
  hasConsented: boolean
  isGPCEnabled: boolean
  openSettings: () => void
  hasCategory: (id: GdprCategoryId) => boolean
}
