'use client'

import { useEffect, useRef } from 'react'

import { useFormProcessing } from '@payloadcms/ui'
import { useParams, useRouter } from 'next/navigation'

import { navigateToDetailPage } from '@/payload/utils'

const NavigationAfterChangeField = () => {
  const useParamsHook = useParams()
  const formProcessingHook = useFormProcessing()
  const router = useRouter()

  const previousFormProcessing = useRef(formProcessingHook)

  useEffect(() => {
    const { segments = [] } = useParamsHook

    if (previousFormProcessing.current === true && formProcessingHook === false) {
      // TODO: Redirect when save pass only
      // will redirect to detail page after form processing is done
      router.push(navigateToDetailPage(segments?.[1] as string, segments?.[2] as string))
    }

    previousFormProcessing.current = formProcessingHook
  }, [formProcessingHook, router])

  return <></>
}

export default NavigationAfterChangeField
