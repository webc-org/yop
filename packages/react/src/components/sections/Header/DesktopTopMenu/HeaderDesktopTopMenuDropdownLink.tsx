import clsx from 'clsx'
import { Slot } from 'utils'
import styles from '../Header.module.scss'
import type { HeaderDesktopTopMenuDropdownLinkTypes } from '../Header.types'

export function HeaderDesktopTopMenuDropdownLink({
  asChild,
  children,
  className,
  current,
  ...props
}: HeaderDesktopTopMenuDropdownLinkTypes) {
  const Comp = asChild ? Slot : 'a'
  return (
    <Comp
      className={clsx(
        styles.topDropdownLink,
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
