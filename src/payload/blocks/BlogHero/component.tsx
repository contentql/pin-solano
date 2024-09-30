'use client'

import { SwipeCarousel } from '../common/components/SwipeCarousel'
import { TagsMarquee } from '../common/components/TagsMarquee'
import { Blog, BlogsHeroType, Tag } from '@payload-types'

import { trpc } from '@/trpc/client'

interface TagsDetails extends Tag {
  count: number
}

export const BlogHero: React.FC<BlogsHeroType> = blogData => {
  const { data: tags } = trpc?.tag?.getAllTags.useQuery()
  return (
    <>
      <div className='bg-[#26304e] px-2 pb-20 pt-32 md:px-10 lg:px-20'>
        <section className='container flex w-full flex-col items-center  justify-center gap-x-2 overflow-hidden  text-white  lg:flex-row  lg:justify-between '>
          <div className='flex w-full items-center  lg:w-[40%]'>
            <div className='mb-8 max-w-7xl px-2 text-center  lg:max-w-2xl lg:text-left'>
              <h1 className='text-3xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white lg:text-3xl lg:leading-tight xl:text-4xl xl:leading-tight'>
                {blogData?.title}
              </h1>
              <p className='py-5 text-xl leading-normal text-gray-500 dark:text-gray-300 lg:text-xl xl:text-2xl'>
                {blogData?.description}
              </p>

              <div className='flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start'>
                <a
                  href={blogData?.link!}
                  target='_blank'
                  rel='noopener'
                  className='rounded-md bg-indigo-600 px-8 py-4 text-center text-lg font-medium text-white '>
                  {blogData?.button}
                </a>
              </div>
            </div>
          </div>
          <div className='hidden w-full lg:block lg:w-[50%]'>
            <SwipeCarousel
              blogsData={
                blogData?.blogs as {
                  relationTo: 'blogs'
                  value: string | Blog
                }[]
              }
            />
          </div>
        </section>
        <TagsMarquee tagsDetails={tags as TagsDetails[]} />
      </div>
    </>
  )
}

export default BlogHero
