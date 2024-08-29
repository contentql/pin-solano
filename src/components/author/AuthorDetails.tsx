'use client'

import { Skeleton } from '../skelton/Skelton'
import { User } from '@payload-types'
import Image from 'next/image'

import { listOfIcons } from '@/utils/getSocialMediaIcon'

function AuthorDetails({
  author,
  isAuthorLoading,
}: {
  author: User
  isAuthorLoading: boolean
}) {
  return (
    <div className=' flex flex-col items-center justify-center space-y-4 bg-[#26304e] pb-14 pt-40 text-white'>
      {isAuthorLoading ? (
        <Skeleton className='h-28 w-28 rounded-full' />
      ) : (
        <Image
          alt=''
          height={96}
          width={96}
          className='mb-4 h-24 w-24 flex-shrink-0 self-center rounded-full bg-cover bg-center '
          src={author?.imageUrl || ''}
        />
      )}
      {isAuthorLoading ? (
        <Skeleton className='h-10 w-48' />
      ) : (
        <h1 className='text-center text-4xl font-bold leading-none sm:text-5xl'>
          {author?.name}
        </h1>
      )}
      <div className='flex flex-wrap gap-x-4'>
        {author?.socialMedia?.map((social, index) => (
          <a
            key={social?.id}
            href={social?.url}
            className='rounded-full p-2 text-white'>
            {listOfIcons[social?.icon!]}
          </a>
        ))}
      </div>
    </div>
  )
}

export default AuthorDetails
