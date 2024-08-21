import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { headers } from 'next/headers'

import Footer from '@/payload/blocks/Footer/Footer'
import Navbar from '@/payload/blocks/Header'
import { getCurrentUser } from '@/utils/getCurrentUser'

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  const payload = await getPayloadHMR({ config: configPromise })
  const initData = await payload.findGlobal({
    slug: 'site-settings',
    draft: false,
  })
  const headersList = headers()
  const user = await getCurrentUser(headersList)

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar initData={initData} />
      <div className='flex-grow'>{children}</div>
      <Footer initData={initData} />
    </div>
  )
}

export default MarketingLayout
