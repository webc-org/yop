import clsx from 'clsx'
import { useHeaderNavLabel } from '../useHeaderNavLabel'
import styles from '../Header.module.scss'
import type { HeaderDesktopMainMenuNavTypes } from '../Header.types'

export function HeaderDesktopMainMenuNav({
  ref,
  children,
  className,
  'aria-label': ariaLabel,
  ...rest
}: HeaderDesktopMainMenuNavTypes) {
  const label = useHeaderNavLabel('main', ariaLabel)

  return (
    <nav
      ref={ref}
      aria-label={label}
      className={clsx(styles.mainNav, className)}
      {...rest}
    >
      {children}
    </nav>
  )
}
