import type { Meta, StoryObj } from '@storybook/react'
import { Image, Link, Title } from 'components'

const meta: Meta<typeof Image> = {
  title: 'Base/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text (required for accessibility)',
    },
    caption: {
      control: 'text',
      description: 'Caption text (wraps image in figure/figcaption)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Image>

const containerStyle = {
  width: '300px',
  height: '200px',
  border: '2px dashed var(--color-grey-4)',
  overflow: 'hidden',
}

export const Playground: Story = {
  args: {
    src: 'https://picsum.photos/800/600',
    alt: 'Random placeholder image',
    className: 'fit-cover obj-center',
  },
  render: (args) => (
    <div style={containerStyle}>
      <Image {...args} style={{ width: '100%', height: '100%' }} />
    </div>
  ),
}

export const WithCaption: Story = {
  render: () => (
    <Image
      src="https://picsum.photos/600/400"
      alt="A beautiful landscape"
      caption="© 2024 Photographer Name - All rights reserved"
      className="r-3"
      style={{ maxWidth: '400px' }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'When a caption is provided, the image is wrapped in a `<figure>` element with proper ARIA attributes for accessibility.',
      },
    },
  },
}

export const CaptionWithLink: Story = {
  render: () => (
    <Image
      src="https://picsum.photos/600/400"
      alt="Mountain landscape at sunset"
      caption={
        <>
          Photo by{' '}
          <Link
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            John Doe
          </Link>{' '}
          on Unsplash
        </>
      }
      className="r-3"
      style={{ maxWidth: '400px' }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Captions can contain rich content like links.',
      },
    },
  },
}

const fitOptions = [
  'cover',
  'contain',
  'fill',
  'none',
  'scale-down',
] as const

export const ObjectFitCover: Story = {
  render: () => (
    <div style={containerStyle}>
      <Image
        src="https://picsum.photos/800/400"
        alt="Cover fit - image fills container, may crop"
        className="fit-cover"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Image fills the entire container while maintaining aspect ratio. Parts may be cropped.',
      },
    },
  },
}

export const ObjectFitContain: Story = {
  render: () => (
    <div style={{ ...containerStyle, background: 'var(--color-grey-6)' }}>
      <Image
        src="https://picsum.photos/800/400"
        alt="Contain fit - entire image visible"
        className="fit-contain"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Entire image is visible within the container. May have letterboxing.',
      },
    },
  },
}

export const AllFitOptions: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
      }}
    >
      {fitOptions.map((fit) => (
        <div key={fit}>
          <p style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>
            {fit}
          </p>
          <div
            style={{
              ...containerStyle,
              background: 'var(--color-grey-6)',
            }}
          >
            <Image
              src="https://picsum.photos/800/400"
              alt={`${fit} example`}
              className={`fit-${fit}`}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      ))}
    </div>
  ),
}

const positionOptions = [
  'center',
  'top',
  'bottom',
  'left',
  'right',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
] as const

export const ObjectPosition: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
      }}
    >
      {positionOptions.map((position) => (
        <div key={position}>
          <p style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>
            {position}
          </p>
          <div style={containerStyle}>
            <Image
              src="https://picsum.photos/800/400"
              alt={`${position} position`}
              className={`fit-cover obj-${position}`}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Control which part of the image is visible when using object-fit: cover.',
      },
    },
  },
}

export const AspectRatios: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
      }}
    >
      {(
        [
          'aspect-square',
          'aspect-4-3',
          'aspect-video',
          'aspect-3-2',
        ] as const
      ).map((cls) => (
        <div key={cls}>
          <p style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>
            {cls}
          </p>
          <Image
            src="https://picsum.photos/800/600"
            alt={`${cls} aspect ratio`}
            className={`fit-cover ${cls}`}
            style={{ width: '100%' }}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Set a fixed aspect ratio using utility classes.',
      },
    },
  },
}

export const BorderRadius: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {(['r-none', 'r-2', 'r-3', 'r-4', 'r-full'] as const).map((cls) => (
        <div key={cls}>
          <p style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>
            {cls}
          </p>
          <Image
            src="https://picsum.photos/200/200"
            alt={`${cls} radius`}
            className={`fit-cover ${cls}`}
            style={{ width: '100px', height: '100px' }}
          />
        </div>
      ))}
    </div>
  ),
}

export const Avatar: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Image
        src="https://picsum.photos/200/200"
        alt="Small avatar"
        className="fit-cover r-full"
        style={{ width: '32px', height: '32px' }}
      />
      <Image
        src="https://picsum.photos/200/200"
        alt="Medium avatar"
        className="fit-cover r-full"
        style={{ width: '48px', height: '48px' }}
      />
      <Image
        src="https://picsum.photos/200/200"
        alt="Large avatar"
        className="fit-cover r-full"
        style={{ width: '64px', height: '64px' }}
      />
      <Image
        src="https://picsum.photos/200/200"
        alt="Extra large avatar"
        className="fit-cover r-full"
        style={{ width: '96px', height: '96px' }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Circular avatars using `r-full` with `fit-cover` utility classes.',
      },
    },
  },
}

export const CardThumbnail: Story = {
  render: () => (
    <div
      style={{
        width: '300px',
        border: '0.1rem solid var(--color-grey-4)',
        borderRadius: 'var(--radius-3)',
        overflow: 'hidden',
      }}
    >
      <Image
        src="https://picsum.photos/600/400"
        alt="Card thumbnail"
        className="fit-cover aspect-video"
        style={{ width: '100%' }}
      />
      <div style={{ padding: '1rem' }}>
        <Title level="h3">Card Title</Title>
        <p>Card description text goes here.</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Common pattern for card thumbnails with fixed aspect ratio.',
      },
    },
  },
}

export const HeroImage: Story = {
  render: () => (
    <div style={{ position: 'relative', height: '300px' }}>
      <Image
        src="https://picsum.photos/1600/900"
        alt="Hero background"
        className="fit-cover obj-center"
        style={{ width: '100%', height: '100%' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2.4rem',
          fontWeight: 'bold',
        }}
      >
        Hero Section
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full-width hero image with overlay.',
      },
    },
  },
}

export const Decorative: Story = {
  args: {
    src: 'https://picsum.photos/200/200',
    alt: '',
    className: 'r-3',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Decorative images use an empty alt="" to be ignored by screen readers.',
      },
    },
  },
}
