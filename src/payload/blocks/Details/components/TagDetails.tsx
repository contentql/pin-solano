import { Hero } from '../../Hero'
import BlogListItem from '../../List/components/BlogListItem'
import { Blog, Media } from '@payload-types'
import Image from 'next/image'

interface TagDetailsProps {
  tagDetails: any
  blogs: Blog[]
  isBlogsPending: boolean
}
const TagDetails: React.FC<TagDetailsProps> = ({
  tagDetails,
  blogs,
  isBlogsPending,
}) => {
  return (
    <>
      {' '}
      <Hero
        blockType='Hero'
        title={tagDetails?.title}
        description={tagDetails?.description}
        image={(tagDetails?.tagImage as Media)?.url as string}
      />
      {blogs?.length > 0 || isBlogsPending ? (
        <div className='mx-auto min-h-screen max-w-7xl px-2'>
          <BlogListItem blogsData={blogs as Blog[]} />
        </div>
      ) : (
        <div className='mt-10 flex min-h-fit flex-col items-center justify-center'>
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
