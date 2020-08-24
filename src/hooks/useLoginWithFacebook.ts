import * as React from 'react'
import { thauContext } from '../context'
import { ThauError, Session } from 'thau-js'

export type State = {
  loading: boolean
  error?: ThauError
}
const useLoginWithfacebook: () => [
  State,
  () => Promise<Session | undefined>
] = () => {
  const thau = React.useContext(thauContext)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<ThauError>()

  const createUserWithFacebook = async () => {
    setLoading(true)
    let session
    try {
      if (!thau.client) {
        throw new ThauError('Client is not initialized')
      }
      session = await thau.client.loginWithFacebook()
      thau.setSession(session)
    } catch (e) {
      setError(e)
    }
    setLoading(false)
    return session
  }

  return [{ loading, error }, createUserWithFacebook]
}

export default useLoginWithfacebook
