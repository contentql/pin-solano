import SignInForm from '@/components/auth/SignInForm'
import withNoAuth from '@/utils/withNoAuth'

const SignInPage = () => {
  return <SignInForm />
}

export default withNoAuth(SignInPage)
