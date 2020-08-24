import * as React from 'react'
import { thauContext } from '../context'
import { ThauError } from 'thau-js'

export type State = {
  loading: boolean
  error?: ThauError
}
const useLogout: () => [State, () => Promise<void>] = () => {
  const thau = React.useContext(thauContext)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<ThauError>()

  const logout = async () => {
    setLoading(true)
    try {
      if (!thau.client) {
        throw new ThauError('Client is not initialized')
      }
      await thau.client.logout()
      thau.setSession(undefined)
    } catch (e) {
      setError(e)
    }
    setLoading(false)
  }

  return [{ loading, error }, logout]
}

export default useLogout
