import { headers } from 'next/headers'

import Branding from '@/components/Branding'
import Footer from '@/payload/blocks/Footer/Footer'
import Navbar from '@/payload/blocks/Header'
import { serverClient } from '@/trpc/serverClient'
import { getCurrentUser } from '@/utils/getCurrentUser'

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  const siteSettingsData = await serverClient.siteSettings.getSiteSettings()

  const headersList = await headers()
  const user = await getCurrentUser(headersList)

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar initData={siteSettingsData} />
      <div className='flex-grow'>{children}</div>
      <Footer initData={siteSettingsData} />
      <Branding />
    </div>
  )
}

export default MarketingLayout
