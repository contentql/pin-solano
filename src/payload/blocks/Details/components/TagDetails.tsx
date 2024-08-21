import { Hero } from '../../Hero'
import BlogListItem from '../../List/components/BlogListItem'
import { Blog, Media } from '@payload-types'

interface TagDetailsProps {
  tagDetails: any
  blogs: Blog[]
}
const TagDetails: React.FC<TagDetailsProps> = ({ tagDetails, blogs }) => {
  console.log('tagDetails', tagDetails)
  return (
    <>
      {' '}
      <Hero
        blockType='Hero'
        title={tagDetails?.title}
        description={tagDetails?.description}
        image={(tagDetails?.tagImage as Media)?.url as string}
      />
      <div className='mx-auto max-h-screen min-h-screen max-w-7xl  gap-6 overflow-hidden px-2'>
        <BlogListItem blogsData={blogs as Blog[]} />
      </div>
    </>
  )
}

export default TagDetails
