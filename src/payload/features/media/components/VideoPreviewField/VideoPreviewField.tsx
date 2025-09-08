'use client'

import { Drawer, DrawerToggler, useAllFormFields } from '@payloadcms/ui'

import './VideoPreviewField.scss'

const VideoPreviewField = () => {
  const [videoField] = useAllFormFields()

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
          {/* TODO: Use steam url */}
          <source src={String(videoField.url.value)} type="video/mp4" />
          <p>Your browser doesn&apos;t support HTML video.</p>
        </video>
      </Drawer>
    </>
  )
}

export default VideoPreviewField
