import { Blog, Media, User } from '@payload-types'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'
import { formatDate } from '@/utils/dateFormatter'
import { getHTML } from '@/utils/slateToHTML'

interface RecentPostCardProps {
  blog: Blog
}

const RecentPostCard: React.FC<RecentPostCardProps> = ({ blog }) => {
  const readingTime = require('reading-time')

  return (
    <Link
      prefetch
      href={`/blog/${blog?.slug}`}
      className='flex flex-col space-y-4 rounded-3xl border-none bg-[#1e2846] p-4 text-white'>
      <div className='flex gap-x-4 text-gray-400'>
        <p>{readingTime(getHTML(blog?.content))?.text}</p>
        <span>-</span>
        <p>{formatDate(blog?.createdAt)}</p>
      </div>
      <h2 className='line-clamp-1 text-3xl font-bold transition-all duration-300 hover:underline'>
        {blog?.title}
      </h2>
      <Avatar className='mx-auto h-[20rem] w-full rounded-2xl'>
        <AvatarImage alt='blog' src={(blog?.blogImage as Media)?.url || ''} />
        <AvatarFallback />
      </Avatar>
      <p className='line-clamp-3 text-lg font-normal text-gray-300'>
        {blog?.description}
      </p>

      <div className='flex flex-wrap space-x-5 '>
        {blog?.author?.map((author, index) => (
          <div className='group flex items-center space-x-2' key={index}>
            <Avatar className='h-5 w-5'>
              <AvatarImage
                src={((author?.value as User)?.imageUrl as Media)?.url!}
                alt='user'
              />
              <AvatarFallback />
            </Avatar>
            <p>{(author?.value as User)?.displayName}</p>
          </div>
        ))}
      </div>
    </Link>
  )
}

export default RecentPostCard
