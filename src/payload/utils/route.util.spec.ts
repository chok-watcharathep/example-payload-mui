import { describe, it, expect } from 'vitest'

import { ADMIN_ROUTE } from '@/payload/constants'
import { navigateToDetailPage } from '@/payload/utils'

describe('navigateToDetailPage', () => {
  it('should return navigate to detail page', () => {
    expect(navigateToDetailPage('test', 'test')).toBe(`${ADMIN_ROUTE}/collections/test/test/detail`)
  })
})
