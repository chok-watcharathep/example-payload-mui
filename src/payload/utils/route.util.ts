import { ADMIN_URL } from '@/shared/constants'

export const navigateToDetailPage = (collectionSlug: string, id: string) => {
  return `${ADMIN_URL}/collections/${collectionSlug}/${id}/detail`
}
