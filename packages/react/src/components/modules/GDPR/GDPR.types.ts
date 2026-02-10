import type { ReactNode } from 'react'

export type GDPRCategoryId = string

export type GDPRCategory = {
  id: GDPRCategoryId
  label: string
  description: string
  required?: boolean
}

export type GDPRConsent = Record<GDPRCategoryId, boolean>

export type GDPRStrings = {
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
}

export type GDPRProviderTypes = {
  children: ReactNode
  categories?: GDPRCategory[]
  strings?: Partial<GDPRStrings>
  storageKey?: string
  autoOpen?: boolean
  respectGPC?: boolean
  modalWidth?: string
  privacyPolicyUrl?: string
  termsUrl?: string
  onConsentChange?: (consent: GDPRConsent) => void
}

export type GDPRContextValue = {
  consent: GDPRConsent
  hasConsented: boolean
  isGPCEnabled: boolean
  openSettings: () => void
  hasCategory: (id: GDPRCategoryId) => boolean
}
