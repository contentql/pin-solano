import { RequiredDataFromCollectionSlug } from 'payload'

export type AuthorDataType = RequiredDataFromCollectionSlug<'users'>

export type AuthorImageType = {
  alt: string
  filePath: string
}

export const authorsData: AuthorDataType[] = [
  {
    name: 'Author-1',
    email: 'author.1@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
  },
  {
    name: 'Author-2',
    email: 'author.2@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
  },
  {
    name: 'Author-3',
    email: 'author.3@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
  },
  {
    name: 'Author-4',
    email: 'author.4@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
  },
  {
    name: 'Author-5',
    email: 'author.5@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
  },
  {
    name: 'Author-6',
    email: 'author.6@gmail.com',
    password: 'Welcome@123',
    role: 'author',
    imageUrl: '',
  },
  {
    name: 'Admin',
    email: 'admin@contentql.com',
    password: 'Welcome@123',
    role: 'admin',
    imageUrl: '',
  },
]

export const authorImageData: AuthorImageType[] = [
  {
    alt: 'Authors Image',
    filePath: '/images/seed/blogAuthor-1.jpg',
  },
  {
    alt: 'Authors Image',
    filePath: '/images/seed/blogAuthor-2.jpg',
  },
  {
    alt: 'Authors Image',
    filePath: '/images/seed/blogAuthor-3.jpg',
  },
  {
    alt: 'Authors Image',
    filePath: '/images/seed/blogAuthor-4.jpg',
  },
  {
    alt: 'Authors Image',
    filePath: '/images/seed/blogAuthor-5.jpg',
  },
  {
    alt: 'Authors Image',
    filePath: '/images/seed/blogAuthor-6.jpg',
  },
  {
    alt: 'Authors Image',
    filePath: '/images/seed/blogAuthor-7.jpg',
  },
]
