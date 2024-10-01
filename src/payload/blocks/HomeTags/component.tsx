'use client'

import { AnimatedTagCard } from '../common/components/AnimatedTagCard'
import { HomeTagsType, Media, Tag } from '@payload-types'
import Link from 'next/link'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'

const HomeTags: React.FC<HomeTagsType> = ({ ...block }) => {
  return (
    <section className='container px-2 py-20 text-white md:px-20'>
      <div className=' mx-auto px-4'>
        <div className='mb-10 flex flex-wrap justify-center text-center'>
          <div className='w-full px-4 lg:w-6/12'>
            <h2 className='text-4xl font-semibold text-white'>
              {block?.title}
            </h2>
            <p className='m-4 text-lg leading-relaxed text-gray-300'>
              {block?.subTitle}
            </p>
          </div>
        </div>
        <div className='relative flex flex-wrap items-center justify-center gap-x-12 gap-y-4'>
          {block?.tags?.map((tag, index) => (
            <Link href={`/tag/${(tag?.value as Tag)?.slug}`} key={index}>
              <AnimatedTagCard
                title={(tag?.value as Tag)?.title}
                href={(tag?.value as Tag)?.slug!}>
                <div className='flex h-[16rem] w-[14rem] basis-full flex-col items-center justify-center p-4 tracking-tight text-slate-100/50 sm:basis-1/2 '>
                  <Avatar className='mb-16 h-24 w-24'>
                    <AvatarImage
                      src={((tag?.value as Tag)?.tagImage as Media)?.url || ''}
                      alt='tag'
                    />
                    <AvatarFallback />
                  </Avatar>
                  <h3 className='!m-0 max-w-xs !pb-2 text-base  font-bold text-slate-100'>
                    {(tag?.value as Tag)?.title}
                  </h3>
                  <div className='!m-0 !p-0 text-base font-normal'>
                    <span className='line-clamp-1 text-slate-500'>
                      {(tag?.value as Tag)?.description}
                    </span>
                  </div>
                </div>
              </AnimatedTagCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
export default HomeTags
