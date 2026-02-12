import clsx from 'clsx'
import styles from '../Header.module.scss'
import type { HeaderMobileTopMenuLogoTypes } from '../Header.types'

export function HeaderMobileTopMenuLogo({
  ref,
  children,
  className,
  ...rest
}: HeaderMobileTopMenuLogoTypes) {
  return (
    <div
      ref={ref}
      className={clsx(styles.mobileTopMenuLogo, className)}
      {...rest}
    >
      {children}
    </div>
  )
}
