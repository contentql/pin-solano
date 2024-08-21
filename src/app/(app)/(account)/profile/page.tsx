import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import ProfileView from '@/components/auth/profile'
import { getCurrentUser } from '@/utils/getCurrentUser'

const ProfilePage = async () => {
  const headersList = headers()
  const user = await getCurrentUser(headersList)

  if (!user) return redirect('/sign-in')

  return <ProfileView initialUser={user} />
}

export default ProfilePage
