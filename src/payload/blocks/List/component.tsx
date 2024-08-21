'use client'

import { Params } from '../types'
import { Blog, DetailsType, Tag, User } from '@payload-types'
import React from 'react'

import { trpc } from '@/trpc/client'

import AuthorsList from './components/AuthorsList'
import BlogsList from './components/BlogsList'
import TagsList from './components/TagsList'

interface TagsListProps extends Tag {
  count: number
}

interface AuthorsListProps extends User {
  totalDocs: number
}

interface ListProps extends DetailsType {
  params: Params
}

const List: React.FC<ListProps> = ({ params, ...block }) => {
  switch (block?.collection_slug) {
    case 'blogs': {
      if (params?.route?.includes('tag')) {
        const { data: blogs } = trpc.tag.getBlogs.useQuery({
          tagSlug: params.route?.at(-1) as string,
        })
        return <BlogsList blogs={blogs?.blogsData as Blog[]} />
      }
      const { data: blogs } = trpc.blog.getAllBlogs.useQuery()
      return <BlogsList blogs={blogs as Blog[]} />
    }

    case 'tags': {
      const { data: tags } = trpc.tag.getAllTags.useQuery()
      return <TagsList tags={tags as TagsListProps[]} />
    }

    case 'users': {
      const { data: authors } = trpc.author.getAllAuthorsWithCount.useQuery()

      return <AuthorsList authors={authors as AuthorsListProps[]} />
    }
  }
}

export default List
