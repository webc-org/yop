import clsx from 'clsx'
import { Button } from 'components'
import { ChevronDown } from 'lucide-react'
import { useHeaderDropdown } from '../useHeaderDropdown'
import styles from '../Header.module.scss'
import type { HeaderTopDropdownTypes } from '../Header.types'

export function HeaderTopDropdown({
  children,
  label,
  href,
  as,
  current = false,
  className,
  ...rest
}: HeaderTopDropdownTypes) {
  const isLink = Boolean(href)
  const Trigger = href ? as || 'a' : Button

  const {
    isOpen,
    setIsOpen,
    itemRef,
    triggerRef,
    dropdownRef,
    handleBlur,
    handleFocus,
    handleKeyDown,
  } = useHeaderDropdown(isLink)

  return (
    <div
      ref={itemRef}
      className={clsx(styles.topDropdownWrapper, className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocusCapture={handleFocus}
      onBlur={handleBlur}
      {...rest}
    >
      <Trigger
        ref={triggerRef}
        href={href}
        type={isLink ? undefined : 'button'}
        tabIndex={isLink && current ? -1 : undefined}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-current={current ? 'page' : undefined}
        className={styles.topDropdownTrigger}
        onClick={isLink ? undefined : () => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        {label}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
        />
      </Trigger>

      <div
        inert
        role="menu"
        ref={dropdownRef}
        className={clsx(styles.topDropdown, isOpen && styles.isOpen)}
      >
        <div className={styles.topDropdownInner}>{children}</div>
      </div>
    </div>
  )
}
