// This is just to consolidate all the existing blocks and their respective JSX components
// Always prefer to individually import the required block or JSX in other parts of your application
// Importing the block components and its configurations
import { BlogHeroConfig } from './BlogHero'
import { DetailsConfig } from './Details'
import { FormConfig } from './Form'
import { HeroConfig } from './Hero'
import { HomeHeroConfig } from './HomeHero'
import { HomeTagsConfig } from './HomeTags'
import { LatestBlogsConfig } from './LatestBlogs'
import { ListConfig } from './List'
import { PopularBlogsConfig } from './PopularBlogs'
import { TopPicksConfig } from './TopPicks'

// Exporting an object that maps block names (as keys) to their corresponding JSX components (as values)
// This object allows dynamic rendering of components based on the block names

// Exporting an array that consolidates all block configurations
// This array is useful for registering or iterating over all blocks and their configurations in one place
export const blocksConfig = [
  DetailsConfig,
  ListConfig,
  HomeHeroConfig,
  PopularBlogsConfig,
  LatestBlogsConfig,
  TopPicksConfig,
  HomeTagsConfig,
  BlogHeroConfig,
  HeroConfig,
  FormConfig,
]
