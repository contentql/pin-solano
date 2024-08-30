import { Skeleton } from './Skelton'

const BlogDetailSkeleton = () => {
  return (
    <div className='mx-auto my-12 flex flex-col items-center gap-2 px-4 sm:my-24 md:max-w-2xl  md:px-0'>
      <div className='flex w-full flex-col items-center gap-8'>
        <div className='flex'>
          <Skeleton className='h-5 w-28' />
        </div>
        <div className='flex flex-col items-center text-center font-bold sm:text-4xl md:text-5xl'>
          <Skeleton className='mb-2 h-9 w-[600px]' />
          <Skeleton className='h-9 w-[500px]' />
        </div>

        <div className='flex items-center gap-2 '>
          <div className='flex -space-x-2'>
            <Skeleton className='h-8 w-8 rounded-full' />
          </div>
          <div className='flex'>
            <Skeleton className='h-5 w-24' />
          </div>
        </div>
        <div className='avatar mb-6 w-full'>
          <Skeleton className='h-96 w-[670px]' />
        </div>
      </div>
    </div>
  )
}

export default BlogDetailSkeleton
