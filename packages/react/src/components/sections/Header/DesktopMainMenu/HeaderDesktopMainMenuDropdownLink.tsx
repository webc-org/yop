import clsx from 'clsx'
import { Slot } from 'utils'
import styles from '../Header.module.scss'
import type { HeaderDesktopMainMenuDropdownLinkTypes } from '../Header.types'

export function HeaderDesktopMainMenuDropdownLink({
  asChild,
  children,
  className,
  current,
  ...props
}: HeaderDesktopMainMenuDropdownLinkTypes) {
  const Comp = asChild ? Slot : 'a'
  return (
    <Comp
      className={clsx(
        styles.mainDropdownLink,
        current && styles.current,
        className
      )}
      aria-current={current ? 'page' : undefined}
      {...props}
    >
      {children}
    </Comp>
  )
}
