import { Spinner } from 'base/Spinner'
import clsx from 'clsx'
import styles from './Button.module.scss'
import type { ButtonTypes } from './Button.types'

export function Button({
  ref,
  title,
  disabled,
  children,
  className,
  appearance,
  contrast,
  loading = false,
  type = 'button',
  variant,
  ...rest
}: ButtonTypes) {
  const isStyled = variant || appearance

  const classList = clsx(
    isStyled && styles.styled,
    variant && styles[`variant-${variant}`],
    appearance && styles[`appearance-${appearance}`],
    contrast && styles.contrast,
    className
  )

  return (
    <button
      ref={ref}
      type={type}
      title={title}
      className={classList}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner inline /> : (children ?? title)}
    </button>
  )
}
