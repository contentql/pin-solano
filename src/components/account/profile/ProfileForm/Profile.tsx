'use client'

import { User } from '@payload-types'
import { useState } from 'react'
import { IoMdRefresh } from 'react-icons/io'
import { toast } from 'sonner'

import { trpc } from '@/trpc/client'
import { listOfIcons } from '@/utils/getSocialMediaIcon'

const Profile = ({ initialUser }: { initialUser: User | undefined }) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const { data: user } = trpc.user.getUser.useQuery()
  const trpcUtils = trpc.useUtils()

  function capitalizeWords(words: string) {
    return words
      ?.split(' ')
      ?.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      ?.join(' ')
  }

  const { mutate: updateProfileMutation } =
    trpc.user.updateProfileImage.useMutation({
      onMutate: async data => {
        // const userQueryKey = getQueryKey(trpc.user.getUser, undefined, 'query')
        trpcUtils.user.getUser.setData(undefined, oldUser => {
          if (oldUser) {
            return { ...oldUser, image: data.imageUrl }
          }
          return oldUser
        })
      },
      onSuccess: () => {
        console.log('profile updated')
        toast.success('Avatar updated successfully!')
      },
      onError: () => {
        trpcUtils.user.invalidate()
        toast.error('Avatar failed to update!')
      },
      onSettled: () => {
        setIsSpinning(false)
      },
    })

  function updateImage() {
    setIsSpinning(true)
    const randomNum = Math.floor(Math.random() * (24 - 1 + 1)) + 1
    const imageUrl = `/images/avatar/avatar_${randomNum}.jpg`
    updateProfileMutation({ imageUrl })
  }

  return (
    <div className='max-w-sm rounded p-5 text-center text-gray-500'>
      <div className='group relative mx-auto h-[141px] w-[141px]'>
        <div
          style={{ backgroundImage: `url(${user?.image})` }}
          className='h-full w-full rounded-full bg-blue-300/20 bg-cover bg-center bg-no-repeat transition duration-700 ease-in-out group-hover:blur-sm'></div>
        <button
          onClick={updateImage}
          className={`absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-indigo-600 opacity-0 transition-opacity duration-700 ease-in-out ${isSpinning ? 'animate-spin' : ''} group-hover:opacity-100`}>
          <IoMdRefresh size={24} />
        </button>
      </div>
      <div className='mt-5 text-sm'>
        <a
          href='#'
          className='text-xl font-medium leading-none text-white transition duration-500 ease-in-out hover:text-indigo-600'>
          {capitalizeWords(user?.displayName!)}
        </a>
        {user?.role?.includes('author') && (
          <p className='mt-2 text-white'>Author</p>
        )}
      </div>
      <p className='mt-2 line-clamp-3 text-sm text-white'>{user?.bio}</p>
      <div className='mt-4 flex justify-center'>
        {user?.socialLinks?.map(item => (
          <a
            key={item?.id}
            href={item?.value}
            className='rounded-full p-2 text-white'>
            {item?.platform in listOfIcons
              ? listOfIcons[item?.platform as keyof typeof listOfIcons]
              : null}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Profile
