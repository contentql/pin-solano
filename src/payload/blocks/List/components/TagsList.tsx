import { Media, Tag } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { AnimatedTagCard } from './AnimatedTagCard'

interface TagsListProps extends Tag {
  count: number
}
const TagsList: React.FC<{ tags: TagsListProps[] }> = ({ tags }) => {
  return (
    <div className='relative flex flex-wrap items-center justify-center gap-x-12 gap-y-4 bg-base-100 py-20'>
      {tags?.map((tag, index) => (
        <Link href={`/tag/${tag?.slug}`} key={index}>
          <AnimatedTagCard title={tag?.title} href={tag?.slug!}>
            <div className='flex h-[16rem] w-[14rem] basis-full flex-col items-center justify-center p-4 tracking-tight text-slate-100/50 sm:basis-1/2 '>
              <Image
                className='w-18 h-18 mb-16 rounded-full'
                src={(tag?.tagImage as Media)?.url || ''}
                alt='tag'
                loading='lazy'
                width={100}
                height={100}
              />
              <h3 className='!m-0 max-w-xs !pb-2 text-base  font-bold text-slate-100'>
                {tag?.title}
              </h3>
              {/* <p className='pt-2'>
                  {tag?.count} {tag?.count === 1 ? 'Blog' : 'Blogs'}
                </p> */}
            </div>
          </AnimatedTagCard>
        </Link>
      ))}
    </div>
  )
}

export default TagsList
