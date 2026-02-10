import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useModals } from '../Modal'
import { GdprModal } from './Gdpr'
import { DEFAULT_CATEGORIES, DEFAULT_STRINGS } from './Gdpr.defaults'
import type {
  GdprCategory,
  GdprConsent,
  GdprContextValue,
  GdprProviderTypes,
} from './Gdpr.types'

const GdprContext = createContext<GdprContextValue | undefined>(undefined)

function getStoredConsent(key: string): GdprConsent | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function storeConsent(key: string, consent: GdprConsent) {
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
  categories: GdprCategory[],
  allEnabled: boolean
): GdprConsent {
  const consent: GdprConsent = {}
  for (const cat of categories) {
    consent[cat.id] = cat.required ? true : allEnabled
  }
  return consent
}

export function GdprProvider({
  children,
  categories = DEFAULT_CATEGORIES,
  strings: stringOverrides,
  storageKey = 'GDPR',
  autoOpen = true,
  respectGPC = true,
  modalWidth = '65rem',
  privacyPolicyUrl,
  termsUrl,
  onConsentChange,
}: GdprProviderTypes) {
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

  const [consent, setConsent] = useState<GdprConsent>(() => {
    const stored = getStoredConsent(storageKey)

    if (stored) return stored

    if (isGPCEnabled) return buildConsent(categories, false)

    return buildConsent(categories, false)
  })

  const [hasConsented, setHasConsented] = useState(
    () => getStoredConsent(storageKey) !== null
  )

  const saveConsent = useCallback(
    (newConsent: GdprConsent) => {
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
      hideCloseButton: true,
      children: (
        <GdprModal
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
  }, [autoOpen, hasConsented, openSettings])

  const hasCategory = useCallback((id: string) => !!consent[id], [consent])

  const value = useMemo<GdprContextValue>(
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
    <GdprContext.Provider value={value}>{children}</GdprContext.Provider>
  )
}

export function useGdpr() {
  const context = useContext(GdprContext)

  if (!context) {
    throw new Error('useGdpr must be used within a GdprProvider')
  }

  return context
}
