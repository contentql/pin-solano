'use client'

import { Media, Page, SiteSetting } from '@payload-types'
import Image from 'next/image'

import { trpc } from '@/trpc/client'

const Footer = ({ initData }: { initData: SiteSetting }) => {
  const { data = initData } = trpc.siteSettings.getSiteSettings.useQuery()

  return (
    <footer className='bg-white p-4 dark:bg-[#1e2846] md:px-6 md:py-4'>
      <div className='sm:flex sm:items-center sm:justify-between'>
        <a href='/' target='_blank' className='mb-4 flex items-center sm:mb-0'>
          <Image
            src={(data?.footer?.logo?.imageUrl as Media)?.url || ''}
            className='mr-4'
            alt={(data?.footer?.logo?.imageUrl as Media)?.alt || ''}
            height={data?.footer?.logo?.height || 28}
            width={data?.footer?.logo?.width || 28}
          />
          <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
            {data?.general?.title}
          </span>
        </a>
        <ul className='flex flex-wrap items-center sm:mb-0'>
          {data?.footer?.footerLinks?.map(
            (item, index) =>
              !item?.group &&
              (item?.menuLink?.type === 'reference' ? (
                <li key={index}>
                  <a
                    target={`${item?.menuLink?.newTab ? '_blank' : '_self'}`}
                    href={(item?.menuLink?.page?.value as Page)?.path || '/'}
                    className='mr-4 text-sm text-gray-500 hover:underline dark:text-gray-400 md:mr-6'>
                    {item?.menuLink?.label}
                  </a>
                </li>
              ) : (
                <li key={index}>
                  <a
                    target={`${item?.menuLink?.newTab ? '_blank' : '_self'}`}
                    href={item?.menuLink?.url || '/'}
                    className='mr-4 text-sm text-gray-500 hover:underline dark:text-gray-400 md:mr-6'>
                    {item?.menuLink?.label}
                  </a>
                </li>
              )),
          )}
        </ul>
      </div>
      <span className='mt-2 block text-sm text-gray-500 dark:text-gray-400 sm:text-center'>
        {data?.footer?.copyright}
      </span>
    </footer>
  )
}

export default Footer
