import type { CSSProperties } from 'react'
import clsx from 'clsx'
import { useHeader } from '../HeaderContext'
import styles from '../Header.module.scss'
import type { HeaderTopTypes } from '../Header.types'

export function HeaderTop({
  ref,
  children,
  className,
  containerClassName,
  bgColor = 'var(--color-grey-7)',
  bgOpacity = '1',
  style,
  ...rest
}: HeaderTopTypes) {
  const { isScrolled } = useHeader()
  const opacity = isScrolled ? '1' : bgOpacity
  const customStyles = {
    ...style,
    '--header-top-bg': bgColor,
    '--header-top-opacity': opacity,
  } as CSSProperties

  return (
    <div
      ref={ref}
      style={customStyles}
      className={clsx(styles.topBar, className)}
      {...rest}
    >
      <div className={clsx(styles.topContainer, containerClassName)}>
        {children}
      </div>
    </div>
  )
}
