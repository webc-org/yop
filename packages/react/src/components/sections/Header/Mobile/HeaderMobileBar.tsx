import type { CSSProperties } from 'react'
import clsx from 'clsx'
import { useHeader } from '../HeaderContext'
import styles from '../Header.module.scss'
import type { HeaderMobileBarTypes } from '../Header.types'

export function HeaderMobileBar({
  ref,
  children,
  className,
  bgColor = 'var(--color-white)',
  bgOpacity = '1',
  style,
  ...rest
}: HeaderMobileBarTypes) {
  const { isScrolled } = useHeader()
  const opacity = isScrolled ? '1' : bgOpacity
  const customStyles = {
    ...style,
    '--header-mobile-bg': bgColor,
    '--header-mobile-opacity': opacity,
  } as CSSProperties

  return (
    <div
      ref={ref}
      style={customStyles}
      className={clsx(styles.mobileBar, className)}
      {...rest}
    >
      {children}
    </div>
  )
}
