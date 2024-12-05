import { Hero } from '../../Hero'
import BlogListItems from '../../List/components/BlogListItem'
import { Blog } from '@payload-types'
import Image from 'next/image'

interface TagDetailsProps {
  tagDetails: any
  blogs: Blog[]
}
const TagDetails: React.FC<TagDetailsProps> = ({ tagDetails, blogs }) => {
  return (
    <>
      {' '}
      <Hero
        blockType='Hero'
        title={tagDetails?.title}
        description={tagDetails?.description}
        image={tagDetails?.tagImage}
      />
      {/* {isBlogsPending && <BlogCardSkelton />} */}
      {blogs?.length > 0 ? (
        <div className='mx-auto min-h-screen max-w-7xl px-2'>
          <BlogListItems blogsData={blogs as Blog[]} />
        </div>
      ) : (
        <div className='my-10 flex min-h-fit flex-col items-center justify-center'>
          {' '}
          <Image
            width={200}
            height={200}
            src={'/images/not-found.png'}
            alt='No blogs are available'
          />
          <p className='text-[#d4d4d4]'>No Blogs are available</p>
        </div>
      )}
    </>
  )
}

export default TagDetails
