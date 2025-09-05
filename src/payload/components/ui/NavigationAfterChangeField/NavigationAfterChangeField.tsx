'use client'

import { useEffect, useRef } from 'react'

import { useFormProcessing, useWatchForm } from '@payloadcms/ui'
import { useParams, useRouter } from 'next/navigation'

import { navigateToDetailPage } from '@/payload/utils'

const NavigationAfterChangeField = () => {
  const useParamsHook = useParams()
  const formProcessingHook = useFormProcessing()
  const router = useRouter()
  const watchFormHook = useWatchForm()

  const previousFormProcessing = useRef(formProcessingHook)

  useEffect(() => {
    const { segments = [] } = useParamsHook

    if (previousFormProcessing.current === true && formProcessingHook === false) {
      const isAllFieldValid = Object.values(watchFormHook.fields).every(
        (value) => value.valid === true,
      )
      // will redirect to detail page after form processing is done and all fields are valid
      if (isAllFieldValid) {
        router.push(navigateToDetailPage(segments?.[1] as string, segments?.[2] as string))
      }
    }

    previousFormProcessing.current = formProcessingHook
  }, [formProcessingHook, router, watchFormHook])

  return <></>
}

export default NavigationAfterChangeField
