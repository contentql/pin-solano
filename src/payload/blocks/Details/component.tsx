'use client'

import { Params } from '../types'
import { Blog, DetailsType } from '@payload-types'

import { trpc } from '@/trpc/client'

import AuthorDetails from './components/AuthorDetails'
import BlogPost from './components/BlogPost'
import TagDetails from './components/TagDetails'

interface DetailsProps extends DetailsType {
  params: Params
}

const Details: React.FC<DetailsProps> = ({ params, ...block }) => {
  switch (block?.collection_slug) {
    case 'blogs': {
      return <BlogPost blogSlug={params?.route.at(-1) as string} />
    }

    case 'tags': {
      const { data: blogs } = trpc.tag.getBlogs.useQuery({
        tagSlug: params?.route.at(-1)!,
      })
      return (
        <TagDetails
          blogs={blogs?.blogsData as Blog[]}
          tagDetails={blogs?.tagData?.at(0)}
        />
      )
    }

    case 'users': {
      const { data: author } = trpc.author.getAuthorByName.useQuery({
        authorName: params?.route.at(-1)!,
      })
      const { data: authorBlogs } = trpc.author.getBlogsByAuthorName.useQuery({
        authorName: params?.route.at(-1)!,
      })

      return (
        <AuthorDetails author={author as any} blogsData={authorBlogs as any} />
      )
    }
  }
}

export default Details
