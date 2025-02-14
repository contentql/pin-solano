import { collectionSlug, cqlConfig } from '@contentql/core'
import { env } from '@env'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { fileURLToPath } from 'url'

import { UserAccountVerification } from '@/emails/verify-email'
import { migrations } from '@/migrations'
import { blocksConfig } from '@/payload/blocks'
import {
  revalidateAuthorsAfterChange,
  revalidateAuthorsAfterDelete,
} from '@/payload/hooks/revalidateAuthors'
import {
  revalidateBlogsAfterChange,
  revalidateBlogsAfterDelete,
} from '@/payload/hooks/revalidateBlogs'
import {
  revalidatePagesAfterChange,
  revalidatePagesAfterDelete,
} from '@/payload/hooks/revalidatePages'
import { revalidateSiteSettings } from '@/payload/hooks/revalidateSiteSettings'
import {
  revalidateTagsAfterChange,
  revalidateTagsAfterDelete,
} from '@/payload/hooks/revalidateTags'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const convertRailwayURL = (url: string) => {
  const railwayDomain = '.up.railway.app'
  const contentqlDomain = '.contentql.io'

  // Check if the URL ends with .up.railway.app or contains it
  if (url.includes(railwayDomain)) {
    return url.replace(railwayDomain, contentqlDomain)
  }

  // Return the original URL if it doesn't match
  return url
}

export default cqlConfig({
  admin: {
    components: {
      graphics: {
        Logo: '/src/payload/style/icons/Logo.tsx',
        Icon: '/src/payload/style/icons/Icon.tsx',
      },
    },
  },
  cors: [env.PAYLOAD_URL, convertRailwayURL(env.PAYLOAD_URL)],
  csrf: [env.PAYLOAD_URL, convertRailwayURL(env.PAYLOAD_URL)],

  baseURL: env.PAYLOAD_URL,

  secret: env.PAYLOAD_SECRET,

  dbURI: env.DATABASE_URI,
  dbSecret: env.DATABASE_SECRET,
  syncDB: false,
  prodMigrations: migrations,

  s3: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    bucket: env.S3_BUCKET,
    endpoint: env.S3_ENDPOINT,
    region: env.S3_REGION,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },

  resend: {
    apiKey: env.RESEND_API_KEY,
    defaultFromAddress: env.RESEND_SENDER_EMAIL,
    defaultFromName: env.RESEND_SENDER_NAME,
  },

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  blocks: blocksConfig,

  collections: [
    {
      slug: collectionSlug.blogs,
      fields: [
        {
          name: 'selectBlogSize',
          type: 'select',
          admin: {
            isClearable: true,
            isSortable: true, // use mouse to drag and drop different values, and sort them according to your choice
          },
          defaultValue: '1',
          options: [
            {
              label: 'One',
              value: '1',
            },
            {
              label: 'Two',
              value: '2',
            },
            // {
            //   label: 'Three',
            //   value: '3',
            // },
          ],
        },
      ],
    },
    {
      slug: collectionSlug.users,
      fields: [
        {
          name: 'bio',
          label: 'Bio',
          type: 'text',
        },
      ],
      auth: {
        verify: {
          generateEmailHTML: ({ token, user }) => {
            return UserAccountVerification({
              actionLabel: 'verify your account',
              buttonText: 'Verify Account',
              userName: user.username,
              image: user.imageUrl,
              href: `${env.PAYLOAD_URL}/verify-email?token=${token}&id=${user.id}`,
            })
          },
        },
      },
      hooks: {
        afterChange: [revalidateAuthorsAfterChange],
        afterDelete: [revalidateAuthorsAfterDelete],
      },
    },
    {
      slug: collectionSlug.pages,
      fields: [],
      hooks: {
        afterChange: [revalidatePagesAfterChange],
        afterDelete: [revalidatePagesAfterDelete],
      },
    },
    {
      slug: collectionSlug.blogs,
      fields: [],
      hooks: {
        afterChange: [revalidateBlogsAfterChange],
        afterDelete: [revalidateBlogsAfterDelete],
      },
    },
    {
      slug: collectionSlug.tags,
      fields: [],
      hooks: {
        afterChange: [revalidateTagsAfterChange],
        afterDelete: [revalidateTagsAfterDelete],
      },
    },
  ],

  globals: [
    {
      slug: 'site-settings',
      fields: [],
      hooks: {
        afterChange: [revalidateSiteSettings],
      },
    },
  ],

  editor: slateEditor({
    admin: {
      leaves: [
        {
          Button: 'src/payload/slate/strong/Button',
          Leaf: 'src/payload/slate/strong/Leaf',
          name: 'strong',
        },
        {
          Button: 'src/payload/slate/pre/Button',
          Leaf: 'src/payload/slate/pre/Leaf',
          name: 'pre',
        },
        {
          Button: 'src/payload/slate/mark/Button',
          Leaf: 'src/payload/slate/mark/Leaf',
          name: 'mark',
        },
        {
          Button: 'src/payload/slate/kbd/Button',
          Leaf: 'src/payload/slate/kbd/Leaf',
          name: 'kbd',
        },
        {
          Button: 'src/payload/slate/custom-iframe/Button',
          Leaf: 'src/payload/slate/custom-iframe/Leaf',
          name: 'custom-iframe',
        },
        {
          Button: 'src/payload/slate/italic/Button',
          Leaf: 'src/payload/slate/italic/Leaf',
          name: 'italic',
        },
        {
          Button: 'src/payload/slate/Strikethrough/Button',
          Leaf: 'src/payload/slate/Strikethrough/Leaf',
          name: 'strikethrough',
        },
        {
          Button: 'src/payload/slate/underline/Button',
          Leaf: 'src/payload/slate/underline/Leaf',
          name: 'underline',
        },
      ],
    },
  }),
})
