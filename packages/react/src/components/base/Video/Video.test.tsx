import '@testing-library/jest-dom/vitest'

import { render, screen } from 'utils/Test'
import { describe, expect, it } from 'vitest'
import { Video } from './Video'

describe('Video', () => {
  it('renders video element', () => {
    render(<Video src="test.mp4" data-testid="video" />)
    expect(screen.getByTestId('video')).toBeInTheDocument()
  })

  it('renders with poster', () => {
    render(
      <Video src="test.mp4" poster="poster.jpg" data-testid="video" />
    )
    expect(screen.getByTestId('video')).toHaveAttribute(
      'poster',
      'poster.jpg'
    )
  })

  it('renders with controls by default', () => {
    render(<Video src="test.mp4" data-testid="video" />)
    expect(screen.getByTestId('video')).toHaveAttribute('controls')
  })

  it('renders without controls when disabled', () => {
    render(<Video src="test.mp4" controls={false} data-testid="video" />)
    expect(screen.getByTestId('video')).not.toHaveAttribute('controls')
  })

  it('renders with caption in figure', () => {
    render(<Video src="test.mp4" caption="Video caption" />)
    expect(screen.getByRole('group')).toBeInTheDocument()
    expect(screen.getByText('Video caption')).toBeInTheDocument()
  })

  it('applies className', () => {
    render(
      <Video
        src="test.mp4"
        className="aspect-video r-3"
        data-testid="video"
      />
    )
    expect(screen.getByTestId('video')).toHaveClass('aspect-video')
    expect(screen.getByTestId('video')).toHaveClass('r-3')
  })

  it('renders multiple sources', () => {
    render(
      <Video
        sources={[
          { src: 'video.mp4', type: 'video/mp4' },
          { src: 'video.webm', type: 'video/webm' },
        ]}
        data-testid="video"
      />
    )
    const video = screen.getByTestId('video')
    const sources = video.querySelectorAll('source')
    expect(sources).toHaveLength(2)
    expect(sources[0]).toHaveAttribute('src', 'video.mp4')
    expect(sources[0]).toHaveAttribute('type', 'video/mp4')
  })

  it('renders tracks for subtitles', () => {
    render(
      <Video
        src="test.mp4"
        tracks={[
          {
            src: 'subs_en.vtt',
            kind: 'subtitles',
            srclang: 'en',
            label: 'English',
            default: true,
          },
        ]}
        data-testid="video"
      />
    )
    const video = screen.getByTestId('video')
    const track = video.querySelector('track')
    expect(track).toHaveAttribute('src', 'subs_en.vtt')
    expect(track).toHaveAttribute('kind', 'subtitles')
    expect(track).toHaveAttribute('label', 'English')
  })

  it('renders fallback content', () => {
    render(<Video src="test.mp4" fallback={<p>Custom fallback</p>} />)
    expect(screen.getByText('Custom fallback')).toBeInTheDocument()
  })

  it('renders default fallback with link', () => {
    render(<Video src="test.mp4" />)
    expect(screen.getByText('link to the video')).toHaveAttribute(
      'href',
      'test.mp4'
    )
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Video ref={ref} src="test.mp4" />)
    expect(ref.current).toBeInstanceOf(HTMLVideoElement)
  })
})
