import type { CSSProperties } from 'react'
import clsx from 'clsx'
import { useHeader } from '../HeaderContext'
import type { HeaderDesktopTopMenuTypes } from './HeaderDesktopTopMenu.types'
import styles from './headerDesktopTop.module.scss'

export function HeaderDesktopTopMenu({
  ref,
  children,
  className,
  containerClassName,
  style,
  ...rest
}: HeaderDesktopTopMenuTypes) {
  const { isScrolled, textColor, desktop } = useHeader()
  const opacity = isScrolled ? '1' : desktop.top.bgOpacity
  const customStyles = {
    ...style,
    '--header-desktop-top-bg': desktop.top.bgColor,
    '--header-desktop-top-opacity': opacity,
  } as CSSProperties

  return (
    <div
      ref={ref}
      style={customStyles}
      className={clsx(
        styles.menu,
        textColor === 'dark' && styles.textDark,
        textColor === 'light' && styles.textLight,
        className
      )}
      {...rest}
    >
      <div className={clsx(styles.container, containerClassName)}>
        {children}
      </div>
    </div>
  )
}
