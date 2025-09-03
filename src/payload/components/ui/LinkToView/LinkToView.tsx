'use client'

import { Link } from '@payloadcms/ui'
import type { DefaultCellComponentProps } from 'payload'

import { navigateToDetailPage } from '@/payload/utils'

const LinkToView = ({ rowData, collectionSlug }: DefaultCellComponentProps) => {
  return <Link href={navigateToDetailPage(collectionSlug, rowData.id)}>View</Link>
}

export default LinkToView
