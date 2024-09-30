'use client'

import { trpc } from '@/trpc/client'

import LeftSideMenu from './LeftSideMenu'
import RightSideContent from './RightSideMenu'

const ProfileView = ({ initialUser }: { initialUser: any }) => {
  const { data: user } = trpc.user.getUser.useQuery(undefined, {
    initialData: initialUser,
  })
  return (
    <div className='flex w-full flex-col gap-5 bg-transparent px-3 py-20 md:flex-row md:px-16 lg:px-28'>
      <LeftSideMenu />
      <RightSideContent user={user} />
    </div>
  )
}

export default ProfileView
