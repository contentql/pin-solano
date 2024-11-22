import { Blog, Media } from '@payload-types'
import Link from 'next/link'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'

interface BlogPreviewCardProps {
  blog: Blog
}

const BlogPreviewCard: React.FC<BlogPreviewCardProps> = ({ blog }) => {
  return (
    <Link
      prefetch
      href={`/blog/${blog?.slug}`}
      className='col-span-1 row-span-1 '>
      <div className='group relative h-full w-full text-white  transition-all duration-500 hover:scale-105 '>
        <Avatar className='h-[100%] w-[100%] rounded-3xl object-cover  brightness-50 group-hover:brightness-100'>
          <AvatarImage src={(blog?.blogImage as Media)?.url || ''} alt='blog' />
          <AvatarFallback />
        </Avatar>
        <h2 className='absolute bottom-4 left-4 line-clamp-2 text-xl font-extrabold'>
          {blog?.title}
        </h2>
      </div>
    </Link>
  )
}

export default BlogPreviewCard
