import { useState } from 'react'
import { Badge } from 'components/base/Badge/Badge'
import { Link } from 'components/base/Link/Link'
import { Button } from 'components/form/Button/Button'
import { Switch } from 'components/form/Switch/Switch'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../Accordion/Accordion'
import { buildConsent } from './GDPRContext'
import styles from './GDPR.module.scss'
import type { GDPRCategory, GDPRConsent, GDPRStrings } from './GDPR.types'

type GDPRModalProps = {
  categories: GDPRCategory[]
  strings: GDPRStrings
  consent: GDPRConsent
  isGPCEnabled: boolean
  privacyPolicyUrl?: string
  termsUrl?: string
  onSave: (consent: GDPRConsent) => void
}

export function GDPRModal({
  categories,
  strings,
  consent: initialConsent,
  isGPCEnabled,
  privacyPolicyUrl,
  termsUrl,
  onSave,
}: GDPRModalProps) {
  const [consent, setConsent] = useState<GDPRConsent>({
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
      <p className={styles.description}>{strings.description}</p>

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
                    onChange={(checked) => toggleCategory(cat.id, checked)}
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
          onClick={handleAcceptAll}
        >
          {strings.acceptAll}
        </Button>
        <Button
          className={styles.button}
          appearance="button"
          variant="default"
          onClick={handleNecessaryOnly}
        >
          {strings.necessaryOnly}
        </Button>
        <Button
          className={styles.button}
          appearance="button"
          variant="default"
          onClick={handleConfirm}
        >
          {strings.confirmSelections}
        </Button>
      </div>

      {(privacyPolicyUrl || termsUrl) && (
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
      )}
    </div>
  )
}
