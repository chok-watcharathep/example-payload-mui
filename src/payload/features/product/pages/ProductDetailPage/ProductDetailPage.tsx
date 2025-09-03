'use client'

import { useEffect } from 'react'

import { Collapsible, Gutter, LoadingOverlay, useStepNav } from '@payloadcms/ui'
import { notFound, useParams } from 'next/navigation'

import { ADMIN_URL_COLLECTION } from '@/payload/constants'
import { useAdminGetProductDetail } from '@/payload/features/product/hooks'
import type { Faculty, Major, University } from '@/payload-types'
import { isCollection } from '@/shared/utils'

import './ProductDetailPage.scss'

const ProductDetailPage = () => {
  const paramsHook = useParams()
  const stepNavHook = useStepNav()
  const { data: productDetail, isLoading } = useAdminGetProductDetail({
    id: paramsHook.segments?.[2] as string,
  })

  useEffect(() => {
    if (!productDetail) {
      return
    }
    stepNavHook.setStepNav([
      {
        label: 'สินค้า',
        url: `${ADMIN_URL_COLLECTION}/products`,
      },
      {
        label: productDetail.name,
        url: `${ADMIN_URL_COLLECTION}/products/${productDetail.id}`,
      },
      {
        label: 'รายละเอียด',
      },
    ])
  }, [productDetail?.id])

  if (isLoading) {
    return (
      <Gutter>
        <LoadingOverlay />
      </Gutter>
    )
  }

  if (!productDetail) {
    notFound()
  }

  return (
    <div className="product-detail-page">
      <Gutter className=" document-fields__edit">
        <Collapsible header="เชื่อมโยงหลักสูตร" className="link-curriculum-container">
          {productDetail.linkCurriculums?.map((linkCurriculum) => (
            <Collapsible
              header={
                isCollection<University>(linkCurriculum.university)
                  ? linkCurriculum.university.name
                  : linkCurriculum.university
              }
              key={linkCurriculum.id}
            >
              <p>
                {isCollection<University>(linkCurriculum.university)
                  ? linkCurriculum.university.name
                  : linkCurriculum.university}
              </p>
              <p>
                {linkCurriculum.faculties
                  ?.map((facultyRelation) =>
                    isCollection<Faculty>(facultyRelation.faculty)
                      ? facultyRelation.faculty.name
                      : facultyRelation.faculty,
                  )
                  .join(', ')}
              </p>
              <p>
                {linkCurriculum.faculties
                  ?.map((facultyRelation) =>
                    facultyRelation.majors
                      ?.map((major) => (isCollection<Major>(major) ? major.name : major))
                      .join(', '),
                  )
                  .join(', ')}
              </p>
            </Collapsible>
          ))}
        </Collapsible>
      </Gutter>
    </div>
  )
}

export default ProductDetailPage
