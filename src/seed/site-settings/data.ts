import path from 'path'
import { SiteSetting } from 'payload-types'

export type siteSettingsDataType = Omit<
  SiteSetting,
  'id' | 'createdAt' | 'updatedAt'
>

export type ImageType = {
  header: {
    alt: string
    filePath: string
  }
  footer: {
    alt: string
    filePath: string
  }
}

export const siteSettingsData: siteSettingsDataType = {
  appName: 'Solano Theme',
  appDescription: 'Theme created by contentQL team.',

  header: {
    primary_button_text: 'sign-in',
    primary_button_path: '/sign-in',
    secondary_button_path: 'sign-up',
    secondary_button_text: '/sign-up',
    logo_image: '',
    menuItems: [
      {
        page: { relationTo: 'pages', value: '' },
      },
      {
        page: { relationTo: 'pages', value: '' },
      },
      {
        page: { relationTo: 'pages', value: '' },
      },
    ],
  },
  footer: {
    logo_image: '',
    copyright: '@2025',
    logo: 'ContentQL',
    menuItems: [
      { id: '', page: { relationTo: 'pages', value: '' } },
      { id: '', page: { relationTo: 'pages', value: '' } },
      { id: '', page: { relationTo: 'pages', value: '' } },
    ],
  },
}

export const siteSettingsImageData: ImageType = {
  header: {
    alt: 'header logo',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/contentql-logo.webp',
    ),
  },
  footer: {
    alt: 'footer',
    filePath: path.join(
      process.cwd(),
      '/public/images/seed/contentql-logo.webp',
    ),
  },
}
