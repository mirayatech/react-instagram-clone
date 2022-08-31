import { Navigate } from 'react-router-dom'
import { useUserAuth } from '../context/context'

export const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth()

  console.log('Check user in Private: ', user)
  if (!user) {
    return <Navigate to="/" />
  }
  return children
}
