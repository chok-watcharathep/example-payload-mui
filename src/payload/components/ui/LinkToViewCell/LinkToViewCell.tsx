'use client'

import { Link } from '@payloadcms/ui'
import type { DefaultCellComponentProps } from 'payload'

import { navigateToDetailPage } from '@/payload/utils'

const LinkToViewCell = ({ rowData, collectionSlug }: DefaultCellComponentProps) => {
  return <Link href={navigateToDetailPage(collectionSlug, rowData.id)}>รายละเอียด</Link>
}

export default LinkToViewCell
