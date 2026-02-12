import clsx from 'clsx'
import styles from '../Header.module.scss'
import type { HeaderDesktopMainMenuLogoTypes } from '../Header.types'

export function HeaderDesktopMainMenuLogo({
  ref,
  children,
  className,
  ...rest
}: HeaderDesktopMainMenuLogoTypes) {
  return (
    <div ref={ref} className={clsx(styles.mainLogo, className)} {...rest}>
      {children}
    </div>
  )
}
