/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import React from 'react'

import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'

import { RuntimeEnv } from '@/shared/components'
import config from '@payload-config'

import { importMap } from './admin/importMap.js'

import '@payloadcms/next/css'
// *Note: Important for override payload theme the @/payload/theme/index.scss must be imported after @payloadcms/next/css
import '@/payload/theme/index.scss'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
    {/* TODO: Recheck script placement this might cause load env issue */}
    <RuntimeEnv />
  </RootLayout>
)

export default Layout
