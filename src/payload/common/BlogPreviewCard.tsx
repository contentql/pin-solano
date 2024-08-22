import { Blog, Media } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface BlogPreviewCard {
  blog: Blog
}

const BlogPreviewCard: React.FC<BlogPreviewCard> = ({ blog }) => {
  return (
    <Link href={`/blog/${blog?.slug}`} className='col-span-1 row-span-1 '>
      <div className='group relative h-full w-full text-white  transition-all duration-500 hover:scale-105 '>
        <Image
          src={(blog?.blog_image as Media)?.url || ''}
          alt='blog'
          height={1000}
          width={1000}
          className='h-[100%] w-[100%] rounded-3xl object-cover  brightness-50 group-hover:brightness-100'
        />
        <h2 className='absolute bottom-4 left-4 line-clamp-2 text-xl font-extrabold'>
          {blog?.title}
        </h2>
      </div>
    </Link>
  )
}

export default BlogPreviewCard
