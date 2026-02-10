import clsx from 'clsx'
import { Slot } from 'utils'
import styles from './Link.module.scss'
import type { LinkTypes } from './Link.types'

export function Link({
  ref,
  href,
  title,
  disabled,
  children,
  className,
  appearance,
  contrast,
  variant,
  asChild,
  ...rest
}: LinkTypes) {
  const value = children ?? title
  const isStyled = variant || appearance

  const classList = clsx(
    isStyled && styles.styled,
    variant && styles[`variant-${variant}`],
    appearance && styles[`appearance-${appearance}`],
    contrast && styles.contrast,
    disabled && styles.disabled,
    className
  )

  if (asChild) {
    return (
      <Slot
        className={classList}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </Slot>
    )
  }

  return (
    <a
      ref={ref}
      href={disabled ? undefined : href}
      title={title}
      className={classList}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
      {...rest}
    >
      {value}
    </a>
  )
}
