import * as React from 'react'
import { thauContext } from '../context'
import { User, ThauError, Session } from 'thau-js'

export type State = {
  loading: boolean
  error?: ThauError
}
const useCreateUserWithPassword: () => [
  State,
  (user: User, password: string) => Promise<Session | undefined>
] = () => {
  const thau = React.useContext(thauContext)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<ThauError>()

  const createUserWithPassword = async (user: User, password: string) => {
    setLoading(true)
    let session
    try {
      if (!thau.client) {
        throw new ThauError('Client is not initialized')
      }
      session = await thau.client.createUser(user, password)
      thau.setSession(session)
    } catch (e) {
      setError(e)
    }
    setLoading(false)
    return session
  }

  return [{ loading, error }, createUserWithPassword]
}

export default useCreateUserWithPassword
