import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react'

export type HeaderTextColor = 'light' | 'dark' | undefined
export type HeaderOverlay = 'light' | 'dark' | undefined

export type HeaderTypes = ComponentPropsWithRef<'header'> & {
  children: ReactNode
  baseId?: string
  transparent?: boolean
  textColor?: HeaderTextColor
  overlayTop?: HeaderOverlay
  overlayMain?: HeaderOverlay
}

export type HeaderTopTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
  containerClassName?: string
}

export type HeaderTopNavTypes = ComponentPropsWithRef<'nav'> & {
  children: ReactNode
  'aria-label'?: string
}

export type HeaderTopDropdownTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
  label: ReactNode
  href?: string
  as?: ElementType
  current?: boolean
}

export type HeaderMainTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
  containerClassName?: string
}

export type HeaderMainLogoTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
}

export type HeaderMainNavTypes = ComponentPropsWithRef<'nav'> & {
  children: ReactNode
  'aria-label'?: string
}

export type HeaderMainDropdownTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
  label: ReactNode
  href?: string
  as?: ElementType
  mega?: boolean
  current?: boolean
}

export type HeaderMobileTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
}

export type HeaderMobileLogoTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
}

export type HeaderMobileBarTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
}

export type HeaderMobileToggleTypes = Omit<
  ComponentPropsWithRef<'button'>,
  'children'
> & {
  label?: string
  closeLabel?: string
  menuLabel?: string
}

export type HeaderMobileMenuTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
  'aria-label'?: string
}

export type HeaderMobileTopTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
  'aria-label'?: string
}

export type HeaderMobileNavTypes = ComponentPropsWithRef<'nav'> & {
  children: ReactNode
  'aria-label'?: string
}

export type HeaderMobileDropdownTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
  label: ReactNode
  baseId?: string
}

export type HeaderTopLinkTypes = ComponentPropsWithRef<'a'> & {
  asChild?: boolean
  children: ReactNode
  current?: boolean
}

export type HeaderTopDropdownLinkTypes = ComponentPropsWithRef<'a'> & {
  asChild?: boolean
  children: ReactNode
  current?: boolean
}

export type HeaderMainLinkTypes = ComponentPropsWithRef<'a'> & {
  asChild?: boolean
  children: ReactNode
  current?: boolean
  icon?: boolean
}

export type HeaderMainDropdownLinkTypes = ComponentPropsWithRef<'a'> & {
  asChild?: boolean
  children: ReactNode
  current?: boolean
}

export type HeaderMobileLinkTypes = ComponentPropsWithRef<'a'> & {
  asChild?: boolean
  children: ReactNode
  current?: boolean
}

export type HeaderMobileDropdownLinkTypes = ComponentPropsWithRef<'a'> & {
  asChild?: boolean
  children: ReactNode
  current?: boolean
}

export type HeaderNavTypes = 'main' | 'top' | 'mobile'

export type HeaderContextTypes = {
  isOpen: boolean
  toggle: () => void
  mobileMenuId: string
  mobileToggleId: string
  registerNav: (type: HeaderNavTypes) => number
  getNavCount: (type: HeaderNavTypes) => number
  isTransparent: boolean
  textColor: HeaderTextColor
}
