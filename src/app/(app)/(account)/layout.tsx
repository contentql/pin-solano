import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'

import Footer from '@/payload/blocks/Footer/Footer'
import Navbar from '@/payload/blocks/Header'
import { getCurrentUser } from '@/utils/getCurrentUser'

interface LayoutProps {
  children: React.ReactNode
}

const AccountLayout: React.FC<LayoutProps> = async ({ children }) => {
  const payload = await getPayload({ config: configPromise })

  const initData = await payload.findGlobal({
    slug: 'site-settings',
    draft: false,
  })

  const headersList = await headers()
  const user = await getCurrentUser(headersList)

  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar initData={initData} />
      <div className='flex-grow'>{children}</div>
      <Footer initData={initData} />
    </div>
  )
}

export default AccountLayout
