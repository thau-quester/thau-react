import * as React from 'react'
import { thauContext } from '../context'
import { ThauError } from 'thau-js'

export type State = {
  loading: boolean
  error?: ThauError
}
const useLoginWithLinkedIn: () => [State, () => Promise<void>] = () => {
  const thau = React.useContext(thauContext)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<ThauError>()

  const createUserWithLinkedIn = async () => {
    setLoading(true)
    try {
      if (!thau.client) {
        throw new ThauError('Client is not initialized')
      }
      await thau.client.loginWithLinkedIn()
    } catch (e) {
      setLoading(false)
      setError(e)
    }
  }

  return [{ loading, error }, createUserWithLinkedIn]
}

export default useLoginWithLinkedIn
