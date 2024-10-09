// This is just to consolidate all the existing blocks and their respective JSX components
// Always prefer to individually import the required block or JSX in other parts of your application
// Importing the block components and its configurations
import { DisqusComments } from '@contentql/core/client'

import { BlogHero, BlogHeroConfig } from './BlogHero'
import { Details, DetailsConfig } from './Details'
import { Hero, HeroConfig } from './Hero'
import { Home, HomeConfig } from './Home'
import { HomeHero, HomeHeroConfig } from './HomeHero'
import { HomeTags, HomeTagsConfig } from './HomeTags'
import { LatestBlogs, LatestBlogsConfig } from './LatestBlogs'
import { List, ListConfig } from './List'
import { PopularBlogs, PopularBlogsConfig } from './PopularBlogs'
import { TopPicks, TopPicksConfig } from './TopPicks'

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
}

// Exporting an array that consolidates all block configurations
// This array is useful for registering or iterating over all blocks and their configurations in one place
export const blocks = [
  HomeConfig,
  DetailsConfig,
  ListConfig,
  HomeHeroConfig,
  PopularBlogsConfig,
  LatestBlogsConfig,
  TopPicksConfig,
  HomeTagsConfig,
  BlogHeroConfig,
  HeroConfig,
]
