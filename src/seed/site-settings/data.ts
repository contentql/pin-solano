import path from 'path'
import { Media, Page, SiteSetting } from 'payload-types'

export type siteSettingsDataType = Omit<SiteSetting, 'id'>

export type ImageType = {
  alt: string
  filePath: string
}

export const siteSettingsData: siteSettingsDataType = {
  general: {
    title: 'Solano',
    description: 'Theme created by contentQL team.',
    faviconUrl: '' as unknown as number | Media,
    ogImageUrl: '' as unknown as number | Media,
  },
  navbar: {
    logo: {
      imageUrl: '' as unknown as number | Media,
    },
    menuLinks: [
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: '',
          page: {
            relationTo: 'pages',
            value: '' as unknown as number | Page,
          },
        },
      },
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: '',
          page: {
            relationTo: 'pages',
            value: '' as unknown as number | Page,
          },
        },
      },
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: '',
          page: {
            relationTo: 'pages',
            value: '' as unknown as number | Page,
          },
        },
      },
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: '',
          page: {
            relationTo: 'pages',
            value: '' as unknown as number | Page,
          },
        },
      },
    ],
  },
  footer: {
    logo: {
      imageUrl: '' as unknown as number | Media,
    },
    footerLinks: [
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: '',
          page: {
            relationTo: 'pages',
            value: '' as unknown as number | Page,
          },
        },
      },
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: '',
          page: {
            relationTo: 'pages',
            value: '' as unknown as number | Page,
          },
        },
      },
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: '',
          page: {
            relationTo: 'pages',
            value: '' as unknown as number | Page,
          },
        },
      },
    ],
    socialLinks: [],
    copyright: '@2025 All rights reserved',
  },
}

export const siteSettingsImageData: ImageType = {
  alt: 'logo',
  filePath: path.join(process.cwd(), '/public/favicon.ico'),
}
