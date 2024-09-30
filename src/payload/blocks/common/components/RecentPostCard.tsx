import { Blog, Media, User } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from '@/utils/dateFormatter'
import { slateHtml } from '@/utils/slateToHtml'

interface RecentPostCardProps {
  blog: Blog
}

const RecentPostCard: React.FC<RecentPostCardProps> = ({ blog }) => {
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
        src={(blog?.blogImage as Media)?.url || ''}
        width={400}
        height={400}
        alt='blog'
      />
      <p className='line-clamp-3 text-lg font-normal text-gray-300'>
        {blog?.description}
      </p>

      <div className='flex flex-wrap space-x-5 '>
        {blog?.author?.map((author, index) => (
          <div className='group flex items-center space-x-2' key={index}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className='h-5 w-5 rounded-full'
              src={
                ((author?.value as User)?.imageUrl as Media)?.url ||
                (author?.value as User)?.image!
              }
              alt='user'
              width={50}
              height={50}
            />
            <p>{(author?.value as User)?.displayName}</p>
          </div>
        ))}
      </div>
    </Link>
  )
}

export default RecentPostCard
