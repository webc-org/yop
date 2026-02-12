import clsx from 'clsx'
import { Slot } from 'utils'
import styles from '../Header.module.scss'
import type { HeaderDesktopTopMenuLinkTypes } from '../Header.types'

export function HeaderDesktopTopMenuLink({
  asChild,
  children,
  className,
  current,
  ...props
}: HeaderDesktopTopMenuLinkTypes) {
  const Comp = asChild ? Slot : 'a'
  return (
    <Comp
      className={clsx(
        styles.topLink,
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
