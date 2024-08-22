'use client'

import type { User } from '@payload-types'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

import { trpc } from '@/trpc/client'

import DeleteAccountSection from './DeleteAccountSection'
import Profile from './Profile'

const ProfileFormSchema = z.object({
  name: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  confirmPassword: z.string().optional().nullable(),
})
type ProfileFormDataType = z.infer<typeof ProfileFormSchema>

const ProfileForm = ({ user }: { user: User }) => {
  const [formData, setFormData] = useState<ProfileFormDataType>({
    name: user?.name,
    bio: user?.bio,
    password: '',
    confirmPassword: '',
  })
  const trpcUtils = trpc.useUtils()

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { mutate: updateUserMutation, isPending: isUpdateUserPending } =
    trpc.user.updateUser.useMutation({
      onSuccess: () => {
        toast.success('Profile updated successfully')
        trpcUtils.user.getUser.invalidate()
      },
      onError() {
        return null
      },
    })

  const handleUserUpdateForm = (e: any) => {
    e.preventDefault()
    const sanitizedData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => Boolean(value)),
    )

    if (
      sanitizedData.password &&
      sanitizedData.password !== sanitizedData.confirmPassword
    ) {
      toast.error('Passwords do not match!')
      return
    }

    updateUserMutation({
      ...sanitizedData,
    })
  }

  return (
    <div className='p-2 md:p-4'>
      <div className='mt-8 w-full px-6 pb-8 sm:rounded-lg'>
        <h2 className='pl-6 text-2xl font-bold text-white sm:text-xl'>
          Public Profile
        </h2>

        <div className='mx-auto mt-8 grid'>
          {/* <div className='flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0'>
            eslint-disable-next-line @next/next/no-img-element
            <img
              className='h-40 w-40 rounded-full object-cover p-1 ring-2 ring-indigo-300 dark:ring-indigo-500'
              src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
              alt='Bordered avatar'
            />

            <div className='flex flex-col space-y-5 sm:ml-8'>
              <button
                type='button'
                className='rounded-lg border border-indigo-200 bg-[#26304e] px-7 py-3.5 text-base font-medium text-indigo-100 hover:bg-indigo-600 focus:z-10 focus:outline-none focus:ring-4 focus:ring-indigo-200 '>
                Change picture
              </button>
              <button
                type='button'
                className='rounded-lg border border-indigo-200 bg-white px-7 py-3.5 text-base font-medium text-indigo-900 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:outline-none focus:ring-4 focus:ring-indigo-200 '>
                Delete picture
              </button>
            </div>
          </div> */}
          <div className='flex flex-col items-center justify-center space-y-5 sm:flex-row sm:space-y-0'>
            <Profile initialUser={user} />
          </div>

          <form
            onSubmit={handleUserUpdateForm}
            className='mt-8 items-center text-[#202142] sm:mt-14'>
            <div className='mb-4 sm:mb-6'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-300'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='John'
                value={user?.name || ''}
                onChange={handleOnChange}
                className='mt-1 w-full rounded-md bg-[#1e2846] p-2 text-white transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1'
              />
            </div>

            <div className='mb-4 sm:mb-6'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-300'>
                E-Mail
              </label>
              <input
                type='text'
                id='email'
                name='email'
                placeholder='john.doe@example.com'
                value={user?.email}
                disabled
                className='mt-1 w-full rounded-md bg-[#1e2846] p-2 text-gray-400 transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1'
              />
            </div>

            <div className='mb-4 sm:mb-6'>
              <label
                htmlFor='bio'
                className='block text-sm font-medium text-gray-300'>
                Bio
              </label>
              <textarea
                id='bio'
                name='bio'
                placeholder=''
                value={user?.bio || ''}
                onChange={handleOnChange}
                className='mt-1 w-full rounded-md bg-[#1e2846] p-2 text-white transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1'
                rows={4} // You can adjust the number of rows as needed
              />
            </div>

            <div className='mb-4 flex w-full flex-col items-center space-x-0 space-y-2 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0'>
              <div className='w-full'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-300'>
                  New Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='● ● ● ● ● ● ● ● ●'
                  onChange={handleOnChange}
                  className='mt-1 w-full rounded-md bg-[#1e2846] p-2 text-white transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1'
                />
              </div>

              <div className='w-full'>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium text-gray-300'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  placeholder='● ● ● ● ● ● ● ● ●'
                  onChange={handleOnChange}
                  className='mt-1 w-full rounded-md bg-[#1e2846] p-2 text-white transition-colors duration-300 focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-1'
                />
              </div>
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                className='w-full rounded-lg  bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 sm:w-auto'>
                {isUpdateUserPending ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <DeleteAccountSection />
    </div>
  )
}

export default ProfileForm
