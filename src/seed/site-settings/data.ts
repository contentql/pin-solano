import path from 'path'
import { SiteSetting } from 'payload-types'

export type siteSettingsDataType = Omit<SiteSetting, 'id'>

export type ImageType = {
  alt: string
  filePath: string
}

export const siteSettingsData: siteSettingsDataType = {
  general: {
    title: 'Solano',
    description: 'Theme created by contentQL team.',
    faviconUrl: '',
    ogImageUrl: '',
  },
  navbar: {
    logo: {
      imageUrl: '',
    },
    menuLinks: [
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: '',
          page: {
            relationTo: 'pages',
            value: '',
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
            value: '',
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
            value: '',
          },
        },
      },
    ],
  },
  footer: {
    logo: {
      imageUrl: '',
    },
    footerLinks: [
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: '',
          page: {
            relationTo: 'pages',
            value: '',
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
            value: '',
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
            value: '',
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
