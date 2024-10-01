'use client'

import { HeroType, Media } from '@payload-types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'

const Hero: React.FC<HeroType> = ({ ...block }) => {
  return (
    <div className='w-full  text-white'>
      <div className='flex flex-col items-center justify-center space-y-8 bg-[#26304e] pb-14 pt-40'>
        <Avatar className='mb-4 h-24 w-24 flex-shrink-0 self-center bg-cover bg-center '>
          <AvatarImage src={(block?.image as Media)?.url as string} />
          <AvatarFallback />
        </Avatar>
        <h1 className='text-center text-3xl font-bold leading-none sm:text-4xl'>
          {block.title}
        </h1>
        <p className='max-w-2xl px-2 text-center md:px-0'>
          {block?.description}
        </p>
      </div>
    </div>
  )
}

export default Hero
