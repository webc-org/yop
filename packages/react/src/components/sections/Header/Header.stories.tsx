import type { Meta, StoryObj } from '@storybook/react'
import {
  Button,
  Grid,
  GridItem,
  Image,
  Link,
  Logo,
  Section,
  SectionHeader,
  SectionTitle,
  Title,
} from 'components'
import {
  Banner,
  BannerActions,
  BannerContent,
  BannerSubtitle,
  BannerTitle,
} from '../../modules/Banner'
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
  HeaderMobileMainMenuNav,
  HeaderMobileMainMenuTop,
  HeaderMobileRoot,
  HeaderMobileTopMenu,
  HeaderMobileTopMenuLogo,
  HeaderMobileTopMenuToggle,
  HeaderRoot,
  useHeader,
} from './index'

function HeaderLogo() {
  const { textColor } = useHeader()
  const src =
    textColor === 'light' ? '/pushui_white.svg' : '/pushui_black.svg'
  return (
    <Logo href="/">
      <Image src={src} alt="Push UI" />
    </Logo>
  )
}

function HeaderActions({ button }: { button?: boolean }) {
  const { textColor } = useHeader()
  const contrast = textColor === 'light'

  return button ? (
    <HeaderDesktopMainMenuNav>
      <Button appearance="outline" variant="primary" contrast={contrast}>
        Sign In
      </Button>

      <Button appearance="button" variant="primary" contrast={contrast}>
        Get Started
      </Button>
    </HeaderDesktopMainMenuNav>
  ) : (
    <HeaderDesktopMainMenuNav>
      <HeaderDesktopMainMenuLink asChild icon>
        <Link href="/" appearance="icon" className="icon-github" />
      </HeaderDesktopMainMenuLink>

      <HeaderDesktopMainMenuLink asChild icon>
        <Link
          href="/"
          appearance="icon"
          variant="secondary"
          className="icon-circle-user"
        />
      </HeaderDesktopMainMenuLink>
    </HeaderDesktopMainMenuNav>
  )
}

const meta: Meta<typeof HeaderRoot> = {
  title: 'Sections/Header',
  component: HeaderRoot,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'grey',
      values: [{ name: 'grey', value: 'var(--color-grey-6)' }],
    },
  },
}

export default meta
type Story = StoryObj<typeof HeaderRoot>

const ProductsDropdown = () => (
  <div>
    <HeaderDesktopMainMenuDropdownLink asChild>
      <Link href="/">Logiciels</Link>
    </HeaderDesktopMainMenuDropdownLink>
    <HeaderDesktopMainMenuDropdownLink asChild>
      <Link href="/">Services</Link>
    </HeaderDesktopMainMenuDropdownLink>
    <HeaderDesktopMainMenuDropdownLink asChild>
      <Link href="/">Formations</Link>
    </HeaderDesktopMainMenuDropdownLink>
    <HeaderDesktopMainMenuDropdownLink asChild>
      <Link href="/">Support</Link>
    </HeaderDesktopMainMenuDropdownLink>
  </div>
)

const LanguageDropdownContent = () => (
  <>
    <HeaderDesktopTopMenuDropdownLink asChild>
      <Link href="/">Français</Link>
    </HeaderDesktopTopMenuDropdownLink>
    <HeaderDesktopTopMenuDropdownLink asChild>
      <Link href="/">English</Link>
    </HeaderDesktopTopMenuDropdownLink>
    <HeaderDesktopTopMenuDropdownLink asChild>
      <Link href="/">Español</Link>
    </HeaderDesktopTopMenuDropdownLink>
    <HeaderDesktopTopMenuDropdownLink asChild>
      <Link href="/">Deutsch</Link>
    </HeaderDesktopTopMenuDropdownLink>
  </>
)

const MegaMenuContent = () => (
  <Grid col={4} gap={2}>
    <GridItem>
      <Title level="h4">Produits</Title>
      <HeaderDesktopMainMenuDropdownLink asChild>
        <Link href="/">Logiciel A</Link>
      </HeaderDesktopMainMenuDropdownLink>
      <HeaderDesktopMainMenuDropdownLink asChild>
        <Link href="/">Logiciel B</Link>
      </HeaderDesktopMainMenuDropdownLink>
      <HeaderDesktopMainMenuDropdownLink asChild>
        <Link href="/">Application Mobile</Link>
      </HeaderDesktopMainMenuDropdownLink>
    </GridItem>
    <GridItem>
      <Title level="h4">Services</Title>
      <HeaderDesktopMainMenuDropdownLink asChild>
        <Link href="/">Consulting</Link>
      </HeaderDesktopMainMenuDropdownLink>
      <HeaderDesktopMainMenuDropdownLink asChild>
        <Link href="/">Intégration</Link>
      </HeaderDesktopMainMenuDropdownLink>
      <HeaderDesktopMainMenuDropdownLink asChild>
        <Link href="/">Maintenance</Link>
      </HeaderDesktopMainMenuDropdownLink>
    </GridItem>
    <GridItem>
      <Title level="h4">Ressources</Title>
      <HeaderDesktopMainMenuDropdownLink asChild>
        <Link href="/">Documentation</Link>
      </HeaderDesktopMainMenuDropdownLink>
      <HeaderDesktopMainMenuDropdownLink asChild>
        <Link href="/">Tutoriels</Link>
      </HeaderDesktopMainMenuDropdownLink>
      <HeaderDesktopMainMenuDropdownLink asChild>
        <Link href="/">API</Link>
      </HeaderDesktopMainMenuDropdownLink>
    </GridItem>
    <GridItem>
      <Title level="h4">Get started</Title>
      <HeaderDesktopMainMenuDropdownLink asChild>
        <Link href="/">Free trial</Link>
      </HeaderDesktopMainMenuDropdownLink>
      <HeaderDesktopMainMenuDropdownLink asChild>
        <Link href="/">Book a demo</Link>
      </HeaderDesktopMainMenuDropdownLink>
      <HeaderDesktopMainMenuDropdownLink asChild>
        <Link href="/">Contact sales</Link>
      </HeaderDesktopMainMenuDropdownLink>
    </GridItem>
  </Grid>
)

const MobileMenuContent = () => (
  <HeaderMobileMainMenu>
    <HeaderMobileMainMenuTop>
      <Title level="h3">Menu</Title>
      <HeaderMobileTopMenuToggle />
    </HeaderMobileMainMenuTop>

    <HeaderMobileMainMenuNav>
      <HeaderMobileMainMenuLink asChild>
        <Link href="/">Accueil</Link>
      </HeaderMobileMainMenuLink>

      <HeaderMobileMainMenuLink asChild>
        <Link href="/">Produits</Link>
      </HeaderMobileMainMenuLink>

      <HeaderMobileMainMenuLink asChild>
        <Link href="/">À propos</Link>
      </HeaderMobileMainMenuLink>

      <HeaderMobileMainMenuDropdown label="Produits">
        <HeaderMobileMainMenuDropdownLink asChild>
          <Link href="/">Logiciels</Link>
        </HeaderMobileMainMenuDropdownLink>
        <HeaderMobileMainMenuDropdownLink asChild>
          <Link href="/">Services</Link>
        </HeaderMobileMainMenuDropdownLink>
        <HeaderMobileMainMenuDropdownLink asChild>
          <Link href="/">Formations</Link>
        </HeaderMobileMainMenuDropdownLink>
      </HeaderMobileMainMenuDropdown>

      <HeaderMobileMainMenuDropdown label="Services">
        <HeaderMobileMainMenuDropdownLink asChild>
          <Link href="/">Consulting</Link>
        </HeaderMobileMainMenuDropdownLink>
        <HeaderMobileMainMenuDropdownLink asChild>
          <Link href="/">Support</Link>
        </HeaderMobileMainMenuDropdownLink>
      </HeaderMobileMainMenuDropdown>
    </HeaderMobileMainMenuNav>

    <HeaderMobileMainMenuNav>
      <HeaderMobileMainMenuLink asChild>
        <Link href="/">Contact</Link>
      </HeaderMobileMainMenuLink>
      <HeaderMobileMainMenuLink asChild>
        <Link href="/">Logiciel A</Link>
      </HeaderMobileMainMenuLink>
      <HeaderMobileMainMenuLink asChild>
        <Link href="/">Logiciel B</Link>
      </HeaderMobileMainMenuLink>
    </HeaderMobileMainMenuNav>

    <HeaderMobileMainMenuNav>
      <Link appearance="outline" variant="primary">
        Connexion
      </Link>
      <Link appearance="button" variant="primary">
        Inscription
      </Link>
    </HeaderMobileMainMenuNav>
  </HeaderMobileMainMenu>
)

export const Default: Story = {
  render: (args) => (
    <HeaderRoot {...args}>
      <HeaderDesktopMainMenu>
        <HeaderDesktopMainMenuLogo>
          <HeaderLogo />
        </HeaderDesktopMainMenuLogo>

        <HeaderDesktopMainMenuNav>
          <HeaderDesktopMainMenuLink asChild current>
            <Link href="/" aria-current="page">
              Accueil
            </Link>
          </HeaderDesktopMainMenuLink>
          <HeaderDesktopMainMenuLink asChild>
            <Link href="/">Produits</Link>
          </HeaderDesktopMainMenuLink>
          <HeaderDesktopMainMenuLink asChild>
            <Link href="/">À propos</Link>
          </HeaderDesktopMainMenuLink>
          <HeaderDesktopMainMenuLink asChild>
            <Link href="/">Contact</Link>
          </HeaderDesktopMainMenuLink>
        </HeaderDesktopMainMenuNav>

        <HeaderActions />
      </HeaderDesktopMainMenu>

      <HeaderMobileRoot>
        <HeaderMobileTopMenu>
          <HeaderMobileTopMenuLogo>
            <HeaderLogo />
          </HeaderMobileTopMenuLogo>
          <HeaderMobileTopMenuToggle />
        </HeaderMobileTopMenu>
        <MobileMenuContent />
      </HeaderMobileRoot>
    </HeaderRoot>
  ),
}

export const WithTopBar: Story = {
  render: () => (
    <HeaderRoot>
      <HeaderDesktopTopMenu>
        <HeaderDesktopTopMenuNav aria-label="main-top-bar">
          <HeaderDesktopTopMenuLink asChild>
            <Link href="/">Aide</Link>
          </HeaderDesktopTopMenuLink>
          <HeaderDesktopTopMenuLink asChild>
            <Link href="/">Contact</Link>
          </HeaderDesktopTopMenuLink>
        </HeaderDesktopTopMenuNav>

        <HeaderDesktopTopMenuNav aria-label="locale-top-bar">
          <HeaderDesktopTopMenuDropdown label="FR">
            <LanguageDropdownContent />
          </HeaderDesktopTopMenuDropdown>
        </HeaderDesktopTopMenuNav>
      </HeaderDesktopTopMenu>

      <HeaderDesktopMainMenu>
        <HeaderDesktopMainMenuLogo>
          <HeaderLogo />
        </HeaderDesktopMainMenuLogo>

        <HeaderDesktopMainMenuNav>
          <HeaderDesktopMainMenuLink asChild current>
            <Link href="/" aria-current="page">
              Accueil
            </Link>
          </HeaderDesktopMainMenuLink>
          <HeaderDesktopMainMenuLink asChild>
            <Link href="/">Produits</Link>
          </HeaderDesktopMainMenuLink>
          <HeaderDesktopMainMenuLink asChild>
            <Link href="/">À propos</Link>
          </HeaderDesktopMainMenuLink>
        </HeaderDesktopMainMenuNav>

        <HeaderActions />
      </HeaderDesktopMainMenu>

      <HeaderMobileRoot>
        <HeaderMobileTopMenu>
          <HeaderMobileTopMenuLogo>
            <HeaderLogo />
          </HeaderMobileTopMenuLogo>
          <HeaderMobileTopMenuToggle />
        </HeaderMobileTopMenu>
        <MobileMenuContent />
      </HeaderMobileRoot>
    </HeaderRoot>
  ),
}

export const WithDropdowns: Story = {
  render: () => (
    <HeaderRoot>
      <HeaderDesktopMainMenu>
        <HeaderDesktopMainMenuLogo>
          <HeaderLogo />
        </HeaderDesktopMainMenuLogo>

        <HeaderDesktopMainMenuNav>
          <HeaderDesktopMainMenuLink asChild>
            <Link href="/">Accueil</Link>
          </HeaderDesktopMainMenuLink>
          <HeaderDesktopMainMenuDropdown label="Produits" current>
            <ProductsDropdown />
          </HeaderDesktopMainMenuDropdown>
          <HeaderDesktopMainMenuDropdown label="Services">
            <ProductsDropdown />
          </HeaderDesktopMainMenuDropdown>
          <HeaderDesktopMainMenuLink asChild>
            <Link href="/">Contact</Link>
          </HeaderDesktopMainMenuLink>
        </HeaderDesktopMainMenuNav>

        <HeaderActions />
      </HeaderDesktopMainMenu>

      <HeaderMobileRoot>
        <HeaderMobileTopMenu>
          <HeaderMobileTopMenuLogo>
            <HeaderLogo />
          </HeaderMobileTopMenuLogo>
          <HeaderMobileTopMenuToggle />
        </HeaderMobileTopMenu>
        <MobileMenuContent />
      </HeaderMobileRoot>
    </HeaderRoot>
  ),
}

export const MegaMenu: Story = {
  render: () => (
    <HeaderRoot>
      <HeaderDesktopMainMenu>
        <HeaderDesktopMainMenuLogo>
          <HeaderLogo />
        </HeaderDesktopMainMenuLogo>

        <HeaderDesktopMainMenuNav>
          <HeaderDesktopMainMenuLink asChild>
            <Link href="/">Accueil</Link>
          </HeaderDesktopMainMenuLink>
          <HeaderDesktopMainMenuDropdown label="Solutions" mega current>
            <MegaMenuContent />
          </HeaderDesktopMainMenuDropdown>
          <HeaderDesktopMainMenuDropdown label="Produits">
            <ProductsDropdown />
          </HeaderDesktopMainMenuDropdown>
          <HeaderDesktopMainMenuLink asChild>
            <Link href="/">Contact</Link>
          </HeaderDesktopMainMenuLink>
        </HeaderDesktopMainMenuNav>

        <HeaderActions />
      </HeaderDesktopMainMenu>

      <HeaderMobileRoot>
        <HeaderMobileTopMenu>
          <HeaderMobileTopMenuLogo>
            <HeaderLogo />
          </HeaderMobileTopMenuLogo>
          <HeaderMobileTopMenuToggle />
        </HeaderMobileTopMenu>
        <MobileMenuContent />
      </HeaderMobileRoot>
    </HeaderRoot>
  ),
}

export const DarkHero: Story = {
  render: () => (
    <>
      <HeaderRoot isOverlay textColor="light">
        <HeaderDesktopTopMenu
          bgColor="#111"
          bgOpacity="0.2"
          textColor="light"
        >
          <HeaderDesktopTopMenuNav aria-label="main-top-bar">
            <HeaderDesktopTopMenuLink asChild>
              <Link href="/">Help</Link>
            </HeaderDesktopTopMenuLink>
            <HeaderDesktopTopMenuLink asChild>
              <Link href="/">Contact</Link>
            </HeaderDesktopTopMenuLink>
          </HeaderDesktopTopMenuNav>

          <HeaderDesktopTopMenuNav aria-label="locale-top-bar">
            <HeaderDesktopTopMenuDropdown label="EN">
              <LanguageDropdownContent />
            </HeaderDesktopTopMenuDropdown>
          </HeaderDesktopTopMenuNav>
        </HeaderDesktopTopMenu>

        <HeaderDesktopMainMenu
          bgColor="#222"
          bgOpacity="0.2"
          textColor="light"
        >
          <HeaderDesktopMainMenuLogo>
            <HeaderLogo />
          </HeaderDesktopMainMenuLogo>

          <HeaderDesktopMainMenuNav>
            <HeaderDesktopMainMenuLink asChild current>
              <Link href="/" aria-current="page">
                Home
              </Link>
            </HeaderDesktopMainMenuLink>
            <HeaderDesktopMainMenuLink asChild>
              <Link href="/">Products</Link>
            </HeaderDesktopMainMenuLink>
            <HeaderDesktopMainMenuDropdown label="Solutions">
              <ProductsDropdown />
            </HeaderDesktopMainMenuDropdown>
            <HeaderDesktopMainMenuLink asChild>
              <Link href="/">About</Link>
            </HeaderDesktopMainMenuLink>
          </HeaderDesktopMainMenuNav>

          <HeaderActions />
        </HeaderDesktopMainMenu>

        <HeaderMobileRoot>
          <HeaderMobileTopMenu
            bgColor="#222"
            bgOpacity="1"
            textColor="light"
          >
            <HeaderMobileTopMenuLogo>
              <HeaderLogo />
            </HeaderMobileTopMenuLogo>
            <HeaderMobileTopMenuToggle />
          </HeaderMobileTopMenu>
          <MobileMenuContent />
        </HeaderMobileRoot>
      </HeaderRoot>

      <Banner
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
        overlay="dark"
        horizontalAlign="center"
        verticalAlign="center"
        className="h-screen"
      >
        <BannerContent textColor="light" textAlign="center">
          <BannerTitle level="h1">Welcome to Our Platform</BannerTitle>
          <BannerSubtitle className="mt-1 fs-5">
            Experience the future of web development
          </BannerSubtitle>
          <BannerActions className="mt-5">
            <Button appearance="button" variant="primary" contrast>
              Get Started
            </Button>
            <Button appearance="outline" variant="default" contrast>
              Learn More
            </Button>
          </BannerActions>
        </BannerContent>
      </Banner>

      <Section className="p-8">
        <SectionHeader>
          <SectionTitle level="h2">Below the Fold</SectionTitle>
        </SectionHeader>
        <p>
          Scroll up and down to see the header transition between overlay
          and solid states. The header becomes solid once you scroll past
          the hero section.
        </p>
      </Section>
    </>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

export const LightHero: Story = {
  render: () => (
    <>
      <HeaderRoot isOverlay textColor="dark">
        <HeaderDesktopTopMenu
          bgColor="var(--color-grey-7)"
          bgOpacity="0.5"
          textColor="dark"
        >
          <HeaderDesktopTopMenuNav aria-label="main-top-bar">
            <HeaderDesktopTopMenuLink asChild>
              <Link href="/">Help</Link>
            </HeaderDesktopTopMenuLink>
            <HeaderDesktopTopMenuLink asChild>
              <Link href="/">Contact</Link>
            </HeaderDesktopTopMenuLink>
          </HeaderDesktopTopMenuNav>

          <HeaderDesktopTopMenuNav aria-label="locale-top-bar">
            <HeaderDesktopTopMenuDropdown label="EN">
              <LanguageDropdownContent />
            </HeaderDesktopTopMenuDropdown>
          </HeaderDesktopTopMenuNav>
        </HeaderDesktopTopMenu>

        <HeaderDesktopMainMenu
          bgColor="var(--color-white)"
          bgOpacity="0.2"
          textColor="dark"
        >
          <HeaderDesktopMainMenuLogo>
            <HeaderLogo />
          </HeaderDesktopMainMenuLogo>

          <HeaderDesktopMainMenuNav>
            <HeaderDesktopMainMenuLink asChild current>
              <Link href="/" aria-current="page">
                Home
              </Link>
            </HeaderDesktopMainMenuLink>
            <HeaderDesktopMainMenuLink asChild>
              <Link href="/">Products</Link>
            </HeaderDesktopMainMenuLink>
            <HeaderDesktopMainMenuDropdown label="Solutions">
              <ProductsDropdown />
            </HeaderDesktopMainMenuDropdown>
            <HeaderDesktopMainMenuLink asChild>
              <Link href="/">About</Link>
            </HeaderDesktopMainMenuLink>
          </HeaderDesktopMainMenuNav>

          <HeaderActions />
        </HeaderDesktopMainMenu>

        <HeaderMobileRoot>
          <HeaderMobileTopMenu
            bgColor="var(--color-white)"
            bgOpacity="1"
            textColor="dark"
          >
            <HeaderMobileTopMenuLogo>
              <HeaderLogo />
            </HeaderMobileTopMenuLogo>
            <HeaderMobileTopMenuToggle />
          </HeaderMobileTopMenu>
          <MobileMenuContent />
        </HeaderMobileRoot>
      </HeaderRoot>

      <Banner
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
        overlay="light"
        horizontalAlign="center"
        verticalAlign="center"
        className="h-screen"
      >
        <BannerContent textColor="dark" textAlign="center">
          <BannerTitle level="h1">Welcome to Our Platform</BannerTitle>
          <BannerSubtitle className="mt-1 fs-5">
            Experience the future of web development
          </BannerSubtitle>
          <BannerActions className="mt-5">
            <Button appearance="button" variant="primary">
              Get Started
            </Button>
            <Button appearance="outline" variant="primary">
              Learn More
            </Button>
          </BannerActions>
        </BannerContent>
      </Banner>

      <Section className="p-8">
        <SectionHeader>
          <SectionTitle level="h2">Below the Fold</SectionTitle>
        </SectionHeader>
        <p>
          Scroll up and down to see the header transition between overlay
          and solid states. The header becomes solid once you scroll past
          the hero section.
        </p>
      </Section>
    </>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}
