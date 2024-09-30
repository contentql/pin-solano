'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { trpc } from '@/trpc/client'

import Container from './common/Container'

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
      <Container className='relative flex min-h-screen max-w-full flex-col items-center justify-center gap-10 bg-[#26304e] px-10'>
        <div className='absolute left-[50%] top-[24%] h-[20%] w-[20%] -translate-x-1/2 rounded-full bg-indigo-600 blur-[110px]'></div>
        <div className='flex flex-col items-center gap-5 text-center'>
          <h1 className='bg-gradient-to-r from-white to-[#4f46e5] bg-clip-text text-5xl font-medium text-transparent'>
            Welcome to Solano!{' '}
          </h1>
          <p className='w-2/3 text-xl text-orange-50'>
            Your blog is ready to shine. Start by creating your first post or
            exploring tags, users, and more.
          </p>
        </div>

        {/* Demo Content Section */}
        <div className='flex w-full flex-col items-center md:w-2/3 lg:w-1/2'>
          <div className='flex flex-col justify-between rounded-md bg-[#0f162b] p-8 text-orange-50'>
            <p>
              Want to see how your blog could look with sample content?{' '}
              <strong>Click below to load demo posts, tags, and users.</strong>
            </p>
            <button
              className='mt-6 rounded-md bg-[#4f46e5] px-4 py-2 text-orange-50 duration-150 hover:scale-105'
              disabled={isSeedLoading}
              onClick={handleLoadDemoClick}>
              {isSeedLoading ? 'Loading data...' : 'Load Demo Content'}
            </button>
          </div>
        </div>
      </Container>

      {showConfirmationModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-xl'>
            <h2 className='mb-4 text-lg font-semibold text-gray-700'>
              Confirm Demo Data Load
            </h2>
            <p className='mb-6 text-sm text-gray-500'>
              Loading demo posts and tags might take about a minute.
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
              Loading Demo Content
            </h2>
            <p className='text-sm text-gray-500'>
              Once loaded, you&apos;ll be redirected to the blog. Please do not
              close the page.
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
