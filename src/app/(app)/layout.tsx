import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/app/(app)/globals.css'
import '@/app/(app)/theme.scss'
import Provider from '@/trpc/Provider'
import ToastProvider from '@/utils/Toaster'

const inter = Inter({ subsets: ['latin'] })

const payload = await getPayloadHMR({ config: configPromise })
const initData = await payload.findGlobal({
  slug: 'site-settings',
})

export const metadata: Metadata = {
  title: initData?.appName ? initData.appName : 'pin-solano',
  description: initData?.appDescription
    ? initData?.appDescription
    : 'Generated by create cql app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={`${inter.className} bg-white dark:bg-[#0f162b]`}>
        <Provider>{children}</Provider>
        <ToastProvider />
      </body>
    </html>
  )
}
