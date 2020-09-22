import * as React from 'react'
import { thauContext } from '../context'
import { Session, ThauError } from 'thau-js'

export type State = {
  loading: boolean
  openSessions?: Omit<Session, 'user'>[]
  error?: ThauError
}
const useOpenSessions: () => [
  State,
  () => Promise<Omit<Session, 'user'>[] | undefined>
] = () => {
  const thau = React.useContext(thauContext)
  const [loading, setLoading] = React.useState(false)
  const [openSessions, setOpenSessions] = React.useState<
    Omit<Session, 'user'>[]
  >()
  const [error, setError] = React.useState<ThauError>()

  const fetchOpenSessions = async () => {
    setLoading(true)
    try {
      if (!thau.client) {
        throw new ThauError('Client is not initialized')
      }
      const sessions = await thau.client.listSessions()
      setLoading(false)
      setOpenSessions(sessions)
      return sessions
    } catch (e) {
      setLoading(false)
      setError(e)
      return undefined
    }
  }

  return [{ loading, error, openSessions }, fetchOpenSessions]
}

export default useOpenSessions
