'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Container from '@/payload/common/Container'
import { trpc } from '@/trpc/client'

const WelcomePage = () => {
  const router = useRouter()
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showLoadingModal, setShowLoadingModal] = useState(false)

  const { mutate: runSeedMutation, isPending: isSeedLoading } =
    trpc.seed.runSeed.useMutation({
      onMutate: () => {
        setShowLoadingModal(true)
      },
      onSuccess: () => {
        // ! router.refresh() is not working as expected.
        window.location.reload()
      },
    })

  const handleSeedData = () => {
    runSeedMutation()
  }

  const handleLoadDemoClick = () => {
    setShowConfirmationModal(true)
  }

  const handleConfirmLoad = () => {
    setShowConfirmationModal(false)
    handleSeedData()
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
              Get a head start by loading demo content into your theme.{' '}
              <strong>Click the button below to see a sample setup.</strong>
            </div>
            <button
              className='z-50 mt-6 rounded-md bg-[#4f46e5] px-4 py-2 text-center text-orange-50 duration-150 hover:scale-105'
              disabled={isSeedLoading}
              type='button'
              onClick={handleLoadDemoClick}>
              {isSeedLoading ? `data loading...` : `Load Demo data`}
            </button>
          </div>
        </div>
      </Container>

      {showConfirmationModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-xl'>
            <h2 className='mb-4 text-lg font-semibold text-gray-700'>
              Are you sure you want to load demo data?
            </h2>
            <p className='mb-6 text-sm text-gray-500'>
              It would take around a minute.
            </p>
            <div className='flex gap-4'>
              <button
                onClick={handleConfirmLoad}
                className='rounded-md bg-primary px-4 py-2 text-white'>
                Yes, Load Data
              </button>
              <button
                onClick={() => setShowConfirmationModal(false)}
                className='rounded-md bg-gray-300 px-4 py-2 text-gray-700'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoadingModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-xl'>
            <div className='loader mb-4 h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear'></div>
            <h2 className='mb-2 text-lg font-semibold text-gray-700'>
              Loading Demo Data
            </h2>
            <p className='text-sm text-gray-500'>
              After that you&apos;ll be redirected to homepage. Please do not
              exit this page.
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .loader {
          border-top-color: #7248e6;
          animation: spinner 1s ease-in-out infinite;
        }
        @keyframes spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default WelcomePage
