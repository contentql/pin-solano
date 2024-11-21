import { env } from '@env'
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  render,
} from '@react-email/components'

interface UserEmailTemplateProps {
  actionLabel: string
  buttonText: string
  userName: string
  href: string
  image: string
}
export const VerifyEmailTemplate = ({
  actionLabel,
  buttonText,
  userName,
  href,
}: UserEmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{actionLabel}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Row style={header}>
              <Column>
                <Img
                  src={`${env.PAYLOAD_URL}/favicon.ico`}
                  width='40'
                  height='40'
                  alt='Solano'
                />
              </Column>
              <Column>
                <Text style={title}>Solano</Text>
              </Column>
            </Row>
            <Hr style={hr} />
          </Section>
          <Section style={infoSection}>
            <Text style={infoText}>Hello, {userName}</Text>
            <Text style={infoText}>
              Thank you for creating an account with us! To complete the
              registration process, please verify your email by clicking the
              link below:
            </Text>
            <Button href={href} style={button}>
              {buttonText}
            </Button>
            <Text style={infoText}>
              If you didn’t create this account, please disregard this message.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
export const UserAccountVerification = (props: UserEmailTemplateProps) =>
  render(<VerifyEmailTemplate {...props} />, { pretty: true })
const infoSection = {
  marginBottom: '24px',
}
const header = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '10px',
}
const title = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#f1f5f9',
  marginLeft: '10px',
}
const main = {
  backgroundColor: '#fff',
  color: '#f1f5f9',
  margin: 'auto',
  padding: '10px 0px',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
}
const container = {
  maxWidth: '600px',
  backgroundColor: '#0f172a',
  margin: 'auto',
  padding: '24px',
}
const hr = {
  borderColor: '#334155',
  margin: '20px 0',
}
const infoText = {
  margin: '0 0 10px 0',
  fontSize: '14px',
  color: '#f1f5f9',
  textAlign: 'left' as const,
}
const button = {
  fontSize: '16px',
  backgroundColor: '#4f46e5',
  color: '#f1f5f9',
  lineHeight: 1.5,
  borderRadius: '8px',
  padding: '12px 24px',
  transition: 'background-color 0.2s ease-in-out',
  marginTop: '8px',
  marginBottom: '8px',
}
