'use client'

import { Params } from '../types'
import { Blog, DetailsType } from '@payload-types'
import { useSearchParams } from 'next/navigation'

import { trpc } from '@/trpc/client'

import IndividualAuthorDetails from './components/AuthorDetails'
import BlogPost from './components/BlogPost'
import TagDetails from './components/TagDetails'

interface DetailsProps extends DetailsType {
  params: Params
}

const Details: React.FC<DetailsProps> = ({ params, ...block }) => {
  const searchParams = useSearchParams()
  console.log('search params', searchParams)
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
        <IndividualAuthorDetails
          searchParams={{ tag: searchParams.get('tag') || '' }}
          params={{ authorName: params?.route?.at(-1) || '' }}
        />
      )
    }
  }
}

export default Details
