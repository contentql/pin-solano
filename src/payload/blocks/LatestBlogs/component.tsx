'use client'

import BlogPostCard, {
  DirectionAwareHover,
} from '../PopularBlogs/components/BlogPostCard'
import BlogPreviewCard from '../common/components/BlogPreviewCard'
import RecentPostCard from '../common/components/RecentPostCard'
import { useResponsive } from '../common/hooks/useResponsive'
import { Blog, LatestBlogsTypes, Media } from '@payload-types'
import Link from 'next/link'
import React from 'react'
import Slider from 'react-slick'

// import 'slick-carousel/slick/slick.css'
import { formatDate } from '@/utils/dateFormatter'
import { slateHtml } from '@/utils/slateToHtml'

const LatestBlogs: React.FC<LatestBlogsTypes> = ({ ...block }) => {
  const readingTime = require('reading-time')
  const { isMobile } = useResponsive()
  const settings = {
    autoplay: true,
    speed: 700,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
  }
  return (
    <section className='container px-2 py-20 text-white md:px-20'>
      <h1 className='pb-4 text-3xl font-bold'>{block?.title}</h1>
      <div className='grid grid-cols-1 gap-x-4 gap-y-4  md:grid-cols-2  lg:grid-cols-4'>
        <div className='col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-2'>
          <Slider {...settings}>
            {isMobile
              ? block?.latestBlogs?.map((blog, index) => (
                  <BlogPostCard
                    key={index}
                    blog={blog?.value as Blog}
                    blogImg={
                      <DirectionAwareHover
                        imageUrl={
                          ((blog?.value as Blog)?.blogImage as Media)?.url || ''
                        }>
                        <p className='text-md font-semibold'>
                          {
                            readingTime(
                              slateHtml((blog?.value as Blog)?.content),
                            )?.text
                          }
                        </p>
                        <p className='pt-2 text-sm font-semibold'>
                          Date: {formatDate((blog?.value as Blog)?.createdAt)}
                        </p>
                      </DirectionAwareHover>
                    }
                    className='col-span-1 row-span-1'
                  />
                ))
              : block?.latestBlogs?.map((blog, index) => (
                  <RecentPostCard key={index} blog={blog?.value as Blog} />
                ))}
          </Slider>
        </div>

        {isMobile
          ? block?.latestBlogs?.slice(0, 4).map((blog, index) => (
              <Link key={index} href={`/blog/${(blog?.value as Blog)?.slug}`}>
                <BlogPostCard
                  key={index}
                  blog={blog?.value as Blog}
                  blogImg={
                    <DirectionAwareHover
                      imageUrl={
                        ((blog?.value as Blog)?.blogImage as Media)?.url || ''
                      }>
                      <p className='text-md font-semibold'>
                        {
                          readingTime(slateHtml((blog?.value as Blog)?.content))
                            ?.text
                        }
                      </p>
                      <p className='pt-2 text-sm font-semibold'>
                        Date: {formatDate((blog?.value as Blog)?.createdAt)}
                      </p>
                    </DirectionAwareHover>
                  }
                  className='col-span-1 row-span-1'
                />
              </Link>
            ))
          : block?.latestBlogs
              ?.slice(0, 4)
              ?.map((blog, index) => (
                <BlogPreviewCard key={index} blog={blog?.value as Blog} />
              ))}
      </div>
    </section>
  )
}

export default LatestBlogs
