import '@testing-library/jest-dom/vitest'

import userEvent from '@testing-library/user-event'
import { Link } from 'base/Link'
import { Button } from 'form/Button'
import { fireEvent, render, screen } from 'utils/Test'
import { describe, expect, it } from 'vitest'
import {
  HeaderDesktopMainMenu,
  HeaderDesktopMainMenuDropdown,
  HeaderDesktopMainMenuDropdownLink,
  HeaderDesktopMainMenuLink,
  HeaderDesktopMainMenuLogo,
  HeaderDesktopMainMenuNav,
  HeaderDesktopTopMenu,
  HeaderDesktopTopMenuDropdown,
  HeaderDesktopTopMenuDropdownLink,
  HeaderDesktopTopMenuLink,
  HeaderDesktopTopMenuNav,
  HeaderMobileMainMenu,
  HeaderMobileMainMenuDropdown,
  HeaderMobileMainMenuDropdownLink,
  HeaderMobileMainMenuLink,
  HeaderMobileRoot,
  HeaderMobileTopMenu,
  HeaderMobileTopMenuToggle,
  HeaderRoot,
} from './index'

describe('Header', () => {
  it('renders header with logo', () => {
    render(
      <HeaderRoot>
        <HeaderDesktopMainMenu>
          <HeaderDesktopMainMenuLogo>Logo</HeaderDesktopMainMenuLogo>
        </HeaderDesktopMainMenu>
      </HeaderRoot>
    )
    expect(screen.getByText('Logo')).toBeInTheDocument()
  })

  it('renders top bar', () => {
    render(
      <HeaderRoot>
        <HeaderDesktopTopMenu>
          <HeaderDesktopTopMenuNav>
            <HeaderDesktopTopMenuLink asChild>
              <Link href="#">Help</Link>
            </HeaderDesktopTopMenuLink>
          </HeaderDesktopTopMenuNav>
        </HeaderDesktopTopMenu>
        <HeaderDesktopMainMenu>
          <HeaderDesktopMainMenuLogo>Logo</HeaderDesktopMainMenuLogo>
        </HeaderDesktopMainMenu>
      </HeaderRoot>
    )
    expect(screen.getByText('Help')).toBeInTheDocument()
  })

  it('renders top bar item with dropdown', () => {
    render(
      <HeaderRoot>
        <HeaderDesktopTopMenu>
          <HeaderDesktopTopMenuNav>
            <HeaderDesktopTopMenuDropdown label="Language">
              <HeaderDesktopTopMenuDropdownLink asChild>
                <Link href="#">Option 1</Link>
              </HeaderDesktopTopMenuDropdownLink>
              <HeaderDesktopTopMenuDropdownLink asChild>
                <Link href="#">Option 2</Link>
              </HeaderDesktopTopMenuDropdownLink>
            </HeaderDesktopTopMenuDropdown>
          </HeaderDesktopTopMenuNav>
        </HeaderDesktopTopMenu>
        <HeaderDesktopMainMenu>
          <HeaderDesktopMainMenuLogo>Logo</HeaderDesktopMainMenuLogo>
        </HeaderDesktopMainMenu>
      </HeaderRoot>
    )

    const trigger = screen.getByText('Language').closest('button')!
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    // Use fireEvent to avoid mouseenter triggering first
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders nav with aria-label', () => {
    render(
      <HeaderRoot>
        <HeaderDesktopMainMenu>
          <HeaderDesktopMainMenuNav aria-label="Main menu">
            <HeaderDesktopMainMenuLink asChild>
              <Link href="/">Home</Link>
            </HeaderDesktopMainMenuLink>
          </HeaderDesktopMainMenuNav>
        </HeaderDesktopMainMenu>
      </HeaderRoot>
    )
    const nav = document.querySelector('nav[aria-label="Main menu"]')
    expect(nav).toBeInTheDocument()
  })

  it('renders nav links', () => {
    render(
      <HeaderRoot>
        <HeaderDesktopMainMenu>
          <HeaderDesktopMainMenuNav>
            <HeaderDesktopMainMenuLink asChild>
              <Link href="/">Home</Link>
            </HeaderDesktopMainMenuLink>
            <HeaderDesktopMainMenuLink asChild>
              <Link href="/about">About</Link>
            </HeaderDesktopMainMenuLink>
          </HeaderDesktopMainMenuNav>
        </HeaderDesktopMainMenu>
      </HeaderRoot>
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders actions', () => {
    render(
      <HeaderRoot>
        <HeaderDesktopMainMenu>
          <HeaderDesktopMainMenuNav>
            <Button>Login</Button>
          </HeaderDesktopMainMenuNav>
        </HeaderDesktopMainMenu>
      </HeaderRoot>
    )
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('toggles mobile menu', async () => {
    const user = userEvent.setup()
    render(
      <HeaderRoot>
        <HeaderDesktopMainMenu>
          <HeaderDesktopMainMenuLogo>Logo</HeaderDesktopMainMenuLogo>
        </HeaderDesktopMainMenu>
        <HeaderMobileRoot>
          <HeaderMobileTopMenu>
            <HeaderMobileTopMenuToggle data-testid="mobile-toggle" />
          </HeaderMobileTopMenu>
          <HeaderMobileMainMenu>
            <HeaderMobileMainMenuLink asChild>
              <Link href="/">Home</Link>
            </HeaderMobileMainMenuLink>
          </HeaderMobileMainMenu>
        </HeaderMobileRoot>
      </HeaderRoot>
    )

    const toggle = screen.getByTestId('mobile-toggle')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('mobile toggle has aria-controls', () => {
    render(
      <HeaderRoot>
        <HeaderDesktopMainMenu>
          <HeaderDesktopMainMenuLogo>Logo</HeaderDesktopMainMenuLogo>
        </HeaderDesktopMainMenu>
        <HeaderMobileRoot>
          <HeaderMobileTopMenu>
            <HeaderMobileTopMenuToggle data-testid="mobile-toggle" />
          </HeaderMobileTopMenu>
          <HeaderMobileMainMenu>Menu</HeaderMobileMainMenu>
        </HeaderMobileRoot>
      </HeaderRoot>
    )

    const toggle = screen.getByTestId('mobile-toggle')
    const menuId = toggle.getAttribute('aria-controls')
    expect(menuId).toBeTruthy()
    expect(document.getElementById(menuId!)).toBeInTheDocument()
  })

  it('dropdown has aria-haspopup and aria-expanded', () => {
    render(
      <HeaderRoot>
        <HeaderDesktopMainMenu>
          <HeaderDesktopMainMenuNav>
            <HeaderDesktopMainMenuDropdown label="Products">
              <HeaderDesktopMainMenuDropdownLink asChild>
                <Link href="#">Option</Link>
              </HeaderDesktopMainMenuDropdownLink>
            </HeaderDesktopMainMenuDropdown>
          </HeaderDesktopMainMenuNav>
        </HeaderDesktopMainMenu>
      </HeaderRoot>
    )

    const trigger = screen.getByText('Products').closest('button')!
    expect(trigger).toHaveAttribute('aria-haspopup', 'true')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    // Use fireEvent to avoid mouseenter triggering first
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('expands mobile nav item', async () => {
    const user = userEvent.setup()
    render(
      <HeaderRoot>
        <HeaderDesktopMainMenu>
          <HeaderDesktopMainMenuLogo>Logo</HeaderDesktopMainMenuLogo>
        </HeaderDesktopMainMenu>
        <HeaderMobileRoot>
          <HeaderMobileTopMenu>
            <HeaderMobileTopMenuToggle data-testid="mobile-toggle" />
          </HeaderMobileTopMenu>
          <HeaderMobileMainMenu>
            <HeaderMobileMainMenuDropdown label="Products">
              <div>
                <HeaderMobileMainMenuDropdownLink asChild>
                  <Link href="#">Software</Link>
                </HeaderMobileMainMenuDropdownLink>
              </div>
            </HeaderMobileMainMenuDropdown>
          </HeaderMobileMainMenu>
        </HeaderMobileRoot>
      </HeaderRoot>
    )

    await user.click(screen.getByTestId('mobile-toggle'))

    const expandButton = screen.getByText('Products').closest('button')!
    expect(expandButton).toHaveAttribute('aria-expanded', 'false')
    expect(expandButton).toHaveAttribute('aria-controls')

    await user.click(expandButton)
    expect(expandButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes mobile menu on Escape', async () => {
    const user = userEvent.setup()
    render(
      <HeaderRoot>
        <HeaderDesktopMainMenu>
          <HeaderDesktopMainMenuLogo>Logo</HeaderDesktopMainMenuLogo>
        </HeaderDesktopMainMenu>
        <HeaderMobileRoot>
          <HeaderMobileTopMenu>
            <HeaderMobileTopMenuToggle data-testid="mobile-toggle" />
          </HeaderMobileTopMenu>
          <HeaderMobileMainMenu>
            <HeaderMobileMainMenuLink asChild>
              <Link href="/">Home</Link>
            </HeaderMobileMainMenuLink>
          </HeaderMobileMainMenu>
        </HeaderMobileRoot>
      </HeaderRoot>
    )

    const toggle = screen.getByTestId('mobile-toggle')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(
      <HeaderRoot ref={ref}>
        <HeaderDesktopMainMenu>
          <HeaderDesktopMainMenuLogo>Logo</HeaderDesktopMainMenuLogo>
        </HeaderDesktopMainMenu>
      </HeaderRoot>
    )
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })
})
