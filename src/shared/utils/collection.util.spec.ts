import { describe, it, expect } from 'vitest'

import { isCollection } from '@/shared/utils'

describe('isCollection', () => {
  it('should return true when collection is valid', () => {
    expect(isCollection({})).toBe(true)
    expect(isCollection([])).toBe(true)
    expect(
      isCollection({
        id: '1',
        name: 'test',
      }),
    ).toBe(true)
    expect(
      isCollection([
        {
          id: '1',
          name: 'test',
        },
      ]),
    ).toBe(true)
  })

  it('should return false when collection is invalid', () => {
    expect(isCollection(null)).toBe(false)
    expect(isCollection(undefined)).toBe(false)
    expect(isCollection(false)).toBe(false)
    expect(isCollection(true)).toBe(false)
    expect(isCollection(0)).toBe(false)
    expect(isCollection('')).toBe(false)
    expect(isCollection('test')).toBe(false)
    expect(isCollection(123)).toBe(false)
  })
})
