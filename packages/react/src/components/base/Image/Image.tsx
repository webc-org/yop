import { useId } from 'react'
import clsx from 'clsx'
import { Slot } from 'utils'
import styles from './Image.module.scss'
import type { ImageTypes } from './Image.types'

export function Image({
  ref,
  className,
  alt,
  caption,
  asChild,
  children,
  ...props
}: ImageTypes) {
  const captionId = useId()

  const imageClass = clsx(styles.image, !caption && className)

  const img = asChild ? (
    <Slot className={imageClass}>{children}</Slot>
  ) : (
    <img ref={ref} className={imageClass} alt={alt} {...props} />
  )

  if (caption) {
    return (
      <figure
        role="group"
        aria-labelledby={captionId}
        className={clsx(styles.figure, className)}
      >
        {img}
        <figcaption id={captionId} className={styles.caption}>
          {caption}
        </figcaption>
      </figure>
    )
  }

  return img
}
