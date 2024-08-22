'use client'

import { TagsType } from '@payload-types'

const HomeTags: React.FC<TagsType> = tags => {
  return (
    <section className='container px-2 py-20 text-white md:px-20'>
      <div className=' mx-auto px-4'>
        <div className='mb-10 flex flex-wrap justify-center text-center'>
          <div className='w-full px-4 lg:w-6/12'>
            <h2 className='text-4xl font-semibold text-white'>{tags?.title}</h2>
            <p className='m-4 text-lg leading-relaxed text-gray-300'>
              {tags?.sub_title}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeTags
