import { AnimatedTagCard } from '../../common/components/AnimatedTagCard'
import configPromise from '@payload-config'
import { Media, User } from '@payload-types'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'

interface AuthorsListProps extends User {
  totalDocs: number
}

const AuthorsList: React.FC<{
  authors: AuthorsListProps[]
  block: {
    title?: string | null
    collectionSlug?: ('blogs' | 'tags' | 'users') | null
    id?: string | null
    blockName?: string | null
    blockType: 'List'
  }
}> = ({ authors, block }) => {
  return (
    <div className='relative flex flex-wrap items-center justify-center gap-x-12 gap-y-4 bg-base-100 py-20'>
      {authors?.map(async (author, index) => {
        const payload = await getPayload({ config: configPromise })
        const { totalDocs: count } = await payload.find({
          collection: 'blogs',
          where: {
            'author.value': {
              equals: author.id,
            },
          },
        })
        return (
          <Link href={`/author/${author?.username}`} key={index}>
            <AnimatedTagCard
              title={author?.displayName!}
              href={author?.displayName!}>
              <div className='flex h-[16rem] w-[14rem] basis-full flex-col items-center justify-center p-4 tracking-tight text-slate-100/50 sm:basis-1/2 '>
                <Avatar className='mb-16 h-24 w-24'>
                  <AvatarImage
                    src={(author?.imageUrl as Media)?.url!}
                    alt='tag'
                  />
                  <AvatarFallback />
                </Avatar>
                <h3 className='!m-0 max-w-xs !pb-2 text-base  font-bold text-slate-100'>
                  {author?.displayName}
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

export default AuthorsList
