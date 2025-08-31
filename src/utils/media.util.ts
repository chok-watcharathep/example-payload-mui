import { Media } from '@/payload-types'

export const isMedia = (image: number | Media | null | undefined): image is Media => {
  return typeof image === 'object' && image !== null && 'url' in image
}
