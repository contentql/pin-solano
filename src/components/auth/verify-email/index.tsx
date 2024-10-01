'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import Loading from '@/components/common/Loading'
import { trpc } from '@/trpc/client'

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}
const EmailVerificationView = ({ searchParams }: PageProps) => {
  const router = useRouter()
  const token = searchParams.token as string
  const userId = searchParams.id as string
  const { isLoading, isError, isSuccess } = trpc.auth.verifyEmail.useQuery({
    token: token,
    userId: userId,
  })
  if (isSuccess) {
    toast.success(`Your email successfully verified`)
    setTimeout(() => {
      router.replace('/sign-in')
    }, 2000)
  }
  if (isError) {
    toast.error(`Failed to verify your email address`)
  }
  return (
    <div className='flex min-h-screen items-center justify-center gap-x-2'>
      {isLoading ? (
        <Loading />
      ) : isSuccess ? (
        <div className=' max-w-lg rounded-md bg-base-200 p-4 text-center text-base-content'>
          <h3 className='h3 text-2xl '>Email Verified Successfully</h3>
          <div className=' mt-4 text-success '>
            Your email has been verified successfully. We are now redirecting
            you to the sign-in page. Thank you for confirming your email and
            completing the process!
          </div>
        </div>
      ) : (
        <div className=' max-w-sm rounded-md bg-base-200 p-4 text-center text-base-content'>
          <h3 className='h3 text-2xl'>Email Verification Failed</h3>
          <div className='mt-4 text-error'>
            There was an issue verifying your email. The link may have expired
            or been used. Please request a new link or contact support for help.
          </div>
        </div>
      )}
    </div>
  )
}
export default EmailVerificationView
