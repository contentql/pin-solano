// This is just to consolidate all the existing blocks and their respective JSX components
// Always prefer to individually import the required block or JSX in other parts of your application
// Importing the block components and its configurations
import { DisqusComments } from '@contentql/core/client'
import dynamic from 'next/dynamic'

const BlogHero = dynamic(() => import('./BlogHero/component'))
const Details = dynamic(() => import('./Details/component'))
const FormBlock = dynamic(() => import('./Form/component'))
const Hero = dynamic(() => import('./Hero/component'))
const HomeHero = dynamic(() => import('./HomeHero/component'))
const HomeTags = dynamic(() => import('./HomeTags/component'))
const LatestBlogs = dynamic(() => import('./LatestBlogs/component'))
const List = dynamic(() => import('./List/component'))
const PopularBlogs = dynamic(() => import('./PopularBlogs/component'))
const TopPicks = dynamic(() => import('./TopPicks/component'))

// Exporting an object that maps block names (as keys) to their corresponding JSX components (as values)
// This object allows dynamic rendering of components based on the block names
export const blocksJSX = {
  Details,
  List,
  HomeHero,
  PopularBlogs,
  LatestBlogs,
  TopPicks,
  HomeTags,
  BlogHero,
  Hero,
  DisqusComments,
  FormBlock,
}
