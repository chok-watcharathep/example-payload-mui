import { renderHook, act } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import { useUrlQueryState } from '@/frontend/hooks'

const pushMock = vi.fn()
const useRouterMock = vi.fn()
const usePathnameMock = vi.fn()
const useSearchParamsMock = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => useRouterMock(),
  usePathname: () => usePathnameMock(),
  useSearchParams: () => useSearchParamsMock(),
}))

describe('useUrlQueryState', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useRouterMock.mockReturnValue({ push: pushMock })
    usePathnameMock.mockReturnValue('/test-path')
    useSearchParamsMock.mockReturnValue(new URLSearchParams())
  })

  it('should return default pagination and search values', () => {
    const { result } = renderHook(() => useUrlQueryState())

    expect(result.current.pagination.page).toBe(1)
    expect(result.current.pagination.limit).toBe(20)
    expect(result.current.search.search).toBe('')
  })

  it('should use provided searchParams values', () => {
    useSearchParamsMock.mockReturnValue(
      new URLSearchParams({ page: '3', limit: '50', search: 'hello' }),
    )

    const { result } = renderHook(() => useUrlQueryState())

    expect(result.current.pagination.page).toBe(3)
    expect(result.current.pagination.limit).toBe(50)
    expect(result.current.search.search).toBe('hello')
  })

  it('should call router.push onPageChange', () => {
    const { result } = renderHook(() => useUrlQueryState())

    act(() => {
      result.current.pagination.onPageChange(5)
    })

    expect(pushMock).toHaveBeenCalledWith('/test-path?page=5&limit=20', { scroll: true })
  })

  it('should reset page and call router.push onLimitChange', () => {
    const { result } = renderHook(() => useUrlQueryState())

    act(() => {
      result.current.pagination.onLimitChange(100)
    })

    expect(pushMock).toHaveBeenCalledWith('/test-path?page=1&limit=100', { scroll: true })
  })

  it('should reset page and call router.push onSearch', () => {
    const { result } = renderHook(() => useUrlQueryState())

    act(() => {
      result.current.search.onSearch({ searchBy: 'name', search: 'john' })
    })

    expect(pushMock).toHaveBeenCalledWith('/test-path?page=1&searchBy=name&search=john', {
      scroll: true,
    })
  })

  it('should apply filters and call router.push', () => {
    const { result } = renderHook(() => useUrlQueryState())

    act(() => {
      result.current.filter.onApplyFilter({ category: 'books', price: '10' })
    })

    expect(pushMock).toHaveBeenCalledWith('/test-path?page=1&category=books&price=10', {
      scroll: true,
    })
  })

  it('should delete filter key if value is empty string', () => {
    // start with an existing search param
    useSearchParamsMock.mockReturnValue(new URLSearchParams({ category: 'books', price: '10' }))

    const { result } = renderHook(() => useUrlQueryState())

    act(() => {
      result.current.filter.onApplyFilter({ category: '' }) // category cleared
    })

    // Expect "category" removed, but "price" stays
    expect(pushMock).toHaveBeenCalledWith('/test-path?price=10&page=1', { scroll: true })
  })

  it('should clear filters and call router.push with pathname only', () => {
    const { result } = renderHook(() => useUrlQueryState())

    act(() => {
      result.current.filter.onClearFilter()
    })

    expect(pushMock).toHaveBeenCalledWith('/test-path', { scroll: true })
  })
})
