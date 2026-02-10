import type { Meta, StoryObj } from '@storybook/react'
import { Link } from 'base/Link'
import { Button } from 'form/Button'
import {
  Banner,
  BannerActions,
  BannerBody,
  BannerContent,
  BannerSubtitle,
  BannerTitle,
} from './Banner'
import type {
  BannerOverlayTypes,
  HorizontalAlignTypes,
  VerticalAlignTypes,
} from './Banner.types'

const horizontalAlignOptions: HorizontalAlignTypes[] = [
  'left',
  'center',
  'right',
]
const verticalAlignOptions: VerticalAlignTypes[] = [
  'start',
  'center',
  'end',
]
const overlayOptions: BannerOverlayTypes[] = ['none', 'light', 'dark']

const sampleImage =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80'

const meta: Meta<typeof Banner> = {
  title: 'Modules/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    backgroundImage: {
      control: 'text',
      description: 'URL of the background image',
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color (used when no image)',
    },
    overlay: {
      control: 'select',
      options: overlayOptions,
      description: 'Overlay for better text contrast',
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height of the banner',
      table: {
        defaultValue: { summary: '40rem' },
      },
    },
    horizontalAlign: {
      control: 'select',
      options: horizontalAlignOptions,
      description: 'Horizontal alignment of content',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    verticalAlign: {
      control: 'select',
      options: verticalAlignOptions,
      description: 'Vertical alignment of content',
      table: {
        defaultValue: { summary: 'center' },
      },
    },
  },
  args: {
    overlay: 'none',
    minHeight: '40rem',
    horizontalAlign: 'left',
    verticalAlign: 'center',
  },
}

export default meta
type Story = StoryObj<typeof Banner>

export const Default: Story = {
  render: (args) => (
    <Banner {...args} backgroundColor="var(--color-primary-2)">
      <BannerContent textColor="light">
        <BannerTitle>Welcome to Our Platform</BannerTitle>
        <BannerSubtitle>Build something amazing today</BannerSubtitle>
        <BannerBody className="mt-3">
          Discover the tools and resources you need to bring your ideas to
          life. Start your journey with us and transform the way you work.
        </BannerBody>
        <BannerActions className="mt-4">
          <Button variant="default" contrast appearance="button">
            Get Started
          </Button>
          <Button variant="default" contrast appearance="outline">
            Learn More
          </Button>
        </BannerActions>
      </BannerContent>
    </Banner>
  ),
}

export const WithBackgroundImage: Story = {
  render: (args) => (
    <Banner
      {...args}
      backgroundImage={sampleImage}
      overlay="dark"
      horizontalAlign="center"
    >
      <BannerContent textColor="light">
        <BannerTitle>Explore the Mountains</BannerTitle>
        <BannerSubtitle>
          Adventure awaits beyond the horizon
        </BannerSubtitle>
        <BannerBody className="mt-3">
          Experience breathtaking views and unforgettable moments in
          nature's most spectacular landscapes.
        </BannerBody>
        <BannerActions className="mt-4">
          <Button variant="primary" contrast appearance="button">
            Book Now
          </Button>
          <Link variant="default" contrast appearance="underline">
            View Gallery
          </Link>
        </BannerActions>
      </BannerContent>
    </Banner>
  ),
}

export const WithBackgroundVideo: Story = {
  render: (args) => (
    <Banner
      {...args}
      backgroundVideo={{
        src: 'https://www.w3schools.com/html/mov_bbb.mp4',
        poster:
          'https://peach.blender.org/wp-content/uploads/bbb-splash.png',
      }}
      overlay="dark"
      horizontalAlign="center"
    >
      <BannerContent textColor="light" textAlign="center">
        <BannerTitle>Cinematic Experience</BannerTitle>
        <BannerSubtitle>Immerse yourself in motion</BannerSubtitle>
        <BannerBody className="mt-3">
          Video backgrounds create engaging, dynamic hero sections that
          capture attention instantly.
        </BannerBody>
        <BannerActions className="mt-4">
          <Button variant="primary" contrast appearance="button">
            Watch Now
          </Button>
          <Button variant="default" contrast appearance="outline">
            Learn More
          </Button>
        </BannerActions>
      </BannerContent>
    </Banner>
  ),
}

export const LightOverlay: Story = {
  render: (args) => (
    <Banner
      {...args}
      backgroundImage={sampleImage}
      overlay="light"
      horizontalAlign="left"
    >
      <BannerContent textColor="dark">
        <BannerTitle>Nature Retreats</BannerTitle>
        <BannerSubtitle>Find your peace</BannerSubtitle>
        <BannerBody className="mt-3">
          Disconnect from the everyday and reconnect with yourself in our
          carefully curated natural escapes.
        </BannerBody>
        <BannerActions className="mt-4">
          <Button variant="primary" appearance="button">
            Explore
          </Button>
        </BannerActions>
      </BannerContent>
    </Banner>
  ),
}

export const RightAligned: Story = {
  render: (args) => (
    <Banner
      {...args}
      backgroundImage={sampleImage}
      overlay="dark"
      horizontalAlign="right"
    >
      <BannerContent textColor="light" maxWidth="50rem">
        <BannerTitle level="h2">Premium Collection</BannerTitle>
        <BannerSubtitle>Exclusive designs for you</BannerSubtitle>
        <BannerBody className="mt-3">
          Handcrafted with attention to every detail.
        </BannerBody>
        <BannerActions className="mt-4">
          <Button variant="secondary" contrast appearance="button">
            Shop Now
          </Button>
        </BannerActions>
      </BannerContent>
    </Banner>
  ),
}

export const BottomContent: Story = {
  render: (args) => (
    <Banner
      {...args}
      backgroundImage={sampleImage}
      overlay="dark"
      minHeight="50rem"
      horizontalAlign="left"
      verticalAlign="end"
    >
      <BannerContent textColor="light">
        <BannerTitle level="h2">Summer Collection 2025</BannerTitle>
        <BannerSubtitle>Now Available</BannerSubtitle>
        <BannerActions className="mt-4">
          <Button variant="primary" contrast appearance="button">
            View Collection
          </Button>
          <Button variant="default" contrast appearance="outline">
            See Lookbook
          </Button>
        </BannerActions>
      </BannerContent>
    </Banner>
  ),
}

export const AllVariantsContrast: Story = {
  render: (args) => (
    <Banner {...args} horizontalAlign="center" backgroundColor="#1a1a1a">
      <BannerContent textColor="light" textAlign="center">
        <BannerTitle level="h2">Contrast Button Variants</BannerTitle>
        <BannerSubtitle>
          All variants with contrast prop on dark background
        </BannerSubtitle>
        <BannerActions className="mt-4">
          <Button variant="default" contrast appearance="button">
            Default
          </Button>
          <Button variant="primary" contrast appearance="button">
            Primary
          </Button>
          <Button variant="secondary" contrast appearance="button">
            Secondary
          </Button>
          <Button variant="success" contrast appearance="button">
            Success
          </Button>
          <Button variant="danger" contrast appearance="button">
            Danger
          </Button>
          <Button variant="warning" contrast appearance="button">
            Warning
          </Button>
          <Button variant="info" contrast appearance="button">
            Info
          </Button>
        </BannerActions>
      </BannerContent>
    </Banner>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use the `contrast` prop on Button and Link components for visibility on dark backgrounds.',
      },
    },
  },
}
