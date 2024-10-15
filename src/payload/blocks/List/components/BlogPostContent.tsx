'use client'

import { AnimatedTooltip } from '../../common/components/AnimatedTooltip'
import TagsCard from '../../common/components/tagsCard'
import { env } from '@env'
import { Blog, Media, Tag } from '@payload-types'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { trpc } from '@/trpc/client'
import { getHTML } from '@/utils/slateToHTML'

interface Tags extends Tag {
  count: number
}
export const BlogPostContent = ({ blog }: { blog: Blog }) => {
  // Fetch blog data for live preview
  const { data: livePreviewData } = useLivePreview<Blog | undefined>({
    initialData: undefined,
    serverURL: env.NEXT_PUBLIC_PUBLIC_URL,
    depth: 2,
  })

  //fetch tags

  const { data: tagsDetails } = trpc.tag.getAllTags.useQuery()

  // Determine which data to use based on whether live preview data is available
  const dataToUse = livePreviewData || blog

  const date = new Date(dataToUse?.createdAt || '')
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`

  const html = getHTML(dataToUse?.content)

  const readingTime = require('reading-time')
  const blogReadTime = readingTime(html || '')

  function formatDate(isoDateString: string) {
    const date = new Date(isoDateString)
    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * index,
      },
    }),
  }

  return (
    <div>
      <div className='relative mx-auto mt-32 flex w-full justify-center text-white antialiased'>
        <div key={`content-0`} className=''>
          <div className=' mx-auto max-w-full text-sm '>
            <div className='mx-auto max-w-[71rem]'>
              <div className='text-center text-gray-500'>
                <span className='mr-1 text-2xl '>&#8226;</span>{' '}
                {blogReadTime?.text}
              </div>

              <h2
                className={twMerge(
                  ' mb-10 text-center text-xl font-extrabold underline-offset-1 md:mb-20 md:text-5xl',
                )}>
                <span>{dataToUse?.title}</span>
              </h2>

              {dataToUse?.blogImage && (
                <Image
                  src={(dataToUse?.blogImage as Media)?.url || ''}
                  alt={(dataToUse?.blogImage as Media)?.alt || ''}
                  height='1000'
                  width='1030'
                  className='mx-auto mb-10 rounded-lg'
                />
              )}
              <div className='scroll-reveal'>
                <p>
                  <span>{dataToUse?.description}</span>
                </p>
              </div>
            </div>

            <div className='mx-auto w-4/6'>
              {' '}
              <div className='mt-10  flex  items-center justify-between'>
                <div className='flex items-center justify-center space-x-2'>
                  <div className='mb-10 flex w-full flex-row items-center justify-center'>
                    <AnimatedTooltip items={dataToUse?.author as any} />
                  </div>
                </div>
                <p className='text-md '>
                  {formatDate(blog?.createdAt as string)}
                </p>
                {/* <div>{blogReadTime?.text}</div> */}
              </div>
              <div className='mx-auto mb-4 flex justify-end gap-4 border-b-[1px] border-black dark:border-white'>
                {dataToUse?.tags?.map((tag, index) => (
                  <motion.p
                    key={index}
                    className='cursor-pointer rounded-md border-2 border-gray-500  px-4 py-1 hover:border-gray-100 '
                    variants={fadeInAnimationVariants}
                    initial='initial'
                    whileInView='animate'
                    viewport={{
                      once: true,
                    }}
                    custom={index}>
                    {(tag?.value as Tag)?.title}
                  </motion.p>
                ))}
              </div>
              <div className='mx-auto flex w-11/12 flex-col justify-between md:flex-row'>
                <div className='mt-14 w-full text-xl leading-7 '>
                  <div
                    className='prose !max-w-none text-justify text-[#d1d5db] md:prose-xl  [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:rounded'
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </div>
                <div className='ml-6 w-full md:w-[20%]'>
                  <TagsCard tags={tagsDetails as Tags[]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
