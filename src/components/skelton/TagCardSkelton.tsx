import { Skeleton } from './Skelton'

const TagCardSkelton = () => {
  return (
    <div className='container'>
      <div className='relative flex flex-wrap items-center justify-center gap-x-12 gap-y-4 py-20'>
        {[0, 1, 2, 3].map((_, idx) => (
          <Skeleton key={idx} className='h-80 w-64 rounded-2xl'></Skeleton>
        ))}
      </div>
    </div>
  )
}

export default TagCardSkelton
