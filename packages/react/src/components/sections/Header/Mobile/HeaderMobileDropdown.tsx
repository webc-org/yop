import { useEffect, useId, useRef, useState } from 'react'
import clsx from 'clsx'
import { Button } from 'components'
import { ChevronDown } from 'lucide-react'
import styles from '../Header.module.scss'
import type { HeaderMobileDropdownTypes } from '../Header.types'

export function HeaderMobileDropdown({
  ref,
  children,
  label,
  baseId,
  className,
  ...rest
}: HeaderMobileDropdownTypes) {
  const [isExpanded, setIsExpanded] = useState(false)
  const generatedId = useId()
  const id = baseId || generatedId
  const dropdownId = `mobile-nav-content-${id}`
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (dropdownRef.current) {
      dropdownRef.current.inert = !isExpanded
    }
  }, [isExpanded])

  return (
    <div
      ref={ref}
      className={clsx(styles.mobileDropdownWrapper, className)}
      {...rest}
    >
      <Button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={dropdownId}
        className={clsx(
          styles.mobileDropdownTrigger,
          isExpanded && styles.isOpen
        )}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {label}
        <ChevronDown
          size={20}
          aria-hidden="true"
          className={clsx(
            styles.chevron,
            isExpanded && styles.chevronOpen
          )}
        />
      </Button>

      <div
        inert
        id={dropdownId}
        ref={dropdownRef}
        className={clsx(
          styles.mobileDropdown,
          isExpanded && styles.isOpen
        )}
      >
        <div className={styles.mobileDropdownInner}>{children}</div>
      </div>
    </div>
  )
}
