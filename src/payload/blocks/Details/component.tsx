import { Params } from '../types'
import configPromise from '@payload-config'
import { Blog, DetailsType, Tag } from '@payload-types'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import NotFound from '@/app/(app)/not-found'

import IndividualAuthorDetails from './components/AuthorDetails'
import BlogPost from './components/BlogPost'
import TagDetails from './components/TagDetails'

interface DetailsProps extends DetailsType {
  params: Params
}

const Details: React.FC<DetailsProps> = async ({ params, ...block }) => {
  const payload = await getPayload({
    config: configPromise,
  })

  switch (block?.collectionSlug) {
    case 'blogs': {
      const slug = params?.route?.at(-1) ?? ''

      const { docs } = await payload.find({
        collection: 'blogs',
        draft: false,
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      const { docs: blogsData } = await payload.find({
        collection: 'blogs',
        draft: false,
      })

      const blog = docs.at(0)

      return !!blog ? (
        <BlogPost blog={blog as Blog} blogsData={blogsData as Blog[]} />
      ) : (
        <NotFound />
      )
    }

    case 'tags': {
      const slug = params?.route?.at(-1) ?? ''

      const { docs: tagData } = await payload.find({
        collection: 'tags',
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      const { docs: blogsData } = await payload.find({
        collection: 'blogs',
        where: {
          'tags.value': {
            contains: tagData?.at(0)?.id,
          },
        },
      })

      const tagDetails = (tagData || [])?.at(0)

      // if tag not found showing 404
      if (!tagDetails) {
        return notFound()
      }

      if (tagDetails) {
        return <TagDetails blogs={blogsData} tagDetails={tagDetails} />
      }
    }

    case 'users': {
      const authorName = params?.route?.at(-1) ?? ''

      const { docs: authors } = await payload.find({
        collection: 'users',
        where: {
          username: {
            equals: authorName,
          },
        },
      })
      const author = authors.at(0)

      const { docs: blogsRelatedWithAuthor, totalDocs: totalBlogs } =
        await payload.find({
          collection: 'blogs',
          where: {
            'author.value': {
              equals: author?.id,
            },
          },
        })

      const authorTags = blogsRelatedWithAuthor.flatMap(blog => {
        return blog?.tags?.map(tagRelation => {
          const tag = tagRelation.value as Tag

          return {
            title: tag?.title,
            description: tag?.description,
            slug: tag?.slug,
            tagImage: tag?.tagImage,
          }
        })
      })

      if (typeof author === 'object') {
        return (
          <IndividualAuthorDetails
            author={author}
            blogsData={blogsRelatedWithAuthor}
            authorTags={authorTags}
            totalBlogs={totalBlogs}
          />
        )
      }
    }
  }
}

export default Details
