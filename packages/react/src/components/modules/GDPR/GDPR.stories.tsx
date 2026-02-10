import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'components/form'
import { Modals } from 'components/modules'
import { GDPRProvider, useGDPR } from './GDPRContext'

const meta: Meta = {
  title: 'Modules/GDPR',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Modals>
        <Story />
      </Modals>
    ),
  ],
}

export default meta
type Story = StoryObj

const GDPRControls = () => {
  const { openSettings, consent, hasConsented } = useGDPR()

  return (
    <div>
      <Button variant="primary" appearance="button" onClick={openSettings}>
        Open Cookie Settings
      </Button>

      <pre className="fs-3 mt-2">
        {JSON.stringify({ hasConsented, consent }, null, 2)}
      </pre>
    </div>
  )
}

export const Playground: Story = {
  render: () => (
    <GDPRProvider
      autoOpen={false}
      termsUrl="/terms"
      privacyPolicyUrl="/privacy"
    >
      <GDPRControls />
    </GDPRProvider>
  ),
}

export const AutoOpen: Story = {
  render: () => (
    <GDPRProvider
      autoOpen={true}
      termsUrl="/terms"
      privacyPolicyUrl="/privacy"
    >
      <GDPRControls />
    </GDPRProvider>
  ),
}

export const CustomCategories: Story = {
  render: () => (
    <GDPRProvider
      autoOpen={false}
      categories={[
        {
          id: 'necessary',
          label: 'Essential',
          description: 'Core site functionality.',
          required: true,
        },
        {
          id: 'analytics',
          label: 'Analytics',
          description: 'Usage statistics and site improvements.',
        },
      ]}
      strings={{ title: 'Privacy Preferences' }}
    >
      <GDPRControls />
    </GDPRProvider>
  ),
}

export const CustomStrings: Story = {
  render: () => (
    <GDPRProvider
      autoOpen={false}
      strings={{
        title: 'Datenschutzeinstellungen',
        acceptAll: 'Alle akzeptieren',
        necessaryOnly: 'Nur notwendige',
        confirmSelections: 'Auswahl bestätigen',
        description:
          'Wir verwenden Cookies, um diese Website zu betreiben.',
      }}
    >
      <GDPRControls />
    </GDPRProvider>
  ),
}
