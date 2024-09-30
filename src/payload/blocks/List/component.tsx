'use client'

import { Params } from '../types'
import { Blog, DetailsType, Tag, User } from '@payload-types'
import React from 'react'

import BlogCardSkelton from '@/components/skelton/BlogCardSkelton'
import TagCardSkelton from '@/components/skelton/TagCardSkelton'
import { trpc } from '@/trpc/client'

import AuthorsList from './components/AuthorsList'
import BlogsList from './components/BlogsList'
import TagsList from './components/TagsList'

interface ListProps extends DetailsType {
  params: Params
}

interface TagsListProps extends Tag {
  count: number
}
interface AuthorsListProps extends User {
  totalDocs: number
}

const List: React.FC<ListProps> = ({ params, ...block }) => {
  switch (block?.collectionSlug) {
    case 'blogs': {
      const { data: blogs, isLoading: isBlogsPending } =
        trpc.blog.getAllBlogs.useQuery()
      return isBlogsPending ? (
        <BlogCardSkelton />
      ) : (
        <BlogsList blogs={blogs as Blog[]} />
      )
    }

    case 'tags': {
      const { data: tags, isLoading: isTagsLoading } =
        trpc.tag.getAllTags.useQuery()
      return isTagsLoading ? (
        <TagCardSkelton />
      ) : (
        <TagsList tags={tags as TagsListProps[]} />
      )
    }

    case 'users': {
      const { data: authors, isLoading: isAuthorLoading } =
        trpc.author.getAllAuthorsWithCount.useQuery()

      return isAuthorLoading ? (
        <TagCardSkelton />
      ) : (
        <AuthorsList authors={authors as AuthorsListProps[]} />
      )
    }
  }
}

export default List
