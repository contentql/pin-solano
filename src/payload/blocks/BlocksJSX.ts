// This is just to consolidate all the existing blocks and their respective JSX components
// Always prefer to individually import the required block or JSX in other parts of your application
// Importing the block components and its configurations
import { DisqusComments } from '@contentql/core/client'

import { BlogHero } from './BlogHero'
import { Details } from './Details'
import { FormBlock } from './Form'
import { Hero } from './Hero'
import { Home } from './Home'
import { HomeHero } from './HomeHero'
import { HomeTags } from './HomeTags'
import { LatestBlogs } from './LatestBlogs'
import { List } from './List'
import { PopularBlogs } from './PopularBlogs'
import { TopPicks } from './TopPicks'

// Exporting an object that maps block names (as keys) to their corresponding JSX components (as values)
// This object allows dynamic rendering of components based on the block names
export const blocksJSX = {
  Home,
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
