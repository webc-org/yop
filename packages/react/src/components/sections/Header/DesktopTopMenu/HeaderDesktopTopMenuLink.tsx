import clsx from 'clsx'
import { Slot } from 'utils'
import type { HeaderDesktopTopMenuLinkTypes } from './HeaderDesktopTopMenu.types'
import styles from './headerDesktopTop.module.scss'

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
      className={clsx(styles.link, current && styles.current, className)}
      aria-current={current ? 'page' : undefined}
      {...props}
    >
      {children}
    </Comp>
  )
}
