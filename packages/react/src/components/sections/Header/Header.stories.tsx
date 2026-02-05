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
  HeaderMain,
  HeaderMainDropdown,
  HeaderMainDropdownLink,
  HeaderMainLink,
  HeaderMainLogo,
  HeaderMainNav,
  HeaderMobile,
  HeaderMobileBar,
  HeaderMobileDropdown,
  HeaderMobileDropdownLink,
  HeaderMobileLink,
  HeaderMobileLogo,
  HeaderMobileMenu,
  HeaderMobileNav,
  HeaderMobileToggle,
  HeaderMobileTop,
  HeaderRoot,
  HeaderTop,
  HeaderTopDropdown,
  HeaderTopDropdownLink,
  HeaderTopLink,
  HeaderTopNav,
  useHeader,
} from './index'

function HeaderActions() {
  const { isTransparent, textColor } = useHeader()
  const contrast = isTransparent && textColor === 'light'

  return (
    <HeaderMainNav>
      <Button appearance="outline" variant="primary" contrast={contrast}>
        Sign In
      </Button>
      <Button appearance="button" variant="primary" contrast={contrast}>
        Get Started
      </Button>
    </HeaderMainNav>
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
    <HeaderMainDropdownLink asChild>
      <Link href="/">Logiciels</Link>
    </HeaderMainDropdownLink>
    <HeaderMainDropdownLink asChild>
      <Link href="/">Services</Link>
    </HeaderMainDropdownLink>
    <HeaderMainDropdownLink asChild>
      <Link href="/">Formations</Link>
    </HeaderMainDropdownLink>
    <HeaderMainDropdownLink asChild>
      <Link href="/">Support</Link>
    </HeaderMainDropdownLink>
  </div>
)

const LanguageDropdownContent = () => (
  <>
    <HeaderTopDropdownLink asChild>
      <Link href="/">Français</Link>
    </HeaderTopDropdownLink>
    <HeaderTopDropdownLink asChild>
      <Link href="/">English</Link>
    </HeaderTopDropdownLink>
    <HeaderTopDropdownLink asChild>
      <Link href="/">Español</Link>
    </HeaderTopDropdownLink>
    <HeaderTopDropdownLink asChild>
      <Link href="/">Deutsch</Link>
    </HeaderTopDropdownLink>
  </>
)

const MegaMenuContent = () => (
  <Grid col={4} gap={2}>
    <GridItem>
      <Title level="h4">Produits</Title>
      <HeaderMainDropdownLink asChild>
        <Link href="/">Logiciel A</Link>
      </HeaderMainDropdownLink>
      <HeaderMainDropdownLink asChild>
        <Link href="/">Logiciel B</Link>
      </HeaderMainDropdownLink>
      <HeaderMainDropdownLink asChild>
        <Link href="/">Application Mobile</Link>
      </HeaderMainDropdownLink>
    </GridItem>
    <GridItem>
      <Title level="h4">Services</Title>
      <HeaderMainDropdownLink asChild>
        <Link href="/">Consulting</Link>
      </HeaderMainDropdownLink>
      <HeaderMainDropdownLink asChild>
        <Link href="/">Intégration</Link>
      </HeaderMainDropdownLink>
      <HeaderMainDropdownLink asChild>
        <Link href="/">Maintenance</Link>
      </HeaderMainDropdownLink>
    </GridItem>
    <GridItem>
      <Title level="h4">Ressources</Title>
      <HeaderMainDropdownLink asChild>
        <Link href="/">Documentation</Link>
      </HeaderMainDropdownLink>
      <HeaderMainDropdownLink asChild>
        <Link href="/">Tutoriels</Link>
      </HeaderMainDropdownLink>
      <HeaderMainDropdownLink asChild>
        <Link href="/">API</Link>
      </HeaderMainDropdownLink>
    </GridItem>
    <GridItem>
      <Title level="h4">Get started</Title>
      <HeaderMainDropdownLink asChild>
        <Link href="/">Free trial</Link>
      </HeaderMainDropdownLink>
      <HeaderMainDropdownLink asChild>
        <Link href="/">Book a demo</Link>
      </HeaderMainDropdownLink>
      <HeaderMainDropdownLink asChild>
        <Link href="/">Contact sales</Link>
      </HeaderMainDropdownLink>
    </GridItem>
  </Grid>
)

const MobileMenuContent = () => (
  <HeaderMobileMenu>
    <HeaderMobileTop>
      <Title level="h3">Menu</Title>
      <HeaderMobileToggle />
    </HeaderMobileTop>

    <HeaderMobileNav>
      <HeaderMobileLink asChild>
        <Link href="/">Accueil</Link>
      </HeaderMobileLink>

      <HeaderMobileLink asChild>
        <Link href="/">Produits</Link>
      </HeaderMobileLink>

      <HeaderMobileLink asChild>
        <Link href="/">À propos</Link>
      </HeaderMobileLink>

      <HeaderMobileDropdown label="Produits">
        <HeaderMobileDropdownLink asChild>
          <Link href="/">Logiciels</Link>
        </HeaderMobileDropdownLink>
        <HeaderMobileDropdownLink asChild>
          <Link href="/">Services</Link>
        </HeaderMobileDropdownLink>
        <HeaderMobileDropdownLink asChild>
          <Link href="/">Formations</Link>
        </HeaderMobileDropdownLink>
      </HeaderMobileDropdown>

      <HeaderMobileDropdown label="Services">
        <HeaderMobileDropdownLink asChild>
          <Link href="/">Consulting</Link>
        </HeaderMobileDropdownLink>
        <HeaderMobileDropdownLink asChild>
          <Link href="/">Support</Link>
        </HeaderMobileDropdownLink>
      </HeaderMobileDropdown>
    </HeaderMobileNav>

    <HeaderMobileNav>
      <HeaderMobileLink asChild>
        <Link href="/">Contact</Link>
      </HeaderMobileLink>
      <HeaderMobileLink asChild>
        <Link href="/">Logiciel A</Link>
      </HeaderMobileLink>
      <HeaderMobileLink asChild>
        <Link href="/">Logiciel B</Link>
      </HeaderMobileLink>
    </HeaderMobileNav>

    <HeaderMobileNav>
      <Link appearance="outline" variant="primary">
        Connexion
      </Link>
      <Link appearance="button" variant="primary">
        Inscription
      </Link>
    </HeaderMobileNav>
  </HeaderMobileMenu>
)

export const Default: Story = {
  render: (args) => (
    <HeaderRoot {...args}>
      <HeaderMain>
        <HeaderMainLogo>
          <Logo href="/">
            <Image
              src="/YOP_black.svg"
              alt="Yop Logo"
              width={81}
              height={28}
            />
          </Logo>
        </HeaderMainLogo>

        <HeaderMainNav>
          <HeaderMainLink asChild current>
            <Link href="/" aria-current="page">
              Accueil
            </Link>
          </HeaderMainLink>
          <HeaderMainLink asChild>
            <Link href="/">Produits</Link>
          </HeaderMainLink>
          <HeaderMainLink asChild>
            <Link href="/">À propos</Link>
          </HeaderMainLink>
          <HeaderMainLink asChild>
            <Link href="/">Contact</Link>
          </HeaderMainLink>
        </HeaderMainNav>

        <HeaderMainNav>
          <Button appearance="outline" variant="primary">
            Connexion
          </Button>
          <Button appearance="button" variant="primary">
            Inscription
          </Button>
        </HeaderMainNav>
      </HeaderMain>

      <HeaderMobile>
        <HeaderMobileBar>
          <HeaderMobileLogo>
            <Logo href="/">
              <Image
                src="/YOP_black.svg"
                alt="Yop Logo"
                width={81}
                height={28}
              />
            </Logo>
          </HeaderMobileLogo>
          <HeaderMobileToggle />
        </HeaderMobileBar>
        <MobileMenuContent />
      </HeaderMobile>
    </HeaderRoot>
  ),
}

export const WithTopBar: Story = {
  render: () => (
    <HeaderRoot>
      <HeaderTop>
        <HeaderTopNav aria-label="main-top-bar">
          <HeaderTopLink asChild>
            <Link href="/">Aide</Link>
          </HeaderTopLink>
          <HeaderTopLink asChild>
            <Link href="/">Contact</Link>
          </HeaderTopLink>
        </HeaderTopNav>

        <HeaderTopNav aria-label="locale-top-bar">
          <HeaderTopDropdown label="FR">
            <LanguageDropdownContent />
          </HeaderTopDropdown>
        </HeaderTopNav>
      </HeaderTop>

      <HeaderMain>
        <HeaderMainLogo>
          <Logo href="/">
            <Image
              src="/YOP_black.svg"
              alt="Yop Logo"
              width={81}
              height={28}
            />
          </Logo>
        </HeaderMainLogo>

        <HeaderMainNav>
          <HeaderMainLink asChild current>
            <Link href="/" aria-current="page">
              Accueil
            </Link>
          </HeaderMainLink>
          <HeaderMainLink asChild>
            <Link href="/">Produits</Link>
          </HeaderMainLink>
          <HeaderMainLink asChild>
            <Link href="/">À propos</Link>
          </HeaderMainLink>
        </HeaderMainNav>

        <HeaderMainNav>
          <Button appearance="button" variant="primary">
            Commencer
          </Button>
        </HeaderMainNav>
      </HeaderMain>

      <HeaderMobile>
        <HeaderMobileBar>
          <HeaderMobileLogo>
            <Logo href="/">
              <Image
                src="/YOP_black.svg"
                alt="Yop Logo"
                width={81}
                height={28}
              />
            </Logo>
          </HeaderMobileLogo>
          <HeaderMobileToggle />
        </HeaderMobileBar>
        <MobileMenuContent />
      </HeaderMobile>
    </HeaderRoot>
  ),
}

export const WithDropdowns: Story = {
  render: () => (
    <HeaderRoot>
      <HeaderMain>
        <HeaderMainLogo>
          <Logo href="/">
            <Image
              src="/YOP_black.svg"
              alt="Yop Logo"
              width={81}
              height={28}
            />
          </Logo>
        </HeaderMainLogo>

        <HeaderMainNav>
          <HeaderMainLink asChild>
            <Link href="/">Accueil</Link>
          </HeaderMainLink>
          <HeaderMainDropdown label="Produits" current>
            <ProductsDropdown />
          </HeaderMainDropdown>
          <HeaderMainDropdown label="Services">
            <ProductsDropdown />
          </HeaderMainDropdown>
          <HeaderMainLink asChild>
            <Link href="/">Contact</Link>
          </HeaderMainLink>
        </HeaderMainNav>

        <HeaderMainNav>
          <Link href="/" appearance="button" variant="primary">
            Démo
          </Link>
        </HeaderMainNav>
      </HeaderMain>

      <HeaderMobile>
        <HeaderMobileBar>
          <HeaderMobileLogo>
            <Logo href="/">
              <Image
                src="/YOP_black.svg"
                alt="Yop Logo"
                width={81}
                height={28}
              />
            </Logo>
          </HeaderMobileLogo>
          <HeaderMobileToggle />
        </HeaderMobileBar>
        <MobileMenuContent />
      </HeaderMobile>
    </HeaderRoot>
  ),
}

export const MegaMenu: Story = {
  render: () => (
    <HeaderRoot>
      <HeaderMain>
        <HeaderMainLogo>
          <Logo href="/">
            <Image
              src="/YOP_black.svg"
              alt="Yop Logo"
              width={81}
              height={28}
            />
          </Logo>
        </HeaderMainLogo>

        <HeaderMainNav>
          <HeaderMainLink asChild>
            <Link href="/">Accueil</Link>
          </HeaderMainLink>
          <HeaderMainDropdown label="Solutions" mega current>
            <MegaMenuContent />
          </HeaderMainDropdown>
          <HeaderMainDropdown label="Produits">
            <ProductsDropdown />
          </HeaderMainDropdown>
          <HeaderMainLink asChild>
            <Link href="/">Contact</Link>
          </HeaderMainLink>
        </HeaderMainNav>

        <HeaderMainNav>
          <Link href="/" appearance="outline" variant="primary">
            Se connecter
          </Link>
          <Link href="/" appearance="button" variant="primary">
            Essai gratuit
          </Link>
        </HeaderMainNav>
      </HeaderMain>

      <HeaderMobile>
        <HeaderMobileBar>
          <HeaderMobileLogo>
            <Logo href="/">
              <Image
                src="/YOP_black.svg"
                alt="Yop Logo"
                width={81}
                height={28}
              />
            </Logo>
          </HeaderMobileLogo>
          <HeaderMobileToggle />
        </HeaderMobileBar>
        <MobileMenuContent />
      </HeaderMobile>
    </HeaderRoot>
  ),
}

export const TransparentHero: Story = {
  render: () => (
    <>
      <HeaderRoot transparent textColor="light">
        <HeaderTop>
          <HeaderTopNav aria-label="main-top-bar">
            <HeaderTopLink asChild>
              <Link href="/">Help</Link>
            </HeaderTopLink>
            <HeaderTopLink asChild>
              <Link href="/">Contact</Link>
            </HeaderTopLink>
          </HeaderTopNav>

          <HeaderTopNav aria-label="locale-top-bar">
            <HeaderTopDropdown label="EN">
              <LanguageDropdownContent />
            </HeaderTopDropdown>
          </HeaderTopNav>
        </HeaderTop>

        <HeaderMain>
          <HeaderMainLogo>
            <Logo href="/">
              <Image
                src="/YOP_black.svg"
                alt="Yop Logo"
                width={81}
                height={28}
              />
            </Logo>
          </HeaderMainLogo>

          <HeaderMainNav>
            <HeaderMainLink asChild current>
              <Link href="/" aria-current="page">
                Home
              </Link>
            </HeaderMainLink>
            <HeaderMainLink asChild>
              <Link href="/">Products</Link>
            </HeaderMainLink>
            <HeaderMainDropdown label="Solutions">
              <ProductsDropdown />
            </HeaderMainDropdown>
            <HeaderMainLink asChild>
              <Link href="/">About</Link>
            </HeaderMainLink>
          </HeaderMainNav>

          <HeaderActions />
        </HeaderMain>

        <HeaderMobile>
          <HeaderMobileBar>
            <HeaderMobileLogo>
              <Logo href="/">
                <Image
                  src="/YOP_black.svg"
                  alt="Yop Logo"
                  width={81}
                  height={28}
                />
              </Logo>
            </HeaderMobileLogo>
            <HeaderMobileToggle />
          </HeaderMobileBar>
          <MobileMenuContent />
        </HeaderMobile>
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
          Scroll up and down to see the header transition between
          transparent and solid states. The header becomes solid once you
          scroll past the hero section.
        </p>
      </Section>
    </>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}

export const TransparentDarkText: Story = {
  render: () => (
    <>
      <HeaderRoot transparent textColor="dark">
        <HeaderTop>
          <HeaderTopNav aria-label="main-top-bar">
            <HeaderTopLink asChild>
              <Link href="/">Help</Link>
            </HeaderTopLink>
            <HeaderTopLink asChild>
              <Link href="/">Contact</Link>
            </HeaderTopLink>
          </HeaderTopNav>

          <HeaderTopNav aria-label="locale-top-bar">
            <HeaderTopDropdown label="EN">
              <LanguageDropdownContent />
            </HeaderTopDropdown>
          </HeaderTopNav>
        </HeaderTop>

        <HeaderMain>
          <HeaderMainLogo>
            <Logo href="/">
              <Image
                src="/YOP_black.svg"
                alt="Yop Logo"
                width={81}
                height={28}
              />
            </Logo>
          </HeaderMainLogo>

          <HeaderMainNav>
            <HeaderMainLink asChild current>
              <Link href="/" aria-current="page">
                Home
              </Link>
            </HeaderMainLink>
            <HeaderMainLink asChild>
              <Link href="/">Products</Link>
            </HeaderMainLink>
            <HeaderMainDropdown label="Solutions">
              <ProductsDropdown />
            </HeaderMainDropdown>
            <HeaderMainLink asChild>
              <Link href="/">About</Link>
            </HeaderMainLink>
          </HeaderMainNav>

          <HeaderActions />
        </HeaderMain>

        <HeaderMobile>
          <HeaderMobileBar>
            <HeaderMobileLogo>
              <Logo href="/">
                <Image
                  src="/YOP_black.svg"
                  alt="Yop Logo"
                  width={81}
                  height={28}
                />
              </Logo>
            </HeaderMobileLogo>
            <HeaderMobileToggle />
          </HeaderMobileBar>
          <MobileMenuContent />
        </HeaderMobile>
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
          Scroll up and down to see the header transition between
          transparent and solid states. The header becomes solid once you
          scroll past the hero section.
        </p>
      </Section>
    </>
  ),
  parameters: {
    layout: 'fullscreen',
  },
}
