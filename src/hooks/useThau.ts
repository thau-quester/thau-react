import * as React from 'react'
import { thauContext } from '../context'

const useThau = () => {
  const thau = { ...React.useContext(thauContext) }

  delete thau.setSession
  delete thau.session

  return thau
}

export default useThau
