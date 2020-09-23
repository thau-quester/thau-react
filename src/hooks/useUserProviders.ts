import * as React from 'react'
import { thauContext } from '../context'
import { Provider, ThauError } from 'thau-js'

export type State = {
  loading: boolean
  providers?: Provider[]
  error?: ThauError
}
const useUserProviders: (
  userId?: number
) => [State, () => Promise<Provider[] | undefined>] = (userId?: number) => {
  const thau = React.useContext(thauContext)
  const [loading, setLoading] = React.useState(false)
  const [providers, setProviders] = React.useState<Provider[]>()
  const [error, setError] = React.useState<ThauError>()

  const fetchUserProviders = async () => {
    setLoading(true)
    setProviders(undefined)
    try {
      if (!thau.client) {
        throw new ThauError('Client is not initialized')
      }
      const userProviders = await thau.client.getUserProviders(userId)
      setLoading(false)
      setProviders(userProviders)
      return userProviders
    } catch (e) {
      setLoading(false)
      setError(e)
      return undefined
    }
  }

  React.useEffect(() => {
    fetchUserProviders()
  }, [])

  return [{ loading, error, providers }, fetchUserProviders]
}

export default useUserProviders
