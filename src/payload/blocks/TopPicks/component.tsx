'use client'

import BlogPostCard, {
  DirectionAwareHover,
} from '../PopularBlogs/components/BlogPostCard'
import AnimatedBlogCard from '../common/components/AnimatedBlogCard'
import { useResponsive } from '../common/hooks/useResponsive'
import { Blog, Media, TopPicksTypes } from '@payload-types'
import Link from 'next/link'
import React from 'react'

import { formatDate } from '@/utils/dateFormatter'
import { getHTML } from '@/utils/slateToHTML'

const TopPicks: React.FC<TopPicksTypes> = ({ ...block }) => {
  const { isMobile } = useResponsive()
  const readingTime = require('reading-time')
  return (
    <section className='container px-2 py-20 text-white md:px-20'>
      <h1 className='pb-4 text-4xl font-semibold leading-9 text-gray-50'>
        {block?.title}
      </h1>
      {isMobile ? (
        <div className='grid w-full grid-cols-1 gap-y-8 '>
          {block?.topPicks?.map((blog, index) => (
            <BlogPostCard
              key={index}
              blog={blog?.value as Blog}
              blogImg={
                <DirectionAwareHover
                  imageUrl={
                    ((blog?.value as Blog)?.blogImage as Media)?.url || ''
                  }>
                  <p className='text-md font-semibold'>
                    {readingTime(getHTML((blog?.value as Blog)?.content))?.text}
                  </p>
                  <p className='pt-2 text-sm font-semibold'>
                    Date: {formatDate((blog?.value as Blog)?.createdAt)}
                  </p>
                </DirectionAwareHover>
              }
              className='col-span-1 row-span-1'
            />
          ))}
        </div>
      ) : (
        <div className='grid w-full grid-cols-1  gap-y-8 md:grid-cols-2 md:gap-8  lg:grid-cols-3'>
          {block?.topPicks?.map((blog, index) => (
            <div
              key={index}
              className={`${(blog?.value as Blog)?.selectBlogSize === '2' ? 'col-span-2' : 'col-span-1'}`}>
              <Link prefetch href={`/blog/${(blog?.value as Blog)?.slug}`}>
                <AnimatedBlogCard
                  blogData={blog?.value as Blog}
                  index={index}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default TopPicks
