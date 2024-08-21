'use client'

import { User } from '@payload-types'
import Image from 'next/image'

import { listOfIcons } from '@/utils/getSocialMediaIcon'

function AuthorDetails({ author }: { author: User }) {
  return (
    <div className=' flex flex-col items-center justify-center space-y-4 bg-[#26304e] pb-14 pt-40 text-white'>
      <Image
        alt=''
        height={96}
        width={96}
        className='mb-4 h-24 w-24 flex-shrink-0 self-center rounded-full bg-cover bg-center '
        src={author?.imageUrl || ''}
      />
      <h1 className='text-center text-4xl font-bold leading-none sm:text-5xl'>
        {author?.name}
      </h1>
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
