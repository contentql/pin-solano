'use client'

import Link from 'next/link'

import Container from '@/payload/common/Container'
import { trpc } from '@/trpc/client'

const WelcomePage = () => {
  const { mutate: runSeedMutation, isPending: isSeedLoading } =
    trpc.seed.runSeed.useMutation({
      onSuccess: () => {
        // ! router.refresh() is not working as expected.
        window.location.reload()
      },
    })

  const handleSeedData = () => {
    console.log('in function')
    runSeedMutation()
  }

  return (
    <div className='dark'>
      <Container className='flex min-h-screen max-w-full  flex-col items-center justify-center gap-14 bg-[#26304e] px-10'>
        <div className='flex flex-col gap-y-3'>
          <div className='mx-auto  w-2/3 bg-gradient-to-r from-white to-[#4f46e5] bg-clip-text text-center text-5xl font-medium text-transparent'>
            <span className='text-xl'>✦</span> All set!{' '}
            <span className='text-xl'>✦</span>
          </div>
          <div className='mx-auto w-2/3 text-center text-xl text-orange-50'>
            Begin personalizing your theme to create a unique and engaging
            experience.
          </div>
        </div>
        <div className='mx-auto flex w-full flex-col items-center justify-center gap-8 text-orange-50 md:w-2/3 md:flex-row'>
          <div className='flex h-fit w-full flex-col justify-between rounded-md bg-[#0f162b] px-8 py-4 md:h-72 md:w-2/3 lg:h-56'>
            <div>
              <strong>Welcome to your new theme!</strong> To get started, head
              to the admin area to begin adding and managing your own content.
            </div>
            <Link
              href={'/admin'}
              className='mt-6 rounded-md bg-[#4f46e5] px-4 py-2 text-center text-white duration-150 hover:scale-105'>
              Go to admin
            </Link>
          </div>
          <div className='flex h-fit w-full flex-col justify-between rounded-md bg-[#0f162b] px-8 py-4 md:h-72 md:w-2/3 lg:h-56'>
            <div>
              Get a head start by loading demo content into your theme.{' '}
              <strong>Click the button below to see a sample setup.</strong>
            </div>
            <button
              className='z-50 mt-6 cursor-pointer rounded-md bg-[#4f46e5] px-4 py-2 text-center text-orange-50 duration-150 hover:scale-105'
              disabled={isSeedLoading}
              type='button'
              onClick={handleSeedData}>
              {isSeedLoading ? `data loading...` : `Load Demo data`}
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default WelcomePage
