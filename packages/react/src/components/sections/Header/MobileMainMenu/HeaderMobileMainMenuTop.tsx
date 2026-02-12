import clsx from 'clsx'
import styles from '../Header.module.scss'
import type { HeaderMobileMainMenuTopTypes } from '../Header.types'

export function HeaderMobileMainMenuTop({
  ref,
  className,
  children,
  ...rest
}: HeaderMobileMainMenuTopTypes) {
  return (
    <div
      ref={ref}
      className={clsx(styles.mobileMainMenuTop, className)}
      {...rest}
    >
      {children}
    </div>
  )
}
