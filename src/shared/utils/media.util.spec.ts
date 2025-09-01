import { describe, it, expect } from 'vitest'

import type { Media } from '@/payload-types'
import { isMedia } from '@/shared/utils'

describe('isMedia', () => {
  it('should return true when image is a Media object with url', () => {
    const media: Media = {
      id: '1',
      url: 'https://example.com/image.jpg',
    } as unknown as Media

    expect(isMedia(media)).toBe(true)
  })

  it('should return false when image is null', () => {
    expect(isMedia(null)).toBe(false)
  })

  it('should return false when image is undefined', () => {
    expect(isMedia(undefined)).toBe(false)
  })

  it('should return false when image is a number', () => {
    expect(isMedia(123)).toBe(false)
  })

  it('should return false when image is an object without url', () => {
    const obj = { id: 'no-url' }
    expect(isMedia(obj as unknown as Media)).toBe(false)
  })

  it('should return true even if Media has other props in addition to url', () => {
    const media = {
      id: '2',
      url: '/test.png',
      alt: 'alt text',
      width: 100,
    }
    expect(isMedia(media as unknown as Media)).toBe(true)
  })
})
