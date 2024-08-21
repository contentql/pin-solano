import { User } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

import { AnimatedTagCard } from './AnimatedTagCard'

interface AuthorsListProps extends User {
  totalDocs: number
}

const AuthorsList = ({ authors }: { authors: AuthorsListProps[] }) => {
  return (
    <div className='relative flex flex-wrap items-center justify-center gap-x-12 gap-y-4 bg-base-100 py-20'>
      {authors?.map((author, index) => (
        <Link href={`/author/${author?.name}`} key={index}>
          <AnimatedTagCard title={author?.name!} href={author?.name!}>
            <div className='flex h-[16rem] w-[14rem] basis-full flex-col items-center justify-center p-4 tracking-tight text-slate-100/50 sm:basis-1/2 '>
              <Image
                className='w-18 h-18 mb-16 rounded-full'
                src={author?.imageUrl!}
                alt='tag'
                loading='lazy'
                width={100}
                height={100}
              />
              <h3 className='!m-0 max-w-xs !pb-2 text-base  font-bold text-slate-100'>
                {author?.name}
              </h3>
              <p className='pt-2'>
                {author?.totalDocs} {author?.totalDocs === 1 ? 'Blog' : 'Blogs'}
              </p>
            </div>
          </AnimatedTagCard>
        </Link>
      ))}
    </div>
  )
}

export default AuthorsList
