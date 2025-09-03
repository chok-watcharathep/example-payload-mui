import environmentConfig from '@/environment.config'
import { ADMIN_URL } from '@/shared/constants'

export const navigateToDetailPage = (collectionSlug: string, id: string, isAbsoluteUrl = false) => {
  const path = `${ADMIN_URL}/collections/${collectionSlug}/${id}/detail`
  if (isAbsoluteUrl) return `${environmentConfig.NEXT_PUBLIC_PAYLOAD_API_ENDPOINT}${path}`

  return path
}
