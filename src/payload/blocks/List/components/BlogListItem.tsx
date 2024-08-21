'use client'

import { Blog, Media } from '@payload-types'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

import { AnimatedTooltip } from '@/payload/common/AnimatedTooltip'
import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/dateFormatter'
import { slateHtml } from '@/utils/slateToHtml'

const BlogListItems = ({ blogsData }: { blogsData: Blog[] }) => {
  const readingTime = require('reading-time')

  return (
    <section className='container overflow-hidden px-2 py-20 md:px-10 lg:px-20'>
      <div className='mx-auto grid grid-flow-row-dense grid-cols-1 gap-8 md:auto-rows-[28rem] md:grid-cols-2 xl:grid-cols-3'>
        {blogsData?.map((blog, index, allBlogs) => {
          return (
            <BlogPostCard
              key={index}
              blog={blog}
              blogImg={
                <DirectionAwareHover
                  imageUrl={(blog?.blog_image as Media)?.url || ''}>
                  <p className='text-md font-semibold'>
                    {readingTime(slateHtml(blog?.content))?.text}
                  </p>
                  <p className='pt-2 text-sm font-semibold'>
                    Date: {formatDate(blog?.createdAt)}
                  </p>
                </DirectionAwareHover>
              }
              className={`${blog?.select_blog_size === '2' ? 'md:col-span-2' : 'md:col-span-1'} group min-h-[100px]`}
            />
          )
        })}
      </div>
    </section>
  )
}

export default BlogListItems

export const BlogPostCard = ({
  className,
  blog,
  blogImg,
  icon,
}: {
  className?: string
  blog: Blog
  blogImg?: React.ReactNode
  icon?: React.ReactNode
}) => {
  const { slug, title, sub_title } = blog
  return (
    <div
      className={cn(
        'group/bento relative row-span-1 flex cursor-pointer flex-col justify-between rounded-xl border border-slate-200  bg-transparent text-white transition duration-200 hover:shadow-md dark:border-white/[0.2]',
        className,
      )}>
      {blogImg}
      <div className='p-4'>
        {icon}
        <div className='flex flex-row justify-between gap-x-3 gap-y-3 md:gap-y-0'>
          <div className='flex gap-2 '>
            <div>
              <div className='mb-2 flex w-full flex-row items-center justify-center'>
                <AnimatedTooltip items={blog?.author as any} />
              </div>
            </div>
          </div>
          {/* <div>
            {blog?.tags?.slice(0, 2)?.map((tag, idx) => (
              <span
                key={idx}
                className={`${getTagColors({ color: (tag?.value as Tag)?.color || 'blue' })} me-2 rounded px-2.5 py-0.5 text-xs font-medium`}>
                {(tag?.value as Tag)?.title}
              </span>
            ))}
          </div> */}
        </div>
        <div className='duration-500 group-hover:translate-x-2'>
          <Link
            href={`/blog/${blog?.slug}`}
            className='text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 mb-2 mt-2 line-clamp-1 font-sans text-xl font-bold'>
            {title}
          </Link>
          <Link
            href={`/blog/${blog?.slug}`}
            className='text-neutral-600 dark:text-neutral-300 line-clamp-3 font-sans text-sm font-normal'>
            {sub_title}
          </Link>
        </div>
      </div>
    </div>
  )
}

export const DirectionAwareHover = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className,
}: {
  imageUrl: string
  children: React.ReactNode | string
  childrenClassName?: string
  imageClassName?: string
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const [direction, setDirection] = useState<
    'top' | 'bottom' | 'left' | 'right' | string
  >('left')

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!ref.current) return

    const direction = getDirection(event, ref.current)
    switch (direction) {
      case 0:
        setDirection('top')
        break
      case 1:
        setDirection('right')
        break
      case 2:
        setDirection('bottom')
        break
      case 3:
        setDirection('left')
        break
      default:
        setDirection('left')
        break
    }
  }

  const getDirection = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    obj: HTMLElement,
  ) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect()
    const x = ev.clientX - left - w / 2
    const y = ev.clientY - top - h / 2

    const dx = Math.abs(x / w)
    const dy = Math.abs(y / h)

    if (dx > dy) {
      return x < 0 ? 3 : 1
    } else {
      return y < 0 ? 0 : 2
    }
  }

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      ref={ref}
      className={cn(
        'group/card relative flex h-full min-h-[10rem] w-full flex-1 overflow-hidden rounded-t-xl bg-transparent bg-white dark:bg-black',
        className,
      )}>
      <AnimatePresence mode='wait'>
        <motion.div
          className='relative h-full w-full'
          initial='initial'
          whileHover={direction}
          exit='exit'>
          <motion.div className='absolute inset-0 z-10 hidden h-full w-full bg-black/40 transition duration-500 group-hover/card:block' />
          <motion.div
            variants={variants}
            className='relative h-full w-full bg-gray-50 dark:bg-black'
            transition={{
              duration: 0.2,
              ease: 'easeOut',
            }}>
            <Image
              alt='image'
              className={cn(
                'h-full w-full scale-[1.15] object-cover',
                imageClassName,
              )}
              width={100}
              height={100}
              src={imageUrl}
            />
          </motion.div>
          <motion.div
            variants={textVariants}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
            className={cn(
              'absolute bottom-4 left-4 z-40 text-white',
              childrenClassName,
            )}>
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

const variants = {
  initial: {
    x: 0,
  },

  exit: {
    x: 0,
    y: 0,
  },
  top: {
    y: 20,
  },
  bottom: {
    y: -20,
  },
  left: {
    x: 20,
  },
  right: {
    x: -20,
  },
}

const textVariants = {
  initial: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  exit: {
    y: 0,
    x: 0,
    opacity: 0,
  },
  top: {
    y: -20,
    opacity: 1,
  },
  bottom: {
    y: 2,
    opacity: 1,
  },
  left: {
    x: -2,
    opacity: 1,
  },
  right: {
    x: 20,
    opacity: 1,
  },
}
