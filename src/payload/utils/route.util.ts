import { ADMIN_ROUTE } from '@/payload/constants'

export const navigateToDetailPage = (collectionSlug: string, id: string) => {
  return `${ADMIN_ROUTE}/collections/${collectionSlug}/${id}/detail`
}
