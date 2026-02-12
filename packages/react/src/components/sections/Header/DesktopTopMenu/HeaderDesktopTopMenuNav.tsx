import clsx from 'clsx'
import { useHeaderNavLabel } from '../useHeaderNavLabel'
import styles from '../Header.module.scss'
import type { HeaderDesktopTopMenuNavTypes } from '../Header.types'

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
      className={clsx(styles.topNav, className)}
      {...rest}
    >
      {children}
    </nav>
  )
}
