import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useModals } from '../Modal/ModalsContext'
import { GDPRModal } from './GDPR'
import type {
  GDPRCategory,
  GDPRConsent,
  GDPRContextValue,
  GDPRProviderTypes,
  GDPRStrings,
} from './GDPR.types'

const GDPRContext = createContext<GDPRContextValue | undefined>(undefined)

const DEFAULT_CATEGORIES: GDPRCategory[] = [
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

const DEFAULT_STRINGS: GDPRStrings = {
  title: 'Cookie Settings',
  description:
    'We use cookies to operate this site. Additional cookies are set only with your consent.',
  acceptAll: 'Accept All',
  necessaryOnly: 'Necessary Only',
  confirmSelections: 'Confirm Selections',
  alwaysActive: 'Always Active',
  footerText:
    'By confirming, you accept our Privacy Notice and Terms of Use.',
  gpcNotice:
    'Global Privacy Control signal detected. Non-essential cookies are disabled by default.',
  privacyPolicyLabel: 'Privacy Policy',
  termsLabel: 'Terms of Use',
  toggleLabel: 'Toggle {label}',
}

function getStoredConsent(key: string): GDPRConsent | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function storeConsent(key: string, consent: GDPRConsent) {
  try {
    localStorage.setItem(key, JSON.stringify(consent))
  } catch {
    // localStorage unavailable
  }
}

function detectGPC(): boolean {
  if (typeof navigator === 'undefined') return false
  return !!(navigator as Navigator & { globalPrivacyControl?: boolean })
    .globalPrivacyControl
}

export function buildConsent(
  categories: GDPRCategory[],
  allEnabled: boolean
): GDPRConsent {
  const consent: GDPRConsent = {}
  for (const cat of categories) {
    consent[cat.id] = cat.required ? true : allEnabled
  }
  return consent
}

export function GDPRProvider({
  children,
  categories = DEFAULT_CATEGORIES,
  strings: stringOverrides,
  storageKey = 'pushui-gdpr',
  autoOpen = true,
  respectGPC = true,
  modalWidth = '650px',
  privacyPolicyUrl,
  termsUrl,
  onConsentChange,
}: GDPRProviderTypes) {
  const { addModal, removeModal } = useModals()
  const modalIdRef = useRef<number | null>(null)
  const isGPCEnabled = useMemo(
    () => respectGPC && detectGPC(),
    [respectGPC]
  )
  const strings = useMemo(
    () => ({ ...DEFAULT_STRINGS, ...stringOverrides }),
    [stringOverrides]
  )

  const [consent, setConsent] = useState<GDPRConsent>(() => {
    const stored = getStoredConsent(storageKey)
    if (stored) return stored
    if (isGPCEnabled) return buildConsent(categories, false)
    return buildConsent(categories, false)
  })

  const [hasConsented, setHasConsented] = useState(
    () => getStoredConsent(storageKey) !== null
  )

  const saveConsent = useCallback(
    (newConsent: GDPRConsent) => {
      setConsent(newConsent)
      setHasConsented(true)
      storeConsent(storageKey, newConsent)
      onConsentChange?.(newConsent)
      if (modalIdRef.current !== null) {
        removeModal(modalIdRef.current)
        modalIdRef.current = null
      }
    },
    [storageKey, onConsentChange, removeModal]
  )

  const openSettings = useCallback(() => {
    const id = Date.now()
    modalIdRef.current = id
    addModal({
      id,
      title: strings.title,
      width: modalWidth,
      children: (
        <GDPRModal
          categories={categories}
          strings={strings}
          consent={consent}
          isGPCEnabled={isGPCEnabled}
          privacyPolicyUrl={privacyPolicyUrl}
          termsUrl={termsUrl}
          onSave={saveConsent}
        />
      ),
    })
  }, [
    addModal,
    categories,
    strings,
    consent,
    isGPCEnabled,
    modalWidth,
    privacyPolicyUrl,
    termsUrl,
    saveConsent,
  ])

  useEffect(() => {
    if (autoOpen && !hasConsented) {
      openSettings()
    }
  }, [])

  const hasCategory = useCallback((id: string) => !!consent[id], [consent])

  const value = useMemo<GDPRContextValue>(
    () => ({
      consent,
      hasConsented,
      isGPCEnabled,
      openSettings,
      hasCategory,
    }),
    [consent, hasConsented, isGPCEnabled, openSettings, hasCategory]
  )

  return (
    <GDPRContext.Provider value={value}>{children}</GDPRContext.Provider>
  )
}

export function useGDPR() {
  const context = useContext(GDPRContext)

  if (!context) {
    throw new Error('useGDPR must be used within a GDPRProvider')
  }

  return context
}
