import clsx from 'clsx'
import { Button } from 'components'
import { ChevronDown } from 'lucide-react'
import { useHeaderDropdown } from '../useHeaderDropdown'
import styles from '../Header.module.scss'
import type { HeaderMainDropdownTypes } from '../Header.types'

export function HeaderMainDropdown({
  children,
  label,
  href,
  as,
  mega = false,
  current = false,
  className,
  ...rest
}: HeaderMainDropdownTypes) {
  const isLink = Boolean(href)
  const TriggerComp = href ? as || 'a' : Button

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
      className={clsx(
        styles.mainDropdownWrapper,
        mega && styles.mainDropdownHasMega,
        current && styles.mainDropdownCurrent,
        className
      )}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocusCapture={handleFocus}
      onBlur={handleBlur}
      {...rest}
    >
      <TriggerComp
        ref={triggerRef}
        href={href}
        type={isLink ? undefined : 'button'}
        tabIndex={isLink && current ? -1 : undefined}
        className={clsx(
          styles.mainDropdownTrigger,
          current && styles.mainDropdownTriggerActive
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-current={current ? 'page' : undefined}
        onClick={isLink ? undefined : () => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        {label}
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
        />
      </TriggerComp>

      <div
        inert
        role="menu"
        ref={dropdownRef}
        className={clsx(
          mega ? styles.megaMenu : styles.mainDropdown,
          isOpen && styles.isOpen
        )}
      >
        <div
          className={
            mega ? styles.megaMenuInner : styles.mainDropdownInner
          }
        >
          {children}
        </div>
      </div>
    </div>
  )
}
