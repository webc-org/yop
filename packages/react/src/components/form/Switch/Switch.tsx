import { useId, useState } from 'react'
import clsx from 'clsx'
import styles from './Switch.module.scss'
import type { SwitchTypes } from './Switch.types'

export function Switch({
  label,
  checked,
  defaultChecked = false,
  onChange,
  ref,
  className,
  labelClassName,
  disabled = false,
  ...rest
}: SwitchTypes) {
  const id = useId()
  const [internalChecked, setInternalChecked] = useState(defaultChecked)

  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked : internalChecked

  const handleChange = (newChecked: boolean) => {
    if (!isControlled) {
      setInternalChecked(newChecked)
    }
    onChange?.(newChecked)
  }

  return (
    <label
      htmlFor={id}
      className={clsx(
        styles.wrapper,
        disabled && styles.disabled,
        className
      )}
      {...rest}
    >
      <input
        ref={ref}
        id={id}
        role="switch"
        type="checkbox"
        checked={isChecked}
        onChange={(e) => handleChange(e.target.checked)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleChange(!isChecked)
          }
        }}
        disabled={disabled}
        aria-checked={isChecked}
        className={styles.hiddenInput}
      />

      <span
        aria-hidden="true"
        className={clsx(styles.track, isChecked && styles.checked)}
      >
        <span className={styles.thumb} />
      </span>

      {label && (
        <span className={clsx(styles.label, labelClassName)}>{label}</span>
      )}
    </label>
  )
}
