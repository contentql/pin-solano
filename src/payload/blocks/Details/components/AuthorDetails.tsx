'use client'

import AuthorPostsView from '../../common/components/AuthorPostView'
import { Blog, User } from '@payload-types'
import { useSearchParams } from 'next/navigation'
import React from 'react'

import { trpc } from '@/trpc/client'

interface PageProps {
  params: {
    authorName: string
  }
  blogsData: Blog[]
  author: User
}

const IndividualAuthorDetails: React.FC<PageProps> = ({
  params,
  blogsData,
  author,
}) => {
  const searchParams = useSearchParams()
  const tagFromQuery = searchParams.get('tag') || ''

  // Fetch author details
  // const {
  //   data: author,
  //   isLoading: isAuthorLoading,
  //   error: authorError,
  // } = trpc.author.getAuthorByName.useQuery({
  //   authorName: params?.authorName,
  // })

  // Fetch author's tags
  const {
    data: authorTags,
    isLoading: isAuthorTagsLoading,
    error: tagsError,
  } = trpc.author.getAllTagsByAuthorName.useQuery({
    authorName: params?.authorName,
  })

  // Determine the tag to fetch blogs for
  const activeTag = tagFromQuery || authorTags?.[0]?.slug || ''

  // Fetch blogs for the given author and tag
  const {
    data: blogs,
    isLoading: isBlogsLoading,
    error: blogsError,
  } = trpc.author.getBlogsByAuthorNameAndTag.useQuery({
    authorName: params?.authorName,
    tagSlug: activeTag,
  })

  if (tagsError || blogsError) {
    return <div>Error loading data. Please try again later.</div>
  }

  return (
    <AuthorPostsView
      author={author as User}
      blogsData={blogs?.blogs as Blog[]}
      totalBlogs={blogs?.totalBlogs || 0}
      authorTags={authorTags || []}
      isAuthorTagsLoading={isAuthorTagsLoading}
      isBlogsLoading={isBlogsLoading}
    />
  )
}

export default IndividualAuthorDetails
