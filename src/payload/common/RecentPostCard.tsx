import { Blog, Media, User } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from '@/utils/dateFormatter'
import { slateHtml } from '@/utils/slateToHtml'

const RecentPostCard = ({ blog }: { blog: Blog }) => {
  const readingTime = require('reading-time')

  return (
    <Link
      href={`/blog/${blog?.slug}`}
      className='flex flex-col space-y-4 rounded-3xl border-none bg-[#1e2846] p-4 text-white'>
      <div className='flex gap-x-4 text-gray-400'>
        <p>{readingTime(slateHtml(blog?.content))?.text}</p>
        <span>-</span>
        <p>{formatDate(blog?.createdAt)}</p>
      </div>
      <h2 className='line-clamp-1 text-3xl font-bold transition-all duration-300 hover:underline'>
        {blog?.title}
      </h2>
      <Image
        className='mx-auto h-[20rem] w-full rounded-2xl'
        src={(blog?.blog_image as Media)?.url || ''}
        width={400}
        height={400}
        alt='blog'
      />
      <p className='line-clamp-3 text-lg font-normal text-gray-300'>
        {blog?.sub_title}
      </p>

      <div className='flex flex-wrap space-x-5 '>
        {blog?.author?.map((author, index) => (
          <div className='group flex items-center space-x-2' key={index}>
            <Image
              className='h-5 w-5 rounded-full'
              src={(author?.value as User)?.imageUrl || ''}
              alt='user'
              width={50}
              height={50}
            />
            <p>{(author?.value as User)?.name}</p>
          </div>
        ))}
      </div>
    </Link>
  )
}

export default RecentPostCard
