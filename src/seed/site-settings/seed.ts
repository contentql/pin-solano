import configPromise from '@payload-config'
import { SiteSetting } from '@payload-types'
import { getPayload } from 'payload'

import { siteSettingsData, siteSettingsImageData } from './data'

type SiteSettingType = Omit<SiteSetting, 'id'>

const payload = await getPayload({ config: configPromise })

const seed = async (): Promise<SiteSetting> => {
  try {
    const logoImageResult = await payload.create({
      collection: 'media',
      data: {
        alt: siteSettingsImageData?.alt,
      },
      filePath: siteSettingsImageData?.filePath,
    })

    const { docs: pages } = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          in: ['blogs', 'authors', 'contact', 'tags'],
        },
      },
    })

    console.log('Pages: ', pages)

    const formattedSiteSettingsData: SiteSettingType = {
      ...siteSettingsData,
      general: {
        ...siteSettingsData.general,
        faviconUrl: logoImageResult?.id,
        ogImageUrl: logoImageResult?.id,
      },
      navbar: {
        ...siteSettingsData.navbar,
        logo: {
          ...siteSettingsData.navbar.logo,
          imageUrl: logoImageResult?.id,
        },
        menuLinks: siteSettingsData.navbar.menuLinks?.map((page, index) => {
          const currentPage = pages?.at(index)

          return {
            ...page,
            menuLink: {
              ...page.menuLink,
              label: currentPage?.title || '',
              page: currentPage
                ? {
                    relationTo: 'pages',
                    value: currentPage.id,
                  }
                : undefined,
            },
          }
        }),
      },
      footer: {
        ...siteSettingsData.footer,
        logo: {
          ...siteSettingsData.footer.logo,
          imageUrl: logoImageResult?.id,
        },
        footerLinks: siteSettingsData.footer.footerLinks?.map((page, index) => {
          const currentPage = pages?.at(index)
          return {
            ...page,
            menuLink: {
              ...page.menuLink,
              label: currentPage?.title || '',
              page: currentPage
                ? {
                    relationTo: 'pages',
                    value: currentPage.id,
                  }
                : undefined,
            },
          }
        }),
      },
    }

    const result = await payload.updateGlobal({
      data: formattedSiteSettingsData,
      slug: 'site-settings',
    })

    return result
  } catch (error) {
    throw error
  }
}

export default seed
