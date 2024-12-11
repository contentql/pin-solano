'use client'

import AnimatedBlogCard from '../../common/components/AnimatedBlogCard'
import { useResponsive } from '../../common/hooks/useResponsive'
import { Blog, Media } from '@payload-types'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'
import BlogCardSkelton from '@/components/skelton/BlogCardSkelton'
import { Skeleton } from '@/components/skelton/Skelton'
import BlogPostCard, {
  DirectionAwareHover,
} from '@/payload/blocks/PopularBlogs/components/BlogPostCard'
import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/dateFormatter'
import { getHTML } from '@/utils/slateToHTML'

const AuthorBlogs = ({
  blogsData,
  authorTags,
  totalBlogs,
}: {
  blogsData: Blog[]
  totalBlogs: number
  authorTags: (
    | {
        title: string
        description: string
        slug: string | null | undefined
        tagImage: number | Media
      }
    | undefined
  )[]
}) => {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const router = useRouter()
  const [filter, setFilter] = useState({
    tag: searchParams.get('tag')
      ? searchParams?.get('tag')
      : authorTags?.at(0)?.slug,
    index: searchParams.get('index') ? searchParams.get('index') : 0,
  })

  useEffect(() => {
    const authorPathPattern = /^\/author\/[^/]+$/

    if (authorPathPattern.test(pathName) && !searchParams.has('tag')) {
      const search = new URLSearchParams(searchParams)
      search.set('tag', authorTags?.at(0)?.slug || '')
      router.push(`${pathName}?${search.toString()}`)
    }
  }, [authorTags, pathName, router, searchParams])

  const isAuthorTagsLoading = false
  const isBlogsLoading = false

  return (
    <section className='container px-2 py-20 md:px-20' id='blog'>
      <div className='flex flex-col items-center justify-center  gap-y-8 pb-10 text-white'>
        <div className='flex flex-row items-center gap-x-4'>
          {isAuthorTagsLoading ? (
            <Skeleton className='h-20 w-20 rounded-full' />
          ) : (
            // <Image
            //   src={
            //     (authorTags?.at(filter?.index)?.tagImage as Media)?.url || ''
            //   }
            //   alt='tag'
            //   className='h-20 w-20 rounded-full'
            //   width={50}
            //   height={50}
            // />
            <Avatar className='h-20 w-20'>
              <AvatarImage
                src={
                  (authorTags?.at(filter?.index as number)?.tagImage as Media)
                    ?.url || ''
                }
                alt='tag'
              />
              <AvatarFallback />
            </Avatar>
          )}
          <div
            className={cn('gap-x-2', isAuthorTagsLoading ? 'space-y-1' : '')}>
            {isAuthorTagsLoading ? (
              <Skeleton className='h-6 w-32' />
            ) : (
              <p className='text-2xl font-bold'>
                {authorTags?.at(filter?.index as number)?.title}
              </p>
            )}
            {isAuthorTagsLoading ? (
              <Skeleton className='h-3 w-40' />
            ) : (
              <p>
                A collection of {blogsData?.length}{' '}
                {blogsData?.length === 1 ? 'Post' : 'Posts'}
              </p>
            )}
          </div>
        </div>
        <div className='line-clamp-2 max-w-2xl text-gray-400'>
          {isAuthorTagsLoading ? (
            <Skeleton className='h-3 w-40' />
          ) : (
            authorTags?.at(filter?.index as number)?.description
          )}
        </div>
      </div>
      <div className='flex flex-col justify-center gap-x-4 gap-y-10 lg:flex-row'>
        <div className=' w-full lg:max-w-[20%]'>
          <Tags
            tags={authorTags as any}
            setFilter={setFilter}
            filter={filter as any}
          />
        </div>
        {isBlogsLoading ? (
          <BlogCardSkelton />
        ) : (
          <Blogs blogsData={blogsData as Blog[]} />
        )}
      </div>
      {/* <div
        className='mt-10  flex items-center justify-center'
        onClick={() => {
          router.push(`${pathName}/${filter?.tag}`)
        }}>
        <AnimatedButton
          buttonColor='#4f46e5'
          buttonTextColor='#ffffff'
          subscribeStatus={false}
          initialText={
            <span className='group inline-flex items-center'>
              View all
              <FaAngleRight className=' ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2' />
            </span>
          }
          changeText={
            <span className='group inline-flex items-center gap-x-4'>
              <svg
                aria-hidden='true'
                className='h-6 w-6 animate-spin fill-indigo-600 text-gray-200 dark:text-gray-200'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              Loading...
            </span>
          }
        />
      </div> */}
    </section>
  )
}

export default AuthorBlogs

const Tags = ({
  tags,
  filter,
  setFilter,
}: {
  tags: any
  filter: { tag: string }
  setFilter: Function
}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)
  const handleSearchByTitle = (data: string, index: number) => {
    const search = new URLSearchParams(searchParams)
    search.set('tag', data)
    search.set('index', index.toString())
    router.push(`${pathname}?${search.toString()}#blog`)
    setFilter({ ...filter, tag: data, index: index })
  }
  return (
    <section className='text-md sticky top-24 w-full text-gray-900 dark:text-white'>
      <div className='grid-col-1 grid md:grid-cols-2 lg:grid-cols-1'>
        {tags?.map((tag: any, index: number) => (
          <div key={index}>
            <div
              onMouseEnter={() => {
                if (clickedIndex !== index) {
                  setHoveredIndex(index)
                }
              }}
              onMouseLeave={() => {
                if (clickedIndex !== index) {
                  setHoveredIndex(null)
                }
              }}
              onClick={() => {
                setClickedIndex(index)
                handleSearchByTitle(tag?.slug, index)
              }}
              className='relative inline-flex cursor-pointer items-center gap-x-4 rounded-full px-4 py-2'>
              <Avatar className='h-8 w-8'>
                <AvatarImage
                  src={(tag?.tagImage as Media)?.url || ''}
                  alt='tag'
                />
                <AvatarFallback />
              </Avatar>
              <p>{tag?.title}</p>
              <AnimatePresence>
                {tag?.slug === filter?.tag && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.5 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'linear' }}
                    className='absolute left-0 top-0 h-full w-full rounded-full bg-[#e779c11a] font-bold text-white'
                  />
                )}
                {hoveredIndex === index && clickedIndex !== index && (
                  <motion.span
                    className='absolute inset-0 block h-full w-full rounded-full bg-[#e779c11a]'
                    layoutId='hoverBackground'
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const Blogs = ({ blogsData }: { blogsData: Blog[] }) => {
  const { isMobile } = useResponsive()
  const readingTime = require('reading-time')
  return (
    <div className='container grid w-full grid-flow-row-dense grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-8 lg:w-9/12'>
      {blogsData?.map((blog, index) =>
        isMobile ? (
          <div key={index}>
            <BlogPostCard
              key={index}
              blog={blog as Blog}
              blogImg={
                <DirectionAwareHover
                  imageUrl={(blog?.blogImage as Media)?.url || ''}>
                  <p className='text-md font-semibold'>
                    {readingTime(getHTML(blog?.content))?.text}
                  </p>
                  <p className='pt-2 text-sm font-semibold'>
                    Date: {formatDate(blog?.createdAt)}
                  </p>
                </DirectionAwareHover>
              }
              className='col-span-1 row-span-1'
            />
          </div>
        ) : (
          <div
            key={index}
            className={`${blog?.selectBlogSize === '2' ? 'col-span-2' : 'col-span-1'}`}>
            <Link href={`/blog/${blog?.slug}`}>
              <AnimatedBlogCard blogData={blog as Blog} index={index} />
            </Link>
          </div>
        ),
      )}
    </div>
  )
}
