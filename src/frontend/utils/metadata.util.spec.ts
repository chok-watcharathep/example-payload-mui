import { describe, expect, it, vi } from 'vitest'

import { Route } from '@/frontend/enums'
import { generatePageMetadata } from '@/frontend/utils'
import type { Media, Page } from '@/payload-types'

vi.mock('@/environment.config', () => ({
  default: {
    NEXT_PUBLIC_APP_BASE_URL: 'https://example.com',
  },
}))

describe('generatePageMetadata', () => {
  it('should return empty object when no page is provided', () => {
    const result = generatePageMetadata(Route.HOME)

    expect(result).toEqual({})
  })

  it('should return empty object when page is undefined', () => {
    const result = generatePageMetadata(Route.HOME, undefined)

    expect(result).toEqual({})
  })

  it('should generate basic metadata with page name when no meta is provided', () => {
    const page: Page = {
      id: 1,
      name: 'Test Page',
      slug: 'test-page',
      description: 'Test Page',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    }

    const result = generatePageMetadata(Route.HOME, page)

    expect(result).toEqual({
      title: 'Test Page',
      description: 'Test Page',
      keywords: ['Test Page', 'example', 'static', 'page'],
      openGraph: {
        title: 'Test Page',
        description: 'Test Page',
        type: 'website',
        url: 'https://example.com/',
        images: [],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Test Page',
        description: 'Test Page',
        images: [],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
    })
  })

  it('should use meta title and description when provided', () => {
    const page: Page = {
      id: 1,
      name: 'Test Page',
      slug: 'test-page',
      description: 'Test Page',
      meta: {
        title: 'Custom Title',
        description: 'Custom Description',
      },
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    }

    const result = generatePageMetadata(Route.ABOUT, page)

    expect(result).toEqual({
      title: 'Custom Title',
      description: 'Custom Description',
      keywords: ['Test Page', 'example', 'static', 'page'],
      openGraph: {
        title: 'Custom Title',
        description: 'Custom Description',
        type: 'website',
        url: 'https://example.com/about',
        images: [],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Custom Title',
        description: 'Custom Description',
        images: [],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
    })
  })

  it('should include image metadata when meta image is provided and isMedia returns true', () => {
    const page: Page = {
      id: 1,
      name: 'Test Page',
      slug: 'test-page',
      description: 'Test Page',
      meta: {
        title: 'Custom Title',
        description: 'Custom Description',
        image: {
          id: 1,
          url: 'https://example.com/image.jpg',
          width: 1200,
          height: 630,
          filename: 'image.jpg',
          mimeType: 'image/jpeg',
          filesize: 100000,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
        } as unknown as Media,
      },
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    }

    const result = generatePageMetadata(Route.PRODUCTS, page)

    expect(result.openGraph?.images).toEqual([
      {
        url: 'https://example.com/image.jpg',
        width: 1200,
        height: 630,
        alt: 'Test Page',
      },
    ])

    expect(result.twitter?.images).toEqual([
      {
        url: 'https://example.com/image.jpg',
        width: 1200,
        height: 630,
        alt: 'Test Page',
      },
    ])
  })

  it('should use default image dimensions when not provided', () => {
    const page: Page = {
      id: 1,
      name: 'Test Page',
      slug: 'test-page',
      description: 'Test Page',
      meta: {
        image: {
          id: 1,
          url: 'https://example.com/image.jpg',
          filename: 'image.jpg',
          mimeType: 'image/jpeg',
          filesize: 100000,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
        } as unknown as Media,
      },
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    }

    const result = generatePageMetadata(Route.CONTACT_US, page)

    expect(result.openGraph?.images).toEqual([
      {
        url: 'https://example.com/image.jpg',
        width: 800,
        height: 600,
        alt: 'Test Page',
      },
    ])
  })

  it('should handle empty image url', () => {
    const page: Page = {
      id: 1,
      name: 'Test Page',
      slug: 'test-page',
      description: 'Test Page',
      meta: {
        image: {
          id: 1,
          url: '',
          filename: 'image.jpg',
          mimeType: 'image/jpeg',
          filesize: 100000,
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
        } as unknown as Media,
      },
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    }

    const result = generatePageMetadata(Route.BLOG, page)

    expect(result.openGraph?.images).toEqual([
      {
        url: '',
        width: 800,
        height: 600,
        alt: 'Test Page',
      },
    ])
  })

  it('should not include images when isMedia returns false', () => {
    const page: Page = {
      id: 1,
      name: 'Test Page',
      slug: 'test-page',
      description: 'Test Page',
      meta: {
        image: 'not-a-media-object' as unknown as Media,
      },
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    }

    const result = generatePageMetadata(Route.CAREERS, page)

    expect(result.openGraph?.images).toEqual([])
    expect(result.twitter?.images).toEqual([])
  })

  it('should generate correct URL for different routes', () => {
    const page: Page = {
      id: 1,
      name: 'Test Page',
      slug: 'test-page',
      description: 'Test Page',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    }

    const result = generatePageMetadata(Route.EXAMPLE_STATIC_PAGE, page)

    expect(result.openGraph?.url).toBe('https://example.com/example-static-page')
  })

  it('should always include robots metadata with correct values', () => {
    const page: Page = {
      id: 1,
      name: 'Test Page',
      slug: 'test-page',
      description: 'Test Page',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    }

    const result = generatePageMetadata(Route.PRIVACY_POLICY, page)

    expect(result.robots).toEqual({
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    })
  })

  it('should handle page with empty meta object', () => {
    const page: Page = {
      id: 1,
      name: 'Test Page',
      slug: 'test-page',
      description: 'Test Page',
      meta: {},
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    }

    const result = generatePageMetadata(Route.SETTINGS, page)

    expect(result.title).toBe('Test Page')
    expect(result.description).toBe('Test Page')
    expect(result.openGraph?.images).toEqual([])
  })
})
