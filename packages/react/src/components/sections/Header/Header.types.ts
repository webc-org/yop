import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react'

export type HeaderTextColor = 'light' | 'dark' | undefined

export type HeaderTypes = ComponentPropsWithRef<'header'> & {
  children: ReactNode
  baseId?: string
  isOverlay?: boolean
  textColor?: HeaderTextColor
}

export type HeaderDesktopTopMenuTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
  containerClassName?: string
  bgColor?: string
  bgOpacity?: string
  textColor?: HeaderTextColor
}

export type HeaderDesktopTopMenuNavTypes = ComponentPropsWithRef<'nav'> & {
  children: ReactNode
  'aria-label'?: string
}

export type HeaderDesktopTopMenuDropdownTypes =
  ComponentPropsWithRef<'div'> & {
    children: ReactNode
    label: ReactNode
    href?: string
    as?: ElementType
    current?: boolean
  }

export type HeaderDesktopMainMenuTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
  containerClassName?: string
  bgColor?: string
  bgOpacity?: string
  textColor?: HeaderTextColor
}

export type HeaderDesktopMainMenuLogoTypes =
  ComponentPropsWithRef<'div'> & {
    children: ReactNode
  }

export type HeaderDesktopMainMenuNavTypes =
  ComponentPropsWithRef<'nav'> & {
    children: ReactNode
    'aria-label'?: string
  }

export type HeaderDesktopMainMenuDropdownTypes =
  ComponentPropsWithRef<'div'> & {
    children: ReactNode
    label: ReactNode
    href?: string
    as?: ElementType
    mega?: boolean
    current?: boolean
  }

export type HeaderMobileRootTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
}

export type HeaderMobileTopMenuLogoTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
}

export type HeaderMobileTopMenuTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
  bgColor?: string
  bgOpacity?: string
  textColor?: HeaderTextColor
  containerClassName?: string
}

export type HeaderMobileTopMenuToggleTypes = Omit<
  ComponentPropsWithRef<'button'>,
  'children'
> & {
  label?: string
  closeLabel?: string
  menuLabel?: string
}

export type HeaderMobileMainMenuTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
  'aria-label'?: string
  bgColor?: string
  textColor?: HeaderTextColor
}

export type HeaderMobileMainMenuTopTypes = ComponentPropsWithRef<'div'> & {
  children: ReactNode
  'aria-label'?: string
}

export type HeaderMobileMainMenuNavTypes = ComponentPropsWithRef<'nav'> & {
  children: ReactNode
  'aria-label'?: string
}

export type HeaderMobileMainMenuDropdownTypes =
  ComponentPropsWithRef<'div'> & {
    children: ReactNode
    label: ReactNode
    baseId?: string
  }

export type HeaderDesktopTopMenuLinkTypes = ComponentPropsWithRef<'a'> & {
  asChild?: boolean
  children: ReactNode
  current?: boolean
}

export type HeaderDesktopTopMenuDropdownLinkTypes =
  ComponentPropsWithRef<'a'> & {
    asChild?: boolean
    children: ReactNode
    current?: boolean
  }

export type HeaderDesktopMainMenuLinkTypes = ComponentPropsWithRef<'a'> & {
  asChild?: boolean
  children: ReactNode
  current?: boolean
  icon?: boolean
}

export type HeaderDesktopMainMenuDropdownLinkTypes =
  ComponentPropsWithRef<'a'> & {
    asChild?: boolean
    children: ReactNode
    current?: boolean
  }

export type HeaderMobileMainMenuLinkTypes = ComponentPropsWithRef<'a'> & {
  asChild?: boolean
  children: ReactNode
  current?: boolean
}

export type HeaderMobileMainMenuDropdownLinkTypes =
  ComponentPropsWithRef<'a'> & {
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
  isScrolled: boolean
  isOverlay: boolean
  textColor: HeaderTextColor
}
