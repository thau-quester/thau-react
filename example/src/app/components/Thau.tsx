import * as React from 'react'
import {
  useModal,
  Tooltip,
  Modal,
  Row,
  ButtonGroup,
  Button,
  Grid,
  Input,
  Spacer,
  Text,
  Divider,
  User as UserLine,
  Popover,
  Link,
  Card
} from '@geist-ui/react'
import {
  useSession,
  useLoginWithFacebook,
  useLoginWithPassword,
  useCreateUserWithPassword,
  useLogout,
  useLoginWithGoogle, useLoginWithGithub, useLoginWithTwitter, useLoginWithLinkedIn
} from 'thau-react'
import { ThauError, Session, User } from 'thau-js'
import AlertCircle from '@geist-ui/react-icons/alertCircle'
import Lock from '@geist-ui/react-icons/lock'
import Eye from '@geist-ui/react-icons/eye'
import Facebook from '@geist-ui/react-icons/facebook'
import Github from '@geist-ui/react-icons/github'
import Twitter from '@geist-ui/react-icons/twitter'
import Linkedin from '@geist-ui/react-icons/linkedin'

export type PasswordLoginState = {
  email: string
  password: string
}
export type UserCreationState = User & {
  password: string
}

type ErrorTooltipProps = React.PropsWithChildren<{
  error?: ThauError
}>
const ErrorTooltip = ({ error, children }: ErrorTooltipProps) => {
  if (!error) {
    return <>{children}</>
  }

  return (
    <Tooltip
      visible={!error ? false : undefined}
      offset={0}
      text={`Thau API loading error: ${error.message} [${error.status}]`}
      placement="bottomEnd"
    >
      {children}
    </Tooltip>
  )
}

export type LoginState = {
  loading: boolean
  error?: ThauError
}

export type ProviderLoginFn = () => Promise<Session | undefined>
export type ProviderLoginVoid = () => void
export type LoginWithProvidersProps = {
  fbLogin: LoginState
  loginWithFacebook: ProviderLoginFn
  googleLogin: LoginState
  loginWithGoogle: ProviderLoginFn
  twitterLogin: LoginState
  loginWithTwitter: ProviderLoginVoid
  githubLogin: LoginState
  loginWithGithub: ProviderLoginVoid
  linkedinLogin: LoginState
  loginWithLinkedin: ProviderLoginVoid
}

const LoginWithProviders = ({
  fbLogin,
  loginWithFacebook,
  googleLogin,
  loginWithGoogle,
  twitterLogin,
  loginWithTwitter,
  githubLogin,
  loginWithGithub,
  linkedinLogin,
  loginWithLinkedin,
}: LoginWithProvidersProps) => (
    <>
      <Button
        loading={fbLogin.loading}
        onClick={loginWithFacebook}
        icon={<Facebook />}
        type="success"
      >
        Facebook
      </Button>
      <Spacer y={0.5} />
      <Button
        loading={googleLogin.loading}
        onClick={loginWithGoogle}
        icon={<Text>G</Text>}
        type="error"
      >
        Google
    </Button>
      <Spacer y={0.5} />
      <Button
        loading={twitterLogin.loading}
        onClick={loginWithTwitter}
        icon={<Twitter />}
        type="success"
      >
        Twitter
    </Button>
      <Spacer y={0.5} />
      <Button
        loading={githubLogin.loading}
        onClick={loginWithGithub}
        icon={<Github />}
        type="secondary"
      >
        GitHub
    </Button>
      <Spacer y={0.5} />
      <Button
        loading={linkedinLogin.loading}
        onClick={loginWithLinkedin}
        icon={<Linkedin />}
        type="success"
      >
        LinkedIn
    </Button>
    </>
  )

export type PasswordLoginFormProps = {
  passwordLoginState: PasswordLoginState
  handlePasswordLoginChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  passwordLogin: LoginState
  loginWithPassword: (email: string, password: string) => void
}

const PasswordLoginForm = ({
  passwordLoginState,
  handlePasswordLoginChange,
  passwordLogin,
  loginWithPassword,
}: PasswordLoginFormProps) => (
    <>
      <Input
        onChange={handlePasswordLoginChange}
        icon={<Eye />}
        placeholder="Email"
        required
        type="email"
        name="email"
      />
      <Spacer y={0.5} />
      <Input
        onChange={handlePasswordLoginChange}
        icon={<Lock />}
        placeholder="Password"
        required
        type="password"
        name="password"
      />
      <Spacer y={0.5} />
      <Button
        size="medium"
        type="success"
        ghost
        loading={passwordLogin.loading}
        disabled={!passwordLoginState.email || !passwordLoginState.password}
        onClick={() =>
          loginWithPassword(passwordLoginState.email, passwordLoginState.password)
        }
      >
        Sign in
    </Button>
    </>
  )

export type UserCreateFormProps = {
  userCreation: LoginState
  createUser: (user: User, password: string) => void
  userCreationState: UserCreationState
  handleUserCreationChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const UserCreateForm = ({
  userCreation,
  createUser,
  userCreationState,
  handleUserCreationChange,
}: UserCreateFormProps) => (
    <>
      <Input
        onChange={handleUserCreationChange}
        icon={<Eye />}
        placeholder="Email *"
        required
        type="email"
        name="email"
      />
      <Spacer y={0.5} />
      <Input
        onChange={handleUserCreationChange}
        icon={<Lock />}
        placeholder="Password *"
        required
        type="password"
        name="password"
      />
      <Divider />
      <Input
        onChange={handleUserCreationChange}
        icon={<Spacer />}
        placeholder="Username"
        type="text"
        name="username"
      />
      <Spacer y={0.5} />
      <Input
        onChange={handleUserCreationChange}
        icon={<Spacer />}
        placeholder="First name"
        type="text"
        name="firstName"
      />
      <Spacer y={0.5} />
      <Input
        onChange={handleUserCreationChange}
        icon={<Spacer />}
        placeholder="Last name"
        type="text"
        name="lastName"
      />
      <Spacer y={0.5} />
      <Button
        size="medium"
        type="success"
        ghost
        loading={userCreation.loading}
        disabled={!userCreationState.email || !userCreationState.password}
        onClick={() =>
          createUser(
            {
              email: userCreationState.email,
            },
            userCreationState.password
          )
        }
      >
        Sign up
    </Button>
    </>
  )

export default () => {
  const { loading, error, session } = useSession()
  const [userCreation, createUser] = useCreateUserWithPassword()
  const [fbLogin, loginWithFacebook] = useLoginWithFacebook()
  const [googleLogin, loginWithGoogle] = useLoginWithGoogle()
  const [githubLogin, loginWithGithub] = useLoginWithGithub()
  const [twitterLogin, loginWithTwitter] = useLoginWithTwitter()
  const [linkedinLogin, loginWithLinkedin] = useLoginWithLinkedIn()

  const [passwordLogin, loginWithPassword] = useLoginWithPassword()
  const [, logout] = useLogout()

  const [passwordLoginState, setPasswordLoginState] = React.useState<
    PasswordLoginState
  >({
    email: '',
    password: '',
  })
  const [userCreationState, setUserCreationState] = React.useState<
    UserCreationState
  >({
    email: '',
    password: '',
  })

  const {
    visible: isSignInModalVisible,
    setVisible: setSignInModalVisible,
    bindings: signInModalBindigs,
  } = useModal()
  const {
    visible: isSignUpModalVisible,
    setVisible: setSignUpModalVisible,
    bindings: signUpModalBindigs,
  } = useModal()

  const handlePasswordLoginChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordLoginState(
      (state) => ({ ...state, [name]: value } as PasswordLoginState)
    )
  }

  const handleUserCreationChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setUserCreationState(
      (state) => ({ ...state, [name]: value } as PasswordLoginState)
    )
  }

  const signInError = fbLogin.error || googleLogin.error || passwordLogin.error || githubLogin.error || twitterLogin.error || linkedinLogin.error
  const signUpError = fbLogin.error || googleLogin.error || userCreation.error || githubLogin.error || twitterLogin.error || linkedinLogin.error

  React.useEffect(() => {
    if (!loading && !signInError && session && isSignInModalVisible) {
      setSignInModalVisible(false)
    }
  }, [
    loading,
    signInError,
    session,
    isSignInModalVisible,
    setSignInModalVisible,
  ])

  React.useEffect(() => {
    if (!loading && !signUpError && session && isSignUpModalVisible) {
      setSignUpModalVisible(false)
    }
  }, [
    loading,
    signUpError,
    session,
    isSignUpModalVisible,
    setSignUpModalVisible,
  ])

  return (
    <>
      <Modal {...signInModalBindigs} width="35rem">
        <Modal.Title>Sign in</Modal.Title>
        <Modal.Subtitle>Using Thau API</Modal.Subtitle>
        <Modal.Content>
          <Grid.Container justify="space-between" alignItems="stretch">
            <Grid>
              <PasswordLoginForm
                passwordLogin={passwordLogin}
                loginWithPassword={loginWithPassword}
                passwordLoginState={passwordLoginState}
                handlePasswordLoginChange={handlePasswordLoginChange}
              />
              {signInError ? (
                <Text type="error">
                  Error: {signInError.message} [{signInError.status}]
                </Text>
              ) : (
                  <Spacer y={2.7} />
                )}
            </Grid>
            <Grid>
              <LoginWithProviders
                fbLogin={fbLogin}
                googleLogin={googleLogin}
                githubLogin={githubLogin}
                twitterLogin={twitterLogin}
                linkedinLogin={linkedinLogin}
                loginWithFacebook={loginWithFacebook}
                loginWithGoogle={loginWithGoogle}
                loginWithGithub={loginWithGithub}
                loginWithTwitter={loginWithTwitter}
                loginWithLinkedin={loginWithLinkedin}
              />
            </Grid>
          </Grid.Container>
        </Modal.Content>
      </Modal>
      <Modal {...signUpModalBindigs} width="35rem">
        <Modal.Title>Sign up</Modal.Title>
        <Modal.Subtitle>Using Thau API</Modal.Subtitle>
        <Modal.Content>
          <Grid.Container justify="space-between" alignItems="stretch">
            <Grid>
              <UserCreateForm
                userCreation={userCreation}
                createUser={createUser}
                userCreationState={userCreationState}
                handleUserCreationChange={handleUserCreationChange}
              />
              {signUpError ? (
                <Text type="error">
                  Error: {signUpError.message} [{signUpError.status}]
                </Text>
              ) : (
                  <Spacer y={2.7} />
                )}
            </Grid>
            <Grid>
              <LoginWithProviders
                fbLogin={fbLogin}
                googleLogin={googleLogin}
                githubLogin={githubLogin}
                twitterLogin={twitterLogin}
                linkedinLogin={linkedinLogin}
                loginWithFacebook={loginWithFacebook}
                loginWithGoogle={loginWithGoogle}
                loginWithGithub={loginWithGithub}
                loginWithTwitter={loginWithTwitter}
                loginWithLinkedin={loginWithLinkedin}
              />
            </Grid>
          </Grid.Container>
        </Modal.Content>
      </Modal>

      <Row align="middle" justify="end">
        {!session && (
          <ErrorTooltip error={error}>
            <ButtonGroup size="small">
              <Button
                onClick={() => setSignInModalVisible(true)}
                loading={loading}
                disabled={!!error}
                iconRight={error ? <AlertCircle color="red" /> : undefined}
              >
                Sign in
              </Button>
              <Button
                onClick={() => setSignUpModalVisible(true)}
                loading={loading}
                disabled={!!error}
                iconRight={error ? <AlertCircle color="red" /> : undefined}
              >
                Sign up
              </Button>
            </ButtonGroup>
          </ErrorTooltip>
        )}
        {session && (
          <Popover
            offset={0}
            content={
              <>
                <Popover.Item>
                  <Link href="#" onClick={() => logout()}>
                    Log Out
                </Link>
                </Popover.Item>
              </>
            }
          >
            <Card>
              <UserLine
                style={{ cursor: 'pointer' }}
                src={
                  session.user.picture ||
                  `https://api.adorable.io/avatars/285/${session.user.email}`
                }
                name={session.user.username || session.user.email.split('@')[0]}
              >
                {session.user.firstName} {session.user.lastName}<br />
                Logged in using {session.strategy}
              </UserLine>
            </Card>
          </Popover>
        )}
      </Row>
    </>
  )
}
