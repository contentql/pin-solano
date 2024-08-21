'use client'

import BlogPostCard, {
  DirectionAwareHover,
} from '../PopularBlogs/components/BlogPostCard'
import { Blog, LatestBlogsTypes, Media } from '@payload-types'
import Link from 'next/link'
import Slider from 'react-slick'

// import 'slick-carousel/slick/slick.css'
import { useResponsive } from '@/hooks/useResponsive'
import BlogPreviewCard from '@/payload/common/BlogPreviewCard'
import RecentPostCard from '@/payload/common/RecentPostCard'
import { formatDate } from '@/utils/dateFormatter'
import { slateHtml } from '@/utils/slateToHtml'

function LatestBlogs(latestBlogs: LatestBlogsTypes) {
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
      <h1 className='pb-4 text-3xl font-bold'>{latestBlogs?.title}</h1>
      <div className='grid grid-cols-1 gap-x-4 gap-y-4  md:grid-cols-2  lg:grid-cols-4'>
        <div className='col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-2'>
          <Slider {...settings}>
            {isMobile
              ? latestBlogs?.latest_blogs?.map((blog, index) => (
                  <BlogPostCard
                    key={index}
                    blog={blog?.value as Blog}
                    blogImg={
                      <DirectionAwareHover
                        imageUrl={
                          ((blog?.value as Blog)?.blog_image as Media)?.url ||
                          ''
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
              : latestBlogs?.latest_blogs?.map((blog, index) => (
                  <RecentPostCard key={index} blog={blog?.value as Blog} />
                ))}
          </Slider>
        </div>

        {isMobile
          ? latestBlogs?.latest_blogs?.slice(0, 4).map((blog, index) => (
              <Link key={index} href={`/blog/${(blog?.value as Blog)?.slug}`}>
                <BlogPostCard
                  key={index}
                  blog={blog?.value as Blog}
                  blogImg={
                    <DirectionAwareHover
                      imageUrl={
                        ((blog?.value as Blog)?.blog_image as Media)?.url || ''
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
          : latestBlogs?.latest_blogs
              ?.slice(0, 4)
              ?.map((blog, index) => (
                <BlogPreviewCard key={index} blog={blog?.value as Blog} />
              ))}
      </div>
    </section>
  )
}

export default LatestBlogs
