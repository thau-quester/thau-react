import * as thau from '..'

const EXPECTED_EXPORT = [
  'ThauProvider',
  'useCreateUserWithPassword',
  'useLoginWithFacebook',
  'useLoginWithGoogle',
  'useLoginWithPassword',
  'useLoginWithGithub',
  'useLogout',
  'useSession',
  'useThau',
]

it('Should export all expected fields', () => {
  expect(Object.keys(thau).sort()).toStrictEqual(EXPECTED_EXPORT)
})
