import * as React from 'react'
import { ThauJS, Session, ThauError } from 'thau-js'

export type ThauContextType = {
  loading: boolean
  error?: ThauError
  client?: ThauJS
  session?: Session
  setSession: (session?: Session) => void
}

export const thauContext = React.createContext<ThauContextType>({
  loading: false,
  setSession: () => {},
})
