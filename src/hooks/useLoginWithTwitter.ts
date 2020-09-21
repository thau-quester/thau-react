import * as React from 'react'
import { thauContext } from '../context'
import { ThauError } from 'thau-js'

export type State = {
  loading: boolean
  error?: ThauError
}
const useLoginWithTwitter: () => [State, () => Promise<void>] = () => {
  const thau = React.useContext(thauContext)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<ThauError>()

  const createUserWithTwitter = async () => {
    setLoading(true)
    try {
      if (!thau.client) {
        throw new ThauError('Client is not initialized')
      }
      await thau.client.loginWithTwitter()
    } catch (e) {
      setLoading(false)
      setError(e)
    }
  }

  return [{ loading, error }, createUserWithTwitter]
}

export default useLoginWithTwitter
