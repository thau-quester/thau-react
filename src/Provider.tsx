import * as React from 'react'
import { FetchOptions, Session, ThauJS, ThauError } from 'thau-js'
import { thauContext, ThauContextType } from './context'

type State = Omit<ThauContextType, 'setSession'>
const initialState: State = {
  loading: true,
}

export type ThauProviderProps = {
  thauUrl: string
  fetchOptions?: FetchOptions
  children: React.ReactNode | React.ReactNodeArray
}

type Action =
  | {
      type: 'CONNECTED'
      client?: ThauJS
      session?: Session
    }
  | { type: 'ERROR'; error: ThauError }
  | { type: 'DONE' }

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'CONNECTED': {
      return {
        ...initialState,
        loading: false,
        client: action.client,
        session: action.session,
      }
    }

    case 'ERROR': {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }

    case 'DONE': {
      return {
        ...state,
        loading: false,
      }
    }

    default: {
      return {
        ...state,
      }
    }
  }
}

const ThauProvider = ({
  thauUrl,
  fetchOptions,
  children,
}: ThauProviderProps) => {
  const [state, dispatch] = React.useReducer<typeof reducer>(
    reducer,
    initialState
  )

  React.useEffect(() => {
    ThauJS.createClient(thauUrl, fetchOptions)
      .then(async (client) => {
        let session
        try {
          session = await client.getCurrentSession()
        } catch (e) {
        } finally {
          dispatch({ type: 'CONNECTED', client, session })
        }
      })
      .catch((error) => {
        dispatch({ type: 'ERROR', error })
      })
  }, [thauUrl, fetchOptions])

  const contextValue = {
    ...state,
    setSession: (session?: Session) =>
      dispatch({ type: 'CONNECTED', session, client: state.client }),
  }

  return (
    <thauContext.Provider value={contextValue}>{children}</thauContext.Provider>
  )
}

export default ThauProvider
