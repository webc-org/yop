import { useEffect, useEffectEvent, useRef, useState } from 'react'
import clsx from 'clsx'
import { Button, Title } from 'components'
import { X } from 'lucide-react'
import styles from './Modal.module.scss'
import type { ModalTypes } from './Modal.types'

export function Modal({
  id,
  title,
  width,
  children,
  onRemove,
  duration = Infinity,
  closeOnBackdrop = false,
  closeLabel = 'Close modal',
  hideCloseButton = false,
}: ModalTypes) {
  const [active, setActive] = useState(false)
  const [removing, setRemoving] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const modalTitleId = `modal-title-${id}`
  const modalDescId = `modal-desc-${id}`

  const handleRemove = useEffectEvent(() => {
    previousFocusRef.current?.focus()
    setRemoving(true)
    setTimeout(() => id && onRemove(id), 200)
  })

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      handleRemove()
    }
  }

  // Initial setup
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement
    modalRef.current
      ?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      ?.focus()
    const timer = setTimeout(() => setActive(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Focus trap
  useEffect(() => {
    if (!active || removing) return

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      if (!focusableElements || focusableElements.length === 0) return

      const focusableArray = Array.from(focusableElements) as HTMLElement[]
      const lastIndex = focusableArray.length - 1
      const currentIndex = focusableArray.indexOf(
        document.activeElement as HTMLElement
      )

      e.preventDefault()

      if (e.shiftKey) {
        const prevIndex = currentIndex <= 0 ? lastIndex : currentIndex - 1
        focusableArray[prevIndex].focus()
      } else {
        const nextIndex = currentIndex >= lastIndex ? 0 : currentIndex + 1
        focusableArray[nextIndex].focus()
      }
    }

    document.addEventListener('keydown', handleFocusTrap)
    return () => document.removeEventListener('keydown', handleFocusTrap)
  }, [active, removing])

  // Escape key
  useEffect(() => {
    if (!active || removing || hideCloseButton) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleRemove()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [active, removing, hideCloseButton])

  // Auto-close duration
  useEffect(() => {
    if (duration === Infinity) return

    const timer = setTimeout(handleRemove, duration)
    return () => clearTimeout(timer)
  }, [duration])

  // Body scroll lock
  useEffect(() => {
    if (!active || removing) return

    const clientWidth = document.documentElement.clientWidth
    const scrollbarWidth = window.innerWidth - clientWidth

    document.documentElement.style.setProperty(
      '--scrollbar-width',
      `${scrollbarWidth}px`
    )
    document.body.classList.add('freeze')

    return () => {
      document.body.classList.remove('freeze')
      document.documentElement.style.removeProperty('--scrollbar-width')
    }
  }, [active, removing])

  return (
    <div
      className={clsx(
        styles.modalBackdrop,
        removing && styles.removing,
        active && !removing && styles.active
      )}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? modalTitleId : undefined}
        aria-describedby={modalDescId}
        ref={modalRef}
        className={clsx(
          styles.modal,
          removing && styles.removing,
          active && !removing && styles.active
        )}
        style={{ ...(width ? { width } : {}) }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className={styles.modalHeader} id={modalTitleId}>
            <Title level="h4">{title}</Title>
          </div>
        )}

        {!hideCloseButton && (
          <Button
            type="button"
            title={closeLabel}
            onClick={handleRemove}
            aria-label={closeLabel}
            className={styles.close}
          >
            <X size={16} aria-hidden />
          </Button>
        )}

        <div id={modalDescId} className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  )
}
