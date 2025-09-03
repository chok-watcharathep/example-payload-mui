import { ADMIN_URL } from '@/payload/constants'

export const navigateToDetailPage = (collectionSlug: string, id: string) => {
  return `${ADMIN_URL}/collections/${collectionSlug}/${id}/detail`
}
