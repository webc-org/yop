import { useState } from 'react'
import { Badge, Link, RichText } from 'components/base'
import { Button, Switch } from 'components/form'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../Accordion'
import { buildConsent } from './GdprContext'
import styles from './Gdpr.module.scss'
import type { GdprCategory, GdprConsent, GdprStrings } from './Gdpr.types'

type GdprModalProps = {
  categories: GdprCategory[]
  strings: GdprStrings
  consent: GdprConsent
  isGPCEnabled: boolean
  privacyPolicyUrl?: string
  termsUrl?: string
  onSave: (consent: GdprConsent) => void
}

type FooterProps = {
  strings: GdprStrings
  privacyPolicyUrl?: string
  termsUrl?: string
}

type IntroProps = {
  strings: GdprStrings
  isGPCEnabled: boolean
  onAcceptAll: () => void
  onNecessaryOnly: () => void
  onMoreChoices: () => void
}

type PreferencesProps = {
  categories: GdprCategory[]
  strings: GdprStrings
  consent: GdprConsent
  isGPCEnabled: boolean
  onToggle: (id: string, checked: boolean) => void
  onAcceptAll: () => void
  onNecessaryOnly: () => void
  onConfirm: () => void
}

function Footer({ strings, privacyPolicyUrl, termsUrl }: FooterProps) {
  if (!privacyPolicyUrl && !termsUrl) return null

  return (
    <p className={styles.footer}>
      {strings.footerText}

      {privacyPolicyUrl && ' '}

      {privacyPolicyUrl && (
        <Link
          href={privacyPolicyUrl}
          appearance="underline"
          target="_blank"
          rel="noopener"
          className="fs-2"
        >
          {strings.privacyPolicyLabel}
        </Link>
      )}

      {termsUrl && ' • '}

      {termsUrl && (
        <Link
          href={termsUrl}
          appearance="underline"
          target="_blank"
          rel="noopener"
          className="fs-2"
        >
          {strings.termsLabel}
        </Link>
      )}
    </p>
  )
}

function Intro({
  strings,
  isGPCEnabled,
  onAcceptAll,
  onNecessaryOnly,
  onMoreChoices,
}: IntroProps) {
  return (
    <>
      <RichText
        html={strings.description}
        className={styles.description}
      />

      {isGPCEnabled && (
        <p className={styles.gpcNotice}>{strings.gpcNotice}</p>
      )}

      <div className={styles.bannerActions}>
        <Button
          className={styles.button}
          appearance="button"
          variant="primary"
          onClick={onAcceptAll}
        >
          {strings.acceptAll}
        </Button>
        <Button
          className={styles.button}
          appearance="outline"
          variant="default"
          onClick={onNecessaryOnly}
        >
          {strings.necessaryOnly}
        </Button>
        <Button
          appearance="outline"
          variant="default"
          onClick={onMoreChoices}
        >
          {strings.moreChoices}
        </Button>
      </div>
    </>
  )
}

function Preferences({
  categories,
  strings,
  consent,
  isGPCEnabled,
  onToggle,
  onAcceptAll,
  onNecessaryOnly,
  onConfirm,
}: PreferencesProps) {
  return (
    <>
      <RichText
        html={strings.preferencesDescription}
        className={styles.description}
      />

      {isGPCEnabled && (
        <p className={styles.gpcNotice}>{strings.gpcNotice}</p>
      )}

      <Accordion type="multiple" className={styles.categories}>
        {categories.map((cat) => (
          <AccordionItem key={cat.id} value={cat.id}>
            <div className={styles.categoryRow}>
              <AccordionTrigger className={styles.categoryTrigger}>
                {cat.label}
              </AccordionTrigger>

              <div className={styles.categoryControl}>
                {cat.required ? (
                  <Badge className={styles.badge} variant="info">
                    {strings.alwaysActive}
                  </Badge>
                ) : (
                  <Switch
                    checked={consent[cat.id] ?? false}
                    onChange={(checked) => onToggle(cat.id, checked)}
                    aria-label={strings.toggleLabel.replace(
                      '{label}',
                      cat.label
                    )}
                  />
                )}
              </div>
            </div>

            <AccordionContent>{cat.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className={styles.actions}>
        <Button
          className={styles.button}
          appearance="button"
          variant="primary"
          onClick={onConfirm}
        >
          {strings.confirmSelections}
        </Button>
        <Button
          className={styles.button}
          appearance="outline"
          variant="default"
          onClick={onNecessaryOnly}
        >
          {strings.necessaryOnly}
        </Button>
        <Button
          className={styles.button}
          appearance="outline"
          variant="default"
          onClick={onAcceptAll}
        >
          {strings.acceptAll}
        </Button>
      </div>
    </>
  )
}

export function GdprModal({
  categories,
  strings,
  consent: initialConsent,
  isGPCEnabled,
  privacyPolicyUrl,
  termsUrl,
  onSave,
}: GdprModalProps) {
  const [view, setView] = useState<'intro' | 'preferences'>('intro')
  const [consent, setConsent] = useState<GdprConsent>({
    ...initialConsent,
  })

  const toggleCategory = (id: string, checked: boolean) => {
    setConsent((prev) => ({ ...prev, [id]: checked }))
  }

  const handleAcceptAll = () => onSave(buildConsent(categories, true))
  const handleNecessaryOnly = () => onSave(buildConsent(categories, false))
  const handleConfirm = () => onSave(consent)

  return (
    <div className={styles.gdpr}>
      {view === 'intro' ? (
        <Intro
          strings={strings}
          isGPCEnabled={isGPCEnabled}
          onAcceptAll={handleAcceptAll}
          onNecessaryOnly={handleNecessaryOnly}
          onMoreChoices={() => {
            setConsent(buildConsent(categories, true))
            setView('preferences')
          }}
        />
      ) : (
        <Preferences
          categories={categories}
          strings={strings}
          consent={consent}
          isGPCEnabled={isGPCEnabled}
          onToggle={toggleCategory}
          onAcceptAll={handleAcceptAll}
          onNecessaryOnly={handleNecessaryOnly}
          onConfirm={handleConfirm}
        />
      )}

      <Footer
        strings={strings}
        privacyPolicyUrl={privacyPolicyUrl}
        termsUrl={termsUrl}
      />
    </div>
  )
}
