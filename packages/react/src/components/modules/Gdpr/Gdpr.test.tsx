import { useEffect } from 'react'
import '@testing-library/jest-dom/vitest'
import { act, fireEvent, render, screen } from 'utils/Test'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Modals } from '../Modal'
import { GdprProvider, useGdpr } from './GdprContext'

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
  const { consent, hasConsented, openSettings } = useGdpr()

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
        <GdprProvider autoOpen={false}>
          <div data-testid="child">Hello</div>
        </GdprProvider>
      </Modals>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('auto-opens modal on first visit', async () => {
    render(
      <Modals>
        <GdprProvider>
          <TestConsumer />
        </GdprProvider>
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
        <GdprProvider autoOpen={false}>
          <TestConsumer />
        </GdprProvider>
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
        <GdprProvider autoOpen={false}>
          <TestConsumer />
        </GdprProvider>
      </Modals>
    )

    fireEvent.click(screen.getByTestId('open-settings'))
    await act(async () => vi.advanceTimersByTime(150))

    const modal = document.querySelector('[role="dialog"]')
    expect(modal).toBeInTheDocument()
    expect(modal).toHaveTextContent('Cookie Settings')
  })

  it('shows banner view by default with Accept All, Necessary Only, and More Choices', async () => {
    render(
      <Modals>
        <GdprProvider>
          <TestConsumer />
        </GdprProvider>
      </Modals>
    )
    await act(async () => vi.advanceTimersByTime(150))

    expect(screen.getByText('Accept All')).toBeInTheDocument()
    expect(screen.getByText('Necessary Only')).toBeInTheDocument()
    expect(screen.getByText('More Choices')).toBeInTheDocument()
    expect(
      screen.queryByText('Confirm Selections')
    ).not.toBeInTheDocument()
  })

  it('does not show categories in banner view', async () => {
    render(
      <Modals>
        <GdprProvider>
          <TestConsumer />
        </GdprProvider>
      </Modals>
    )
    await act(async () => vi.advanceTimersByTime(150))

    expect(screen.queryByText('Targeting Cookies')).not.toBeInTheDocument()
    expect(
      screen.queryByText('Functional Cookies')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('Performance Cookies')
    ).not.toBeInTheDocument()
  })

  it('clicking More Choices shows preferences view with categories', async () => {
    render(
      <Modals>
        <GdprProvider>
          <TestConsumer />
        </GdprProvider>
      </Modals>
    )
    await act(async () => vi.advanceTimersByTime(150))

    fireEvent.click(screen.getByText('More Choices'))

    expect(screen.getByText('Necessary Cookies')).toBeInTheDocument()
    expect(screen.getByText('Targeting Cookies')).toBeInTheDocument()
    expect(screen.getByText('Functional Cookies')).toBeInTheDocument()
    expect(screen.getByText('Performance Cookies')).toBeInTheDocument()
  })

  it('preferences view shows Confirm Selections instead of More Choices', async () => {
    render(
      <Modals>
        <GdprProvider>
          <TestConsumer />
        </GdprProvider>
      </Modals>
    )
    await act(async () => vi.advanceTimersByTime(150))

    fireEvent.click(screen.getByText('More Choices'))

    expect(screen.getByText('Accept All')).toBeInTheDocument()
    expect(screen.getByText('Necessary Only')).toBeInTheDocument()
    expect(screen.getByText('Confirm Selections')).toBeInTheDocument()
    expect(screen.queryByText('More Choices')).not.toBeInTheDocument()
  })

  it('shows Always Active badge for required categories in preferences', async () => {
    render(
      <Modals>
        <GdprProvider>
          <TestConsumer />
        </GdprProvider>
      </Modals>
    )
    await act(async () => vi.advanceTimersByTime(150))

    fireEvent.click(screen.getByText('More Choices'))

    expect(screen.getByText('Always Active')).toBeInTheDocument()
  })

  it('saves consent to localStorage on Accept All from banner', async () => {
    const onConsentChange = vi.fn()

    render(
      <Modals>
        <GdprProvider onConsentChange={onConsentChange}>
          <TestConsumer />
        </GdprProvider>
      </Modals>
    )
    await act(async () => vi.advanceTimersByTime(150))

    fireEvent.click(screen.getByText('Accept All'))

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'GDPR',
      expect.any(String)
    )

    const stored = JSON.parse(localStorageMock.setItem.mock.calls[0][1])
    expect(stored.necessary).toBe(true)
    expect(stored.targeting).toBe(true)
    expect(stored.functional).toBe(true)
    expect(stored.performance).toBe(true)
    expect(onConsentChange).toHaveBeenCalled()
  })

  it('saves necessary-only consent from banner', async () => {
    render(
      <Modals>
        <GdprProvider>
          <TestConsumer />
        </GdprProvider>
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

  it('renders footer links when URLs provided', async () => {
    render(
      <Modals>
        <GdprProvider privacyPolicyUrl="/privacy" termsUrl="/terms">
          <TestConsumer />
        </GdprProvider>
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
