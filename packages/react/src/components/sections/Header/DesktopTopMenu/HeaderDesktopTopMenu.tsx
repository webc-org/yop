import type { CSSProperties } from 'react'
import clsx from 'clsx'
import { useHeader } from '../HeaderContext'
import styles from '../Header.module.scss'
import type { HeaderDesktopTopMenuTypes } from '../Header.types'

export function HeaderDesktopTopMenu({
  ref,
  children,
  className,
  containerClassName,
  bgColor = 'var(--color-grey-7)',
  bgOpacity = '1',
  textColor: textColorProp,
  style,
  ...rest
}: HeaderDesktopTopMenuTypes) {
  const { isScrolled, textColor: contextTextColor } = useHeader()
  const textColor = textColorProp ?? contextTextColor
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
      className={clsx(
        styles.topMenu,
        textColor === 'dark' && styles.textDark,
        textColor === 'light' && styles.textLight,
        className
      )}
      {...rest}
    >
      <div className={clsx(styles.topContainer, containerClassName)}>
        {children}
      </div>
    </div>
  )
}
