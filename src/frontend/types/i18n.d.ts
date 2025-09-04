import type { TypedLocale } from 'payload'

import type messages from '@/frontend/messages/th.json'

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages

    Locale: TypedLocale
  }
}
