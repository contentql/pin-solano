import { Metadata } from 'next'

import EmailVerificationView from '@/components/auth/verify-email'

interface PageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}
export const metadata: Metadata = {
  title: 'Email verification',
  description: 'This is a verify page',
}
const VerifyEmail = async ({ searchParams }: PageProps) => {
  const syncSearchParams = await searchParams
  return <EmailVerificationView searchParams={syncSearchParams} />
}
export default VerifyEmail
