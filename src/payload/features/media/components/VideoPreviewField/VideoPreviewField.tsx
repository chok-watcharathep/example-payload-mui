'use client'

import React, { useEffect, useState } from 'react'

import { Drawer, DrawerToggler, useAllFormFields } from '@payloadcms/ui'
import './VideoPreviewField.scss'

const VideoPreviewField = () => {
  const [videoField] = useAllFormFields()
  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  const fileValue = videoField.file?.value
  const mimeType = videoField.mimeType?.value
  const urlValue = videoField.url?.value

  useEffect(() => {
    if (fileValue && (fileValue as File).type.startsWith('video')) {
      const fileUrl = URL.createObjectURL(fileValue as File)
      setVideoSrc(fileUrl)
      return () => URL.revokeObjectURL(fileUrl)
    } else if (String(mimeType).startsWith('video') && urlValue && !videoField.file?.isModified) {
      setVideoSrc(String(urlValue))
    } else {
      setVideoSrc(null)
    }
  }, [fileValue, mimeType, urlValue])

  if (videoSrc) {
    return (
      <>
        <DrawerToggler
          className="btn btn--style-primary btn--size-medium"
          slug="video-preview-drawer"
        >
          แสดงตัวอย่างวิดีโอ
        </DrawerToggler>
        <Drawer className="video-preview-drawer" slug="video-preview-drawer">
          <video
            muted
            className="video-player"
            controls
            title="Video Preview"
            width="100%"
            height="100%"
          >
            <source src={videoSrc} type="video/mp4" />
            <p>Your browser doesn&apos;t support HTML video.</p>
          </video>
        </Drawer>
      </>
    )
  }

  return null
}

export default VideoPreviewField
