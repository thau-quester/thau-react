import * as React from 'react'
import { thauContext } from '../context'
import { ThauError, Session } from 'thau-js'

export type State = {
  loading: boolean
  error?: ThauError
}
const useLoginWithGithub: () => [
  State,
  () => Promise<Session | undefined>
] = () => {
  const thau = React.useContext(thauContext)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<ThauError>()

  const createUserWithGithub = async () => {
    setLoading(true)
    let session
    try {
      if (!thau.client) {
        throw new ThauError('Client is not initialized')
      }
      await thau.client.loginWithGithub()
    } catch (e) {
      setLoading(false)
      setError(e)
    }
    return session
  }

  return [{ loading, error }, createUserWithGithub]
}

export default useLoginWithGithub
