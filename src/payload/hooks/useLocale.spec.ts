import { useLocale } from '@payloadcms/ui'
import { renderHook } from '@testing-library/react'
import { useSearchParams } from 'next/navigation'
import type { Mock } from 'vitest'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { useAdminLocale } from '@/payload/hooks'
import { DEFAULT_LOCALE } from '@/shared/constants'

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}))

vi.mock('@payloadcms/ui', () => ({
  useLocale: vi.fn(),
}))

describe('useAdminLocale', () => {
  const mockUseSearchParams = useSearchParams as unknown as Mock
  const mockUseLocale = useLocale as unknown as Mock

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns locale from searchParams if available', () => {
    const searchParams = new URLSearchParams({ locale: 'fr' })
    mockUseSearchParams.mockReturnValue(searchParams)
    mockUseLocale.mockReturnValue({ code: 'en' })

    const { result } = renderHook(() => useAdminLocale())

    expect(result.current).toBe('fr')
  })

  it('falls back to useLocale.code when searchParams has no locale', () => {
    const searchParams = new URLSearchParams()
    mockUseSearchParams.mockReturnValue(searchParams)
    mockUseLocale.mockReturnValue({ code: 'de' })

    const { result } = renderHook(() => useAdminLocale())

    expect(result.current).toBe('de')
  })

  it('falls back to DEFAULT_LOCALE when neither searchParams nor useLocale provides a value', () => {
    const searchParams = new URLSearchParams()
    mockUseSearchParams.mockReturnValue(searchParams)
    mockUseLocale.mockReturnValue({ code: '' })

    const { result } = renderHook(() => useAdminLocale())

    expect(result.current).toBe(DEFAULT_LOCALE)
  })
})
