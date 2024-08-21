import { User } from '@payload-types'

import ProfileForm from './ProfileForm'

const RightSideContent = ({ user }: { user: User }) => {
  return (
    <main className='min-h-screen w-full py-1'>
      <ProfileForm user={user} />
    </main>
  )
}

export default RightSideContent
