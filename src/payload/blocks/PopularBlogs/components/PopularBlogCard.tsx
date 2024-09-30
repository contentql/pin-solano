import { Blog, Media } from '@payload-types'
import Link from 'next/link'

import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/dateFormatter'
import { slateHtml } from '@/utils/slateToHtml'

const PopularBlogCard = ({ blog, index }: { blog: Blog; index: number }) => {
  const readingTime = require('reading-time')
  return (
    <Link
      href={`/blog/${blog?.slug}`}
      key={blog?.id}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-xl',
        'border-[1px] border-gray-600 bg-transparent shadow-md',
        'transform-group',
        (index === 2 || index === 3) &&
          'row-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2',
      )}>
      <div
        className='transition-all duration-300 ease-in-out group-hover:blur-sm group-hover:filter'
        style={{
          backgroundImage: `url(${(blog?.blogImage as Media)?.url})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100%',
        }}
      />
      <div className='pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10'>
        <div className='flex  origin-left transform-gpu gap-2 text-white transition-all duration-300 ease-in-out group-hover:scale-75'>
          <div>
            <p className='text-xs text-gray-400'>
              {formatDate(blog?.createdAt)}
            </p>
          </div>
        </div>
        <h3 className='text-neutral-700 dark:text-neutral-300 line-clamp-1 text-xl font-semibold'>
          {blog?.title}
        </h3>
        <p className='line-clamp-1 max-w-lg text-gray-400'>
          {blog?.description}
        </p>
      </div>

      <div
        className={cn(
          'absolute -bottom-2 flex w-full translate-y-10 transform-gpu flex-row items-center justify-between p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100',
        )}>
        <div className='font-bold text-white'>
          {readingTime(slateHtml(blog?.content))?.text}
        </div>
        <button className='rounded-lg p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
          View More
        </button>
      </div>
      <div className='group-hover:dark:bg-neutral-800/10 pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03]' />
    </Link>
  )
}

export default PopularBlogCard
