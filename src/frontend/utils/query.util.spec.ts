import { describe, it, expect } from 'vitest'

import { DEFAUlT_PAGE, DEFAUlT_PAGE_SIZE } from '@/frontend/constants'
import type { BaseSearchRequest } from '@/frontend/interfaces'
import { getUrlQueryState } from '@/frontend/utils'

describe('getUrlQueryState', () => {
  it('should return defaults when no params are provided', () => {
    const params = {} as BaseSearchRequest
    const result = getUrlQueryState(params)

    expect(result).toEqual({
      page: Number(DEFAUlT_PAGE),
      pageSize: Number(DEFAUlT_PAGE_SIZE),
      search: '',
    })
  })

  it('should return provided page, limit and search', () => {
    const params: BaseSearchRequest = {
      page: 3,
      limit: 50,
      search: 'keyword',
    }

    const result = getUrlQueryState(params)

    expect(result).toEqual({
      page: 3,
      pageSize: 50,
      search: 'keyword',
    })
  })

  it('should handle string values for page and limit', () => {
    const params = {
      page: '5',
      limit: '10',
    } as unknown as BaseSearchRequest

    const result = getUrlQueryState(params)

    expect(result).toEqual({
      page: 5,
      pageSize: 10,
      search: '',
    })
  })

  it('should fallback to default page and limit when undefined', () => {
    const params = {
      page: undefined,
      limit: undefined,
      search: undefined,
    } as unknown as BaseSearchRequest

    const result = getUrlQueryState(params)

    expect(result).toEqual({
      page: Number(DEFAUlT_PAGE),
      pageSize: Number(DEFAUlT_PAGE_SIZE),
      search: '',
    })
  })

  it('should keep search as empty string when explicitly provided as empty', () => {
    const params = {
      search: '',
    } as BaseSearchRequest

    const result = getUrlQueryState(params)

    expect(result.search).toBe('')
  })

  it('should use options.defaultPage when page is missing', () => {
    const params = {} as BaseSearchRequest
    const result = getUrlQueryState(params, { defaultPage: '7' })

    expect(result.page).toBe(7)
    expect(result.pageSize).toBe(Number(DEFAUlT_PAGE_SIZE))
  })

  it('should use options.defaultPageSize when limit is missing', () => {
    const params = {} as BaseSearchRequest
    const result = getUrlQueryState(params, { defaultPageSize: '25' })

    expect(result.page).toBe(Number(DEFAUlT_PAGE))
    expect(result.pageSize).toBe(25)
  })

  it('should prefer params over options when both are provided', () => {
    const params: BaseSearchRequest = {
      page: 2,
      limit: 15,
    }
    const result = getUrlQueryState(params, {
      defaultPage: '8',
      defaultPageSize: '99',
    })

    expect(result.page).toBe(2)
    expect(result.pageSize).toBe(15)
  })

  it('should convert options.defaultPage and options.defaultPageSize to numbers', () => {
    const params = {} as BaseSearchRequest
    const result = getUrlQueryState(params, {
      defaultPage: '12',
      defaultPageSize: '30',
    })

    expect(result.page).toBe(12)
    expect(result.pageSize).toBe(30)
  })
})
