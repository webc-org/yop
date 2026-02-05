import type { Meta, StoryObj } from '@storybook/react'
import { Image } from 'base/Image'
import { Logo, LogoFallback } from './Logo'

const meta: Meta<typeof Logo> = {
  title: 'Base/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Logo content (LogoImage or LogoFallback)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Logo>

export const Playground: Story = {
  render: () => (
    <Logo href="/">
      <LogoFallback>ACME</LogoFallback>
    </Logo>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Logo href="/">
      <Image
        src="/YOP_black.svg"
        alt="Yop Logo"
        width={81}
        height={28}
      />
    </Logo>
  ),
}

export const WithFallback: Story = {
  render: () => (
    <Logo href="/">
      <LogoFallback>Brand</LogoFallback>
    </Logo>
  ),
}

export const ImageFallbackComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
      <div>
        <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
          With Image:
        </p>
        <Logo href="/">
          <Image
            src="/YOP_black.svg"
            alt="Yop Logo"
            width={81}
            height={28}
          />
        </Logo>
      </div>

      <div>
        <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
          With Fallback:
        </p>
        <Logo href="/">
          <LogoFallback>ACME</LogoFallback>
        </Logo>
      </div>
    </div>
  ),
}
