import clsx from 'clsx'
import { Button } from 'components/form'
import { ChevronDown } from 'lucide-react'
import { useHeaderDropdown } from '../useHeaderDropdown'
import type { HeaderDesktopTopMenuDropdownTypes } from './HeaderDesktopTopMenu.types'
import styles from './headerDesktopTop.module.scss'

export function HeaderDesktopTopMenuDropdown({
  children,
  label,
  href,
  as,
  current = false,
  className,
  ...rest
}: HeaderDesktopTopMenuDropdownTypes) {
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
      className={clsx(styles.dropdownWrapper, className)}
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
        className={styles.dropdownTrigger}
        onClick={isLink ? undefined : () => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        {label}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={clsx(styles.chevron, isOpen && styles.isOpen)}
        />
      </Trigger>

      <div
        inert
        role="menu"
        ref={dropdownRef}
        className={clsx(styles.dropdown, isOpen && styles.isOpen)}
      >
        <div className={styles.dropdownInner}>{children}</div>
      </div>
    </div>
  )
}
