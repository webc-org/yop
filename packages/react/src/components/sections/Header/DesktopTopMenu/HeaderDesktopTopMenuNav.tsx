import clsx from 'clsx'
import { useHeaderNavLabel } from '../useHeaderNavLabel'
import type { HeaderDesktopTopMenuNavTypes } from './HeaderDesktopTopMenu.types'
import styles from './headerDesktopTop.module.scss'

export function HeaderDesktopTopMenuNav({
  ref,
  children,
  className,
  'aria-label': ariaLabel,
  ...rest
}: HeaderDesktopTopMenuNavTypes) {
  const label = useHeaderNavLabel('top', ariaLabel)

  return (
    <nav
      ref={ref}
      aria-label={label}
      className={clsx(styles.nav, className)}
      {...rest}
    >
      {children}
    </nav>
  )
}
