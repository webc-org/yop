import '@testing-library/jest-dom/vitest'

import userEvent from '@testing-library/user-event'
import { render, screen } from 'utils/Test'
import { describe, expect, it, vi } from 'vitest'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders with label', () => {
    render(<Switch label="Enable notifications" />)
    expect(screen.getByText('Enable notifications')).toBeInTheDocument()
  })

  it('renders as unchecked by default', () => {
    render(<Switch label="Test" />)
    expect(screen.getByRole('switch')).not.toBeChecked()
  })

  it('renders as checked with defaultChecked', () => {
    render(<Switch label="Test" defaultChecked />)
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('toggles on click (uncontrolled)', async () => {
    const user = userEvent.setup()
    render(<Switch label="Test" />)

    const switchEl = screen.getByRole('switch')
    expect(switchEl).not.toBeChecked()

    await user.click(switchEl)
    expect(switchEl).toBeChecked()

    await user.click(switchEl)
    expect(switchEl).not.toBeChecked()
  })

  it('calls onChange when toggled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Switch label="Test" onChange={handleChange} />)

    await user.click(screen.getByRole('switch'))
    expect(handleChange).toHaveBeenCalledWith(true)

    await user.click(screen.getByRole('switch'))
    expect(handleChange).toHaveBeenCalledWith(false)
  })

  it('works as controlled component', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { rerender } = render(
      <Switch label="Test" checked={false} onChange={handleChange} />
    )

    const switchEl = screen.getByRole('switch')
    expect(switchEl).not.toBeChecked()

    await user.click(switchEl)
    expect(handleChange).toHaveBeenCalledWith(true)
    // Still unchecked because controlled
    expect(switchEl).not.toBeChecked()

    // Parent updates the prop
    rerender(
      <Switch label="Test" checked={true} onChange={handleChange} />
    )
    expect(switchEl).toBeChecked()
  })

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Switch label="Test" disabled onChange={handleChange} />)

    await user.click(screen.getByRole('switch'))
    expect(handleChange).not.toHaveBeenCalled()
  })

  it('toggles on Enter key', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<Switch label="Test" onChange={handleChange} />)

    const switchEl = screen.getByRole('switch')
    switchEl.focus()

    await user.keyboard('{Enter}')
    expect(handleChange).toHaveBeenCalledWith(true)
    expect(switchEl).toBeChecked()

    await user.keyboard('{Enter}')
    expect(handleChange).toHaveBeenCalledWith(false)
    expect(switchEl).not.toBeChecked()
  })

  it('forwards ref to input', () => {
    const ref = { current: null }
    render(<Switch label="Test" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
