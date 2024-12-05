/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */

/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
// import '@payloadcms/ui/styles.css' // Uncomment this line if `@payloadcms/ui` in `tsconfig.json` points to `/ui/dist` instead of `/ui/src`
import configPromise from '@payload-config'
import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import React from 'react'

import '@/public/favicon.ico'

import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout
    config={configPromise}
    importMap={importMap}
    serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
