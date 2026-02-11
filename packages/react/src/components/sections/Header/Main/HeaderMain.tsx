import clsx from 'clsx'
import styles from '../Header.module.scss'
import type { HeaderMainTypes } from '../Header.types'

export function HeaderMain({
  ref,
  children,
  className,
  containerClassName,
  ...rest
}: HeaderMainTypes) {
  return (
    <div ref={ref} className={clsx(styles.mainBar, className)} {...rest}>
      <div className={clsx(styles.mainContainer, containerClassName)}>
        {children}
      </div>
    </div>
  )
}
