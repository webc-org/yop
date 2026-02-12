import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import { HeaderContext } from './HeaderContext'
import styles from './Header.module.scss'
import type { HeaderNavTypes, HeaderTypes } from './Header.types'

export function HeaderRoot({
  ref,
  baseId,
  children,
  className,
  isOverlay = false,
  textColor,
  style,
  ...rest
}: HeaderTypes) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [navCounts, setNavCounts] = useState({
    top: 0,
    main: 0,
    mobile: 0,
  })
  const navIndexes = useRef({ top: 0, main: 0, mobile: 0 })
  const generatedId = useId()
  const id = baseId || generatedId
  const mobileMenuId = `header-mobile-menu-${id}`
  const mobileToggleId = `header-mobile-toggle-${id}`

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  const registerNav = useCallback((type: HeaderNavTypes) => {
    navIndexes.current[type] += 1
    const index = navIndexes.current[type]
    setNavCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }))
    return index
  }, [])

  const getNavCount = useCallback(
    (type: HeaderNavTypes) => navCounts[type],
    [navCounts]
  )

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        document.getElementById(mobileToggleId)?.focus()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, mobileToggleId])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      toggle,
      mobileMenuId,
      mobileToggleId,
      registerNav,
      getNavCount,
      isScrolled,
      isOverlay,
      textColor,
    }),
    [
      isOpen,
      mobileMenuId,
      mobileToggleId,
      toggle,
      registerNav,
      getNavCount,
      isScrolled,
      isOverlay,
      textColor,
    ]
  )

  return (
    <HeaderContext.Provider value={value}>
      <header
        ref={ref}
        data-header-root
        className={clsx(
          styles.header,
          textColor === 'dark' && styles.textDark,
          textColor === 'light' && styles.textLight,
          className
        )}
        style={style}
        {...rest}
      >
        <div
          className={clsx(styles.mobileOverlay, isOpen && styles.isOpen)}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
        {children}
      </header>
    </HeaderContext.Provider>
  )
}
