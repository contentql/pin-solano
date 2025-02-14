'use client'

import { env } from '@env'
import { Page } from '@payload-types'
import { useLivePreview } from '@payloadcms/live-preview-react'
import React, { Suspense } from 'react'

import { trpc } from '@/trpc/client'
import { cn } from '@/utils/cn'

import { blocksJSX } from './BlocksJSX'
import { Params } from './types'

interface RenderBlocksProps {
  params: Params
  pageInitialData: Page
}

const RenderBlocks: React.FC<RenderBlocksProps> = ({
  pageInitialData,
  params,
}) => {
  // Fetch the page data using path
  const { data: pageData, isLoading: isPageLoading } =
    trpc.page.getPageData.useQuery(
      { path: params.route },
      { initialData: pageInitialData },
    )

  // Fetch page data for live preview
  const { data: livePreviewData } = useLivePreview<Page | undefined>({
    initialData: undefined,
    serverURL: env.NEXT_PUBLIC_WEBSITE_URL,
  })

  // Determine which data to use based on whether live preview data is available
  const dataToUse = livePreviewData?.layout || pageData?.layout

  return (
    <Suspense fallback={null}>
      <div>
        {dataToUse?.map((block, index) => {
          // Casting to 'React.FC<any>' to bypass TypeScript error related to 'Params' type incompatibility.
          const Block = blocksJSX[block.blockType] as React.FC<any>

          if (Block) {
            return (
              <div
                key={index}
                className={cn(
                  index % 2 === 0 ? 'bg-transparent' : 'bg-[#26304e]',
                )}>
                <Block {...block} params={params} />
              </div>
            )
          }

          return <h3 key={block.id}>Block does not exist </h3>
        })}
      </div>
    </Suspense>
  )
}

export default RenderBlocks
