import { useEffect } from 'react'
import '@testing-library/jest-dom/vitest'
import { act, fireEvent, render, screen } from 'utils/Test'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Modals } from '../Modal/Modals'
import { GDPRProvider, useGDPR } from './GDPRContext'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

function TestConsumer({
  onConsent,
}: {
  onConsent?: (c: unknown) => void
}) {
  const { consent, hasConsented, openSettings } = useGDPR()

  useEffect(() => {
    onConsent?.({ consent, hasConsented })
  }, [consent, hasConsented, onConsent])

  return (
    <button
      type="button"
      data-testid="open-settings"
      onClick={openSettings}
    >
      Open
    </button>
  )
}

describe('GDPR', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    localStorageMock.clear()
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
  })

  afterEach(() => {
    act(() => vi.runOnlyPendingTimers())
    vi.useRealTimers()
  })

  it('renders children without crashing', () => {
    render(
      <Modals>
        <GDPRProvider autoOpen={false}>
          <div data-testid="child">Hello</div>
        </GDPRProvider>
      </Modals>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('auto-opens modal on first visit', async () => {
    render(
      <Modals>
        <GDPRProvider autoOpen={true}>
          <TestConsumer />
        </GDPRProvider>
      </Modals>
    )
    await act(async () => vi.advanceTimersByTime(150))

    const modal = document.querySelector('[role="dialog"]')
    expect(modal).toBeInTheDocument()
    expect(modal).toHaveTextContent('Cookie Settings')
  })

  it('does not auto-open when autoOpen is false', async () => {
    render(
      <Modals>
        <GDPRProvider autoOpen={false}>
          <TestConsumer />
        </GDPRProvider>
      </Modals>
    )
    await act(async () => vi.advanceTimersByTime(150))

    expect(
      document.querySelector('[role="dialog"]')
    ).not.toBeInTheDocument()
  })

  it('opens modal via openSettings', async () => {
    render(
      <Modals>
        <GDPRProvider autoOpen={false}>
          <TestConsumer />
        </GDPRProvider>
      </Modals>
    )

    fireEvent.click(screen.getByTestId('open-settings'))
    await act(async () => vi.advanceTimersByTime(150))

    const modal = document.querySelector('[role="dialog"]')
    expect(modal).toBeInTheDocument()
    expect(modal).toHaveTextContent('Cookie Settings')
  })

  it('renders all default categories', async () => {
    render(
      <Modals>
        <GDPRProvider autoOpen={true}>
          <TestConsumer />
        </GDPRProvider>
      </Modals>
    )
    await act(async () => vi.advanceTimersByTime(150))

    expect(screen.getByText('Necessary Cookies')).toBeInTheDocument()
    expect(screen.getByText('Targeting Cookies')).toBeInTheDocument()
    expect(screen.getByText('Functional Cookies')).toBeInTheDocument()
    expect(screen.getByText('Performance Cookies')).toBeInTheDocument()
  })

  it('shows Always Active badge for required categories', async () => {
    render(
      <Modals>
        <GDPRProvider autoOpen={true}>
          <TestConsumer />
        </GDPRProvider>
      </Modals>
    )
    await act(async () => vi.advanceTimersByTime(150))

    expect(screen.getByText('Always Active')).toBeInTheDocument()
  })

  it('saves consent to localStorage on Accept All', async () => {
    const onConsentChange = vi.fn()

    render(
      <Modals>
        <GDPRProvider autoOpen={true} onConsentChange={onConsentChange}>
          <TestConsumer />
        </GDPRProvider>
      </Modals>
    )
    await act(async () => vi.advanceTimersByTime(150))

    fireEvent.click(screen.getByText('Accept All'))

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'pushui-gdpr',
      expect.any(String)
    )

    const stored = JSON.parse(localStorageMock.setItem.mock.calls[0][1])
    expect(stored.necessary).toBe(true)
    expect(stored.targeting).toBe(true)
    expect(stored.functional).toBe(true)
    expect(stored.performance).toBe(true)
    expect(onConsentChange).toHaveBeenCalled()
  })

  it('saves necessary-only consent', async () => {
    render(
      <Modals>
        <GDPRProvider autoOpen={true}>
          <TestConsumer />
        </GDPRProvider>
      </Modals>
    )
    await act(async () => vi.advanceTimersByTime(150))

    fireEvent.click(screen.getByText('Necessary Only'))

    const stored = JSON.parse(localStorageMock.setItem.mock.calls[0][1])
    expect(stored.necessary).toBe(true)
    expect(stored.targeting).toBe(false)
    expect(stored.functional).toBe(false)
    expect(stored.performance).toBe(false)
  })

  it('renders action buttons', async () => {
    render(
      <Modals>
        <GDPRProvider autoOpen={true}>
          <TestConsumer />
        </GDPRProvider>
      </Modals>
    )
    await act(async () => vi.advanceTimersByTime(150))

    expect(screen.getByText('Accept All')).toBeInTheDocument()
    expect(screen.getByText('Necessary Only')).toBeInTheDocument()
    expect(screen.getByText('Confirm Selections')).toBeInTheDocument()
  })

  it('renders footer links when URLs provided', async () => {
    render(
      <Modals>
        <GDPRProvider
          autoOpen={true}
          privacyPolicyUrl="/privacy"
          termsUrl="/terms"
        >
          <TestConsumer />
        </GDPRProvider>
      </Modals>
    )
    await act(async () => vi.advanceTimersByTime(150))

    expect(screen.getByText('Privacy Policy')).toHaveAttribute(
      'href',
      '/privacy'
    )
    expect(screen.getByText('Terms of Use')).toHaveAttribute(
      'href',
      '/terms'
    )
  })
})
