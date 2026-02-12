# Header

Responsive site header with desktop navigation, mobile menu, top bar, and dropdown support.

## Import

```tsx
import {
  // Root
  HeaderRoot,
  // Top bar
  HeaderTop,
  HeaderTopNav,
  HeaderTopLink,
  HeaderTopDropdown,
  HeaderTopDropdownLink,
  // Main navigation
  HeaderMain,
  HeaderMainLogo,
  HeaderMainNav,
  HeaderMainLink,
  HeaderMainDropdown,
  HeaderMainDropdownLink,
  // Mobile
  HeaderMobile,
  HeaderMobileBar,
  HeaderMobileLogo,
  HeaderMobileToggle,
  HeaderMobileMenu,
  HeaderMobileTop,
  HeaderMobileNav,
  HeaderMobileLink,
  HeaderMobileDropdown,
  HeaderMobileDropdownLink,
} from '@ui'
```

## Usage

### Basic Header

```tsx
<HeaderRoot>
  <HeaderMain>
    <HeaderMainLogo>
      <Logo href="/">
        <Image src="/logo.svg" alt="Site Logo" width={144} height={40} />
      </Logo>
    </HeaderMainLogo>

    <HeaderMainNav>
      <HeaderMainLink asChild current>
        <Link href="/">Home</Link>
      </HeaderMainLink>
      <HeaderMainLink asChild>
        <Link href="/products">Products</Link>
      </HeaderMainLink>
      <HeaderMainLink asChild>
        <Link href="/about">About</Link>
      </HeaderMainLink>
    </HeaderMainNav>

    <HeaderMainNav>
      <Button appearance="button" variant="primary">Sign Up</Button>
    </HeaderMainNav>
  </HeaderMain>

  <HeaderMobile>
    <HeaderMobileBar>
      <HeaderMobileLogo>
        <Logo href="/">
          <Image src="/logo.svg" alt="Site Logo" width={144} height={40} />
        </Logo>
      </HeaderMobileLogo>
      <HeaderMobileToggle />
    </HeaderMobileBar>

    <HeaderMobileMenu>
      <HeaderMobileTop>
        <Title level="h3">Menu</Title>
        <HeaderMobileToggle />
      </HeaderMobileTop>
      <HeaderMobileNav>
        <HeaderMobileLink asChild>
          <Link href="/">Home</Link>
        </HeaderMobileLink>
        <HeaderMobileLink asChild>
          <Link href="/products">Products</Link>
        </HeaderMobileLink>
      </HeaderMobileNav>
    </HeaderMobileMenu>
  </HeaderMobile>
</HeaderRoot>
```

### With Top Bar

```tsx
<HeaderRoot>
  <HeaderTop>
    <HeaderTopNav>
      <HeaderTopLink asChild>
        <Link href="/help">Help</Link>
      </HeaderTopLink>
      <HeaderTopLink asChild>
        <Link href="/contact">Contact</Link>
      </HeaderTopLink>
    </HeaderTopNav>

    <HeaderTopNav>
      <HeaderTopDropdown label="EN">
        <HeaderTopDropdownLink asChild>
          <Link href="/en">English</Link>
        </HeaderTopDropdownLink>
        <HeaderTopDropdownLink asChild>
          <Link href="/fr">Français</Link>
        </HeaderTopDropdownLink>
      </HeaderTopDropdown>
    </HeaderTopNav>
  </HeaderTop>

  <HeaderMain>
    {/* main navigation */}
  </HeaderMain>

  <HeaderMobile>
    {/* mobile menu */}
  </HeaderMobile>
</HeaderRoot>
```

### With Dropdowns

```tsx
<HeaderMainNav>
  <HeaderMainLink asChild>
    <Link href="/">Home</Link>
  </HeaderMainLink>

  <HeaderMainDropdown label="Products" current>
    <HeaderMainDropdownLink asChild>
      <Link href="/software">Software</Link>
    </HeaderMainDropdownLink>
    <HeaderMainDropdownLink asChild>
      <Link href="/services">Services</Link>
    </HeaderMainDropdownLink>
  </HeaderMainDropdown>

  <HeaderMainDropdown label="Solutions">
    <HeaderMainDropdownLink asChild>
      <Link href="/enterprise">Enterprise</Link>
    </HeaderMainDropdownLink>
    <HeaderMainDropdownLink asChild>
      <Link href="/startup">Startup</Link>
    </HeaderMainDropdownLink>
  </HeaderMainDropdown>
</HeaderMainNav>
```

### Mega Menu

```tsx
<HeaderMainDropdown label="Solutions" mega>
  <Grid col={4} gap="md">
    <GridItem>
      <Title level="h4">Products</Title>
      <HeaderMainDropdownLink asChild>
        <Link href="/product-a">Product A</Link>
      </HeaderMainDropdownLink>
      <HeaderMainDropdownLink asChild>
        <Link href="/product-b">Product B</Link>
      </HeaderMainDropdownLink>
    </GridItem>
    <GridItem>
      <Title level="h4">Services</Title>
      <HeaderMainDropdownLink asChild>
        <Link href="/consulting">Consulting</Link>
      </HeaderMainDropdownLink>
    </GridItem>
    {/* more columns */}
  </Grid>
</HeaderMainDropdown>
```

### Mobile Menu with Dropdowns

```tsx
<HeaderMobileMenu>
  <HeaderMobileTop>
    <Title level="h3">Menu</Title>
    <HeaderMobileToggle />
  </HeaderMobileTop>

  <HeaderMobileNav>
    <HeaderMobileLink asChild>
      <Link href="/">Home</Link>
    </HeaderMobileLink>

    <HeaderMobileDropdown label="Products">
      <HeaderMobileDropdownLink asChild>
        <Link href="/software">Software</Link>
      </HeaderMobileDropdownLink>
      <HeaderMobileDropdownLink asChild>
        <Link href="/services">Services</Link>
      </HeaderMobileDropdownLink>
    </HeaderMobileDropdown>
  </HeaderMobileNav>

  <HeaderMobileNav>
    <Button appearance="button" variant="primary" className="w-full">
      Sign Up
    </Button>
  </HeaderMobileNav>
</HeaderMobileMenu>
```

## Components

### HeaderRoot

Root container providing context for mobile menu state.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Header content |
| `baseId` | `string` | auto | Base ID for accessibility |
| `isOverlay` | `boolean` | `false` | Overlay mode (header floats over content) |
| `textColor` | `'light' \| 'dark'` | - | Text/icon color |
| `className` | `string` | - | Additional CSS class |

### HeaderTop

Top utility bar (help links, language selector).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | TopNav components |
| `containerClassName` | `string` | - | Inner container class |
| `bgColor` | `string` | `'var(--color-grey-7)'` | Background color (CSS value or hex) |
| `bgOpacity` | `string` | `'1'` | Background opacity (`'0'`–`'1'`). Forced to `'1'` on scroll |

### HeaderMain

Main navigation bar with logo and links.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Logo, Nav components |
| `containerClassName` | `string` | - | Inner container class |
| `bgColor` | `string` | `'var(--color-white)'` | Background color (CSS value or hex) |
| `bgOpacity` | `string` | `'1'` | Background opacity (`'0'`–`'1'`). Forced to `'1'` on scroll |

### HeaderMobileBar

Mobile bar containing logo and toggle.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Logo and toggle |
| `bgColor` | `string` | `'var(--color-white)'` | Background color (CSS value or hex) |
| `bgOpacity` | `string` | `'1'` | Background opacity (`'0'`–`'1'`). Forced to `'1'` on scroll |

### HeaderMainDropdown

Dropdown menu in main nav.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | **required** | Trigger label |
| `href` | `string` | - | Optional link on trigger |
| `mega` | `boolean` | `false` | Full-width mega menu |
| `current` | `boolean` | `false` | Mark as current section |

### HeaderMobile

Container for mobile navigation (visible < 1024px).

### HeaderMobileToggle

Hamburger/close button for mobile menu.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | aria-label (auto-generated) |
| `closeLabel` | `string` | `'Close'` | Close state label |
| `menuLabel` | `string` | `'Menu'` | Open state label |

### Link Components

All link components support `asChild` for custom link rendering and `current` for active state.

| Component | Description |
|-----------|-------------|
| `HeaderTopLink` | Link in top bar |
| `HeaderTopDropdownLink` | Link in top dropdown |
| `HeaderMainLink` | Link in main nav |
| `HeaderMainDropdownLink` | Link in main dropdown |
| `HeaderMobileLink` | Link in mobile menu |
| `HeaderMobileDropdownLink` | Link in mobile dropdown |

## Overlay Header

Use `overlay` and `textColor` to float the header over hero content. Each bar controls its own background via `bgColor`/`bgOpacity`. On scroll, opacity is forced to `1` (fully opaque) and a shadow appears.

```tsx
<HeaderRoot isOverlay textColor="light">
  <HeaderTop bgColor="#111" bgOpacity="0.2">
    {/* top bar */}
  </HeaderTop>
  <HeaderMain bgColor="#222" bgOpacity="0.2">
    {/* main nav */}
  </HeaderMain>
  <HeaderMobile>
    <HeaderMobileBar bgColor="#222" bgOpacity="1">
      {/* mobile bar */}
    </HeaderMobileBar>
  </HeaderMobile>
</HeaderRoot>

<Banner backgroundImage="..." overlay="dark" className="h-screen">
  <BannerContent textColor="light">{/* hero content */}</BannerContent>
</Banner>
```

Add `header-overlay` class to `<body>` to remove default header padding:

```html
<body class="with-main-nav with-mobile-nav header-overlay">
```

### Context

`useHeader()` exposes state for consumer-side logic (e.g. logo swap):

```tsx
const { isOverlay, isScrolled, textColor } = useHeader()
```

| Value | Type | Description |
|-------|------|-------------|
| `isOverlay` | `boolean` | `true` when overlay mode is active |
| `isScrolled` | `boolean` | `true` when page has scrolled past threshold |
| `textColor` | `'light' \| 'dark'` | Current text color variant |

## Behavior

- Desktop nav visible ≥ 1024px, mobile visible < 1024px
- Mobile menu closes on resize to desktop
- Escape key closes mobile menu
- Body scroll locked when mobile menu open
- Focus returns to toggle on close
- Bar backgrounds solidify (`opacity: 1`) and gain shadow on scroll

## Accessibility

- Semantic `<header>` element
- `<nav>` elements with `aria-label`
- Mobile toggle has `aria-expanded` and `aria-controls`
- Dropdowns use `aria-haspopup` and keyboard navigation
- Current links marked with `aria-current="page"`

## Common Patterns

### E-commerce Header

```tsx
<HeaderRoot>
  <HeaderTop>
    <HeaderTopNav>
      <HeaderTopLink asChild>
        <Link href="/stores">Find a Store</Link>
      </HeaderTopLink>
      <HeaderTopLink asChild>
        <Link href="/help">Help</Link>
      </HeaderTopLink>
    </HeaderTopNav>
    <HeaderTopNav>
      <HeaderTopDropdown label="USD">
        {/* currency options */}
      </HeaderTopDropdown>
    </HeaderTopNav>
  </HeaderTop>

  <HeaderMain>
    <HeaderMainLogo>
      <Logo href="/"><Image src="/logo.svg" alt="Store" /></Logo>
    </HeaderMainLogo>
    <HeaderMainNav>
      <HeaderMainDropdown label="Shop" mega>
        {/* category grid */}
      </HeaderMainDropdown>
      <HeaderMainLink asChild>
        <Link href="/sale">Sale</Link>
      </HeaderMainLink>
    </HeaderMainNav>
    <HeaderMainNav>
      <Button appearance="ghost">
        <Icon name="search" />
      </Button>
      <Button appearance="ghost">
        <Icon name="cart" />
      </Button>
    </HeaderMainNav>
  </HeaderMain>

  <HeaderMobile>
    {/* mobile menu */}
  </HeaderMobile>
</HeaderRoot>
```

## Strapi Integration

```tsx
<HeaderRoot isOverlay={isOverlay} textColor={textColor}>
  {data.topBar && (
    <HeaderTop bgColor={data.topBar.bgColor} bgOpacity={data.topBar.bgOpacity}>
      <HeaderTopNav>
        {data.topBar.links.map(link => (
          <HeaderTopLink key={link.id} asChild>
            <Link href={link.url}>{link.label}</Link>
          </HeaderTopLink>
        ))}
      </HeaderTopNav>
      {data.locales && (
        <HeaderTopNav>
          <HeaderTopDropdown label={currentLocale}>
            {data.locales.map(locale => (
              <HeaderTopDropdownLink key={locale.code} asChild>
                <Link href={`/${locale.code}`}>{locale.name}</Link>
              </HeaderTopDropdownLink>
            ))}
          </HeaderTopDropdown>
        </HeaderTopNav>
      )}
    </HeaderTop>
  )}

  <HeaderMain bgColor={data.mainNav?.bgColor} bgOpacity={data.mainNav?.bgOpacity}>
    <HeaderMainLogo>
      <Logo href="/">
        <Image
          src={getMediaUrl(data.logo.url)}
          alt={data.logo.alternativeText}
        />
      </Logo>
    </HeaderMainLogo>

    <HeaderMainNav>
      {data.mainNav.map(item => (
        item.children?.length ? (
          <HeaderMainDropdown
            key={item.id}
            label={item.label}
            mega={item.mega}
          >
            {item.children.map(child => (
              <HeaderMainDropdownLink key={child.id} asChild>
                <Link href={child.url}>{child.label}</Link>
              </HeaderMainDropdownLink>
            ))}
          </HeaderMainDropdown>
        ) : (
          <HeaderMainLink key={item.id} asChild>
            <Link href={item.url}>{item.label}</Link>
          </HeaderMainLink>
        )
      ))}
    </HeaderMainNav>
  </HeaderMain>

  <HeaderMobile>
    <HeaderMobileBar bgColor={data.mobileNav?.bgColor} bgOpacity={data.mobileNav?.bgOpacity}>
      {/* mobile bar */}
    </HeaderMobileBar>
    {/* mobile menu */}
  </HeaderMobile>
</HeaderRoot>
```
