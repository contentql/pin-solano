import { AnimatedTagCard } from '../../common/components/AnimatedTagCard'
import configPromise from '@payload-config'
import { ListType, Media, Tag } from '@payload-types'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'

interface TagsListProps extends Tag {
  count: number
}

const TagsList: React.FC<{
  tags: TagsListProps[]
  title: ListType['title']
}> = ({ tags, title }) => {
  return (
    <div className='relative flex flex-wrap items-center justify-center gap-x-12 gap-y-4 bg-base-100 py-20'>
      {tags?.map(async (tag, index) => {
        const payload = await getPayload({ config: configPromise })
        const { totalDocs: count } = await payload.find({
          collection: 'blogs',
          where: {
            'tags.value': {
              equals: tag.id,
            },
          },
        })
        return (
          <Link href={`/tag/${tag?.slug}`} key={index}>
            <AnimatedTagCard title={tag?.title} href={tag?.slug!}>
              <div className='flex h-[16rem] w-[14rem] basis-full flex-col items-center justify-center p-4 tracking-tight text-slate-100/50 sm:basis-1/2 '>
                <Avatar className='mb-16 h-24 w-24'>
                  <AvatarImage
                    src={(tag?.tagImage as Media)?.url || ''}
                    alt='tag'
                  />
                  <AvatarFallback />
                </Avatar>
                <h3 className='!m-0 max-w-xs !pb-2 text-base  font-bold text-slate-100'>
                  {tag?.title}
                </h3>
                <p className='pt-2'>
                  {count} {count === 1 ? 'Blog' : 'Blogs'}
                </p>
              </div>
            </AnimatedTagCard>
          </Link>
        )
      })}
    </div>
  )
}

export default TagsList
