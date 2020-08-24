import * as React from 'react'
import { thauContext } from '../context'

const useSession = () => {
  const thau = { ...React.useContext(thauContext) }

  return { loading: thau.loading, error: thau.error, session: thau.session }
}

export default useSession
