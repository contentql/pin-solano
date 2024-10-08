import configPromise from '@payload-config'
import { Page as PageType } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import type { Metadata, NextPage } from 'next'
import { notFound } from 'next/navigation'

import WelcomePage from '@/components/WelcomePage'
import RenderBlocks from '@/payload/blocks/RenderBlocks'
import { serverClient } from '@/trpc/serverClient'

const payload = await getPayloadHMR({
  config: configPromise,
})
interface PageProps {
  params: Promise<{ route: string[] }>
}
const Page: NextPage<PageProps> = async ({ params }) => {
  const parsedParams = await params
  try {
    const pageData = await serverClient.page.getPageData({
      path: parsedParams?.route,
    })
    return (
      <RenderBlocks
        pageInitialData={pageData as PageType}
        params={parsedParams}
      />
    )
  } catch (error: any) {
    if (error?.message === 'Pages not found') {
      return <WelcomePage />
    }
    console.error('Error: Page not found')
    notFound()
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ route: string[] }>
}): Promise<Metadata | {}> {
  const parsedParams = await params
  try {
    // calling the site-settings to get all the data
    const pageData = await serverClient.page.getPageData({
      path: parsedParams?.route,
    })

    const block = pageData.layout
      ?.filter(block => block.blockType === 'Details')
      ?.at(0)
    if (pageData?.isDynamic && block?.collectionSlug) {
      const { docs } = await payload.find({
        collection: block?.collectionSlug,
        where: {
          slug: {
            equals: parsedParams?.route.at(-1),
          },
        },
      })
      const doc = docs?.at(0)
      const metadata = doc?.meta
      if (metadata) {
        let ogImage = []
        const title = metadata.title
        const description = metadata.description
        if (metadata.image && typeof metadata.image !== 'string') {
          ogImage.push({
            url: metadata.image.sizes?.blogImageSize2?.url!,
            height: 630,
            width: 1200,
            alt: `og image`,
          })
        }
        return {
          title,
          description,
          openGraph: {
            title,
            description,
            images: ogImage,
          },
          twitter: {
            title,
            description,
            images: ogImage,
          },
        }
      }
    }
    const metadata = pageData?.meta

    if (metadata) {
      let ogImage = []
      const title = metadata.title
      const description = metadata.description

      if (metadata.image && typeof metadata.image !== 'string') {
        ogImage.push({
          url: metadata.image.sizes?.blogImageSize2?.url!,
          height: 630,
          width: 1200,
          alt: `og image`,
        })
      }

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          images: ogImage,
        },
        twitter: {
          title,
          description,
          images: ogImage,
        },
      }
    }

    return {}
  } catch (error) {
    // in error case returning empty object
    return {}
  }
}

export default Page
