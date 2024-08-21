import SignUpForm from '@/components/auth/SignUpForm'
import withNoAuth from '@/utils/withNoAuth'

const SignUp = () => {
  return <SignUpForm />
}

export default withNoAuth(SignUp)
