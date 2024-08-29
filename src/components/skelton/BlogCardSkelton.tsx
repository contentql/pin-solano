import { Skeleton } from './Skelton'

const BlogCardSkelton = () => {
  return (
    <div className='container '>
      {' '}
      <div className=' mx-auto grid grid-cols-1 gap-4 gap-y-10 rounded-2xl p-2 md:grid-cols-2 md:gap-x-8 md:gap-y-16 md:p-20 lg:grid-cols-3'>
        {[0, 1, 2, 3].map((_, idx) => (
          <div key={idx} className=' space-y-3'>
            <Skeleton className='h-[22rem] w-full rounded-xl' />
            <div className='space-y-3'>
              <div className='flex flex-col gap-y-4'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                  <Skeleton className='h-5 w-10/12' />
                  <Skeleton className='h-4 w-3/4' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogCardSkelton
