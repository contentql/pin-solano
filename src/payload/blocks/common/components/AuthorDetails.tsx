'use client'

import { Media, User } from '@payload-types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'
import { Skeleton } from '@/components/skelton/Skelton'
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
        <Avatar className='mb-4 h-24 w-24 flex-shrink-0 self-center bg-cover bg-center '>
          <AvatarImage
            src={(author?.imageUrl as Media)?.url || author?.image!}
          />
          <AvatarFallback />
        </Avatar>
      )}
      {isAuthorLoading ? (
        <Skeleton className='h-10 w-48' />
      ) : (
        <h1 className='text-center text-4xl font-bold leading-none sm:text-5xl'>
          {author?.displayName}
        </h1>
      )}
      <div className='flex flex-wrap gap-x-4'>
        {author?.socialLinks?.map((social, index) => (
          <a
            key={social?.id}
            href={social?.value}
            className='rounded-full p-2 text-white'>
            {social?.platform in listOfIcons
              ? listOfIcons[social?.platform as keyof typeof listOfIcons]
              : null}
          </a>
        ))}
      </div>
    </div>
  )
}

export default AuthorDetails
