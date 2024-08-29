import { Page as PageType } from '@payload-types'
import { notFound } from 'next/navigation'

import WelcomePage from '@/components/WelcomePage'
import RenderBlocks from '@/payload/blocks/RenderBlocks'
import { serverClient } from '@/trpc/serverClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({ params }: { params: { route: string[] } }) => {
  try {
    const pageData = await serverClient.page.getPageData({
      path: params?.route,
    })

    return (
      <RenderBlocks pageInitialData={pageData as PageType} params={params} />
    )
  } catch (error: any) {
    if (error?.message === 'Pages not found') {
      return <WelcomePage />
    }
    console.error('Error: Page not found')
    notFound()
  }
}

export default Page
