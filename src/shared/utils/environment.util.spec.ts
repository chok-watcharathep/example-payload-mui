import { describe, it, expect } from 'vitest'

import type { EnvironmentConfig } from '@/environment.config'
import { getPublicEnv } from '@/shared/utils'

describe('getPublicEnv', () => {
  it('should return only keys starting with NEXT_PUBLIC_', () => {
    const env = {
      NEXT_PUBLIC_APP_BASE_URL: 'https://example.com',
      NEXT_PUBLIC_API_ENDPOINT: 'https://api.example.com',
      SECRET_KEY: 'super-secret',
      NODE_ENV: 'test',
    } as unknown as EnvironmentConfig

    const result = getPublicEnv(env)

    expect(result).toEqual({
      NEXT_PUBLIC_APP_BASE_URL: 'https://example.com',
      NEXT_PUBLIC_API_ENDPOINT: 'https://api.example.com',
    })
  })

  it('should return an empty object if no NEXT_PUBLIC_ keys exist', () => {
    const env = {
      SECRET_KEY: 'xxx',
      NODE_ENV: 'development',
    } as unknown as EnvironmentConfig

    const result = getPublicEnv(env)

    expect(result).toEqual({})
  })

  it('should handle an empty env object', () => {
    const env = {} as EnvironmentConfig

    const result = getPublicEnv(env)

    expect(result).toEqual({})
  })

  it('should preserve values as-is', () => {
    const env = {
      NEXT_PUBLIC_APP_BASE_URL: 'https://example.com',
      NEXT_PUBLIC_API_ENDPOINT: 'https://api.example.com',
    } as unknown as EnvironmentConfig

    const result = getPublicEnv(env)

    expect(result.NEXT_PUBLIC_APP_BASE_URL).toBe('https://example.com')
    expect(result.NEXT_PUBLIC_API_ENDPOINT).toBe('https://api.example.com')
  })
})
