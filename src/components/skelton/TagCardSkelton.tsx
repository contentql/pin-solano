import { Skeleton } from './Skelton'

const TagCardSkelton = () => {
  return (
    <div className='container'>
      <div className='mx-auto grid grid-cols-1 gap-x-8 rounded-2xl p-2 md:grid-cols-2 md:p-20 lg:grid-cols-3 xl:grid-cols-4'>
        {[0, 1, 2, 3].map((_, idx) => (
          <Skeleton
            key={idx}
            className='h-[18rem] w-[16rem] rounded-2xl'></Skeleton>
        ))}
      </div>
    </div>
  )
}

export default TagCardSkelton
