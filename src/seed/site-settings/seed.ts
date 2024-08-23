import configPromise from '@payload-config'
import { SiteSetting } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { siteSettingsData, siteSettingsImageData } from './data'

type SiteSettingType = Omit<SiteSetting, 'id'>

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<SiteSetting> => {
  try {
    const headerLogoImageResult = await payload.create({
      collection: 'media',
      data: {
        alt: siteSettingsImageData?.header.alt,
      },
      filePath: siteSettingsImageData?.header.filePath,
    })

    const footerLogoImageResult = await payload.create({
      collection: 'media',
      data: {
        alt: siteSettingsImageData?.footer.alt,
      },
      filePath: siteSettingsImageData?.footer.filePath,
    })
    const { docs: pages } = await payload.find({
      collection: 'pages',
    })

    const filteredPages = pages.filter(
      page =>
        page.slug === 'blogs' ||
        page.slug === 'authors' ||
        page.slug === 'tags',
    )

    const formattedSiteSettingsData: SiteSettingType = {
      ...siteSettingsData,
      header: {
        ...siteSettingsData?.header,
        logo_image: headerLogoImageResult?.id,
        menuItems: filteredPages?.map(page => {
          return {
            page: {
              relationTo: 'pages',
              value: page?.id,
            },
          }
        }),
      },
      footer: {
        ...siteSettingsData?.footer,
        logo_image: footerLogoImageResult?.id,
        menuItems: filteredPages?.map(page => {
          return {
            page: {
              relationTo: 'pages',
              value: page?.id,
            },
          }
        }),
      },
    }

    const result = await payload.updateGlobal({
      data: formattedSiteSettingsData as SiteSetting,
      slug: 'site-settings',
    })

    return result
  } catch (error) {
    throw error
  }
}

export default seed
