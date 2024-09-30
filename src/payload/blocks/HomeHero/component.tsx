import { HomeHeroType, Media, Tag } from '@payload-types'
import Link from 'next/link'

const HomeHero: React.FC<HomeHeroType> = ({ ...block }) => {
  return (
    <section className='relative flex h-auto w-full flex-col items-center justify-center pt-20 lg:pt-40'>
      <div className='absolute left-[50%] top-[24%] h-[20%] w-[20%] -translate-x-1/2 rounded-full bg-indigo-600 blur-[110px]'></div>
      <h1 className='w-full max-w-2xl text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl'>
        {block?.headline}
      </h1>
      <h1 className='mt-3 w-full max-w-2xl text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl'>
        {block?.subHeadline?.split(' ').slice(0, -1).join(' ')}
        <span className='ml-3 text-indigo-600'>
          {block?.subHeadline?.split(' ')?.at(-1)}
        </span>
      </h1>
      <p className='mt-10 max-w-xl text-center text-sky-200 lg:text-xl'>
        {'  ' + block?.subTitle}
      </p>
      <div className='flex space-x-2 '>
        {block?.buttons?.map((button, idx) => (
          <Link
            href={button?.link}
            key={idx}
            className='mt-16 rounded-md bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700'>
            {button?.button}
          </Link>
        ))}
      </div>

      <div className='mt-10 flex items-center justify-center gap-5 text-sm font-semibold uppercase text-white lg:text-xl'>
        <div className='h-0.5 w-6 rounded-full bg-indigo-600 lg:h-1.5 lg:w-12'></div>
        {block?.tagTitle}
        <div className='h-0.5 w-6 rounded-full bg-indigo-600 lg:h-1.5 lg:w-12'></div>
      </div>
      <div className='mx-2 my-2 flex h-auto w-auto flex-wrap items-center justify-center gap-5 rounded-3xl px-6 md:flex md:flex-row lg:mx-auto lg:my-10 lg:h-24 lg:gap-14 lg:bg-gray-600'>
        {block?.tags?.map((tag, idx) => (
          <Link
            href={`/tag/${(tag?.value as Tag)?.slug}`}
            key={idx}
            className='flex h-auto w-auto items-center justify-center gap-4 text-sm font-bold text-white md:text-xl lg:text-2xl'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={((tag?.value as Tag)?.tagImage as Media)?.url || ''}
              alt='brand log'
              // width={50}
              // height={50}
              className='h-12 w-12 rounded-full'
            />

            {(tag?.value as Tag)?.title}
          </Link>
        ))}
      </div>
    </section>
  )
}

export default HomeHero
