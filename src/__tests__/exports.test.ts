import * as thau from '..'

const EXPECTED_EXPORT = [
  'ThauProvider',
  'useCreateUserWithPassword',
  'useLoginWithFacebook',
  'useLoginWithGithub',
  'useLoginWithGoogle',
  'useLoginWithLinkedIn',
  'useLoginWithPassword',
  'useLoginWithTwitter',
  'useLogout',
  'useOpenSessions',
  'useSession',
  'useThau',
  "useUserProviders",
]

it('Should export all expected fields', () => {
  expect(Object.keys(thau).sort()).toStrictEqual(EXPECTED_EXPORT)
})
