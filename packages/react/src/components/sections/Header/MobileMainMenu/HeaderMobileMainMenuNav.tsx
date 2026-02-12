import clsx from 'clsx'
import { useHeaderNavLabel } from '../useHeaderNavLabel'
import styles from '../Header.module.scss'
import type { HeaderMobileMainMenuNavTypes } from '../Header.types'

export function HeaderMobileMainMenuNav({
  ref,
  children,
  className,
  'aria-label': ariaLabel,
  ...rest
}: HeaderMobileMainMenuNavTypes) {
  const label = useHeaderNavLabel('mobile', ariaLabel)

  return (
    <nav
      ref={ref}
      aria-label={label}
      className={clsx(styles.mobileMainMenuNav, className)}
      {...rest}
    >
      {children}
    </nav>
  )
}
