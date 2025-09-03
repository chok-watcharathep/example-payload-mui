import { describe, it, expect } from 'vitest'

import { example } from '@/payload/utils/example.util'

describe('example', () => {
  it('should return double the number', () => {
    expect(example(2)).toBe(4)
  })
})
