'use client'

import { Media, User } from '@payload-types'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { GoSignOut } from 'react-icons/go'
import { RiAdminLine } from 'react-icons/ri'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/Avatar'
import { signOut } from '@/utils/signOut'

const ProfileDropdown = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const closeDropdown = (event: any) => {
      if (!event.target.closest('.profile-dropdown')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', closeDropdown)

    return () => {
      document.removeEventListener('mousedown', closeDropdown)
    }
  }, [])

  const handleImageClick = () => {
    setIsOpen(!isOpen)
  }

  const handleDropdownMouseEnter = () => {
    setIsHovered(true)
  }

  const handleDropdownMouseLeave = () => {
    setIsHovered(false)
  }

  const dropdownVariants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
    closed: {
      opacity: 0,
      scale: 0.8,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const handleSignOut = () => {
    signOut()
    router.push('/')
  }

  return (
    <div className='profile-dropdown relative inline-block text-left'>
      <div onClick={handleImageClick}>
        <Avatar className='h-10 w-10 cursor-pointer '>
          <AvatarImage
            alt='Profile'
            src={
              (user?.imageUrl as Media)?.url || '/images/default-profile.png'
            }
          />
          <AvatarFallback />
        </Avatar>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial='closed'
            animate={isOpen || isHovered ? 'open' : 'closed'}
            variants={dropdownVariants}
            className='absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-[#1e2846]  px-2 text-white shadow-lg ring-1 ring-black ring-opacity-5'
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}>
            <div
              className='py-1'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu text-white'>
              <div
                className='flex rounded-md px-2 py-2 text-left font-semibold text-white hover:bg-[#e779c11a]'
                onClick={() => {
                  setIsOpen(false)
                }}>
                <CgProfile size={24} />
                <Link
                  href='/profile'
                  passHref
                  className='text-md block w-full px-2 '
                  role='menuitem'>
                  Profile
                </Link>
              </div>

              {user?.role?.includes('admin') && (
                <div
                  className='flex rounded-md px-2 py-2 text-left font-semibold text-white hover:bg-[#e779c11a]'
                  onClick={() => {
                    setIsOpen(false)
                  }}>
                  <RiAdminLine size={24} />
                  <Link
                    href='/admin'
                    passHref
                    className='text-md block w-full px-2'
                    role='menuitem'>
                    Admin
                  </Link>
                </div>
              )}
              <hr className='mb-1 mt-1  bg-gray-500' />
              <div
                className='flex rounded-md px-2 py-2 font-semibold text-white hover:bg-red-500'
                onClick={() => {
                  setIsOpen(false)
                }}>
                <GoSignOut size={24} />
                <button
                  type='button'
                  onClick={handleSignOut}
                  className='text-md block w-full rounded-sm px-2 text-left '
                  role='menuitem'>
                  sign out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileDropdown
