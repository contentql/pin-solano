import { collectionSlug, cqlConfig } from '@contentql/core'
import { env } from '@env'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { RichTextAdapterProvider } from 'payload'
import { fileURLToPath } from 'url'

import { UserAccountVerification } from '@/emails/verify-email'
import { blocks } from '@/payload/blocks/index'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const editor = slateEditor({
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
}) as unknown as RichTextAdapterProvider<any, any, any>

export default cqlConfig({
  admin: {
    components: {
      graphics: {
        Logo: '/src/payload/style/icons/Logo.tsx',
        Icon: '/src/payload/style/icons/Icon.tsx',
      },
    },
  },
  cors: [env.PAYLOAD_URL],
  csrf: [env.PAYLOAD_URL],

  baseURL: env.PAYLOAD_URL,

  secret: env.PAYLOAD_SECRET,
  dbURL: env.DATABASE_URI,

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

  blocks,
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
        {
          name: 'image',
          label: 'Image',
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
    },
  ],
  editor,
})
