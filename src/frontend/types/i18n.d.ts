import type messages from '@/frontend/messages/en.json'

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages
  }
}
