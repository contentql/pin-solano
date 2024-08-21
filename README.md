# Theme Development Process

## Introduction

Developing a theme involves a series of structured steps to ensure a cohesive
and visually appealing design that aligns with the project's goals and audience
needs. This document outlines the key stages involved in theme development, from
initial setup to final deployment.

## Table of Contents

1. [Setting Up the Project](#setting-up-the-project)
2. [Creating Required Blocks](#creating-required-blocks)
3. [Creating Pages Using Existing Blogs](#creating-pages-using-existing-blogs)

## Setting Up the Project

To start the theme development, you need to create a new project using the
`create-cql-app` command. This command sets up the basic structure and
dependencies required for your theme.

#### Command:

```bash
npx create-cql-app@latest fileName.
```

Note: Ensure to replace fileName with the desired name for your project. This
name is required while running the installation command to avoid errors.

## Creating Required Blocks

### Step 1: Navigate to the Blocks Directory

First, go to the src/payload/blocks directory within your project. This
directory already exists and is designated for creating the various blocks
you'll need for your theme. Blocks are reusable components designed to ensure
consistency and modularity throughout your theme.

### Step 2: Create Individual Blocks

For each block you require, follow these steps:

1. **Create a New Folder**: Within the `src/payload/blocks` directory, create a
   new folder.
2. **Add Required Files**: Inside this new folder, create two files: `block.ts`
   and `index.tsx`.

   - **block.ts**: Define the fields for your block here. Ensure the slug name
     matches the folder name.
   - **index.tsx**: Implement the frontend code to render the block in this
     file.

Note: The slug name in block.ts should be the same as the folder name.

Example Block Creation: Folder Name: `Hero`

`block.ts:`

```bash
import { Block } from 'payload/types'

export const Hero_Block: Block = {
  slug: 'Hero',
  interfaceName: 'HeroType',
  labels: {
    singular: 'Hero Block',
    plural: 'Hero Blocks',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
      required: true,
    },
    {
      name: 'subHeadline',
      type: 'text',
      label: 'Sub-headline',
      required: true,
    },
    {
      name: 'sub_title',
      type: 'text',
      label: 'Sub Title',
      required: true,
    },
    {
      name: 'buttons',
      label: 'Buttons',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'button',
          label: 'Button Label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          label: 'Link',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'tag_title',
      type: 'text',
      label: 'Tags Title',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: ['tags'],
      hasMany: true,
    },
  ],
}
```

`index.tsx:`

```bash
import { HeroType, Media, Tag } from '@payload-types'
import Link from 'next/link'

const Hero = (data: HeroType) => {
  return (
    <section className='relative flex h-auto w-full flex-col items-center justify-center pt-10 lg:pt-20'>
      <div className='absolute left-[50%] top-[24%] h-[20%] w-[20%] -translate-x-1/2 rounded-full bg-indigo-600 blur-[110px]'></div>
      <h1 className='w-full max-w-2xl text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl'>
        {data?.headline}
      </h1>
      <h1 className='mt-3 w-full max-w-2xl text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl'>
        {data?.subHeadline?.split(' ').slice(0, -1).join(' ')}
        <span className='ml-3 text-indigo-600'>
          {data?.subHeadline?.split(' ')?.at(-1)}
        </span>
      </h1>
      <p className='mt-10 max-w-xl text-center text-sky-200 lg:text-xl'>
        {'  ' + data?.sub_title}
      </p>
      <div className='flex space-x-2 '>
        {data?.buttons?.map((button, idx) => (
          <Link
            href={button?.link}
            key={idx}
            className='mt-16 rounded-md bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700'>
            {button?.button}
          </Link>
        ))}
      </div>

      <div className='mt-10 flex items-center justify-center gap-5 text-sm font-semibold uppercase text-white lg:text-xl'>
        <div className='h-0.5 w-6 rounded-full bg-indigo-600 lg:h-1.5 lg:w-12'></div>
        {data?.tag_title}
        <div className='h-0.5 w-6 rounded-full bg-indigo-600 lg:h-1.5 lg:w-12'></div>
      </div>
      <div className='mx-2 my-2 flex h-auto w-auto flex-wrap items-center justify-center gap-5 rounded-3xl px-6 md:flex md:flex-row lg:mx-auto lg:my-10 lg:h-24 lg:gap-14 lg:bg-gray-600'>
        {data?.tags?.map((tag, idx) => (
          <div
            key={idx}
            className='flex h-auto w-auto items-center justify-center gap-4 text-sm font-bold text-white md:text-xl lg:text-2xl'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={((tag?.value as Tag)?.tagImage as Media)?.url || ''}
              alt='brand log'
              width={50}
              height={50}
              className='rounded-full'
            />

            {(tag?.value as Tag)?.title}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero
```

### Step 3: Import the Files into `index.ts`

After creating your blocks, import them into the `index.ts` file (which already
exists) to make them available throughout your project. This step ensures that
all your blocks are registered and can be utilized as needed.

### Step 4: Generate Types

To generate the necessary types for your project, run the following command:

```sh
pnpm generate:types
```

## Creating Pages Using Existing Blocks

Step 1: Navigate to the Pages Collection in Admin Panel Navigate to the Pages
collection in the Admin panel. This is where you will create the pages using the
blocks you have previously defined.

Step 2: Create a New Page For each new page you need, create a new entity within
the pages collection. Choose the necessary blocks and use them to construct the
page.

Example Page Creation: Go to Admin Panel: Open the admin panel of your project.
Navigate to Pages Collection: Select the Pages collection from the sidebar.
Create New Page: Click on "Create New Page". Select Blocks: Use the previously
created blocks to construct your page. Arrange them as needed and fill in the
necessary content.
