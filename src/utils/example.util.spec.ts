import { describe, expect, it } from 'vitest'
import { exampleUtil } from './example.util'

describe('exampleUtil', () => {
  it('should return the number times 2', () => {
    expect(exampleUtil(1)).toBe(2)
  })
})
