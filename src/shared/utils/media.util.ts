import type { Media } from '@/payload-types'

export const isMedia = (image: unknown): image is Media => {
  return typeof image === 'object' && image !== null && 'url' in image
}
