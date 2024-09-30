'use client'

import useReadingProgress from '../common/hooks/useReadingProgress'
import { Media, Page, SiteSetting, User } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import { trpc } from '@/trpc/client'
import { cn } from '@/utils/cn'

import { HoveredLink, Menu, MenuItem, SingleLink } from './Header'
import ProfileDropdown from './dropdown'

export function Navbar({ initData }: { initData: SiteSetting }) {
  const { data: user } = trpc.user.getUser.useQuery()
  const { data = initData } = trpc.siteSettings.getSiteSettings.useQuery()

  if (!data?.navbar?.menuLinks?.length) return null

  return (
    <div className='relative flex w-full items-center justify-center'>
      <NavbarMenu user={user as User} data={data as SiteSetting} />
    </div>
  )
}
export default Navbar

function NavbarMenu({
  className,
  data,
  user,
}: {
  className?: string
  data: SiteSetting
  user: User | null
}) {
  // const { data: user } = useSession()
  const [active, setActive] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(!menuOpen)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [doubleDropdownOpen, setDoubleDropdownOpen] = useState(null)
  const pathName = usePathname()
  const pathSegments = pathName.split('/').filter(segment => segment)

  const [bgColor, setBgColor] = useState('transparent')

  const completion = useReadingProgress()
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setBgColor('gray-800')
    } else {
      setBgColor('transparent')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleDropdown = (index: any) => {
    setDropdownOpen(dropdownOpen === index ? null : index)
  }

  const toggleDoubleDropdown = (index: any) => {
    setDoubleDropdownOpen(doubleDropdownOpen === index ? null : index)
  }
  const [navSize, setNavSize] = useState('6rem')
  const [navColor, setNavColor] = useState('transparent')
  const [linksColor, setLinksColor] = useState('transparent')

  const listenScrollEvent = () => {
    window.scrollY > 10
      ? (setNavColor('#1e2846'), setLinksColor('#e779c11a'))
      : (setNavColor('transparent'), setLinksColor('transparent'))
    window.scrollY > 10 ? setNavSize('4rem') : setNavSize('6rem')
  }

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent)
    return () => {
      window.removeEventListener('scroll', listenScrollEvent)
    }
  }, [])
  return (
    <div className={cn('fixed top-0 z-50 w-full', className)}>
      <div
        style={{
          backgroundColor: navColor,
          height: navSize,
          transition: 'all 1s',
        }}
        className='fixed z-50 flex w-full items-center justify-between border-gray-200 bg-black px-2 dark:bg-gray-900 md:px-16'>
        <div>
          <Link href={'/'}>
            <Image
              src={(data?.navbar?.logo?.imageUrl as Media)?.url || ''}
              width={data?.navbar?.logo?.width || 48}
              height={data?.navbar?.logo?.height || 48}
              alt='Logo'
            />
          </Link>
        </div>
        <div className='hidden md:block'>
          <Menu setActive={setActive}>
            <div
              className='flex  items-center justify-center rounded-full px-4 py-1'
              style={{
                backgroundColor: linksColor,
                transition: 'all 1s',
              }}>
              {data?.navbar?.menuLinks?.map((menuItem, index) => {
                return menuItem?.group ? (
                  <MenuItem
                    key={index}
                    index={index}
                    setActive={setActive}
                    active={active}
                    item={menuItem?.menuLinkGroup?.groupTitle!}>
                    <div className='flex flex-col text-sm'>
                      {menuItem?.menuLinkGroup?.groupLinks?.map(
                        (submenuItem, subIndex) =>
                          submenuItem?.type === 'reference' ? (
                            <HoveredLink
                              target={submenuItem?.newTab!}
                              key={subIndex}
                              href={
                                (submenuItem?.page?.value as Page)?.path || '/'
                              }
                              index={subIndex}
                              title={submenuItem?.label}
                            />
                          ) : (
                            <HoveredLink
                              target={submenuItem?.newTab!}
                              key={subIndex}
                              href={submenuItem?.url || '/'}
                              index={subIndex}
                              title={submenuItem?.label}
                            />
                          ),
                      )}
                    </div>
                  </MenuItem>
                ) : menuItem?.menuLink?.type === 'reference' ? (
                  <SingleLink
                    target={menuItem?.menuLink?.newTab!}
                    index={index}
                    key={index}
                    path={
                      (menuItem?.menuLink?.page?.value as Page)?.path || '/'
                    }
                    item={menuItem?.menuLink?.label || ''}
                  />
                ) : (
                  <SingleLink
                    target={menuItem?.menuLink?.newTab!}
                    index={index}
                    key={index}
                    path={menuItem?.menuLink?.url || '/'}
                    item={menuItem?.menuLink?.label || ''}
                  />
                )
              })}
            </div>
          </Menu>
        </div>
        <div className='flex gap-3'>
          {user ? (
            <ProfileDropdown user={user} />
          ) : (
            <>
              <a
                className='hidden cursor-pointer items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold capitalize text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex'
                href='/sign-in'>
                Sign-In
              </a>
              <a
                className='inline-flex cursor-pointer items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold capitalize text-white shadow-sm transition-all duration-300 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                href='/sign-up'>
                Sign-Up
              </a>
            </>
          )}

          <button
            type='button'
            className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
            aria-controls='navbar-multi-level'
            aria-expanded={menuOpen}
            onClick={toggleMenu}>
            <svg
              className='h-5 w-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'>
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* mobile view */}
      <div
        className={`block w-full  md:hidden ${menuOpen ? 'block' : 'hidden'}`}
        style={{
          marginTop: navSize,
          transition: 'all 1s',
        }}
        id='navbar-multi-level'>
        <ul className=' flex flex-col bg-gray-50 p-4 font-medium dark:bg-[#1e2846] md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse'>
          {data?.navbar?.menuLinks?.map((menuItem, index) => {
            return menuItem?.group ? (
              <li key={index}>
                <button
                  id='dropdownNavbarLink'
                  onClick={() => toggleDropdown(index)}
                  className='flex w-full items-center justify-between px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:focus:text-white md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'>
                  {menuItem?.menuLinkGroup?.groupTitle}
                  {dropdownOpen === index ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </button>
                <div
                  className={`z-10 ${dropdownOpen === index ? 'block' : 'hidden'} w-full divide-y divide-gray-100 rounded-lg bg-white font-normal shadow dark:divide-gray-600 dark:bg-[#1e2846]`}
                  id='dropdownNavbar'>
                  <ul
                    className='text-md w-full py-2 text-gray-700 dark:text-gray-200'
                    aria-labelledby='dropdownLargeButton'>
                    {menuItem?.menuLinkGroup?.groupLinks?.map(
                      (groupLink, subIndex) => {
                        return groupLink?.type === 'reference' ? (
                          <li key={subIndex}>
                            <a
                              target={`${groupLink?.newTab ? '_blank' : '_self'}`}
                              href={
                                (groupLink?.page?.value as Page)?.path || '/'
                              }
                              className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                              {groupLink?.label}
                            </a>
                          </li>
                        ) : (
                          <li key={subIndex}>
                            <a
                              target={`${groupLink?.newTab ? '_blank' : '_self'}`}
                              href={groupLink?.url || '/'}
                              className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                              {groupLink?.label}
                            </a>
                          </li>
                        )
                      },
                    )}
                  </ul>
                </div>
              </li>
            ) : menuItem?.menuLink?.type === 'reference' ? (
              <li key={index}>
                <a
                  target={`${menuItem?.menuLink?.newTab ? '_blank' : '_self'}`}
                  href={(menuItem?.menuLink?.page?.value as Page)?.path || '/'}
                  className='block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                  aria-current='page'>
                  {menuItem?.menuLink?.label}
                </a>
              </li>
            ) : (
              <li key={index}>
                <a
                  target={`${menuItem?.menuLink?.newTab ? '_blank' : '_self'}`}
                  href={menuItem?.menuLink?.url || '/'}
                  className='block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                  aria-current='page'>
                  {menuItem?.menuLink?.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      {pathName ===
        `/${pathSegments[pathSegments.length - 2]}/${pathSegments[pathSegments.length - 1]}` && (
        <span
          style={{ transform: `translateX(${completion - 100}%)` }}
          className='absolute bottom-0 h-1 w-full bg-purple-700'
        />
      )}
    </div>
  )
}
